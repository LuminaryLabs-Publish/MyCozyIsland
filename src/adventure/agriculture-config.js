import {
  COZY_WORLD_CONFIG,
  CROP_DEFINITIONS,
  clone
} from "./definitions.js";

export const TROPICAL_SOIL_TYPE = "tropical-loam";
export const COZY_AGRICULTURE_LEDGER = "cozy-agriculture-actions";

function farmPlotConfig(config = COZY_WORLD_CONFIG) {
  const plots = [];
  const farm = config.farm;
  for (let row = 0; row < farm.rows; row += 1) {
    for (let column = 0; column < farm.columns; column += 1) {
      plots.push({
        id: `farm-plot:${row}:${column}`,
        position: {
          x: farm.origin.x + column * farm.spacingX,
          z: farm.origin.z + row * farm.spacingZ
        },
        size: { x: farm.plotWidth, z: farm.plotDepth },
        soilType: TROPICAL_SOIL_TYPE,
        metadata: { row, column, rotation: -0.035 + row * 0.014 }
      });
    }
  }
  return plots;
}

export function createTropicalAgricultureConfig(options = {}) {
  const cropDefinitions = Object.fromEntries(Object.values(CROP_DEFINITIONS).map((crop) => [crop.id, {
    ...clone(crop),
    preferredSoils: [TROPICAL_SOIL_TYPE],
    perennial: crop.id === "coconut",
    regrowSeconds: crop.id === "coconut" ? 72 : undefined,
    seedReturnItemId: crop.id === "coconut" ? "coconut-sprout" : null,
    seedReturnAmount: crop.id === "coconut" ? 1 : 0,
    metadata: {
      climate: "tropical",
      source: "my-cozy-island"
    }
  }]));

  return {
    stateId: "cozy-island-tropical-agriculture",
    growthMode: "continuous",
    unwateredGrowthRate: 0.58,
    soilDefaults: {
      soilType: TROPICAL_SOIL_TYPE,
      moisture: 0.42,
      fertility: 0.88
    },
    plots: options.plots ?? farmPlotConfig(options.worldConfig),
    cropDefinitions,
    journalLimit: 128,
    metadata: {
      product: "MyCozyIsland",
      contentPack: "tropical-agriculture-v1"
    }
  };
}

export function migrateLegacyFarmingSnapshot(snapshot = {}, currentAgricultureSnapshot = {}) {
  const base = clone(currentAgricultureSnapshot);
  const legacyPlots = snapshot.plots ?? {};
  const plots = Object.fromEntries(Object.entries(base.plots ?? {}).map(([plotId, configured]) => {
    const legacy = legacyPlots[plotId] ?? {};
    const status = legacy.status ?? configured.status;
    return [plotId, {
      ...configured,
      ...clone(legacy),
      id: plotId,
      cropInstanceId: legacy.cropId
        ? legacy.cropInstanceId ?? `${plotId}:${legacy.cropId}:migrated`
        : null,
      regrowthCount: Number(legacy.regrowthCount ?? configured.regrowthCount ?? 0),
      soil: {
        ...configured.soil,
        prepared: status !== "untilled",
        moisture: legacy.watered ? 1 : configured.soil.moisture
      }
    }];
  }));

  return {
    ...base,
    schema: "nexusengine.agriculture/1",
    version: "1.0.0",
    plots,
    revision: Math.max(1, Number(snapshot.revision ?? base.revision ?? 1)),
    totalHarvests: Number(snapshot.totalHarvests ?? 0),
    lastResult: clone(snapshot.lastResult ?? null),
    journal: clone(snapshot.journal ?? [])
  };
}

function resultOf(value) {
  return value?.result ?? value?.record?.result ?? value;
}

export function settleCozyAgricultureInteraction(engine, {
  plotId,
  operationId,
  actorId = "player"
} = {}) {
  const ledger = engine.n.coreTransactionLedger;
  const agriculture = engine.n.agriculture;
  const inventory = engine.n.cozyInventory;
  const stableOperationId = String(operationId ?? "").trim();
  if (!stableOperationId) throw new TypeError("Agriculture interaction requires operationId.");

  const existing = ledger.get(COZY_AGRICULTURE_LEDGER, stableOperationId);
  if (existing) {
    return { applied: false, duplicate: true, result: clone(existing.result), record: existing };
  }

  const agricultureOperationId = `${stableOperationId}:agriculture`;
  const recoveredAgriculture = ledger.get("agriculture", agricultureOperationId);
  if (recoveredAgriculture) {
    const recorded = ledger.record(COZY_AGRICULTURE_LEDGER, stableOperationId, recoveredAgriculture.result, {
      plotId,
      actorId,
      recovered: true
    });
    return { ...recorded, result: clone(recoveredAgriculture.result), recovered: true };
  }

  const plot = agriculture.getPlot(plotId);
  if (!plot) return { applied: false, duplicate: false, result: { ok: false, reason: "unknown-plot", plotId } };
  const selected = inventory.getSelectedSeed();
  const plan = agriculture.planInteraction(plotId, {
    operationId: stableOperationId,
    actorId,
    cropId: plot.status === "tilled" ? selected.crop?.id : null
  });
  if (!plan.ok) return { applied: false, duplicate: false, result: clone(plan) };

  for (const change of plan.resourceChanges) {
    if (!inventory.definitions[change.itemId]) {
      return { applied: false, duplicate: false, result: { ok: false, reason: "unknown-item", itemId: change.itemId } };
    }
    if (change.amount < 0 && !inventory.has(change.itemId, Math.abs(change.amount))) {
      return {
        applied: false,
        duplicate: false,
        result: {
          ok: false,
          reason: "missing-resource",
          itemId: change.itemId,
          required: Math.abs(change.amount),
          available: inventory.amount(change.itemId),
          plotId
        }
      };
    }
  }

  const before = {
    inventory: inventory.getSnapshot(),
    agriculture: agriculture.getSnapshot(),
    ledger: ledger.getSnapshot()
  };

  try {
    const inventorySettlement = inventory.applyChanges(
      plan.resourceChanges,
      `${stableOperationId}:inventory`,
      { plotId, actorId, agriculturePlanId: plan.id }
    );
    const inventoryResult = resultOf(inventorySettlement);
    if (!inventoryResult?.ok) throw new Error(inventoryResult?.reason ?? "inventory-settlement-failed");

    const agricultureSettlement = agriculture.commitPlan(plan, agricultureOperationId);
    const agricultureResult = resultOf(agricultureSettlement);
    if (!agricultureResult?.ok) throw new Error(agricultureResult?.reason ?? "agriculture-commit-failed");

    const result = {
      ...clone(agricultureResult),
      inventoryChanges: clone(plan.resourceChanges),
      agriculturePlanId: plan.id
    };
    const recorded = ledger.record(COZY_AGRICULTURE_LEDGER, stableOperationId, result, {
      plotId,
      actorId,
      agricultureOperationId
    });
    return { ...recorded, result };
  } catch (error) {
    inventory.loadSnapshot(before.inventory);
    agriculture.loadSnapshot(before.agriculture);
    ledger.loadSnapshot(before.ledger);
    return {
      applied: false,
      duplicate: false,
      rolledBack: true,
      result: {
        ok: false,
        reason: "agriculture-transaction-rolled-back",
        error: String(error?.message ?? error),
        plotId
      }
    };
  }
}
