# Render audit: render consumption proof ledger

**Timestamp:** `2026-07-10T02-31-58-04-00`

## Current render surface

`src/main-cloudform.js` creates a Three.js renderer and adapts source descriptors into visible scene objects.

Current adapters include:

```txt
terrainMesh(landform.heightfield)
floorMesh(floor.heightfield)
waterMesh(floor.waterMaterial)
foamMesh(landform.shoreline)
pathMesh(graph.pathNetwork, h)
objGroup(graph, clearing.objectExclusionZones)
fenceGroup(clearing)
campfireMesh(fireGraph)
smokeMesh(smokeD)
grassMesh(grass)
heroCloudGroup(cloudContract)
```

## Render gaps

```txt
no source-to-render consumption ledger
no renderer/scene/camera serializable snapshot
no terrain/floor/shoreline/path/object count parity
no ocean-floor object placement consumption rows
no foliage type-to-adapter rows
no grass batch descriptor consumption rows
no cloud descriptor/cache/drift rows
no render-frame proof row
```

## Render proof rows needed

```txt
sourceFamily
sourceId
requestedCount
acceptedCount
skippedCount
skipReasons
adapterName
renderObjectType
serializableRenderSummary
```

## Host readback target

```txt
globalThis.CozyIslandHost.getState().render = {
  routeToken,
  sourceFingerprint,
  sceneSummary,
  cameraSnapshot,
  rendererSnapshot,
  consumptionLedger
}
```

## Validation target

The DOM-free fixture should validate ledger construction without WebGL. Browser smoke can follow after proof rows exist.
