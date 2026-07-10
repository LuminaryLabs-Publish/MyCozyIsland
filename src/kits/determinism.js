export const TAU = Math.PI * 2;
export const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
export const clamp01 = value => clamp(value, 0, 1);
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (edge0, edge1, value) => {
  const t = clamp01((value - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
};
export const smootherstep = (edge0, edge1, value) => {
  const t = clamp01((value - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * t * (t * (t * 6 - 15) + 10);
};

export function hash32(seed = "seed", ...parts) {
  let hash = 2166136261;
  const text = [seed, ...parts].join(":");
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x7feb352d);
  hash ^= hash >>> 15;
  hash = Math.imul(hash, 0x846ca68b);
  hash ^= hash >>> 16;
  return hash >>> 0;
}

export const hashUnit = (seed = "seed", ...parts) => hash32(seed, ...parts) / 0xffffffff;

export function createRng(seed = "seed") {
  let state = hash32(seed) || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0xffffffff;
  };
}

function lattice(seed, x, y, z = 0) {
  return hashUnit(seed, Math.floor(x), Math.floor(y), Math.floor(z)) * 2 - 1;
}

export function valueNoise2D(seed, x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = lattice(seed, xi, yi);
  const b = lattice(seed, xi + 1, yi);
  const c = lattice(seed, xi, yi + 1);
  const d = lattice(seed, xi + 1, yi + 1);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

export function valueNoise3D(seed, x, y, z) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = x - xi;
  const yf = y - yi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const w = zf * zf * (3 - 2 * zf);

  const c000 = lattice(seed, xi, yi, zi);
  const c100 = lattice(seed, xi + 1, yi, zi);
  const c010 = lattice(seed, xi, yi + 1, zi);
  const c110 = lattice(seed, xi + 1, yi + 1, zi);
  const c001 = lattice(seed, xi, yi, zi + 1);
  const c101 = lattice(seed, xi + 1, yi, zi + 1);
  const c011 = lattice(seed, xi, yi + 1, zi + 1);
  const c111 = lattice(seed, xi + 1, yi + 1, zi + 1);

  const x00 = lerp(c000, c100, u);
  const x10 = lerp(c010, c110, u);
  const x01 = lerp(c001, c101, u);
  const x11 = lerp(c011, c111, u);
  return lerp(lerp(x00, x10, v), lerp(x01, x11, v), w);
}

export function fbm2D(seed, x, y, options = {}) {
  const octaves = Number(options.octaves ?? 5);
  let frequency = Number(options.frequency ?? 1);
  let amplitude = Number(options.amplitude ?? 0.5);
  const lacunarity = Number(options.lacunarity ?? 2.03);
  const gain = Number(options.gain ?? 0.5);
  let sum = 0;
  let norm = 0;
  for (let octave = 0; octave < octaves; octave += 1) {
    sum += valueNoise2D(`${seed}:${octave}`, x * frequency, y * frequency) * amplitude;
    norm += amplitude;
    frequency *= lacunarity;
    amplitude *= gain;
  }
  return norm ? sum / norm : 0;
}

export function fbm3D(seed, x, y, z, options = {}) {
  const octaves = Number(options.octaves ?? 4);
  let frequency = Number(options.frequency ?? 1);
  let amplitude = Number(options.amplitude ?? 0.5);
  const lacunarity = Number(options.lacunarity ?? 2.01);
  const gain = Number(options.gain ?? 0.52);
  let sum = 0;
  let norm = 0;
  for (let octave = 0; octave < octaves; octave += 1) {
    sum += valueNoise3D(`${seed}:${octave}`, x * frequency, y * frequency, z * frequency) * amplitude;
    norm += amplitude;
    frequency *= lacunarity;
    amplitude *= gain;
  }
  return norm ? sum / norm : 0;
}

export function createDeterministicSeedService(seed = "cozy-island") {
  const stableSeed = String(seed);
  return Object.freeze({
    seed: stableSeed,
    hash(...parts) {
      return hash32(stableSeed, ...parts);
    },
    unit(...parts) {
      return hashUnit(stableSeed, ...parts);
    },
    random(scope = "default") {
      return createRng(`${stableSeed}:${scope}`);
    },
    stableId(type, ...parts) {
      return `${type}:${hash32(stableSeed, type, ...parts).toString(36)}`;
    }
  });
}
