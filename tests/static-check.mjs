import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { kitCatalog } from "../src/kits/catalog.js";
import { validateKitCatalog } from "../src/core/domain-kit.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = validateKitCatalog(kitCatalog);
assert.equal(catalog.valid, true, catalog.errors.join("\n"));
assert.equal(catalog.kitCount, 50, "The architecture contract requires exactly 50 focused local kits.");
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
assert.ok(sourceFiles.length >= 28, "Expected separated domain, world-provider, and renderer modules.");
for (const file of sourceFiles) {
  const source = fs.readFileSync(file, "utf8");
  if (!file.endsWith("main-cloudform.js")) {
    assert.equal(source.includes("Math.random("), false, `${path.relative(root, file)} contains unseeded randomness.`);
    assert.equal(source.includes("Date.now("), false, `${path.relative(root, file)} contains wall-clock state.`);
  }
}
const rendererSource = sourceFiles.filter(file => path.basename(file).startsWith("renderer") || path.basename(file) === "renderers.js").map(file => fs.readFileSync(file, "utf8")).join("\n");
for (const token of ["Storage3DTexture", "VolumeNodeMaterial", "RaymarchingBox", "RenderPipeline", "MeshPhysicalNodeMaterial"]) assert.ok(rendererSource.includes(token), `Renderer is missing ${token}.`);
const worldSource = sourceFiles.filter(file => file.includes(`${path.sep}world${path.sep}`)).map(file => fs.readFileSync(file, "utf8")).join("\n");
for (const token of ["createCoreWorldDomain", "createUniformGridPartition", "createFlatWorldSurface", "createTerrainProviderAdapter", "defineWorldEffectProvider"]) assert.ok(worldSource.includes(token), `Core World migration is missing ${token}.`);
for (const providerId of ["cozy-island-terrain-provider", "biome-classification-provider", "shoreline-classification-provider", "vegetation-provider", "rock-provider", "prop-provider", "cell-presentation-provider"]) assert.ok(worldSource.includes(providerId), `Core World migration is missing ${providerId}.`);
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.match(html, /three@0\.185\.0\/build\/three\.webgpu\.js/);
assert.match(html, /LuminaryLabs-Dev\/NexusEngine@38229f59c22cb40024ffd13a9f48040de759f5d7\/src\/engine\.js/);
assert.match(html, /LuminaryLabs-Dev\/NexusEngine@38229f59c22cb40024ffd13a9f48040de759f5d7\/src\/core-domains\/core-world-domain\/index\.js/);
assert.doesNotMatch(html, /NexusEngine@38229f59c22cb40024ffd13a9f48040de759f5d7\/src\/index\.js/);
assert.match(html, /src\/main-cloudform\.js\?v=core-world-2/);
assert.match(html, /role="alert"/);
const main = fs.readFileSync(path.join(root, "src/main-cloudform.js"), "utf8");
assert.match(main, /createCozyIslandWorldRuntime/);
assert.match(main, /world=legacy|worldMode/);
console.log(`static-check: ${catalog.kitCount} local kits, ${catalog.capabilityCount} capabilities, ${sourceFiles.length} JS files, Core World pinned`);
