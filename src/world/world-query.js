import { cellCoordinatesForPosition, cellKeyFromCoordinates } from "./cell-utils.js";

const SURFACE_DEFAULTS = Object.freeze({
  sand: Object.freeze({ traction: 0.82, slipperiness: 0.18, stability: 0.78, impactHardness: 0.35 }),
  "wet-sand": Object.freeze({ traction: 0.68, slipperiness: 0.34, stability: 0.62, impactHardness: 0.32 }),
  rock: Object.freeze({ traction: 0.74, slipperiness: 0.2, stability: 0.88, impactHardness: 0.82 }),
  grass: Object.freeze({ traction: 0.86, slipperiness: 0.12, stability: 0.8, impactHardness: 0.28 }),
  soil: Object.freeze({ traction: 0.76, slipperiness: 0.18, stability: 0.72, impactHardness: 0.42 }),
  moss: Object.freeze({ traction: 0.62, slipperiness: 0.38, stability: 0.58, impactHardness: 0.3 }),
  seabed: Object.freeze({ traction: 0.48, slipperiness: 0.52, stability: 0.48, impactHardness: 0.22 })
});

const clamp01 = value => Math.max(0, Math.min(1, Number(value) || 0));
const smoothstep = (a, b, value) => {
  const t = clamp01((Number(value) - a) / Math.max(1e-9, b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a, b, t) => a + (b - a) * t;

function dominantMaterial(weights = {}) {
  const aliases = { wetSand: "wet-sand", drySand: "sand", grass: "grass", soil: "soil", forestFloor: "soil", moss: "moss", rock: "rock" };
  let selected = "sand";
  let selectedWeight = -Infinity;
  for (const [key, value] of Object.entries(weights)) {
    if (Number(value) > selectedWeight) {
      selected = aliases[key] ?? key;
      selectedWeight = Number(value);
    }
  }
  return selected;
}

export function createCozyWorldQuery({
  terrain,
  oceanFloor,
  biomeField,
  shoreline,
  config,
  getActiveCells = () => []
} = {}) {
  if (!terrain || !oceanFloor || !biomeField || !shoreline || !config) {
    throw new TypeError("createCozyWorldQuery requires island terrain, sea floor, biome, shoreline, and config.");
  }

  const shelfWidth = Number(config.terrain?.submergedShelfWidth ?? 6);
  const shelfDepth = Number(config.terrain?.submergedShelfDepth ?? -5);
  const seaLevel = Number(terrain.seaLevel ?? 0);
  const islandFieldsAt = (x, z) => terrain.sampleFields({ x: Number(x), z: Number(z) });
  const islandHeightAt = (x, z) => terrain.sampleHeight({ x: Number(x), z: Number(z) });
  const islandNormalAt = (x, z) => terrain.sampleNormal({ x: Number(x), z: Number(z) });
  const seaFloorHeightAt = (x, z) => oceanFloor.sampleHeight({ x: Number(x), z: Number(z) });
  const biomeAt = (x, z) => biomeField.sample({ x: Number(x), z: Number(z) });
  const shorelineAt = (x, z) => shoreline.sample({ x: Number(x), z: Number(z) });

  function islandRenderHeightAt(x, z) {
    const fields = islandFieldsAt(x, z);
    if (fields.shoreDistance >= 0) return fields.height;
    const shelf = smoothstep(0, shelfWidth, -fields.shoreDistance);
    return lerp(seaLevel - 0.08, shelfDepth, shelf);
  }

  function insideIslandTerrain(x, z) {
    return islandFieldsAt(x, z).shoreDistance >= -shelfWidth;
  }

  function seaFloorNormalAt(x, z, epsilon = Number(config.seaFloor?.normalEpsilon ?? 2.5)) {
    const left = seaFloorHeightAt(Number(x) - epsilon, z);
    const right = seaFloorHeightAt(Number(x) + epsilon, z);
    const down = seaFloorHeightAt(x, Number(z) - epsilon);
    const up = seaFloorHeightAt(x, Number(z) + epsilon);
    const nx = left - right;
    const ny = epsilon * 2;
    const nz = down - up;
    const length = Math.hypot(nx, ny, nz) || 1;
    return Object.freeze({ x: nx / length, y: ny / length, z: nz / length });
  }

  function materialAt(x, z) {
    if (!insideIslandTerrain(x, z)) return "seabed";
    if (islandFieldsAt(x, z).shoreDistance < 0) return "wet-sand";
    return dominantMaterial(biomeAt(x, z));
  }

  function solidSurfaceAt(x, z) {
    if (insideIslandTerrain(x, z)) {
      return Object.freeze({
        kind: "island",
        height: islandRenderHeightAt(x, z),
        normal: islandNormalAt(x, z)
      });
    }
    return Object.freeze({
      kind: "sea-floor",
      height: seaFloorHeightAt(x, z),
      normal: seaFloorNormalAt(x, z)
    });
  }

  function surfaceAt(x, z) {
    const fields = islandFieldsAt(x, z);
    const biomeWeights = biomeAt(x, z);
    const shore = shorelineAt(x, z);
    const solid = solidSurfaceAt(x, z);
    const material = materialAt(x, z);
    const physical = SURFACE_DEFAULTS[material] ?? SURFACE_DEFAULTS.sand;
    return Object.freeze({
      kind: solid.kind,
      height: solid.height,
      normal: solid.normal,
      slope: solid.kind === "island" ? fields.slope : clamp01(1 - solid.normal.y),
      material,
      biomeWeights: solid.kind === "island" ? biomeWeights : Object.freeze({}),
      shoreDistance: fields.shoreDistance,
      wetness: shore.wetness,
      moisture: solid.kind === "island" ? fields.moisture : 1,
      exposure: solid.kind === "island" ? fields.exposure : 0,
      rockExposure: solid.kind === "island" ? fields.rockExposure : 0,
      waterDepth: Math.max(0, seaLevel - solid.height),
      ...physical
    });
  }

  function groundContactAt(x, z, options = {}) {
    const surface = surfaceAt(x, z);
    const maxSlope = Number(options.maxSlope ?? 0.58);
    if (surface.kind !== "island" || surface.slope > maxSlope || surface.height < -0.1) return null;
    return Object.freeze({
      x: Number(x),
      y: surface.height + Number(options.inset ?? 0),
      z: Number(z),
      normal: surface.normal,
      slope: surface.slope,
      surface
    });
  }

  function cellAt(x, z) {
    const coordinates = cellCoordinatesForPosition({ x, z }, config.partition.cellSize);
    const coordinateKey = cellKeyFromCoordinates(coordinates);
    const match = getActiveCells().find(entry => {
      const cell = entry?.cell ?? entry;
      return cellKeyFromCoordinates(cell.coordinates ?? []) === coordinateKey;
    });
    return match?.cell ?? match ?? Object.freeze({ coordinates, coordinateKey });
  }

  return Object.freeze({
    islandHeightAt,
    islandRenderHeightAt,
    islandNormalAt,
    islandSurfaceAt: (x, z) => Object.freeze({ height: islandRenderHeightAt(x, z), normal: islandNormalAt(x, z), fields: islandFieldsAt(x, z) }),
    seaFloorHeightAt,
    seaFloorNormalAt,
    seaFloorSurfaceAt: (x, z) => Object.freeze({ height: seaFloorHeightAt(x, z), normal: seaFloorNormalAt(x, z), material: "seabed" }),
    solidSurfaceAt,
    insideIslandTerrain,
    heightAt: islandHeightAt,
    normalAt: islandNormalAt,
    slopeAt: (x, z) => islandFieldsAt(x, z).slope,
    fieldsAt: islandFieldsAt,
    biomeAt,
    shorelineAt,
    materialAt,
    surfaceAt,
    waterDepthAt: (x, z) => Math.max(0, seaLevel - solidSurfaceAt(x, z).height),
    groundContactAt,
    cellAt,
    sampleHeight: (point = {}) => islandHeightAt(point.x, point.z),
    sampleNormal: (point = {}) => islandNormalAt(point.x, point.z),
    sampleFields: (point = {}) => islandFieldsAt(point.x, point.z)
  });
}
