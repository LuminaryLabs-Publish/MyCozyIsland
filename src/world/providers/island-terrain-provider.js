import { createCellEffectDescriptor } from "../descriptors.js";
import { createProviderRuntimeStore } from "../provider-runtime-store.js";

const FIELD_NAMES = Object.freeze([
  "height",
  "normal",
  "slope",
  "curvature",
  "moisture",
  "exposure",
  "rockExposure",
  "shoreDistance",
  "clearing"
]);

export function createIslandTerrainSource({ terrain, config } = {}) {
  if (!terrain || !config) throw new TypeError("createIslandTerrainSource requires terrain and config.");

  const store = createProviderRuntimeStore("cozy-island-terrain-provider-runtime");
  const resolution = Number(config.terrain?.resolution ?? 49);

  function createDescriptor({ worldId, cell, seed, version, status }) {
    const handleId = `${cell.id}:terrain-patch`;
    return createCellEffectDescriptor({
      schema: "cozy.terrain-patch.v2",
      id: handleId,
      worldId,
      cell,
      providerId: "cozy-island-terrain-provider",
      version,
      seed,
      runtimeHandleId: handleId,
      capabilities: [
        "terrain-height",
        "terrain-normal",
        "terrain-fields",
        "terrain-surface",
        "terrain-patch",
        "terrain-descriptor"
      ],
      data: {
        resolution,
        fieldNames: FIELD_NAMES,
        materialization: status
      }
    });
  }

  function registerCell({ worldId, cell, seed }) {
    const existing = store.get(cell.id);
    const status = existing?.status ?? "queued";
    const version = Number(existing?.descriptor?.version ?? 0) + 1;
    const descriptor = createDescriptor({ worldId, cell, seed, version, status });
    const record = store.set(cell.id, {
      ...(existing ?? {}),
      handleId: `${cell.id}:terrain-patch`,
      descriptor,
      worldId,
      seed,
      cell,
      status
    });
    return {
      descriptor,
      runtimeHandle: record.runtimeHandle ?? null
    };
  }

  function createJob() {
    const sampleCount = resolution * resolution;
    return {
      nextRow: 0,
      heightField: new Float32Array(sampleCount),
      normalField: new Float32Array(sampleCount * 3),
      slopeField: new Float32Array(sampleCount),
      curvatureField: new Float32Array(sampleCount),
      moistureField: new Float32Array(sampleCount),
      exposureField: new Float32Array(sampleCount),
      rockExposureField: new Float32Array(sampleCount),
      shoreDistanceField: new Float32Array(sampleCount),
      clearingField: new Float32Array(sampleCount)
    };
  }

  function materializeCellStep(cellId, options = {}) {
    let record = store.get(cellId);
    if (!record) return Object.freeze({ cellId: String(cellId), status: "missing", complete: false, progress: 0 });
    if (record.status === "ready" && record.runtimeHandle) {
      return Object.freeze({ cellId: record.cellId, status: "ready", complete: true, progress: 1, rowsProcessed: 0 });
    }

    if (!record.job) {
      record = store.set(record.cellId, {
        ...record,
        status: "materializing",
        job: createJob()
      });
    }

    const job = record.job;
    const rows = Math.max(1, Math.floor(Number(options.rows ?? 4)));
    const startRow = job.nextRow;
    const rowEnd = Math.min(resolution, startRow + rows);
    const bounds = record.cell.bounds;

    for (let zIndex = startRow; zIndex < rowEnd; zIndex += 1) {
      const z = bounds.minZ + (zIndex / (resolution - 1)) * (bounds.maxZ - bounds.minZ);
      for (let xIndex = 0; xIndex < resolution; xIndex += 1) {
        const x = bounds.minX + (xIndex / (resolution - 1)) * (bounds.maxX - bounds.minX);
        const cursor = zIndex * resolution + xIndex;
        const fields = terrain.sampleFields({ x, z });
        job.heightField[cursor] = fields.height;
        job.normalField[cursor * 3] = fields.normal.x;
        job.normalField[cursor * 3 + 1] = fields.normal.y;
        job.normalField[cursor * 3 + 2] = fields.normal.z;
        job.slopeField[cursor] = fields.slope;
        job.curvatureField[cursor] = fields.curvature;
        job.moistureField[cursor] = fields.moisture;
        job.exposureField[cursor] = fields.exposure;
        job.rockExposureField[cursor] = fields.rockExposure;
        job.shoreDistanceField[cursor] = fields.shoreDistance;
        job.clearingField[cursor] = fields.clearing;
      }
    }

    job.nextRow = rowEnd;
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
      seed: record.seed,
      version,
      status: "ready"
    });
    const runtimeHandle = Object.freeze({
      handleId: record.handleId,
      descriptor,
      bounds: { ...bounds },
      resolution,
      heightField: job.heightField,
      normalField: job.normalField,
      slopeField: job.slopeField,
      curvatureField: job.curvatureField,
      moistureField: job.moistureField,
      exposureField: job.exposureField,
      rockExposureField: job.rockExposureField,
      shoreDistanceField: job.shoreDistanceField,
      clearingField: job.clearingField
    });

    store.set(record.cellId, {
      ...record,
      descriptor,
      runtimeHandle,
      status: "ready",
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

  function getMaterializationState(cellId) {
    const record = store.get(cellId);
    if (!record) return Object.freeze({ cellId: String(cellId), status: "missing", progress: 0 });
    if (record.status === "ready") return Object.freeze({ cellId: record.cellId, status: "ready", progress: 1 });
    return Object.freeze({
      cellId: record.cellId,
      status: record.status,
      progress: Number(record.job?.nextRow ?? 0) / resolution
    });
  }

  return Object.freeze({
    id: "cozy-island-terrain-source",
    config: Object.freeze({
      id: terrain.id,
      chunks: Object.freeze({ size: config.partition.cellSize }),
      layers: Object.freeze([{ kind: "cozy-island-world-sampler" }])
    }),
    prepareCell: registerCell,
    updateCell: registerCell,
    materializeCellStep,
    getMaterializationState,
    releaseCell(cellId) { store.remove(cellId); },
    resetCells() { store.clear(); },
    getCellRecord(cellId) { return store.get(cellId); },
    getRuntimeCell(cellId) { return store.get(cellId)?.runtimeHandle ?? null; },
    listRuntimeCells() { return store.list().map((entry) => entry.runtimeHandle).filter(Boolean); },
    runtimeStore: store
  });
}
