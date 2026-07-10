import { clamp01, hashUnit, TAU } from "./determinism.js";

export function createCloudWeatherState(weather = {}, windField) {
  const wind = windField?.getState?.() ?? { direction: { x: 0.85, y: 0, z: -0.25 }, strength: 0.5, gust: 0.8 };
  return Object.freeze({
    id: "cloud-weather:cozy-sunrise",
    coverage: Number(weather.cloudCoverage ?? 0.68),
    density: Number(weather.cloudDensity ?? 0.74),
    humidity: Number(weather.humidity ?? 0.78),
    baseHeight: 142,
    topHeight: 410,
    drift: Object.freeze({ x: wind.direction.x, z: wind.direction.z }),
    driftSpeed: 4.2 + wind.strength * 3.8,
    evolutionRate: 0.028,
    anvilBias: 0.08,
    heroBankCenter: Object.freeze({ x: -28, y: 260, z: -330 })
  });
}

export function createCloudDensityRecipe(cloudWeather = {}, quality = {}) {
  const size = Number(quality.cloudTextureSize ?? ({ low: 48, medium: 64, high: 80, ultra: 96 }[quality.tier] ?? 64));
  const seed = String(cloudWeather.id ?? "cloud-density");
  return Object.freeze({
    id: "cloud-density-recipe:hero-bank",
    seed,
    textureSize: size,
    coverage: Number(cloudWeather.coverage ?? 0.68),
    density: Number(cloudWeather.density ?? 0.74),
    baseNoiseScale: 3.15,
    detailNoiseScale: 11.5,
    erosion: 0.36,
    threshold: 0.28,
    softness: 0.13,
    opacity: 0.14,
    verticalBottomSoftness: 0.18,
    verticalTopSoftness: 0.32,
    heroBounds: Object.freeze({ x: 820, y: 290, z: 330 }),
    heroPosition: cloudWeather.heroBankCenter ?? Object.freeze({ x: 0, y: 255, z: -330 }),
    lobeCenters: Object.freeze([
      Object.freeze({ x: -0.28, y: -0.08, z: 0.04, radius: 0.45 }),
      Object.freeze({ x: -0.08, y: 0.05, z: -0.03, radius: 0.5 }),
      Object.freeze({ x: 0.14, y: 0.02, z: 0.05, radius: 0.44 }),
      Object.freeze({ x: 0.3, y: -0.09, z: -0.03, radius: 0.39 }),
      Object.freeze({ x: -0.02, y: 0.22, z: 0.02, radius: 0.34 })
    ])
  });
}

export function createCloudLightingProfile(illuminationService) {
  const illumination = illuminationService?.getState?.() ?? {
    sunDirection: { x: -0.55, y: 0.78, z: -0.3 },
    sunColor: "#ffd3a0"
  };
  return Object.freeze({
    id: "cloud-lighting:cozy-sunrise",
    sunDirection: illumination.sunDirection,
    sunColor: illumination.sunColor,
    topColor: "#fff2cf",
    midColor: "#f5d4bd",
    undersideColor: "#8fb7b7",
    silverLiningColor: "#fff6d9",
    ambientColor: "#b7d6d0",
    extinction: 0.72,
    forwardScattering: 0.58,
    silverLining: 0.34,
    densityShadowStrength: 1.65
  });
}

export function createCloudLodPolicy(quality = {}) {
  const tier = quality.tier ?? "medium";
  const steps = Number(quality.cloudSteps ?? ({ low: 18, medium: 24, high: 30, ultra: 38 }[tier] ?? 24));
  return Object.freeze({
    id: `cloud-lod:${tier}`,
    steps,
    lightingSteps: tier === "low" ? 2 : tier === "medium" ? 3 : 4,
    earlyExitOpacity: 0.965,
    heroVolumeCount: tier === "low" ? 3 : 5,
    horizonVolumeCount: tier === "low" ? 4 : tier === "medium" ? 6 : 8,
    shadowUpdateHz: tier === "low" ? 1 : 2,
    resolutionScale: tier === "low" ? 0.36 : tier === "medium" ? 0.46 : 0.58
  });
}

export function createCloudShadowDescriptor(cloudWeather = {}, cloudLod = {}) {
  return Object.freeze({
    id: "cloud-shadow:cozy-island",
    opacity: 0.24,
    scale: 720,
    drift: cloudWeather.drift ?? { x: 0.8, z: -0.25 },
    driftSpeed: Number(cloudWeather.driftSpeed ?? 6),
    updateHz: Number(cloudLod.shadowUpdateHz ?? 2),
    blur: 0.68
  });
}

export function createCloudHorizonBandDescriptor(cloudWeather = {}) {
  const clouds = [];
  const count = 9;
  for (let index = 0; index < count; index += 1) {
    const t = index / count;
    const angle = (t * 0.72 + 0.12) * Math.PI;
    const distance = 620 + (index % 3) * 90;
    clouds.push(Object.freeze({
      id: `horizon-cloud:${index}`,
      position: Object.freeze({
        x: Math.cos(angle) * distance + (hashUnit(cloudWeather.id ?? "cloud", index) - 0.5) * 90,
        y: 118 + (index % 4) * 22,
        z: -430 - Math.sin(angle) * distance * 0.34
      }),
      scale: Object.freeze({ x: 180 + (index % 3) * 65, y: 72 + (index % 2) * 24, z: 110 + (index % 4) * 24 }),
      opacity: 0.26 + (index % 3) * 0.035,
      stepScale: 0.38
    }));
  }
  return Object.freeze({ id: "cloud-horizon-band:cozy-island", clouds: Object.freeze(clouds) });
}

export function createFogDensityRecipe(weather = {}, quality = {}) {
  const textureSize = Number(({ low: 32, medium: 48, high: 56, ultra: 64 }[quality.tier] ?? 48));
  return Object.freeze({
    id: "fog-density-recipe:rolling-island",
    seed: "rolling-fog:cozy-island",
    textureSize,
    baseDensity: Number(weather.fogDensity ?? 0.64),
    threshold: 0.34,
    softness: 0.18,
    heightFalloff: 0.026,
    baseHeight: 0,
    topHeight: 76,
    terrainAdherence: 0.78,
    shorelineMultiplier: 1.32,
    clearingSuppression: 0.46,
    noiseScale: 4.4,
    detailScale: 13.2,
    densityScale: 1.25
  });
}

export function createFogAdvectionDescriptor(windField) {
  const wind = windField?.getState?.() ?? { direction: { x: 0.8, y: 0, z: -0.3 }, strength: 0.5, turbulence: 0.2 };
  return Object.freeze({
    id: "fog-advection:cozy-island",
    direction: wind.direction,
    speed: 0.015 + wind.strength * 0.018,
    secondarySpeed: 0.006,
    curl: 0.18 + wind.turbulence * 0.42,
    dissipation: 0.018,
    phase: hashUnit("fog-advection", "phase") * TAU
  });
}

export function createFogVolumePlacement(fogDensity = {}) {
  return Object.freeze({
    id: "fog-volume-placement:cozy-island",
    position: Object.freeze({ x: 0, y: 25, z: 0 }),
    scale: Object.freeze({ x: 930, y: 110, z: 930 }),
    islandReadabilityRadius: 78,
    islandReadabilityFeather: 42,
    oceanBankBias: 0.72,
    topHeight: Number(fogDensity.topHeight ?? 76),
    bottomHeight: -8
  });
}
