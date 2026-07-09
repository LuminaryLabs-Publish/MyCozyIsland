# Render Audit — Render / Cloud / Grass Host Readback

**Timestamp:** `2026-07-09T14-28-45-04-00`

## Current render path

```txt
src/main-cloudform.js
  -> new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: high-performance })
  -> renderer pixel ratio capped to 1.5
  -> SRGB output and ACES tone mapping
  -> scene background/fog/lights
  -> floorMesh, terrainMesh, waterMesh, foamMesh, pathMesh
  -> objGroup, fenceGroup, campfireMesh, smokeMesh, grassMesh, heroCloudGroup
  -> frame loop mutates sea/smoke/flame/clouds
  -> renderer.render(scene, camera)
```

## Current render consumers

```txt
terrain consumer:
  source: ocean-island-landform render contract
  consumer: terrainMesh
  missing readback: sample count, mask coverage, material class, scene insertion row

floor consumer:
  source: ocean-floor render contract
  consumer: floorMesh and waterMesh
  missing readback: floor sample count, water material summary, scene insertion row

shoreline consumer:
  source: landform.shoreline
  consumer: foamMesh TubeGeometry
  missing readback: shoreline segment count and foam material summary

path consumer:
  source: graph.pathNetwork
  consumer: pathMesh
  missing readback: segment count, width summary, height sampler source

foliage consumer:
  source: dense object graph
  consumer: objGroup
  missing readback: input object count, excluded count, rendered tree/rock count

clearing/fence consumer:
  source: fenced clearing graph
  consumer: fenceGroup and movement valid(next)
  missing readback: boundary radius, post count, rail count, movement policy row

campfire/smoke consumer:
  source: campfire graph and smoke descriptor
  consumer: campfireMesh, smokeMesh, updateSmoke
  missing readback: particle count, wind response, flame/light summary, frame update row

grass consumer:
  source: grass patch placement contract
  consumer: grassMesh InstancedMesh
  missing readback: requested patch count, accepted instance count, exclusion summary

cloud consumer:
  source: mattatz cloud render contract
  consumer: heroCloudGroup, heroCloudGeometry, cloudCache, frame drift
  missing readback: cloud count, point count, cache key count, drift delta row
```

## Render risk

Render output is currently visually useful but not consumption-proof. Without host readback, an implementation can change descriptors, cache behavior, grass counts, camera mode, or scene object counts without a DOM-free way to detect mismatch.

## Required render proof rows

```txt
RenderHostSnapshot:
  routeToken
  rendererPixelRatio
  toneMapping
  cameraFov
  sceneChildCount
  terrainSampleCount
  floorSampleCount
  pathSegmentCount
  foliageRenderedCount
  fencePostCount
  smokeParticleCount
  grassInstanceCount
  cloudCount
  cloudPointCount
  cloudCacheKeyCount
  cameraMode
  progress

GrassInstanceSnapshot:
  requestedPatches
  acceptedInstances
  instancedMeshCount
  windDescriptorId
  exclusionZonesApplied

HeroCloudCacheSnapshot:
  cloudCount
  cachedGeometryCount
  totalPointCount
  cacheReusePolicy

CloudDriftResult:
  frameDt
  driftedCloudCount
  averageDeltaX
  averageDeltaZ
  bobAmplitude
```

## Do not change yet

```txt
Do not replace point-cloud cloud shader.
Do not replace grass InstancedMesh.
Do not change camera rail constants.
Do not change scene colors or fog.
Do not extract renderer until readback is in place.
```
