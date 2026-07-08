# Render Route Token Readback Audit

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T10-28-44-04-00`

## Current visual surface

`MyCozyIsland` is still a static Three.js canvas route.

```txt
index.html
  -> canvas#game
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> THREE.WebGLRenderer
  -> terrain/floor/water/foam/path/foliage/fence/campfire/smoke/grass/cloud objects
  -> requestAnimationFrame(frame)
```

## Renderer authority boundary

The renderer can remain inline in `src/main-cloudform.js` for the next pass.

The urgent boundary is not extracting WebGL code. The urgent boundary is proving that the render host consumes the same source token and source descriptors that the fixture system sees.

## Current render adapters

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
updateSmoke(smoke, dt, now)
cloud drift loop over clouds.children
renderer.render(scene, camera)
```

## Render-readback gap

```txt
route token:
  source: index.html script query string
  current value: hero-cloud-4
  proof state: missing RouteVersionResult

renderer source inputs:
  landform, floor, clearing, graph, wind, fireGraph, smokeD, grass, cloudContract
  proof state: missing SceneSourceSnapshot

cloud cache:
  source: cloudCache Map + clouds.userData.savedPointClouds
  legacy readback: globalThis.CozyIsland.cloudPointCache
  proof state: missing HeroCloudCacheSnapshot

cloud drift:
  source: per-frame mutation of c.position.x/z/y
  proof state: missing CloudDriftResult

camera rail:
  source: rail() and progress
  proof state: missing CameraRailSnapshot

first-person movement:
  source: fp(dt), valid(next), keys Set
  proof state: missing ActionResult and MovementPolicyResult
```

## Renderer should not own these facts

```txt
RouteVersionResult
SourceProfile
SourceFingerprint
SceneSourceSnapshot
ActionFrame
ActionResult
MovementPolicyResult
CameraRailSnapshot
HeroCloudDescriptorSnapshot
HeroCloudCacheSnapshot
CloudDriftResult
CozyIslandHostSnapshot
```

These are proof-domain facts. The renderer may consume them or expose readbacks, but it should not be the canonical authority for them.

## Required render fixture readback

The next fixture/run should prove:

```txt
cozy-route-version-001:
  observed route token is hero-cloud-4

cozy-scene-source-001:
  descriptor counts and source ids are stable before Three.js object construction

cozy-camera-rail-001:
  camera samples can be computed without a real PerspectiveCamera

cozy-cloud-descriptor-001:
  hero cloud descriptors are stable and independent from point geometry allocation

cozy-cloud-cache-001:
  cache readback reports cloud ids, point counts, and geometry counts without exposing BufferGeometry internals

cozy-cloud-drift-001:
  fixed dt/time inputs return deterministic drift deltas before renderer mutation

cozy-host-snapshot-001:
  additive globalThis.CozyIslandHost mirrors proof records while globalThis.CozyIsland remains backward compatible
```

## Stop line

Do not rewrite terrain, foliage, grass, water, smoke, or cloud rendering in the route-token sync pass.

Stop when render readback proves the route token and source records are aligned to `hero-cloud-4` and the existing visual scene still uses the same visible route.
