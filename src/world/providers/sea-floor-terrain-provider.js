import { createCellEffectDescriptor } from "../descriptors.js";
import { createProviderRuntimeStore } from "../provider-runtime-store.js";

export function createSeaFloorTerrainSource({ oceanFloor, config } = {}) {
  if (!oceanFloor || !config) throw new TypeError("createSeaFloorTerrainSource requires oceanFloor and config.");
  const store = createProviderRuntimeStore("cozy-seafloor-terrain-provider-runtime");
  const resolution = Number(config.seaFloor?.resolution ?? 33);
  const epsilon = Number(config.seaFloor?.normalEpsilon ?? 2.5);

  function createDescriptor({ worldId, cell, seed, version, status }) {
    const handleId = `${cell.id}:seafloor-patch`;
    return createCellEffectDescriptor({
      schema: "cozy.seafloor-patch.v1",
      id: handleId,
      worldId,
      cell,
      providerId: "cozy-seafloor-terrain-provider",
      version,
      seed,
      runtimeHandleId: handleId,
      capabilities: [
        "seafloor-height",
        "seafloor-normal",
        "seafloor-terrain-patch",
        "seafloor-descriptor"
      ],
      data: {
        resolution,
        fieldNames: ["height", "normal", "depth"],
        materialization: status,
        semanticTerrain: "sea-floor"
      }
    });
  }

  function registerCell({ worldId, cell, seed }) {
    const existing = store.get(cell.id);
    const status = existing?.status ?? "queued";
    const descriptor = createDescriptor({
      worldId,
      cell,
      seed,
      version: Number(existing?.descriptor?.version ?? 0) + 1,
      status
    });
    const record = store.set(cell.id, {
      ...(existing ?? {}),
      handleId: `${cell.id}:seafloor-patch`,
      descriptor,
      worldId,
      seed,
      cell,
      status
    });
    return { descriptor, runtimeHandle: record.runtimeHandle ?? null };
  }

  function createJob() {
    const samples = resolution * resolution;
    return {
      nextRow: 0,
      heightField: new Float32Array(samples),
      normalField: new Float32Array(samples * 3),
      depthField: new Float32Array(samples)
    };
  }

  function sampleNormal(x, z) {
    const left = oceanFloor.sampleHeight({ x: x - epsilon, z });
    const right = oceanFloor.sampleHeight({ x: x + epsilon, z });
    const down = oceanFloor.sampleHeight({ x, z: z - epsilon });
    const up = oceanFloor.sampleHeight({ x, z: z + epsilon });
    const nx = left - right;
    const ny = epsilon * 2;
    const nz = down - up;
    const length = Math.hypot(nx, ny, nz) || 1;
    return { x: nx / length, y: ny / length, z: nz / length };
  }

  function materializeCellStep(cellId, options = {}) {
    let record = store.get(cellId);
    if (!record) return Object.freeze({ cellId: String(cellId), status: "missing", complete: false, progress: 0 });
    if (record.status === "ready" && record.runtimeHandle) {
      return Object.freeze({ cellId: record.cellId, status: "ready", complete: true, progress: 1, rowsProcessed: 0 });
    }
    if (!record.job) {
      record = store.set(record.cellId, { ...record, status: "materializing", job: createJob() });
    }

    const rows = Math.max(1, Math.floor(Number(options.rows ?? 4)));
    const startRow = record.job.nextRow;
    const rowEnd = Math.min(resolution, startRow + rows);
    const bounds = record.cell.bounds;
    for (let zIndex = startRow; zIndex < rowEnd; zIndex += 1) {
      const z = bounds.minZ + (zIndex / (resolution - 1)) * (bounds.maxZ - bounds.minZ);
      for (let xIndex = 0; xIndex < resolution; xIndex += 1) {
        const x = bounds.minX + (xIndex / (resolution - 1)) * (bounds.maxX - bounds.minX);
        const cursor = zIndex * resolution + xIndex;
        const height = oceanFloor.sampleHeight({ x, z });
        const normal = sampleNormal(x, z);
        record.job.heightField[cursor] = height;
        record.job.normalField[cursor * 3] = normal.x;
        record.job.normalField[cursor * 3 + 1] = normal.y;
        record.job.normalField[cursor * 3 + 2] = normal.z;
        record.job.depthField[cursor] = Math.max(0, Number(oceanFloor.seaLevel ?? 0) - height);
      }
    }

    record.job.nextRow = rowEnd;
    if (rowEnd < resolution) {
      return Object.freeze({
        cellId: record.cellId,
        status: "materializing",
        complete: false,
        progress: rowEnd / resolution,
        rowsProcessed: rowEnd - startRow
      });
    }

    const descriptor = createDescriptor({
      worldId: record.worldId,
      cell: record.cell,
      seed: record.seed,
      version: Number(record.descriptor?.version ?? 0) + 1,
      status: "ready"
    });
    const runtimeHandle = Object.freeze({
      handleId: record.handleId,
      descriptor,
      bounds: { ...bounds },
      resolution,
      heightField: record.job.heightField,
      normalField: record.job.normalField,
      depthField: record.job.depthField
    });
    store.set(record.cellId, { ...record, descriptor, runtimeHandle, status: "ready", job: null });
    return Object.freeze({
      cellId: record.cellId,
      status: "ready",
      complete: true,
      progress: 1,
      rowsProcessed: rowEnd - startRow
    });
  }

  return Object.freeze({
    id: "cozy-seafloor-terrain-source",
    config: Object.freeze({
      id: oceanFloor.id,
      chunks: Object.freeze({ size: config.partition.cellSize }),
      layers: Object.freeze([{ kind: "cozy-seafloor-bathymetry" }])
    }),
    prepareCell: registerCell,
    updateCell: registerCell,
    materializeCellStep,
    releaseCell(cellId) { store.remove(cellId); },
    resetCells() { store.clear(); },
    getCellRecord(cellId) { return store.get(cellId); },
    getRuntimeCell(cellId) { return store.get(cellId)?.runtimeHandle ?? null; },
    listRuntimeCells() { return store.list().map(entry => entry.runtimeHandle).filter(Boolean); },
    runtimeStore: store
  });
}
export function createSeaFloorTerrainProvider({ defineWorldEffectProvider, seaFloorSource } = {}) {
  if (!defineWorldEffectProvider || !seaFloorSource) {
    throw new TypeError("createSeaFloorTerrainProvider requires defineWorldEffectProvider and seaFloorSource.");
  }
  const capabilities = Object.freeze([
    "seafloor-height",
    "seafloor-normal",
    "seafloor-material",
    "seafloor-terrain-patch",
    "seafloor-descriptor"
  ]);

  const build = command => {
    const result = seaFloorSource.prepareCell({
      worldId: command.world.id,
      cell: command.cell,
      surface: command.surface,
      seed: `${command.cell.seed}:seafloor`,
      previous: command.effect ?? null
    });
    return {
      id: `${command.cell.id}:seafloor`,
      kind: "sea-floor-terrain",
      capabilities,
      descriptor: result.descriptor
    };
  };

  return defineWorldEffectProvider({
    id: "cozy-seafloor-terrain-provider",
    kind: "sea-floor-terrain",
    phase: "foundation",
    critical: true,
    provides: capabilities,
    prepareCell: build,
    updateCell: build,
    releaseCell({ cell }) { seaFloorSource.releaseCell(cell.id); },
    getEffectDescriptor(cellId, context = {}) {
      const descriptor = seaFloorSource.getCellRecord(cellId)?.descriptor;
      if (!descriptor) return null;
      return {
        id: `${cellId}:seafloor`,
        providerId: "cozy-seafloor-terrain-provider",
        worldId: context.world?.id ?? descriptor.worldId,
        cellId,
        kind: "sea-floor-terrain",
        version: descriptor.version,
        capabilities,
        descriptor
      };
    },
    snapshot() { return seaFloorSource.runtimeStore.snapshot(); },
    restoreSnapshot() { seaFloorSource.resetCells(); },
    reset() { seaFloorSource.resetCells(); }
  });
}
