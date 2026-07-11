import { createCellEffectDescriptor } from "../descriptors.js";
import { createProviderRuntimeStore } from "../provider-runtime-store.js";

const CHANNELS = Object.freeze(["wetSand", "drySand", "grass", "soil", "forestFloor", "moss", "rock"]);

const clamp01 = value => Math.max(0, Math.min(1, Number(value) || 0));
const smoothstep = (edge0, edge1, value) => {
  const t = clamp01((Number(value) - edge0) / Math.max(1e-9, edge1 - edge0));
  return t * t * (3 - 2 * t);
};

function classifyFields(surface, fields) {
  const shore = fields.shoreDistance;
  const wetSand = smoothstep(-1.5, 1.4, shore) * (1 - smoothstep(1.1, 4.2, shore));
  const drySand = smoothstep(0.6, 4.8, shore) * (1 - smoothstep(7.5, surface.beachWidth + 2, shore));
  const grassBase = smoothstep(surface.beachWidth - 2, surface.beachWidth + 6, shore) * (1 - fields.rockExposure * 0.76);
  const clearingSoil = smoothstep(0.18, 0.82, fields.clearing);
  const soil = clamp01(clearingSoil * 0.56 + fields.slope * 0.2) * (1 - wetSand);
  const forest = clamp01(grassBase * fields.moisture * (1 - fields.exposure * 0.34));
  const moss = clamp01(forest * fields.curvature * 0.75);
  const rock = clamp01(fields.rockExposure + smoothstep(surface.maxHeight * 0.7, surface.maxHeight, fields.height) * 0.35);
  const grass = clamp01(grassBase * (1 - soil * 0.68) * (1 - rock * 0.72));
  const total = Math.max(1e-6, wetSand + drySand + grass + soil + forest * 0.32 + moss * 0.2 + rock);
  return {
    wetSand: wetSand / total,
    drySand: drySand / total,
    grass: grass / total,
    soil: soil / total,
    forestFloor: (forest * 0.32) / total,
    moss: (moss * 0.2) / total,
    rock: rock / total
  };
}

export function createBiomeClassificationProvider({ defineWorldEffectProvider, surface, terrainSource } = {}) {
  if (!defineWorldEffectProvider || !surface || !terrainSource) {
    throw new TypeError("createBiomeClassificationProvider requires defineWorldEffectProvider, surface, and terrainSource.");
  }

  const store = createProviderRuntimeStore("biome-classification-provider-runtime");

  function createDescriptor({ worldId, cell, version, status, resolution }) {
    const handleId = `${cell.id}:biome-field`;
    return createCellEffectDescriptor({
      schema: "cozy.biome-field.v2",
      id: handleId,
      worldId,
      cell,
      providerId: "biome-classification-provider",
      version,
      runtimeHandleId: handleId,
      capabilities: ["biome-weights", "surface-material", "wetness"],
      data: {
        resolution,
        channels: CHANNELS,
        materialization: status,
        source: "terrain-provider-fields"
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
      handleId: `${cell.id}:biome-field`,
      descriptor,
      worldId: world.id,
      cell,
      resolution,
      status
    });
    return { id: `${cell.id}:biome-field`, kind: "biome-classification", capabilities: descriptor.capabilities, descriptor };
  }

  function materializeCellStep(cellId, terrainRuntime, options = {}) {
    let record = store.get(cellId);
    if (!record) return Object.freeze({ cellId: String(cellId), status: "missing", complete: false, progress: 0 });
    if (!terrainRuntime) return Object.freeze({ cellId: record.cellId, status: "blocked", complete: false, progress: 0 });
    if (record.status === "ready" && record.weights) {
      return Object.freeze({ cellId: record.cellId, status: "ready", complete: true, progress: 1, rowsProcessed: 0 });
    }

    const resolution = terrainRuntime.resolution;
    if (!record.job) {
      record = store.set(record.cellId, {
        ...record,
        status: "materializing",
        resolution,
        job: {
          nextRow: 0,
          weights: new Float32Array(resolution * resolution * CHANNELS.length)
        }
      });
    }

    const rows = Math.max(1, Math.floor(Number(options.rows ?? 8)));
    const startRow = record.job.nextRow;
    const rowEnd = Math.min(resolution, startRow + rows);

    for (let zIndex = startRow; zIndex < rowEnd; zIndex += 1) {
      for (let xIndex = 0; xIndex < resolution; xIndex += 1) {
        const cursor = zIndex * resolution + xIndex;
        const fields = {
          height: terrainRuntime.heightField[cursor],
          slope: terrainRuntime.slopeField[cursor],
          curvature: terrainRuntime.curvatureField[cursor],
          moisture: terrainRuntime.moistureField[cursor],
          exposure: terrainRuntime.exposureField[cursor],
          rockExposure: terrainRuntime.rockExposureField[cursor],
          shoreDistance: terrainRuntime.shoreDistanceField[cursor],
          clearing: terrainRuntime.clearingField[cursor]
        };
        const sample = classifyFields(surface, fields);
        CHANNELS.forEach((channel, channelIndex) => {
          record.job.weights[cursor * CHANNELS.length + channelIndex] = Number(sample[channel] ?? 0);
        });
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
      weights: record.job.weights,
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
      id: "biome-classification-provider",
      kind: "biome-classification",
      phase: "classification",
      critical: true,
      requires: ["terrain-descriptor"],
      provides: ["biome-weights", "surface-material", "wetness"],
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
