# Render Audit: Render Host Grass/Cloud Readback Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-21-06-04-00`

## Current render surface

```txt
Three.js WebGLRenderer
  -> SRGB output
  -> ACESFilmic tone mapping
  -> scene background/fog
  -> hemisphere light + directional sun
  -> terrain mesh
  -> ocean floor mesh
  -> water plane
  -> shoreline foam tube
  -> path strips
  -> foliage object graph projection
  -> fence mesh group
  -> campfire + flame + point light
  -> smoke point particles
  -> grass InstancedMesh
  -> hero cloud Points groups
```

## Render consumer gaps

```txt
renderer setup is inline in src/main-cloudform.js.
terrain/floor/path/foliage/fence/campfire/smoke/grass/cloud adapters do not produce readback records.
grassMesh consumes placement.patches but does not expose requested/accepted/instance counts.
heroCloudGeometry caches by cloud id but does not expose cache key reuse or point count summaries through host state.
cloud drift mutates live Points positions without a CloudDriftResult.
frame() submits renderer.render(scene, camera) without RenderHostSnapshot output.
```

## Required readback rows

```txt
RenderHostSnapshot:
  routeToken
  rendererPixelRatio
  toneMapping
  toneMappingExposure
  sceneObjectCount
  cameraMode
  cameraPosition
  cameraLookTarget
  frameNumber

GrassPlacementSnapshot:
  seed
  requestedPatchCount
  acceptedPatchCount
  exclusionZoneCount
  pathNetworkPresent

GrassInstanceSnapshot:
  instanceCount
  geometryKind
  materialKind
  matrixUpdated

HeroCloudDescriptorSnapshot:
  cloudCount
  totalPointBudget
  minPointSize
  maxPointSize
  opacityRange

HeroCloudCacheSnapshot:
  cacheKeyCount
  savedPointCloudCount
  totalCachedPointCount

CloudDriftResult:
  cloudId
  dt
  driftVector
  speed
  yBob
```

## Acceptance rule

The next implementation should prove that the browser consumed the same source descriptors it constructed. The proof should be additive and DOM-free where possible.

## Do not change

```txt
visual palette
camera rail timing
cloud shader look
grass geometry choice
legacy globalThis.CozyIsland fields
```
