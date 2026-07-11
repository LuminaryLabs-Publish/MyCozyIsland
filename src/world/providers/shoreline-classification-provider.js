import { createCellEffectDescriptor } from "../descriptors.js";
import { createProviderRuntimeStore } from "../provider-runtime-store.js";

export function createShorelineClassificationProvider({ defineWorldEffectProvider, shoreline, terrainSource } = {}) {
  if (!defineWorldEffectProvider || !shoreline || !terrainSource) throw new TypeError("createShorelineClassificationProvider requires defineWorldEffectProvider, shoreline, and terrainSource.");
  const store = createProviderRuntimeStore("shoreline-classification-provider-runtime");
  function build({ world, cell }) {
    const resolution = terrainSource.getRuntimeCell(cell.id)?.resolution ?? 49;
    const signedDistance = new Float32Array(resolution * resolution);
    const breaker = new Float32Array(resolution * resolution);
    const wetness = new Float32Array(resolution * resolution);
    const normal = new Float32Array(resolution * resolution * 2);
    const bounds = cell.bounds;
    let cursor = 0;
    for (let zIndex = 0; zIndex < resolution; zIndex += 1) {
      const z = bounds.minZ + (zIndex / (resolution - 1)) * (bounds.maxZ - bounds.minZ);
      for (let xIndex = 0; xIndex < resolution; xIndex += 1) {
        const x = bounds.minX + (xIndex / (resolution - 1)) * (bounds.maxX - bounds.minX);
        const sample = shoreline.sample({ x, z });
        signedDistance[cursor] = sample.signedDistance;
        breaker[cursor] = sample.breaker;
        wetness[cursor] = sample.wetness;
        normal[cursor * 2] = sample.normal.x;
        normal[cursor * 2 + 1] = sample.normal.z;
        cursor += 1;
      }
    }
    const handleId = `${cell.id}:shoreline-field`;
    const version = Number(store.get(cell.id)?.descriptor?.version ?? 0) + 1;
    const descriptor = createCellEffectDescriptor({ schema: "cozy.shoreline-field.v1", id: handleId, worldId: world.id, cell, providerId: "shoreline-classification-provider", version, runtimeHandleId: handleId, capabilities: ["shoreline-distance", "shoreline-normal", "shoreline-breaker", "shoreline-wetness"], data: { resolution } });
    store.set(cell.id, { handleId, descriptor, resolution, signedDistance, breaker, wetness, normal });
    return { id: handleId, kind: "shoreline-classification", capabilities: descriptor.capabilities, descriptor };
  }
  return Object.freeze({
    provider: defineWorldEffectProvider({ id: "shoreline-classification-provider", kind: "shoreline-classification", phase: "classification", critical: true, requires: ["terrain-descriptor"], provides: ["shoreline-distance", "shoreline-normal", "shoreline-breaker", "shoreline-wetness"], prepareCell: build, updateCell: build, releaseCell({ cell }) { store.remove(cell.id); }, getEffectDescriptor(cellId) { return store.get(cellId)?.descriptor ?? null; }, snapshot() { return store.snapshot(); }, restoreSnapshot() { store.clear(); }, reset() { store.clear(); } }),
    runtimeStore: store
  });
}
