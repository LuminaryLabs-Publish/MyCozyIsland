const TAU = Math.PI * 2;
function hashUnit(seed = "seed", ...parts) { let h = 2166136261; for (const ch of [seed, ...parts].join(":").toString()) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967295; }
function rng(seed) { let s = Math.floor(hashUnit(seed) * 0xffffffff) || 1; return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return (s >>> 0) / 0xffffffff; }; }
function noise(seed, x, z) { const xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi, u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf); const a = hashUnit(seed, xi, zi), b = hashUnit(seed, xi + 1, zi), c = hashUnit(seed, xi, zi + 1), d = hashUnit(seed, xi + 1, zi + 1); return (a + (b - a) * u) + ((c + (d - c) * u) - (a + (b - a) * u)) * v; }
function smooth(edge0, edge1, value) { const t = Math.max(0, Math.min(1, (value - edge0) / Math.max(0.00001, edge1 - edge0))); return t * t * (3 - 2 * t); }

export function createOceanFloorState(options = {}) {
  return {
    id: options.id ?? "ocean-floor",
    seed: String(options.seed ?? "cozy-ocean-floor"),
    size: Number(options.size ?? 3600),
    resolution: Number(options.resolution ?? 53),
    baseDepth: Number(options.baseDepth ?? -128),
    islandRadius: Number(options.islandRadius ?? 100),
    islandShelfRadius: Number(options.islandShelfRadius ?? 145),
    islandInfluenceRadius: Number(options.islandInfluenceRadius ?? 260),
    shelfDepth: Number(options.shelfDepth ?? -16),
    moundDepth: Number(options.moundDepth ?? -42),
    noiseAmplitude: Number(options.noiseAmplitude ?? 9),
    objects: { seaFloorRocks: 34, seaFloorBoulders: 12, reefClusters: 14, coralClusters: 18, ...(options.objects ?? {}) }
  };
}

export function sampleOceanFloorHeight(stateInput, point = {}) {
  const state = createOceanFloorState(stateInput);
  const x = Number(point.x ?? 0), z = Number(point.z ?? 0), d = Math.hypot(x, z);
  const broad = (noise(`${state.seed}:broad`, x * 0.0026, z * 0.0026) - 0.5) * state.noiseAmplitude * 1.25;
  const medium = (noise(`${state.seed}:medium`, x * 0.009, z * 0.009) - 0.5) * state.noiseAmplitude * 0.5;
  const base = state.baseDepth + broad + medium;
  const mound = smooth(state.islandInfluenceRadius, 0, d);
  const shelf = 1 - smooth(state.islandShelfRadius, state.islandInfluenceRadius, d);
  const moundFloor = state.moundDepth * mound + base * (1 - mound);
  return Math.min(-2, state.shelfDepth * shelf + moundFloor * (1 - shelf));
}

export function createOceanFloorHeightfield(stateInput, options = {}) {
  const state = createOceanFloorState({ ...stateInput, ...options });
  const resolution = Number(options.resolution ?? state.resolution);
  const size = Number(options.size ?? state.size);
  const half = size * 0.5;
  const samples = [];
  for (let zi = 0; zi < resolution; zi += 1) for (let xi = 0; xi < resolution; xi += 1) {
    const x = (xi / (resolution - 1) * 2 - 1) * half;
    const z = (zi / (resolution - 1) * 2 - 1) * half;
    const d = Math.hypot(x, z);
    samples.push({ x, y: sampleOceanFloorHeight(state, { x, z }), z, masks: { shallowShelf: d < state.islandInfluenceRadius ? 1 : 0, reefBand: d > state.islandShelfRadius * 0.75 && d < state.islandInfluenceRadius * 1.15 ? 1 : 0, deepFloor: d >= state.islandInfluenceRadius ? 1 : 0 } });
  }
  return { type: "ocean-floor-heightfield", resolution, size, samples };
}

export function createOceanFloorObjectPlacements(stateInput, options = {}) {
  const state = createOceanFloorState({ ...stateInput, ...options });
  const random = rng(`${state.seed}:objects`);
  const objects = [];
  let index = 0;
  function place(type, count, minR, maxR, minScale, maxScale) {
    for (let i = 0; i < count; i += 1) {
      const angle = random() * TAU;
      const radius = minR + (maxR - minR) * Math.sqrt(random());
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      objects.push({ id: `ocean-floor:${index++}`, type, position: { x, y: sampleOceanFloorHeight(state, { x, z }), z }, rotation: angle, scale: minScale + (maxScale - minScale) * random() });
    }
  }
  place("reef-cluster", state.objects.reefClusters, state.islandShelfRadius * 0.75, state.islandInfluenceRadius * 1.08, 0.9, 2.3);
  place("coral-cluster", state.objects.coralClusters, state.islandShelfRadius * 0.85, state.islandInfluenceRadius * 1.18, 0.45, 1.35);
  place("sea-floor-rock", state.objects.seaFloorRocks, state.islandInfluenceRadius * 0.8, state.size * 0.46, 0.45, 1.7);
  place("sea-floor-boulder", state.objects.seaFloorBoulders, state.islandInfluenceRadius * 1.05, state.size * 0.42, 1.15, 3.4);
  return objects;
}

export function createOceanFloorRenderContract(stateInput, options = {}) {
  const state = createOceanFloorState(stateInput);
  return { heightfield: createOceanFloorHeightfield(state, options.heightfield ?? {}), objects: createOceanFloorObjectPlacements(state, options.objects ?? {}), waterMaterial: { opacity: 0.75, transparency: 0.25, roughness: 0.14, metalness: 0.12, envMapIntensity: 1.8, color: "#22b9c9" } };
}
