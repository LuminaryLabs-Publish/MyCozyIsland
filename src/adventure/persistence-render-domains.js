import { defineResource } from "nexusengine/ecs";
import { defineDomainServiceKit } from "nexusengine/domain-service-kit";
import {
  COZY_ADVENTURE_VERSION,
  CROP_DEFINITIONS,
  ITEM_DEFINITIONS,
  SEED_CYCLE,
  clone,
  hashText,
  stableStringify
} from "./definitions.js";
import { migrateLegacyFarmingSnapshot } from "./agriculture-config.js";

const SaveState = defineResource("cozy.adventure.save.state");
const SAVE_SCHEMA_V1 = "cozy-island-adventure-save/1";
const SAVE_SCHEMA_V2 = "cozy-island-adventure-save/2";

function saveInitialState() {
  return {
    schema: SAVE_SCHEMA_V2,
    status: "ready",
    saveCount: 0,
    loadCount: 0,
    migrationCount: 0,
    lastHash: null,
    lastError: null,
    revision: 1
  };
}

function checksumPayload(payload) {
  return hashText(stableStringify(payload));
}

function validateEnvelope(snapshot = {}) {
  const { checksum, ...payload } = clone(snapshot);
  const expected = checksumPayload(payload);
  if (!checksum || checksum !== expected) throw new Error("Save checksum does not match its payload.");
  return { payload, checksum };
}

function migrateSavePayload(payload, engine) {
  if (payload.schema === SAVE_SCHEMA_V2) return { payload, migrated: false };
  if (payload.schema !== SAVE_SCHEMA_V1) throw new TypeError(`Unsupported cozy island save schema: ${payload.schema}`);
  const agriculture = migrateLegacyFarmingSnapshot(
    payload.farming ?? {},
    engine.n.agriculture.getSnapshot()
  );
  return {
    migrated: true,
    payload: {
      schema: SAVE_SCHEMA_V2,
      version: COZY_ADVENTURE_VERSION,
      world: payload.world,
      scenario: payload.scenario,
      transactionLedger: payload.transactionLedger,
      inventory: payload.inventory,
      agriculture,
      foraging: payload.foraging,
      player: payload.player
    }
  };
}

function durableFingerprint(engine) {
  const inventory = engine.n.cozyInventory.getState();
  const agriculture = engine.n.agriculture.getState();
  const foraging = engine.n.cozyForaging.getState();
  const player = engine.n.cozyPlayer.getState();
  const scenario = engine.n.cozyScenario.getState();
  return hashText(stableStringify({
    inventory: {
      items: inventory.items,
      selectedSeedItemId: inventory.selectedSeedItemId
    },
    agriculture: {
      currentDay: agriculture.currentDay,
      plots: agriculture.plots,
      totalHarvests: agriculture.totalHarvests
    },
    foraging: {
      nodes: foraging.nodes,
      totalGathered: foraging.totalGathered
    },
    player: {
      position: player.position,
      yaw: player.yaw,
      pitch: player.pitch,
      mode: player.mode,
      stamina: player.stamina,
      distanceWalked: player.distanceWalked
    },
    scenario: {
      elapsedSeconds: scenario.elapsedSeconds,
      day: scenario.day,
      phase: scenario.phase
    }
  }));
}

export function createCozySaveDomain() {
  return defineDomainServiceKit({
    id: "cozy-save-domain-kit",
    domain: "cozy-save",
    domainPath: "n:cozy-save",
    apiName: "cozySave",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["capture", "validation", "migration", "restore", "rollback", "reset", "diagnostics"],
    requires: [
      "n:core-transaction-ledger",
      "n:cozy-world",
      "n:cozy-scenario",
      "n:cozy-inventory",
      "n:production:agriculture",
      "n:cozy-foraging",
      "n:cozy-player",
      "n:cozy-interaction"
    ],
    provides: ["save:cozy-adventure"],
    resources: { SaveState },
    metadata: {
      purpose: "Portable v2 save capture, v1 agriculture migration, checksum validation, rollback-safe restore, and reset across durable cozy-adventure domains.",
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
          schema: SAVE_SCHEMA_V2,
          version: COZY_ADVENTURE_VERSION,
          world: engine.n.cozyWorld.getSnapshot(),
          scenario: engine.n.cozyScenario.getSnapshot(),
          transactionLedger: engine.n.coreTransactionLedger.getSnapshot(),
          inventory: engine.n.cozyInventory.getSnapshot(),
          agriculture: engine.n.agriculture.getSnapshot(),
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
        const before = {
          world: engine.n.cozyWorld.getSnapshot(),
          transactionLedger: engine.n.coreTransactionLedger.getSnapshot(),
          scenario: engine.n.cozyScenario.getSnapshot(),
          inventory: engine.n.cozyInventory.getSnapshot(),
          agriculture: engine.n.agriculture.getSnapshot(),
          foraging: engine.n.cozyForaging.getSnapshot(),
          player: engine.n.cozyPlayer.getSnapshot()
        };
        try {
          const envelope = validateEnvelope(snapshot);
          const migration = migrateSavePayload(envelope.payload, engine);
          const payload = migration.payload;
          engine.n.cozyWorld.loadSnapshot(payload.world);
          engine.n.coreTransactionLedger.loadSnapshot(payload.transactionLedger);
          engine.n.cozyScenario.loadSnapshot(payload.scenario);
          engine.n.cozyInventory.loadSnapshot(payload.inventory);
          engine.n.agriculture.loadSnapshot(payload.agriculture);
          engine.n.cozyForaging.loadSnapshot(payload.foraging);
          engine.n.cozyPlayer.loadSnapshot(payload.player);
          engine.n.cozyInteraction.reset();
          const state = read();
          write({
            ...state,
            status: migration.migrated ? "migrated-and-restored" : "restored",
            loadCount: state.loadCount + 1,
            migrationCount: state.migrationCount + (migration.migrated ? 1 : 0),
            lastHash: envelope.checksum,
            lastError: null,
            revision: state.revision + 1
          });
          return { ok: true, checksum: envelope.checksum, schema: payload.schema, migrated: migration.migrated };
        } catch (error) {
          try {
            engine.n.cozyWorld.loadSnapshot(before.world);
            engine.n.coreTransactionLedger.loadSnapshot(before.transactionLedger);
            engine.n.cozyScenario.loadSnapshot(before.scenario);
            engine.n.cozyInventory.loadSnapshot(before.inventory);
            engine.n.agriculture.loadSnapshot(before.agriculture);
            engine.n.cozyForaging.loadSnapshot(before.foraging);
            engine.n.cozyPlayer.loadSnapshot(before.player);
            engine.n.cozyInteraction.reset();
          } catch (rollbackError) {
            console.error("Cozy save rollback failed", rollbackError);
          }
          const state = read();
          write({
            ...state,
            status: "error",
            lastError: String(error?.message ?? error),
            revision: state.revision + 1
          });
          return { ok: false, rolledBack: true, error: String(error?.message ?? error) };
        }
      }

      function resetAll() {
        engine.n.coreTransactionLedger.reset();
        engine.n.cozyWorld.reset();
        engine.n.cozyScenario.reset();
        engine.n.cozyInventory.reset();
        engine.n.agriculture.reset();
        engine.n.cozyForaging.reset();
        engine.n.cozyPlayer.reset();
        engine.n.cozyInteraction.reset();
        const next = saveInitialState();
        next.status = "reset";
        write(next);
        return { ok: true };
      }

      return {
        capture,
        restore,
        resetAll,
        fingerprint: () => durableFingerprint(engine),
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
    services: ["static-world", "agriculture-descriptors", "frame-snapshot", "hud-descriptor", "debug-descriptor"],
    requires: [
      "n:cozy-world",
      "n:cozy-scenario",
      "n:cozy-player",
      "n:cozy-camera",
      "n:cozy-inventory",
      "n:production:agriculture",
      "n:cozy-foraging",
      "n:cozy-interaction",
      "n:cozy-save"
    ],
    provides: ["render:cozy-static", "render:cozy-frame"],
    metadata: {
      purpose: "Read-only world, Agriculture, Wild Resources, HUD, lighting, and camera descriptors assembled from authoritative NexusEngine state.",
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
          agricultureLayout: engine.n.agriculture.getDescriptors(),
          forageLayout: engine.n.cozyWorld.getForageNodes(),
          landmarks: engine.n.cozyWorld.getLandmarks()
        });
      }

      function frameSnapshot() {
        const model = engine.n.cozyWorld.getModel();
        const scenario = engine.n.cozyScenario.getState();
        const player = engine.n.cozyPlayer.getState();
        const inventory = engine.n.cozyInventory.getState();
        const agriculture = engine.n.agriculture.getState();
        const foraging = engine.n.cozyForaging.getState();
        const interaction = engine.n.cozyInteraction.getState();
        const save = engine.n.cozySave.getState();
        const selected = engine.n.cozyInventory.getSelectedSeed();
        const harvestedFood = Object.entries(inventory.items)
          .filter(([id]) => ITEM_DEFINITIONS[id]?.category === "food")
          .reduce((total, [, amount]) => total + Number(amount || 0), 0);
        return Object.freeze({
          revision: `${scenario.revision}:${player.revision}:${inventory.revision}:${agriculture.revision}:${foraging.revision}:${interaction.revision}`,
          clock: model.clock.getState(),
          illumination: model.illuminationService.getState(),
          camera: engine.n.cozyCamera.getDescriptor(),
          player,
          inventory,
          agriculture,
          farming: agriculture,
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
              label: Object.values(CROP_DEFINITIONS).find((crop) => crop.seedItemId === itemId)?.label ?? ITEM_DEFINITIONS[itemId].label,
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
            agriculture: frame.agriculture,
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
