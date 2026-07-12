import { defineResource } from "nexusengine/ecs";
import { defineDomainServiceKit } from "nexusengine/domain-service-kit";
import {
  COZY_ADVENTURE_VERSION,
  INITIAL_INVENTORY,
  ITEM_DEFINITIONS,
  SEED_CYCLE,
  clone,
  cropFromSeedItem
} from "./definitions.js";

const InventoryState = defineResource("cozy.adventure.inventory.state");
const ForagingState = defineResource("cozy.adventure.foraging.state");

function requireId(value, label) {
  const id = String(value ?? "").trim();
  if (!id) throw new TypeError(`${label} requires a stable id.`);
  return id;
}

function inventoryInitialState() {
  return {
    items: clone(INITIAL_INVENTORY),
    selectedSeedItemId: SEED_CYCLE[0],
    revision: 1,
    lastResult: null
  };
}

export function createCozyInventoryDomain() {
  return defineDomainServiceKit({
    id: "cozy-inventory-domain-kit",
    domain: "cozy-inventory",
    domainPath: "n:cozy-inventory",
    apiName: "cozyInventory",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["items", "seed-selection", "transactions", "batch-settlement", "snapshot", "reset"],
    requires: ["n:core-transaction-ledger"],
    provides: ["inventory:cozy-items", "inventory:cozy-seeds"],
    resources: { InventoryState },
    metadata: {
      purpose: "Repeat-safe island inventory for seeds, harvested food, coconuts, and tools.",
      rendererAgnostic: true,
      deterministic: true
    },
    initWorld({ world }) {
      world.setResource(InventoryState, inventoryInitialState());
    },
    createApi({ engine, world }) {
      const read = () => world.getResource(InventoryState);
      const write = (next) => {
        world.setResource(InventoryState, next);
        return clone(next);
      };
      const setResult = (state, result) => ({
        ...state,
        revision: Number(state.revision ?? 0) + 1,
        lastResult: clone(result)
      });
      const transact = (operationId, action, metadata = {}) => engine.n.coreTransactionLedger.applyOnce(
        "cozy-inventory",
        requireId(operationId, "inventory operation"),
        action,
        metadata
      );

      function adjust(itemId, amount, operationId, metadata = {}) {
        const id = requireId(itemId, "item");
        if (!ITEM_DEFINITIONS[id]) throw new RangeError(`Unknown inventory item: ${id}`);
        const delta = Math.trunc(Number(amount) || 0);
        return transact(operationId, () => {
          const state = read();
          const current = Number(state.items[id] ?? 0);
          const nextAmount = current + delta;
          if (nextAmount < 0) {
            const result = { ok: false, reason: "insufficient-items", itemId: id, requested: -delta, available: current };
            write(setResult(state, result));
            return result;
          }
          const result = { ok: true, itemId: id, delta, amount: nextAmount };
          write(setResult({ ...state, items: { ...state.items, [id]: nextAmount } }, result));
          return result;
        }, { itemId: id, amount: delta, ...metadata });
      }

      function applyChanges(changes = [], operationId, metadata = {}) {
        const normalized = changes.map((change, index) => ({
          itemId: requireId(change.itemId, `inventory change ${index}`),
          amount: Math.trunc(Number(change.amount) || 0),
          reason: String(change.reason ?? "adjust")
        }));
        return transact(operationId, () => {
          const state = read();
          const items = { ...state.items };
          for (const change of normalized) {
            if (!ITEM_DEFINITIONS[change.itemId]) {
              return { ok: false, reason: "unknown-item", itemId: change.itemId };
            }
            const next = Number(items[change.itemId] ?? 0) + change.amount;
            if (next < 0) {
              return {
                ok: false,
                reason: "insufficient-items",
                itemId: change.itemId,
                requested: -change.amount,
                available: Number(items[change.itemId] ?? 0)
              };
            }
            items[change.itemId] = next;
          }
          const result = { ok: true, action: "batch-adjust", changes: clone(normalized), items: clone(items) };
          write(setResult({ ...state, items }, result));
          return result;
        }, { changes: normalized, ...metadata });
      }

      function setSelectedSeed(itemId) {
        const id = requireId(itemId, "seed item");
        if (!SEED_CYCLE.includes(id)) throw new RangeError(`Unsupported seed item: ${id}`);
        const state = read();
        return write({
          ...state,
          selectedSeedItemId: id,
          revision: state.revision + 1,
          lastResult: { ok: true, action: "seed-selected", itemId: id }
        });
      }

      return {
        definitions: ITEM_DEFINITIONS,
        getState: () => clone(read()),
        getSnapshot: () => clone(read()),
        loadSnapshot(snapshot = {}) {
          const next = {
            ...inventoryInitialState(),
            ...clone(snapshot),
            items: { ...clone(INITIAL_INVENTORY), ...clone(snapshot.items ?? {}) },
            revision: Number(snapshot.revision ?? 0) + 1
          };
          return write(next);
        },
        reset: () => write(inventoryInitialState()),
        amount: (itemId) => Number(read().items[String(itemId)] ?? 0),
        has: (itemId, amount = 1) => Number(read().items[String(itemId)] ?? 0) >= Number(amount),
        add: (itemId, amount, operationId, metadata) => adjust(itemId, Math.abs(Number(amount) || 0), operationId, metadata),
        remove: (itemId, amount, operationId, metadata) => adjust(itemId, -Math.abs(Number(amount) || 0), operationId, metadata),
        applyChanges,
        setSelectedSeed,
        cycleSeed(direction = 1) {
          const current = read().selectedSeedItemId;
          const index = Math.max(0, SEED_CYCLE.indexOf(current));
          return setSelectedSeed(SEED_CYCLE[(index + Math.sign(Number(direction) || 1) + SEED_CYCLE.length) % SEED_CYCLE.length]);
        },
        getSelectedSeed() {
          const itemId = read().selectedSeedItemId;
          return Object.freeze({ itemId, item: ITEM_DEFINITIONS[itemId], crop: cropFromSeedItem(itemId) });
        }
      };
    }
  });
}

function foragingInitialState(nodes) {
  return {
    nodes: Object.fromEntries(nodes.map((node) => [node.id, {
      id: node.id,
      available: node.capacity,
      capacity: node.capacity,
      respawnSeconds: node.respawnSeconds,
      respawnRemaining: 0,
      harvestCount: 0,
      revision: 1
    }])),
    revision: 1,
    totalGathered: 0,
    lastResult: null
  };
}

export function createCozyForagingDomain({ nodes = [] } = {}) {
  const initial = foragingInitialState(nodes);
  let engineRef = null;

  function foragingSystem(world) {
    if (!engineRef) return;
    const dt = Math.max(0, Number(world.__nexusClock?.delta ?? 0));
    if (dt <= 0) return;
    const state = world.getResource(ForagingState);
    let changed = false;
    const nextNodes = { ...state.nodes };
    for (const [nodeId, node] of Object.entries(state.nodes)) {
      if (node.available > 0 || node.respawnRemaining <= 0) continue;
      const remaining = Math.max(0, node.respawnRemaining - dt);
      nextNodes[nodeId] = {
        ...node,
        respawnRemaining: remaining,
        available: remaining <= 0 ? node.capacity : 0,
        revision: node.revision + 1
      };
      changed = true;
    }
    if (changed) world.setResource(ForagingState, { ...state, nodes: nextNodes, revision: state.revision + 1 });
  }

  return defineDomainServiceKit({
    id: "cozy-foraging-domain-kit",
    domain: "cozy-foraging",
    domainPath: "n:cozy-foraging",
    apiName: "cozyForaging",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["wild-coconut-nodes", "collection", "respawn", "snapshot", "reset"],
    requires: ["n:cozy-world", "n:cozy-inventory", "n:core-transaction-ledger"],
    provides: ["foraging:cozy-wild-coconuts"],
    resources: { ForagingState },
    systems: [{ phase: "simulate", name: "cozyForagingRespawnSystem", system: foragingSystem }],
    metadata: {
      purpose: "Deterministic wild coconut gathering and respawn state for procedural palm nodes.",
      rendererAgnostic: true,
      deterministic: true,
      cultivatedCoconutsOwnedBy: "n:production:agriculture"
    },
    initWorld({ engine, world }) {
      engineRef = engine;
      world.setResource(ForagingState, clone(initial));
    },
    createApi({ engine, world }) {
      const read = () => world.getResource(ForagingState);
      const write = (next) => {
        world.setResource(ForagingState, next);
        return clone(next);
      };
      function harvest(nodeId, operationId, actorId = "player") {
        const id = requireId(nodeId, "forage node");
        return engine.n.coreTransactionLedger.applyOnce("cozy-foraging", operationId, () => {
          const state = read();
          const node = state.nodes[id];
          if (!node) return { ok: false, reason: "unknown-node", nodeId: id };
          if (node.available <= 0) return { ok: false, reason: "depleted", nodeId: id, respawnRemaining: node.respawnRemaining };
          const amount = node.available;
          engine.n.cozyInventory.add("coconut", amount, `${operationId}:add-coconuts`, { nodeId: id });
          if ((node.harvestCount + 1) % 2 === 0) {
            engine.n.cozyInventory.add("coconut-sprout", 1, `${operationId}:add-sprout`, { nodeId: id });
          }
          const result = { ok: true, action: "forage", nodeId: id, itemId: "coconut", amount, actorId };
          write({
            ...state,
            nodes: {
              ...state.nodes,
              [id]: {
                ...node,
                available: 0,
                respawnRemaining: node.respawnSeconds,
                harvestCount: node.harvestCount + 1,
                revision: node.revision + 1
              }
            },
            revision: state.revision + 1,
            totalGathered: state.totalGathered + amount,
            lastResult: result
          });
          return result;
        }, { nodeId: id, actorId });
      }
      return {
        getState: () => clone(read()),
        getSnapshot: () => clone(read()),
        loadSnapshot(snapshot = {}) {
          return write({
            ...clone(initial),
            ...clone(snapshot),
            nodes: { ...clone(initial.nodes), ...clone(snapshot.nodes ?? {}) },
            revision: Number(snapshot.revision ?? 0) + 1
          });
        },
        reset: () => write(clone(initial)),
        getNode: (nodeId) => clone(read().nodes[String(nodeId)] ?? null),
        listNodes: () => Object.values(read().nodes).sort((a, b) => a.id.localeCompare(b.id)).map(clone),
        harvest
      };
    }
  });
}
