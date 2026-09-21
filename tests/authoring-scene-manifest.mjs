import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile(new URL("../data/authoring-scene.json", import.meta.url), "utf8"));
assert.equal(manifest.schema, "my-cozy-island.authoring-scene/1");
assert.equal(manifest.passCount, 59);
assert.equal(manifest.editsPerPass, 50);
assert.equal(manifest.objectCount, 2950);
assert.equal(manifest.passes.length, 59);
assert.equal(manifest.objects.length, 2950);
const ids = new Set(manifest.objects.map((object) => object.id));
assert.equal(ids.size, 2950, "Authoring object IDs must be unique.");
for (let pass = 1; pass <= 59; pass += 1) {
  const objects = manifest.objects.filter((object) => object.pass === pass);
  assert.equal(objects.length, 50, `Pass ${pass} must contain 50 authored edits.`);
}
assert.equal(manifest.authoringDomainPaths, 19);
console.log("Authoring scene manifest: 59 passes × 50 edits, stable IDs, and 19 Authoring domain paths passed.");
