import { clamp01, fbm2D, hashUnit, lerp, smoothstep, TAU } from "./determinism.js";

export function createTerrainSurface(options = {}) {
  const state = Object.freeze({
    id: options.id ?? "terrain:cozy-island-webgpu-v2",
    seed: String(options.seed ?? "cozy-island-webgpu-v2"),
    radius: Number(options.radius ?? 108),
    maxHeight: Number(options.maxHeight ?? 24),
    beachWidth: Number(options.beachWidth ?? 12),
    clearingRadius: Number(options.clearingRadius ?? 17),
    seaLevel: Number(options.seaLevel ?? 0)
  });

  function coastRadius(angle) {
    const warp = fbm2D(`${state.seed}:coast`, Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, {
      octaves: 4,
      frequency: 1,
      amplitude: 0.65,
      gain: 0.52
    });
    return state.radius * (1 + Math.sin(angle * 3 + 0.7) * 0.045 + Math.sin(angle * 7 - 1.2) * 0.032 + warp * 0.065);
  }

  function warpedCoordinates(x, z) {
    const wx = fbm2D(`${state.seed}:warp-x`, x * 0.009, z * 0.009, { octaves: 3, frequency: 1.1, amplitude: 0.5 });
    const wz = fbm2D(`${state.seed}:warp-z`, x * 0.009 + 17.4, z * 0.009 - 9.2, { octaves: 3, frequency: 1.1, amplitude: 0.5 });
    return { x: x + wx * 15, z: z + wz * 15 };
  }

  function naturalHeightAt(x, z) {
    const warped = warpedCoordinates(x, z);
    const angle = Math.atan2(warped.z, warped.x);
    const coast = coastRadius(angle);
    const distance = Math.hypot(warped.x, warped.z);
    const normalized = distance / coast;
    if (normalized >= 1) {
      const shelf = normalized - 1;
      return -1.8 - shelf * 20 - shelf * shelf * 26;
    }

    const radial = Math.pow(Math.max(0, 1 - Math.pow(normalized, 1.72)), 0.68);
    const broad = fbm2D(`${state.seed}:broad`, warped.x * 0.012, warped.z * 0.012, { octaves: 5, frequency: 1, amplitude: 0.58, gain: 0.51 });
    const ridgeNoise = fbm2D(`${state.seed}:ridge`, warped.x * 0.023, warped.z * 0.023, { octaves: 4, frequency: 1, amplitude: 0.52, gain: 0.53 });
    const ridge = 1 - Math.abs(ridgeNoise);
    const mound = radial * state.maxHeight;
    const terrainDetail = broad * 4.2 * radial + ridge * ridge * 2.1 * radial;
    return Math.max(0, mound + terrainDetail);
  }

  const clearingSampleRadius = state.clearingRadius * 1.32;
  const clearingSampleCount = 12;
  const clearingPlateauHeight = Array.from({ length: clearingSampleCount }, (_, index) => {
    const angle = index / clearingSampleCount * TAU;
    return naturalHeightAt(Math.cos(angle) * clearingSampleRadius, Math.sin(angle) * clearingSampleRadius);
  }).reduce((sum, height) => sum + height, 0) / clearingSampleCount;

  function rawHeight(point = {}) {
    const x = Number(point.x ?? 0);
    const z = Number(point.z ?? 0);
    const naturalHeight = naturalHeightAt(x, z);
    const radialDistance = Math.hypot(x, z);
    const clearingBlend = 1 - smoothstep(state.clearingRadius * 0.78, state.clearingRadius * 1.16, radialDistance);
    const surfaceVariation = fbm2D(`${state.seed}:clearing-surface`, x * 0.045, z * 0.045, {
      octaves: 2,
      frequency: 1,
      amplitude: 0.5,
      gain: 0.48
    }) * 0.14;
    const flattenedHeight = clearingPlateauHeight + surfaceVariation;
    return Math.max(0, lerp(naturalHeight, flattenedHeight, clearingBlend));
  }

  function sampleHeight(point = {}) {
    return rawHeight(point);
  }

  function sampleNormal(point = {}, epsilon = 0.75) {
    const x = Number(point.x ?? 0);
    const z = Number(point.z ?? 0);
    const left = rawHeight({ x: x - epsilon, z });
    const right = rawHeight({ x: x + epsilon, z });
    const down = rawHeight({ x, z: z - epsilon });
    const up = rawHeight({ x, z: z + epsilon });
    const nx = left - right;
    const ny = epsilon * 2;
    const nz = down - up;
    const length = Math.hypot(nx, ny, nz) || 1;
    return Object.freeze({ x: nx / length, y: ny / length, z: nz / length });
  }

  function sampleFields(point = {}) {
    const x = Number(point.x ?? 0);
    const z = Number(point.z ?? 0);
    const height = rawHeight({ x, z });
    const normal = sampleNormal({ x, z });
    const slope = clamp01(1 - normal.y);
    const angle = Math.atan2(z, x);
    const coast = coastRadius(angle);
    const radialDistance = Math.hypot(x, z);
    const shoreDistance = coast - radialDistance;
    const curvatureEpsilon = 2.2;
    const center = height;
    const neighbors = [
      rawHeight({ x: x - curvatureEpsilon, z }),
      rawHeight({ x: x + curvatureEpsilon, z }),
      rawHeight({ x, z: z - curvatureEpsilon }),
      rawHeight({ x, z: z + curvatureEpsilon })
    ];
    const curvature = clamp01(0.5 + ((neighbors.reduce((sum, value) => sum + value, 0) / 4) - center) * 0.08);
    const moistureNoise = fbm2D(`${state.seed}:moisture`, x * 0.018, z * 0.018, { octaves: 4, amplitude: 0.54 });
    const exposureNoise = fbm2D(`${state.seed}:exposure`, x * 0.015 + 40, z * 0.015 - 20, { octaves: 3, amplitude: 0.55 });
    const moisture = clamp01(0.55 + moistureNoise * 0.24 + curvature * 0.22 - slope * 0.18);
    const exposure = clamp01(0.5 + exposureNoise * 0.28 + slope * 0.24);
    const rockExposure = clamp01(smoothstep(0.08, 0.48, slope) * 0.72 + smoothstep(state.maxHeight * 0.64, state.maxHeight, height) * 0.55);
    return Object.freeze({
      height,
      normal,
      slope,
      curvature,
      moisture,
      exposure,
      rockExposure,
      shoreDistance,
      coastRadius: coast,
      water: height < state.seaLevel ? 1 : 0,
      clearing: 1 - smoothstep(state.clearingRadius, state.clearingRadius * 1.45, radialDistance)
    });
  }

  return Object.freeze({ ...state, coastRadius, sampleHeight, sampleNormal, sampleFields });
}

export function createTerrainBiomeField(surface) {
  function sample(point = {}) {
    const fields = surface.sampleFields(point);
    const shore = fields.shoreDistance;
    const wetSand = smoothstep(-1.5, 1.4, shore) * (1 - smoothstep(1.1, 4.2, shore));
    const drySand = smoothstep(0.6, 4.8, shore) * (1 - smoothstep(7.5, surface.beachWidth + 2, shore));
    const grassBase = smoothstep(surface.beachWidth - 2, surface.beachWidth + 6, shore) * (1 - fields.rockExposure * 0.76);
    const clearingSoil = smoothstep(0.18, 0.82, fields.clearing);
    const soil = clamp01(clearingSoil * 0.56 + fields.slope * 0.2) * (1 - wetSand);
    const forest = clamp01(grassBase * fields.moisture * (1 - fields.exposure * 0.34));
    const moss = clamp01(forest * fields.curvature * 0.75);
    const rock = clamp01(fields.rockExposure + smoothstep(surface.maxHeight * 0.7, surface.maxHeight, fields.height) * 0.35);
    const grass = clamp01(grassBase * (1 - soil * 0.68) * (1 - rock * 0.72));
    const total = Math.max(1e-6, wetSand + drySand + grass + soil + forest * 0.32 + moss * 0.2 + rock);
    return Object.freeze({
      wetSand: wetSand / total,
      drySand: drySand / total,
      grass: grass / total,
      soil: soil / total,
      forestFloor: (forest * 0.32) / total,
      moss: (moss * 0.2) / total,
      rock: rock / total
    });
  }

  return Object.freeze({ id: "terrain-biome-field:cozy-island", sample });
}

export function createShorelineField(surface) {
  function sample(point = {}) {
    const x = Number(point.x ?? 0);
    const z = Number(point.z ?? 0);
    const angle = Math.atan2(z, x);
    const coast = surface.coastRadius(angle);
    const distance = Math.hypot(x, z);
    const signedDistance = coast - distance;
    const breaker = clamp01(1 - Math.abs(signedDistance) / 7.5);
    const wetness = clamp01(1 - Math.max(0, signedDistance) / 5.5);
    const delta = 0.01;
    const coastBefore = surface.coastRadius(angle - delta);
    const coastAfter = surface.coastRadius(angle + delta);
    const tangent = {
      x: Math.cos(angle + delta) * coastAfter - Math.cos(angle - delta) * coastBefore,
      z: Math.sin(angle + delta) * coastAfter - Math.sin(angle - delta) * coastBefore
    };
    const tangentLength = Math.hypot(tangent.x, tangent.z) || 1;
    const normal = Object.freeze({ x: tangent.z / tangentLength, z: -tangent.x / tangentLength });
    return Object.freeze({ signedDistance, breaker, wetness, normal, coastRadius: coast });
  }

  function contour(segments = 256, offset = 0) {
    return Object.freeze(Array.from({ length: segments }, (_, index) => {
      const angle = index / segments * TAU;
      const radius = surface.coastRadius(angle) + offset;
      return Object.freeze({ x: Math.cos(angle) * radius, y: surface.seaLevel + 0.09, z: Math.sin(angle) * radius, angle });
    }));
  }

  return Object.freeze({ id: "shoreline-field:cozy-island", sample, contour });
}

export function createTerrainLodPolicy(quality = {}) {
  const tier = quality.tier ?? "medium";
  const resolutionByTier = { low: 129, medium: 161, high: 193, ultra: 225 };
  return Object.freeze({
    id: `terrain-lod:${tier}`,
    resolution: Number(quality.terrainResolution ?? resolutionByTier[tier] ?? 161),
    nearDetailDistance: tier === "low" ? 130 : 185,
    farCullDistance: 1350,
    shadowDistance: tier === "low" ? 220 : 360,
    materialDetail: tier === "low" ? 0.72 : tier === "medium" ? 0.88 : 1
  });
}

export function createGroundContactService(surface) {
  function seat(position = {}, options = {}) {
    const fields = surface.sampleFields(position);
    const maxSlope = Number(options.maxSlope ?? 0.58);
    if (fields.slope > maxSlope || fields.height < -0.1) return null;
    return Object.freeze({
      x: Number(position.x ?? 0),
      y: fields.height + Number(options.inset ?? 0),
      z: Number(position.z ?? 0),
      normal: fields.normal,
      slope: fields.slope
    });
  }
  return Object.freeze({ id: "ground-contact:cozy-island", seat });
}

export function createPathNetwork(surface) {
  const radius = surface.radius;
  const points = [
    { x: 0, z: radius * 0.88 },
    { x: -radius * 0.18, z: radius * 0.45 },
    { x: -radius * 0.22, z: radius * 0.2 },
    { x: 0, z: 0 }
  ];
  const loop = Array.from({ length: 18 }, (_, index) => {
    const angle = index / 18 * TAU;
    return { x: Math.cos(angle) * radius * 0.24, z: Math.sin(angle) * radius * 0.2 };
  });
  const segments = [];
  for (let index = 0; index < points.length - 1; index += 1) {
    segments.push({ id: `path:entry:${index}`, from: points[index], to: points[index + 1], width: 3.2 });
  }
  for (let index = 0; index < loop.length; index += 1) {
    segments.push({ id: `path:loop:${index}`, from: loop[index], to: loop[(index + 1) % loop.length], width: 2.6 });
  }
  return Object.freeze({ id: "path-network:cozy-island", segments: Object.freeze(segments) });
}
