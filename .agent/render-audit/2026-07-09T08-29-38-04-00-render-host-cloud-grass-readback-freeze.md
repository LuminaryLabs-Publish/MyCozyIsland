# MyCozyIsland Render Audit

**Generated:** `2026-07-09T08-29-38-04-00`

## Render surface

`MyCozyIsland` has a visual/render surface. `src/main-cloudform.js` creates the Three.js renderer, scene, fog, camera, lights, terrain, floor, water, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud cloud render objects.

## Current render loop

```txt
source descriptors
  -> mesh adapter functions
  -> scene.add(...)
  -> requestAnimationFrame(frame)
  -> sea bob
  -> rail camera or first-person camera
  -> smoke particle update
  -> flame scale update
  -> cloud drift mutation
  -> renderer.render(scene, camera)
```

## Render domains

```txt
three-render-host-domain
scene-composition-domain
terrain-render-domain
ocean-floor-render-domain
water-plane-domain
shoreline-foam-domain
path-render-domain
foliage-render-domain
fence-render-domain
campfire-render-domain
smoke-render-domain
grass-instanced-render-domain
hero-cloud-point-render-domain
cloud-material-shader-domain
cloud-drift-frame-domain
camera-rail-domain
first-person-camera-domain
render-host-readback-domain
```

## Render services

```txt
create WebGLRenderer with antialias and high-performance preference
cap pixel ratio to 1.5
set sRGB output color space
set ACES tone mapping and exposure
create scene background and exponential fog
create perspective camera
create hemisphere and directional lighting
project terrain and ocean floor heightfields into BufferGeometry
project shoreline into TubeGeometry foam
project path network into mesh segments
project foliage/fence/campfire descriptors into mesh groups
project grass patches into one InstancedMesh
project cloud descriptors into cached BufferGeometry point clouds
submit one render frame per requestAnimationFrame tick
```

## Readback gap

```txt
No RenderHostSnapshot exists.
No scene object count is exposed.
No cloud descriptor count is exposed in a stable host state.
No cloud cache key/point count snapshot exists outside legacy cloudPointCache.
No grass placement/instance count snapshot exists.
No camera mode/progress snapshot is exposed.
No fixture proves descriptor consumption by the renderer.
```

## Required render proof

```txt
RenderHostSnapshot:
  routeToken
  rendererPixelRatio
  toneMapping
  cameraMode
  cameraPositionSummary
  sceneObjectCount
  terrainResolution
  floorResolution
  grassRequestedPatchCount
  grassInstanceCount
  cloudDescriptorCount
  cloudCachedGeometryCount
  cloudPointCountTotal
  legacyCozyIslandPresent
```

## Stop line

Do not replace render style, cloud shaders, grass geometry, camera rail timing, or the legacy host surface. Only add additive readback and fixture rows.
