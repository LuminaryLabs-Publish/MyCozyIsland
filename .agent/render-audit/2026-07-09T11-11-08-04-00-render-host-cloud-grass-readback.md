# Render Audit: Render Host / Cloud / Grass Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-11-08-04-00`

## Summary

The render path is visually active but not proof-readable.

The next pass should not change the rendered island. It should expose what the current renderer already consumes: route token, scene descriptor summaries, grass instances, cloud cache, camera mode, and scene object counts.

## Current render loop

```txt
index.html
  -> canvas#game
  -> src/main-cloudform.js
  -> new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: high-performance })
  -> renderer pixel ratio, output color space, tone mapping, exposure
  -> scene background and fog
  -> PerspectiveCamera(58, 1, 0.1, 6800)
  -> hemisphere and directional lights
  -> terrain/floor/water/foam/path/foliage/fence/campfire/smoke/grass/clouds added to scene
  -> requestAnimationFrame frame loop
  -> update moving systems
  -> renderer.render(scene, camera)
```

## Render consumers currently present

```txt
terrainMesh consumes landform.heightfield
floorMesh consumes ocean floor heightfield
waterMesh consumes floor water material
foamMesh consumes landform.shoreline
pathMesh consumes graph.pathNetwork
objGroup consumes foliage object graph and clearing exclusions
fenceGroup consumes clearing objects
campfireMesh consumes campfire object graph
smokeMesh consumes smoke particle descriptor
grassMesh consumes grass patch placement contract
heroCloudGroup consumes Mattatz cloud render contract
```

## Missing render proof

```txt
no RenderHostSnapshot exists
no scene object count snapshot exists
no camera mode/progress snapshot exists
no route token readback exists
no source descriptor count snapshot exists
no grass descriptor-to-instance parity row exists
no cloud descriptor-to-cache parity row exists
no DOM-free fixture proves render consumers received expected descriptors
```

## Render-host snapshot should include

```txt
routeToken: hero-cloud-4
sourceFile: src/main-cloudform.js
threeVersionSource: cdn.jsdelivr.net/npm/three@0.160.0
renderer:
  pixelRatioCap: 1.5
  toneMapping: ACESFilmicToneMapping
  toneMappingExposure: 1.08
camera:
  fov: 58
  near: 0.1
  far: 6800
scene:
  hasBackground: true
  hasFog: true
  rootObjects: count
  renderConsumers: terrain/floor/water/foam/path/foliage/fence/campfire/smoke/grass/clouds
clouds:
  descriptorCount
  cachedGeometryCount
  totalPointCount
grass:
  requestedPatchCount
  instancedMeshCount
```

## Acceptance rows

```txt
row: route-load
  assert route token is hero-cloud-4
  assert source file is src/main-cloudform.js

row: descriptor-consumption
  assert island, floor, clearing, smoke, grass, and cloud descriptors exist

row: grass-render-parity
  assert grass requested patches match rendered instance count after exclusions

row: cloud-cache-parity
  assert cloud descriptor count matches cached geometry count

row: render-host-state
  assert scene/camera/renderer snapshot is serializable without DOM-specific object references
```

## Deferred render work

```txt
visual rewrite
renderer extraction
cloud shader replacement
grass blade renderer replacement
full scene graph normalization
post-processing
screenshots
```

## Next safe ledge

```txt
MyCozyIsland Host Proof Ledger Parity + Browser Consumer Fixture Gate
```