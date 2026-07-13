const parameters = new URLSearchParams(location.search);
const embeddedPreload = parameters.get("preload") === "1" || window.parent !== window;
const targetOrigin = location.origin;

let announcedReady = false;
let announcedFailure = false;
let entered = !embeddedPreload;
let frozenEngine = null;
let originalTick = null;
let originalStep = null;

function post(type, payload = {}) {
  if (!embeddedPreload || window.parent === window) return;
  window.parent.postMessage({ type, ...payload }, targetOrigin);
}

function readProgress() {
  const descriptor = globalThis.CozyIsland?.startupHost?.getDescriptor?.();
  if (descriptor) {
    return {
      descriptor,
      progress: Math.max(0.01, Math.min(0.99, Number(descriptor.progress) || 0.01)),
      label: document.querySelector("#loader-text")?.textContent || "Preparing My Cozy Island"
    };
  }
  const fillWidth = parseFloat(document.querySelector("#loader-fill")?.style?.width ?? "1");
  return {
    descriptor: null,
    progress: Math.max(0.01, Math.min(0.98, fillWidth / 100 || 0.01)),
    label: document.querySelector("#loader-text")?.textContent || "Starting My Cozy Island"
  };
}

function visibleHostError() {
  const error = document.querySelector("#error");
  if (!error || error.hidden || !error.textContent?.trim()) return null;
  return error.textContent.trim();
}

function freezeSimulation() {
  if (!embeddedPreload || frozenEngine || !globalThis.CozyIsland?.engine) return;
  frozenEngine = globalThis.CozyIsland.engine;
  originalTick = frozenEngine.tick;
  originalStep = frozenEngine.step;
  frozenEngine.tick = () => frozenEngine.world;
  frozenEngine.step = frozenEngine.tick;
}

function resumeSimulation() {
  if (!frozenEngine || !originalTick) return;
  frozenEngine.tick = originalTick;
  frozenEngine.step = originalStep ?? originalTick;
  frozenEngine = null;
  originalTick = null;
  originalStep = null;
}

function preparePlayerEntry() {
  const game = globalThis.CozyIsland;
  if (!game) return;
  try {
    const player = game.player?.getState?.();
    if (player && game.player?.loadSnapshot) {
      game.player.loadSnapshot({
        ...player,
        mode: "intro",
        introProgress: 0.76
      });
    }
    game.input?.clear?.("menu-enter");
    game.renderer?.domElement?.focus?.();
    document.querySelector("#game")?.focus?.();
  } catch (error) {
    console.warn("Could not reset the cozy intro before entry", error);
  }
}

function enterGame() {
  if (entered) {
    post("cozy-game-entered");
    return;
  }
  if (!announcedReady) return;
  entered = true;
  resumeSimulation();
  preparePlayerEntry();
  document.documentElement.dataset.menuEntered = "true";
  post("cozy-game-entered");
}

function inspect() {
  const { descriptor, progress, label } = readProgress();
  const hostError = visibleHostError();

  if ((descriptor?.failure || hostError) && !announcedFailure) {
    announcedFailure = true;
    const failure = descriptor?.failure ?? {
      code: "cozy.startup.host-error",
      message: hostError,
      source: "game-host"
    };
    post("cozy-game-failed", {
      error: `${failure.code}: ${failure.message}`,
      failure
    });
    return;
  }

  if (descriptor?.playable) {
    freezeSimulation();
    if (!announcedReady) {
      announcedReady = true;
      post("cozy-game-progress", { progress: 0.99, label: "Island ready" });
      post("cozy-game-ready", {
        progress: 0.99,
        label: descriptor.continuation?.mode === "restored" ? "Island ready · save restored" : "Island ready",
        continuation: descriptor.continuation
      });
    }
    return;
  }

  post("cozy-game-progress", { progress, label });
}

addEventListener("message", (event) => {
  if (!embeddedPreload || event.source !== window.parent) return;
  if (event.data?.type === "cozy-game-enter") enterGame();
});

if (embeddedPreload) {
  document.documentElement.dataset.backgroundPreload = "true";
  post("cozy-game-progress", { progress: 0.01, label: "Starting My Cozy Island" });
  const timer = setInterval(() => {
    inspect();
    if (announcedFailure || entered) clearInterval(timer);
  }, 120);
  addEventListener("pagehide", () => clearInterval(timer), { once: true });
}
