import * as THREE from "three/webgpu";
import {
  color,
  float,
  Fn,
  instanceIndex,
  mix,
  pass,
  positionLocal,
  smoothstep,
  storage,
  time,
  vec3
} from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";

const canvas = document.querySelector("#menu-scene");
const frame = document.querySelector("#game-preload");
const playButton = document.querySelector("#play");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

let gameReady = false;
let entering = false;
let preloadStarted = false;
let lastProgress = 0.01;
let sceneRunning = true;
let renderer = null;
let renderPipeline = null;
let environmentTarget = null;
let windStorage = null;
let windCompute = null;

if (!canvas) throw new Error("Missing #menu-scene canvas.");

function createSky() {
  const material = new THREE.MeshBasicNodeMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false
  });

  const height = positionLocal.normalize().y.mul(0.5).add(0.5);
  const lower = mix(
    color("#ffe2bf"),
    color("#c9eee1"),
    smoothstep(float(0.08), float(0.6), height)
  );
  material.colorNode = mix(
    lower,
    color("#78c7d5"),
    smoothstep(float(0.58), float(1), height)
  );

  const sky = new THREE.Mesh(new THREE.SphereGeometry(40, 48, 24), material);
  sky.name = "menu-sky";
  sky.frustumCulled = false;
  sky.renderOrder = -20;
  return sky;
}

function createSkyGlow() {
  const glowMaterial = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  glowMaterial.colorNode = color("#fff0b8").mul(3.4);

  const glow = new THREE.Mesh(new THREE.CircleGeometry(1.4, 64), glowMaterial);
  glow.name = "menu-sky-glow";
  glow.position.set(-5.2, 4.4, -10);
  glow.scale.set(1.25, 1.25, 1);
  return glow;
}

function createFrondLeafletsGeometry(ribCurve, leafletCount = 17) {
  const positions = [];
  const indices = [];
  const uvs = [];

  for (let leafletIndex = 2; leafletIndex < leafletCount; leafletIndex += 1) {
    const t = leafletIndex / leafletCount;
    const center = ribCurve.getPoint(t);
    const tangent = ribCurve.getTangent(t).normalize();
    const size = Math.sin(Math.PI * t);
    const leafletLength = (0.58 + size * 0.48) * (0.92 + (leafletIndex % 3) * 0.04);
    const leafletWidth = 0.11 + size * 0.075;

    for (const side of [-1, 1]) {
      const baseIndex = positions.length / 3;
      const sideVector = new THREE.Vector3(0, 0, side);
      const root = center.clone();
      const mid = center.clone()
        .addScaledVector(tangent, leafletLength * 0.28)
        .addScaledVector(sideVector, leafletLength * 0.62);
      mid.y -= 0.04 + t * 0.12;
      const tip = center.clone()
        .addScaledVector(tangent, leafletLength * 0.38)
        .addScaledVector(sideVector, leafletLength);
      tip.y -= 0.08 + t * 0.18;
      const across = new THREE.Vector3(0, leafletWidth * 0.6, side * leafletWidth * 0.18);

      positions.push(
        root.x, root.y, root.z,
        mid.x + across.x, mid.y + across.y, mid.z + across.z,
        tip.x, tip.y, tip.z,
        mid.x - across.x, mid.y - across.y, mid.z - across.z
      );
      uvs.push(0, 0.5, 0.46, 1, 1, 0.5, 0.46, 0);
      indices.push(
        baseIndex, baseIndex + 1, baseIndex + 2,
        baseIndex, baseIndex + 2, baseIndex + 3
      );
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function createWindField() {
  const buffer = new THREE.StorageBufferAttribute(12, 1);
  const values = storage(buffer, "float", 12);
  const compute = Fn(() => {
    const phase = float(instanceIndex).mul(0.73);
    const gust = time
      .mul(0.72)
      .add(phase)
      .sin()
      .add(time.mul(0.23).add(phase.mul(1.73)).sin().mul(0.35));
    values.element(instanceIndex).assign(gust);
  })().compute(12).setName("Menu Palm Wind Field");
  return { buffer, values, compute };
}

function createWindMaterial({
  index,
  phase,
  length,
  baseColor,
  tipColor,
  strength = 0.11,
  roughness = 0.68,
  emissive = "#183d20"
}) {
  const material = new THREE.MeshPhysicalNodeMaterial({
    side: THREE.DoubleSide,
    roughness,
    metalness: 0,
    clearcoat: 0.05,
    clearcoatRoughness: 0.82,
    sheen: 0.12,
    sheenColor: new THREE.Color("#d9ef9b"),
    sheenRoughness: 0.8
  });

  const along = positionLocal.x.div(length).clamp(0, 1);
  const windSignal = windStorage
    ? windStorage.element(index)
    : time
      .mul(0.72)
      .add(phase)
      .sin()
      .add(time.mul(0.23).add(phase * 1.73).sin().mul(0.35));
  const gust = windSignal
    .mul(strength)
    .mul(along.pow(1.45));

  material.positionNode = positionLocal.add(vec3(
    gust.mul(0.08),
    gust.mul(0.1),
    gust.mul(0.34)
  ));
  material.colorNode = mix(
    color(baseColor),
    color(tipColor),
    along.mul(0.78).add(positionLocal.z.mul(1.7).sin().abs().mul(0.08))
  );
  material.roughnessNode = float(roughness).add(
    positionLocal.x.mul(8).sin().abs().mul(0.1)
  );
  material.emissiveNode = color(emissive).mul(along.mul(0.08).add(0.025));
  return material;
}

function createFrond(index) {
  const phase = index * 0.73;
  const length = 2.75 + (index % 3) * 0.18;
  const droop = 0.46 + (index % 2) * 0.1;
  const group = new THREE.Group();
  group.name = `menu-palm-frond-${index}`;

  const ribCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(length * 0.28, 0.04, 0),
    new THREE.Vector3(length * 0.62, -droop * 0.28, 0),
    new THREE.Vector3(length, -droop, 0)
  ]);

  const ribMaterial = createWindMaterial({
    index,
    phase,
    length,
    baseColor: "#507f38",
    tipColor: "#7fad51",
    strength: 0.075,
    roughness: 0.76
  });
  const rib = new THREE.Mesh(
    new THREE.TubeGeometry(ribCurve, 24, 0.035, 7, false),
    ribMaterial
  );
  rib.name = `menu-palm-rib-${index}`;
  rib.castShadow = true;
  group.add(rib);

  const leafColors = [
    ["#3f874e", "#8bcf69"],
    ["#4b9658", "#9bd474"],
    ["#397b48", "#78bd60"]
  ];
  const [baseColor, tipColor] = leafColors[index % leafColors.length];
  const leafMaterial = createWindMaterial({
    index,
    phase,
    length,
    baseColor,
    tipColor,
    strength: 0.13 + (index % 3) * 0.012,
    roughness: 0.62,
    emissive: "#1f5429"
  });

  const leaflets = new THREE.Mesh(
    createFrondLeafletsGeometry(ribCurve, 17),
    leafMaterial
  );
  leaflets.name = `menu-palm-leaflets-${index}`;
  leaflets.castShadow = true;
  group.add(leaflets);

  return group;
}

function createTrunkMaterial() {
  const material = new THREE.MeshStandardNodeMaterial({
    roughness: 0.9,
    metalness: 0
  });
  const height = positionLocal.y.div(5.5).clamp(0, 1);
  const rings = positionLocal.y.mul(11).add(positionLocal.x.mul(3)).sin().mul(0.5).add(0.5);
  const fibers = positionLocal.x.mul(19).add(positionLocal.z.mul(13)).sin().abs();

  material.colorNode = mix(
    color("#6d4128"),
    color("#b07847"),
    rings.mul(0.52).add(height.mul(0.23))
  );
  material.roughnessNode = float(0.75)
    .add(rings.mul(0.13))
    .add(fibers.mul(0.07));
  const sway = time
    .mul(0.38)
    .sin()
    .mul(height.pow(2))
    .mul(reducedMotion ? 0 : 0.045);
  material.positionNode = positionLocal.add(vec3(
    sway,
    float(0),
    sway.mul(0.28)
  ));
  return material;
}

function createPalm() {
  const palm = new THREE.Group();
  palm.name = "menu-hero-palm";
  palm.position.set(-1.75, -2.75, 0);
  palm.rotation.y = 0.16;

  const trunkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.04, 0.8, 0.03),
    new THREE.Vector3(0.1, 1.75, -0.02),
    new THREE.Vector3(0.3, 2.8, 0.02),
    new THREE.Vector3(0.55, 3.85, -0.03),
    new THREE.Vector3(0.82, 4.75, 0)
  ]);

  const trunk = new THREE.Mesh(
    new THREE.TubeGeometry(trunkCurve, 56, 0.28, 12, false),
    createTrunkMaterial()
  );
  trunk.name = "menu-palm-trunk";
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  palm.add(trunk);

  const baseFlare = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.48, 0.72, 14, 4),
    createTrunkMaterial()
  );
  baseFlare.name = "menu-palm-base-flare";
  baseFlare.position.set(0, 0.34, 0);
  baseFlare.castShadow = true;
  palm.add(baseFlare);

  const crown = new THREE.Group();
  crown.name = "menu-palm-crown";
  crown.position.copy(trunkCurve.getPoint(1));
  palm.add(crown);

  const sheathMaterial = new THREE.MeshStandardNodeMaterial({
    color: "#755037",
    roughness: 0.86,
    metalness: 0
  });
  const sheath = new THREE.Mesh(
    new THREE.SphereGeometry(0.43, 18, 12),
    sheathMaterial
  );
  sheath.scale.set(1.1, 0.78, 1);
  sheath.position.y = -0.03;
  sheath.castShadow = true;
  crown.add(sheath);

  const frondCount = 12;
  for (let index = 0; index < frondCount; index += 1) {
    const frond = createFrond(index);
    const angle = index / frondCount * Math.PI * 2;
    const age = index % 4;
    frond.rotation.set(
      -0.16 + age * 0.075,
      angle,
      -0.08 + Math.sin(angle) * 0.08
    );
    crown.add(frond);
  }

  const coconutMaterial = new THREE.MeshStandardNodeMaterial({
    color: "#765038",
    roughness: 0.94,
    metalness: 0
  });
  for (let index = 0; index < 6; index += 1) {
    const angle = index / 6 * Math.PI * 2 + 0.35;
    const coconut = new THREE.Mesh(
      new THREE.SphereGeometry(0.19 + (index % 2) * 0.025, 14, 10),
      coconutMaterial
    );
    coconut.name = `menu-palm-coconut-${index}`;
    coconut.scale.set(0.88, 1.13, 0.9);
    coconut.position.set(
      Math.cos(angle) * 0.31,
      -0.18 - (index % 3) * 0.055,
      Math.sin(angle) * 0.31
    );
    coconut.castShadow = true;
    crown.add(coconut);
  }

  return palm;
}

function setProgress(progress) {
  lastProgress = Math.max(lastProgress, Math.max(0.01, Math.min(0.99, Number(progress) || 0.01)));
  const percent = Math.min(99, Math.max(1, Math.round(lastProgress * 100)));
  if (playButton && !gameReady) playButton.textContent = `Preparing ${percent}%`;
}

function markReady() {
  if (gameReady) return;
  gameReady = true;
  setProgress(0.99);
  if (playButton) {
    playButton.disabled = false;
    playButton.textContent = "Play";
  }
}

function reportFailure(message) {
  console.error(message);
  if (playButton) {
    playButton.disabled = true;
    playButton.textContent = "Could Not Start";
    playButton.title = String(message);
  }
}

function startPreload() {
  if (preloadStarted || !frame) return;
  preloadStarted = true;
  frame.src = "./game.html?preload=1";
  setProgress(0.02);
}

function revealGame() {
  if (entering || !frame) return;
  entering = true;
  document.body.classList.add("is-entering");
  frame.removeAttribute("aria-hidden");
  frame.tabIndex = 0;
  frame.style.pointerEvents = "auto";
  try {
    history.replaceState({ scene: "game" }, "", "./game.html");
  } catch {}
  setTimeout(() => {
    sceneRunning = false;
    frame.contentWindow?.focus();
    frame.contentDocument?.querySelector("#game")?.focus?.();
    renderer?.setAnimationLoop(null);
    renderPipeline?.dispose();
    environmentTarget?.dispose?.();
    renderer?.dispose();
  }, reducedMotion ? 0 : 780);
}

function requestEntry() {
  if (!gameReady || entering || !frame?.contentWindow) return;
  if (playButton) {
    playButton.disabled = true;
    playButton.textContent = "Entering";
  }
  frame.contentWindow.postMessage({ type: "cozy-game-enter" }, location.origin);
  setTimeout(() => {
    if (!entering) revealGame();
  }, 900);
}

addEventListener("message", (event) => {
  if (event.source !== frame?.contentWindow) return;
  const message = event.data ?? {};
  if (message.type === "cozy-game-progress") {
    setProgress(message.progress);
  } else if (message.type === "cozy-game-ready") {
    markReady();
  } else if (message.type === "cozy-game-entered") {
    revealGame();
  } else if (message.type === "cozy-game-failed") {
    reportFailure(message.error ?? "My Cozy Island could not start.");
  }
});

playButton?.addEventListener("click", requestEntry);
addEventListener("keydown", (event) => {
  if ((event.code === "Enter" || event.code === "Space") && gameReady && !entering) {
    event.preventDefault();
    requestEntry();
  }
});

async function main() {
  renderer = new THREE.WebGPURenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
    outputBufferType: THREE.HalfFloatType
  });
  await renderer.init();

  if (renderer.backend?.isWebGPUBackend) {
    const windField = createWindField();
    windStorage = windField.values;
    windCompute = windField.compute;
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.96;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#a8d9d5");

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 90);
  camera.position.set(0.15, 1.1, 10.5);
  camera.lookAt(-1.55, 0.35, 0);

  scene.add(createSky());
  scene.add(createSkyGlow());

  const hemisphere = new THREE.HemisphereLight(0xe6fff8, 0x81966d, 2.15);
  scene.add(hemisphere);

  const sun = new THREE.DirectionalLight(0xffedc8, 3.25);
  sun.position.set(-4.5, 7.5, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -7;
  sun.shadow.camera.right = 7;
  sun.shadow.camera.top = 7;
  sun.shadow.camera.bottom = -7;
  sun.shadow.camera.near = 0.1;
  sun.shadow.camera.far = 30;
  sun.shadow.bias = -0.00015;
  sun.shadow.normalBias = 0.025;
  scene.add(sun);

  const rim = new THREE.DirectionalLight(0xd9fff1, 1.2);
  rim.position.set(5, 5, -4);
  scene.add(rim);

  const palm = createPalm();
  scene.add(palm);

  renderPipeline = new THREE.RenderPipeline(renderer);
  const scenePass = pass(scene, camera);
  const sceneColor = scenePass.getTextureNode("output");
  const bloomPass = bloom(sceneColor, 0.2, 0.34, 1.12);
  bloomPass.setResolutionScale(0.5);
  renderPipeline.outputNode = sceneColor.add(bloomPass);

  function resize() {
    const width = Math.max(1, innerWidth);
    const height = Math.max(1, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.6));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function render() {
    if (!sceneRunning) return;
    if (windCompute) renderer.compute(windCompute);
    renderPipeline.render();
  }

  addEventListener("resize", resize);
  resize();
  renderer.setAnimationLoop(render);

  globalThis.CozyMenu = Object.freeze({
    renderer,
    scene,
    camera,
    palm,
    backend: renderer.backend?.isWebGPUBackend ? "webgpu" : "webgl2",
    computeWind: Boolean(windCompute),
    getProgress: () => lastProgress
  });

  requestAnimationFrame(() => {
    const schedule = globalThis.requestIdleCallback
      ? (callback) => requestIdleCallback(callback, { timeout: 450 })
      : (callback) => setTimeout(callback, 80);
    schedule(startPreload);
  });
}

main().catch(reportFailure);
