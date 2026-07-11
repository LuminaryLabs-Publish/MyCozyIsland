import assert from "node:assert/strict";
import { createCozyIslandWorldRuntime } from "../src/world/world-runtime.js";
import { createFakeNexusWorldRuntime } from "./helpers/fake-nexus-world.mjs";
import { TEST_QUALITY } from "./helpers/test-quality.mjs";

const runtime = await createCozyIslandWorldRuntime({ quality: TEST_QUALITY, backend: "webgl2", runtime: createFakeNexusWorldRuntime() });
await runtime.prepare();
const before = new Set(runtime.getActiveCellIds());
const changed = runtime.updateWorldFocus({ x: 60, y: 0, z: 0 }, "first-person", 0.2);
assert.equal(changed, true);
const after = new Set(runtime.getActiveCellIds());
assert.equal(after.size, 49);
assert.ok([...before].some((id) => after.has(id)), "Expected retained overlapping cells.");
assert.ok([...before].some((id) => !after.has(id)), "Expected released cells after crossing a cell boundary.");
assert.equal(runtime.getState().providerCellCounts.terrain, 49);
runtime.dispose();
console.log("world-cell-lifecycle: retain, prepare, and release behavior passed");
