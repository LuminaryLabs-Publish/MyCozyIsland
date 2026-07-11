import { createCellEffectDescriptor } from "../descriptors.js";
import { createProviderRuntimeStore } from "../provider-runtime-store.js";

const clamp01 = value => Math.max(0, Math.min(1, Number(value) || 0));

export function createShorelineClassificationProvider({ defineWorldEffectProvider, shoreline, terrainSource } = {}) {
  if (!defineWorldEffectProvider || !shoreline || !terrainSource) {
    throw new TypeError("createShorelineClassificationProvider requires defineWorldEffectProvider, shoreline, and terrainSource.");
  }

  const store = createProviderRuntimeStore("shoreline-classification-provider-runtime");

  function createDescriptor({ worldId, cell, version, status, resolution }) {
    const handleId = `${cell.id}:shoreline-field`;
    return createCellEffectDescriptor({
      schema: "cozy.shoreline-field.v2",
      id: handleId,
      worldId,
      cell,
      providerId: "shoreline-classification-provider",
      version,
      runtimeHandleId: handleId,
      capabilities: ["shoreline-distance", "shoreline-normal", "shoreline-breaker", "shoreline-wetness"],
      data: {
        resolution,
        materialization: status,
        signedDistanceSource: "terrain-provider-field"
      }
    });
  }

  function register({ world, cell }) {
    const existing = store.get(cell.id);
    const resolution = terrainSource.getCellRecord(cell.id)?.descriptor?.resolution ?? 49;
    const status = existing?.status ?? "queued";
    const version = Number(existing?.descriptor?.version ?? 0) + 1;
    const descriptor = createDescriptor({ worldId: world.id, cell, version, status, resolution });
    store.set(cell.id, {
      ...(existing ?? {}),
      handleId: `${cell.id}:shoreline-field`,
      descriptor,
      worldId: world.id,
      cell,
      resolution,
      status
    });
    return { id: `${cell.id}:shoreline-field`, kind: "shoreline-classification", capabilities: descriptor.capabilities, descriptor };
  }

  function materializeCellStep(cellId, terrainRuntime, options = {}) {
    let record = store.get(cellId);
    if (!record) return Object.freeze({ cellId: String(cellId), status: "missing", complete: false, progress: 0 });
    if (!terrainRuntime) return Object.freeze({ cellId: record.cellId, status: "blocked", complete: false, progress: 0 });
    if (record.status === "ready" && record.signedDistance) {
      return Object.freeze({ cellId: record.cellId, status: "ready", complete: true, progress: 1, rowsProcessed: 0 });
    }

    const resolution = terrainRuntime.resolution;
    if (!record.job) {
      const sampleCount = resolution * resolution;
      record = store.set(record.cellId, {
        ...record,
        status: "materializing",
        resolution,
        job: {
          nextRow: 0,
          signedDistance: new Float32Array(sampleCount),
          breaker: new Float32Array(sampleCount),
          wetness: new Float32Array(sampleCount),
          normal: new Float32Array(sampleCount * 2)
        }
      });
    }

    const rows = Math.max(1, Math.floor(Number(options.rows ?? 8)));
    const startRow = record.job.nextRow;
    const rowEnd = Math.min(resolution, startRow + rows);
    const bounds = record.cell.bounds;

    for (let zIndex = startRow; zIndex < rowEnd; zIndex += 1) {
      const z = bounds.minZ + (zIndex / (resolution - 1)) * (bounds.maxZ - bounds.minZ);
      for (let xIndex = 0; xIndex < resolution; xIndex += 1) {
        const x = bounds.minX + (xIndex / (resolution - 1)) * (bounds.maxX - bounds.minX);
        const cursor = zIndex * resolution + xIndex;
        const signedDistance = terrainRuntime.shoreDistanceField[cursor];
        const sample = shoreline.sample({ x, z });
        record.job.signedDistance[cursor] = signedDistance;
        record.job.breaker[cursor] = clamp01(1 - Math.abs(signedDistance) / 7.5);
        record.job.wetness[cursor] = clamp01(1 - Math.max(0, signedDistance) / 5.5);
        record.job.normal[cursor * 2] = sample.normal.x;
        record.job.normal[cursor * 2 + 1] = sample.normal.z;
      }
    }

    record.job.nextRow = rowEnd;
    const complete = rowEnd >= resolution;
    if (!complete) {
      return Object.freeze({
        cellId: record.cellId,
        status: "materializing",
        complete: false,
        progress: rowEnd / resolution,
        rowsProcessed: rowEnd - startRow
      });
    }

    const version = Number(record.descriptor?.version ?? 0) + 1;
    const descriptor = createDescriptor({
      worldId: record.worldId,
      cell: record.cell,
      version,
      status: "ready",
      resolution
    });

    store.set(record.cellId, {
      ...record,
      descriptor,
      status: "ready",
      signedDistance: record.job.signedDistance,
      breaker: record.job.breaker,
      wetness: record.job.wetness,
      normal: record.job.normal,
      job: null
    });

    return Object.freeze({
      cellId: record.cellId,
      status: "ready",
      complete: true,
      progress: 1,
      rowsProcessed: rowEnd - startRow
    });
  }

  return Object.freeze({
    provider: defineWorldEffectProvider({
      id: "shoreline-classification-provider",
      kind: "shoreline-classification",
      phase: "classification",
      critical: true,
      requires: ["terrain-descriptor"],
      provides: ["shoreline-distance", "shoreline-normal", "shoreline-breaker", "shoreline-wetness"],
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
    getMaterializationState(cellId) {
      const record = store.get(cellId);
      if (!record) return Object.freeze({ cellId: String(cellId), status: "missing", progress: 0 });
      if (record.status === "ready") return Object.freeze({ cellId: record.cellId, status: "ready", progress: 1 });
      return Object.freeze({
        cellId: record.cellId,
        status: record.status,
        progress: Number(record.job?.nextRow ?? 0) / Number(record.resolution ?? 49)
      });
    },
    runtimeStore: store
  });
}
