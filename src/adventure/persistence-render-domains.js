import { defineResource } from "nexusengine/ecs";
import { defineDomainServiceKit } from "nexusengine/domain-service-kit";
import {
  COZY_ADVENTURE_VERSION,
  CROP_DEFINITIONS,
  ITEM_DEFINITIONS,
  clone,
  hashText,
  stableStringify
} from "./definitions.js";

const SaveState = defineResource("cozy.adventure.save.state");

function saveInitialState() {
  return {
    schema: "cozy-island-adventure-save/1",
    status: "ready",
    saveCount: 0,
    loadCount: 0,
    lastHash: null,
    lastError: null,
    revision: 1
  };
}

function checksumPayload(payload) {
  return hashText(stableStringify(payload));
}

export function createCozySaveDomain() {
  return defineDomainServiceKit({
    id: "cozy-save-domain-kit",
    domain: "cozy-save",
    domainPath: "n:cozy-save",
    apiName: "cozySave",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["capture", "validation", "restore", "reset", "diagnostics"],
    requires: [
      "n:core-transaction-ledger",
      "n:cozy-world",
      "n:cozy-scenario",
      "n:cozy-inventory",
      "n:cozy-farming",
      "n:cozy-foraging",
      "n:cozy-player",
      "n:cozy-interaction"
    ],
    provides: ["save:cozy-adventure"],
    resources: { SaveState },
    metadata: {
      purpose: "Portable save capture, checksum validation, restore, and reset across all durable cozy-adventure domains.",
      rendererAgnostic: true,
      deterministic: true,
      hostPersistence: "adapter-owned"
    },
    initWorld({ world }) {
      world.setResource(SaveState, saveInitialState());
    },
    createApi({ engine, world }) {
      const read = () => world.getResource(SaveState);
      const write = (next) => {
        world.setResource(SaveState, next);
        return clone(next);
      };

      function capture() {
        const payload = {
          schema: "cozy-island-adventure-save/1",
          version: COZY_ADVENTURE_VERSION,
          world: engine.n.cozyWorld.getSnapshot(),
          scenario: engine.n.cozyScenario.getSnapshot(),
          transactionLedger: engine.n.coreTransactionLedger.getSnapshot(),
          inventory: engine.n.cozyInventory.getSnapshot(),
          farming: engine.n.cozyFarming.getSnapshot(),
          foraging: engine.n.cozyForaging.getSnapshot(),
          player: engine.n.cozyPlayer.getSnapshot()
        };
        const checksum = checksumPayload(payload);
        const snapshot = Object.freeze({ ...payload, checksum });
        const state = read();
        write({
          ...state,
          status: "captured",
          saveCount: state.saveCount + 1,
          lastHash: checksum,
          lastError: null,
          revision: state.revision + 1
        });
        return clone(snapshot);
      }

      function restore(snapshot = {}) {
        try {
          if (snapshot.schema !== "cozy-island-adventure-save/1") throw new TypeError("Unsupported cozy island save schema.");
          const { checksum, ...payload } = clone(snapshot);
          const expected = checksumPayload(payload);
          if (checksum !== expected) throw new Error("Save checksum does not match its payload.");
          engine.n.cozyWorld.loadSnapshot(payload.world);
          engine.n.coreTransactionLedger.loadSnapshot(payload.transactionLedger);
          engine.n.cozyScenario.loadSnapshot(payload.scenario);
          engine.n.cozyInventory.loadSnapshot(payload.inventory);
          engine.n.cozyFarming.loadSnapshot(payload.farming);
          engine.n.cozyForaging.loadSnapshot(payload.foraging);
          engine.n.cozyPlayer.loadSnapshot(payload.player);
          engine.n.cozyInteraction.reset();
          const state = read();
          write({
            ...state,
            status: "restored",
            loadCount: state.loadCount + 1,
            lastHash: checksum,
            lastError: null,
            revision: state.revision + 1
          });
          return { ok: true, checksum };
        } catch (error) {
          const state = read();
          write({
            ...state,
            status: "error",
            lastError: String(error?.message ?? error),
            revision: state.revision + 1
          });
          return { ok: false, error: String(error?.message ?? error) };
        }
      }

      function resetAll() {
        engine.n.coreTransactionLedger.reset();
        engine.n.cozyWorld.reset();
        engine.n.cozyScenario.reset();
        engine.n.cozyInventory.reset();
        engine.n.cozyFarming.reset();
        engine.n.cozyForaging.reset();
        engine.n.cozyPlayer.reset();
        engine.n.cozyInteraction.reset();
        const next = saveInitialState();
        next.status = "reset";
        write(next);
        return { ok: true };
      }

      function fingerprint() {
        const inventory = engine.n.cozyInventory.getState();
        const farming = engine.n.cozyFarming.getState();
        const foraging = engine.n.cozyForaging.getState();
        const player = engine.n.cozyPlayer.getState();
        return hashText(`${inventory.revision}:${farming.revision}:${foraging.revision}:${player.revision}`);
      }

      return {
        capture,
        restore,
        resetAll,
        fingerprint,
        getState: () => clone(read()),
        getSnapshot: () => clone(read()),
        reset() {
          const next = saveInitialState();
          write(next);
          return clone(next);
        }
      };
    }
  });
}

export function createCozyRenderSnapshotDomain() {
  return defineDomainServiceKit({
    id: "cozy-render-snapshot-domain-kit",
    domain: "cozy-render-snapshot",
    domainPath: "n:cozy-render-snapshot",
    apiName: "cozyRenderSnapshot",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["static-world", "frame-snapshot", "hud-descriptor", "debug-descriptor"],
    requires: [
      "n:cozy-world",
      "n:cozy-scenario",
      "n:cozy-player",
      "n:cozy-camera",
      "n:cozy-inventory",
      "n:cozy-farming",
      "n:cozy-foraging",
      "n:cozy-interaction",
      "n:cozy-save"
    ],
    provides: ["render:cozy-static", "render:cozy-frame"],
    metadata: {
      purpose: "Read-only renderer and HUD descriptors assembled from authoritative NexusEngine domain state.",
      rendererAgnostic: true,
      deterministic: true
    },
    createApi({ engine }) {
      function staticSnapshot() {
        const base = engine.n.cozyWorld.getRenderBase();
        return Object.freeze({
          ...base,
          adventureVersion: COZY_ADVENTURE_VERSION,
          farmLayout: engine.n.cozyWorld.getPlots(),
          forageLayout: engine.n.cozyWorld.getForageNodes(),
          landmarks: engine.n.cozyWorld.getLandmarks()
        });
      }

      function frameSnapshot() {
        const model = engine.n.cozyWorld.getModel();
        const scenario = engine.n.cozyScenario.getState();
        const player = engine.n.cozyPlayer.getState();
        const inventory = engine.n.cozyInventory.getState();
        const farming = engine.n.cozyFarming.getState();
        const foraging = engine.n.cozyForaging.getState();
        const interaction = engine.n.cozyInteraction.getState();
        const save = engine.n.cozySave.getState();
        const selected = engine.n.cozyInventory.getSelectedSeed();
        const harvestedFood = Object.entries(inventory.items)
          .filter(([id]) => ITEM_DEFINITIONS[id]?.category === "food")
          .reduce((total, [, amount]) => total + Number(amount || 0), 0);
        return Object.freeze({
          revision: `${scenario.revision}:${player.revision}:${inventory.revision}:${farming.revision}:${foraging.revision}:${interaction.revision}`,
          clock: model.clock.getState(),
          illumination: model.illuminationService.getState(),
          camera: engine.n.cozyCamera.getDescriptor(),
          player,
          inventory,
          farming,
          foraging,
          interaction,
          scenario,
          save,
          hud: Object.freeze({
            title: "My Cozy Island",
            objective: scenario.objective,
            prompt: interaction.prompt,
            selectedSeedItemId: selected.itemId,
            selectedSeedLabel: selected.crop?.label ?? selected.item?.label ?? "Seed",
            selectedSeedCount: Number(inventory.items[selected.itemId] ?? 0),
            seedOptions: SEED_CYCLE.map((itemId, index) => Object.freeze({
              index: index + 1,
              itemId,
              label: CROP_DEFINITIONS[Object.values(CROP_DEFINITIONS).find((crop) => crop.seedItemId === itemId)?.id]?.label ?? ITEM_DEFINITIONS[itemId].label,
              amount: Number(inventory.items[itemId] ?? 0),
              selected: itemId === selected.itemId
            })),
            foodCount: harvestedFood,
            coconutCount: Number(inventory.items.coconut ?? 0),
            stamina: player.stamina,
            day: scenario.day,
            phase: scenario.phase,
            lastAction: interaction.lastAction
          })
        });
      }

      return {
        getStaticSnapshot: staticSnapshot,
        getFrameSnapshot: frameSnapshot,
        getState: frameSnapshot,
        getSnapshot() {
          const frame = frameSnapshot();
          return clone({
            revision: frame.revision,
            camera: frame.camera,
            player: frame.player,
            inventory: frame.inventory,
            farming: frame.farming,
            foraging: frame.foraging,
            interaction: frame.interaction,
            scenario: frame.scenario,
            hud: frame.hud
          });
        }
      };
    }
  });
}
