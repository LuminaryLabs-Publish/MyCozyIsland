import { createCellEffectDescriptor } from "../descriptors.js";
import { createProviderRuntimeStore } from "../provider-runtime-store.js";

const CHANNELS = Object.freeze(["shallowSand", "submergedRock", "silt", "deepSeabed"]);
const clamp01 = value => Math.max(0, Math.min(1, Number(value) || 0));
const smoothstep = (a, b, value) => {
  const t = clamp01((Number(value) - a) / Math.max(1e-9, b - a));
  return t * t * (3 - 2 * t);
};

function classify(depth, normalY) {
  const slope = clamp01(1 - normalY);
  const shallowSand = (1 - smoothstep(12, 28, depth)) * (1 - slope * 0.72);
  const submergedRock = clamp01(smoothstep(0.08, 0.44, slope) * (1 - smoothstep(58, 92, depth)));
  const silt = clamp01(smoothstep(18, 46, depth) * (1 - smoothstep(72, 104, depth)) * (1 - slope * 0.55));
  const deepSeabed = clamp01(smoothstep(54, 92, depth));
  const total = Math.max(1e-6, shallowSand + submergedRock + silt + deepSeabed);
  return [shallowSand / total, submergedRock / total, silt / total, deepSeabed / total];
}

export function createSeaFloorMaterialProvider({ defineWorldEffectProvider, seaFloorSource } = {}) {
  if (!defineWorldEffectProvider || !seaFloorSource) {
    throw new TypeError("createSeaFloorMaterialProvider requires defineWorldEffectProvider and seaFloorSource.");
  }
  const store = createProviderRuntimeStore("seafloor-material-provider-runtime");

  function descriptor({ worldId, cell, version, status, resolution }) {
    const handleId = `${cell.id}:seafloor-material`;
    return createCellEffectDescriptor({
      schema: "cozy.seafloor-material.v1",
      id: handleId,
      worldId,
      cell,
      providerId: "seafloor-material-provider",
      version,
      runtimeHandleId: handleId,
      capabilities: ["seafloor-material", "seafloor-material-weights"],
      data: { resolution, channels: CHANNELS, materialization: status, source: "seafloor-provider-fields" }
    });
  }

  function register({ world, cell }) {
    const existing = store.get(cell.id);
    const resolution = seaFloorSource.getCellRecord(cell.id)?.descriptor?.resolution ?? 33;
    const status = existing?.status ?? "queued";
    const nextDescriptor = descriptor({
      worldId: world.id,
      cell,
      version: Number(existing?.descriptor?.version ?? 0) + 1,
      status,
      resolution
    });
    store.set(cell.id, {
      ...(existing ?? {}),
      handleId: `${cell.id}:seafloor-material`,
      descriptor: nextDescriptor,
      worldId: world.id,
      cell,
      resolution,
      status
    });
    return { id: `${cell.id}:seafloor-material`, kind: "seafloor-material", capabilities: nextDescriptor.capabilities, descriptor: nextDescriptor };
  }

  function materializeCellStep(cellId, seaFloorRuntime, options = {}) {
    let record = store.get(cellId);
    if (!record) return Object.freeze({ cellId: String(cellId), status: "missing", complete: false, progress: 0 });
    if (!seaFloorRuntime) return Object.freeze({ cellId: record.cellId, status: "blocked", complete: false, progress: 0 });
    if (record.status === "ready" && record.weights) {
      return Object.freeze({ cellId: record.cellId, status: "ready", complete: true, progress: 1, rowsProcessed: 0 });
    }
    const resolution = seaFloorRuntime.resolution;
    if (!record.job) {
      record = store.set(record.cellId, {
        ...record,
        status: "materializing",
        resolution,
        job: { nextRow: 0, weights: new Float32Array(resolution * resolution * CHANNELS.length) }
      });
    }
    const rows = Math.max(1, Math.floor(Number(options.rows ?? 8)));
    const startRow = record.job.nextRow;
    const rowEnd = Math.min(resolution, startRow + rows);
    for (let z = startRow; z < rowEnd; z += 1) {
      for (let x = 0; x < resolution; x += 1) {
        const cursor = z * resolution + x;
        const weights = classify(
          seaFloorRuntime.depthField[cursor],
          seaFloorRuntime.normalField[cursor * 3 + 1]
        );
        weights.forEach((weight, index) => {
          record.job.weights[cursor * CHANNELS.length + index] = weight;
        });
      }
    }
    record.job.nextRow = rowEnd;
    if (rowEnd < resolution) {
      return Object.freeze({ cellId: record.cellId, status: "materializing", complete: false, progress: rowEnd / resolution, rowsProcessed: rowEnd - startRow });
    }
    const nextDescriptor = descriptor({
      worldId: record.worldId,
      cell: record.cell,
      version: Number(record.descriptor?.version ?? 0) + 1,
      status: "ready",
      resolution
    });
    store.set(record.cellId, { ...record, descriptor: nextDescriptor, status: "ready", weights: record.job.weights, channels: CHANNELS, job: null });
    return Object.freeze({ cellId: record.cellId, status: "ready", complete: true, progress: 1, rowsProcessed: rowEnd - startRow });
  }

  return Object.freeze({
    provider: defineWorldEffectProvider({
      id: "seafloor-material-provider",
      kind: "seafloor-material",
      phase: "classification",
      critical: true,
      requires: ["seafloor-descriptor"],
      provides: ["seafloor-material", "seafloor-material-weights"],
      prepareCell: register,
      updateCell: register,
      releaseCell({ cell }) { store.remove(cell.id); },
      getEffectDescriptor(cellId) { return store.get(cellId)?.descriptor ?? null; },
      snapshot() { return store.snapshot(); },
      restoreSnapshot() { store.clear(); },
      reset() { store.clear(); }
    }),
    materializeCellStep,
    getRuntimeCell(cellId) {
      const record = store.get(cellId);
      return record?.status === "ready" ? record : null;
    },
    runtimeStore: store
  });
}
