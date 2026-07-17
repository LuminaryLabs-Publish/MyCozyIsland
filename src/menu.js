import { MENU_DOMAIN_REGISTRY, MENU_SCENE_RECIPE } from "./menu/menu-scene-recipe.js";
import { createMenuThreeRenderer } from "./menu/menu-three-renderer.js";

const canvas = document.querySelector("#menu-scene");
const frame = document.querySelector("#game-preload");
const playButton = document.querySelector("#play");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

let gameReady = false;
let entering = false;
let preloadStarted = false;
let lastProgress = 0.01;
let menuRenderer = null;
let lastPointer = null;

if (!canvas) throw new Error("Missing #menu-scene canvas.");

function setProgress(progress) {
  lastProgress = Math.max(lastProgress, Math.max(0.01, Math.min(0.99, Number(progress) || 0.01)));
  const percent = Math.min(99, Math.max(1, Math.round(lastProgress * 100)));
  if (playButton && !gameReady) playButton.textContent = `Preparing ${percent}%`;
}

function markReady() {
  if (gameReady) return;
  gameReady = true;
  setProgress(0.99);
  if (playButton) {
    playButton.disabled = false;
    playButton.textContent = "Play";
    playButton.dataset.ready = "true";
  }
}

function reportFailure(error) {
  const message = String(error?.stack ?? error?.message ?? error ?? "My Cozy Island could not start.");
  console.error(error);
  if (playButton) {
    playButton.disabled = true;
    playButton.textContent = "Could Not Start";
    playButton.title = message;
    playButton.setAttribute("aria-label", `Could not start My Cozy Island: ${message}`);
  }
}

function startPreload() {
  if (preloadStarted || !frame) return;
  preloadStarted = true;
  frame.src = "./game.html?preload=1";
  setProgress(0.02);
}

function revealGame() {
  if (entering || !frame) return;
  entering = true;
  document.body.classList.add("is-entering");
  frame.removeAttribute("aria-hidden");
  frame.tabIndex = 0;
  frame.style.pointerEvents = "auto";
  try {
    history.replaceState({ scene: "game" }, "", "./game.html");
  } catch {}

  setTimeout(() => {
    frame.contentWindow?.focus();
    frame.contentDocument?.querySelector("#game")?.focus?.();
    menuRenderer?.dispose();
  }, reducedMotion ? 0 : 780);
}

function requestEntry() {
  if (!gameReady || entering || !frame?.contentWindow) return;
  if (playButton) {
    playButton.disabled = true;
    playButton.textContent = "Entering";
  }
  menuRenderer?.setFocus(true);
  frame.contentWindow.postMessage({ type: "cozy-game-enter" }, location.origin);
  setTimeout(() => {
    if (!entering) revealGame();
  }, 900);
}

function handlePointer(event) {
  if (!menuRenderer) return;
  const rect = canvas.getBoundingClientRect();
  const normalizedX = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
  const normalizedY = -(((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
  const now = performance.now();
  let energy = 0;
  if (lastPointer) {
    const dx = event.clientX - lastPointer.x;
    const dy = event.clientY - lastPointer.y;
    const dt = Math.max(8, now - lastPointer.time);
    energy = Math.min(1, Math.hypot(dx, dy) / dt * 0.12);
  }
  lastPointer = { x: event.clientX, y: event.clientY, time: now };
  menuRenderer.setPointer(normalizedX, normalizedY, energy);
}

addEventListener("message", (event) => {
  if (event.source !== frame?.contentWindow || event.origin !== location.origin) return;
  const message = event.data ?? {};
  if (message.type === "cozy-game-progress") {
    setProgress(message.progress);
  } else if (message.type === "cozy-game-ready") {
    markReady();
  } else if (message.type === "cozy-game-entered") {
    revealGame();
  } else if (message.type === "cozy-game-failed") {
    reportFailure(message.error ?? "My Cozy Island could not start.");
  }
});

playButton?.addEventListener("click", requestEntry);
playButton?.addEventListener("pointerenter", () => menuRenderer?.setFocus(true));
playButton?.addEventListener("pointerleave", () => menuRenderer?.setFocus(false));
canvas.addEventListener("pointermove", handlePointer, { passive: true });
canvas.addEventListener("pointerleave", () => {
  lastPointer = null;
  menuRenderer?.setPointer(0, 0, 0);
});

addEventListener("keydown", (event) => {
  if ((event.code === "Enter" || event.code === "Space") && gameReady && !entering) {
    event.preventDefault();
    requestEntry();
  }
});

addEventListener("visibilitychange", () => {
  menuRenderer?.setActive(!document.hidden && !entering);
});

async function main() {
  menuRenderer = await createMenuThreeRenderer({
    canvas,
    recipe: MENU_SCENE_RECIPE,
    reducedMotion
  });
  menuRenderer.camera.position.set(...MENU_SCENE_RECIPE.camera.position);
  menuRenderer.camera.lookAt(...MENU_SCENE_RECIPE.camera.target);

  globalThis.CozyMenu = Object.freeze({
    ...menuRenderer,
    recipe: MENU_SCENE_RECIPE,
    domains: MENU_DOMAIN_REGISTRY,
    getProgress: () => lastProgress,
    requestEntry
  });

  requestAnimationFrame(() => {
    const schedule = globalThis.requestIdleCallback
      ? (callback) => requestIdleCallback(callback, { timeout: 450 })
      : (callback) => setTimeout(callback, 80);
    schedule(startPreload);
  });
}

main().catch(reportFailure);
