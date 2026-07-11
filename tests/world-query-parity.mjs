import assert from "node:assert/strict";
import { createCozyIslandWorldRuntime } from "../src/world/world-runtime.js";
import { createFakeNexusWorldRuntime } from "./helpers/fake-nexus-world.mjs";
import { TEST_QUALITY } from "./helpers/test-quality.mjs";

const runtime = await createCozyIslandWorldRuntime({ quality: TEST_QUALITY, backend: "webgl2", runtime: createFakeNexusWorldRuntime() });
await runtime.prepare();
const query = runtime.getQuery();
for (const point of [{ x: 0, z: 0 }, { x: 42.5, z: -31.25 }, { x: -103, z: 18 }]) {
  assert.equal(query.heightAt(point.x, point.z), runtime.terrain.sampleHeight(point));
  assert.deepEqual(query.normalAt(point.x, point.z), runtime.terrain.sampleNormal(point));
  assert.deepEqual(query.fieldsAt(point.x, point.z), runtime.terrain.sampleFields(point));
  assert.deepEqual(query.biomeAt(point.x, point.z), runtime.biomeField.sample(point));
  assert.deepEqual(query.shorelineAt(point.x, point.z), runtime.shoreline.sample(point));
}
runtime.dispose();
console.log("world-query-parity: legacy and shared query outputs match");
