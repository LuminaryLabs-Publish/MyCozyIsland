import { createCellEffectDescriptor } from "../descriptors.js";
import { createProviderRuntimeStore } from "../provider-runtime-store.js";
import { filterIndexedItemsForBounds, indexWorldItems, pointInBounds } from "../cell-utils.js";

export function createIndexedPopulationProvider({ defineWorldEffectProvider, id, kind, requires = [], provides = [], schema, worldItems = [], extraForCell, phase = "population" } = {}) {
  const indexedItems = indexWorldItems(worldItems);
  const store = createProviderRuntimeStore(`${id}-runtime`);
  function build({ world, cell }) {
    const items = filterIndexedItemsForBounds(indexedItems, cell.bounds);
    const extra = extraForCell?.({ world, cell, pointInBounds }) ?? {};
    const handleId = `${cell.id}:${kind}`;
    const version = Number(store.get(cell.id)?.descriptor?.version ?? 0) + 1;
    const descriptor = createCellEffectDescriptor({ schema, id: handleId, worldId: world.id, cell, providerId: id, version, runtimeHandleId: handleId, capabilities: provides, data: { count: items.length, ...extra.descriptor } });
    store.set(cell.id, { handleId, descriptor, items, ...extra.runtime });
    return { id: handleId, kind, capabilities: provides, descriptor };
  }
  const provider = defineWorldEffectProvider({ id, kind, phase, requires, provides, prepareCell: build, updateCell: build, releaseCell({ cell }) { store.remove(cell.id); }, getEffectDescriptor(cellId) { return store.get(cellId)?.descriptor ?? null; }, snapshot() { return store.snapshot(); }, restoreSnapshot() { store.clear(); }, reset() { store.clear(); } });
  return Object.freeze({ provider, runtimeStore: store, indexedItems });
}
