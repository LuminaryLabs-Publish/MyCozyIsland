import { clamp } from "./determinism.js";

export function chooseRenderQuality({ backend = "webgpu", override } = {}) {
  let requested = override;
  if (!requested && typeof globalThis.location !== "undefined") {
    requested = new URLSearchParams(globalThis.location.search).get("quality") ?? undefined;
  }
  const allowed = new Set(["low", "medium", "high", "ultra"]);
  if (requested && allowed.has(requested)) return makeQuality(requested, backend, "url-override");

  const memory = Number(globalThis.navigator?.deviceMemory ?? 4);
  const width = Number(globalThis.innerWidth ?? 1280);
  const height = Number(globalThis.innerHeight ?? 720);
  const pixels = width * height;
  const dpr = Number(globalThis.devicePixelRatio ?? 1);
  const reducedMotion = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  let tier = "high";
  if (backend !== "webgpu") tier = "low";
  else if (memory <= 4 || pixels * dpr * dpr > 4_800_000 || reducedMotion) tier = "medium";
  else if (memory >= 12 && pixels * dpr * dpr < 3_000_000) tier = "ultra";
  return makeQuality(tier, backend, "capability-policy");
}

function makeQuality(tier, backend, source) {
  const table = {
    low: {
      pixelRatioCap: 1,
      shadowMapSize: 1024,
      fogResolutionScale: 0.22,
      fogSteps: 7,
      cloudSteps: 18,
      cloudTextureSize: 48,
      oceanSegments: 72,
      terrainResolution: 129,
      vegetationScale: 0.58,
      postBlur: 0.72,
      targetFrameMs: 22.5
    },
    medium: {
      pixelRatioCap: 1.25,
      shadowMapSize: 1536,
      fogResolutionScale: 0.28,
      fogSteps: 9,
      cloudSteps: 24,
      cloudTextureSize: 64,
      oceanSegments: 96,
      terrainResolution: 161,
      vegetationScale: 0.82,
      postBlur: 0.62,
      targetFrameMs: 18.5
    },
    high: {
      pixelRatioCap: 1.5,
      shadowMapSize: 2048,
      fogResolutionScale: 0.34,
      fogSteps: 12,
      cloudSteps: 30,
      cloudTextureSize: 80,
      oceanSegments: 128,
      terrainResolution: 193,
      vegetationScale: 1,
      postBlur: 0.54,
      targetFrameMs: 16.9
    },
    ultra: {
      pixelRatioCap: 1.75,
      shadowMapSize: 3072,
      fogResolutionScale: 0.42,
      fogSteps: 15,
      cloudSteps: 38,
      cloudTextureSize: 96,
      oceanSegments: 160,
      terrainResolution: 225,
      vegetationScale: 1.18,
      postBlur: 0.48,
      targetFrameMs: 16.4
    }
  };
  const config = table[tier] ?? table.medium;
  return Object.freeze({ id: `render-quality:${tier}`, tier, backend, source, ...config });
}

export function createStylizedMaterialCatalog() {
  const materials = {
    "terrain-grass": { color: "#69ae55", shadowTint: "#3d7053", roughness: 0.88, rim: 0.12, outline: "none" },
    "terrain-soil": { color: "#ad8a64", shadowTint: "#715c55", roughness: 0.96, rim: 0.04, outline: "none" },
    "terrain-sand": { color: "#f4d6a0", shadowTint: "#c4ad83", roughness: 0.83, rim: 0.08, outline: "none" },
    "terrain-wet-sand": { color: "#d1ae79", shadowTint: "#8b8c76", roughness: 0.54, rim: 0.18, outline: "none" },
    "terrain-rock": { color: "#7b8179", shadowTint: "#4e6468", roughness: 0.82, rim: 0.18, outline: "medium" },
    bark: { color: "#7c4f32", shadowTint: "#4d3b36", roughness: 0.9, rim: 0.08, outline: "thin" },
    leaf: { color: "#4da45a", shadowTint: "#2f6750", roughness: 0.72, rim: 0.24, outline: "thin" },
    palm: { color: "#55aa61", shadowTint: "#2d7656", roughness: 0.7, rim: 0.28, outline: "thin" },
    grass: { color: "#72bd5a", shadowTint: "#427c4f", roughness: 0.8, rim: 0.18, outline: "none" },
    wood: { color: "#875d3d", shadowTint: "#55413a", roughness: 0.92, rim: 0.06, outline: "thin" },
    stone: { color: "#777d77", shadowTint: "#526469", roughness: 0.82, rim: 0.17, outline: "medium" },
    fire: { color: "#ffb347", emissive: "#ff742e", roughness: 0.22, rim: 0.5, outline: "none" }
  };
  return Object.freeze(Object.fromEntries(Object.entries(materials).map(([key, value]) => [key, Object.freeze(value)])));
}

export function createRenderArchetypeCatalog() {
  return Object.freeze({
    "broadleaf-tree": Object.freeze({ geometry: "procedural-tree", material: "leaf", trunkMaterial: "bark", castShadow: true, instanced: true }),
    "palm-tree": Object.freeze({ geometry: "procedural-palm", material: "palm", trunkMaterial: "bark", castShadow: true, instanced: true }),
    sapling: Object.freeze({ geometry: "procedural-sapling", material: "leaf", trunkMaterial: "bark", castShadow: true, instanced: true }),
    bush: Object.freeze({ geometry: "canopy-cluster", material: "leaf", castShadow: true, instanced: true }),
    fern: Object.freeze({ geometry: "fern-star", material: "leaf", castShadow: false, instanced: true }),
    "grass-patch": Object.freeze({ geometry: "grass-patch", material: "grass", castShadow: false, instanced: true }),
    boulder: Object.freeze({ geometry: "deformed-icosphere", material: "stone", castShadow: true, instanced: true }),
    "shore-rock": Object.freeze({ geometry: "deformed-icosphere", material: "stone", castShadow: true, instanced: true }),
    "fence-post": Object.freeze({ geometry: "tapered-post", material: "wood", castShadow: true, instanced: false }),
    driftwood: Object.freeze({ geometry: "bent-log", material: "wood", castShadow: true, instanced: false })
  });
}

export function createRenderSnapshot(descriptors = {}) {
  return Object.freeze({
    id: "render-snapshot:cozy-island-webgpu-v2",
    world: Object.freeze({ id: "world:cozy-island-webgpu-v2", seed: descriptors.seed }),
    ...descriptors
  });
}

export function createWebGL2FallbackPolicy() {
  return Object.freeze({
    id: "webgl2-fallback:cozy-island",
    compute: false,
    volumeSource: "deterministic-cpu-data3dtexture",
    cloudStepScale: 0.62,
    fogStepScale: 0.58,
    pixelRatioCap: 1,
    disableFeatures: Object.freeze(["timestamp-query", "compute-updated-volume"])
  });
}

export function createPerformanceBudget({ quality = {}, onDegrade, onRecover } = {}) {
  const target = Number(quality.targetFrameMs ?? 18.5);
  let movingAverage = target;
  let level = 0;
  let overBudgetFrames = 0;
  let underBudgetFrames = 0;
  let fps = 1000 / target;

  function sample(frameMs) {
    const value = clamp(Number(frameMs) || target, 1, 100);
    movingAverage = movingAverage * 0.93 + value * 0.07;
    fps = 1000 / Math.max(1, movingAverage);
    if (movingAverage > target * 1.26) {
      overBudgetFrames += 1;
      underBudgetFrames = 0;
      if (overBudgetFrames >= 90 && level < 2) {
        level += 1;
        overBudgetFrames = 0;
        onDegrade?.({ level, movingAverage, target });
      }
    } else if (movingAverage < target * 0.86) {
      underBudgetFrames += 1;
      overBudgetFrames = 0;
      if (underBudgetFrames >= 360 && level > 0) {
        level -= 1;
        underBudgetFrames = 0;
        onRecover?.({ level, movingAverage, target });
      }
    } else {
      overBudgetFrames = Math.max(0, overBudgetFrames - 1);
      underBudgetFrames = Math.max(0, underBudgetFrames - 1);
    }
  }

  return Object.freeze({
    sample,
    getState() {
      return Object.freeze({ level, movingAverage, fps, target });
    }
  });
}

export function createDebugOverlay(root) {
  let visible = false;
  function draw(state = {}) {
    if (!root || !visible) return;
    root.textContent = [
      `Backend  ${state.backend ?? "unknown"}`,
      `Quality  ${state.quality ?? "unknown"}`,
      `FPS      ${Number(state.fps ?? 0).toFixed(1)}`,
      `Cloud    ${state.cloudSteps ?? "-"} steps`,
      `Fog      ${state.fogSteps ?? "-"} steps`,
      `Domains  ${state.kitCount ?? "-"}`
    ].join("\n");
  }
  return Object.freeze({
    draw,
    toggle() {
      visible = !visible;
      if (root) root.hidden = !visible;
      return visible;
    },
    show() {
      visible = true;
      if (root) root.hidden = false;
    },
    hide() {
      visible = false;
      if (root) root.hidden = true;
    }
  });
}
