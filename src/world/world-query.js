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

export function createCozyWorldQuery({ terrain, biomeField, shoreline, config, getActiveCells = () => [] } = {}) {
  if (!terrain || !biomeField || !shoreline || !config) {
    throw new TypeError("createCozyWorldQuery requires terrain, biomeField, shoreline, and config.");
  }
  const heightAt = (x, z) => terrain.sampleHeight({ x: Number(x), z: Number(z) });
  const normalAt = (x, z) => terrain.sampleNormal({ x: Number(x), z: Number(z) });
  const fieldsAt = (x, z) => terrain.sampleFields({ x: Number(x), z: Number(z) });
  const biomeAt = (x, z) => biomeField.sample({ x: Number(x), z: Number(z) });
  const shorelineAt = (x, z) => shoreline.sample({ x: Number(x), z: Number(z) });

  function materialAt(x, z) {
    if (heightAt(x, z) < terrain.seaLevel) return "seabed";
    return dominantMaterial(biomeAt(x, z));
  }

  function surfaceAt(x, z) {
    const fields = fieldsAt(x, z);
    const biomeWeights = biomeAt(x, z);
    const shore = shorelineAt(x, z);
    const material = materialAt(x, z);
    const physical = SURFACE_DEFAULTS[material] ?? SURFACE_DEFAULTS.sand;
    return Object.freeze({
      height: fields.height,
      normal: fields.normal,
      slope: fields.slope,
      material,
      biomeWeights,
      shoreDistance: fields.shoreDistance,
      wetness: shore.wetness,
      moisture: fields.moisture,
      exposure: fields.exposure,
      rockExposure: fields.rockExposure,
      waterDepth: Math.max(0, terrain.seaLevel - fields.height),
      ...physical
    });
  }

  function groundContactAt(x, z, options = {}) {
    const surface = surfaceAt(x, z);
    const maxSlope = Number(options.maxSlope ?? 0.58);
    if (surface.slope > maxSlope || surface.height < -0.1) return null;
    return Object.freeze({ x: Number(x), y: surface.height + Number(options.inset ?? 0), z: Number(z), normal: surface.normal, slope: surface.slope, surface });
  }

  function cellAt(x, z) {
    const coordinates = cellCoordinatesForPosition({ x, z }, config.partition.cellSize);
    const coordinateKey = cellKeyFromCoordinates(coordinates);
    const match = getActiveCells().find((entry) => {
      const cell = entry?.cell ?? entry;
      return cellKeyFromCoordinates(cell.coordinates ?? []) === coordinateKey;
    });
    return match?.cell ?? match ?? Object.freeze({ coordinates, coordinateKey });
  }

  return Object.freeze({
    heightAt,
    normalAt,
    slopeAt: (x, z) => fieldsAt(x, z).slope,
    fieldsAt,
    biomeAt,
    shorelineAt,
    materialAt,
    surfaceAt,
    waterDepthAt: (x, z) => Math.max(0, terrain.seaLevel - heightAt(x, z)),
    groundContactAt,
    cellAt,
    sampleHeight: (point = {}) => heightAt(point.x, point.z),
    sampleNormal: (point = {}) => normalAt(point.x, point.z),
    sampleFields: (point = {}) => fieldsAt(point.x, point.z)
  });
}
