import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");

const worldRenderer = read("src/kits/renderer-world.js");
assert.match(worldRenderer, /coast-clipped-island-terrain-geometry/);
assert.match(worldRenderer, /independent-seafloor-terrain-geometry/);
assert.match(worldRenderer, /fields\.shoreDistance >= -shelfWidth/);
assert.match(worldRenderer, /group\.add\(floorMesh\);\s*group\.add\(terrainMesh\);/);
assert.doesNotMatch(worldRenderer, /terrainMesh\.name = "toon-terrain"/);

const runtime = read("src/world/world-runtime.js");
for (const token of [
  "createIslandTerrainProvider",
  "createSeaFloorTerrainProvider",
  "createSeaFloorMaterialProvider"
]) assert.ok(runtime.includes(token), `world runtime missing ${token}`);

const islandProvider = read("src/world/providers/island-terrain-provider.js");
assert.match(islandProvider, /cozy-island-terrain-provider/);
assert.match(islandProvider, /island-terrain-descriptor/);
const seaFloorProvider = read("src/world/providers/sea-floor-terrain-provider.js");
assert.match(seaFloorProvider, /cozy-seafloor-terrain-provider/);
assert.match(seaFloorProvider, /seafloor-descriptor/);
const seaFloorMaterials = read("src/world/providers/seafloor-material-provider.js");
assert.match(seaFloorMaterials, /source: "seafloor-provider-fields"/);
assert.doesNotMatch(seaFloorMaterials, /biome/i);

const post = read("src/kits/renderer-post.js");
assert.match(post, /Final Foam Overlay Scene/);
assert.match(post, /atmosphereCompositedColor\.rgb\.mul\(foamPass\.a\.oneMinus\(\)\)\.add\(foamPass\.rgb\)/);
const main = read("src/main-cloudform.js");
assert.doesNotMatch(main, /scene\.add\(foamRenderer\.group\)/);
assert.match(main, /createCozyOceanCompositionKit/);

console.log("terrain-layer-separation: island, seafloor, water, fog, and foam boundaries passed");
