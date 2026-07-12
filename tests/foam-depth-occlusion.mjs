import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "src/kits/renderer-post.js"), "utf8");

for (const token of [
  "Foam Occlusion Depth Scene",
  "MeshDepthMaterial",
  "depthBuffer: true",
  "foamDepthPass.getTextureNode(\"depth\")",
  "opaqueSceneDepth",
  "depthBias",
  "foamVisible",
  "step(foamDepth",
  "visibleFoamAlpha",
  "visibleFoamRgb"
]) assert.ok(source.includes(token), `Foam occlusion pipeline is missing ${token}.`);

assert.equal(
  source.includes("atmosphereCompositedColor.rgb.mul(foamPass.a.oneMinus()).add(foamPass.rgb)"),
  false,
  "Unmasked final foam composition must not remain."
);

const waterIndex = source.indexOf('"water-composite"');
const atmosphereIndex = source.indexOf('"atmosphere-composite"');
const foamIndex = source.indexOf('"foam-overlay"');
const outputIndex = source.indexOf('"output-transform"');
assert.ok(waterIndex < atmosphereIndex && atmosphereIndex < foamIndex && foamIndex < outputIndex);

console.log("foam-depth-occlusion: opaque-depth visibility mask and final foam ordering passed");
