import { createCellEffectDescriptor } from "../descriptors.js";
import { createProviderRuntimeStore } from "../provider-runtime-store.js";

export function createCellPresentationProvider({
  defineWorldEffectProvider,
  terrainSource,
  seaFloorSource,
  biomeStore,
  shorelineStore,
  seaFloorMaterialStore,
  vegetationStore,
  rockStore,
  propStore
} = {}) {
  if (!defineWorldEffectProvider) throw new TypeError("createCellPresentationProvider requires defineWorldEffectProvider.");
  const store = createProviderRuntimeStore("cell-presentation-provider-runtime");

  function build({ world, cell }) {
    const terrain = terrainSource.getRuntimeCell(cell.id);
    const seaFloor = seaFloorSource.getRuntimeCell(cell.id);
    const biome = biomeStore.get(cell.id);
    const shoreline = shorelineStore.get(cell.id);
    const seaFloorMaterial = seaFloorMaterialStore.get(cell.id);
    const vegetation = vegetationStore.get(cell.id);
    const rocks = rockStore.get(cell.id);
    const props = propStore.get(cell.id);
    const handleId = `${cell.id}:render-cell`;
    const version = Number(store.get(cell.id)?.descriptor?.version ?? 0) + 1;
    const ready = Boolean(
      terrain
      && seaFloor
      && biome?.status === "ready"
      && shoreline?.status === "ready"
      && seaFloorMaterial?.status === "ready"
    );
    const descriptor = createCellEffectDescriptor({
      schema: "cozy.render-cell.v3",
      id: handleId,
      worldId: world.id,
      cell,
      providerId: "cell-presentation-provider",
      version,
      runtimeHandleId: handleId,
      capabilities: ["render-cell-descriptor"],
      data: {
        islandTerrainHandleId: terrain?.handleId ?? null,
        seaFloorTerrainHandleId: seaFloor?.handleId ?? null,
        islandBiomeHandleId: biome?.status === "ready" ? biome.handleId : null,
        shorelineHandleId: shoreline?.status === "ready" ? shoreline.handleId : null,
        seaFloorMaterialHandleId: seaFloorMaterial?.status === "ready" ? seaFloorMaterial.handleId : null,
        vegetationHandleId: vegetation?.handleId ?? null,
        rockHandleId: rocks?.handleId ?? null,
        propHandleId: props?.handleId ?? null,
        materialization: ready ? "ready" : "queued",
        renderLayers: {
          islandTerrain: "opaque-world",
          seaFloorTerrain: "opaque-world",
          water: "water-composite",
          fog: "atmosphere-composite",
          foam: "foam-overlay"
        }
      }
    });
    store.set(cell.id, { handleId, descriptor, cell, worldId: world.id });
    return { id: handleId, kind: "render-cell", capabilities: ["render-cell-descriptor"], descriptor };
  }

  return Object.freeze({
    provider: defineWorldEffectProvider({
      id: "cell-presentation-provider",
      kind: "render-cell",
      phase: "presentation",
      requires: [
        "island-terrain-descriptor",
        "seafloor-descriptor",
        "biome-weights",
        "shoreline-distance",
        "seafloor-material",
        "vegetation-instances",
        "rock-instances",
        "prop-instances"
      ],
      provides: ["render-cell-descriptor"],
      prepareCell: build,
      updateCell: build,
      releaseCell({ cell }) { store.remove(cell.id); },
      getEffectDescriptor(cellId) { return store.get(cellId)?.descriptor ?? null; },
      snapshot() { return store.snapshot(); },
      restoreSnapshot() { store.clear(); },
      reset() { store.clear(); }
    }),
    refreshCell(cell, worldId) {
      return build({ world: { id: worldId }, cell });
    },
    runtimeStore: store
  });
}
