import { createEngine } from "nexusengine/engine";
import { defineEvent, defineResource } from "nexusengine/ecs";
import { defineDomainServiceKit } from "nexusengine/domain-service-kit";
import { createCoreObjectKit } from "nexusengine/core-object";
import { createCoreTransactionLedgerKit } from "nexusengine/core-transaction-ledger";
import { createAgricultureDomainKit } from "@luminarylabs/nexusengine-kits/kits/production/agriculture-domain-kit";
import { createCozyWorldDomain } from "./world-domain.js";
import {
  createCozyInputDomain,
  createCozyScenarioDomain,
  createCozyPlayerDomain,
  createCozyCameraDomain
} from "./runtime-domains.js";
import { createCozyInteractionDomain } from "./interaction-agriculture-domain.js";
import {
  createCozyInventoryDomain,
  createCozyForagingDomain
} from "./resource-domains.js";
import {
  createCozySaveDomain,
  createCozyRenderSnapshotDomain
} from "./persistence-render-domains.js";
import { createTropicalAgricultureConfig } from "./agriculture-config.js";

const AGRICULTURE_NEXUS_RUNTIME = Object.freeze({
  defineEvent,
  defineResource,
  defineDomainServiceKit
});

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
      createCozyInventoryDomain(),
      createAgricultureDomainKit(AGRICULTURE_NEXUS_RUNTIME, createTropicalAgricultureConfig()),
      createCozyForagingDomain(),
      createCozyPlayerDomain(),
      createCozyScenarioDomain(),
      createCozyInteractionDomain(),
      createCozyCameraDomain(),
      createCozySaveDomain(),
      createCozyRenderSnapshotDomain()
    ]
  });

  engine.n.cozyForaging.loadSnapshot(initialForageSnapshot(engine.n.cozyWorld.getForageNodes()));

  // Read-only migration alias for older host/debug surfaces. No farming DSK is installed.
  if (!Object.prototype.hasOwnProperty.call(engine.n, "cozyFarming")) {
    Object.defineProperty(engine.n, "cozyFarming", {
      value: engine.n.agriculture,
      enumerable: false,
      configurable: false,
      writable: false
    });
  }

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
        agriculture: engine.n.agriculture.getState(),
        foraging: engine.n.cozyForaging.getState(),
        interaction: engine.n.cozyInteraction.getState(),
        scenario: engine.n.cozyScenario.getState(),
        save: engine.n.cozySave.getState(),
        objectCount: engine.n.coreObject.list().length,
        domainPaths: engine.n.paths?.().map((entry) => entry.path) ?? []
      });
    }
  });
}
