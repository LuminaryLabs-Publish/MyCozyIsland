import assert from "node:assert/strict";
import { createCameraRailSequence } from "../src/kits/sequences.js";

const terrain = Object.freeze({
  clearingRadius: 17,
  sampleHeight({ x = 0, z = 0 } = {}) {
    const radial = Math.hypot(Number(x), Number(z));
    return 22 + Math.max(0, 5 - radial * 0.08);
  }
});

const sequence = createCameraRailSequence(terrain);
let currentProgress = sequence.descriptor().progress;
for (const target of [0.70, 0.78, 0.86, 0.92, 0.97, 0.984]) {
  sequence.input.wheel((target - currentProgress) / 0.00072);
  const descriptor = sequence.descriptor();
  currentProgress = descriptor.progress;
  assert.equal(descriptor.mode, "rail");
  const ground = terrain.sampleHeight(descriptor.position);
  assert.ok(
    descriptor.position.y >= ground + 2 - 1e-6,
    `Rail camera entered terrain at progress ${descriptor.progress}: ${descriptor.position.y} < ${ground + 2}`
  );
  const lookGround = terrain.sampleHeight(descriptor.lookAt);
  assert.ok(
    descriptor.lookAt.y > lookGround,
    `Rail look target entered terrain at progress ${descriptor.progress}: ${descriptor.lookAt.y} <= ${lookGround}`
  );
  assert.ok(Number.isFinite(descriptor.fov));
  assert.ok(descriptor.fov >= 55 && descriptor.fov <= 80);
}

console.log("camera-rail-ground-clearance: terrain-safe rail positions and look targets passed");
