# Render Audit: Consumption Host Readback Gap

**Timestamp:** `2026-07-10T04-29-10-04-00`

## Visual surface

`MyCozyIsland` has a visible Three.js/WebGL route. The active render surface is `canvas#game` in `index.html`, driven by `src/main-cloudform.js` and Three.js 0.160.0 from CDN.

## Current render consumers

```txt
floorMesh(floor.heightfield)
terrainMesh(landform.heightfield)
waterMesh(floor.waterMaterial)
foamMesh(landform.shoreline)
pathMesh(graph.pathNetwork, h)
objGroup(graph, clearing.objectExclusionZones)
fenceGroup(clearing)
campfireMesh(fireGraph)
smokeMesh(smokeD)
grassMesh(grass)
heroCloudGroup(cloudContract)
renderer.render(scene, camera)
```

## Gaps

```txt
No render consumption ledger exists.
No terrain/floor/shoreline/path/object count parity exists.
Ocean-floor object placements are generated but not consumed as distinct visible adapters.
Several foliage/object types still flow through generic fallback adapters.
Grass descriptors include patch and batch details, but active rendering creates one cone instance per patch.
Cloud geometry cache keys by cloud id only and has no descriptor fingerprint readback.
Legacy diagnostics expose live BufferGeometry objects, not JSON-serializable proof.
```

## Next render gate

Add render consumption rows that reconcile source families with consumed objects. Add a JSON-serializable render host snapshot through an additive `CozyIslandHost` surface. Preserve `globalThis.CozyIsland` compatibility.

## Do not start next

```txt
renderer replacement
WebGPU migration
cloud visual rewrite
grass visual rewrite
camera retune
new art pass
```
