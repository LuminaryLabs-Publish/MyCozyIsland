import assert from "node:assert/strict";
import { createCozyIslandWorldRuntime } from "../src/world/world-runtime.js";
import { createFakeNexusWorldRuntime } from "./helpers/fake-nexus-world.mjs";
import { TEST_QUALITY } from "./helpers/test-quality.mjs";

const runtime = await createCozyIslandWorldRuntime({ quality: TEST_QUALITY, backend: "webgl2", runtime: createFakeNexusWorldRuntime() });
await runtime.prepare();
const bridged = runtime.createLegacyRenderSnapshot();
assert.deepEqual(bridged.vegetation.instances, runtime.vegetation.instances);
assert.deepEqual(bridged.rocks.instances, runtime.rocks.instances);
assert.deepEqual(bridged.props.objects, runtime.props.objects);
assert.deepEqual(bridged.campfire, runtime.campfire);
runtime.dispose();
console.log("world-population-parity: vegetation, rocks, props, and campfire match");
