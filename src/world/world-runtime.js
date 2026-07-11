import { COZY_WORLD_CONFIG, NEXUS_ENGINE_COMMIT } from "./world-config.js";
import { createLegacyWorldComposition } from "./legacy-world-composition.js";
import { createCozyWorldQuery } from "./world-query.js";
import { createIslandTerrainSource } from "./providers/island-terrain-provider.js";
import { createBiomeClassificationProvider } from "./providers/biome-classification-provider.js";
import { createShorelineClassificationProvider } from "./providers/shoreline-classification-provider.js";
import { createVegetationProvider } from "./providers/vegetation-provider.js";
import { createRockProvider } from "./providers/rock-provider.js";
import { createPropProvider } from "./providers/prop-provider.js";
import { createCellPresentationProvider } from "./providers/cell-presentation-provider.js";
import { createLegacyRenderSnapshotBridge } from "./legacy-render-snapshot-bridge.js";
import { activeCellIdsFromSnapshot, cellKeyFromCoordinates } from "./cell-utils.js";

async function resolveNexusRuntime(runtime) {
  if (runtime) return runtime;
  return import("nexusengine");
}

export async function createCozyIslandWorldRuntime({ quality, backend = "webgpu", mode = "core", runtime, config = COZY_WORLD_CONFIG } = {}) {
  const selectedMode = mode === "legacy" ? "legacy" : "core";
  const composition = createLegacyWorldComposition({ quality, backend });
  if (selectedMode === "legacy") {
    let prepared = false;
    return Object.freeze({
      mode: "legacy",
      config,
      nexusCommit: NEXUS_ENGINE_COMMIT,
      ...composition,
      async prepare() { prepared = true; return composition.snapshot; },
      createLegacyRenderSnapshot() { return composition.snapshot; },
      updateWorldFocus() { return false; },
      getWorldSnapshot() { return Object.freeze({ mode: "legacy", activeCells: [] }); },
      getActiveCellIds() { return []; },
      getDiagnostics() { return []; },
      getQuery() { return createCozyWorldQuery({ terrain: composition.terrain, biomeField: composition.biomeField, shoreline: composition.shoreline, config }); },
      getState() { return Object.freeze({ mode: "legacy", prepared }); },
      reset() { prepared = false; },
      dispose() { prepared = false; }
    });
  }

  const nexus = await resolveNexusRuntime(runtime);
  for (const name of ["createEngine", "createCoreWorldDomain", "createUniformGridPartition", "createFlatWorldSurface", "createTerrainProviderAdapter", "defineWorldEffectProvider"]) {
    if (typeof nexus[name] !== "function") throw new TypeError(`Pinned NexusEngine runtime is missing ${name}.`);
  }

  const terrainSource = createIslandTerrainSource({ terrain: composition.terrain, config });
  const terrainProvider = nexus.createTerrainProviderAdapter({ terrain: terrainSource, id: "cozy-island-terrain-provider", critical: true });
  const biome = createBiomeClassificationProvider({ defineWorldEffectProvider: nexus.defineWorldEffectProvider, biomeField: composition.biomeField, terrainSource });
  const shoreline = createShorelineClassificationProvider({ defineWorldEffectProvider: nexus.defineWorldEffectProvider, shoreline: composition.shoreline, terrainSource });
  const vegetation = createVegetationProvider({ defineWorldEffectProvider: nexus.defineWorldEffectProvider, vegetation: composition.vegetation });
  const rocks = createRockProvider({ defineWorldEffectProvider: nexus.defineWorldEffectProvider, rocks: composition.rocks });
  const props = createPropProvider({ defineWorldEffectProvider: nexus.defineWorldEffectProvider, props: composition.props, campfire: composition.campfire });
  const presentation = createCellPresentationProvider({ defineWorldEffectProvider: nexus.defineWorldEffectProvider, terrainSource, biomeStore: biome.runtimeStore, shorelineStore: shoreline.runtimeStore, vegetationStore: vegetation.runtimeStore, rockStore: rocks.runtimeStore, propStore: props.runtimeStore });
  const providers = [terrainProvider, biome.provider, shoreline.provider, vegetation.provider, rocks.provider, props.provider, presentation.provider];
  const partition = nexus.createUniformGridPartition({ id: "cozy-island-grid", cellSize: config.partition.cellSize, radius: config.partition.radius });
  const surface = nexus.createFlatWorldSurface({ id: "cozy-island-flat-surface" });
  const engine = nexus.createEngine({ kits: [nexus.createCoreWorldDomain()] });
  engine.n.coreWorld.registerWorld({ id: config.id, seed: config.seed, partition, surface, providers });

  const providerRuntime = Object.freeze({ terrain: terrainSource.runtimeStore, biome: biome.runtimeStore, shoreline: shoreline.runtimeStore, vegetation: vegetation.runtimeStore, rocks: rocks.runtimeStore, props: props.runtimeStore, presentation: presentation.runtimeStore, terrainSource });
  let worldSnapshot = null;
  let prepared = false;
  let focusAccumulator = 0;
  let lastFocus = { x: 0, y: 0, z: 0 };
  let lastCellKey = null;
  const query = createCozyWorldQuery({ terrain: composition.terrain, biomeField: composition.biomeField, shoreline: composition.shoreline, config, getActiveCells: () => worldSnapshot?.activeCells ?? [] });
  const bridge = createLegacyRenderSnapshotBridge({ composition, providerRuntime, getWorldSnapshot: () => worldSnapshot });

  function commitFocus(position) {
    lastFocus = { x: Number(position.x ?? 0), y: Number(position.y ?? 0), z: Number(position.z ?? 0) };
    engine.n.coreWorld.setFocus(config.id, { position: lastFocus });
    worldSnapshot = engine.n.coreWorld.updateWorld(config.id);
    lastCellKey = cellKeyFromCoordinates(partition.locateCell(lastFocus));
    focusAccumulator = 0;
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
    const moved = Math.hypot(Number(target.x ?? 0) - lastFocus.x, Number(target.z ?? 0) - lastFocus.z);
    const interval = 1 / Math.max(1, Number(config.focus.updateHz ?? 10));
    if (nextCellKey === lastCellKey && !(focusAccumulator >= interval && moved >= Number(config.focus.minimumMovement ?? 4))) return false;
    commitFocus(target);
    return true;
  }

  function reset() {
    engine.n.coreWorld.resetWorlds?.();
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
    getWorldSnapshot: () => worldSnapshot,
    getActiveCellIds: () => activeCellIdsFromSnapshot(worldSnapshot ?? {}),
    getPresentationDescriptors: () => presentation.runtimeStore.list().map((entry) => entry.descriptor),
    getDiagnostics: () => engine.n.coreWorld.getDiagnostics?.(config.id) ?? [],
    getQuery: () => query,
    getState() {
      return Object.freeze({
        mode: "core",
        prepared,
        worldId: config.id,
        activeCellCount: worldSnapshot?.activeCells?.length ?? 0,
        activeCellIds: activeCellIdsFromSnapshot(worldSnapshot ?? {}),
        providerCellCounts: Object.freeze({ terrain: terrainSource.runtimeStore.size, biome: biome.runtimeStore.size, shoreline: shoreline.runtimeStore.size, vegetation: vegetation.runtimeStore.size, rocks: rocks.runtimeStore.size, props: props.runtimeStore.size, presentation: presentation.runtimeStore.size })
      });
    },
    reset,
    dispose() { reset(); engine.n.coreWorld.reset?.(); }
  });
}
