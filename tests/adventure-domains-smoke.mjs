import assert from "node:assert/strict";
import { chooseRenderQuality } from "../src/kits/render-descriptors.js";
import { createCozyAdventure } from "../src/adventure/composition-runtime.js";
import { hashText, stableStringify } from "../src/adventure/definitions.js";

const quality = chooseRenderQuality({ backend: "webgl2", viewportWidth: 1024, viewportHeight: 768, devicePixelRatio: 1 });
const adventure = createCozyAdventure({ quality, backend: "webgl2" });
const { engine } = adventure;
const paths = engine.n.paths().map((entry) => entry.path);

assert.equal(paths.includes("n:production:agriculture"), true);
assert.equal(paths.includes("n:cozy-farming"), false);
assert.equal(paths.includes("n:cozy-foraging"), true);
assert.equal(paths.includes("n:cozy-save"), true);
assert.ok(engine.n.coreObject.list().length >= 20);
assert.equal(engine.n.cozyWorld.getPlots().length, 12);
assert.ok(engine.n.cozyWorld.getForageNodes().length > 0);
assert.equal(engine.n.agriculture.perennials.list().some((crop) => crop.id === "coconut"), true);

function tick(count = 1, dt = 0.05) {
  for (let index = 0; index < count; index += 1) adventure.tick(dt);
}

function tap(code) {
  engine.n.cozyInput.enqueueKey(code, true, { repeat: false });
  tick();
  engine.n.cozyInput.enqueueKey(code, false);
  tick();
}

function placeAt(descriptor, offsetZ = 2.1) {
  const player = engine.n.cozyPlayer.getState();
  engine.n.cozyPlayer.loadSnapshot({
    ...player,
    mode: "first-person",
    introProgress: 1,
    position: {
      x: descriptor.position.x,
      y: descriptor.position.y,
      z: descriptor.position.z + offsetZ
    }
  });
  tick(2);
}

tap("Space");
const [firstPlot, secondPlot] = engine.n.cozyWorld.getPlots();
placeAt(firstPlot);
assert.equal(engine.n.cozyInteraction.getState().target?.id, firstPlot.id);

// Agriculture uses one product transaction path: prepare -> plant -> water -> harvest.
tap("KeyE");
assert.equal(engine.n.agriculture.getPlot(firstPlot.id).status, "tilled");
tap("KeyE");
assert.equal(engine.n.agriculture.getPlot(firstPlot.id).cropId, "taro");
assert.equal(engine.n.cozyInventory.amount("taro-seed"), 5);
tap("KeyE");
assert.equal(engine.n.agriculture.getPlot(firstPlot.id).watered, true);
tick(900, 0.05);
assert.equal(engine.n.agriculture.getPlot(firstPlot.id).status, "ready");
tap("KeyE");
assert.equal(engine.n.agriculture.getPlot(firstPlot.id).status, "tilled");
assert.ok(engine.n.cozyInventory.amount("taro-root") >= 2);

// Planted coconut palms belong to Agriculture and regrow after harvest.
engine.n.cozyInventory.setSelectedSeed("coconut-sprout");
placeAt(secondPlot);
tap("KeyE");
tap("KeyE");
assert.equal(engine.n.agriculture.getPlot(secondPlot.id).cropId, "coconut");
tap("KeyE");
tick(2100, 0.05);
assert.equal(engine.n.agriculture.getPlot(secondPlot.id).status, "ready");
tap("KeyE");
assert.equal(engine.n.agriculture.getPlot(secondPlot.id).status, "regrowing");

// Wild coconut palms remain a separate Foraging authority.
const forageDescriptor = engine.n.cozyWorld.getForageNodes()[0];
placeAt(forageDescriptor, 2);
assert.equal(engine.n.cozyInteraction.getState().target?.id, forageDescriptor.id);
tap("KeyE");
assert.ok(engine.n.cozyInventory.amount("coconut") >= 2);
assert.equal(engine.n.cozyForaging.getNode(forageDescriptor.id).available, 0);

// Agriculture v2 save survives reset and restores all authorities.
const beforeSave = engine.n.cozyInventory.getState();
const saveV2 = engine.n.cozySave.capture();
assert.equal(saveV2.schema, "cozy-island-adventure-save/2");
assert.equal(saveV2.agriculture.schema, "nexusengine.agriculture/1");
engine.n.cozySave.resetAll();
assert.equal(engine.n.cozyInventory.amount("taro-root"), 0);
const restoredV2 = engine.n.cozySave.restore(saveV2);
assert.equal(restoredV2.ok, true);
assert.equal(restoredV2.migrated, false);
assert.deepEqual(engine.n.cozyInventory.getState().items, beforeSave.items);
assert.equal(engine.n.agriculture.getPlot(firstPlot.id).status, "tilled");
assert.equal(engine.n.agriculture.getPlot(secondPlot.id).status, "regrowing");
assert.equal(engine.n.cozyForaging.getNode(forageDescriptor.id).available, 0);

// Legacy farming snapshots migrate into Agriculture without reviving a farming DSK.
const legacyPayload = {
  schema: "cozy-island-adventure-save/1",
  version: saveV2.version,
  world: saveV2.world,
  scenario: saveV2.scenario,
  transactionLedger: saveV2.transactionLedger,
  inventory: saveV2.inventory,
  farming: {
    plots: saveV2.agriculture.plots,
    revision: saveV2.agriculture.revision,
    totalHarvests: saveV2.agriculture.totalHarvests,
    lastResult: saveV2.agriculture.lastResult
  },
  foraging: saveV2.foraging,
  player: saveV2.player
};
const legacySave = { ...legacyPayload, checksum: hashText(stableStringify(legacyPayload)) };
const migrated = engine.n.cozySave.restore(legacySave);
assert.equal(migrated.ok, true);
assert.equal(migrated.migrated, true);
assert.equal(engine.n.agriculture.getSnapshot().schema, "nexusengine.agriculture/1");

const staticSnapshot = adventure.getStaticSnapshot();
const frameSnapshot = adventure.getFrameSnapshot();
assert.equal(staticSnapshot.farmLayout.length, 12);
assert.equal(staticSnapshot.agricultureLayout.length, 12);
assert.equal(frameSnapshot.camera.eyeHeight, 2);
assert.ok(frameSnapshot.agriculture);
assert.equal(frameSnapshot.hud.coconutCount, beforeSave.items.coconut);

console.log("cozy agriculture cutover: domain, transaction, perennial, wild-resource, save-v2, and migration smoke passed");
