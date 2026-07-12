import { defineResource } from "nexusengine/ecs";
import { defineDomainServiceKit } from "nexusengine/domain-service-kit";
import {
  COZY_ADVENTURE_VERSION,
  CROP_DEFINITIONS,
  ITEM_DEFINITIONS,
  SEED_CYCLE,
  clone
} from "./definitions.js";
import { settleCozyAgricultureInteraction } from "./agriculture-config.js";

const InteractionState = defineResource("cozy.adventure.interaction.state");

function initialState() {
  return {
    target: null,
    prompt: "Walk the island and find a farm plot or wild coconut palm.",
    lastAction: null,
    revision: 1
  };
}

function distance2D(a, b) {
  return Math.hypot(Number(a.x) - Number(b.x), Number(a.z) - Number(b.z));
}

function plotPrompt(plot, selection) {
  if (plot.status === "untilled") return "E · Prepare this soil";
  if (plot.status === "tilled") {
    return `E · Plant ${selection.crop?.label ?? ITEM_DEFINITIONS[selection.itemId]?.label ?? "selected seed"}`;
  }
  if ((plot.status === "growing" || plot.status === "regrowing") && !plot.watered) {
    return `E · Water ${CROP_DEFINITIONS[plot.cropId]?.label ?? "crop"}`;
  }
  if (plot.status === "growing" || plot.status === "regrowing") {
    return `${CROP_DEFINITIONS[plot.cropId]?.label ?? "Crop"} growing · stage ${plot.stage + 1}`;
  }
  if (plot.status === "ready") return `E · Harvest ${CROP_DEFINITIONS[plot.cropId]?.label ?? "crop"}`;
  return "Agriculture plot";
}

export function createCozyInteractionDomain() {
  let engineRef = null;

  function interactionSystem(world) {
    if (!engineRef) return;
    const input = engineRef.n.cozyInput.getFrame();
    const player = engineRef.n.cozyPlayer.getState();

    if (input.cycleSeedPressed) engineRef.n.cozyInventory.cycleSeed(1);
    if (Number.isInteger(input.selectSeedIndex) && SEED_CYCLE[input.selectSeedIndex]) {
      engineRef.n.cozyInventory.setSelectedSeed(SEED_CYCLE[input.selectSeedIndex]);
    }

    let target = null;
    let bestDistance = Infinity;
    for (const descriptor of engineRef.n.cozyWorld.getPlots()) {
      const distance = distance2D(player.position, descriptor.position);
      if (distance <= 3.25 && distance < bestDistance) {
        target = { kind: "agriculture", id: descriptor.id, distance, state: engineRef.n.agriculture.getPlot(descriptor.id) };
        bestDistance = distance;
      }
    }
    for (const descriptor of engineRef.n.cozyWorld.getForageNodes()) {
      const distance = distance2D(player.position, descriptor.position);
      if (distance <= 4.6 && distance < bestDistance) {
        target = { kind: "wild-forage", id: descriptor.id, distance, state: engineRef.n.cozyForaging.getNode(descriptor.id) };
        bestDistance = distance;
      }
    }

    let prompt = "Explore the friendly forest · Q or 1–4 changes seeds";
    if (target?.kind === "agriculture") prompt = plotPrompt(target.state, engineRef.n.cozyInventory.getSelectedSeed());
    if (target?.kind === "wild-forage") {
      prompt = target.state.available > 0
        ? `E · Gather ${target.state.available} wild coconut${target.state.available === 1 ? "" : "s"}`
        : `Wild coconuts returning in ${Math.ceil(target.state.respawnRemaining)}s`;
    }

    let lastAction = world.getResource(InteractionState).lastAction;
    if (input.interactPressed && player.mode === "first-person") {
      const selectedCrop = engineRef.n.cozyInventory.getSelectedSeed().crop?.id ?? "none";
      const targetRevision = Number(target?.state?.revision ?? 0);
      const operationId = `interaction:${target?.kind ?? "none"}:${target?.id ?? "none"}:r${targetRevision}:f${input.index}:${selectedCrop}`;
      if (target?.kind === "agriculture") {
        lastAction = settleCozyAgricultureInteraction(engineRef, {
          plotId: target.id,
          operationId,
          actorId: player.id
        });
      } else if (target?.kind === "wild-forage") {
        lastAction = engineRef.n.cozyForaging.harvest(target.id, operationId, player.id);
      } else {
        lastAction = { applied: false, duplicate: false, result: { ok: false, reason: "nothing-nearby" } };
      }
    }

    const state = world.getResource(InteractionState);
    world.setResource(InteractionState, {
      target: clone(target),
      prompt,
      lastAction: clone(lastAction),
      revision: state.revision + 1
    });
  }

  return defineDomainServiceKit({
    id: "cozy-interaction-domain-kit",
    domain: "cozy-interaction",
    domainPath: "n:cozy-interaction",
    apiName: "cozyInteraction",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["targeting", "context-action", "agriculture-settlement", "wild-forage-action", "prompt", "result", "snapshot", "reset"],
    requires: [
      "n:cozy-world",
      "n:cozy-input",
      "n:cozy-player",
      "n:cozy-inventory",
      "n:production:agriculture",
      "n:cozy-foraging",
      "n:core-transaction-ledger"
    ],
    provides: ["interaction:cozy-context"],
    resources: { InteractionState },
    systems: [{ phase: "resolve", name: "cozyInteractionSystem", system: interactionSystem }],
    metadata: {
      purpose: "Nearest-target context actions and atomic product settlement between Agriculture, Inventory, and Wild Resources.",
      rendererAgnostic: true,
      deterministic: true
    },
    initWorld({ engine, world }) {
      engineRef = engine;
      world.setResource(InteractionState, initialState());
    },
    createApi({ world }) {
      return {
        getState: () => clone(world.getResource(InteractionState)),
        getSnapshot: () => clone(world.getResource(InteractionState)),
        reset() {
          const next = initialState();
          world.setResource(InteractionState, next);
          return clone(next);
        }
      };
    }
  });
}
