import { createCellEffectDescriptor } from "../descriptors.js";
import { createProviderRuntimeStore } from "../provider-runtime-store.js";

export function createCellPresentationProvider({
  defineWorldEffectProvider,
  terrainSource,
  biomeStore,
  shorelineStore,
  vegetationStore,
  rockStore,
  propStore
} = {}) {
  if (!defineWorldEffectProvider) throw new TypeError("createCellPresentationProvider requires defineWorldEffectProvider.");

  const store = createProviderRuntimeStore("cell-presentation-provider-runtime");

  function build({ world, cell }) {
    const terrain = terrainSource.getRuntimeCell(cell.id);
    const biome = biomeStore.get(cell.id);
    const shoreline = shorelineStore.get(cell.id);
    const vegetation = vegetationStore.get(cell.id);
    const rocks = rockStore.get(cell.id);
    const props = propStore.get(cell.id);
    const handleId = `${cell.id}:render-cell`;
    const version = Number(store.get(cell.id)?.descriptor?.version ?? 0) + 1;
    const descriptor = createCellEffectDescriptor({
      schema: "cozy.render-cell.v2",
      id: handleId,
      worldId: world.id,
      cell,
      providerId: "cell-presentation-provider",
      version,
      runtimeHandleId: handleId,
      capabilities: ["render-cell-descriptor"],
      data: {
        terrainHandleId: terrain?.handleId ?? null,
        biomeHandleId: biome?.status === "ready" ? biome.handleId : null,
        shorelineHandleId: shoreline?.status === "ready" ? shoreline.handleId : null,
        vegetationHandleId: vegetation?.handleId ?? null,
        rockHandleId: rocks?.handleId ?? null,
        propHandleId: props?.handleId ?? null,
        materialization: terrain && biome?.status === "ready" && shoreline?.status === "ready" ? "ready" : "queued"
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
        "terrain-descriptor",
        "biome-weights",
        "shoreline-distance",
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
