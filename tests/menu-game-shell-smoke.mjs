import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const paths = [
  "index.html",
  "menu.html",
  "game.html",
  "src/menu.js",
  "src/menu/menu-scene-recipe.js",
  "src/menu/menu-textures.js",
  "src/menu/menu-three-renderer-lite.js",
  "src/game-preload-bridge.js",
  ".github/workflows/pages.yml"
];

const files = Object.fromEntries(await Promise.all(
  paths.map(async (path) => [path, await readFile(path, "utf8")])
));

for (const path of [
  "src/menu.js",
  "src/menu/menu-scene-recipe.js",
  "src/menu/menu-textures.js",
  "src/menu/menu-three-renderer-lite.js",
  "src/game-preload-bridge.js"
]) {
  const result = spawnSync(process.execPath, ["--check", path], { encoding: "utf8" });
  assert.equal(result.status, 0, `${path} should parse:\n${result.stderr}`);
}

assert.match(files["index.html"], /menu\.html/, "root route enters the menu scene");
assert.match(files["menu.html"], /id="menu-scene"/, "menu owns one WebGPU canvas");
assert.match(files["menu.html"], /id="play"/, "menu owns one Play gate");
assert.match(files["menu.html"], /id="game-preload"/, "menu owns the hidden background game surface");
assert.match(files["menu.html"], /three\.webgpu\.js/, "menu imports the WebGPU Three.js build");
assert.match(files["menu.html"], /cozy-particle-performance-menu-1/, "menu refreshes the optimized scene cache key");
assert.doesNotMatch(files["menu.html"], /<h1|menu-card|preload-track|preload-label|preload-percent|subtitle/, "menu remains visually minimal");

const hostSource = files["src/menu.js"];
const recipeSource = files["src/menu/menu-scene-recipe.js"];
const textureSource = files["src/menu/menu-textures.js"];
const rendererSource = files["src/menu/menu-three-renderer-lite.js"];

assert.doesNotMatch(hostSource, /three\/webgpu|new THREE\./, "menu host stays free of renderer construction");
assert.match(hostSource, /createMenuThreeRenderer/, "menu host composes the renderer adapter");
assert.match(hostSource, /MENU_SCENE_RECIPE/, "menu host consumes declarative scene data");
assert.match(hostSource, /MENU_DOMAIN_REGISTRY/, "menu exposes tracked menu domains and kits");
assert.match(hostSource, /setPreloading\(false\)/, "game readiness restores normal menu quality");
assert.match(hostSource, /visibilitychange/, "menu pauses presentation when hidden");

assert.match(recipeSource, /my-cozy-island\.menu-scene\.v5/, "menu recipe has stable optimized identity");
assert.equal((recipeSource.match(/path: "n:entry:menu:/g) ?? []).length, 16, "menu registry tracks the particle renderer boundary");
assert.match(recipeSource, /n:entry:menu:particles/, "menu tracks atmospheric particle ownership");
assert.match(recipeSource, /negativeSpace: "right"/, "composition keeps right-side breathing room");
assert.match(recipeSource, /count: 8/, "hero palm keeps eight alpha-card fronds");
assert.match(recipeSource, /frameRate: \{ preload: 24, idle: 30, interactive: 60/, "menu owns explicit web frame budgets");
assert.match(recipeSource, /sparkles:/, "particle recipe includes water sparkles");
assert.match(recipeSource, /petals:/, "particle recipe includes petals");
assert.doesNotMatch(recipeSource, /bloom:/, "recipe removes the bloom pass");
assert.doesNotMatch(recipeSource, /shadowMapSize/, "quality tiers no longer allocate dynamic shadow maps");

assert.match(textureSource, /createPalmFrondAtlas/, "one detailed frond atlas supplies leaf fidelity");
assert.match(textureSource, /createFlowerAtlas/, "background flowers use one atlas");

assert.match(rendererSource, /new THREE\.WebGPURenderer/, "menu owns a WebGPU-first renderer");
assert.doesNotMatch(rendererSource, /RenderPipeline|BloomNode|bloom\(/, "menu renders directly without full-screen bloom");
assert.match(rendererSource, /renderer\.render\(scene, camera\)/, "menu uses one direct scene render");
assert.match(rendererSource, /ACESFilmicToneMapping/, "menu keeps ACES tone mapping");
assert.match(rendererSource, /shadowMap\.enabled = false/, "menu disables dynamic shadow rendering");
assert.doesNotMatch(rendererSource, /outputBufferType/, "menu avoids unnecessary half-float output bandwidth");

assert.match(rendererSource, /function frondGeometry/, "eight frond cards are merged into one geometry");
assert.match(rendererSource, /menu-palm-frond-batch/, "palm uses one frond draw batch");
assert.match(rendererSource, /attribute\("frondAlong"\)/, "batched fronds keep GPU wind weighting");
assert.doesNotMatch(rendererSource, /StorageBufferAttribute|renderer\.compute/, "eight-frond wind avoids compute-dispatch overhead");
assert.equal((rendererSource.match(/new THREE\.TubeGeometry/g) ?? []).length, 1, "palm owns one trunk mesh");
assert.match(rendererSource, /menu-palm-crown-hub/, "palm owns one crown hub");
assert.match(rendererSource, /menu-palm-contact-shadow/, "palm keeps a cheap contact shadow");

assert.match(rendererSource, /menu-flower-batch/, "flower accents share one draw batch");
assert.match(rendererSource, /function particles/, "menu creates one combined atmosphere particle system");
assert.match(rendererSource, /menu-atmosphere-particles/, "particle system has stable identity");
assert.equal((rendererSource.match(/new THREE\.PointsNodeMaterial/g) ?? []).length, 1, "all particle layers share one GPU material");
assert.match(rendererSource, /counts\.wind \+ counts\.sparkles \+ counts\.petals/, "one particle draw contains three visual layers");
assert.match(rendererSource, /transparent: false,\n    depthWrite: true/, "water is opaque and writes depth");
assert.match(rendererSource, /menu-cozy-wave-foam/, "water keeps one lightweight foam edge");

assert.match(rendererSource, /quality\.frameRate\.preload/, "background preload caps the menu frame rate");
assert.match(rendererSource, /quality\.frameRate\.idle/, "idle menu targets thirty frames per second");
assert.match(rendererSource, /quality\.frameRate\.interactive/, "interaction temporarily targets sixty frames per second");
assert.match(rendererSource, /Math\.min\(1, quality\.dprCap\)/, "preloading limits menu DPR to one");
assert.match(rendererSource, /setPreloading/, "menu renderer coordinates with background preload");
assert.match(rendererSource, /setActive/, "menu renderer can suspend and resume");
assert.doesNotMatch(rendererSource, /createIsland|terrain/i, "menu does not add a gameplay world system");

assert.match(hostSource, /game\.html\?preload=1/, "menu starts the game page asynchronously");
assert.match(hostSource, /Math\.min\(99/, "button progress remains capped at 99 percent");
assert.match(hostSource, /cozy-game-ready/, "menu waits for explicit game readiness");
assert.match(hostSource, /cozy-game-enter/, "Play requests entry into the prepared game");
assert.match(files["src/game-preload-bridge.js"], /setAnimationLoop\(null\)/, "hidden game presentation sleeps at 99 percent");
assert.match(files["src/game-preload-bridge.js"], /resumePresentation/, "Play resumes the prepared game presentation");
assert.match(files[".github/workflows/pages.yml"], /cp \.\/\*\.html dist\//, "Pages deploys index, menu, and game pages");

console.log("menu/game shell smoke: direct ACES render, no bloom or dynamic shadows, one frond batch, one three-layer particle batch, preload frame cap, and seamless entry verified");
