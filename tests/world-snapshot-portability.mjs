import assert from "node:assert/strict";
import { createCozyIslandWorldRuntime } from "../src/world/world-runtime.js";
import { inspectPortableValue } from "../src/world/descriptors.js";
import { createFakeNexusWorldRuntime } from "./helpers/fake-nexus-world.mjs";
import { TEST_QUALITY } from "./helpers/test-quality.mjs";

const runtime = await createCozyIslandWorldRuntime({ quality: TEST_QUALITY, backend: "webgl2", runtime: createFakeNexusWorldRuntime() });
await runtime.prepare();
for (const descriptor of runtime.getPresentationDescriptors()) {
  const result = inspectPortableValue(descriptor);
  assert.equal(result.portable, true, result.issues.join(", "));
  assert.equal(JSON.stringify(descriptor).includes("Float32Array"), false);
}
const state = runtime.getState();
assert.doesNotThrow(() => structuredClone(state));
runtime.dispose();
console.log("world-snapshot-portability: descriptors contain no runtime or GPU handles");
