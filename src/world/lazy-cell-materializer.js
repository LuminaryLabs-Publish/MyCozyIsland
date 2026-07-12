function snapshotCells(snapshot = {}) {
  return (snapshot.activeCells ?? [])
    .map(entry => entry?.cell ?? entry)
    .filter(cell => cell?.id && cell?.bounds);
}

function cellCenter(cell) {
  return {
    x: (Number(cell.bounds.minX) + Number(cell.bounds.maxX)) * 0.5,
    z: (Number(cell.bounds.minZ) + Number(cell.bounds.maxZ)) * 0.5
  };
}

function priorityTuple(cell, focus) {
  const center = cellCenter(cell);
  return [
    Number(cell.lod ?? 0),
    Math.hypot(center.x - Number(focus.x ?? 0), center.z - Number(focus.z ?? 0)),
    String(cell.id)
  ];
}

function comparePriority(left, right, focus) {
  const a = priorityTuple(left.cell, focus);
  const b = priorityTuple(right.cell, focus);
  return a[0] - b[0] || a[1] - b[1] || a[2].localeCompare(b[2]);
}

export function createLazyCellMaterializer({
  config,
  terrainSource,
  seaFloorSource,
  biomeProvider,
  shorelineProvider,
  seaFloorMaterialProvider,
  presentationProvider,
  getWorldSnapshot
} = {}) {
  if (
    !config
    || !terrainSource
    || !seaFloorSource
    || !biomeProvider
    || !shorelineProvider
    || !seaFloorMaterialProvider
    || !presentationProvider
    || !getWorldSnapshot
  ) {
    throw new TypeError("createLazyCellMaterializer requires island, sea-floor, classification, presentation, and snapshot providers.");
  }

  const states = new Map();
  let frames = 0;
  let workSteps = 0;
  let completedCells = 0;

  function sync() {
    const activeCells = snapshotCells(getWorldSnapshot() ?? {});
    const activeIds = new Set(activeCells.map(cell => String(cell.id)));
    for (const cellId of states.keys()) {
      if (!activeIds.has(cellId)) states.delete(cellId);
    }
    for (const cell of activeCells) {
      const cellId = String(cell.id);
      const existing = states.get(cellId);
      if (existing) {
        existing.cell = cell;
        continue;
      }
      states.set(cellId, { cell, stage: "island-terrain", complete: false });
    }
    completedCells = [...states.values()].filter(state => state.complete).length;
    return activeCells;
  }

  function advance(state) {
    const budget = config.materialization ?? {};
    if (state.stage === "island-terrain") {
      const result = terrainSource.materializeCellStep(state.cell.id, {
        rows: budget.terrainRowsPerStep ?? 1
      });
      if (result.complete) state.stage = "sea-floor-terrain";
      return result;
    }

    if (state.stage === "sea-floor-terrain") {
      const result = seaFloorSource.materializeCellStep(state.cell.id, {
        rows: budget.seaFloorRowsPerStep ?? 2
      });
      if (result.complete) state.stage = "island-biome";
      return result;
    }

    const terrainRuntime = terrainSource.getRuntimeCell(state.cell.id);
    const seaFloorRuntime = seaFloorSource.getRuntimeCell(state.cell.id);

    if (state.stage === "island-biome") {
      const result = biomeProvider.materializeCellStep(state.cell.id, terrainRuntime, {
        rows: budget.classificationRowsPerStep ?? 4
      });
      if (result.complete) state.stage = "shoreline";
      return result;
    }

    if (state.stage === "shoreline") {
      const result = shorelineProvider.materializeCellStep(state.cell.id, terrainRuntime, {
        rows: budget.classificationRowsPerStep ?? 4
      });
      if (result.complete) state.stage = "sea-floor-material";
      return result;
    }

    if (state.stage === "sea-floor-material") {
      const result = seaFloorMaterialProvider.materializeCellStep(state.cell.id, seaFloorRuntime, {
        rows: budget.classificationRowsPerStep ?? 4
      });
      if (result.complete) state.stage = "presentation";
      return result;
    }

    if (state.stage === "presentation") {
      presentationProvider.refreshCell(state.cell, config.id);
      state.stage = "done";
      state.complete = true;
      completedCells += 1;
      return Object.freeze({
        cellId: state.cell.id,
        status: "ready",
        complete: true,
        progress: 1,
        rowsProcessed: 0
      });
    }

    return Object.freeze({
      cellId: state.cell.id,
      status: "ready",
      complete: true,
      progress: 1,
      rowsProcessed: 0
    });
  }

  function processFrame(options = {}) {
    frames += 1;
    sync();
    const focus = options.cameraMode === "first-person"
      ? options.focus ?? { x: 0, z: 0 }
      : { x: 0, z: 0 };
    const maxCells = Math.max(
      0,
      Math.floor(Number(options.maxCells ?? config.materialization?.maxCellsPerFrame ?? 1))
    );
    const candidates = [...states.values()]
      .filter(state => !state.complete)
      .sort((left, right) => comparePriority(left, right, focus));
    const processed = [];
    for (let index = 0; index < Math.min(maxCells, candidates.length); index += 1) {
      const state = candidates[index];
      const result = advance(state);
      processed.push(Object.freeze({
        cellId: state.cell.id,
        stage: state.stage,
        status: result.status,
        progress: result.progress
      }));
      workSteps += 1;
    }
    return Object.freeze({
      frames,
      workSteps,
      processed,
      activeCells: states.size,
      completedCells,
      pendingCells: Math.max(0, states.size - completedCells),
      progress: states.size ? completedCells / states.size : 1
    });
  }

  function getState() {
    return Object.freeze({
      frames,
      workSteps,
      activeCells: states.size,
      completedCells,
      pendingCells: Math.max(0, states.size - completedCells),
      progress: states.size ? completedCells / states.size : 1,
      cells: Object.freeze(
        [...states.values()]
          .sort((a, b) => String(a.cell.id).localeCompare(String(b.cell.id)))
          .map(state => Object.freeze({
            cellId: state.cell.id,
            lod: Number(state.cell.lod ?? 0),
            stage: state.stage,
            complete: state.complete
          }))
      )
    });
  }

  function reset() {
    states.clear();
    frames = 0;
    workSteps = 0;
    completedCells = 0;
  }

  return Object.freeze({ processFrame, getState, reset, sync });
}
