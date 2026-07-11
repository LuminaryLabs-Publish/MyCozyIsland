import { createCellEffectDescriptor } from "../descriptors.js";
import { createProviderRuntimeStore } from "../provider-runtime-store.js";

export function createIslandTerrainSource({ terrain, config } = {}) {
  if (!terrain || !config) throw new TypeError("createIslandTerrainSource requires terrain and config.");
  const store = createProviderRuntimeStore("cozy-island-terrain-provider-runtime");
  const resolution = Number(config.terrain?.resolution ?? 49);

  function buildPatch({ worldId, cell, seed }) {
    const bounds = cell.bounds;
    const sampleCount = resolution * resolution;
    const heightField = new Float32Array(sampleCount);
    const normalField = new Float32Array(sampleCount * 3);
    const slopeField = new Float32Array(sampleCount);
    const curvatureField = new Float32Array(sampleCount);
    const moistureField = new Float32Array(sampleCount);
    const exposureField = new Float32Array(sampleCount);
    const rockExposureField = new Float32Array(sampleCount);
    const shoreDistanceField = new Float32Array(sampleCount);
    let cursor = 0;
    for (let zIndex = 0; zIndex < resolution; zIndex += 1) {
      const z = bounds.minZ + (zIndex / (resolution - 1)) * (bounds.maxZ - bounds.minZ);
      for (let xIndex = 0; xIndex < resolution; xIndex += 1) {
        const x = bounds.minX + (xIndex / (resolution - 1)) * (bounds.maxX - bounds.minX);
        const fields = terrain.sampleFields({ x, z });
        heightField[cursor] = fields.height;
        normalField[cursor * 3] = fields.normal.x;
        normalField[cursor * 3 + 1] = fields.normal.y;
        normalField[cursor * 3 + 2] = fields.normal.z;
        slopeField[cursor] = fields.slope;
        curvatureField[cursor] = fields.curvature;
        moistureField[cursor] = fields.moisture;
        exposureField[cursor] = fields.exposure;
        rockExposureField[cursor] = fields.rockExposure;
        shoreDistanceField[cursor] = fields.shoreDistance;
        cursor += 1;
      }
    }
    const handleId = `${cell.id}:terrain-patch`;
    const version = Number(store.get(cell.id)?.descriptor?.version ?? 0) + 1;
    const descriptor = createCellEffectDescriptor({
      schema: "cozy.terrain-patch.v1",
      id: handleId,
      worldId,
      cell,
      providerId: "cozy-island-terrain-provider",
      version,
      seed,
      runtimeHandleId: handleId,
      capabilities: ["terrain-height", "terrain-normal", "terrain-fields", "terrain-surface", "terrain-patch"],
      data: { resolution, fieldNames: ["height", "normal", "slope", "curvature", "moisture", "exposure", "rockExposure", "shoreDistance"] }
    });
    const runtimeHandle = Object.freeze({ handleId, descriptor, bounds: { ...bounds }, resolution, heightField, normalField, slopeField, curvatureField, moistureField, exposureField, rockExposureField, shoreDistanceField });
    store.set(cell.id, { handleId, descriptor, runtimeHandle });
    return { descriptor, runtimeHandle };
  }

  return Object.freeze({
    id: "cozy-island-terrain-source",
    config: Object.freeze({ id: terrain.id, chunks: Object.freeze({ size: config.partition.cellSize }), layers: Object.freeze([{ kind: "cozy-island-world-sampler" }]) }),
    prepareCell: buildPatch,
    updateCell(command) {
      const existing = store.get(command.cell.id);
      if (existing && existing.descriptor.lod === Number(command.cell.lod ?? 0)) return { descriptor: existing.descriptor, runtimeHandle: existing.runtimeHandle };
      return buildPatch(command);
    },
    releaseCell(cellId) { store.remove(cellId); },
    resetCells() { store.clear(); },
    getRuntimeCell(cellId) { return store.get(cellId)?.runtimeHandle ?? null; },
    listRuntimeCells() { return store.list().map((entry) => entry.runtimeHandle); },
    runtimeStore: store
  });
}
