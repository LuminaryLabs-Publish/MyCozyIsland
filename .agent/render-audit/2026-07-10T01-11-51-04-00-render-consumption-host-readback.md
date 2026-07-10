# Render Audit: Render Consumption Host Readback

**Timestamp:** `2026-07-10T01-11-51-04-00`

## Current render surface

The route renders through Three.js 0.160.0 from `src/main-cloudform.js`.

## Current render consumers

```txt
terrainMesh consumes landform heightfield samples
floorMesh consumes ocean floor heightfield samples
waterMesh consumes floor.waterMaterial partially
foamMesh consumes landform shoreline
pathMesh consumes graph.pathNetwork
tree/rock object group consumes foliage objects with fallback rendering
fenceGroup consumes clearing fence-post objects
campfireMesh consumes campfire object graph
smokeMesh consumes smoke descriptor
updateSmoke mutates smoke positions per frame
grassMesh consumes grass.patches only as one cone per patch
heroCloudGroup consumes cloud render contract
heroCloudGeometry caches geometry by cloud.id only
frame loop submits renderer.render(scene, camera)
```

## Render gaps

```txt
No render consumption ledger exists.
No source-to-render count parity exists.
Ocean-floor placements are generated but not all consumed as distinct render adapters.
Several foliage object types fall into generic rock rendering.
Grass static batch descriptors are not rendered.
Grass bladeCount and patchRadius are not represented in readback.
Cloud geometry cache does not fingerprint descriptor changes.
No serializable renderer, scene, camera, grass, or cloud snapshot exists.
Legacy diagnostics expose live BufferGeometry objects.
```

## Required next readback

```txt
source family
source id
source count
consumer adapter
accepted count
rejected count
skip reason
render primitive kind
serializable render snapshot
legacy parity status
```

## Render finding

The next render work should not change style or fidelity. First add source-to-render consumption rows and a serializable host readback surface.
