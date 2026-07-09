# Render Audit: Render Host Consumer Projection Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T21-58-34-04-00`

## Current render surface

The visual surface is a single full-screen `canvas#game` mounted by `index.html` and controlled by `src/main-cloudform.js`.

The entry script imports Three.js from CDN and constructs renderer, scene, camera, lights, fog, land, floor, water, foam, path, foliage, fence, campfire, smoke, grass, and hero cloud points inline.

## Current render loop

```txt
main()
  -> create descriptor outputs
  -> create WebGLRenderer
  -> create Scene and PerspectiveCamera
  -> build floorMesh, terrainMesh, waterMesh, foamMesh, pathMesh
  -> build objGroup, fenceGroup, campfireMesh, smokeMesh, grassMesh, heroCloudGroup
  -> scene.add(...)
  -> frame(now)
  -> sea bob
  -> fp(dt) or rail()
  -> updateSmoke
  -> flame pulse
  -> cloud drift
  -> renderer.render(scene, camera)
  -> requestAnimationFrame(frame)
```

## Render consumers

```txt
terrainMesh consumes landform.heightfield
floorMesh consumes floor.heightfield
waterMesh consumes floor.waterMaterial
foamMesh consumes landform.shoreline
pathMesh consumes graph.pathNetwork
objGroup consumes graph.objects and clearing exclusions
fenceGroup consumes clearing.objects
campfireMesh consumes fireGraph
smokeMesh consumes smokeD
grassMesh consumes grass.patches
heroCloudGroup consumes cloudContract.clouds
heroCloudGeometry consumes cloud point descriptors and cloudCache
```

## Current missing projections

```txt
RenderHostSnapshot does not exist.
render frame count is not recorded.
scene child count is not recorded.
renderer pixel ratio / tone mapping / exposure are not projected.
camera fov / near / far / aspect are not projected.
mesh consumer counts are not projected.
gras InstancedMesh count is not compared with placement.patchCount.
hero cloud point count and cache count are not projected.
```

## Target RenderHostSnapshot

```txt
RenderHostSnapshot:
  routeToken
  renderer:
    type
    pixelRatio
    outputColorSpace
    toneMapping
    toneMappingExposure
  camera:
    type
    fov
    near
    far
    aspect
    mode
    position
    lookTarget
  scene:
    childCount
    fogType
    background
    lightCount
  consumers:
    terrainHeightSamples
    floorHeightSamples
    shorelineSegments
    pathSegments
    foliageObjectsRead
    fencePostsRead
    grassPatchCount
    grassInstanceCount
    cloudCount
    cloudPointCount
    smokeParticleCount
  frame:
    frameIndex
    progress
    dt
    seaY
```

## Browser splice points

```txt
after renderer creation:
  record renderer facts

after scene/camera creation:
  record static render host facts

after scene.add(...):
  record consumer counts

inside frame(now):
  record current camera mode, progress, dt, seaY, and cloud drift facts

inside global projection:
  expose render section through globalThis.CozyIslandHost.getState().render
```

## Validation rows

```txt
render_host_snapshot_exists_without_webgl_context
render_host_snapshot_reports_route_token
render_host_snapshot_reports_expected_consumer_sections
render_host_snapshot_counts_grass_patch_and_instance_count
render_host_snapshot_counts_cloud_points
render_host_snapshot_preserves_legacy_global_surface
```
