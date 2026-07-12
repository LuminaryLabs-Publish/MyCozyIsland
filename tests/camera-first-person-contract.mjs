import assert from "node:assert/strict";
import { createCameraRailSequence } from "../src/kits/sequences.js";

const terrain = Object.freeze({
  clearingRadius: 17,
  sampleHeight({ x = 0, z = 0 } = {}) {
    return 21 + Number(x) * 0.012 - Number(z) * 0.008;
  }
});

const sequence = createCameraRailSequence(terrain);
sequence.input.wheel(2000);
let descriptor = sequence.descriptor();
assert.equal(descriptor.mode, "first-person");
assert.equal(descriptor.fov, 80);
assert.equal(descriptor.eyeHeight, 2);
assert.ok(Math.abs(descriptor.position.y - (terrain.sampleHeight(descriptor.position) + 2)) < 1e-6);

sequence.input.key("KeyW", true);
sequence.tick(0.5);
sequence.input.key("KeyW", false);
descriptor = sequence.descriptor();
assert.equal(descriptor.fov, 80);
assert.equal(descriptor.eyeHeight, 2);
assert.ok(Math.abs(descriptor.position.y - (terrain.sampleHeight(descriptor.position) + 2)) < 1e-6);

console.log("camera-first-person-contract: two-meter eye height and 80-degree FOV passed");
