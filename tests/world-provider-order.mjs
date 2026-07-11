import assert from "node:assert/strict";
import { createCozyIslandWorldRuntime } from "../src/world/world-runtime.js";
import { createFakeNexusWorldRuntime } from "./helpers/fake-nexus-world.mjs";
import { TEST_QUALITY } from "./helpers/test-quality.mjs";

const nexus = createFakeNexusWorldRuntime();
const runtime = await createCozyIslandWorldRuntime({ quality: TEST_QUALITY, backend: "webgl2", runtime: nexus });
await runtime.prepare();
const firstCell = runtime.getActiveCellIds()[0];
const trace = nexus.trace.filter((line) => line.endsWith(`:${firstCell}`) && line.includes(":prepare:"));
const phases = trace.map((line) => line.split(":")[0]);
assert.deepEqual(phases, ["foundation", "classification", "classification", "population", "population", "population", "presentation"]);
assert.match(trace[0], /cozy-island-terrain-provider/);
assert.match(trace.at(-1), /cell-presentation-provider/);
runtime.dispose();
console.log("world-provider-order: foundation -> classification -> population -> presentation passed");
