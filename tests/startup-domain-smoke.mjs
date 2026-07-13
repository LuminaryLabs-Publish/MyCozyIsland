import assert from "node:assert/strict";
import { chooseRenderQuality } from "../src/kits/render-descriptors.js";
import { createCozyAdventure } from "../src/adventure/composition-runtime.js";
import {
  COZY_STARTUP_PREPARATIONS,
  createCozyStartupHost,
  formatCozyStartupDescriptor
} from "../src/adventure/startup-host.js";

function createElements() {
  return {
    loader: {
      hidden: false,
      dataset: {},
      classList: {
        values: new Set(),
        toggle(name, enabled) {
          enabled ? this.values.add(name) : this.values.delete(name);
        }
      }
    },
    fill: { style: {} },
    label: { textContent: "" },
    error: { hidden: true, textContent: "" }
  };
}

const elements = createElements();
const startupHost = createCozyStartupHost({
  loader: elements.loader,
  fill: elements.fill,
  label: elements.label,
  error: elements.error
});

assert.equal(startupHost.getDescriptor().status, "starting");
assert.equal(startupHost.startup.getPreparation("runtime").status, "ready");
assert.deepEqual(
  startupHost.startup.listPreparations().map((entry) => entry.id).sort(),
  COZY_STARTUP_PREPARATIONS.map((entry) => entry.id).sort()
);
assert.equal(elements.label.textContent, "Preparing the golden-hour view");

startupHost.working("renderer", 0.35, "Checking the fallback renderer");
assert.equal(elements.label.textContent, "Checking the fallback renderer");
startupHost.ready("renderer", { backend: "webgl2" }, "WebGL2 presentation ready");

const quality = chooseRenderQuality({
  backend: "webgl2",
  viewportWidth: 1024,
  viewportHeight: 768,
  devicePixelRatio: 1
});
const adventure = createCozyAdventure({
  quality,
  backend: "webgl2",
  engine: startupHost.engine
});

startupHost.ready("composition", {
  kitCount: adventure.engine.kits.length,
  domainPaths: adventure.engine.n.paths().map((entry) => entry.path)
});
startupHost.selectContinuation({ ok: false, reason: "empty" });
startupHost.ready("world", { snapshotId: "cozy-static-world" });
startupHost.ready("input", { adapter: "cozy-browser-input" });

assert.equal(adventure.engine.n.paths().some((entry) => entry.path === "n:core-startup"), true);
assert.throws(
  () => startupHost.enter({ inputReady: true }),
  /first successful frame/,
  "the loader cannot finish before the first rendered frame"
);

startupHost.presentFirstFrame({
  frameId: "frame:1",
  presentationId: "cozy-main",
  backend: "webgl2"
});
const ready = startupHost.enter({ inputReady: true });
assert.equal(ready.playable, true);
assert.equal(ready.progress, 1);
assert.equal(ready.continuation.mode, "new");
assert.equal(elements.fill.style.width, "100%");
assert.equal(elements.label.textContent, "Your island is ready");
assert.equal(elements.loader.classList.values.has("is-complete"), true);
assert.equal(adventure.getState().startup.playable, true);

const snapshot = startupHost.startup.getSnapshot();
startupHost.startup.reset();
assert.equal(startupHost.startup.getDescriptor().status, "idle");
startupHost.startup.loadSnapshot(snapshot);
assert.deepEqual(startupHost.startup.getSnapshot(), snapshot);

const failureElements = createElements();
const failureHost = createCozyStartupHost({
  launchId: "startup:my-cozy-island:failure",
  loader: failureElements.loader,
  fill: failureElements.fill,
  label: failureElements.label,
  error: failureElements.error
});
const failure = failureHost.fail(new Error("Renderer initialization failed"), {
  code: "cozy.renderer.initialization-failed",
  source: "renderer",
  retryable: true
});
assert.equal(failure.code, "cozy.renderer.initialization-failed");
assert.equal(failureHost.getDescriptor().status, "failed");
assert.equal(failureHost.getDescriptor().canRetry, true);
assert.equal(failureElements.label.textContent, "Could not start My Cozy Island");
assert.match(failureElements.error.textContent, /Renderer initialization failed/);
assert.equal(failureElements.error.hidden, false);

assert.equal(
  formatCozyStartupDescriptor({
    failure: null,
    playable: false,
    activePreparation: { id: "world", detail: null },
    continuation: { mode: "new" }
  }).label,
  "Growing your island"
);

console.log("cozy startup: Core Startup composition, product copy, first-frame gate, failure, snapshot, and loader adapter smoke passed");
