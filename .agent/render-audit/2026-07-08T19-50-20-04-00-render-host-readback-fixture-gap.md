# MyCozyIsland Render Host Readback Fixture Gap

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T19-50-20-04-00`

## Current render surface

```txt
index.html canvas#game
  -> WebGLRenderer
  -> Scene
  -> PerspectiveCamera
  -> terrain mesh
  -> ocean floor mesh
  -> water mesh
  -> shoreline foam mesh
  -> path mesh
  -> foliage object group
  -> fence group
  -> campfire mesh/light
  -> smoke points
  -> grass instanced mesh
  -> hero cloud point group
```

## Render services observed

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
rail
frame
renderer.render(scene, camera)
```

## Current readback gap

The renderer is visually productive but not proof-readable. `renderer`, `scene`, `camera`, `sea`, `fire`, `smoke`, `grassObj`, and `clouds` exist as local runtime objects, while fixture consumers cannot read a stable `RenderHostSnapshot`.

## Required readback records

```txt
RenderHostSnapshot:
  routeToken
  rendererType
  pixelRatioPolicy
  sceneObjectCount
  cameraMode
  cameraPosition
  cameraLookTarget
  waterY
  flameScale
  smokeParticleCount
  grassInstanceCount
  cloudPointCount
  frameNumber
  lastFrameDeltaSeconds
```

## Fixture rows

```txt
render_host_snapshot_reports_renderer_camera_scene_frame
global_host_snapshot_reports_render_record
legacy_global_cozy_island_still_exists
```

## Non-goals

```txt
do not change renderer output first
do not replace WebGLRenderer
do not replace hero-cloud material
do not change route token
do not promote render kits before fixture proof
```
