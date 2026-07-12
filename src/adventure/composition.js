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

export function createCozyAdventure({ quality, backend = "webgpu" } = {}) {
  if (!quality) throw new TypeError("createCozyAdventure requires a render-quality descriptor.");

  const worldKit = createCozyWorldDomain({ quality, backend });
  const worldModel = worldKit.__cozyWorldModel ?? null;
  const engine = createEngine({
    kits: [
      createCoreObjectKit(),
      createCoreTransactionLedgerKit(),
      worldKit,
      createCozyInputDomain(),
      createCozyScenarioDomain(),
      createCozyInventoryDomain(),
      createCozyFarmingDomain({ plots: worldModel?.plots ?? [] }),
      createCozyForagingDomain({ nodes: worldModel?.forageNodes ?? [] }),
      createCozyPlayerDomain(),
      createCozyInteractionDomain(),
      createCozyCameraDomain(),
      createCozySaveDomain(),
      createCozyRenderSnapshotDomain()
    ]
  });

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
