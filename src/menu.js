import * as THREE from "three";

const canvas = document.querySelector("#menu-scene");
const frame = document.querySelector("#game-preload");
const playButton = document.querySelector("#play");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

let gameReady = false;
let entering = false;
let preloadStarted = false;
let lastProgress = 0.01;
let sceneRunning = true;

if (!canvas) throw new Error("Missing #menu-scene canvas.");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  powerPreference: "low-power"
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
camera.position.set(0.25, 1.2, 9.5);
camera.lookAt(-1.35, 0.85, 0);

function createSky() {
  const geometry = new THREE.SphereGeometry(36, 32, 18);
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color("#ed9473") },
      middleColor: { value: new THREE.Color("#f4c491") },
      bottomColor: { value: new THREE.Color("#71b7aa") }
    },
    vertexShader: `
      varying vec3 vDirection;
      void main() {
        vDirection = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 middleColor;
      uniform vec3 bottomColor;
      varying vec3 vDirection;
      void main() {
        float h = clamp(vDirection.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 lower = mix(bottomColor, middleColor, smoothstep(0.0, 0.62, h));
        vec3 color = mix(lower, topColor, smoothstep(0.55, 1.0, h));
        gl_FragColor = vec4(color, 1.0);
      }
    `
  });
  const sky = new THREE.Mesh(geometry, material);
  sky.name = "menu-sky";
  return sky;
}

function createFrondGeometry(length = 2.65, width = 0.48, droop = 0.58) {
  const segments = 9;
  const positions = [];
  const indices = [];
  const uvs = [];

  for (let index = 0; index <= segments; index += 1) {
    const t = index / segments;
    const x = length * t;
    const y = -droop * t * t;
    const halfWidth = Math.sin(Math.PI * t) * width * 0.5 * (1 - t * 0.38);
    positions.push(x, y, -halfWidth, x, y, halfWidth);
    uvs.push(t, 0, t, 1);
  }

  for (let index = 0; index < segments; index += 1) {
    const a = index * 2;
    const b = a + 1;
    const c = a + 2;
    const d = a + 3;
    indices.push(a, c, b, b, c, d);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createPalm() {
  const palm = new THREE.Group();
  palm.name = "menu-hero-palm";
  palm.position.set(-2.15, -2.85, 0);
  palm.rotation.y = 0.16;

  const trunkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.08, 1.2, 0.02),
    new THREE.Vector3(0.28, 2.7, 0),
    new THREE.Vector3(0.62, 4.2, -0.04),
    new THREE.Vector3(0.98, 5.35, 0)
  ]);
  const trunk = new THREE.Mesh(
    new THREE.TubeGeometry(trunkCurve, 36, 0.24, 9, false),
    new THREE.MeshStandardMaterial({ color: "#8a6040", roughness: 0.92, metalness: 0 })
  );
  trunk.name = "menu-palm-trunk";
  palm.add(trunk);

  const crown = new THREE.Group();
  crown.name = "menu-palm-crown";
  crown.position.copy(trunkCurve.getPoint(1));
  palm.add(crown);

  const leafMaterials = [
    new THREE.MeshStandardMaterial({ color: "#4d9a62", roughness: 0.88, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: "#63ae69", roughness: 0.88, side: THREE.DoubleSide }),
    new THREE.MeshStandardMaterial({ color: "#78b86e", roughness: 0.88, side: THREE.DoubleSide })
  ];

  const fronds = [];
  for (let index = 0; index < 11; index += 1) {
    const angle = index / 11 * Math.PI * 2;
    const frond = new THREE.Mesh(
      createFrondGeometry(2.35 + (index % 3) * 0.18, 0.46, 0.48 + (index % 2) * 0.12),
      leafMaterials[index % leafMaterials.length]
    );
    frond.name = `menu-palm-frond-${index}`;
    frond.rotation.set(-0.14 + (index % 3) * 0.08, angle, -0.08 + Math.sin(angle) * 0.12);
    frond.userData.baseRotation = frond.rotation.clone();
    frond.userData.phase = index * 0.71;
    crown.add(frond);
    fronds.push(frond);
  }

  const coconutMaterial = new THREE.MeshStandardMaterial({ color: "#6e4c32", roughness: 0.95 });
  for (let index = 0; index < 4; index += 1) {
    const angle = index / 4 * Math.PI * 2 + 0.42;
    const coconut = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 8), coconutMaterial);
    coconut.scale.set(0.88, 1.12, 0.88);
    coconut.position.set(Math.cos(angle) * 0.28, -0.17 - (index % 2) * 0.05, Math.sin(angle) * 0.28);
    crown.add(coconut);
  }

  return { palm, crown, fronds };
}

scene.add(createSky());
scene.add(new THREE.HemisphereLight(0xffefd1, 0x356f68, 2.15));
const sunlight = new THREE.DirectionalLight(0xffd69a, 2.4);
sunlight.position.set(-5, 8, 6);
scene.add(sunlight);

const { palm, crown, fronds } = createPalm();
scene.add(palm);

function resize() {
  const width = Math.max(1, innerWidth);
  const height = Math.max(1, innerHeight);
  const ratio = Math.min(devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(ratio);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function render(time = 0) {
  if (!sceneRunning) return;
  const seconds = time * 0.001;
  if (!reducedMotion) {
    palm.rotation.z = Math.sin(seconds * 0.38) * 0.012;
    crown.rotation.z = Math.sin(seconds * 0.54) * 0.035;
    for (const frond of fronds) {
      const base = frond.userData.baseRotation;
      frond.rotation.x = base.x + Math.sin(seconds * 0.72 + frond.userData.phase) * 0.025;
      frond.rotation.z = base.z + Math.sin(seconds * 0.88 + frond.userData.phase) * 0.04;
    }
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
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
    renderer.dispose();
  }, reducedMotion ? 0 : 820);
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
addEventListener("resize", resize);

resize();
requestAnimationFrame(render);
requestAnimationFrame(() => {
  const schedule = globalThis.requestIdleCallback
    ? (callback) => requestIdleCallback(callback, { timeout: 450 })
    : (callback) => setTimeout(callback, 80);
  schedule(startPreload);
});
