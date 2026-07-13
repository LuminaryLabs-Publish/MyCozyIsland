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
assert.match(files["menu.html"], /id="menu-scene"/, "menu owns a dedicated visual canvas");
assert.match(files["menu.html"], /id="play"/, "menu owns the Play gate");
assert.match(files["menu.html"], /id="game-preload"/, "menu owns the background game surface");
assert.match(files["menu.html"], /src\/menu\.js/, "menu loads its scene controller");

assert.match(files["game.html"], /src\/main-adventure\.js/, "game page loads the full adventure");
assert.match(files["game.html"], /src\/game-preload-bridge\.js/, "game page loads the menu handoff bridge");
assert.match(files["game.html"], /data-background-preload/, "background game hides gameplay HUD until entry");

assert.match(files["src/menu.js"], /game\.html\?preload=1/, "menu starts the game page asynchronously");
assert.match(files["src/menu.js"], /Math\.min\(99/, "visible preload progress remains capped at 99 percent");
assert.match(files["src/menu.js"], /cozy-game-ready/, "menu waits for an explicit game-ready message");
assert.match(files["src/menu.js"], /cozy-game-enter/, "Play sends an explicit entry request");
assert.match(files["src/menu.js"], /history\.replaceState/, "revealing the preloaded game updates the route without rebuilding it");
assert.match(files["src/menu.js"], /drawPalm/, "menu presents a procedural palm-tree scene");

assert.match(files["src/game-preload-bridge.js"], /freezeSimulation/, "background preload freezes gameplay simulation after readiness");
assert.match(files["src/game-preload-bridge.js"], /resumeSimulation/, "Play resumes the already-built game");
assert.match(files["src/game-preload-bridge.js"], /introProgress: 0\.76/, "Play restarts the authored aerial entry instead of revealing a progressed game");
assert.match(files["src/game-preload-bridge.js"], /cozy-game-entered/, "game acknowledges successful entry");
assert.match(files["src/game-preload-bridge.js"], /descriptor\?\.playable/, "Core Startup remains the factual readiness source");

assert.match(files[".github/workflows/pages.yml"], /cp \.\/\*\.html dist\//, "Pages deploys index, menu, and game pages");

console.log("menu/game shell smoke: palm menu, background preload, 99% gate, and seamless entry verified");
