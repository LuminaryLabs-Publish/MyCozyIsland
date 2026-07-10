import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { kitCatalog } from "../src/kits/catalog.js";
import { validateKitCatalog } from "../src/core/domain-kit.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = validateKitCatalog(kitCatalog);
assert.equal(catalog.valid, true, catalog.errors.join("\n"));
assert.equal(catalog.kitCount, 50, "The architecture contract requires exactly 50 focused kits.");
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
assert.ok(sourceFiles.length >= 12, "Expected separated domain and renderer modules.");

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

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.match(html, /three@0\.185\.0\/build\/three\.webgpu\.js/);
assert.match(html, /src\/main-cloudform\.js/);
assert.match(html, /role="alert"/);

console.log(`static-check: ${catalog.kitCount} kits, ${catalog.capabilityCount} capabilities, ${sourceFiles.length} JS files`);
