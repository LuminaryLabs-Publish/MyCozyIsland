export const NEXUS_ENGINE_COMMIT = "481cbf6df742e81279bd42245c4238c6a1fc69f2";

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
