import { defineResource } from "nexusengine/ecs";
import { defineDomainServiceKit } from "nexusengine/domain-service-kit";
import {
  COZY_ADVENTURE_VERSION,
  CROP_DEFINITIONS,
  ITEM_DEFINITIONS,
  SEED_CYCLE,
  clone,
  clamp,
  clamp01,
  lerp
} from "./definitions.js";

const InputState = defineResource("cozy.adventure.input.state");
const ScenarioState = defineResource("cozy.adventure.scenario.state");
const PlayerState = defineResource("cozy.adventure.player.state");
const InteractionState = defineResource("cozy.adventure.interaction.state");

function inputInitialState() {
  return {
    nextSequence: 1,
    queue: [],
    pressed: {},
    frame: {
      index: 0,
      revision: 0,
      axisX: 0,
      axisZ: 0,
      sprint: false,
      lookX: 0,
      lookY: 0,
      wheelPixels: 0,
      interactPressed: false,
      cycleSeedPressed: false,
      selectSeedIndex: null,
      skipIntroPressed: false,
      clearReason: null,
      acceptedCommandIds: []
    },
    revision: 1,
    rejectedCommands: 0
  };
}

function normalizeWheelPixels(command) {
  const value = Number(command.deltaY) || 0;
  const mode = Number(command.deltaMode) || 0;
  if (mode === 1) return value * 16;
  if (mode === 2) return value * Math.max(320, Number(command.pageSize) || 720);
  return value;
}

export function createCozyInputDomain() {
  function inputFrameSystem(world) {
    const state = world.getResource(InputState);
    const pressed = { ...state.pressed };
    let lookX = 0;
    let lookY = 0;
    let wheelPixels = 0;
    let interactPressed = false;
    let cycleSeedPressed = false;
    let selectSeedIndex = null;
    let skipIntroPressed = false;
    let clearReason = null;
    const acceptedCommandIds = [];

    for (const command of [...state.queue].sort((a, b) => a.sequence - b.sequence)) {
      if (!command || command.generation !== 1) continue;
      acceptedCommandIds.push(command.id);
      if (command.type === "key") {
        pressed[command.code] = Boolean(command.down);
        if (command.down && !command.repeat) {
          if (command.code === "KeyE") interactPressed = true;
          if (command.code === "KeyQ") cycleSeedPressed = true;
          if (command.code === "Space" || command.code === "Enter") skipIntroPressed = true;
          if (/^Digit[1-4]$/.test(command.code)) selectSeedIndex = Number(command.code.slice(-1)) - 1;
        }
      } else if (command.type === "pointer") {
        lookX += Number(command.deltaX) || 0;
        lookY += Number(command.deltaY) || 0;
      } else if (command.type === "wheel") {
        wheelPixels += normalizeWheelPixels(command);
      } else if (command.type === "clear") {
        for (const key of Object.keys(pressed)) pressed[key] = false;
        lookX = 0;
        lookY = 0;
        wheelPixels = 0;
        clearReason = command.reason ?? "host-clear";
      }
    }

    const axisX = (pressed.KeyD ? 1 : 0) - (pressed.KeyA ? 1 : 0);
    const axisZ = (pressed.KeyW ? 1 : 0) - (pressed.KeyS ? 1 : 0);
    const nextFrame = {
      index: Number(state.frame.index ?? 0) + 1,
      revision: Number(state.frame.revision ?? 0) + 1,
      axisX,
      axisZ,
      sprint: Boolean(pressed.ShiftLeft || pressed.ShiftRight),
      lookX: clamp(lookX, -720, 720),
      lookY: clamp(lookY, -540, 540),
      wheelPixels: clamp(wheelPixels, -2400, 2400),
      interactPressed,
      cycleSeedPressed,
      selectSeedIndex,
      skipIntroPressed,
      clearReason,
      acceptedCommandIds
    };
    world.setResource(InputState, {
      ...state,
      queue: [],
      pressed,
      frame: nextFrame,
      revision: state.revision + 1
    });
  }

  return defineDomainServiceKit({
    id: "cozy-input-domain-kit",
    domain: "cozy-input",
    domainPath: "n:cozy-input",
    apiName: "cozyInput",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["normalization", "command-queue", "frame-admission", "held-actions", "clear", "snapshot", "reset"],
    provides: ["input:cozy-frame"],
    resources: { InputState },
    systems: [{ phase: "input", name: "cozyInputFrameSystem", system: inputFrameSystem }],
    metadata: {
      purpose: "Normalized frame-admitted keyboard, pointer, wheel, focus, and visibility input for the cozy adventure.",
      rendererAgnostic: true,
      deterministic: true
    },
    initWorld({ world }) {
      world.setResource(InputState, inputInitialState());
    },
    createApi({ world }) {
      const read = () => world.getResource(InputState);
      const write = (next) => world.setResource(InputState, next);

      function enqueue(command = {}) {
        const state = read();
        const sequence = state.nextSequence;
        const normalized = {
          generation: 1,
          ...clone(command),
          id: command.id ?? `input:1:${sequence}`,
          sequence
        };
        write({
          ...state,
          nextSequence: sequence + 1,
          queue: [...state.queue, normalized],
          revision: state.revision + 1
        });
        return clone(normalized);
      }

      return {
        enqueue,
        enqueueKey(code, down, options = {}) {
          return enqueue({ type: "key", code: String(code), down: Boolean(down), repeat: Boolean(options.repeat) });
        },
        enqueuePointer(deltaX, deltaY) {
          return enqueue({ type: "pointer", deltaX: Number(deltaX) || 0, deltaY: Number(deltaY) || 0 });
        },
        enqueueWheel(deltaY, deltaMode = 0, pageSize = 720) {
          return enqueue({ type: "wheel", deltaY: Number(deltaY) || 0, deltaMode: Number(deltaMode) || 0, pageSize: Number(pageSize) || 720 });
        },
        clear(reason = "host-clear") {
          return enqueue({ type: "clear", reason });
        },
        getFrame: () => clone(read().frame),
        getState: () => clone(read()),
        getSnapshot() {
          const state = read();
          return clone({ pressed: state.pressed, frame: state.frame, nextSequence: state.nextSequence, revision: state.revision });
        },
        loadSnapshot(snapshot = {}) {
          const initial = inputInitialState();
          const next = {
            ...initial,
            ...clone(snapshot),
            queue: [],
            pressed: { ...clone(snapshot.pressed ?? {}) },
            frame: { ...initial.frame, ...clone(snapshot.frame ?? {}), lookX: 0, lookY: 0, wheelPixels: 0, interactPressed: false, cycleSeedPressed: false },
            revision: Number(snapshot.revision ?? 0) + 1
          };
          write(next);
          return clone(next);
        },
        reset() {
          const next = inputInitialState();
          write(next);
          return clone(next);
        }
      };
    }
  });
}

function scenarioInitialState() {
  return {
    elapsedSeconds: 72,
    day: 1,
    dayProgress: 72 / 900,
    phase: "golden-morning",
    objective: "Prepare a plot, plant island food, water it, and gather coconuts while it grows.",
    revision: 1
  };
}

export function createCozyScenarioDomain() {
  let engineRef = null;

  function scenarioClockSystem(world) {
    if (!engineRef) return;
    const model = engineRef.n.cozyWorld.getModel();
    model.clock.tick(Math.max(0, Number(world.__nexusClock?.delta ?? 0)));
    const clock = model.clock.getState();
    const dayLength = 900;
    const day = Math.floor(clock.elapsedSeconds / dayLength) + 1;
    const dayProgress = ((clock.elapsedSeconds % dayLength) + dayLength) % dayLength / dayLength;
    const state = world.getResource(ScenarioState);
    world.setResource(ScenarioState, {
      ...state,
      elapsedSeconds: clock.elapsedSeconds,
      day,
      dayProgress,
      phase: "golden-morning",
      revision: state.revision + 1
    });
  }

  return defineDomainServiceKit({
    id: "cozy-scenario-domain-kit",
    domain: "cozy-scenario",
    domainPath: "n:cozy-scenario",
    apiName: "cozyScenario",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["time", "objective", "snapshot", "reset"],
    requires: ["n:cozy-world"],
    provides: ["scenario:cozy-adventure"],
    resources: { ScenarioState },
    systems: [{ phase: "simulate", name: "cozyScenarioClockSystem", system: scenarioClockSystem }],
    metadata: {
      purpose: "Golden-hour island adventure clock and player-facing objective state.",
      rendererAgnostic: true,
      deterministic: true
    },
    initWorld({ engine, world }) {
      engineRef = engine;
      world.setResource(ScenarioState, scenarioInitialState());
    },
    createApi({ engine, world }) {
      const read = () => world.getResource(ScenarioState);
      return {
        getState: () => clone(read()),
        getSnapshot: () => clone(read()),
        loadSnapshot(snapshot = {}) {
          const next = { ...scenarioInitialState(), ...clone(snapshot), revision: Number(snapshot.revision ?? 0) + 1 };
          world.setResource(ScenarioState, next);
          const model = engine.n.cozyWorld.getModel();
          model.clock.reset();
          model.clock.setTimeScale(0.22);
          const desired = Math.max(0, Number(next.elapsedSeconds ?? 72) - model.clock.getState().elapsedSeconds);
          if (desired > 0) model.clock.tick(desired / 0.22);
          return clone(next);
        },
        reset() {
          engine.n.cozyWorld.getModel().clock.reset();
          const next = scenarioInitialState();
          world.setResource(ScenarioState, next);
          return clone(next);
        }
      };
    }
  });
}

function playerInitialState(worldApi) {
  const start = worldApi.surfaceAt(0, 18);
  return {
    id: "player:islander",
    position: { x: 0, y: start.height, z: 18 },
    yaw: 0,
    pitch: -0.06,
    eyeHeight: 2,
    mode: "intro",
    introProgress: 0.76,
    stamina: 100,
    distanceWalked: 0,
    surfaceKind: start.kind,
    revision: 1
  };
}

export function createCozyPlayerDomain() {
  let engineRef = null;
  let initial = null;

  function playerMovementSystem(world) {
    if (!engineRef) return;
    const input = engineRef.n.cozyInput.getFrame();
    const state = world.getResource(PlayerState);
    const dt = Math.max(0, Number(world.__nexusClock?.delta ?? 0));
    let yaw = state.yaw - input.lookX * 0.00235;
    const pitch = clamp(state.pitch - input.lookY * 0.00205, -1.08, 0.92);
    let introProgress = state.introProgress;
    let mode = state.mode;

    if (mode === "intro") {
      introProgress = clamp01(introProgress + dt * 0.044 + input.wheelPixels * 0.0005);
      if (input.skipIntroPressed || input.interactPressed || Math.abs(input.axisX) + Math.abs(input.axisZ) > 0) introProgress = 1;
      if (introProgress >= 0.999) mode = "first-person";
    }

    let position = state.position;
    let stamina = state.stamina;
    let distanceWalked = state.distanceWalked;
    let surfaceKind = state.surfaceKind;
    if (mode === "first-person") {
      const axisLength = Math.hypot(input.axisX, input.axisZ);
      const sprinting = input.sprint && axisLength > 0 && stamina > 1;
      const speed = sprinting ? 6.4 : 4.25;
      if (axisLength > 0.001) {
        const forward = { x: -Math.sin(yaw), z: -Math.cos(yaw) };
        const right = { x: Math.cos(yaw), z: -Math.sin(yaw) };
        const moveX = (right.x * input.axisX + forward.x * input.axisZ) / Math.max(1, axisLength);
        const moveZ = (right.z * input.axisX + forward.z * input.axisZ) / Math.max(1, axisLength);
        const requested = {
          x: position.x + moveX * speed * dt,
          z: position.z + moveZ * speed * dt
        };
        const constrained = engineRef.n.cozyWorld.constrainWalk(position, requested);
        const traveled = Math.hypot(constrained.x - position.x, constrained.z - position.z);
        position = { x: constrained.x, y: constrained.y, z: constrained.z };
        surfaceKind = constrained.surface.kind;
        distanceWalked += traveled;
        stamina = sprinting ? Math.max(0, stamina - dt * 16) : Math.min(100, stamina + dt * 9);
      } else {
        stamina = Math.min(100, stamina + dt * 12);
      }
    }

    world.setResource(PlayerState, {
      ...state,
      position,
      yaw,
      pitch,
      mode,
      introProgress,
      stamina,
      distanceWalked,
      surfaceKind,
      revision: state.revision + 1
    });
  }

  return defineDomainServiceKit({
    id: "cozy-player-domain-kit",
    domain: "cozy-player",
    domainPath: "n:cozy-player",
    apiName: "cozyPlayer",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["movement", "terrain-grounding", "view", "stamina", "snapshot", "reset"],
    requires: ["n:cozy-world", "n:cozy-input"],
    provides: ["player:cozy-state", "movement:cozy-walk"],
    resources: { PlayerState },
    systems: [{ phase: "simulate", name: "cozyPlayerMovementSystem", system: playerMovementSystem }],
    metadata: {
      purpose: "Free island walking, terrain grounding, first-person view state, and light sprint stamina.",
      rendererAgnostic: true,
      deterministic: true
    },
    initWorld({ engine, world }) {
      engineRef = engine;
      initial = playerInitialState(engine.n.cozyWorld);
      world.setResource(PlayerState, clone(initial));
    },
    createApi({ world }) {
      const read = () => world.getResource(PlayerState);
      return {
        getState: () => clone(read()),
        getSnapshot: () => clone(read()),
        loadSnapshot(snapshot = {}) {
          const candidate = { ...clone(initial), ...clone(snapshot), revision: Number(snapshot.revision ?? 0) + 1 };
          const constrained = engineRef.n.cozyWorld.constrainWalk(initial.position, candidate.position);
          candidate.position = { x: constrained.x, y: constrained.y, z: constrained.z };
          world.setResource(PlayerState, candidate);
          return clone(candidate);
        },
        reset() {
          world.setResource(PlayerState, clone(initial));
          return clone(initial);
        }
      };
    }
  });
}

function interactionInitialState() {
  return {
    target: null,
    prompt: "Walk the island and find a farm plot or coconut palm.",
    lastAction: null,
    revision: 1
  };
}

function distance2D(a, b) {
  return Math.hypot(Number(a.x) - Number(b.x), Number(a.z) - Number(b.z));
}

function plotPrompt(plot, selection) {
  if (plot.status === "untilled") return "E · Till this soil";
  if (plot.status === "tilled") {
    const cropLabel = selection.crop?.label ?? ITEM_DEFINITIONS[selection.itemId]?.label ?? "selected seed";
    return `E · Plant ${cropLabel}`;
  }
  if (plot.status === "growing" && !plot.watered) return `E · Water ${CROP_DEFINITIONS[plot.cropId]?.label ?? "crop"}`;
  if (plot.status === "growing") return `${CROP_DEFINITIONS[plot.cropId]?.label ?? "Crop"} growing · stage ${plot.stage + 1}`;
  if (plot.status === "ready") return `E · Harvest ${CROP_DEFINITIONS[plot.cropId]?.label ?? "crop"}`;
  return "Farm plot";
}

export function createCozyInteractionDomain() {
  let engineRef = null;

  function interactionSystem(world) {
    if (!engineRef) return;
    const input = engineRef.n.cozyInput.getFrame();
    const player = engineRef.n.cozyPlayer.getState();
    const selection = engineRef.n.cozyInventory.getSelectedSeed();

    if (input.cycleSeedPressed) engineRef.n.cozyInventory.cycleSeed(1);
    if (Number.isInteger(input.selectSeedIndex) && SEED_CYCLE[input.selectSeedIndex]) {
      engineRef.n.cozyInventory.setSelectedSeed(SEED_CYCLE[input.selectSeedIndex]);
    }

    let target = null;
    let bestDistance = Infinity;
    for (const plotDescriptor of engineRef.n.cozyWorld.getPlots()) {
      const distance = distance2D(player.position, plotDescriptor.position);
      if (distance <= 3.25 && distance < bestDistance) {
        const plot = engineRef.n.cozyFarming.getPlot(plotDescriptor.id);
        target = { kind: "plot", id: plotDescriptor.id, distance, state: plot };
        bestDistance = distance;
      }
    }
    for (const nodeDescriptor of engineRef.n.cozyWorld.getForageNodes()) {
      const distance = distance2D(player.position, nodeDescriptor.position);
      if (distance <= 4.6 && distance < bestDistance) {
        const node = engineRef.n.cozyForaging.getNode(nodeDescriptor.id);
        target = { kind: "forage", id: nodeDescriptor.id, distance, state: node };
        bestDistance = distance;
      }
    }

    let prompt = "Explore the friendly forest · Q or 1–4 changes seeds";
    if (target?.kind === "plot") prompt = plotPrompt(target.state, engineRef.n.cozyInventory.getSelectedSeed());
    if (target?.kind === "forage") {
      prompt = target.state.available > 0
        ? `E · Gather ${target.state.available} coconut${target.state.available === 1 ? "" : "s"}`
        : `Coconuts returning in ${Math.ceil(target.state.respawnRemaining)}s`;
    }

    let lastAction = world.getResource(InteractionState).lastAction;
    if (input.interactPressed && player.mode === "first-person") {
      const operationId = `interaction:${input.index}:${target?.id ?? "none"}`;
      if (target?.kind === "plot") lastAction = engineRef.n.cozyFarming.interact(target.id, operationId, player.id);
      else if (target?.kind === "forage") lastAction = engineRef.n.cozyForaging.harvest(target.id, operationId, player.id);
      else lastAction = { ok: false, reason: "nothing-nearby" };
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
    services: ["targeting", "context-action", "prompt", "result", "snapshot", "reset"],
    requires: ["n:cozy-world", "n:cozy-input", "n:cozy-player", "n:cozy-inventory", "n:cozy-farming", "n:cozy-foraging"],
    provides: ["interaction:cozy-context"],
    resources: { InteractionState },
    systems: [{ phase: "resolve", name: "cozyInteractionSystem", system: interactionSystem }],
    metadata: {
      purpose: "Nearest-target context actions connecting the player to plots and coconut forage nodes.",
      rendererAgnostic: true,
      deterministic: true
    },
    initWorld({ engine, world }) {
      engineRef = engine;
      world.setResource(InteractionState, interactionInitialState());
    },
    createApi({ world }) {
      return {
        getState: () => clone(world.getResource(InteractionState)),
        getSnapshot: () => clone(world.getResource(InteractionState)),
        reset() {
          const next = interactionInitialState();
          world.setResource(InteractionState, next);
          return clone(next);
        }
      };
    }
  });
}

function sampleRail(points, progress) {
  const scaled = clamp01(progress) * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const local = scaled - index;
  const t = local * local * (3 - 2 * local);
  const a = points[index];
  const b = points[index + 1];
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    z: lerp(a.z, b.z, t)
  };
}

export function createCozyCameraDomain() {
  return defineDomainServiceKit({
    id: "cozy-camera-domain-kit",
    domain: "cozy-camera",
    domainPath: "n:cozy-camera",
    apiName: "cozyCamera",
    version: COZY_ADVENTURE_VERSION,
    stability: "product-stable",
    services: ["aerial-intro", "first-person", "terrain-clearance", "descriptor"],
    requires: ["n:cozy-world", "n:cozy-player"],
    provides: ["camera:cozy-adventure"],
    metadata: {
      purpose: "Terrain-safe golden-hour aerial reveal and two-meter first-person adventure camera descriptors.",
      rendererAgnostic: true,
      deterministic: true
    },
    createApi({ engine }) {
      function above(x, z, clearance) {
        return { x, y: engine.n.cozyWorld.surfaceAt(x, z).height + clearance, z };
      }

      function descriptor() {
        const player = engine.n.cozyPlayer.getState();
        if (player.mode === "intro") {
          const positions = [
            { x: 0, y: 245, z: 510 },
            { x: -76, y: 182, z: 360 },
            { x: -55, y: 126, z: 245 },
            { x: -30, y: 82, z: 150 },
            above(-15, 82, 24),
            above(-4, 48, 13),
            above(0, 27, 6),
            above(player.position.x, player.position.z, player.eyeHeight)
          ];
          const looks = [
            above(0, 0, 8),
            above(0, 0, 7),
            above(0, 4, 6),
            above(0, 5, 5),
            above(-2, 6, 4),
            above(0, 8, 3),
            above(0, 10, 2.4),
            above(0, 8, 2)
          ];
          const progress = player.introProgress;
          return Object.freeze({
            id: "camera:cozy-adventure-intro",
            mode: "intro",
            progress,
            fov: lerp(55, 80, clamp01((progress - 0.72) / 0.28)),
            position: Object.freeze(sampleRail(positions, progress)),
            lookAt: Object.freeze(sampleRail(looks, progress)),
            eyeHeight: player.eyeHeight
          });
        }
        const eye = {
          x: player.position.x,
          y: engine.n.cozyWorld.surfaceAt(player.position.x, player.position.z).height + player.eyeHeight,
          z: player.position.z
        };
        const cosPitch = Math.cos(player.pitch);
        const forward = {
          x: -Math.sin(player.yaw) * cosPitch,
          y: Math.sin(player.pitch),
          z: -Math.cos(player.yaw) * cosPitch
        };
        return Object.freeze({
          id: "camera:cozy-adventure-first-person",
          mode: "first-person",
          progress: 1,
          fov: 80,
          eyeHeight: player.eyeHeight,
          position: Object.freeze(eye),
          lookAt: Object.freeze({ x: eye.x + forward.x, y: eye.y + forward.y, z: eye.z + forward.z })
        });
      }

      return {
        getDescriptor: descriptor,
        getState: descriptor,
        getSnapshot: descriptor
      };
    }
  });
}
