# Render Audit: Render Host Cloud/Grass Consumer Readback

**Timestamp:** `2026-07-09T08-11-12-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Current render surface

The route is a visual Three.js scene with a full-screen canvas. `index.html` loads `./src/main-cloudform.js?v=hero-cloud-4`; the runtime creates the renderer, scene, camera, lights, fog, terrain, floor, water, foam, path, foliage, fence, campfire, smoke, grass, and cloud points inline.

## Render interaction loop

```txt
source descriptors
  -> terrainMesh / floorMesh / waterMesh / foamMesh / pathMesh
  -> objGroup / fenceGroup / campfireMesh / smokeMesh / grassMesh / heroCloudGroup
  -> scene.add(...)
  -> frame(now)
  -> update sea height
  -> update camera from rail or first-person state
  -> update smoke particles
  -> update flame scale
  -> mutate cloud point object positions
  -> renderer.render(scene, camera)
```

## Current renderer readback

```txt
globalThis.CozyIsland.cloudContract
globalThis.CozyIsland.cloudPointCache
globalThis.CozyIsland.getScrollProgress()
```

This is useful but too narrow. It does not report route token, source fingerprint, accepted descriptor counts, grass instance counts, camera mode, rail state, cloud drift result, scene object summary, render host settings, or frame count.

## Render gaps

```txt
no RenderHostSnapshot
no SceneSourceSnapshot tied to render adapters
no route token readback beyond script URL
no camera mode readback
no rail progress/eased-progress readback
no grass descriptor-to-instance readback
no cloud descriptor-to-cache readback
no cloud drift result rows
no render fixture rows
no additive globalThis.CozyIslandHost.getState()
```

## Cloud consumer gap

`heroCloudGroup(contract)` consumes `contract.clouds`, creates `THREE.Points` per cloud, caches geometries by cloud id, and stores `savedPointClouds` on the cloud group. That proves rendering exists, but the route does not expose a normalized host-state record for cloud ids, cloud count, point counts, cache keys, drift vector, or per-frame drift delta.

## Grass consumer gap

`grassMesh(placement)` creates a single `THREE.InstancedMesh` with one instance per accepted patch and writes instance matrices from placement transforms. That proves grass exists, but the route does not expose a normalized host-state record for requested patch count, accepted patch count, instance count, exclusion rule summary, or accepted patch sample rows.

## Render readback target

```txt
RenderHostSnapshot:
  routeToken: hero-cloud-4
  renderer:
    pixelRatio
    outputColorSpace
    toneMapping
    toneMappingExposure
    size
  scene:
    background
    fogType
    objectGroups
    descriptorGroupsConsumed
  camera:
    mode
    fov
    near
    far
    aspect
    position
    lookTarget
  grass:
    requestedPatches
    acceptedPatches
    instanceCount
    geometry
    material
  clouds:
    descriptorCount
    cacheGeometryCount
    totalPointCount
    driftFrameCount
  frame:
    lastDt
    renderSubmitted
```

## Next implementation note

Add render readback as a sidecar. Do not change visual materials, camera timing, cloud point generation, grass placement, or renderer construction behavior in the same cut.
