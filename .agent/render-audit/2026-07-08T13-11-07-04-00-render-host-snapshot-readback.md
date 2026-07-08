# Render Audit — Render Host Snapshot Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T13-11-07-04-00`

## Current render surface

The current route has a visual/render surface and should retain it.

The render host is concentrated in `src/main-cloudform.js` and adapts source descriptors into Three.js objects inline.

## Current render path

```txt
source descriptors
  -> terrainMesh
  -> floorMesh
  -> waterMesh
  -> foamMesh
  -> pathMesh
  -> objGroup
  -> fenceGroup
  -> campfireMesh
  -> smokeMesh / updateSmoke
  -> grassMesh
  -> heroCloudGeometry / heroCloudGroup
  -> renderer.render(scene, camera)
```

## Descriptor-to-render handoff map

```txt
ocean-island-landform render contract
  -> terrainMesh(landform.heightfield)
  -> foamMesh(landform.shoreline)
  -> pathMesh(graph.pathNetwork, h)

ocean-floor render contract
  -> floorMesh(floor.heightfield)
  -> waterMesh(floor.waterMaterial)

island-foliage object graph
  -> objGroup(graph, clearing.objectExclusionZones)

fenced clearing graph
  -> fenceGroup(clearing)
  -> valid(next) movement boundary read

campfire object graph
  -> campfireMesh(fireGraph)
  -> flame scale animation

smoke particle descriptor
  -> smokeMesh(smokeD)
  -> updateSmoke(smoke, dt, now)

grass patch placement contract
  -> grassMesh(grass)
  -> InstancedMesh cone geometry

mattatz cloud render contract / hero cloud form
  -> heroCloudGeometry(cloud)
  -> heroCloudGroup(cloudContract)
  -> cloudCache Map
  -> per-frame cloud drift
```

## Current render readback gaps

```txt
No RenderHostSnapshot exists.
No source-to-render adapter summary exists.
No terrain/floor/water/foam/path/foliage/fence/campfire/smoke/grass/cloud adapter count summary exists.
No HeroCloudCacheSnapshot exists.
No smoke runtime snapshot exists.
No grass instance count readback exists.
No cloud drift result is recorded outside mutation of Three.js point objects.
No camera rail sample readback exists outside the camera object.
No `globalThis.CozyIslandHost.render` projection exists.
```

## Required render snapshot shape

```txt
RenderHostSnapshot
  routeToken
  rendererKind
  sceneObjectCounts
  sourceDescriptorCounts
  terrainVertexCount
  floorVertexCount
  grassInstanceCount
  smokeParticleCount
  cloudPointCloudCount
  cloudPointCountTotal
  cachedCloudGeometryCount
  cameraMode
  railProgress
  legacyGlobalPresent
```

## Do not do yet

```txt
Do not rewrite the renderer.
Do not change grass geometry.
Do not change cloud shader material.
Do not change terrain/water materials.
Do not change camera rail composition.
```

## Next proof

Add a pure render/readback helper that can accept source snapshot plus host adapter facts and return a fixture-readable `RenderHostSnapshot`.

Only wire it into the browser after the DOM-free fixture rows pass.
