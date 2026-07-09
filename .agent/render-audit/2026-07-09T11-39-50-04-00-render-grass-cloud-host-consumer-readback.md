# Render Audit: Render / Grass / Cloud Host Consumer Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-39-50-04-00`

## Current render surface

```txt
WebGLRenderer(canvas#game)
  -> Scene background/fog/lights
  -> PerspectiveCamera
  -> terrainMesh(landform.heightfield)
  -> floorMesh(floor.heightfield)
  -> waterMesh(floor.waterMaterial)
  -> foamMesh(landform.shoreline)
  -> pathMesh(graph.pathNetwork)
  -> objGroup(graph)
  -> fenceGroup(clearing)
  -> campfireMesh(fireGraph)
  -> smokeMesh(smokeD)
  -> grassMesh(grass)
  -> heroCloudGroup(cloudContract)
  -> frame() updates mutable visual state
  -> renderer.render(scene, camera)
```

## Render readback gap

```txt
scene object counts are not captured
camera mode is not captured as rail vs first-person
renderer pixel ratio, tone mapping, fog, and camera settings are not summarized
terrain/floor/grass/cloud descriptor consumption is not proven
cloud cache reuse is only visible through legacy object references
grass requested count and rendered instance count are not compared in a fixture-readable way
```

## Grass readback needed

```txt
input source:
  createGrassPatchPlacementContract(... count: 140 ...)

render consumer:
  grassMesh(placement) creates one THREE.InstancedMesh
  instance capacity uses placement.patches.length
  matrices are written directly in the adapter

proof rows needed:
  seed
  requestedPatchCount
  acceptedPatchCount
  instanceCount
  exclusionZoneCount
  firstPatchTransform
  matrixWrittenCount
```

## Cloud readback needed

```txt
input source:
  createMattatzCloudRenderContract(createMattatzCloudsState(...))

render consumer:
  heroCloudGroup(contract)
  heroCloudGeometry(cloud)
  cloudCache keyed by cloud.id
  clouds.userData.savedPointClouds exposes generated BufferGeometry list
  frame() mutates x, z, and y drift directly

proof rows needed:
  cloudCount
  cacheKeyCount
  pointCloudCount
  totalPointCount
  firstCloudId
  driftVectorSummary
  driftStepResult
  cacheReuseResult
```

## Host readback target

```txt
globalThis.CozyIslandHost.getState() should expose:
  routeToken
  sourceFingerprint
  sceneSourceSnapshot
  inputJournalTail
  movementPolicyTail
  cameraRailSnapshot
  grassPlacementSnapshot
  grassInstanceSnapshot
  heroCloudDescriptorSnapshot
  heroCloudCacheSnapshot
  cloudDriftTail
  renderHostSnapshot
```

## Main render finding

Do not replace the renderer first. Add render/grass/cloud readback records around the existing renderer so downstream fixtures can prove the current scene is being consumed as intended.
