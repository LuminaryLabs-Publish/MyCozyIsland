const canvas = document.querySelector("#menu-scene");
const context = canvas?.getContext("2d", { alpha: false });
const frame = document.querySelector("#game-preload");
const playButton = document.querySelector("#play");
const progressFill = document.querySelector("#preload-fill");
const progressLabel = document.querySelector("#preload-label");
const progressPercent = document.querySelector("#preload-percent");
const errorPanel = document.querySelector("#menu-error");

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let sceneRunning = true;
let gameReady = false;
let entering = false;
let preloadStarted = false;
let lastReportedProgress = 0.01;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

function resizeCanvas() {
  if (!canvas || !context) return;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(innerWidth * ratio));
  canvas.height = Math.max(1, Math.floor(innerHeight * ratio));
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function roundedCloud(x, y, scale, alpha) {
  context.save();
  context.globalAlpha = alpha;
  context.fillStyle = "#fff8dd";
  context.beginPath();
  context.ellipse(x - 42 * scale, y + 4 * scale, 48 * scale, 20 * scale, 0, 0, Math.PI * 2);
  context.ellipse(x, y - 7 * scale, 62 * scale, 30 * scale, 0, 0, Math.PI * 2);
  context.ellipse(x + 51 * scale, y + 5 * scale, 49 * scale, 21 * scale, 0, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function drawPalm(time, width, height) {
  const baseX = width * 0.76;
  const baseY = height * 0.9;
  const trunkHeight = Math.min(height * 0.58, 440);
  const topX = baseX - trunkHeight * 0.16;
  const topY = baseY - trunkHeight;
  const sway = reducedMotion ? 0 : Math.sin(time * 0.00055) * 0.075;

  context.save();
  context.lineCap = "round";
  context.strokeStyle = "#7a5a3f";
  context.lineWidth = Math.max(17, width * 0.015);
  context.beginPath();
  context.moveTo(baseX, baseY);
  context.bezierCurveTo(baseX - 10, baseY - trunkHeight * 0.36, topX + 22, topY + trunkHeight * 0.3, topX, topY);
  context.stroke();

  context.strokeStyle = "rgba(255,224,172,.22)";
  context.lineWidth = Math.max(4, width * 0.0034);
  context.beginPath();
  context.moveTo(baseX - 4, baseY - 4);
  context.bezierCurveTo(baseX - 8, baseY - trunkHeight * 0.36, topX + 13, topY + trunkHeight * 0.3, topX - 3, topY + 4);
  context.stroke();

  context.translate(topX, topY);
  context.rotate(sway);
  for (let index = 0; index < 9; index += 1) {
    const angle = -Math.PI * 0.92 + index * (Math.PI * 1.84 / 8);
    const length = 112 + (index % 3) * 18;
    context.save();
    context.rotate(angle);
    context.strokeStyle = index % 2 ? "#4d9460" : "#5ba96b";
    context.lineWidth = 15;
    context.beginPath();
    context.moveTo(0, 0);
    context.quadraticCurveTo(length * 0.45, -15, length, 18 + Math.sin(time * 0.0008 + index) * 5);
    context.stroke();
    context.strokeStyle = "rgba(224,246,167,.26)";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(6, -2);
    context.quadraticCurveTo(length * 0.46, -14, length - 5, 15);
    context.stroke();
    context.restore();
  }

  context.fillStyle = "#6e5037";
  for (let index = 0; index < 4; index += 1) {
    const angle = index / 4 * Math.PI * 2 + 0.4;
    context.beginPath();
    context.ellipse(Math.cos(angle) * 15, 14 + Math.sin(angle) * 8, 9, 13, angle, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
}

function drawScene(time = 0) {
  if (!context) return;
  const width = innerWidth;
  const height = innerHeight;
  const sky = context.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#ef9f70");
  sky.addColorStop(0.42, "#f4c98f");
  sky.addColorStop(0.72, "#91cdb9");
  sky.addColorStop(1, "#4f9b8e");
  context.fillStyle = sky;
  context.fillRect(0, 0, width, height);

  const sunX = width * 0.22;
  const sunY = height * 0.24;
  const sunRadius = Math.min(width, height) * 0.075;
  const glow = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 3.5);
  glow.addColorStop(0, "rgba(255,247,188,.98)");
  glow.addColorStop(0.22, "rgba(255,225,145,.68)");
  glow.addColorStop(1, "rgba(255,225,145,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#fff2b3";
  context.beginPath();
  context.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
  context.fill();

  const drift = reducedMotion ? 0 : (time * 0.008) % (width + 400);
  roundedCloud((width * 0.18 + drift * 0.16) % (width + 260) - 130, height * 0.18, 0.72, 0.48);
  roundedCloud((width * 0.62 + drift * 0.1) % (width + 360) - 180, height * 0.31, 1.08, 0.34);
  roundedCloud((width * 0.42 + drift * 0.07) % (width + 300) - 150, height * 0.1, 0.56, 0.28);

  context.fillStyle = "#3c8878";
  context.beginPath();
  context.moveTo(0, height * 0.68);
  context.quadraticCurveTo(width * 0.2, height * 0.57, width * 0.42, height * 0.68);
  context.quadraticCurveTo(width * 0.67, height * 0.78, width, height * 0.61);
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.closePath();
  context.fill();

  const sea = context.createLinearGradient(0, height * 0.64, 0, height);
  sea.addColorStop(0, "rgba(108,181,172,.7)");
  sea.addColorStop(1, "#397f78");
  context.fillStyle = sea;
  context.fillRect(0, height * 0.72, width, height * 0.28);

  context.fillStyle = "#6ca85d";
  context.beginPath();
  context.ellipse(width * 0.43, height * 0.74, width * 0.21, height * 0.08, -0.05, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "rgba(239,213,143,.72)";
  context.beginPath();
  context.ellipse(width * 0.43, height * 0.76, width * 0.22, height * 0.035, -0.05, 0, Math.PI * 2);
  context.fill();

  drawPalm(time, width, height);

  const vignette = context.createRadialGradient(width * 0.5, height * 0.45, Math.min(width, height) * 0.18, width * 0.5, height * 0.5, Math.max(width, height) * 0.72);
  vignette.addColorStop(0, "rgba(24,52,50,0)");
  vignette.addColorStop(1, "rgba(20,46,45,.2)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function animate(time) {
  drawScene(time);
  if (sceneRunning) requestAnimationFrame(animate);
}

function setProgress(progress, label) {
  lastReportedProgress = Math.max(lastReportedProgress, clamp(progress, 0.01, 0.99));
  const percent = Math.min(99, Math.max(1, Math.round(lastReportedProgress * 100)));
  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressPercent) progressPercent.textContent = `${percent}%`;
  if (progressLabel && label) progressLabel.textContent = label;
}

function reportFailure(message) {
  if (errorPanel) {
    errorPanel.hidden = false;
    errorPanel.textContent = String(message);
  }
  if (progressLabel) progressLabel.textContent = "The island could not wake";
  if (playButton) {
    playButton.disabled = true;
    playButton.textContent = "Could Not Start";
  }
}

function markReady(label = "Island ready") {
  if (gameReady) return;
  gameReady = true;
  setProgress(0.99, label);
  if (playButton) {
    playButton.disabled = false;
    playButton.textContent = "Play";
  }
}

function startPreload() {
  if (preloadStarted || !frame) return;
  preloadStarted = true;
  frame.src = "./game.html?preload=1";
  setProgress(0.02, "Waking the island");
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
    sceneRunning = false;
    frame.contentWindow?.focus();
    frame.contentDocument?.querySelector("#game")?.focus?.();
  }, reducedMotion ? 0 : 820);
}

function requestEntry() {
  if (!gameReady || entering || !frame?.contentWindow) return;
  if (playButton) {
    playButton.disabled = true;
    playButton.textContent = "Entering";
  }
  frame.contentWindow.postMessage({ type: "cozy-game-enter" }, location.origin);
  setTimeout(() => {
    if (!entering) revealGame();
  }, 900);
}

addEventListener("message", (event) => {
  if (event.source !== frame?.contentWindow) return;
  const message = event.data ?? {};
  if (message.type === "cozy-game-progress") {
    setProgress(message.progress, message.label);
  } else if (message.type === "cozy-game-ready") {
    markReady(message.label ?? "Island ready");
  } else if (message.type === "cozy-game-entered") {
    revealGame();
  } else if (message.type === "cozy-game-failed") {
    reportFailure(message.error ?? "My Cozy Island could not start.");
  }
});

playButton?.addEventListener("click", requestEntry);
addEventListener("keydown", (event) => {
  if ((event.code === "Enter" || event.code === "Space") && gameReady && !entering) {
    event.preventDefault();
    requestEntry();
  }
});
addEventListener("resize", resizeCanvas);
addEventListener("visibilitychange", () => {
  if (!document.hidden && sceneRunning) requestAnimationFrame(animate);
});

resizeCanvas();
requestAnimationFrame(animate);
requestAnimationFrame(() => {
  const schedule = globalThis.requestIdleCallback
    ? (callback) => requestIdleCallback(callback, { timeout: 450 })
    : (callback) => setTimeout(callback, 80);
  schedule(startPreload);
});
