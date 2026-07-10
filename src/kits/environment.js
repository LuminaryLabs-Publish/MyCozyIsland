import { clamp01, hashUnit, lerp, TAU } from "./determinism.js";

export function createEnvironmentClock(options = {}) {
  const initialSeconds = Number(options.initialSeconds ?? 48);
  let elapsedSeconds = initialSeconds;
  let timeScale = Number(options.timeScale ?? 1);
  let paused = Boolean(options.paused ?? false);

  return Object.freeze({
    tick(deltaSeconds = 0) {
      if (!paused) elapsedSeconds += Math.max(0, Number(deltaSeconds) || 0) * timeScale;
      return this.getState();
    },
    setTimeScale(nextScale) {
      timeScale = Math.max(0, Number(nextScale) || 0);
    },
    setPaused(value) {
      paused = Boolean(value);
    },
    reset() {
      elapsedSeconds = initialSeconds;
      paused = false;
    },
    getState() {
      return Object.freeze({ elapsedSeconds, timeScale, paused });
    }
  });
}

export function createWindField({ seedService, clock } = {}) {
  const seed = seedService?.seed ?? "cozy-island-wind";
  const baseAngle = -0.62 + hashUnit(seed, "direction") * 0.28;
  const baseStrength = 0.42 + hashUnit(seed, "strength") * 0.16;

  function sample(position = { x: 0, y: 0, z: 0 }) {
    const elapsed = clock?.getState?.().elapsedSeconds ?? 0;
    const spatial = Math.sin((Number(position.x ?? 0) + Number(position.z ?? 0) * 0.71) * 0.018 + elapsed * 0.045);
    const gust = 0.72 + 0.28 * Math.sin(elapsed * 0.17 + spatial * 1.7);
    const angle = baseAngle + Math.sin(elapsed * 0.031) * 0.08 + spatial * 0.03;
    const strength = baseStrength * gust;
    return Object.freeze({
      direction: Object.freeze({ x: Math.cos(angle), y: 0.035 + spatial * 0.015, z: Math.sin(angle) }),
      strength,
      gust,
      turbulence: 0.18 + Math.abs(spatial) * 0.12
    });
  }

  return Object.freeze({
    seed,
    sample,
    getState() {
      const center = sample({ x: 0, y: 0, z: 0 });
      return Object.freeze({ ...center, seed });
    }
  });
}

export function createWeatherState(options = {}) {
  const preset = String(options.preset ?? "sunrise-haze");
  const presets = {
    "sunrise-haze": {
      humidity: 0.78,
      haze: 0.58,
      cloudCoverage: 0.68,
      cloudDensity: 0.74,
      fogDensity: 0.64,
      precipitation: 0,
      warmth: 0.88
    },
    clear: {
      humidity: 0.42,
      haze: 0.22,
      cloudCoverage: 0.28,
      cloudDensity: 0.46,
      fogDensity: 0.2,
      precipitation: 0,
      warmth: 0.72
    },
    overcast: {
      humidity: 0.91,
      haze: 0.74,
      cloudCoverage: 0.96,
      cloudDensity: 0.9,
      fogDensity: 0.8,
      precipitation: 0.08,
      warmth: 0.4
    }
  };
  return Object.freeze({ id: `weather:${preset}`, preset, ...(presets[preset] ?? presets["sunrise-haze"]) });
}

export function createIlluminationState({ clock, weather } = {}) {
  function getState() {
    const elapsed = clock?.getState?.().elapsedSeconds ?? 48;
    const phase = ((elapsed / 900) % 1 + 1) % 1;
    const sunAngle = -0.78 + phase * 0.12;
    const warmth = Number(weather?.warmth ?? 0.82);
    const horizonBlend = clamp01(Number(weather?.haze ?? 0.5));
    return Object.freeze({
      id: "illumination:cozy-sunrise",
      sunDirection: Object.freeze({ x: Math.cos(sunAngle) * -0.52, y: 0.78, z: Math.sin(sunAngle) * 0.46 }),
      sunColor: "#ffd29e",
      sunIntensity: lerp(3.15, 4.25, warmth),
      ambientIntensity: lerp(1.18, 1.62, 1 - horizonBlend * 0.45),
      skyTop: "#f2b98d",
      skyHorizon: "#f8d4ad",
      oceanHorizon: "#8bd6cc",
      shadowTint: "#476f70",
      exposure: lerp(1.02, 1.15, warmth)
    });
  }

  return Object.freeze({ getState });
}

export function createAerialPerspectiveDescriptor(options = {}) {
  return Object.freeze({
    id: "aerial-perspective:cozy-sunrise",
    nearStart: Number(options.nearStart ?? 180),
    farEnd: Number(options.farEnd ?? 1900),
    horizonTint: options.horizonTint ?? "#e9c9a8",
    extinction: Number(options.extinction ?? 0.00092),
    heightFalloff: Number(options.heightFalloff ?? 0.015),
    sunBloom: Number(options.sunBloom ?? 0.22)
  });
}

export function createVegetationWindDescriptor(windField) {
  const state = windField?.getState?.() ?? {
    direction: { x: 0.8, y: 0, z: -0.3 },
    strength: 0.5,
    gust: 0.8,
    turbulence: 0.2
  };
  return Object.freeze({
    id: "vegetation-wind:cozy-island",
    direction: state.direction,
    strength: state.strength,
    gust: state.gust,
    turbulence: state.turbulence,
    bendFrequency: 0.72,
    rootStiffness: 0.86,
    phaseSpread: TAU
  });
}
