import assert from "node:assert/strict";
import fs from "node:fs";
import { createLegacyWorldComposition } from "../src/world/legacy-world-composition.js";
import { TEST_QUALITY } from "./helpers/test-quality.mjs";

const fixture = JSON.parse(fs.readFileSync(new URL("./fixtures/cozy-island-world-baseline.json", import.meta.url), "utf8"));
const first = createLegacyWorldComposition({ quality: TEST_QUALITY, backend: "webgl2" });
const second = createLegacyWorldComposition({ quality: TEST_QUALITY, backend: "webgl2" });

assert.equal(first.seed, fixture.seed);
assert.equal(first.terrain.radius, fixture.terrainRadius);
assert.equal(first.terrain.clearingRadius, fixture.clearingRadius);
for (const point of fixture.terrainPoints) {
  assert.equal(first.terrain.sampleHeight(point), second.terrain.sampleHeight(point));
  assert.deepEqual(first.terrain.sampleFields(point), second.terrain.sampleFields(point));
}
for (const point of fixture.shorelinePoints) {
  assert.deepEqual(first.shoreline.sample(point), second.shoreline.sample(point));
}

const centerHeight = first.terrain.sampleHeight({ x: 0, z: 0 });
const clearingSamples = Array.from({ length: 12 }, (_, index) => {
  const angle = index / 12 * Math.PI * 2;
  const radius = first.terrain.clearingRadius * 0.68;
  return first.terrain.sampleHeight({ x: Math.cos(angle) * radius, z: Math.sin(angle) * radius });
});
const variation = Math.max(centerHeight, ...clearingSamples) - Math.min(centerHeight, ...clearingSamples);
assert.ok(variation < fixture.clearingMaximumVariation, `Clearing variation ${variation} exceeded baseline threshold.`);
assert.deepEqual(first.vegetation.instances, second.vegetation.instances);
assert.deepEqual(first.rocks.instances, second.rocks.instances);
assert.deepEqual(first.props.objects, second.props.objects);
console.log(`world-baseline: ${first.vegetation.instances.length} vegetation, ${first.rocks.instances.length} rocks, clearing ${variation.toFixed(4)}m`);
