import { defineResource } from "nexusengine/ecs";
import { defineDomainServiceKit } from "nexusengine/domain-service-kit";
import {
  createDeterministicSeedService,
  createEnvironmentClock,
  createWindField,
  createWeatherState,
  createIlluminationState,
  createAerialPerspectiveDescriptor,
  createVegetationWindDescriptor,
  createTerrainSurface,
  createTerrainBiomeField,
  createShorelineField,
  createTerrainLodPolicy,
  createGroundContactService,
  createOceanFloorProfile,
  createOceanWaveState,
  createOceanOpticsDescriptor,
  createUnderwaterAtmosphereDescriptor,
  createOceanCausticsDescriptor,
  createSunGlitterDescriptor,
  createShorelineFoamDescriptor,
  createVegetationArchetypeCatalog,
  createVegetationPlacementGraph,
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
  createStylizedMaterialCatalog,
  createRenderArchetypeCatalog,
  createRenderSnapshot,
  createWebGL2FallbackPolicy
} from "../kits/index.js";
import {
  COZY_ADVENTURE_VERSION,
  COZY_WORLD_CONFIG,
  clone,
  clamp01,
  lerp
} from "./definitions.js";

const WorldState = defineResource("cozy.adventure.world.state");

function smoothstep(a, b, value) {
  const t = clamp01((Number(value) - a) / Math.max(1e-9, b - a));
  return t * t * (3 - 2 * t);
}

function groupByType(instances) {
  return Object.freeze(instances.reduce((groups, instance) => {
    (groups[instance.type] ??= []).push(instance);
    return groups;
  }, {}));
}

function createFarmPlots(terrain, config) {
  const plots = [];
  const farm = config.farm;
  for (let row = 0; row < farm.rows; row += 1) {
    for (let column = 0; column < farm.columns; column += 1) {
      const x = farm.origin.x + column * farm.spacingX;
      const z = farm.origin.z + row * farm.spacingZ;
      plots.push(Object.freeze({
        id: `farm-plot:${row}:${column}`,
        row,
        column,
        position: Object.freeze({ x, y: terrain.sampleHeight({ x, z }) + 0.045, z }),
        size: Object.freeze({ x: farm.plotWidth, z: farm.plotDepth }),
        rotation: -0.035 + row * 0.014
      }));
    }
  }
  return Object.freeze(plots);
}

function pointInsideFarm(point, plots, padding = 1.2) {
  return plots.some((plot) => (
    Math.abs(point.x - plot.position.x) <= plot.size.x * 0.5 + padding
    && Math.abs(point.z - plot.position.z) <= plot.size.z * 0.5 + padding
  ));
}

function createFriendlyPopulation({ terrain, biomeField, archetypes, groundContact, seed, plots }) {
  const generated = createVegetationPlacementGraph({
    surface: terrain,
    biomeField,
    archetypes,
    groundContact,
    seed: `${seed}:friendly-forest`,
    qualityTier: "ultra"
  });
  const reserved = [
    { x: 0, z: 0, radius: 6.5 },
    { x: 12, z: -7, radius: 7.5 },
    { x: -12, z: -8, radius: 4.5 }
  ];
  const instances = generated.instances.filter((instance) => {
    if (pointInsideFarm(instance.position, plots, instance.family === "grass" ? 0.4 : 1.7)) return false;
    return !reserved.some((zone) => Math.hypot(instance.position.x - zone.x, instance.position.z - zone.z) < zone.radius);
  });
  return Object.freeze({
    ...generated,
    id: "vegetation-placement:cozy-adventure-friendly-forest",
    instances: Object.freeze(instances),
    byType: groupByType(instances)
  });
}

function createForageNodes(vegetation, terrain) {
  const palms = vegetation.byType["palm-tree"] ?? [];
  const selected = palms
    .filter((entry) => Math.hypot(entry.position.x, entry.position.z) > 40)
    .slice(0, 12);
  return Object.freeze(selected.map((palm, index) => Object.freeze({
    id: `coconut-node:${index}`,
    treeId: palm.id,
    position: Object.freeze({
      x: palm.position.x,
      y: terrain.sampleHeight(palm.position),
      z: palm.position.z
    }),
    crownHeight: 7.2 * palm.scale,
    respawnSeconds: 82 + index * 3,
    capacity: 2 + (index % 2)
  })));
}

function createLandmarks(terrain) {
  const at = (id, type, x, z, extra = {}) => Object.freeze({
    id,
    type,
    position: Object.freeze({ x, y: terrain.sampleHeight({ x, z }), z }),
    ...extra
  });
  return Object.freeze([
    at("landmark:island-hut", "island-hut", 13, -8, { rotation: -0.42 }),
    at("landmark:water-barrel", "water-barrel", -11, -7, { rotation: 0.15 }),
    at("landmark:campfire", "campfire", 0, 0, { rotation: 0 })
  ]);
}

function createRuntimeModel({ quality, backend, config }) {
  const seedService = createDeterministicSeedService(config.seed);
  const clock = createEnvironmentClock({ initialSeconds: 72, timeScale: 0.22 });
  const windField = createWindField({ seedService, clock });
  const weather = createWeatherState({ preset: "sunrise-haze" });
  const illuminationService = createIlluminationState({ clock, weather });
  const illumination = illuminationService.getState();
  const terrain = createTerrainSurface({
    id: "terrain:cozy-island-adventure-v1",
    seed: config.seed,
    radius: config.radius,
    maxHeight: config.maxHeight,
    beachWidth: config.beachWidth,
    clearingRadius: config.clearingRadius
  });
  const terrainShelf = Object.freeze({
    width: config.submergedShelfWidth,
    depth: config.submergedShelfDepth,
    handoffDepth: config.minimumCoastDepth
  });
  const biomeField = createTerrainBiomeField(terrain);
  const shoreline = createShorelineField(terrain);
  const terrainLod = createTerrainLodPolicy(quality);
  const groundContact = createGroundContactService(terrain);
  const oceanFloor = createOceanFloorProfile(terrain, { minimumCoastDepth: config.minimumCoastDepth });
  const oceanWaves = createOceanWaveState();
  const oceanOptics = createOceanOpticsDescriptor({ opacity: 0.2, transmission: 0.93 });
  const underwater = createUnderwaterAtmosphereDescriptor();
  const caustics = createOceanCausticsDescriptor();
  const sunGlitter = createSunGlitterDescriptor();
  const foam = createShorelineFoamDescriptor(terrain, { segments: quality.tier === "low" ? 240 : 360 });
  const vegetationArchetypes = createVegetationArchetypeCatalog();
  const plots = createFarmPlots(terrain, config);
  const vegetation = createFriendlyPopulation({
    terrain,
    biomeField,
    archetypes: vegetationArchetypes,
    groundContact,
    seed: config.seed,
    plots
  });
  const forageNodes = createForageNodes(vegetation, terrain);
  const vegetationWind = createVegetationWindDescriptor(windField);
  const vegetationLod = createVegetationLodPolicy(quality);
  const rocks = createRockGraph({
    surface: terrain,
    groundContact,
    seed: `${config.seed}:rocks`,
    qualityTier: quality.tier
  });
  const legacyProps = createPropGraph(terrain, `${config.seed}:props`);
  const props = Object.freeze({
    id: "prop-graph:cozy-adventure",
    objects: Object.freeze(legacyProps.objects.filter((entry) => entry.type !== "fence-post")),
    fenceRadius: 0
  });
  const campfire = createCampfireAtmosphereDescriptor(terrain, windField);
  const landmarks = createLandmarks(terrain);
  const cloudWeather = createCloudWeatherState(weather, windField);
  const cloudDensity = createCloudDensityRecipe(cloudWeather, quality);
  const cloudLighting = createCloudLightingProfile(illuminationService);
  const cloudLod = createCloudLodPolicy(quality);
  const cloudShadow = createCloudShadowDescriptor(cloudWeather, cloudLod);
  const cloudHorizon = createCloudHorizonBandDescriptor(cloudWeather);
  const fogDensity = createFogDensityRecipe(weather, quality);
  const fogAdvection = createFogAdvectionDescriptor(windField);
  const fogPlacement = Object.freeze({
    ...createFogVolumePlacement(fogDensity),
    islandReadabilityRadius: 96,
    islandReadabilityFeather: 54
  });
  const aerialPerspective = createAerialPerspectiveDescriptor({ nearStart: 145, farEnd: 2100 });
  const materials = createStylizedMaterialCatalog();
  const renderArchetypes = createRenderArchetypeCatalog();
  const fallbackPolicy = createWebGL2FallbackPolicy();

  const renderBase = createRenderSnapshot({
    seed: config.seed,
    quality,
    backend,
    terrain,
    terrainShelf,
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
    farmPlots: plots,
    forageNodes,
    landmarks,
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

  function surfaceAt(x, z) {
    const point = { x: Number(x), z: Number(z) };
    const fields = terrain.sampleFields(point);
    const biomeWeights = biomeField.sample(point);
    const shore = shoreline.sample(point);
    if (fields.shoreDistance >= 0) {
      return Object.freeze({
        kind: "land",
        height: fields.height,
        normal: fields.normal,
        slope: fields.slope,
        shoreDistance: fields.shoreDistance,
        biomeWeights,
        moisture: fields.moisture,
        exposure: fields.exposure,
        walkable: fields.height > 0.2
          && fields.slope <= config.walkableSlope
          && fields.shoreDistance >= config.minimumWalkableShoreDistance,
        waterDepth: 0
      });
    }
    if (fields.shoreDistance >= -config.submergedShelfWidth) {
      const shelf = smoothstep(0, config.submergedShelfWidth, -fields.shoreDistance);
      const height = lerp(terrain.seaLevel - 0.08, config.submergedShelfDepth, shelf);
      return Object.freeze({
        kind: "shelf",
        height,
        normal: fields.normal,
        slope: fields.slope,
        shoreDistance: fields.shoreDistance,
        biomeWeights: Object.freeze({}),
        moisture: 1,
        exposure: 0,
        walkable: false,
        waterDepth: Math.max(0, terrain.seaLevel - height)
      });
    }
    const height = oceanFloor.sampleHeight(point);
    const normal = oceanFloor.sampleNormal(point);
    return Object.freeze({
      kind: "seabed",
      height,
      normal,
      slope: clamp01(1 - normal.y),
      shoreDistance: fields.shoreDistance,
      biomeWeights: Object.freeze({}),
      moisture: 1,
      exposure: 0,
      walkable: false,
      waterDepth: Math.max(0, terrain.seaLevel - height)
    });
  }

  function constrainWalk(previous, requested) {
    const target = { x: Number(requested.x), z: Number(requested.z) };
    const full = surfaceAt(target.x, target.z);
    if (full.walkable) return Object.freeze({ x: target.x, y: full.height, z: target.z, surface: full });
    const xOnly = surfaceAt(target.x, previous.z);
    if (xOnly.walkable) return Object.freeze({ x: target.x, y: xOnly.height, z: previous.z, surface: xOnly });
    const zOnly = surfaceAt(previous.x, target.z);
    if (zOnly.walkable) return Object.freeze({ x: previous.x, y: zOnly.height, z: target.z, surface: zOnly });
    const current = surfaceAt(previous.x, previous.z);
    return Object.freeze({ x: previous.x, y: current.height, z: previous.z, surface: current });
  }

  return Object.freeze({
    config,
    seedService,
    clock,
    windField,
    weather,
    illuminationService,
    terrain,
    biomeField,
    shoreline,
    oceanFloor,
    groundContact,
    plots,
    forageNodes,
    landmarks,
    renderBase,
    surfaceAt,
    constrainWalk
  });
}

function objectDescriptorForPlot(plot) {
  return {
    id: plot.id,
    objectType: "farm-plot",
    transform: {
      position: [plot.position.x, plot.position.y, plot.position.z],
      rotation: [0, Math.sin(plot.rotation * 0.5), 0, Math.cos(plot.rotation * 0.5)],
      scale: [1, 1, 1]
    },
    bounds: {
      min: [-plot.size.x * 0.5, -0.12, -plot.size.z * 0.5],
      max: [plot.size.x * 0.5, 0.22, plot.size.z * 0.5]
    },
    metadata: { row: plot.row, column: plot.column, interaction: "farm" }
  };
}

function objectDescriptorForForage(node) {
  return {
    id: node.id,
    objectType: "coconut-forage-node",
    transform: {
      position: [node.position.x, node.position.y, node.position.z],
      rotation: [0, 0, 0, 1],
      scale: [1, 1, 1]
    },
    bounds: {
      min: [-2.4, 0, -2.4],
      max: [2.4, node.crownHeight + 2.4, 2.4]
    },
    metadata: { treeId: node.treeId, interaction: "forage", capacity: node.capacity }
  };
}

function objectDescriptorForLandmark(landmark) {
  const boundsByType = {
    "island-hut": { min: [-3.5, 0, -3], max: [3.5, 5.5, 3] },
    "water-barrel": { min: [-1, 0, -1], max: [1, 2.2, 1] },
    campfire: { min: [-1.6, 0, -1.6], max: [1.6, 2.2, 1.6] }
  };
  return {
    id: landmark.id,
    objectType: landmark.type,
    transform: {
      position: [landmark.position.x, landmark.position.y, landmark.position.z],
      rotation: [0, Math.sin((landmark.rotation ?? 0) * 0.5), 0, Math.cos((landmark.rotation ?? 0) * 0.5)],
      scale: [1, 1, 1]
    },
    bounds: boundsByType[landmark.type],
    metadata: { landmark: true }
  };
}

export function createCozyWorldDomain({ quality, backend = "webgpu", config = COZY_WORLD_CONFIG } = {}) {
  if (!quality) throw new TypeError("createCozyWorldDomain requires a render-quality descriptor.");
  const model = createRuntimeModel({ quality, backend, config });
  const initialState = Object.freeze({
    id: config.id,
    version: COZY_ADVENTURE_VERSION,
    seed: config.seed,
    config: clone(config),
    plots: clone(model.plots),
    forageNodes: clone(model.forageNodes),
    landmarks: clone(model.landmarks),
    revision: 1
  });

  return defineDomainServiceKit({
    id: "cozy-world-domain-kit",
    domain: "cozy-world",
    domainPath: "n:cozy-world",
    apiName: "cozyWorld",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["model", "surface-query", "farm-layout", "forage-layout", "render-base", "snapshot", "reset"],
    requires: ["n:core-object"],
    provides: ["world:cozy-island-model", "surface:cozy-island", "world:cozy-render-base"],
    resources: { WorldState },
    metadata: {
      purpose: "Authoritative seeded island model for terrain, biomes, ocean floor, population, farms, forage nodes, landmarks, and renderer-neutral world queries.",
      rendererAgnostic: true,
      deterministic: true
    },
    initWorld({ engine, world }) {
      world.setResource(WorldState, clone(initialState));
      const objectApi = engine.n.coreObject;
      for (const descriptor of [
        ...model.plots.map(objectDescriptorForPlot),
        ...model.forageNodes.map(objectDescriptorForForage),
        ...model.landmarks.map(objectDescriptorForLandmark)
      ]) {
        if (!objectApi.has(descriptor.id)) objectApi.register(descriptor);
      }
    },
    createApi({ world }) {
      return {
        getState: () => clone(world.getResource(WorldState)),
        getSnapshot: () => clone(world.getResource(WorldState)),
        loadSnapshot(snapshot = {}) {
          const next = {
            ...clone(initialState),
            ...clone(snapshot),
            id: config.id,
            seed: config.seed,
            revision: Number(snapshot.revision ?? 1) + 1
          };
          world.setResource(WorldState, next);
          return clone(next);
        },
        reset() {
          world.setResource(WorldState, clone(initialState));
          model.clock.reset();
          return clone(initialState);
        },
        getModel: () => model,
        getRenderBase: () => model.renderBase,
        getPlots: () => clone(model.plots),
        getForageNodes: () => clone(model.forageNodes),
        getLandmarks: () => clone(model.landmarks),
        surfaceAt: model.surfaceAt,
        constrainWalk: model.constrainWalk,
        sampleHeight(point = {}) {
          return model.surfaceAt(point.x, point.z).height;
        },
        sampleNormal(point = {}) {
          return model.surfaceAt(point.x, point.z).normal;
        }
      };
    }
  });
}
