const deepFreeze = (value) => {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const entry of Object.values(value)) deepFreeze(entry);
  return Object.freeze(value);
};

export const MENU_DOMAIN_REGISTRY = deepFreeze([
  { path: "n:entry:menu:scene", kind: "product-domain", owner: "menu scene state and entry transition" },
  { path: "n:entry:menu:composition", kind: "content-kit", owner: "rule-of-thirds composition and negative space" },
  { path: "n:entry:menu:camera", kind: "presentation-kit", owner: "camera descriptor and responsive framing" },
  { path: "n:entry:menu:hero-palm", kind: "object-domain", owner: "hero palm descriptor" },
  { path: "n:entry:menu:palm-material", kind: "renderer-kit", owner: "bark and alpha-cut frond shading" },
  { path: "n:entry:menu:palm-motion", kind: "renderer-kit", owner: "GPU vertex wind deformation" },
  { path: "n:entry:menu:sky", kind: "renderer-kit", owner: "sunset sky and sun presentation" },
  { path: "n:entry:menu:shoreline", kind: "renderer-kit", owner: "curved distant shoreline" },
  { path: "n:entry:menu:water", kind: "renderer-kit", owner: "opaque cozy wave strip and foam edge" },
  { path: "n:entry:menu:flowers", kind: "content-kit", owner: "batched soft flower accents" },
  { path: "n:entry:menu:particles", kind: "renderer-kit", owner: "batched wind motes, water sparkles, and petals" },
  { path: "n:entry:menu:lighting", kind: "renderer-kit", owner: "key, fill, rim, and contact-lighting policy" },
  { path: "n:entry:menu:atmosphere", kind: "renderer-kit", owner: "deep horizon haze and depth separation" },
  { path: "n:entry:menu:post-effects", kind: "renderer-kit", owner: "ACES exposure and direct final output" },
  { path: "n:entry:menu:play-gate", kind: "product-domain", owner: "ready state and player entry request" },
  { path: "n:entry:menu:game-preload", kind: "host-adapter", owner: "background game preparation and handoff" }
]);

export const MENU_SCENE_RECIPE = deepFreeze({
  id: "my-cozy-island.menu-scene.v5",
  taxonomy: [
    "MyCozyIsland",
    "Entry Experience",
    "Main Menu",
    "Menu Scene",
    "Tropical Postcard World",
    "Coastal Composition",
    "Hero Palm Focus",
    "Atmosphere and Motion",
    "High-Fidelity Presentation",
    "Final Player Entry"
  ],
  composition: {
    palmThird: -0.31,
    horizonThird: 0.37,
    buttonAnchor: "lower-center",
    negativeSpace: "right"
  },
  renderer: {
    dprCaps: { high: 1.45, balanced: 1.2, low: 1 },
    particles: {
      high: { wind: 64, sparkles: 28, petals: 14 },
      balanced: { wind: 40, sparkles: 18, petals: 9 },
      low: { wind: 20, sparkles: 9, petals: 4 }
    },
    waterSegments: { high: [48, 8], balanced: [36, 6], low: [24, 4] },
    horizonSegments: { high: 48, balanced: 36, low: 24 },
    frameRate: { preload: 24, idle: 30, interactive: 60, interactionMs: 900 }
  },
  camera: {
    fov: 35,
    near: 0.1,
    far: 120,
    position: [-5.55, 4.65, 13.6],
    target: [-0.75, -0.45, -1.5],
    parallax: [0.34, 0.2],
    lookParallax: [0.17, 0.1],
    portrait: {
      position: [-4.15, 4.1, 15.1],
      target: [-0.95, -0.75, -1.4],
      fov: 39,
      palmScale: 0.78,
      palmOffset: [0.25, 0.08, 0]
    },
    shortLandscape: {
      position: [-5.15, 4.2, 14.8],
      target: [-0.65, -0.65, -1.2],
      fov: 38,
      palmScale: 0.82,
      palmOffset: [0.18, -0.06, 0]
    }
  },
  sky: {
    zenith: "#5d91bd",
    upper: "#75b9c8",
    horizon: "#f3c8a4",
    lower: "#f5dfbd",
    sunsetBand: "#f29b79",
    background: "#9fcdd0",
    sunColor: "#fff1bd",
    sunGlow: "#ffd899",
    sunPosition: [-5.2, 4.15, -13.5],
    sunRadius: 1.05,
    glowRadius: 2.65
  },
  horizon: {
    fogColor: "#d9ddcd",
    fogNear: 12,
    fogFar: 32,
    layers: [
      { id: "far-haze", z: -18.5, y: -0.72, width: 34, depth: 3.4, color: "#a9c5b9", opacity: 0.3, amplitude: 0.23, frequency: 0.42, phase: 0.7 },
      { id: "far-islands", z: -16.2, y: -1.02, width: 31, depth: 2.7, color: "#6f9c86", opacity: 0.44, amplitude: 0.42, frequency: 0.54, phase: 1.9 },
      { id: "near-haze", z: -13.8, y: -1.38, width: 29, depth: 2.1, color: "#c8c89f", opacity: 0.36, amplitude: 0.18, frequency: 0.78, phase: 2.7 }
    ]
  },
  shoreline: {
    position: [0.4, -1.8, -10.9],
    width: 27,
    depth: 1.1,
    segments: 48,
    color: "#ead2a2",
    highlight: "#fff0c5",
    opacity: 0.66,
    curvature: 0.38
  },
  water: {
    position: [1.2, -2.2, -7.6],
    width: 32,
    depth: 14,
    nearColor: "#63b4ba",
    farColor: "#8bc9c3",
    highlightColor: "#d9f3df",
    roughness: 0.31,
    clearcoat: 0.58,
    waveA: { amplitude: 0.045, frequency: 0.72, speed: 0.31 },
    waveB: { amplitude: 0.024, frequency: 1.34, speed: -0.2 },
    foam: { width: 26, depth: 0.52, opacity: 0.3, position: [0.4, -1.98, -10.35] }
  },
  palm: {
    position: [-3.35, -2.12, -0.55],
    rotation: [0.02, -0.26, -0.02],
    scale: 0.9,
    trunkRadius: 0.31,
    trunkSegments: 44,
    radialSegments: 9,
    trunkPoints: [
      [0, 0, 0],
      [0.02, 0.82, 0.02],
      [0.1, 1.72, -0.02],
      [0.26, 2.62, 0.02],
      [0.48, 3.5, -0.02],
      [0.72, 4.28, 0]
    ],
    hubRadius: 0.36,
    fronds: {
      count: 8,
      variants: 4,
      cardSegments: 5,
      length: 2.86,
      width: 1.48,
      droop: 0.5,
      alphaTest: 0.46,
      windStrength: 0.095
    }
  },
  flowers: {
    opacity: 0.36,
    clusters: [
      { position: [-5.1, -1.5, -8.0], scale: 0.78, rotationY: 0.14, variant: 0 },
      { position: [0.4, -1.62, -8.65], scale: 0.62, rotationY: -0.08, variant: 1 },
      { position: [4.7, -1.53, -9.25], scale: 0.68, rotationY: -0.18, variant: 2 }
    ]
  },
  particles: {
    wind: {
      bounds: { x: [-8.5, 8.5], y: [-1.2, 5.4], z: [-8.5, 2.8] },
      colors: ["#fff2c6", "#d9f2cf", "#f7dfb8"],
      size: [2.0, 4.6],
      speed: [0.16, 0.38],
      motion: [0.48, 0.18, 0.3],
      opacity: [0.2, 0.42]
    },
    sparkles: {
      bounds: { x: [-8.0, 8.5], y: [-1.78, -1.5], z: [-10.2, -4.5] },
      colors: ["#fff8d5", "#e8f6dc", "#ffe8ad"],
      size: [1.5, 3.1],
      speed: [0.28, 0.62],
      motion: [0.18, 0.055, 0.12],
      opacity: [0.26, 0.58]
    },
    petals: {
      bounds: { x: [-6.5, 4.5], y: [-0.4, 4.8], z: [-5.5, 1.8] },
      colors: ["#f3b0bd", "#f4d57f", "#f2eee5"],
      size: [3.0, 6.0],
      speed: [0.1, 0.24],
      motion: [0.32, 0.24, 0.26],
      opacity: [0.25, 0.5]
    }
  },
  lighting: {
    hemisphere: { sky: "#e8f8f4", ground: "#827b5b", intensity: 1.55 },
    sun: { color: "#ffd7a0", intensity: 2.55, position: [-5.5, 7.8, 5.4] },
    fill: { color: "#bfe9df", intensity: 0.82, position: [5.5, 4.2, -4.2] },
    rim: { color: "#ffe9bd", intensity: 0.48, position: [-1.5, 5.5, -6.5] }
  },
  post: {
    exposure: 0.96
  },
  interaction: {
    pointerDamping: 0.075,
    windBoostDecay: 0.055,
    hoverWindBoost: 1.18,
    pointerWindBoost: 1.42
  }
});

export function chooseMenuQuality({ backend, width, height, devicePixelRatio, hardwareConcurrency }) {
  const shortestSide = Math.min(width, height);
  const pixelLoad = width * height * Math.min(devicePixelRatio || 1, 2);
  const constrained = shortestSide < 680 || hardwareConcurrency <= 4 || pixelLoad > 4_500_000;
  const tier = backend !== "webgpu" ? "low" : constrained ? "balanced" : "high";
  return deepFreeze({
    tier,
    dprCap: MENU_SCENE_RECIPE.renderer.dprCaps[tier],
    particles: MENU_SCENE_RECIPE.renderer.particles[tier],
    waterSegments: MENU_SCENE_RECIPE.renderer.waterSegments[tier],
    horizonSegments: MENU_SCENE_RECIPE.renderer.horizonSegments[tier],
    frameRate: MENU_SCENE_RECIPE.renderer.frameRate
  });
}
