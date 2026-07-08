const TAU = Math.PI * 2;

function hashUnit(seed = "seed", ...parts) {
  let hash = 2166136261;
  for (const char of [seed, ...parts].join(":").toString()) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function noise(seed, x, z) {
  const xi = Math.floor(x);
  const zi = Math.floor(z);
  const xf = x - xi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = zf * zf * (3 - 2 * zf);
  const a = hashUnit(seed, xi, zi);
  const b = hashUnit(seed, xi + 1, zi);
  const c = hashUnit(seed, xi, zi + 1);
  const d = hashUnit(seed, xi + 1, zi + 1);
  return (a + (b - a) * u) + ((c + (d - c) * u) - (a + (b - a) * u)) * v;
}

function coastRadius(state, angle) {
  return state.radius * (1 + Math.sin(angle * 5) * 0.08 + Math.cos(angle * 9) * 0.04 + (hashUnit(state.seed, "coast", Math.round(angle * 32)) - 0.5) * 0.04);
}

export function createOceanIslandLandformState(options = {}) {
  return {
    id: options.id ?? "cozy-island-001",
    seed: String(options.seed ?? "cozy-island"),
    radius: Number(options.radius ?? 100),
    maxHeight: Number(options.maxHeight ?? 18),
    beachWidth: Number(options.beachWidth ?? 10),
    shelfWidth: Number(options.shelfWidth ?? 36),
    seaLevel: Number(options.seaLevel ?? 0)
  };
}

export function sampleIslandHeight(stateInput, point = {}) {
  const state = createOceanIslandLandformState(stateInput);
  const x = Number(point.x ?? 0);
  const z = Number(point.z ?? 0);
  const angle = Math.atan2(z, x);
  const coast = coastRadius(state, angle);
  const d = Math.hypot(x, z) / coast;
  if (d >= 1) return -2.4 - (d - 1) * 18;
  const n = Math.max(0, 1 - Math.pow(d, 1.65));
  const mound = Math.pow(n, 0.74) * state.maxHeight;
  const undulation = (noise(`${state.seed}:h`, x * 0.035, z * 0.035) - 0.5) * 2.2 * n;
  return Math.max(0, mound + undulation);
}

export function sampleIslandMasks(stateInput, point = {}) {
  const state = createOceanIslandLandformState(stateInput);
  const x = Number(point.x ?? 0);
  const z = Number(point.z ?? 0);
  const angle = Math.atan2(z, x);
  const coast = coastRadius(state, angle);
  const d = Math.hypot(x, z);
  const h = sampleIslandHeight(state, point);
  return {
    height: h,
    water: d > coast ? 1 : 0,
    wetSand: d > coast - 2.5 && d <= coast + 1.5 ? 1 : 0,
    beach: d > coast - state.beachWidth && d <= coast + 2 ? 1 : 0,
    grass: d <= coast - state.beachWidth && h < state.maxHeight * 0.72 ? 1 : 0,
    rock: h >= state.maxHeight * 0.72 ? 1 : 0,
    cliff: h >= state.maxHeight * 0.88 ? 1 : 0,
    foam: Math.max(0, 1 - Math.abs(d - coast) / 6)
  };
}

export function createOceanIslandLandformRenderContract(stateInput, options = {}) {
  const state = createOceanIslandLandformState(stateInput);
  const resolution = Number(options.heightfield?.resolution ?? 129);
  const extent = state.radius * 1.18;
  const samples = [];
  for (let zi = 0; zi < resolution; zi += 1) {
    for (let xi = 0; xi < resolution; xi += 1) {
      const x = (xi / (resolution - 1) * 2 - 1) * extent;
      const z = (zi / (resolution - 1) * 2 - 1) * extent;
      const masks = sampleIslandMasks(state, { x, z });
      samples.push({ x, y: masks.height, z, masks });
    }
  }
  const segments = Number(options.shoreline?.segments ?? 128);
  const shoreline = Array.from({ length: segments }, (_, i) => {
    const angle = i / segments * TAU;
    const r = coastRadius(state, angle);
    return { x: Math.cos(angle) * r, y: 0.04, z: Math.sin(angle) * r };
  });
  return { heightfield: { resolution, samples }, shoreline, objects: [] };
}
