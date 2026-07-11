export function createRendererCellCache({ prepareCell, updateCell, releaseCell } = {}) {
  if (typeof prepareCell !== "function" || typeof updateCell !== "function" || typeof releaseCell !== "function") throw new TypeError("Renderer cell cache requires prepareCell, updateCell, and releaseCell callbacks.");
  const cells = new Map();
  function sync(descriptors = [], resolveRuntimeData = () => null) {
    const nextIds = new Set(descriptors.map((descriptor) => descriptor.cellId));
    const prepared = [];
    const updated = [];
    const released = [];
    for (const [cellId, record] of cells) {
      if (!nextIds.has(cellId)) {
        releaseCell(cellId, record);
        cells.delete(cellId);
        released.push(cellId);
      }
    }
    for (const descriptor of descriptors) {
      const runtimeData = resolveRuntimeData(descriptor);
      const existing = cells.get(descriptor.cellId);
      if (!existing) {
        const record = prepareCell(descriptor, runtimeData);
        cells.set(descriptor.cellId, { descriptor, record });
        prepared.push(descriptor.cellId);
      } else if (existing.descriptor.version !== descriptor.version || existing.descriptor.lod !== descriptor.lod) {
        const record = updateCell(descriptor, runtimeData, existing.record);
        cells.set(descriptor.cellId, { descriptor, record });
        updated.push(descriptor.cellId);
      }
    }
    return Object.freeze({ prepared, updated, released, active: cells.size });
  }
  function dispose() {
    for (const [cellId, record] of cells) releaseCell(cellId, record);
    cells.clear();
  }
  return Object.freeze({ sync, dispose, get: (cellId) => cells.get(cellId) ?? null, list: () => [...cells.entries()], get size() { return cells.size; } });
}
