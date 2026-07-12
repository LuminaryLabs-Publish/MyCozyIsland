export const NEXUS_ENGINE_COMMIT = "38229f59c22cb40024ffd13a9f48040de759f5d7";

export const COZY_WORLD_CONFIG = Object.freeze({
  id: "world:cozy-island-webgpu-v4",
  seed: "cozy-island-webgpu-v2",
  partition: Object.freeze({
    kind: "uniform-grid",
    cellSize: 48,
    radius: 3
  }),
  surface: Object.freeze({ kind: "flat" }),
  terrain: Object.freeze({
    resolution: 49,
    submergedShelfWidth: 6,
    submergedShelfDepth: -5
  }),
  seaFloor: Object.freeze({
    resolution: 33,
    normalEpsilon: 2.5,
    minimumCoastDepth: -7
  }),
  focus: Object.freeze({ updateHz: 10, minimumMovement: 4 }),
  materialization: Object.freeze({
    maxCellsPerFrame: 1,
    terrainRowsPerStep: 1,
    seaFloorRowsPerStep: 2,
    classificationRowsPerStep: 4
  })
});
