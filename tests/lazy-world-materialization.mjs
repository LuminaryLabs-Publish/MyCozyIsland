import assert from "node:assert/strict";
import { createProviderRuntimeStore } from "../src/world/provider-runtime-store.js";
import { createIslandTerrainSource } from "../src/world/providers/island-terrain-provider.js";
import { createSeaFloorTerrainSource } from "../src/world/providers/sea-floor-terrain-provider.js";
import { createBiomeClassificationProvider } from "../src/world/providers/biome-classification-provider.js";
import { createShorelineClassificationProvider } from "../src/world/providers/shoreline-classification-provider.js";
import { createSeaFloorMaterialProvider } from "../src/world/providers/seafloor-material-provider.js";
import { createCellPresentationProvider } from "../src/world/providers/cell-presentation-provider.js";
import { createLazyCellMaterializer } from "../src/world/lazy-cell-materializer.js";

const defineWorldEffectProvider = options => Object.freeze({ ...options });
const config = Object.freeze({
  id: "world:test",
  partition: Object.freeze({ cellSize: 4, radius: 1 }),
  terrain: Object.freeze({ resolution: 5, submergedShelfWidth: 2, submergedShelfDepth: -3 }),
  seaFloor: Object.freeze({ resolution: 5, normalEpsilon: 0.5, minimumCoastDepth: -5 }),
  materialization: Object.freeze({
    maxCellsPerFrame: 1,
    terrainRowsPerStep: 1,
    seaFloorRowsPerStep: 1,
    classificationRowsPerStep: 1
  })
});

let terrainSamples = 0;
const terrain = {
  id: "terrain:test",
  beachWidth: 2,
  maxHeight: 8,
  seaLevel: 0,
  sampleFields({ x, z }) {
    terrainSamples += 1;
    return {
      height: Math.max(0, x + z),
      normal: { x: 0, y: 1, z: 0 },
      slope: 0,
      curvature: 0.5,
      moisture: 0.6,
      exposure: 0.2,
      rockExposure: 0.1,
      shoreDistance: 3 - Math.hypot(x, z),
      clearing: 0.5
    };
  }
};
const oceanFloor = {
  id: "seafloor:test",
  seaLevel: 0,
  sampleHeight({ x, z }) {
    return -7 - Math.hypot(x, z) * 0.1;
  }
};
const shoreline = {
  sample() {
    return { normal: { x: 1, z: 0 } };
  }
};

const center = {
  id: "center",
  lod: 0,
  bounds: { minX: -2, minZ: -2, maxX: 2, maxZ: 2 }
};
const far = {
  id: "far",
  lod: 2,
  bounds: { minX: 6, minZ: 6, maxX: 10, maxZ: 10 }
};
let snapshot = { activeCells: [{ cell: far }, { cell: center }] };

const terrainSource = createIslandTerrainSource({ terrain, config });
const seaFloorSource = createSeaFloorTerrainSource({ oceanFloor, config });
const biome = createBiomeClassificationProvider({
  defineWorldEffectProvider,
  surface: terrain,
  terrainSource
});
const shorelineProvider = createShorelineClassificationProvider({
  defineWorldEffectProvider,
  shoreline,
  terrainSource
});
const seaFloorMaterial = createSeaFloorMaterialProvider({
  defineWorldEffectProvider,
  seaFloorSource
});

const vegetationStore = createProviderRuntimeStore("vegetation");
const rockStore = createProviderRuntimeStore("rocks");
const propStore = createProviderRuntimeStore("props");
for (const cell of [center, far]) {
  terrainSource.prepareCell({ worldId: config.id, cell, seed: `${cell.id}:island-seed` });
  seaFloorSource.prepareCell({ worldId: config.id, cell, seed: `${cell.id}:seafloor-seed` });
  biome.provider.prepareCell({ world: { id: config.id }, cell });
  shorelineProvider.provider.prepareCell({ world: { id: config.id }, cell });
  seaFloorMaterial.provider.prepareCell({ world: { id: config.id }, cell });
  vegetationStore.set(cell.id, { handleId: `${cell.id}:vegetation` });
  rockStore.set(cell.id, { handleId: `${cell.id}:rocks` });
  propStore.set(cell.id, { handleId: `${cell.id}:props` });
}

const presentation = createCellPresentationProvider({
  defineWorldEffectProvider,
  terrainSource,
  seaFloorSource,
  biomeStore: biome.runtimeStore,
  shorelineStore: shorelineProvider.runtimeStore,
  seaFloorMaterialStore: seaFloorMaterial.runtimeStore,
  vegetationStore,
  rockStore,
  propStore
});
for (const cell of [center, far]) {
  presentation.provider.prepareCell({ world: { id: config.id }, cell });
}

assert.equal(terrainSamples, 0, "Core World registration must not materialize island terrain.");
assert.equal(terrainSource.getRuntimeCell(center.id), null);
assert.equal(seaFloorSource.getRuntimeCell(center.id), null);

const materializer = createLazyCellMaterializer({
  config,
  terrainSource,
  seaFloorSource,
  biomeProvider: biome,
  shorelineProvider,
  seaFloorMaterialProvider: seaFloorMaterial,
  presentationProvider: presentation,
  getWorldSnapshot: () => snapshot
});

const first = materializer.processFrame({
  focus: { x: 0, z: 0 },
  cameraMode: "first-person"
});
assert.equal(first.processed.length, 1);
assert.equal(first.processed[0].cellId, center.id, "Nearest lowest-LOD cell must materialize first.");
assert.equal(terrainSamples, 5, "One island terrain row should be sampled in the first bounded step.");
assert.equal(terrainSource.getRuntimeCell(center.id), null, "A partial island terrain job must not publish a ready runtime handle.");
assert.equal(seaFloorSource.getRuntimeCell(center.id), null, "Sea-floor work must wait for island terrain completion.");

let guard = 0;
while (materializer.getState().progress < 1 && guard < 200) {
  materializer.processFrame({ focus: { x: 0, z: 0 }, cameraMode: "first-person" });
  guard += 1;
}

assert.ok(guard < 200, "Separated terrain jobs should complete under the deterministic frame budget.");
assert.equal(materializer.getState().completedCells, 2);
assert.ok(terrainSource.getRuntimeCell(center.id));
assert.ok(seaFloorSource.getRuntimeCell(center.id));
assert.ok(biome.getRuntimeCell(center.id)?.weights instanceof Float32Array);
assert.ok(shorelineProvider.getRuntimeCell(center.id)?.signedDistance instanceof Float32Array);
assert.ok(seaFloorMaterial.getRuntimeCell(center.id)?.weights instanceof Float32Array);
assert.equal(presentation.runtimeStore.get(center.id).descriptor.materialization, "ready");
assert.ok(presentation.runtimeStore.get(center.id).descriptor.islandTerrainHandleId);
assert.ok(presentation.runtimeStore.get(center.id).descriptor.seaFloorTerrainHandleId);

snapshot = { activeCells: [{ cell: center }] };
materializer.processFrame({ focus: { x: 0, z: 0 }, cameraMode: "first-person" });
assert.equal(materializer.getState().activeCells, 1, "Released Core World cells must leave the lazy scheduler.");

console.log(JSON.stringify({
  terrainSamples,
  frames: materializer.getState().frames,
  workSteps: materializer.getState().workSteps,
  completedCells: materializer.getState().completedCells
}, null, 2));
