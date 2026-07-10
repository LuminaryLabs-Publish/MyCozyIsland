import { clamp01, hashUnit, lerp, smoothstep, TAU } from "./determinism.js";

export function createOceanFloorProfile(terrain) {
  const size = terrain.radius * 18;
  function sampleHeight(point = {}) {
    const x = Number(point.x ?? 0);
    const z = Number(point.z ?? 0);
    const distance = Math.hypot(x, z);
    const shelfStart = terrain.radius * 0.92;
    const shelfEnd = terrain.radius * 1.65;
    const deepStart = terrain.radius * 3.4;
    const shelfBlend = smoothstep(shelfStart, shelfEnd, distance);
    const deepBlend = smoothstep(shelfEnd, deepStart, distance);
    const islandMound = lerp(-3.2, -20, shelfBlend);
    const deep = lerp(islandMound, -92, deepBlend);
    const undulation = Math.sin(x * 0.018) * Math.cos(z * 0.016) * 3.8 * deepBlend;
    return deep + undulation;
  }
  return Object.freeze({
    id: "ocean-floor:cozy-island",
    size,
    baseDepth: -92,
    shelfDepth: -8,
    sampleHeight
  });
}

export function createOceanWaveState(options = {}) {
  const waves = Object.freeze([
    Object.freeze({ direction: { x: 0.82, z: -0.57 }, amplitude: 0.62, wavelength: 31, speed: 0.72, steepness: 0.18 }),
    Object.freeze({ direction: { x: -0.24, z: -0.97 }, amplitude: 0.32, wavelength: 15, speed: 0.94, steepness: 0.14 }),
    Object.freeze({ direction: { x: 0.55, z: 0.83 }, amplitude: 0.18, wavelength: 7.2, speed: 1.22, steepness: 0.1 }),
    Object.freeze({ direction: { x: -0.91, z: 0.41 }, amplitude: 0.09, wavelength: 3.8, speed: 1.65, steepness: 0.06 })
  ]);
  return Object.freeze({
    id: "ocean-wave:cozy-island",
    seaLevel: Number(options.seaLevel ?? 0),
    waves,
    foamThreshold: 0.62,
    current: Object.freeze({ x: 0.11, z: -0.045 })
  });
}

export function createOceanOpticsDescriptor(options = {}) {
  return Object.freeze({
    id: "ocean-optics:cozy-island",
    deepColor: options.deepColor ?? "#1f8f9d",
    midColor: options.midColor ?? "#42b9b0",
    shallowColor: options.shallowColor ?? "#82d9c7",
    absorptionDistance: Number(options.absorptionDistance ?? 23),
    refractionStrength: Number(options.refractionStrength ?? 0.085),
    roughness: Number(options.roughness ?? 0.18),
    metalness: Number(options.metalness ?? 0.08),
    clearcoat: Number(options.clearcoat ?? 0.84),
    clearcoatRoughness: Number(options.clearcoatRoughness ?? 0.16),
    opacity: Number(options.opacity ?? 0.76)
  });
}

export function createUnderwaterAtmosphereDescriptor() {
  return Object.freeze({
    id: "underwater-atmosphere:cozy-island",
    color: "#2d9e9e",
    density: 0.038,
    causticAttenuation: 0.76,
    transitionDepth: 0.45,
    maxVisibility: 84
  });
}

export function createOceanCausticsDescriptor() {
  return Object.freeze({
    id: "ocean-caustics:cozy-island",
    enabled: true,
    scale: 0.095,
    speed: 0.22,
    intensity: 0.34,
    shallowCutoff: 18
  });
}

export function createSunGlitterDescriptor() {
  return Object.freeze({
    id: "sun-glitter:cozy-island",
    intensity: 0.52,
    exponent: 92,
    width: 0.14,
    tint: "#ffe8b0"
  });
}

function contourFromTerrain(terrain, segments, offset, phase = 0) {
  return Object.freeze(Array.from({ length: segments }, (_, index) => {
    const angle = index / segments * TAU;
    const irregular = Math.sin(angle * 9 + phase) * 0.7 + Math.sin(angle * 17 - phase * 0.6) * 0.34;
    const radius = terrain.coastRadius(angle) + offset + irregular;
    return Object.freeze({ x: Math.cos(angle) * radius, y: terrain.seaLevel + 0.12 + offset * 0.002, z: Math.sin(angle) * radius, angle });
  }));
}

export function createShorelineFoamDescriptor(terrain, options = {}) {
  const segments = Math.max(96, Number(options.segments ?? 256));
  const bands = Object.freeze([
    Object.freeze({ id: "foam:contact", width: 1.9, opacity: 0.72, speed: 0.33, phase: 0.2, points: contourFromTerrain(terrain, segments, 0.8, 0.4) }),
    Object.freeze({ id: "foam:breaker", width: 1.35, opacity: 0.54, speed: 0.5, phase: 1.6, points: contourFromTerrain(terrain, segments, 3.4, 1.2) }),
    Object.freeze({ id: "foam:outer", width: 0.85, opacity: 0.34, speed: 0.68, phase: 2.8, points: contourFromTerrain(terrain, segments, 6.2, 2.1) })
  ]);
  return Object.freeze({
    id: "shoreline-foam:cozy-island",
    bands,
    breakupScale: 0.085,
    decay: 0.54,
    advection: Object.freeze({ x: 0.12, z: -0.05 })
  });
}
