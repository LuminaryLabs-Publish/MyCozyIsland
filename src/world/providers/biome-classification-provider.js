import { createCellEffectDescriptor } from "../descriptors.js";
import { createProviderRuntimeStore } from "../provider-runtime-store.js";

const CHANNELS = Object.freeze(["wetSand", "drySand", "grass", "soil", "forestFloor", "moss", "rock"]);

export function createBiomeClassificationProvider({ defineWorldEffectProvider, biomeField, terrainSource } = {}) {
  if (!defineWorldEffectProvider || !biomeField || !terrainSource) throw new TypeError("createBiomeClassificationProvider requires defineWorldEffectProvider, biomeField, and terrainSource.");
  const store = createProviderRuntimeStore("biome-classification-provider-runtime");
  function build({ world, cell }) {
    const resolution = terrainSource.getRuntimeCell(cell.id)?.resolution ?? 49;
    const weights = new Float32Array(resolution * resolution * CHANNELS.length);
    const bounds = cell.bounds;
    let cursor = 0;
    for (let zIndex = 0; zIndex < resolution; zIndex += 1) {
      const z = bounds.minZ + (zIndex / (resolution - 1)) * (bounds.maxZ - bounds.minZ);
      for (let xIndex = 0; xIndex < resolution; xIndex += 1) {
        const x = bounds.minX + (xIndex / (resolution - 1)) * (bounds.maxX - bounds.minX);
        const sample = biomeField.sample({ x, z });
        CHANNELS.forEach((channel, channelIndex) => { weights[cursor * CHANNELS.length + channelIndex] = Number(sample[channel] ?? 0); });
        cursor += 1;
      }
    }
    const handleId = `${cell.id}:biome-field`;
    const version = Number(store.get(cell.id)?.descriptor?.version ?? 0) + 1;
    const descriptor = createCellEffectDescriptor({ schema: "cozy.biome-field.v1", id: handleId, worldId: world.id, cell, providerId: "biome-classification-provider", version, runtimeHandleId: handleId, capabilities: ["biome-weights", "surface-material", "wetness"], data: { resolution, channels: CHANNELS } });
    store.set(cell.id, { handleId, descriptor, weights, resolution, channels: CHANNELS });
    return { id: handleId, kind: "biome-classification", capabilities: descriptor.capabilities, descriptor };
  }
  return Object.freeze({
    provider: defineWorldEffectProvider({ id: "biome-classification-provider", kind: "biome-classification", phase: "classification", critical: true, requires: ["terrain-descriptor"], provides: ["biome-weights", "surface-material", "wetness"], prepareCell: build, updateCell: build, releaseCell({ cell }) { store.remove(cell.id); }, getEffectDescriptor(cellId) { return store.get(cellId)?.descriptor ?? null; }, snapshot() { return store.snapshot(); }, restoreSnapshot() { store.clear(); }, reset() { store.clear(); } }),
    runtimeStore: store
  });
}
