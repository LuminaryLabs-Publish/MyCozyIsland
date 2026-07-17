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
  "src/menu/menu-three-renderer.js",
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
  "src/menu/menu-three-renderer.js",
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
assert.match(files["menu.html"], /three\.tsl\.js/, "menu imports TSL for GPU presentation");
assert.match(files["menu.html"], /cozy-aaa-sunset-menu-1/, "menu refreshes the high-fidelity scene cache key");
assert.doesNotMatch(files["menu.html"], /<h1|menu-card|preload-track|preload-label|preload-percent|subtitle/, "menu remains visually minimal");

assert.match(files["game.html"], /src\/main-adventure\.js/, "game page loads the full adventure");
assert.match(files["game.html"], /src\/game-preload-bridge\.js/, "game page loads the menu handoff bridge");
assert.match(files["game.html"], /data-background-preload/, "background game hides gameplay HUD until entry");

const hostSource = files["src/menu.js"];
const recipeSource = files["src/menu/menu-scene-recipe.js"];
const textureSource = files["src/menu/menu-textures.js"];
const rendererSource = files["src/menu/menu-three-renderer.js"];

assert.doesNotMatch(hostSource, /three\/webgpu|new THREE\./, "menu host stays free of renderer construction");
assert.match(hostSource, /createMenuThreeRenderer/, "menu host composes the renderer adapter");
assert.match(hostSource, /MENU_SCENE_RECIPE/, "menu host consumes declarative scene data");
assert.match(hostSource, /MENU_DOMAIN_REGISTRY/, "menu exposes tracked menu domains and kits");
assert.match(hostSource, /pointermove/, "menu accepts pointer parallax interaction");
assert.match(hostSource, /visibilitychange/, "menu pauses presentation when hidden");

assert.match(recipeSource, /my-cozy-island\.menu-scene\.v4/, "menu recipe has stable versioned identity");
assert.equal((recipeSource.match(/path: "n:entry:menu:/g) ?? []).length, 15, "menu registry tracks fifteen domain and kit boundaries");
assert.match(recipeSource, /negativeSpace: "right"/, "composition keeps right-side breathing room");
assert.match(recipeSource, /count: 8/, "hero palm uses eight frond cards");
assert.match(recipeSource, /particleCount/, "quality tiers define wind particle budgets");
assert.match(recipeSource, /sunsetBand/, "recipe owns sunset art direction");
assert.match(recipeSource, /horizonSegments/, "deep horizon quality is data driven");
assert.match(recipeSource, /waterSegments/, "cozy wave quality is data driven");
assert.match(recipeSource, /portrait:/, "camera framing has a portrait profile");
assert.match(recipeSource, /shortLandscape:/, "camera framing has a short-landscape profile");

assert.match(textureSource, /createPalmFrondAtlas/, "one detailed frond atlas supplies leaf fidelity");
assert.match(textureSource, /menu-palm-frond-atlas/, "frond atlas has stable identity");
assert.match(textureSource, /createFlowerAtlas/, "background flower cards use one atlas");

assert.match(rendererSource, /new THREE\.WebGPURenderer/, "menu owns a WebGPU-first renderer");
assert.match(rendererSource, /new THREE\.RenderPipeline/, "menu owns a WebGPU post pipeline");
assert.match(rendererSource, /bloom\(/, "menu applies restrained GPU bloom");
assert.match(rendererSource, /ACESFilmicToneMapping/, "menu uses ACES tone mapping");
assert.match(rendererSource, /createDeepHorizon/, "menu renders layered deep horizons");
assert.match(rendererSource, /menu-sunset-sun/, "menu renders a sunset sun and glow");
assert.match(rendererSource, /menu-water-strip/, "menu renders one cozy water band");
assert.match(rendererSource, /menu-cozy-wave-foam/, "menu renders a subtle animated foam edge");
assert.match(rendererSource, /menu-wind-particles/, "menu renders GPU wind motes");
assert.match(rendererSource, /new THREE\.PointsNodeMaterial/, "wind motes use GPU point sprites");
assert.match(rendererSource, /instancedBufferAttribute/, "wind motes use instanced GPU attributes");
assert.match(rendererSource, /renderer\.compute\(windCompute\)/, "WebGPU path dispatches the palm wind field");
assert.match(rendererSource, /material\.positionNode/, "wind and waves deform in GPU vertex stages");

assert.match(rendererSource, /alphaTest/, "frond cards use alpha clipping");
assert.match(rendererSource, /transparent: false/, "frond cards avoid transparent sorting");
assert.match(rendererSource, /menu-palm-frond-card-/, "frond cards have stable identities");
assert.doesNotMatch(rendererSource, /createFrondLeafletsGeometry|menu-palm-leaflets|menu-palm-rib-/, "modeled leaflet and rib meshes stay removed");
assert.equal((rendererSource.match(/new THREE\.TubeGeometry/g) ?? []).length, 1, "palm owns one trunk mesh");
assert.match(rendererSource, /menu-palm-crown-hub/, "palm owns one crown hub");
assert.match(rendererSource, /menu-palm-contact-shadow/, "palm receives a soft contact shadow");

assert.match(rendererSource, /applyResponsiveComposition/, "camera and palm framing adapt to viewport shape");
assert.match(rendererSource, /pointerCurrent\.lerp/, "pointer parallax is smoothly damped");
assert.match(rendererSource, /setFocus/, "Play hover can wake the menu wind");
assert.match(rendererSource, /setActive/, "menu renderer can suspend and resume");
assert.doesNotMatch(rendererSource, /createIsland|terrain/i, "menu does not add a terrain or gameplay world system");

assert.match(hostSource, /game\.html\?preload=1/, "menu starts the game page asynchronously");
assert.match(hostSource, /Math\.min\(99/, "button progress remains capped at 99 percent");
assert.match(hostSource, /cozy-game-ready/, "menu waits for explicit game readiness");
assert.match(hostSource, /cozy-game-enter/, "Play requests entry into the prepared game");
assert.match(hostSource, /history\.replaceState/, "revealing the prepared game does not rebuild it");

assert.match(files["src/game-preload-bridge.js"], /freezeSimulation/, "background preload freezes gameplay simulation after readiness");
assert.match(files["src/game-preload-bridge.js"], /freezePresentation/, "background preload suppresses hidden rendering");
assert.match(files["src/game-preload-bridge.js"], /setAnimationLoop\(null\)/, "hidden game presentation is idled at 99 percent");
assert.match(files["src/game-preload-bridge.js"], /resumePresentation/, "Play resumes the prepared game presentation");
assert.match(files["src/game-preload-bridge.js"], /cozy-game-entered/, "game acknowledges successful entry");
assert.match(files["src/game-preload-bridge.js"], /descriptor\?\.playable/, "Core Startup remains the factual readiness source");
assert.match(files[".github/workflows/pages.yml"], /cp \.\/\*\.html dist\//, "Pages deploys index, menu, and game pages");

console.log("menu/game shell smoke: data-driven sunset horizon, alpha-card palm, GPU wind motes, cozy waves, responsive framing, and seamless preload verified");
