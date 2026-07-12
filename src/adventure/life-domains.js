import { defineResource } from "nexusengine/ecs";
import { defineDomainServiceKit } from "nexusengine/domain-service-kit";
import {
  COZY_ADVENTURE_VERSION,
  CROP_DEFINITIONS,
  INITIAL_INVENTORY,
  ITEM_DEFINITIONS,
  SEED_CYCLE,
  clone,
  clamp01,
  cropFromSeedItem,
  hashText
} from "./definitions.js";

const InventoryState = defineResource("cozy.adventure.inventory.state");
const FarmingState = defineResource("cozy.adventure.farming.state");
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
    services: ["items", "seed-selection", "transactions", "snapshot", "reset"],
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

      function setResult(state, result) {
        return {
          ...state,
          revision: Number(state.revision ?? 0) + 1,
          lastResult: clone(result)
        };
      }

      function transact(operationId, action, metadata = {}) {
        return engine.n.coreTransactionLedger.applyOnce(
          "cozy-inventory",
          requireId(operationId, "inventory operation"),
          action,
          metadata
        );
      }

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
        reset() {
          return write(inventoryInitialState());
        },
        amount(itemId) {
          return Number(read().items[String(itemId)] ?? 0);
        },
        has(itemId, amount = 1) {
          return Number(read().items[String(itemId)] ?? 0) >= Number(amount);
        },
        add(itemId, amount, operationId, metadata) {
          return adjust(itemId, Math.abs(Number(amount) || 0), operationId, metadata);
        },
        remove(itemId, amount, operationId, metadata) {
          return adjust(itemId, -Math.abs(Number(amount) || 0), operationId, metadata);
        },
        setSelectedSeed,
        cycleSeed(direction = 1) {
          const current = read().selectedSeedItemId;
          const index = Math.max(0, SEED_CYCLE.indexOf(current));
          const nextIndex = (index + Math.sign(Number(direction) || 1) + SEED_CYCLE.length) % SEED_CYCLE.length;
          return setSelectedSeed(SEED_CYCLE[nextIndex]);
        },
        getSelectedSeed() {
          const itemId = read().selectedSeedItemId;
          return Object.freeze({ itemId, item: ITEM_DEFINITIONS[itemId], crop: cropFromSeedItem(itemId) });
        }
      };
    }
  });
}

function farmingInitialState(plots) {
  return {
    plots: Object.fromEntries(plots.map((plot) => [plot.id, {
      id: plot.id,
      status: "untilled",
      cropId: null,
      progressSeconds: 0,
      stage: 0,
      watered: false,
      harvestCount: 0,
      revision: 1
    }])),
    revision: 1,
    totalHarvests: 0,
    lastResult: null
  };
}

function deterministicYield(crop, operationId) {
  const span = crop.yieldMax - crop.yieldMin + 1;
  const hash = Number.parseInt(hashText(operationId).slice(-6), 16);
  return crop.yieldMin + (hash % span);
}

export function createCozyFarmingDomain({ plots = [] } = {}) {
  const initial = farmingInitialState(plots);
  let engineRef = null;

  function farmingSystem(world) {
    if (!engineRef) return;
    const dt = Math.max(0, Number(world.__nexusClock?.delta ?? 0));
    if (dt <= 0) return;
    const state = world.getResource(FarmingState);
    let changed = false;
    const nextPlots = { ...state.plots };
    for (const [plotId, plot] of Object.entries(state.plots)) {
      if (plot.status !== "growing" || !plot.cropId) continue;
      const crop = CROP_DEFINITIONS[plot.cropId];
      if (!crop) continue;
      const growthRate = plot.watered ? 1 : 0.58;
      const progressSeconds = Math.min(crop.growthSeconds, plot.progressSeconds + dt * growthRate);
      const normalized = clamp01(progressSeconds / crop.growthSeconds);
      const stage = Math.min(crop.stageCount, Math.floor(normalized * crop.stageCount));
      const status = normalized >= 1 ? "ready" : "growing";
      if (progressSeconds !== plot.progressSeconds || stage !== plot.stage || status !== plot.status) {
        nextPlots[plotId] = {
          ...plot,
          progressSeconds,
          stage,
          status,
          revision: plot.revision + 1
        };
        changed = true;
      }
    }
    if (changed) {
      world.setResource(FarmingState, {
        ...state,
        plots: nextPlots,
        revision: state.revision + 1
      });
    }
  }

  return defineDomainServiceKit({
    id: "cozy-farming-domain-kit",
    domain: "cozy-farming",
    domainPath: "n:cozy-farming",
    apiName: "cozyFarming",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["plots", "tilling", "planting", "watering", "growth", "harvesting", "snapshot", "reset"],
    requires: ["n:cozy-world", "n:cozy-inventory", "n:core-transaction-ledger"],
    provides: ["farming:cozy-plots", "farming:cozy-crops"],
    resources: { FarmingState },
    systems: [{ phase: "simulate", name: "cozyFarmingGrowthSystem", system: farmingSystem }],
    metadata: {
      purpose: "Deterministic farm-plot lifecycle for tilling, tropical planting, watering, growth, and repeat-safe harvesting.",
      rendererAgnostic: true,
      deterministic: true
    },
    initWorld({ engine, world }) {
      engineRef = engine;
      world.setResource(FarmingState, clone(initial));
    },
    createApi({ engine, world }) {
      const read = () => world.getResource(FarmingState);
      const write = (next) => {
        world.setResource(FarmingState, next);
        return clone(next);
      };

      function updatePlot(plotId, patch, result) {
        const state = read();
        const current = state.plots[plotId];
        if (!current) return { ok: false, reason: "unknown-plot", plotId };
        const nextPlot = { ...current, ...patch, revision: current.revision + 1 };
        write({
          ...state,
          plots: { ...state.plots, [plotId]: nextPlot },
          revision: state.revision + 1,
          totalHarvests: result.action === "harvest" ? state.totalHarvests + 1 : state.totalHarvests,
          lastResult: clone(result)
        });
        return result;
      }

      function interact(plotId, operationId, actorId = "player") {
        const id = requireId(plotId, "farm plot");
        return engine.n.coreTransactionLedger.applyOnce("cozy-farming", operationId, () => {
          const plot = read().plots[id];
          if (!plot) return { ok: false, reason: "unknown-plot", plotId: id };

          if (plot.status === "untilled") {
            return updatePlot(id, { status: "tilled" }, { ok: true, action: "till", plotId: id, actorId });
          }

          if (plot.status === "tilled") {
            const selection = engine.n.cozyInventory.getSelectedSeed();
            if (!selection.crop) return { ok: false, reason: "no-seed-selected", plotId: id };
            const consumed = engine.n.cozyInventory.remove(
              selection.itemId,
              1,
              `${operationId}:consume-seed`,
              { plotId: id, cropId: selection.crop.id }
            );
            if (!consumed.result?.ok) {
              const result = { ok: false, reason: "missing-seed", plotId: id, seedItemId: selection.itemId };
              const state = read();
              write({ ...state, revision: state.revision + 1, lastResult: result });
              return result;
            }
            return updatePlot(id, {
              status: "growing",
              cropId: selection.crop.id,
              progressSeconds: 0,
              stage: 0,
              watered: false
            }, {
              ok: true,
              action: "plant",
              plotId: id,
              cropId: selection.crop.id,
              seedItemId: selection.itemId,
              actorId
            });
          }

          if (plot.status === "growing") {
            if (plot.watered) return { ok: false, reason: "already-watered", plotId: id, cropId: plot.cropId };
            return updatePlot(id, { watered: true }, {
              ok: true,
              action: "water",
              plotId: id,
              cropId: plot.cropId,
              actorId
            });
          }

          if (plot.status === "ready") {
            const crop = CROP_DEFINITIONS[plot.cropId];
            const amount = deterministicYield(crop, operationId);
            engine.n.cozyInventory.add(
              crop.harvestItemId,
              amount,
              `${operationId}:add-harvest`,
              { plotId: id, cropId: crop.id }
            );
            if (crop.id === "coconut") {
              engine.n.cozyInventory.add(
                "coconut-sprout",
                1,
                `${operationId}:return-sprout`,
                { plotId: id, cropId: crop.id }
              );
            }
            return updatePlot(id, {
              status: "tilled",
              cropId: null,
              progressSeconds: 0,
              stage: 0,
              watered: false,
              harvestCount: plot.harvestCount + 1
            }, {
              ok: true,
              action: "harvest",
              plotId: id,
              cropId: crop.id,
              itemId: crop.harvestItemId,
              amount,
              actorId
            });
          }

          return { ok: false, reason: "unsupported-plot-state", plotId: id, status: plot.status };
        }, { plotId: id, actorId });
      }

      return {
        cropDefinitions: CROP_DEFINITIONS,
        getState: () => clone(read()),
        getSnapshot: () => clone(read()),
        loadSnapshot(snapshot = {}) {
          const next = {
            ...clone(initial),
            ...clone(snapshot),
            plots: { ...clone(initial.plots), ...clone(snapshot.plots ?? {}) },
            revision: Number(snapshot.revision ?? 0) + 1
          };
          return write(next);
        },
        reset() {
          return write(clone(initial));
        },
        getPlot(plotId) {
          return clone(read().plots[String(plotId)] ?? null);
        },
        listPlots() {
          return Object.values(read().plots).sort((a, b) => a.id.localeCompare(b.id)).map(clone);
        },
        interact
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
    services: ["coconut-nodes", "collection", "respawn", "snapshot", "reset"],
    requires: ["n:cozy-world", "n:cozy-inventory", "n:core-transaction-ledger"],
    provides: ["foraging:cozy-coconuts"],
    resources: { ForagingState },
    systems: [{ phase: "simulate", name: "cozyForagingRespawnSystem", system: foragingSystem }],
    metadata: {
      purpose: "Deterministic coconut gathering and respawn state for procedural palm nodes.",
      rendererAgnostic: true,
      deterministic: true
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
          const next = {
            ...clone(initial),
            ...clone(snapshot),
            nodes: { ...clone(initial.nodes), ...clone(snapshot.nodes ?? {}) },
            revision: Number(snapshot.revision ?? 0) + 1
          };
          return write(next);
        },
        reset() {
          return write(clone(initial));
        },
        getNode(nodeId) {
          return clone(read().nodes[String(nodeId)] ?? null);
        },
        listNodes() {
          return Object.values(read().nodes).sort((a, b) => a.id.localeCompare(b.id)).map(clone);
        },
        harvest
      };
    }
  });
}
