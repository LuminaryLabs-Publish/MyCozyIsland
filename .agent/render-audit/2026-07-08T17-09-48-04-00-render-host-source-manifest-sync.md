# Render Audit: Render Host Source Manifest Sync

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-09-48-04-00`

## Current render surface

The visual surface is a single static page and full-window WebGL canvas.

```txt
index.html
  -> canvas#game
  -> src/main-cloudform.js?v=hero-cloud-4
  -> THREE.WebGLRenderer
  -> PerspectiveCamera
  -> Scene / fog / lights
  -> inline mesh/point adapters
```

## Render adapters currently inline

```txt
meshGrid
terrainMesh
floorMesh
waterMesh
foamMesh
pathMesh
objGroup
fenceGroup
campfireMesh
smokeMesh
updateSmoke
grassMesh
cloudMaterial
heroCloudGeometry
heroCloudGroup
frame
```

## Current render facts not yet fixture-readable

```txt
active route token: hero-cloud-4
canvas selector: #game
renderer pixel ratio cap: 1.5
camera fov: 58
camera far plane: 6800
fog color: 0xf3cfa6
fog density: 0.00072
water mesh size: 3600 x 3600
terrain heightfield resolution: 129
ocean floor resolution: 53
grass patch count: 140
smoke particle count: 96
cloud geometry cache: private Map keyed by cloud id
legacy cloud geometry readback: globalThis.CozyIsland.cloudPointCache
```

## Gap

The renderer draws the scene, but there is no `RenderHostSnapshot` that records what source descriptors created, what render adapters consumed, or which high-value counts are expected.

## Required RenderHostSnapshot shape

```txt
RenderHostSnapshot
  routeVersion
  canvas
  renderer
    pixelRatioCap
    outputColorSpace
    toneMapping
    toneMappingExposure
  camera
    fov
    near
    far
    aspect
    mode
  scene
    background
    fog
    lightCount
  terrain
    heightfieldResolution
    shorelineSegments
  oceanFloor
    resolution
    size
  grass
    requestedCount
    renderedInstanceCount
  smoke
    particleCount
  clouds
    contractCloudCount
    cachedGeometryCount
    totalPointCount
  compatibility
    cozyIslandPresent
    cozyIslandHostPresent
```

## Source splice order

```txt
1. Create pure render-host snapshot helper in src/host-proof/host-snapshot.js.
2. Add render fixture rows without importing Three.js.
3. After fixture pass, call the helper from src/main-cloudform.js after scene construction.
4. Update snapshot per frame only for dynamic camera/render facts.
5. Expose through globalThis.CozyIslandHost.getState().render.
6. Keep globalThis.CozyIsland unchanged.
```

## Acceptance rows

```txt
cozy-render-host-snapshot-001
cozy-render-route-token-hero-cloud-4-001
cozy-render-grass-instance-count-001
cozy-render-smoke-particle-count-001
cozy-render-cloud-cache-count-001
cozy-render-legacy-compatibility-001
```

## Do not change in this slice

```txt
terrain colors
water material
foam material
path material
foliage shapes
fence shapes
campfire shape
smoke visual behavior
grass geometry
hero cloud point material
camera rail points
fog/tone mapping
```
