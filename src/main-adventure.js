import * as THREE from "three/webgpu";
import {
  chooseRenderQuality,
  createPerformanceBudget,
  createDebugOverlay,
  createStylizedWorldRenderer,
  createAtmosphereVolumeTextures,
  createVolumetricCloudRenderer,
  createRollingFogRenderer,
  createWebGPUOceanRenderer,
  createWebGPUFoamRenderer,
  createWebGPUPostPipeline,
  createCozyOceanCompositionKit,
  COZY_RENDER_LAYERS,
  assignRenderLayer
} from "./kits/index.js";
import { createCozyAdventure } from "./adventure/composition-runtime.js";
import { createCozyGameplayRenderer } from "./adventure/renderer-gameplay.js";
import { createCozyStartupHost } from "./adventure/startup-host.js";

const SAVE_KEY = "my-cozy-island.adventure-save.v1";
const canvas = document.querySelector("#game");
const loader = document.querySelector("#loader");
const loaderFill = document.querySelector("#loader-fill");
const loaderText = document.querySelector("#loader-text");
const errorPanel = document.querySelector("#error");
const debugRoot = document.querySelector("#debug");
const objectiveRoot = document.querySelector("#objective");
const promptRoot = document.querySelector("#prompt");
const seedRoot = document.querySelector("#seed-label");
const seedCountRoot = document.querySelector("#seed-count");
const foodRoot = document.querySelector("#food-count");
const coconutRoot = document.querySelector("#coconut-count");
const staminaFill = document.querySelector("#stamina-fill");
const hotbarRoot = document.querySelector("#hotbar");
const saveRoot = document.querySelector("#save-status");

const startupHost = createCozyStartupHost({
  loader,
  fill: loaderFill,
  label: loaderText,
  error: errorPanel
});

function fail(error) {
  console.error(error);
  try {
    startupHost.fail(error, {
      code: error?.code ?? "cozy.startup.unhandled",
      source: "main-adventure"
    });
  } catch (startupError) {
    console.error("Could not report startup failure", startupError);
    if (errorPanel) {
      errorPanel.hidden = false;
      errorPanel.textContent = String(error?.stack ?? error?.message ?? error);
    }
    if (loaderText) loaderText.textContent = "Could not start My Cozy Island";
  }
}

function createSky(illumination) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 1024;
  textureCanvas.height = 512;
  const context = textureCanvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 0, textureCanvas.height);
  gradient.addColorStop(0, "#eaa06d");
  gradient.addColorStop(0.3, illumination.skyTop);
  gradient.addColorStop(0.68, illumination.skyHorizon);
  gradient.addColorStop(1, "#85c4bd");
  context.fillStyle = gradient;
  context.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

  const skyMap = new THREE.CanvasTexture(textureCanvas);
  skyMap.colorSpace = THREE.SRGBColorSpace;
  const environmentMap = new THREE.CanvasTexture(textureCanvas);
  environmentMap.colorSpace = THREE.SRGBColorSpace;
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  const material = new THREE.MeshBasicNodeMaterial({ map: skyMap, side: THREE.BackSide });
  material.fog = false;
  material.depthTest = false;
  material.depthWrite = false;
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(3000, 48, 24), material);
  mesh.name = "cozy-adventure-golden-hour-sky";
  mesh.frustumCulled = false;
  mesh.renderOrder = -20;
  assignRenderLayer(mesh, COZY_RENDER_LAYERS.CLOUD_VOLUME, false);
  return Object.freeze({ mesh, environmentMap, skyMap });
}

function loadSave(adventure) {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { ok: false, reason: "empty" };
    return adventure.engine.n.cozySave.restore(JSON.parse(raw));
  } catch (error) {
    console.warn("Could not restore cozy island save", error);
    return { ok: false, error: String(error?.message ?? error) };
  }
}

function storeSave(adventure) {
  try {
    const snapshot = adventure.engine.n.cozySave.capture();
    localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot));
    return { ok: true, checksum: snapshot.checksum };
  } catch (error) {
    console.warn("Could not persist cozy island save", error);
    return { ok: false, error: String(error?.message ?? error) };
  }
}

function updateHud(frame) {
  const hud = frame.hud;
  if (!hud) return;
  if (objectiveRoot) objectiveRoot.textContent = hud.objective;
  if (promptRoot) promptRoot.textContent = hud.prompt;
  if (seedRoot) seedRoot.textContent = hud.selectedSeedLabel;
  if (seedCountRoot) seedCountRoot.textContent = String(hud.selectedSeedCount);
  if (foodRoot) foodRoot.textContent = String(hud.foodCount);
  if (coconutRoot) coconutRoot.textContent = String(hud.coconutCount);
  if (staminaFill) staminaFill.style.width = `${Math.max(0, Math.min(100, hud.stamina))}%`;
  if (saveRoot) saveRoot.textContent = frame.save.status === "captured" ? "Saved" : "Auto-save on";
  if (hotbarRoot) {
    for (const option of hud.seedOptions ?? []) {
      const slot = hotbarRoot.querySelector(`[data-seed-index="${option.index}"]`);
      if (!slot) continue;
      slot.classList.toggle("is-selected", option.selected);
      const amount = slot.querySelector("[data-amount]");
      if (amount) amount.textContent = String(option.amount);
      const label = slot.querySelector("[data-label]");
      if (label) label.textContent = option.label;
    }
  }
}

async function main() {
  if (!canvas) throw new Error("Missing #game canvas.");

  startupHost.working("renderer", 0.05, "Starting the presentation backend");
  const renderer = new THREE.WebGPURenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance",
    trackTimestamp: true
  });
  await startupHost.withTimeout(renderer.init(), {
    milliseconds: 15000,
    label: "Renderer initialization",
    code: "cozy.renderer.initialization-timeout"
  });
  const backend = renderer.backend?.isWebGPUBackend ? "webgpu" : "webgl2";
  const quality = chooseRenderQuality({ backend });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, quality.pixelRatioCap));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  startupHost.ready("renderer", { backend, qualityTier: quality.tier }, `${backend === "webgpu" ? "WebGPU" : "WebGL2"} presentation ready`);

  startupHost.working("composition", 0.2, "Installing island adventure services");
  const adventure = createCozyAdventure({
    quality,
    backend,
    engine: startupHost.engine
  });
  startupHost.ready("composition", {
    kitCount: adventure.engine.kits.length,
    domainPaths: adventure.engine.n.paths().map((entry) => entry.path)
  }, "Adventure services installed");

  const restoreResult = loadSave(adventure);
  startupHost.selectContinuation(restoreResult);
  const staticSnapshot = adventure.getStaticSnapshot();
  const initialFrame = adventure.getFrameSnapshot();
  renderer.toneMappingExposure = initialFrame.illumination.exposure;

  startupHost.working("world", 0.12, "Building one authoritative island and farm");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#efc18f");
  scene.fog = new THREE.Fog(
    new THREE.Color(staticSnapshot.aerialPerspective.horizonTint),
    staticSnapshot.aerialPerspective.nearStart * 2.4,
    staticSnapshot.aerialPerspective.farEnd
  );
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 3600);
  camera.layers.enable(COZY_RENDER_LAYERS.OPAQUE_WORLD);
  camera.layers.enable(COZY_RENDER_LAYERS.WATER_SURFACE);
  camera.layers.enable(COZY_RENDER_LAYERS.CLOUD_VOLUME);
  camera.layers.disable(COZY_RENDER_LAYERS.FOAM_OVERLAY);
  camera.layers.disable(COZY_RENDER_LAYERS.FOG_VOLUME);

  const sky = createSky(initialFrame.illumination);
  scene.add(sky.mesh);
  scene.environment = sky.environmentMap;

  const hemisphere = new THREE.HemisphereLight(0xfff0d6, 0x2e6971, initialFrame.illumination.ambientIntensity);
  hemisphere.layers.enable(COZY_RENDER_LAYERS.WATER_SURFACE);
  scene.add(hemisphere);
  const sun = new THREE.DirectionalLight(initialFrame.illumination.sunColor, initialFrame.illumination.sunIntensity);
  sun.position.set(-420, 590, 335);
  sun.layers.enable(COZY_RENDER_LAYERS.WATER_SURFACE);
  sun.castShadow = true;
  sun.shadow.mapSize.set(quality.shadowMapSize, quality.shadowMapSize);
  sun.shadow.camera.left = -235;
  sun.shadow.camera.right = 235;
  sun.shadow.camera.top = 235;
  sun.shadow.camera.bottom = -235;
  sun.shadow.camera.near = 90;
  sun.shadow.camera.far = 1080;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  scene.add(sun);

  const worldRenderer = createStylizedWorldRenderer(staticSnapshot);
  scene.add(worldRenderer.group);
  const gameplayRenderer = createCozyGameplayRenderer(staticSnapshot);
  scene.add(gameplayRenderer.group);
  gameplayRenderer.update(initialFrame);

  const oceanRenderer = createWebGPUOceanRenderer({
    waveState: staticSnapshot.oceanWaves,
    optics: staticSnapshot.oceanOptics,
    quality
  });
  scene.add(oceanRenderer.mesh);
  const foamRenderer = createWebGPUFoamRenderer(staticSnapshot.foam);

  startupHost.working(
    "world",
    0.52,
    backend === "webgpu" ? "Computing rolling clouds and fog on the GPU" : "Baking reliable fallback atmosphere"
  );
  const volumeTextures = await startupHost.withTimeout(createAtmosphereVolumeTextures({
    renderer,
    cloudRecipe: staticSnapshot.cloudDensity,
    fogRecipe: staticSnapshot.fogDensity,
    backend
  }), {
    milliseconds: 20000,
    label: "Atmosphere preparation",
    code: "cozy.atmosphere.preparation-timeout"
  });
  const cloudRenderer = createVolumetricCloudRenderer({
    densityTexture: volumeTextures.cloudTexture,
    recipe: staticSnapshot.cloudDensity,
    lighting: staticSnapshot.cloudLighting,
    lod: staticSnapshot.cloudLod,
    horizon: staticSnapshot.cloudHorizon
  });
  assignRenderLayer(cloudRenderer.group, COZY_RENDER_LAYERS.CLOUD_VOLUME, true);
  scene.add(cloudRenderer.group);

  startupHost.working("world", 0.78, "Placing readable golden-hour rolling fog");
  const fogRenderer = createRollingFogRenderer({
    fogTexture: volumeTextures.fogTexture,
    recipe: staticSnapshot.fogDensity,
    advection: staticSnapshot.fogAdvection,
    placement: staticSnapshot.fogPlacement,
    quality
  });
  scene.add(fogRenderer.group);

  const oceanComposition = createCozyOceanCompositionKit();
  const postPipeline = createWebGPUPostPipeline({
    renderer,
    scene,
    camera,
    fogRenderer,
    foamRenderer,
    layerGraph: oceanComposition,
    quality
  });
  const debugOverlay = createDebugOverlay(debugRoot);
  const performanceBudget = createPerformanceBudget({
    quality,
    onDegrade: ({ level }) => {
      const scale = level === 0 ? 1 : level === 1 ? 0.78 : 0.62;
      cloudRenderer.setStepScale(scale);
      fogRenderer.setStepScale(scale);
      postPipeline.setFogResolutionScale(quality.fogResolutionScale * (level === 0 ? 1 : level === 1 ? 0.82 : 0.68));
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, quality.pixelRatioCap * (level === 0 ? 1 : level === 1 ? 0.88 : 0.76)));
    },
    onRecover: ({ level }) => {
      const scale = level === 0 ? 1 : level === 1 ? 0.78 : 0.62;
      cloudRenderer.setStepScale(scale);
      fogRenderer.setStepScale(scale);
      postPipeline.setFogResolutionScale(quality.fogResolutionScale * (level === 0 ? 1 : level === 1 ? 0.82 : 0.68));
    }
  });

  const input = adventure.engine.n.cozyInput;
  let drag = null;
  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    input.enqueueWheel(event.deltaY, event.deltaMode, innerHeight);
  }, { passive: false });
  canvas.addEventListener("pointerdown", (event) => {
    drag = { x: event.clientX, y: event.clientY, id: event.pointerId };
    canvas.setPointerCapture?.(event.pointerId);
    canvas.focus();
  });
  canvas.addEventListener("pointerup", (event) => {
    drag = null;
    canvas.releasePointerCapture?.(event.pointerId);
  });
  canvas.addEventListener("pointercancel", () => { drag = null; });
  canvas.addEventListener("pointermove", (event) => {
    if (!drag) return;
    input.enqueuePointer(event.clientX - drag.x, event.clientY - drag.y);
    drag = { x: event.clientX, y: event.clientY, id: event.pointerId };
  });
  addEventListener("keydown", (event) => {
    if (event.code === "KeyH") {
      debugOverlay.toggle();
      return;
    }
    if (["KeyW", "KeyA", "KeyS", "KeyD", "KeyE", "KeyQ", "Space", "ArrowUp", "ArrowDown"].includes(event.code)) event.preventDefault();
    input.enqueueKey(event.code, true, { repeat: event.repeat });
  });
  addEventListener("keyup", (event) => input.enqueueKey(event.code, false));
  addEventListener("blur", () => input.clear("window-blur"));
  addEventListener("visibilitychange", () => { if (document.hidden) input.clear("document-hidden"); });
  startupHost.ready("input", { adapter: "cozy-browser-input" }, "Player controls ready");

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }
  addEventListener("resize", resize);
  resize();

  startupHost.ready("world", {
    snapshotId: staticSnapshot.id ?? "cozy-static-world",
    atmosphereSource: volumeTextures.source,
    renderPasses: postPipeline.getPhysicalPassOrder()
  }, "Island presentation ready");

  let last = performance.now();
  let frames = 0;
  let startupEntered = false;
  let lastSaveFingerprint = adventure.engine.n.cozySave.fingerprint();
  let autoSaveAccumulator = 0;
  renderer.setAnimationLoop((now) => {
    const frameMs = Math.min(100, Math.max(0, now - last));
    const dt = Math.min(0.05, frameMs / 1000);
    last = now;
    const frame = adventure.tick(dt);
    const requestedFov = Number(frame.camera.fov ?? 80);
    if (Math.abs(camera.fov - requestedFov) > 0.001) {
      camera.fov = requestedFov;
      camera.updateProjectionMatrix();
    }
    camera.position.set(frame.camera.position.x, frame.camera.position.y, frame.camera.position.z);
    camera.lookAt(frame.camera.lookAt.x, frame.camera.lookAt.y, frame.camera.lookAt.z);

    renderer.toneMappingExposure = Number(frame.illumination.exposure ?? 1.08);
    hemisphere.intensity = Number(frame.illumination.ambientIntensity ?? hemisphere.intensity);
    sun.color.set(frame.illumination.sunColor);
    sun.intensity = Number(frame.illumination.sunIntensity ?? sun.intensity);

    worldRenderer.update(frame.clock.elapsedSeconds);
    gameplayRenderer.update(frame);
    foamRenderer.update(frame.clock.elapsedSeconds);
    updateHud(frame);
    performanceBudget.sample(frameMs);
    postPipeline.render();

    if (!startupEntered) {
      startupEntered = true;
      startupHost.presentFirstFrame({
        frameId: `frame:${frames + 1}`,
        presentationId: "cozy-main",
        backend,
        receipt: { renderPasses: postPipeline.getPhysicalPassOrder() }
      });
      startupHost.enter({ inputReady: true });
      setTimeout(() => {
        if (loader) loader.hidden = true;
      }, 520);
    }

    autoSaveAccumulator += dt;
    if (autoSaveAccumulator >= 5) {
      autoSaveAccumulator = 0;
      const fingerprint = adventure.engine.n.cozySave.fingerprint();
      if (fingerprint !== lastSaveFingerprint) {
        const saved = storeSave(adventure);
        if (saved.ok) lastSaveFingerprint = fingerprint;
      }
    }

    frames += 1;
    if (frames % 12 === 0) {
      const perf = performanceBudget.getState();
      const state = adventure.getState();
      debugOverlay.draw({
        backend: backend === "webgpu" ? `WebGPU compute · ${volumeTextures.source}` : `WebGL2 · ${volumeTextures.source}`,
        quality: `${quality.tier} · ${state.domainPaths.length} Nexus DSKs · ${state.objectCount} objects · ${frame.camera.mode}`,
        fps: perf.fps || 60,
        cloudSteps: cloudRenderer.getSteps(),
        fogSteps: fogRenderer.getSteps(),
        kitCount: state.domainPaths.length
      });
    }
  });

  addEventListener("pagehide", () => {
    storeSave(adventure);
    gameplayRenderer.dispose();
  }, { once: true });

  globalThis.CozyIsland = Object.freeze({
    renderer,
    scene,
    camera,
    backend,
    quality,
    adventure,
    engine: adventure.engine,
    startup: startupHost.startup,
    startupHost,
    world: adventure.engine.n.cozyWorld,
    input: adventure.engine.n.cozyInput,
    player: adventure.engine.n.cozyPlayer,
    inventory: adventure.engine.n.cozyInventory,
    farming: adventure.engine.n.cozyFarming,
    foraging: adventure.engine.n.cozyForaging,
    interaction: adventure.engine.n.cozyInteraction,
    save: adventure.engine.n.cozySave,
    renderLayerGraph: oceanComposition.graph,
    renderPassOrder: postPipeline.getPassOrder(),
    physicalRenderPassOrder: postPipeline.getPhysicalPassOrder(),
    getState: () => adventure.getState(),
    captureSave: () => adventure.engine.n.cozySave.capture(),
    resetAdventure: () => adventure.engine.n.cozySave.resetAll()
  });
}

main().catch(fail);
