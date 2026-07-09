# Render Audit: Consumer Readback Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T00-20-08-04-00`

## Current render surface

`src/main-cloudform.js` creates a single WebGL render host with:

```txt
THREE.WebGLRenderer
THREE.Scene
THREE.PerspectiveCamera
HemisphereLight
DirectionalLight
FogExp2
water plane
terrain mesh
floor mesh
shoreline foam tube
path mesh group
foliage object group
fence group
campfire group
smoke Points
grass InstancedMesh
hero cloud Points group
```

## Render consumers

```txt
terrainMesh consumes landform.heightfield
floorMesh consumes floor.heightfield
waterMesh consumes floor.waterMaterial
foamMesh consumes landform.shoreline
pathMesh consumes graph.pathNetwork and sampleHeight
objGroup consumes graph.objects and clearing exclusions
fenceGroup consumes clearing.objects
campfireMesh consumes fireGraph root and flame/light children
smokeMesh consumes smoke particle descriptor
updateSmoke consumes descriptor wind, lifespan, and per-particle state
grassMesh consumes grass placement patches and writes InstancedMesh matrices
heroCloudGeometry consumes hero cloud contract and caches BufferGeometry by cloud id
heroCloudGroup consumes cloud contract and stores savedPointClouds
frame consumes renderer/scene/camera and mutates animated surfaces before render
```

## Missing render readback

```txt
RenderHostSnapshot does not exist.
RenderConsumerRecord does not exist.
FrameRenderRecord does not exist.
GrassInstanceSnapshot does not exist.
HeroCloudCacheSnapshot does not exist.
CloudDriftResult does not exist.
```

## Required readback rows

```txt
renderer:
  pixelRatioClampedTo <= 1.5
  toneMapping ACESFilmicToneMapping
  exposure 1.08

scene:
  background 0xf3cfa6
  fog Exp2 0xf3cfa6 0.00072
  light count includes hemisphere and directional sun

camera:
  perspective fov 58
  far plane 6800
  aspect updates on resize

consumers:
  terrain/floor/path/foam/foliage/fence/fire/smoke/grass/cloud consumers recorded
  source descriptor ids preserved
  source counts and render counts compared

frame:
  sea bob mutation recorded
  smoke update recorded
  flame scale mutation recorded
  cloud drift mutation recorded
  renderer render call counted
```

## Finding

The render surface should be preserved. The next source change should add read-only render consumer records and a fixture-level `RenderHostSnapshot`, then expose the snapshot through `globalThis.CozyIslandHost.getState().render`.