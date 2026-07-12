import assert from "node:assert/strict";
import { chooseRenderQuality } from "../src/kits/render-descriptors.js";
import { createCozyAdventure } from "../src/adventure/composition-runtime.js";

const quality = chooseRenderQuality({ backend: "webgl2", viewportWidth: 1024, viewportHeight: 768, devicePixelRatio: 1 });
const adventure = createCozyAdventure({ quality, backend: "webgl2" });
const { engine } = adventure;

assert.equal(engine.getDomainPaths().includes("n:cozy-world"), true);
assert.equal(engine.getDomainPaths().includes("n:cozy-farming"), true);
assert.equal(engine.getDomainPaths().includes("n:cozy-foraging"), true);
assert.equal(engine.getDomainPaths().includes("n:cozy-save"), true);
assert.ok(engine.n.coreObject.list().length >= 20);
assert.equal(engine.n.cozyWorld.getPlots().length, 12);
assert.ok(engine.n.cozyWorld.getForageNodes().length > 0);

function tick(count = 1, dt = 0.05) {
  for (let index = 0; index < count; index += 1) adventure.tick(dt);
}

function tap(code) {
  engine.n.cozyInput.enqueueKey(code, true, { repeat: false });
  tick();
  engine.n.cozyInput.enqueueKey(code, false);
  tick();
}

// Skip the intro and place the player beside the first deterministic farm plot.
tap("Space");
const plotDescriptor = engine.n.cozyWorld.getPlots()[0];
const player = engine.n.cozyPlayer.getState();
engine.n.cozyPlayer.loadSnapshot({
  ...player,
  mode: "first-person",
  introProgress: 1,
  position: {
    x: plotDescriptor.position.x,
    y: plotDescriptor.position.y,
    z: plotDescriptor.position.z + 2.1
  }
});
tick(2);
assert.equal(engine.n.cozyInteraction.getState().target?.id, plotDescriptor.id);

// Context action progression: till -> plant selected taro -> water.
tap("KeyE");
assert.equal(engine.n.cozyFarming.getPlot(plotDescriptor.id).status, "tilled");
tap("KeyE");
assert.equal(engine.n.cozyFarming.getPlot(plotDescriptor.id).cropId, "taro");
assert.equal(engine.n.cozyInventory.amount("taro-seed"), 5);
tap("KeyE");
assert.equal(engine.n.cozyFarming.getPlot(plotDescriptor.id).watered, true);

// Deterministic growth reaches ready state through Realtime Core ticks.
tick(900, 0.05);
assert.equal(engine.n.cozyFarming.getPlot(plotDescriptor.id).status, "ready");
tap("KeyE");
assert.equal(engine.n.cozyFarming.getPlot(plotDescriptor.id).status, "tilled");
assert.ok(engine.n.cozyInventory.amount("taro-root") >= 2);

// A coconut node is a stable Core Object and repeat-safe forage transaction.
const forageDescriptor = engine.n.cozyWorld.getForageNodes()[0];
engine.n.cozyPlayer.loadSnapshot({
  ...engine.n.cozyPlayer.getState(),
  position: {
    x: forageDescriptor.position.x,
    y: forageDescriptor.position.y,
    z: forageDescriptor.position.z + 2
  }
});
tick(2);
assert.equal(engine.n.cozyInteraction.getState().target?.id, forageDescriptor.id);
tap("KeyE");
assert.ok(engine.n.cozyInventory.amount("coconut") >= 2);
assert.equal(engine.n.cozyForaging.getNode(forageDescriptor.id).available, 0);

// Portable save survives reset and restores ledger-backed durable state.
const beforeSave = engine.n.cozyInventory.getState();
const save = engine.n.cozySave.capture();
assert.equal(save.schema, "cozy-island-adventure-save/1");
assert.ok(save.checksum);
engine.n.cozySave.resetAll();
assert.equal(engine.n.cozyInventory.amount("taro-root"), 0);
const restored = engine.n.cozySave.restore(save);
assert.equal(restored.ok, true);
assert.deepEqual(engine.n.cozyInventory.getState().items, beforeSave.items);
assert.equal(engine.n.cozyFarming.getPlot(plotDescriptor.id).status, "tilled");
assert.equal(engine.n.cozyForaging.getNode(forageDescriptor.id).available, 0);

const staticSnapshot = adventure.getStaticSnapshot();
const frameSnapshot = adventure.getFrameSnapshot();
assert.equal(staticSnapshot.farmLayout.length, 12);
assert.equal(frameSnapshot.camera.eyeHeight, 2);
assert.equal(frameSnapshot.hud.coconutCount, beforeSave.items.coconut);

console.log("cozy adventure domain smoke: ok");
