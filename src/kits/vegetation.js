import { clamp01, createRng, hashUnit, smoothstep, TAU } from "./determinism.js";
import { createPathNetwork } from "./terrain.js";

export function createVegetationArchetypeCatalog() {
  const archetypes = {
    "broadleaf-tree": { id: "broadleaf-tree", family: "tree", minScale: 0.76, maxScale: 1.3, height: 10.5, canopy: 3.8, slopeLimit: 0.42, spacing: 5.4, wind: 0.42 },
    "palm-tree": { id: "palm-tree", family: "palm", minScale: 0.72, maxScale: 1.22, height: 9.2, canopy: 3.2, slopeLimit: 0.34, spacing: 5.2, wind: 0.72 },
    "sapling": { id: "sapling", family: "tree", minScale: 0.45, maxScale: 0.78, height: 5.4, canopy: 1.8, slopeLimit: 0.45, spacing: 3.2, wind: 0.65 },
    "bush": { id: "bush", family: "shrub", minScale: 0.55, maxScale: 1.2, height: 1.7, canopy: 1.5, slopeLimit: 0.5, spacing: 1.9, wind: 0.55 },
    "fern": { id: "fern", family: "ground", minScale: 0.48, maxScale: 1.05, height: 0.85, canopy: 0.75, slopeLimit: 0.52, spacing: 1.2, wind: 0.78 },
    "grass-patch": { id: "grass-patch", family: "grass", minScale: 0.6, maxScale: 1.34, height: 0.62, canopy: 0.55, slopeLimit: 0.58, spacing: 0.82, wind: 1 }
  };
  return Object.freeze(Object.fromEntries(Object.entries(archetypes).map(([id, value]) => [id, Object.freeze(value)])));
}

function distanceToSegmentSquared(point, from, to) {
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const lengthSquared = dx * dx + dz * dz || 1;
  const t = clamp01(((point.x - from.x) * dx + (point.z - from.z) * dz) / lengthSquared);
  const px = from.x + dx * t;
  const pz = from.z + dz * t;
  const ox = point.x - px;
  const oz = point.z - pz;
  return ox * ox + oz * oz;
}

export function createVegetationPlacementGraph({ surface, biomeField, archetypes, groundContact, seed = "cozy-vegetation", qualityTier = "medium" } = {}) {
  const random = createRng(seed);
  const pathNetwork = createPathNetwork(surface);
  const tierScale = { low: 0.58, medium: 0.82, high: 1, ultra: 1.2 }[qualityTier] ?? 0.82;
  const targets = {
    "broadleaf-tree": Math.round(68 * tierScale),
    "palm-tree": Math.round(28 * tierScale),
    sapling: Math.round(46 * tierScale),
    bush: Math.round(95 * tierScale),
    fern: Math.round(120 * tierScale),
    "grass-patch": Math.round(240 * tierScale)
  };
  const instances = [];
  const spatial = new Map();

  function cellKey(x, z, size) {
    return `${Math.floor(x / size)}:${Math.floor(z / size)}`;
  }

  function pathClearance(point) {
    let minimum = Infinity;
    for (const segment of pathNetwork.segments) {
      const distance = Math.sqrt(distanceToSegmentSquared(point, segment.from, segment.to));
      minimum = Math.min(minimum, distance - segment.width * 0.5);
    }
    return minimum;
  }

  function canPlace(point, spacing) {
    const size = spacing;
    const cx = Math.floor(point.x / size);
    const cz = Math.floor(point.z / size);
    for (let x = cx - 1; x <= cx + 1; x += 1) {
      for (let z = cz - 1; z <= cz + 1; z += 1) {
        const bucket = spatial.get(`${x}:${z}`);
        if (!bucket) continue;
        for (const existing of bucket) {
          const required = Math.max(spacing, existing.spacing) * 0.72;
          if (Math.hypot(point.x - existing.x, point.z - existing.z) < required) return false;
        }
      }
    }
    return true;
  }

  function addSpatial(instance, spacing) {
    const key = cellKey(instance.position.x, instance.position.z, spacing);
    const bucket = spatial.get(key) ?? [];
    bucket.push({ x: instance.position.x, z: instance.position.z, spacing });
    spatial.set(key, bucket);
  }

  function suitability(type, point, fields, biome) {
    const radial = Math.hypot(point.x, point.z);
    const clearingExclusion = smoothstep(surface.clearingRadius * 1.25, surface.clearingRadius * 2.25, radial);
    const pathDistance = pathClearance(point);
    const pathExclusion = smoothstep(1.2, 5.5, pathDistance);
    const coast = fields.shoreDistance;
    if (type === "palm-tree") {
      const coastal = smoothstep(4, 14, coast) * (1 - smoothstep(24, 38, coast));
      return coastal * (1 - fields.slope) * pathExclusion;
    }
    if (type === "broadleaf-tree") return biome.grass * (0.45 + biome.forestFloor * 2.2) * clearingExclusion * pathExclusion * (1 - fields.slope * 1.4);
    if (type === "sapling") return biome.grass * fields.moisture * clearingExclusion * pathExclusion * (1 - fields.slope);
    if (type === "bush") return biome.grass * (0.55 + fields.moisture * 0.55) * clearingExclusion * pathExclusion * (1 - fields.slope * 0.8);
    if (type === "fern") return (biome.forestFloor * 2.5 + biome.moss * 2 + biome.grass * 0.32) * clearingExclusion * pathExclusion * (1 - fields.exposure * 0.42);
    if (type === "grass-patch") return biome.grass * pathExclusion * (1 - fields.slope * 0.72) * (0.72 + clearingExclusion * 0.28);
    return 0;
  }

  for (const [type, target] of Object.entries(targets)) {
    const archetype = archetypes[type];
    let accepted = 0;
    const maxAttempts = target * 38;
    for (let attempt = 0; attempt < maxAttempts && accepted < target; attempt += 1) {
      const angle = random() * TAU;
      const radius = surface.radius * Math.sqrt(random()) * 0.96;
      const point = { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
      const fields = surface.sampleFields(point);
      const biome = biomeField.sample(point);
      if (fields.height <= 0.1 || fields.slope > archetype.slopeLimit) continue;
      const score = suitability(type, point, fields, biome);
      if (random() > Math.min(0.98, score * 2.15)) continue;
      const spacing = archetype.spacing * (0.85 + random() * 0.45);
      if (!canPlace(point, spacing)) continue;
      const contact = groundContact.seat(point, { maxSlope: archetype.slopeLimit, inset: type === "grass-patch" ? 0.015 : 0 });
      if (!contact) continue;
      const scale = archetype.minScale + random() * (archetype.maxScale - archetype.minScale);
      const instance = Object.freeze({
        id: `${type}:${accepted.toString(36)}:${Math.floor(hashUnit(seed, type, accepted) * 1e7).toString(36)}`,
        type,
        family: archetype.family,
        position: Object.freeze({ x: contact.x, y: contact.y, z: contact.z }),
        normal: contact.normal,
        rotation: random() * TAU,
        scale,
        phase: random() * TAU,
        tint: 0.86 + random() * 0.2
      });
      instances.push(instance);
      addSpatial(instance, spacing);
      accepted += 1;
    }
  }

  return Object.freeze({
    id: "vegetation-placement:cozy-island",
    seed,
    pathNetwork,
    instances: Object.freeze(instances),
    byType: Object.freeze(Object.groupBy ? Object.groupBy(instances, item => item.type) : instances.reduce((acc, item) => {
      (acc[item.type] ??= []).push(item);
      return acc;
    }, {}))
  });
}

export function createVegetationLodPolicy(quality = {}) {
  const tier = quality.tier ?? "medium";
  const scale = { low: 0.72, medium: 0.9, high: 1, ultra: 1.16 }[tier] ?? 0.9;
  return Object.freeze({
    id: `vegetation-lod:${tier}`,
    tree: Object.freeze({ near: 95 * scale, mid: 260 * scale, far: 620 * scale, cull: 900 * scale }),
    shrub: Object.freeze({ near: 55 * scale, mid: 150 * scale, far: 300 * scale, cull: 430 * scale }),
    grass: Object.freeze({ near: 38 * scale, mid: 90 * scale, far: 145 * scale, cull: 190 * scale })
  });
}

export function createRockGraph({ surface, groundContact, seed = "cozy-rocks", qualityTier = "medium" } = {}) {
  const random = createRng(seed);
  const target = Math.round(({ low: 38, medium: 58, high: 76, ultra: 92 }[qualityTier] ?? 58));
  const instances = [];
  for (let attempt = 0; attempt < target * 20 && instances.length < target; attempt += 1) {
    const angle = random() * TAU;
    const radius = surface.radius * (0.18 + random() * 0.8);
    const point = { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
    const fields = surface.sampleFields(point);
    const coastal = Math.abs(fields.shoreDistance) < 16;
    const suitability = coastal ? 0.56 : fields.rockExposure * 0.78 + fields.slope * 0.38;
    if (random() > suitability) continue;
    const contact = groundContact.seat(point, { maxSlope: 0.72, inset: -0.1 });
    if (!contact) continue;
    instances.push(Object.freeze({
      id: `rock:${instances.length.toString(36)}:${Math.floor(random() * 1e6).toString(36)}`,
      type: coastal ? "shore-rock" : "boulder",
      position: Object.freeze({ x: contact.x, y: contact.y, z: contact.z }),
      rotation: Object.freeze({ x: random() * 0.2, y: random() * TAU, z: random() * 0.16 }),
      scale: Object.freeze({ x: 0.8 + random() * 2.2, y: 0.65 + random() * 1.35, z: 0.75 + random() * 1.9 }),
      wetness: coastal ? 0.72 : 0.08
    }));
  }
  return Object.freeze({ id: "rock-graph:cozy-island", instances: Object.freeze(instances) });
}

export function createPropGraph(terrain, seed = "cozy-props") {
  const random = createRng(seed);
  const objects = [];
  const fenceRadius = terrain.clearingRadius * 1.14;
  const posts = 28;
  for (let index = 0; index < posts; index += 1) {
    const angle = index / posts * TAU;
    const radius = fenceRadius * (1 + Math.sin(angle * 5) * 0.025);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    objects.push(Object.freeze({
      id: `fence-post:${index}`,
      type: "fence-post",
      position: Object.freeze({ x, y: terrain.sampleHeight({ x, z }), z }),
      rotation: angle,
      scale: 0.9 + random() * 0.18
    }));
  }
  for (let index = 0; index < 9; index += 1) {
    const angle = random() * TAU;
    const radius = terrain.radius * (0.72 + random() * 0.18);
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    objects.push(Object.freeze({
      id: `driftwood:${index}`,
      type: "driftwood",
      position: Object.freeze({ x, y: terrain.sampleHeight({ x, z }) + 0.16, z }),
      rotation: angle + random() * 1.4,
      scale: 0.7 + random() * 1.25
    }));
  }
  return Object.freeze({ id: "prop-graph:cozy-island", objects: Object.freeze(objects), fenceRadius });
}

export function createCampfireAtmosphereDescriptor(terrain, windField) {
  const y = terrain.sampleHeight({ x: 0, z: 0 });
  const wind = windField?.getState?.() ?? { direction: { x: 0.8, y: 0, z: -0.2 }, strength: 0.5 };
  return Object.freeze({
    id: "campfire:central-clearing",
    position: Object.freeze({ x: 0, y, z: 0 }),
    radius: 1.55,
    flameHeight: 1.35,
    light: Object.freeze({ color: "#ffab55", intensity: 2.8, distance: 24 }),
    smoke: Object.freeze({ particleCount: 82, riseSpeed: 1.35, windDirection: wind.direction, windResponse: wind.strength * 0.82, lifespan: 7.5 })
  });
}
