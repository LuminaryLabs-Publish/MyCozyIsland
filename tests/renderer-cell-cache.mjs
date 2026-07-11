import assert from "node:assert/strict";
import { createRendererCellCache } from "../src/kits/renderer-cell-cache.js";

const events = [];
const cache = createRendererCellCache({
  prepareCell(descriptor) { events.push(`prepare:${descriptor.cellId}`); return { version: descriptor.version }; },
  updateCell(descriptor) { events.push(`update:${descriptor.cellId}`); return { version: descriptor.version }; },
  releaseCell(cellId) { events.push(`release:${cellId}`); }
});
cache.sync([{ cellId: "a", version: 1, lod: 0 }, { cellId: "b", version: 1, lod: 0 }]);
cache.sync([{ cellId: "a", version: 2, lod: 0 }, { cellId: "c", version: 1, lod: 0 }]);
assert.deepEqual(events, ["prepare:a", "prepare:b", "release:b", "update:a", "prepare:c"]);
assert.equal(cache.size, 2);
cache.dispose();
assert.equal(cache.size, 0);
console.log("renderer-cell-cache: prepare, update, release, and dispose passed");
