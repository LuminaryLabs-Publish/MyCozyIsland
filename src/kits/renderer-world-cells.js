import { createRendererCellCache } from "./renderer-cell-cache.js";

export function createCellAwareWorldRendererController({ createCell, updateCell, releaseCell, resolveRuntimeData } = {}) {
  const cache = createRendererCellCache({ prepareCell: createCell, updateCell, releaseCell });
  return Object.freeze({
    sync(activeDescriptors = []) { return cache.sync(activeDescriptors, resolveRuntimeData); },
    getCell(cellId) { return cache.get(cellId); },
    listCells() { return cache.list(); },
    dispose() { cache.dispose(); }
  });
}
