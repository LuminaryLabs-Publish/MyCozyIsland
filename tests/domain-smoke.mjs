import assert from "node:assert/strict";
import { createDeterministicSeedService } from "../src/kits/determinism.js";
import {
  createEnvironmentClock,
  createWindField,
  createWeatherState,
  createIlluminationState,
  createAerialPerspectiveDescriptor,
  createVegetationWindDescriptor
} from "../src/kits/environment.js";
import {
  createTerrainSurface,
  createTerrainBiomeField,
  createShorelineField,
  createTerrainLodPolicy,
  createGroundContactService
} from "../src/kits/terrain.js";
import {
  createOceanFloorProfile,
  createOceanWaveState,
  createOceanOpticsDescriptor,
  createShorelineFoamDescriptor,
  createUnderwaterAtmosphereDescriptor,
  createOceanCausticsDescriptor,
  createSunGlitterDescriptor
} from "../src/kits/ocean.js";
import {
  createVegetationArchetypeCatalog,
  createVegetationPlacementGraph,
  createVegetationLodPolicy,
  createRockGraph,
  createPropGraph,
  createCampfireAtmosphereDescriptor
} from "../src/kits/vegetation.js";
import {
  createCloudWeatherState,
  createCloudDensityRecipe,
  createCloudLightingProfile,
  createCloudLodPolicy,
  createCloudShadowDescriptor,
  createCloudHorizonBandDescriptor,
  createFogDensityRecipe,
  createFogAdvectionDescriptor,
  createFogVolumePlacement
} from "../src/kits/atmosphere.js";
import {
  createStylizedMaterialCatalog,
  createRenderArchetypeCatalog,
  createRenderSnapshot,
  createWebGL2FallbackPolicy
} from "../src/kits/render-descriptors.js";
import { createCameraRailSequence, createCozyIslandScenario } from "../src/kits/sequences.js";

const quality = Object.freeze({
  tier: "low",
  pixelRatioCap: 1,
  shadowMapSize: 768,
  fogResolutionScale: 0.22,
  fogSteps: 6,
  cloudSteps: 18,
  cloudTextureSize: 48,
  oceanSegments: 32,
  terrainResolution: 129,
  vegetationScale: 0.35,
  postBlur: 0.72,
  targetFrameMs: 22,
  source: "test"
});

function compose() {
  const seedService = createDeterministicSeedService("domain-smoke-seed");
  const clock = createEnvironmentClock({ initialSeconds: 48 });
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
  const foam = createShorelineFoamDescriptor(terrain, { segments: 128 });
  const vegetationArchetypes = createVegetationArchetypeCatalog();
  const groundContact = createGroundContactService(terrain);
  const vegetation = createVegetationPlacementGraph({ surface: terrain, biomeField, archetypes: vegetationArchetypes, groundContact, seed: `${seedService.seed}:vegetation`, qualityTier: quality.tier });
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
  return { snapshot, scenario, terrain, shoreline, vegetation, rocks, foam, cloudDensity, cloudLod, fogDensity };
}

const first = compose();
const second = compose();

for (const point of [{ x: 0, z: 0 }, { x: 42.5, z: -31.25 }, { x: -103, z: 18 }]) {
  assert.equal(first.terrain.sampleHeight(point), second.terrain.sampleHeight(point));
  assert.deepEqual(first.terrain.sampleFields(point), second.terrain.sampleFields(point));
}
for (const point of [{ x: 101, z: 0 }, { x: 0, z: 104 }, { x: -76, z: 55 }]) {
  assert.deepEqual(first.shoreline.sample(point), second.shoreline.sample(point));
}

const centerHeight = first.terrain.sampleHeight({ x: 0, z: 0 });
const clearingSamples = Array.from({ length: 12 }, (_, index) => {
  const angle = index / 12 * Math.PI * 2;
  const radius = first.terrain.clearingRadius * 0.68;
  return first.terrain.sampleHeight({
    x: Math.cos(angle) * radius,
    z: Math.sin(angle) * radius
  });
});
const clearingMinimum = Math.min(centerHeight, ...clearingSamples);
const clearingMaximum = Math.max(centerHeight, ...clearingSamples);
assert.ok(
  clearingMaximum - clearingMinimum < 0.5,
  `Clearing should be flat, received ${clearingMaximum - clearingMinimum} meters of variation.`
);
assert.equal(
  first.terrain.sampleHeight({ x: 0, z: 0 }),
  second.terrain.sampleHeight({ x: 0, z: 0 }),
  "Clearing plateau height must remain deterministic."
);

assert.deepEqual(first.vegetation.instances.slice(0, 30), second.vegetation.instances.slice(0, 30));
assert.deepEqual(first.rocks.instances.slice(0, 20), second.rocks.instances.slice(0, 20));
assert.ok(first.vegetation.instances.length > 120);
assert.ok(first.rocks.instances.length > 12);
assert.equal(first.foam.bands.length, 3);
assert.equal(first.cloudDensity.textureSize, 48);
assert.equal(first.fogDensity.textureSize, 32);

first.scenario.tick(1 / 60);
const state = first.scenario.getRenderSnapshot();
assert.equal(state.world.id, "world:cozy-island-webgpu-v2");
assert.equal(state.camera.mode, "rail");
assert.ok(state.clock.elapsedSeconds > 48);

console.log(JSON.stringify({
  terrainSamples: 3,
  clearingVariation: clearingMaximum - clearingMinimum,
  vegetationInstances: first.vegetation.instances.length,
  rockInstances: first.rocks.instances.length,
  foamBands: first.foam.bands.length,
  cloudTextureSize: first.cloudDensity.textureSize,
  fogTextureSize: first.fogDensity.textureSize,
  cloudSteps: first.cloudLod.steps
}, null, 2));
