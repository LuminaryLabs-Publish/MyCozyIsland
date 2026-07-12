import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { kitCatalog } from "../src/kits/catalog.js";
import { validateKitCatalog } from "../src/core/domain-kit.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = validateKitCatalog(kitCatalog);
assert.equal(catalog.valid, true, catalog.errors.join("\n"));
assert.equal(catalog.kitCount, 50, "The existing focused local-kit catalog remains stable during the pass-graph migration.");
assert.ok(catalog.capabilityCount >= 50, "Expected a broad capability graph.");
assert.equal(new Set(kitCatalog.map(kit => kit.id)).size, kitCatalog.length, "Kit IDs must be unique.");
for (const kit of kitCatalog) {
  assert.match(kit.id, /-kit$/, `${kit.id} must use the kit suffix.`);
  assert.equal(kit.extendsBase, "DomainServiceKit");
  assert.ok(kit.description.length >= 24, `${kit.id} needs a meaningful boundary description.`);
}

const sourceFiles = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.name.endsWith(".js")) sourceFiles.push(absolute);
  }
}
walk(path.join(root, "src"));
assert.ok(sourceFiles.length >= 34, "Expected separated world, render-graph, terrain-provider, and renderer modules.");

for (const file of sourceFiles) {
  const source = fs.readFileSync(file, "utf8");
  if (!file.endsWith("main-cloudform.js")) {
    assert.equal(source.includes("Math.random("), false, `${path.relative(root, file)} contains unseeded randomness.`);
    assert.equal(source.includes("Date.now("), false, `${path.relative(root, file)} contains wall-clock state.`);
  }
}

const rendererSource = sourceFiles
  .filter(file => path.basename(file).startsWith("renderer") || path.basename(file) === "renderers.js")
  .map(file => fs.readFileSync(file, "utf8"))
  .join("\n");
for (const token of ["Storage3DTexture", "VolumeNodeMaterial", "RaymarchingBox", "RenderPipeline", "MeshPhysicalNodeMaterial"]) {
  assert.ok(rendererSource.includes(token), `Renderer is missing ${token}.`);
}
for (const token of [
  "coast-clipped-island-terrain-geometry",
  "independent-seafloor-terrain-geometry",
  "Final Foam Overlay Scene",
  "Foam Occlusion Depth Scene",
  "foamDepthPass.getTextureNode",
  "opaqueSceneDepth",
  "foamVisible",
  "anime-transparent-ocean-surface"
]) assert.ok(rendererSource.includes(token), `Layered renderer is missing ${token}.`);

const worldSource = sourceFiles
  .filter(file => file.includes(`${path.sep}world${path.sep}`))
  .map(file => fs.readFileSync(file, "utf8"))
  .join("\n");
for (const token of [
  "createCoreWorldDomain",
  "createUniformGridPartition",
  "createFlatWorldSurface",
  "defineWorldEffectProvider",
  "createLazyCellMaterializer",
  "processMaterializationFrame",
  "terrainRowsPerStep",
  "classificationRowsPerStep",
  "createIslandTerrainProvider",
  "createSeaFloorTerrainProvider",
  "createSeaFloorMaterialProvider"
]) assert.ok(worldSource.includes(token), `Core World composition is missing ${token}.`);
for (const providerId of [
  "cozy-island-terrain-provider",
  "cozy-seafloor-terrain-provider",
  "biome-classification-provider",
  "shoreline-classification-provider",
  "seafloor-material-provider",
  "vegetation-provider",
  "rock-provider",
  "prop-provider",
  "cell-presentation-provider"
]) assert.ok(worldSource.includes(providerId), `Core World composition is missing ${providerId}.`);

const graphSource = fs.readFileSync(path.join(root, "src/kits/cozy-ocean-composition-kit.js"), "utf8");
for (const token of ["opaque-world", "water-composite", "atmosphere-composite", "foam-overlay", "output-transform"]) {
  assert.ok(graphSource.includes(token), `Ocean composition graph is missing ${token}.`);
}
assert.match(graphSource, /finalScenePassId: "foam-overlay"/);

const sequenceSource = fs.readFileSync(path.join(root, "src/kits/sequences.js"), "utf8");
for (const token of [
  "PLAYER_EYE_HEIGHT",
  "FIRST_PERSON_FOV",
  "pointAboveTerrain",
  "clampPointAboveTerrain"
]) assert.ok(sequenceSource.includes(token), `Camera sequence is missing ${token}.`);

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.match(html, /three@0\.185\.0\/build\/three\.webgpu\.js/);
assert.match(html, /LuminaryLabs-Dev\/NexusEngine@481cbf6df742e81279bd42245c4238c6a1fc69f2\/src\/engine\.js/);
assert.match(html, /LuminaryLabs-Dev\/NexusEngine@481cbf6df742e81279bd42245c4238c6a1fc69f2\/src\/core-domains\/core-world-domain\/index\.js/);
assert.doesNotMatch(html, /NexusEngine@481cbf6df742e81279bd42245c4238c6a1fc69f2\/src\/index\.js/);
assert.match(html, /src\/main-cloudform\.js\?v=foam-depth-camera-1/);
assert.match(html, /role="alert"/);

const main = fs.readFileSync(path.join(root, "src/main-cloudform.js"), "utf8");
assert.match(main, /createCozyIslandWorldRuntime/);
assert.match(main, /createCozyOceanCompositionKit/);
assert.match(main, /requestedFov/);
assert.match(main, /camera\.updateProjectionMatrix/);
assert.match(main, /frames > 1/);
assert.match(main, /processMaterializationFrame/);
assert.doesNotMatch(main, /scene\.add\(foamRenderer\.group\)/);

console.log(`static-check: ${catalog.kitCount} catalog kits, ${catalog.capabilityCount} capabilities, ${sourceFiles.length} JS files, depth-aware foam and terrain-safe camera`);
