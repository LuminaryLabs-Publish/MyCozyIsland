# Render Audit: Render Cloud/Grass Readback Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T08-20-00-04-00`

## Current render surface

```txt
src/main-cloudform.js
  -> WebGLRenderer(canvas)
  -> Scene + fog + hemisphere light + sun
  -> terrain mesh
  -> ocean floor mesh
  -> water plane
  -> shoreline foam tube
  -> path mesh
  -> foliage object graph
  -> fence group
  -> campfire group
  -> smoke points
  -> grass InstancedMesh
  -> hero cloud point clouds
  -> renderer.render(scene, camera)
```

## Readback gap

```txt
The renderer consumes descriptors, but the route cannot prove which descriptors were consumed.
There is no RenderHostSnapshot.
There is no GrassInstanceSnapshot.
There is no HeroCloudCacheSnapshot.
There is no CloudDriftResult.
```

## Required render proof

```txt
RenderHostSnapshot:
  routeToken
  pixelRatio
  toneMapping
  cameraMode
  sceneObjectCount
  terrainPresent
  floorPresent
  waterPresent
  grassInstanceCount
  cloudPointCount
  cloudCacheGeometryCount
  lastFrameNumber

GrassInstanceSnapshot:
  requestedPatchCount
  renderedInstanceCount
  acceptedPatchSummary
  exclusionZonesApplied

HeroCloudCacheSnapshot:
  cloudCount
  cacheKeyCount
  geometryPointCounts

CloudDriftResult:
  frame
  dt
  accepted
  movedCloudCount
  driftDistanceSummary
```

## Acceptance

The next implementation should expose additive `globalThis.CozyIslandHost.getState().render`, `.grass`, and `.clouds` records while preserving the existing `globalThis.CozyIsland` shape.
