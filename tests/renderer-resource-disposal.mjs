import assert from "node:assert/strict";
import { disposeRendererObject } from "../src/kits/renderer-disposal.js";

let geometryDisposed = 0;
let materialDisposed = 0;
const geometry = { dispose() { geometryDisposed += 1; } };
const material = { dispose() { materialDisposed += 1; } };
const root = {
  geometry,
  material,
  traverse(callback) { callback(this); },
  removeFromParent() { this.removed = true; }
};
const stats = disposeRendererObject(root);
assert.deepEqual(stats, { objects: 1, geometries: 1, materials: 1 });
assert.equal(geometryDisposed, 1);
assert.equal(materialDisposed, 1);
assert.equal(root.removed, true);
console.log("renderer-resource-disposal: cell-only resources disposed");
