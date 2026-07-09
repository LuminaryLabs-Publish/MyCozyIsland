# Render Audit: Render Grass Cloud Host Consumer Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-39-07-04-00`

## Current render surface

`src/main-cloudform.js` owns the full render surface inline.

```txt
Three.WebGLRenderer
  -> scene background/fog/lights
  -> floorMesh(floor.heightfield)
  -> terrainMesh(landform.heightfield)
  -> waterMesh(floor.waterMaterial)
  -> foamMesh(landform.shoreline)
  -> pathMesh(graph.pathNetwork)
  -> objGroup(graph)
  -> fenceGroup(clearing)
  -> campfireMesh(fireGraph)
  -> smokeMesh(smokeD)
  -> grassMesh(grass)
  -> heroCloudGroup(cloudContract)
  -> renderer.render(scene, camera)
```

## Render domains

```txt
three-render-host-domain
scene-lighting-domain
fog-background-domain
terrain-mesh-domain
ocean-floor-mesh-domain
water-plane-domain
shoreline-foam-domain
path-mesh-domain
foliage-mesh-domain
fence-mesh-domain
campfire-mesh-domain
smoke-points-domain
grass-instanced-render-domain
hero-cloud-point-cache-domain
cloud-shader-domain
cloud-drift-frame-domain
render-submit-domain
```

## Consumer-readback gap

The renderer consumes the source descriptors, but there is no stable render snapshot describing:

```txt
route token consumed
scene object count
heightfield resolution consumed
grass patch count consumed
grass instance matrix count consumed
cloud descriptor count consumed
cloud point cache geometry count consumed
cloud drift applied per frame
camera mode rail/fp
renderer pixel ratio
renderer color/tone mapping state
legacy diagnostic parity
```

## Required next render proof

Add `render-host-snapshot-kit`, `grass-instance-snapshot-kit`, `hero-cloud-cache-snapshot-kit`, and `cloud-drift-result-kit` before changing visuals.

Do not modify render style, fog, water opacity, grass geometry, cloud shaders, or camera composition during the readback ledge.
