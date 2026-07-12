import { COZY_WORLD_CONFIG, NEXUS_ENGINE_COMMIT } from "./world-config.js";
import { createLegacyWorldComposition } from "./legacy-world-composition.js";
import { createCozyWorldQuery } from "./world-query.js";
import { createLazyCellMaterializer } from "./lazy-cell-materializer.js";
import { createIslandTerrainProvider, createIslandTerrainSource } from "./providers/island-terrain-provider.js";
import { createSeaFloorTerrainProvider, createSeaFloorTerrainSource } from "./providers/sea-floor-terrain-provider.js";
import { createBiomeClassificationProvider } from "./providers/biome-classification-provider.js";
import { createShorelineClassificationProvider } from "./providers/shoreline-classification-provider.js";
import { createSeaFloorMaterialProvider } from "./providers/seafloor-material-provider.js";
import { createVegetationProvider } from "./providers/vegetation-provider.js";
import { createRockProvider } from "./providers/rock-provider.js";
import { createPropProvider } from "./providers/prop-provider.js";
import { createCellPresentationProvider } from "./providers/cell-presentation-provider.js";
import { createLegacyRenderSnapshotBridge } from "./legacy-render-snapshot-bridge.js";
import { activeCellIdsFromSnapshot, cellKeyFromCoordinates } from "./cell-utils.js";

async function resolveNexusRuntime(runtime) {
  if (runtime) return runtime;
  const [engineModule, coreWorldModule] = await Promise.all([
    import("nexusengine/engine"),
    import("nexusengine/core-world")
  ]);
  return Object.freeze({ ...engineModule, ...coreWorldModule });
}

export async function createCozyIslandWorldRuntime({
  quality,
  backend = "webgpu",
  mode = "core",
  runtime,
  config = COZY_WORLD_CONFIG
} = {}) {
  const selectedMode = mode === "legacy" ? "legacy" : "core";
  const composition = createLegacyWorldComposition({ quality, backend });

  if (selectedMode === "legacy") {
    let prepared = false;
    const idleMaterialization = Object.freeze({
      frames: 0,
      workSteps: 0,
      activeCells: 0,
      completedCells: 0,
      pendingCells: 0,
      progress: 1,
      cells: Object.freeze([])
    });
    return Object.freeze({
      mode: "legacy",
      config,
      nexusCommit: NEXUS_ENGINE_COMMIT,
      ...composition,
      async prepare() {
        prepared = true;
        return composition.snapshot;
      },
      createLegacyRenderSnapshot() { return composition.snapshot; },
      updateWorldFocus() { return false; },
      processMaterializationFrame() { return idleMaterialization; },
      getMaterializationState() { return idleMaterialization; },
      getWorldSnapshot() { return Object.freeze({ mode: "legacy", activeCells: [] }); },
      getActiveCellIds() { return []; },
      getDiagnostics() { return []; },
      getQuery() {
        return createCozyWorldQuery({
          terrain: composition.terrain,
          oceanFloor: composition.oceanFloor,
          biomeField: composition.biomeField,
          shoreline: composition.shoreline,
          config
        });
      },
      getState() {
        return Object.freeze({ mode: "legacy", prepared, materialization: idleMaterialization });
      },
      reset() { prepared = false; },
      dispose() { prepared = false; }
    });
  }

  const nexus = await resolveNexusRuntime(runtime);
  for (const name of [
    "createEngine",
    "createCoreWorldDomain",
    "createUniformGridPartition",
    "createFlatWorldSurface",
    "defineWorldEffectProvider"
  ]) {
    if (typeof nexus[name] !== "function") {
      throw new TypeError(`Pinned NexusEngine runtime is missing ${name}.`);
    }
  }

  const terrainSource = createIslandTerrainSource({ terrain: composition.terrain, config });
  const seaFloorSource = createSeaFloorTerrainSource({ oceanFloor: composition.oceanFloor, config });
  const terrainProvider = createIslandTerrainProvider({
    defineWorldEffectProvider: nexus.defineWorldEffectProvider,
    terrainSource
  });
  const seaFloorProvider = createSeaFloorTerrainProvider({
    defineWorldEffectProvider: nexus.defineWorldEffectProvider,
    seaFloorSource
  });
  const biome = createBiomeClassificationProvider({
    defineWorldEffectProvider: nexus.defineWorldEffectProvider,
    surface: composition.terrain,
    terrainSource
  });
  const shoreline = createShorelineClassificationProvider({
    defineWorldEffectProvider: nexus.defineWorldEffectProvider,
    shoreline: composition.shoreline,
    terrainSource
  });
  const seaFloorMaterial = createSeaFloorMaterialProvider({
    defineWorldEffectProvider: nexus.defineWorldEffectProvider,
    seaFloorSource
  });
  const vegetation = createVegetationProvider({
    defineWorldEffectProvider: nexus.defineWorldEffectProvider,
    vegetation: composition.vegetation
  });
  const rocks = createRockProvider({
    defineWorldEffectProvider: nexus.defineWorldEffectProvider,
    rocks: composition.rocks
  });
  const props = createPropProvider({
    defineWorldEffectProvider: nexus.defineWorldEffectProvider,
    props: composition.props,
    campfire: composition.campfire
  });
  const presentation = createCellPresentationProvider({
    defineWorldEffectProvider: nexus.defineWorldEffectProvider,
    terrainSource,
    seaFloorSource,
    biomeStore: biome.runtimeStore,
    shorelineStore: shoreline.runtimeStore,
    seaFloorMaterialStore: seaFloorMaterial.runtimeStore,
    vegetationStore: vegetation.runtimeStore,
    rockStore: rocks.runtimeStore,
    propStore: props.runtimeStore
  });

  const providers = [
    terrainProvider,
    seaFloorProvider,
    biome.provider,
    shoreline.provider,
    seaFloorMaterial.provider,
    vegetation.provider,
    rocks.provider,
    props.provider,
    presentation.provider
  ];
  const partition = nexus.createUniformGridPartition({
    id: "cozy-island-grid",
    cellSize: config.partition.cellSize,
    radius: config.partition.radius
  });
  const surface = nexus.createFlatWorldSurface({ id: "cozy-island-flat-surface" });
  const engine = nexus.createEngine({ kits: [nexus.createCoreWorldDomain()] });
  engine.n.coreWorld.registerWorld({
    id: config.id,
    seed: config.seed,
    partition,
    surface,
    providers
  });

  const providerRuntime = Object.freeze({
    terrain: terrainSource.runtimeStore,
    seaFloor: seaFloorSource.runtimeStore,
    biome: biome.runtimeStore,
    shoreline: shoreline.runtimeStore,
    seaFloorMaterial: seaFloorMaterial.runtimeStore,
    vegetation: vegetation.runtimeStore,
    rocks: rocks.runtimeStore,
    props: props.runtimeStore,
    presentation: presentation.runtimeStore,
    terrainSource,
    seaFloorSource
  });

  let worldSnapshot = null;
  let prepared = false;
  let focusAccumulator = 0;
  let lastFocus = { x: 0, y: 0, z: 0 };
  let lastCellKey = null;

  const query = createCozyWorldQuery({
    terrain: composition.terrain,
    oceanFloor: composition.oceanFloor,
    biomeField: composition.biomeField,
    shoreline: composition.shoreline,
    config,
    getActiveCells: () => worldSnapshot?.activeCells ?? []
  });
  const bridge = createLegacyRenderSnapshotBridge({
    composition,
    providerRuntime,
    getWorldSnapshot: () => worldSnapshot
  });
  const materializer = createLazyCellMaterializer({
    config,
    terrainSource,
    seaFloorSource,
    biomeProvider: biome,
    shorelineProvider: shoreline,
    seaFloorMaterialProvider: seaFloorMaterial,
    presentationProvider: presentation,
    getWorldSnapshot: () => worldSnapshot
  });

  function commitFocus(position) {
    lastFocus = {
      x: Number(position.x ?? 0),
      y: Number(position.y ?? 0),
      z: Number(position.z ?? 0)
    };
    engine.n.coreWorld.setFocus(config.id, { position: lastFocus });
    worldSnapshot = engine.n.coreWorld.updateWorld(config.id);
    lastCellKey = cellKeyFromCoordinates(partition.locateCell(lastFocus));
    focusAccumulator = 0;
    materializer.sync();
    return worldSnapshot;
  }

  async function prepare() {
    if (prepared) return worldSnapshot;
    prepared = true;
    return commitFocus({ x: 0, y: 0, z: 0 });
  }

  function updateWorldFocus(position = {}, cameraMode = "rail", deltaSeconds = 0) {
    if (!prepared) return false;
    focusAccumulator += Math.max(0, Number(deltaSeconds) || 0);
    const target = cameraMode === "first-person" ? position : { x: 0, y: 0, z: 0 };
    const nextCellKey = cellKeyFromCoordinates(partition.locateCell(target));
    const moved = Math.hypot(
      Number(target.x ?? 0) - lastFocus.x,
      Number(target.z ?? 0) - lastFocus.z
    );
    const interval = 1 / Math.max(1, Number(config.focus.updateHz ?? 10));
    if (
      nextCellKey === lastCellKey
      && !(focusAccumulator >= interval && moved >= Number(config.focus.minimumMovement ?? 4))
    ) return false;
    commitFocus(target);
    return true;
  }

  function processMaterializationFrame({
    position = { x: 0, y: 0, z: 0 },
    cameraMode = "rail",
    maxCells
  } = {}) {
    if (!prepared) return materializer.getState();
    return materializer.processFrame({ focus: position, cameraMode, maxCells });
  }

  function reset() {
    engine.n.coreWorld.resetWorlds?.();
    materializer.reset();
    prepared = false;
    worldSnapshot = null;
    focusAccumulator = 0;
    lastCellKey = null;
  }

  return Object.freeze({
    mode: "core",
    config,
    nexusCommit: NEXUS_ENGINE_COMMIT,
    engine,
    partition,
    surface,
    providers,
    providerRuntime,
    query,
    ...composition,
    prepare,
    createLegacyRenderSnapshot: () => bridge.createSnapshot(),
    updateWorldFocus,
    processMaterializationFrame,
    getMaterializationState: () => materializer.getState(),
    getWorldSnapshot: () => worldSnapshot,
    getActiveCellIds: () => activeCellIdsFromSnapshot(worldSnapshot ?? {}),
    getPresentationDescriptors: () => presentation.runtimeStore.list().map(entry => entry.descriptor),
    getDiagnostics: () => engine.n.coreWorld.getDiagnostics?.(config.id) ?? [],
    getQuery: () => query,
    getState() {
      return Object.freeze({
        mode: "core",
        prepared,
        worldId: config.id,
        activeCellCount: worldSnapshot?.activeCells?.length ?? 0,
        activeCellIds: activeCellIdsFromSnapshot(worldSnapshot ?? {}),
        providerCellCounts: Object.freeze({
          terrain: terrainSource.runtimeStore.size,
          seaFloor: seaFloorSource.runtimeStore.size,
          biome: biome.runtimeStore.size,
          shoreline: shoreline.runtimeStore.size,
          seaFloorMaterial: seaFloorMaterial.runtimeStore.size,
          vegetation: vegetation.runtimeStore.size,
          rocks: rocks.runtimeStore.size,
          props: props.runtimeStore.size,
          presentation: presentation.runtimeStore.size
        }),
        materialization: materializer.getState()
      });
    },
    reset,
    dispose() {
      reset();
      engine.n.coreWorld.reset?.();
    }
  });
}
