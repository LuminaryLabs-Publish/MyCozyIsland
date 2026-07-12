import { createEngine } from "nexusengine/engine";
import { createCoreObjectKit } from "nexusengine/core-object";
import { createCoreTransactionLedgerKit } from "nexusengine/core-transaction-ledger";
import { createCozyWorldDomain } from "./world-domain.js";
import {
  createCozyInputDomain,
  createCozyScenarioDomain,
  createCozyPlayerDomain,
  createCozyInteractionDomain,
  createCozyCameraDomain
} from "./runtime-domains.js";
import {
  createCozyInventoryDomain,
  createCozyFarmingDomain,
  createCozyForagingDomain
} from "./life-domains.js";
import {
  createCozySaveDomain,
  createCozyRenderSnapshotDomain
} from "./persistence-render-domains.js";

function initialFarmSnapshot(plots) {
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

function initialForageSnapshot(nodes) {
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

export function createCozyAdventure({ quality, backend = "webgpu" } = {}) {
  if (!quality) throw new TypeError("createCozyAdventure requires a render-quality descriptor.");

  const engine = createEngine({
    kits: [
      createCoreObjectKit(),
      createCoreTransactionLedgerKit(),
      createCozyWorldDomain({ quality, backend }),
      createCozyInputDomain(),
      createCozyScenarioDomain(),
      createCozyInventoryDomain(),
      createCozyFarmingDomain(),
      createCozyForagingDomain(),
      createCozyPlayerDomain(),
      createCozyInteractionDomain(),
      createCozyCameraDomain(),
      createCozySaveDomain(),
      createCozyRenderSnapshotDomain()
    ]
  });

  engine.n.cozyFarming.loadSnapshot(initialFarmSnapshot(engine.n.cozyWorld.getPlots()));
  engine.n.cozyForaging.loadSnapshot(initialForageSnapshot(engine.n.cozyWorld.getForageNodes()));

  return Object.freeze({
    engine,
    tick(deltaSeconds) {
      engine.tick(Math.max(0, Math.min(0.05, Number(deltaSeconds) || 0)));
      return engine.n.cozyRenderSnapshot.getFrameSnapshot();
    },
    getStaticSnapshot: () => engine.n.cozyRenderSnapshot.getStaticSnapshot(),
    getFrameSnapshot: () => engine.n.cozyRenderSnapshot.getFrameSnapshot(),
    getState() {
      return Object.freeze({
        world: engine.n.cozyWorld.getState(),
        player: engine.n.cozyPlayer.getState(),
        inventory: engine.n.cozyInventory.getState(),
        farming: engine.n.cozyFarming.getState(),
        foraging: engine.n.cozyForaging.getState(),
        interaction: engine.n.cozyInteraction.getState(),
        scenario: engine.n.cozyScenario.getState(),
        save: engine.n.cozySave.getState(),
        objectCount: engine.n.coreObject.list().length,
        domainPaths: engine.getDomainPaths?.() ?? []
      });
    }
  });
}
