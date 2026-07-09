# Render Audit: Cloud / Grass / Host State Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-38-20-04-00`

## Render surface

The repo has a visual/render surface.

`index.html` loads one full-window canvas and `src/main-cloudform.js?v=hero-cloud-4`.

`src/main-cloudform.js` creates a Three.js `WebGLRenderer`, scene, camera, lights, fog, terrain, water, foam, path, foliage, clearing fence, campfire, smoke particles, instanced grass, point-cloud clouds, and a requestAnimationFrame loop.

## Current render loop

```txt
renderer setup
  -> renderer.setPixelRatio(min(devicePixelRatio, 1.5))
  -> ACESFilmicToneMapping
  -> scene background/fog
  -> camera near/far 0.1/6800
  -> add hemisphere and directional sun
  -> add floor, terrain, sea, foam, path, foliage, fence, fire, smoke, grass, clouds
  -> frame updates sea, smoke, flame, cloud drift
  -> camera uses rail() or first-person fp(dt)
  -> renderer.render(scene, camera)
```

## Render domains

```txt
three-render-host-domain
terrain-render-domain
ocean-floor-render-domain
water-plane-domain
shoreline-foam-domain
path-render-domain
foliage-render-domain
clearing-fence-render-domain
campfire-render-domain
smoke-particle-render-domain
grass-instanced-render-domain
cloud-point-cache-render-domain
cloud-drift-render-domain
camera-render-domain
render-frame-loop-domain
planned-render-host-snapshot-domain
```

## Render services

```txt
terrainMesh(heightfield)
floorMesh(heightfield)
waterMesh(material)
foamMesh(shoreline)
pathMesh(pathNetwork, sampleHeight)
objGroup(foliageGraph, exclusions)
fenceGroup(clearingGraph)
campfireMesh(fireGraph)
smokeMesh(smokeDescriptor)
updateSmoke(points, dt, now)
grassMesh(grassPlacement)
heroCloudGeometry(cloudDescriptor)
heroCloudGroup(cloudContract)
cloudMaterial(opacity)
rail()
fp(dt)
frame(now)
```

## Current gaps

```txt
No RenderHostSnapshot exists.
No cloud descriptor/cache readback exists outside legacy CozyIsland.cloudPointCache.
No grass patch/instance parity readback exists.
No renderer state summary exposes pixel ratio, tone mapping, camera mode, object counts, or consumed descriptor counts.
No fixture row proves the cloud and grass descriptors were consumed by the render adapters.
```

## Required render-proof cut

```txt
src/host-proof/render-host-snapshot.js
src/host-proof/grass-placement-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/hero-cloud-descriptor-snapshot.js
src/host-proof/hero-cloud-cache-snapshot.js
src/host-proof/cloud-drift-result.js
```

## Acceptance

```txt
render host snapshot reports route token, scene object counts, camera mode, pixel ratio, tone mapping, grass instance count, cloud geometry count, and point count summaries.
readback is additive and does not replace renderer.render(scene, camera).
legacy globalThis.CozyIsland.cloudPointCache remains available.
```
