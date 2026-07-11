import assert from "node:assert/strict";
import { createCozyIslandWorldRuntime } from "../src/world/world-runtime.js";
import { createFakeNexusWorldRuntime } from "./helpers/fake-nexus-world.mjs";
import { TEST_QUALITY } from "./helpers/test-quality.mjs";

const nexus = createFakeNexusWorldRuntime();
const runtime = await createCozyIslandWorldRuntime({ quality: TEST_QUALITY, backend: "webgl2", runtime: nexus, mode: "core" });
await runtime.prepare();
const state = runtime.getState();
assert.equal(state.mode, "core");
assert.equal(state.activeCellCount, 49);
assert.equal(state.providerCellCounts.terrain, 49);
assert.equal(state.providerCellCounts.presentation, 49);
assert.equal(runtime.getPresentationDescriptors().length, 49);
assert.doesNotThrow(() => JSON.stringify(runtime.getWorldSnapshot()));
runtime.dispose();
console.log("core-world-runtime: 49 active cells and seven provider layers passed");
