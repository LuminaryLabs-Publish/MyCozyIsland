import * as THREE from "three/webgpu";
import { validateKitCatalog } from "./core/domain-kit.js";
import {
  kitCatalog,
  createDeterministicSeedService,
  createEnvironmentClock,
  createWindField,
  createWeatherState,
  createIlluminationState,
  createTerrainSurface,
  createTerrainBiomeField,
  createShorelineField,
  createTerrainLodPolicy,
  createOceanFloorProfile,
  createOceanWaveState,
  createOceanOpticsDescriptor,
  createShorelineFoamDescriptor,
  createUnderwaterAtmosphereDescriptor,
  createOceanCausticsDescriptor,
  createSunGlitterDescriptor,
  createVegetationArchetypeCatalog,
  createGroundContactService,
  createVegetationPlacementGraph,
  createVegetationWindDescriptor,
  createVegetationLodPolicy,
  createRockGraph,
  createPropGraph,
  createCampfireAtmosphereDescriptor,
  createCloudWeatherState,
  createCloudDensityRecipe,
  createCloudLightingProfile,
  createCloudLodPolicy,
  createCloudShadowDescriptor,
  createCloudHorizonBandDescriptor,
  createFogDensityRecipe,
  createFogAdvectionDescriptor,
  createFogVolumePlacement,
  createAerialPerspectiveDescriptor,
  createStylizedMaterialCatalog,
  createRenderArchetypeCatalog,
  chooseRenderQuality,
  createRenderSnapshot,
  createPerformanceBudget,
  createWebGL2FallbackPolicy,
  createDebugOverlay,
  createCameraRailSequence,
  createCozyIslandScenario,
  createStylizedWorldRenderer,
  createAtmosphereVolumeTextures,
  createVolumetricCloudRenderer,
  createRollingFogRenderer,
  createWebGPUOceanRenderer,
  createWebGPUFoamRenderer,
  createWebGPUPostPipeline
} from "./kits/index.js";

const canvas = document.querySelector("#game");
const loader = document.querySelector("#loader");
const loaderFill = document.querySelector("#loader-fill");
const loaderText = document.querySelector("#loader-text");
const errorPanel = document.querySelector("#error");
const debugRoot = document.querySelector("#debug");

function setLoad(value, label) {
  if (loaderFill) loaderFill.style.width = `${Math.max(0, Math.min(100, value))}%`;
  if (loaderText && label) loaderText.textContent = label;
}

function fail(error) {
  console.error(error);
  if (errorPanel) {
    errorPanel.hidden = false;
    errorPanel.textContent = String(error?.stack ?? error?.message ?? error);
  }
  if (loaderText) loaderText.textContent = "Could not start My Cozy Island";
}

function createSky(illumination) {
  const canvasTexture = document.createElement("canvas");
  canvasTexture.width = 2;
  canvasTexture.height = 512;
  const context = canvasTexture.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 0, canvasTexture.height);
  gradient.addColorStop(0, "#eeb27f");
  gradient.addColorStop(0.38, illumination.skyTop);
  gradient.addColorStop(0.68, illumination.skyHorizon);
  gradient.addColorStop(1, "#96cfc4");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvasTexture.width, canvasTexture.height);
  const map = new THREE.CanvasTexture(canvasTexture);
  map.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicNodeMaterial({ map, side: THREE.BackSide });
  material.fog = false;
  const sky = new THREE.Mesh(new THREE.SphereGeometry(2600, 48, 24), material);
  sky.name = "pastel-sunrise-sky";
  sky.frustumCulled = false;
  return sky;
}

function createDomainSnapshot({ backend, quality }) {
  const seedService = createDeterministicSeedService("cozy-island-webgpu-v2");
  const clock = createEnvironmentClock({ initialSeconds: 48, timeScale: 1 });
  const windField = createWindField({ seedService, clock });
  const weather = createWeatherState({ preset: "sunrise-haze" });
  const illuminationService = createIlluminationState({ clock, weather });
  const illumination = illuminationService.getState();

  const terrain = createTerrainSurface({ seed: seedService.seed, radius: 108, maxHeight: 24, beachWidth: 12, clearingRadius: 17 });
  const biomeField = createTerrainBiomeField(terrain);
  const shoreline = createShorelineField(terrain);
  const terrainLod = createTerrainLodPolicy(quality);
  const oceanFloor = createOceanFloorProfile(terrain);
  const oceanWaves = createOceanWaveState();
  const oceanOptics = createOceanOpticsDescriptor();
  const underwater = createUnderwaterAtmosphereDescriptor();
  const caustics = createOceanCausticsDescriptor();
  const sunGlitter = createSunGlitterDescriptor();
  const foam = createShorelineFoamDescriptor(terrain, { segments: quality.tier === "low" ? 220 : 320 });

  const vegetationArchetypes = createVegetationArchetypeCatalog();
  const groundContact = createGroundContactService(terrain);
  const vegetation = createVegetationPlacementGraph({
    surface: terrain,
    biomeField,
    archetypes: vegetationArchetypes,
    groundContact,
    seed: `${seedService.seed}:vegetation`,
    qualityTier: quality.tier
  });
  const vegetationWind = createVegetationWindDescriptor(windField);
  const vegetationLod = createVegetationLodPolicy(quality);
  const rocks = createRockGraph({ surface: terrain, groundContact, seed: `${seedService.seed}:rocks`, qualityTier: quality.tier });
  const props = createPropGraph(terrain, `${seedService.seed}:props`);
  const campfire = createCampfireAtmosphereDescriptor(terrain, windField);

  const cloudWeather = createCloudWeatherState(weather, windField);
  const cloudDensity = createCloudDensityRecipe(cloudWeather, quality);
  const cloudLighting = createCloudLightingProfile(illuminationService);
  const cloudLod = createCloudLodPolicy(quality);
  const cloudShadow = createCloudShadowDescriptor(cloudWeather, cloudLod);
  const cloudHorizon = createCloudHorizonBandDescriptor(cloudWeather);

  const fogDensity = createFogDensityRecipe(weather, quality);
  const fogAdvection = createFogAdvectionDescriptor(windField);
  const fogPlacement = createFogVolumePlacement(fogDensity);
  const aerialPerspective = createAerialPerspectiveDescriptor();
  const materials = createStylizedMaterialCatalog();
  const renderArchetypes = createRenderArchetypeCatalog();
  const fallbackPolicy = createWebGL2FallbackPolicy();

  const snapshot = createRenderSnapshot({
    seed: seedService.seed,
    quality,
    terrain,
    terrainLod,
    biomeField,
    shoreline,
    oceanFloor,
    oceanWaves,
    oceanOptics,
    underwater,
    caustics,
    sunGlitter,
    foam,
    vegetation,
    vegetationArchetypes,
    vegetationWind,
    vegetationLod,
    rocks,
    props,
    campfire,
    cloudWeather,
    cloudDensity,
    cloudLighting,
    cloudLod,
    cloudShadow,
    cloudHorizon,
    fogDensity,
    fogAdvection,
    fogPlacement,
    illumination,
    aerialPerspective,
    materials,
    renderArchetypes,
    fallbackPolicy
  });

  const cameraSequence = createCameraRailSequence(terrain);
  const scenario = createCozyIslandScenario({ clock, cameraSequence, snapshot });
  return { snapshot, scenario, cameraSequence, clock, windField, weather, illuminationService };
}

async function main() {
  if (!canvas) throw new Error("Missing #game canvas.");

  const catalogStatus = validateKitCatalog(kitCatalog);
  if (!catalogStatus.valid) {
    throw new Error(`Invalid Nexus kit catalog:\n${catalogStatus.errors.join("\n")}`);
  }

  setLoad(5, "Starting WebGPU host");
  const renderer = new THREE.WebGPURenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance",
    trackTimestamp: true
  });
  await renderer.init();
  const backend = renderer.backend?.isWebGPUBackend ? "webgpu" : "webgl2";
  const quality = chooseRenderQuality({ backend });

  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, quality.pixelRatioCap));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  setLoad(14, `Composing ${catalogStatus.kitCount} domain kits`);
  const domains = createDomainSnapshot({ backend, quality });
  const snapshot = domains.snapshot;
  renderer.toneMappingExposure = snapshot.illumination.exposure;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#efc69d");
  scene.fog = new THREE.Fog(new THREE.Color(snapshot.aerialPerspective.horizonTint), snapshot.aerialPerspective.nearStart * 2.5, snapshot.aerialPerspective.farEnd);
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 3200);

  scene.add(createSky(snapshot.illumination));

  const hemisphere = new THREE.HemisphereLight(0xfff1dd, 0x2e6871, snapshot.illumination.ambientIntensity);
  scene.add(hemisphere);
  const sun = new THREE.DirectionalLight(snapshot.illumination.sunColor, snapshot.illumination.sunIntensity);
  sun.position.set(-380, 560, 310);
  sun.castShadow = true;
  sun.shadow.mapSize.set(quality.shadowMapSize, quality.shadowMapSize);
  sun.shadow.camera.left = -210;
  sun.shadow.camera.right = 210;
  sun.shadow.camera.top = 210;
  sun.shadow.camera.bottom = -210;
  sun.shadow.camera.near = 80;
  sun.shadow.camera.far = 950;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  scene.add(sun);

  setLoad(26, "Building stylized island geometry");
  const worldRenderer = createStylizedWorldRenderer(snapshot);
  scene.add(worldRenderer.group);

  const oceanRenderer = createWebGPUOceanRenderer({ waveState: snapshot.oceanWaves, optics: snapshot.oceanOptics, quality });
  scene.add(oceanRenderer.mesh);
  const foamRenderer = createWebGPUFoamRenderer(snapshot.foam);
  scene.add(foamRenderer.group);

  setLoad(48, backend === "webgpu" ? "Computing cloud and fog volumes on GPU" : "Baking fallback cloud and fog volumes");
  const volumeTextures = await createAtmosphereVolumeTextures({
    renderer,
    cloudRecipe: snapshot.cloudDensity,
    fogRecipe: snapshot.fogDensity,
    backend
  });

  setLoad(68, "Creating volumetric cloud bank");
  const cloudRenderer = createVolumetricCloudRenderer({
    densityTexture: volumeTextures.cloudTexture,
    recipe: snapshot.cloudDensity,
    lighting: snapshot.cloudLighting,
    lod: snapshot.cloudLod,
    horizon: snapshot.cloudHorizon
  });
  scene.add(cloudRenderer.group);

  setLoad(80, "Creating rolling depth-aware fog");
  const fogRenderer = createRollingFogRenderer({
    fogTexture: volumeTextures.fogTexture,
    recipe: snapshot.fogDensity,
    advection: snapshot.fogAdvection,
    placement: snapshot.fogPlacement,
    quality
  });
  scene.add(fogRenderer.group);

  const postPipeline = createWebGPUPostPipeline({ renderer, scene, camera, fogRenderer, quality });
  const debugOverlay = createDebugOverlay(debugRoot);

  let activeScale = 1;
  const applyPerformanceLevel = level => {
    activeScale = level === 0 ? 1 : level === 1 ? 0.78 : 0.62;
    cloudRenderer.setStepScale(activeScale);
    fogRenderer.setStepScale(activeScale);
    postPipeline.setFogResolutionScale(quality.fogResolutionScale * (level === 0 ? 1 : level === 1 ? 0.82 : 0.68));
    if (level > 0) renderer.setPixelRatio(Math.min(devicePixelRatio || 1, quality.pixelRatioCap * (level === 1 ? 0.88 : 0.76)));
  };

  const performanceBudget = createPerformanceBudget({
    quality,
    onDegrade: ({ level }) => applyPerformanceLevel(level),
    onRecover: ({ level }) => applyPerformanceLevel(level)
  });

  const input = domains.cameraSequence.input;
  let drag = null;
  canvas.addEventListener("wheel", event => {
    event.preventDefault();
    input.wheel(event.deltaY);
  }, { passive: false });
  canvas.addEventListener("pointerdown", event => {
    drag = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture?.(event.pointerId);
  });
  canvas.addEventListener("pointerup", event => {
    drag = null;
    canvas.releasePointerCapture?.(event.pointerId);
  });
  canvas.addEventListener("pointercancel", () => { drag = null; });
  canvas.addEventListener("pointermove", event => {
    if (!drag) return;
    input.drag(event.clientX - drag.x, event.clientY - drag.y);
    drag = { x: event.clientX, y: event.clientY };
  });
  addEventListener("keydown", event => {
    if (event.code === "KeyH") debugOverlay.toggle();
    input.key(event.code, true);
  });
  addEventListener("keyup", event => input.key(event.code, false));
  addEventListener("blur", () => input.clear());

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }
  addEventListener("resize", resize);
  resize();

  setLoad(100, `${backend === "webgpu" ? "WebGPU compute" : "WebGL2 fallback"} ready`);
  setTimeout(() => {
    if (loader) loader.classList.add("is-complete");
    setTimeout(() => { if (loader) loader.hidden = true; }, 520);
  }, 260);

  let last = performance.now();
  let frames = 0;
  renderer.setAnimationLoop(now => {
    const frameMs = Math.min(100, Math.max(0, now - last));
    const dt = Math.min(0.05, frameMs / 1000);
    last = now;
    domains.scenario.tick(dt);
    const renderState = domains.scenario.getRenderSnapshot();
    camera.position.set(renderState.camera.position.x, renderState.camera.position.y, renderState.camera.position.z);
    camera.lookAt(renderState.camera.lookAt.x, renderState.camera.lookAt.y, renderState.camera.lookAt.z);

    worldRenderer.update(renderState.clock.elapsedSeconds);
    foamRenderer.update(renderState.clock.elapsedSeconds);
    performanceBudget.sample(frameMs);
    postPipeline.render();

    frames += 1;
    if (frames % 12 === 0) {
      const perf = performanceBudget.getState();
      debugOverlay.draw({
        backend: backend === "webgpu" ? `WebGPU compute · ${volumeTextures.source}` : `WebGL2 · ${volumeTextures.source}`,
        quality: `${quality.tier} (${quality.source})`,
        fps: perf.fps || 60,
        cloudSteps: cloudRenderer.getSteps(),
        fogSteps: fogRenderer.getSteps(),
        kitCount: catalogStatus.kitCount
      });
    }
  });

  globalThis.CozyIsland = Object.freeze({
    renderer,
    scene,
    camera,
    backend,
    quality,
    kitCatalog,
    kitCatalogStatus: catalogStatus,
    snapshot,
    scenario: domains.scenario,
    volumeTextures,
    cloudRenderer,
    fogRenderer,
    oceanRenderer,
    foamRenderer,
    postPipeline,
    performanceBudget,
    getState() {
      return {
        backend,
        quality,
        camera: domains.cameraSequence.descriptor(),
        clock: domains.clock.getState(),
        performance: performanceBudget.getState(),
        volumetrics: { cloudSteps: cloudRenderer.getSteps(), fogSteps: fogRenderer.getSteps(), activeScale },
        kitCount: kitCatalog.length
      };
    }
  });
}

main().catch(fail);
