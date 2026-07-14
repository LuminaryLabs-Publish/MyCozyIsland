import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const files = Object.fromEntries(await Promise.all([
  "index.html",
  "menu.html",
  "game.html",
  "src/menu.js",
  "src/game-preload-bridge.js",
  ".github/workflows/pages.yml"
].map(async (path) => [path, await readFile(path, "utf8")])));

for (const path of ["src/menu.js", "src/game-preload-bridge.js"]) {
  const result = spawnSync(process.execPath, ["--check", path], { encoding: "utf8" });
  assert.equal(result.status, 0, `${path} should parse:\n${result.stderr}`);
}

assert.match(files["index.html"], /menu\.html/, "root route enters the menu scene");
assert.match(files["menu.html"], /id="menu-scene"/, "menu owns one Three.js canvas");
assert.match(files["menu.html"], /id="play"/, "menu owns one Play gate");
assert.match(files["menu.html"], /id="game-preload"/, "menu owns the hidden background game surface");
assert.match(files["menu.html"], /three\.webgpu\.js/, "menu imports the WebGPU Three.js build");
assert.match(files["menu.html"], /three\.tsl\.js/, "menu imports TSL for GPU deformation");
assert.match(files["menu.html"], /alpha-frond-postcard-1/, "menu refreshes the alpha-card scene cache key");
assert.doesNotMatch(files["menu.html"], /<h1|menu-card|preload-track|preload-label|preload-percent|subtitle/, "menu exposes no title card, progress bar, or extra copy");

assert.match(files["game.html"], /src\/main-adventure\.js/, "game page loads the full adventure");
assert.match(files["game.html"], /src\/game-preload-bridge\.js/, "game page loads the menu handoff bridge");
assert.match(files["game.html"], /data-background-preload/, "background game hides gameplay HUD until entry");

const menuSource = files["src/menu.js"];
assert.match(menuSource, /import \* as THREE from "three\/webgpu"/, "menu is implemented with WebGPURenderer");
assert.match(menuSource, /new THREE\.WebGPURenderer/, "menu owns a WebGPU-first renderer");
assert.match(menuSource, /new THREE\.RenderPipeline/, "menu owns a WebGPU render pipeline");
assert.match(menuSource, /bloom\(sceneColor, 0\.14, 0\.28, 1\.22\)/, "menu keeps restrained GPU bloom");
assert.match(menuSource, /toneMappingExposure = 0\.92/, "menu uses warm authored exposure");

assert.match(menuSource, /const FROND_COUNT = 8/, "palm uses eight frond cards");
assert.match(menuSource, /function createFrondAtlas/, "menu generates one detailed frond atlas");
assert.match(menuSource, /menu-palm-frond-atlas/, "frond atlas has stable identity");
assert.match(menuSource, /function createFrondCardGeometry/, "fronds use low-segment curved cards");
assert.match(menuSource, /const segments = 5/, "each frond uses only five quads");
assert.match(menuSource, /alphaTest: 0\.48/, "fronds use alpha clipping instead of blended transparency");
assert.match(menuSource, /transparent: false/, "frond cards avoid transparent sorting");
assert.match(menuSource, /menu-palm-frond-card-/, "frond cards have stable identities");
assert.doesNotMatch(menuSource, /createFrondLeafletsGeometry|menu-palm-leaflets|menu-palm-rib-/, "modeled leaflet and rib meshes were removed");
assert.equal((menuSource.match(/new THREE\.TubeGeometry/g) ?? []).length, 1, "palm owns exactly one trunk tube mesh");
assert.match(menuSource, /menu-palm-crown-hub/, "palm owns one crown hub mesh");
assert.doesNotMatch(menuSource, /menu-palm-coconut-/, "menu palm does not add extra coconut meshes");

assert.match(menuSource, /StorageBufferAttribute\(FROND_COUNT, 1\)/, "WebGPU wind storage matches the eight-card budget");
assert.match(menuSource, /renderer\.compute\(windCompute\)/, "WebGPU path dispatches palm wind compute");
assert.match(menuSource, /material\.positionNode/, "frond and water movement run in GPU vertex stages");

assert.match(menuSource, /camera\.position\.set\(-4\.8, 4\.7, 12\.2\)/, "camera uses a top-left elevated view");
assert.match(menuSource, /palm\.position\.set\(-2\.65, -2\.05, 0\.15\)/, "palm is placed on the left third");
assert.match(menuSource, /function createBackgroundFlowers/, "menu adds soft distant flower cards");
assert.match(menuSource, /for \(let index = 0; index < 3; index \+= 1\)/, "menu uses three flower accents");
assert.match(menuSource, /function createWaterStrip/, "menu adds one lightweight water strip");
assert.match(menuSource, /menu-water-strip/, "water strip has stable identity");
assert.match(menuSource, /function createShoreline/, "menu adds one faint shoreline");
assert.match(menuSource, /new THREE\.Fog/, "background depth uses atmospheric haze");
assert.doesNotMatch(menuSource, /createIsland|terrain/i, "menu does not add an island or terrain system");

assert.match(menuSource, /game\.html\?preload=1/, "menu starts the game page asynchronously");
assert.match(menuSource, /Math\.min\(99/, "button progress remains capped at 99 percent");
assert.match(menuSource, /cozy-game-ready/, "menu waits for an explicit game-ready message");
assert.match(menuSource, /cozy-game-enter/, "Play sends an explicit entry request");
assert.match(menuSource, /history\.replaceState/, "revealing the preloaded game updates the route without rebuilding it");

assert.match(files["src/game-preload-bridge.js"], /freezeSimulation/, "background preload freezes gameplay simulation after readiness");
assert.match(files["src/game-preload-bridge.js"], /freezePresentation/, "background preload stops the hidden render callback");
assert.match(files["src/game-preload-bridge.js"], /setAnimationLoop\(null\)/, "hidden game GPU rendering sleeps at 99 percent");
assert.match(files["src/game-preload-bridge.js"], /resumePresentation/, "Play restores the prepared game render callback");
assert.match(files["src/game-preload-bridge.js"], /cozy-game-entered/, "game acknowledges successful entry");
assert.match(files["src/game-preload-bridge.js"], /descriptor\?\.playable/, "Core Startup remains the factual readiness source");

assert.match(files[".github/workflows/pages.yml"], /cp \.\/\*\.html dist\//, "Pages deploys index, menu, and game pages");

console.log("menu/game shell smoke: alpha-cut frond cards, left-third postcard framing, soft flowers, wave strip, sleeping preload, and seamless entry verified");