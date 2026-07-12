import assert from "node:assert/strict";
import {
  createCozyOceanCompositionKit,
  createCozyOceanLayerGraph,
  validateCozyOceanLayerGraph
} from "../src/kits/cozy-ocean-composition-kit.js";
import { COZY_RENDER_LAYERS } from "../src/kits/render-layers.js";

const graph = createCozyOceanLayerGraph();
const validation = validateCozyOceanLayerGraph(graph);
assert.equal(validation.valid, true, validation.issues.join("\n"));
assert.deepEqual(validation.orderedPasses.map(pass => pass.id), [
  "background",
  "opaque-world",
  "water-composite",
  "atmosphere-composite",
  "foam-overlay",
  "output-transform"
]);
assert.equal(graph.finalScenePassId, "foam-overlay");
assert.equal(validation.orderedPasses.at(-2).id, "foam-overlay");
assert.equal(validation.orderedPasses.at(-1).technical, true);

const kit = createCozyOceanCompositionKit();
assert.equal(kit.contracts.islandTerrain.depthWrite, true);
assert.equal(kit.contracts.seaFloorTerrain.depthWrite, true);
assert.equal(kit.contracts.water.depthWrite, false);
assert.equal(kit.contracts.water.layer, COZY_RENDER_LAYERS.WATER_SURFACE);
assert.equal(kit.contracts.foam.finalSceneContent, true);
assert.equal(kit.contracts.foam.layer, COZY_RENDER_LAYERS.FOAM_OVERLAY);
assert.doesNotThrow(() => JSON.stringify(kit.graph));

const invalidHandoff = validateCozyOceanLayerGraph({
  ...graph,
  metadata: {
    ...graph.metadata,
    terrainHandoff: { islandShelfDepth: -5, seaFloorMinimumDepth: -4.5, minimumVerticalGap: 1 }
  }
});
assert.equal(invalidHandoff.valid, false);
assert.ok(invalidHandoff.issues.includes("island-seafloor-handoff-overlap"));

console.log("render-layer-graph: foam final and pass contracts passed");
