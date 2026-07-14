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

const FROND_COUNT = 8;
const FROND_VARIANTS = 4;

let gameReady = false;
let entering = false;
let preloadStarted = false;
let lastProgress = 0.01;
let sceneRunning = true;
let renderer = null;
let renderPipeline = null;
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
    color("#ffe7c7"),
    color("#ccefe2"),
    smoothstep(float(0.06), float(0.62), height)
  );
  material.colorNode = mix(
    lower,
    color("#79c8d6"),
    smoothstep(float(0.58), float(1), height)
  );

  const sky = new THREE.Mesh(new THREE.SphereGeometry(42, 48, 24), material);
  sky.name = "menu-sky";
  sky.frustumCulled = false;
  sky.renderOrder = -20;
  return sky;
}

function createSkyGlow() {
  const material = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });
  material.colorNode = color("#ffe9a8").mul(2.35);

  const glow = new THREE.Mesh(new THREE.CircleGeometry(1.05, 48), material);
  glow.name = "menu-sky-glow";
  glow.position.set(-5.7, 4.7, -11.5);
  return glow;
}

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createFrondAtlas() {
  const cellWidth = 320;
  const height = 256;
  const atlas = document.createElement("canvas");
  atlas.width = cellWidth * FROND_VARIANTS;
  atlas.height = height;
  const context = atlas.getContext("2d");
  if (!context) throw new Error("Could not create the palm frond atlas.");

  context.clearRect(0, 0, atlas.width, atlas.height);
  context.lineCap = "round";
  context.lineJoin = "round";

  const palettes = [
    ["#2f7044", "#74b95e", "#b6d982"],
    ["#376f47", "#83bd62", "#c7df8b"],
    ["#285f3d", "#68a956", "#a8cf72"],
    ["#3b7950", "#8ac66b", "#d0e49b"]
  ];

  for (let variant = 0; variant < FROND_VARIANTS; variant += 1) {
    const random = seededRandom(0x91e10da5 + variant * 92821);
    const cellX = variant * cellWidth;
    const rootX = cellX + 15;
    const tipX = cellX + cellWidth - 14;
    const centerY = height * (0.5 + (variant - 1.5) * 0.012);
    const [dark, mid, light] = palettes[variant];

    const ribGradient = context.createLinearGradient(rootX, centerY, tipX, centerY);
    ribGradient.addColorStop(0, dark);
    ribGradient.addColorStop(0.55, mid);
    ribGradient.addColorStop(1, light);
    context.strokeStyle = ribGradient;
    context.lineWidth = 8;
    context.beginPath();
    context.moveTo(rootX, centerY);
    context.bezierCurveTo(
      cellX + cellWidth * 0.34,
      centerY - 8,
      cellX + cellWidth * 0.7,
      centerY + 4,
      tipX,
      centerY + 18 + variant * 2
    );
    context.stroke();

    const leafletCount = 23;
    for (let index = 2; index < leafletCount; index += 1) {
      const t = index / leafletCount;
      const baseX = rootX + (tipX - rootX) * t;
      const arc = 18 * t * t;
      const baseY = centerY + arc;
      const fullness = Math.sin(Math.PI * t);
      const length = (38 + fullness * 72) * (0.9 + random() * 0.18);
      const width = 5 + fullness * 9;
      const lean = 7 + t * 15;
      const tear = random() > 0.84 ? 0.72 : 1;

      for (const side of [-1, 1]) {
        const sideLength = length * tear * (0.92 + random() * 0.12);
        const tipY = baseY + side * sideLength;
        const tipOffsetX = lean + random() * 8;
        const fill = context.createLinearGradient(baseX, baseY, baseX + tipOffsetX, tipY);
        fill.addColorStop(0, dark);
        fill.addColorStop(0.48, mid);
        fill.addColorStop(1, light);

        context.fillStyle = fill;
        context.beginPath();
        context.moveTo(baseX - width * 0.35, baseY);
        context.quadraticCurveTo(
          baseX + tipOffsetX * 0.35,
          baseY + side * sideLength * 0.46,
          baseX + tipOffsetX,
          tipY
        );
        context.quadraticCurveTo(
          baseX + tipOffsetX * 0.55,
          baseY + side * sideLength * 0.42,
          baseX + width * 0.42,
          baseY + side * 1.5
        );
        context.closePath();
        context.fill();

        context.globalAlpha = 0.34;
        context.strokeStyle = side > 0 ? "#e8f0ad" : "#204f35";
        context.lineWidth = Math.max(1, width * 0.12);
        context.beginPath();
        context.moveTo(baseX, baseY);
        context.quadraticCurveTo(
          baseX + tipOffsetX * 0.4,
          baseY + side * sideLength * 0.5,
          baseX + tipOffsetX * 0.92,
          tipY - side * 3
        );
        context.stroke();
        context.globalAlpha = 1;
      }
    }
  }

  const texture = new THREE.CanvasTexture(atlas);
  texture.name = "menu-palm-frond-atlas";
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function createFrondCardGeometry({ length, width, droop, variant }) {
  const segments = 5;
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let segment = 0; segment <= segments; segment += 1) {
    const t = segment / segments;
    const x = length * t;
    const y = -droop * t * t;
    const centerZ = Math.sin(t * Math.PI) * 0.08;
    const halfWidth = width * (0.2 + Math.sin(Math.PI * t) * 0.8) * 0.5;
    const u = (variant + t) / FROND_VARIANTS;

    positions.push(
      x, y, centerZ - halfWidth,
      x, y, centerZ + halfWidth
    );
    uvs.push(u, 0, u, 1);
  }

  for (let segment = 0; segment < segments; segment += 1) {
    const left = segment * 2;
    indices.push(
      left, left + 2, left + 1,
      left + 1, left + 2, left + 3
    );
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
  const buffer = new THREE.StorageBufferAttribute(FROND_COUNT, 1);
  const values = storage(buffer, "float", FROND_COUNT);
  const compute = Fn(() => {
    const phase = float(instanceIndex).mul(0.83);
    const gust = time
      .mul(0.46)
      .add(phase)
      .sin()
      .add(time.mul(0.17).add(phase.mul(1.37)).sin().mul(0.28));
    values.element(instanceIndex).assign(gust);
  })().compute(FROND_COUNT).setName("Menu Frond Card Wind");
  return { values, compute };
}

function createFrondMaterial(atlas, index, length) {
  const material = new THREE.MeshPhysicalNodeMaterial({
    map: atlas,
    alphaTest: 0.48,
    transparent: false,
    side: THREE.DoubleSide,
    depthWrite: true,
    roughness: 0.66,
    metalness: 0,
    clearcoat: 0.035,
    clearcoatRoughness: 0.86,
    sheen: 0.08,
    sheenColor: new THREE.Color("#e1edaa"),
    sheenRoughness: 0.82
  });

  const along = positionLocal.x.div(length).clamp(0, 1);
  const phase = index * 0.83;
  const windSignal = windStorage
    ? windStorage.element(index)
    : time
      .mul(0.46)
      .add(phase)
      .sin()
      .add(time.mul(0.17).add(phase * 1.37).sin().mul(0.28));
  const gust = windSignal
    .mul(reducedMotion ? 0 : 0.105)
    .mul(along.pow(1.55));

  material.positionNode = positionLocal.add(vec3(
    gust.mul(0.04),
    gust.mul(0.08),
    gust.mul(0.3)
  ));
  material.roughnessNode = float(0.62).add(
    positionLocal.x.mul(5.7).sin().abs().mul(0.09)
  );
  return material;
}

function createTrunkMaterial() {
  const material = new THREE.MeshStandardNodeMaterial({
    roughness: 0.91,
    metalness: 0
  });
  const height = positionLocal.y.div(5).clamp(0, 1);
  const rings = positionLocal.y.mul(10).add(positionLocal.x.mul(3)).sin().mul(0.5).add(0.5);
  const fibers = positionLocal.x.mul(18).add(positionLocal.z.mul(12)).sin().abs();

  material.colorNode = mix(
    color("#684027"),
    color("#a96f43"),
    rings.mul(0.48).add(height.mul(0.22))
  );
  material.roughnessNode = float(0.78)
    .add(rings.mul(0.12))
    .add(fibers.mul(0.06));

  const sway = time
    .mul(0.31)
    .sin()
    .mul(height.pow(2))
    .mul(reducedMotion ? 0 : 0.025);
  material.positionNode = positionLocal.add(vec3(
    sway,
    float(0),
    sway.mul(0.2)
  ));
  return material;
}

function createPalm(frondAtlas) {
  const palm = new THREE.Group();
  palm.name = "menu-hero-palm";
  palm.position.set(-2.65, -2.05, 0.15);
  palm.rotation.y = -0.22;

  const trunkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.03, 0.8, 0.02),
    new THREE.Vector3(0.1, 1.7, -0.02),
    new THREE.Vector3(0.28, 2.65, 0.02),
    new THREE.Vector3(0.5, 3.55, -0.02),
    new THREE.Vector3(0.72, 4.35, 0)
  ]);

  const trunk = new THREE.Mesh(
    new THREE.TubeGeometry(trunkCurve, 44, 0.29, 10, false),
    createTrunkMaterial()
  );
  trunk.name = "menu-palm-trunk";
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  palm.add(trunk);

  const crown = new THREE.Group();
  crown.name = "menu-palm-crown";
  crown.position.copy(trunkCurve.getPoint(1));
  palm.add(crown);

  const hub = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 16, 10),
    new THREE.MeshStandardNodeMaterial({
      color: "#785139",
      roughness: 0.88,
      metalness: 0
    })
  );
  hub.name = "menu-palm-crown-hub";
  hub.scale.set(1.08, 0.75, 1);
  hub.castShadow = true;
  crown.add(hub);

  for (let index = 0; index < FROND_COUNT; index += 1) {
    const length = 2.8 + (index % 3) * 0.18;
    const card = new THREE.Mesh(
      createFrondCardGeometry({
        length,
        width: 1.5 + (index % 2) * 0.12,
        droop: 0.48 + (index % 3) * 0.08,
        variant: index % FROND_VARIANTS
      }),
      createFrondMaterial(frondAtlas, index, length)
    );
    const angle = index / FROND_COUNT * Math.PI * 2;
    const tier = index % 3;
    card.name = `menu-palm-frond-card-${index}`;
    card.rotation.set(
      -0.18 + tier * 0.08,
      angle,
      -0.04 + Math.sin(angle) * 0.07
    );
    card.castShadow = true;
    crown.add(card);
  }

  return palm;
}

function createFlowerAtlas() {
  const canvasTexture = document.createElement("canvas");
  canvasTexture.width = 384;
  canvasTexture.height = 128;
  const context = canvasTexture.getContext("2d");
  if (!context) throw new Error("Could not create the flower atlas.");

  const palettes = [
    ["#f3a7b9", "#ffe2e7", "#d97996"],
    ["#f4d780", "#fff1b7", "#d4a84b"],
    ["#f4f0e8", "#ffffff", "#d9cfc2"]
  ];

  for (let variant = 0; variant < 3; variant += 1) {
    const originX = variant * 128;
    const [petal, highlight, center] = palettes[variant];
    context.globalAlpha = 0.78;
    for (let flower = 0; flower < 5; flower += 1) {
      const x = originX + 18 + flower * 22 + (flower % 2) * 5;
      const y = 76 - (flower % 3) * 10;
      const radius = 9 + (flower % 2) * 2;
      context.fillStyle = petal;
      for (let petalIndex = 0; petalIndex < 5; petalIndex += 1) {
        const angle = petalIndex / 5 * Math.PI * 2;
        context.beginPath();
        context.ellipse(
          x + Math.cos(angle) * radius * 0.75,
          y + Math.sin(angle) * radius * 0.75,
          radius * 0.56,
          radius * 0.34,
          angle,
          0,
          Math.PI * 2
        );
        context.fill();
      }
      context.fillStyle = highlight;
      context.beginPath();
      context.arc(x - 2, y - 2, radius * 0.28, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = center;
      context.beginPath();
      context.arc(x, y, radius * 0.22, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 0.34;
    context.strokeStyle = "#66895f";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(originX + 10, 122);
    context.quadraticCurveTo(originX + 62, 92, originX + 118, 116);
    context.stroke();
  }
  context.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvasTexture);
  texture.name = "menu-flower-atlas";
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

function createBackgroundFlowers(texture) {
  const flowers = new THREE.Group();
  flowers.name = "menu-background-flowers";

  for (let index = 0; index < 3; index += 1) {
    const geometry = new THREE.PlaneGeometry(2.1, 0.82);
    const uv = geometry.getAttribute("uv");
    const start = index / 3;
    const end = (index + 1) / 3;
    for (let vertex = 0; vertex < uv.count; vertex += 1) {
      uv.setX(vertex, start + uv.getX(vertex) * (end - start));
    }
    uv.needsUpdate = true;

    const material = new THREE.MeshBasicNodeMaterial({
      map: texture,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
      side: THREE.DoubleSide,
      fog: true
    });
    const card = new THREE.Mesh(geometry, material);
    card.name = `menu-flower-card-${index}`;
    card.position.set(
      [-5.25, 0.35, 3.75][index],
      [-1.48, -1.62, -1.52][index],
      [-5.8, -6.3, -6.7][index]
    );
    card.rotation.y = [0.14, -0.08, -0.18][index];
    card.scale.setScalar([0.9, 0.72, 0.8][index]);
    flowers.add(card);
  }

  return flowers;
}

function createShoreline() {
  const material = new THREE.MeshBasicNodeMaterial({
    color: "#e9d2a4",
    transparent: true,
    opacity: 0.54,
    depthWrite: false,
    fog: true
  });
  const shoreline = new THREE.Mesh(new THREE.PlaneGeometry(18, 1.15), material);
  shoreline.name = "menu-distant-shoreline";
  shoreline.position.set(0, -1.82, -7.15);
  shoreline.rotation.x = -0.035;
  return shoreline;
}

function createWaterStrip() {
  const geometry = new THREE.PlaneGeometry(19, 7, 28, 5);
  geometry.rotateX(-Math.PI * 0.5);

  const material = new THREE.MeshPhysicalNodeMaterial({
    color: "#72bfc2",
    roughness: 0.36,
    metalness: 0,
    transparent: true,
    opacity: 0.72,
    depthWrite: false
  });
  const wave = positionLocal.x
    .mul(0.85)
    .add(time.mul(0.34))
    .sin()
    .mul(0.028)
    .add(
      positionLocal.z
        .mul(1.2)
        .sub(time.mul(0.22))
        .sin()
        .mul(0.018)
    );
  material.positionNode = positionLocal.add(vec3(0, wave, 0));
  material.colorNode = mix(
    color("#8bd0ce"),
    color("#4fa8b3"),
    positionLocal.z.add(4).div(8).clamp(0, 1)
  );
  material.roughnessNode = float(0.34).add(wave.abs().mul(1.6));

  const water = new THREE.Mesh(geometry, material);
  water.name = "menu-water-strip";
  water.position.set(0.5, -2.2, -5.4);
  water.renderOrder = -5;
  return water;
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
  renderer.toneMappingExposure = 0.92;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#b4ddd8");
  scene.fog = new THREE.Fog("#cee7de", 10, 24);

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 90);
  camera.position.set(-4.8, 4.7, 12.2);
  camera.lookAt(-0.55, -0.15, 0);

  scene.add(createSky());
  scene.add(createSkyGlow());
  scene.add(createWaterStrip());
  scene.add(createShoreline());
  scene.add(createBackgroundFlowers(createFlowerAtlas()));

  const hemisphere = new THREE.HemisphereLight(0xe8fff7, 0x8b9a72, 1.85);
  scene.add(hemisphere);

  const sun = new THREE.DirectionalLight(0xffe3b1, 2.55);
  sun.position.set(-5.2, 8, 5.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -7;
  sun.shadow.camera.right = 7;
  sun.shadow.camera.top = 7;
  sun.shadow.camera.bottom = -7;
  sun.shadow.camera.near = 0.1;
  sun.shadow.camera.far = 30;
  sun.shadow.bias = -0.00012;
  sun.shadow.normalBias = 0.03;
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xdaf7ed, 0.75);
  fill.position.set(5, 4, -4);
  scene.add(fill);

  const frondAtlas = createFrondAtlas();
  const palm = createPalm(frondAtlas);
  scene.add(palm);

  renderPipeline = new THREE.RenderPipeline(renderer);
  const scenePass = pass(scene, camera);
  const sceneColor = scenePass.getTextureNode("output");
  const bloomPass = bloom(sceneColor, 0.14, 0.28, 1.22);
  bloomPass.setResolutionScale(0.5);
  renderPipeline.outputNode = sceneColor.add(bloomPass);

  function resize() {
    const width = Math.max(1, innerWidth);
    const height = Math.max(1, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
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
    frondAtlas,
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