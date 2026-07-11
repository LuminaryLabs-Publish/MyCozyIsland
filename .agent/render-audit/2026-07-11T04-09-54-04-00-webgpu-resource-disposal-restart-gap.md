# Render Audit: WebGPU Resource Disposal and Restart Gap

Timestamp: `2026-07-11T04-09-54-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Plan ledger

**Goal:** identify every render-side resource class that must become explicitly owned and disposable before the route can safely stop or restart.

- [x] Trace scene and renderer creation.
- [x] Trace world, ocean, foam, cloud, fog, volume-texture, sky, light, and post resources.
- [x] Check factory return contracts for lifecycle methods.
- [x] Check the route for animation-loop shutdown and renderer disposal.
- [x] Define a disposal order and fixture requirements.

## Render acquisition graph

```txt
WebGPURenderer
  -> backend and timestamp tracking
  -> scene
     -> sky sphere + CanvasTexture + node material
     -> hemisphere light
     -> directional light + shadow resources
     -> world group
        -> terrain and ocean-floor grids
        -> paths
        -> instanced vegetation
        -> rocks
        -> fence, rails and driftwood
        -> campfire, smoke and light
        -> layered grass atlas, geometry, material and InstancedMesh
     -> ocean mesh
     -> foam meshes
     -> cloud meshes
     -> fog mesh
  -> Storage3DTexture/Data3DTexture cloud and fog volumes
  -> compute nodes when WebGPU is active
  -> RenderPipeline, scene pass, volumetric pass and blur nodes
```

## Factory contract gap

Current renderer factories return only partial operational handles:

```txt
createStylizedWorldRenderer -> { group, update }
createWebGPUOceanRenderer   -> { mesh, material }
createWebGPUFoamRenderer    -> { group, update }
createVolumetricCloudRenderer -> { group, setStepScale, getSteps }
createRollingFogRenderer    -> { group, mesh, material, layer, setStepScale, getSteps }
createAtmosphereVolumeTextures -> textures, optional compute nodes, source
createWebGPUPostPipeline    -> { pipeline, render, setFogResolutionScale }
```

None exposes a common `dispose()` method or a JSON-safe resource inventory.

The layered-grass wrapper discards its inner renderer handle after attaching the grass group to the base group. The grass material creates its atlas texture inline, so the atlas has no named owner outside the material graph.

## Route-level gap

`src/main-cloudform.js`:

```txt
creates renderer and resources
starts renderer.setAnimationLoop(callback)
publishes live objects through globalThis.CozyIsland
never calls renderer.setAnimationLoop(null)
never traverses scene resources for disposal
never disposes volume textures
never disposes post resources
never calls renderer.dispose()
```

The `fail()` path only updates the error panel. If startup fails after renderer, scene, volume, or listener acquisition, already-created resources remain unretired.

## Required resource inventory

A session owner should count and classify at least:

```txt
renderers
scenes
cameras
geometries
materials
2D textures
3D textures
storage textures
compute nodes
render pipelines
passes
uniform groups
lights
shadow maps
DOM canvases created for textures
scene groups and meshes
```

Every row should contain:

```txt
resourceId
sessionEpoch
kind
ownerKit
acquiredOrder
state: acquired | active | disposed | failed
shared: true | false
disposeStrategy
disposedOrder
resultReason
```

## Disposal order

```txt
1. block new frame submission
2. renderer.setAnimationLoop(null)
3. stop performance and debug publication
4. detach post pipeline from active rendering
5. dispose post passes/nodes/pipeline resources
6. dispose cloud/fog materials, geometry and groups
7. dispose atmosphere volume textures and compute resources
8. dispose foam, ocean and world scene resources
9. dispose sky texture/material/geometry and light shadow resources
10. clear scene references
11. renderer.dispose()
12. unpublish or tombstone global host
```

Shared geometry/material instances must be disposed exactly once. Scene traversal alone is insufficient unless shared identities are deduplicated.

## Restart proof

A browser restart smoke must prove:

```txt
one active animation loop after each restart
no duplicated canvas/window listeners
no old session frame after new epoch starts
all previous session resources report disposed
new renderer and resource IDs differ from retired session
same seed creates same semantic world fingerprint
GPU/Three resource counts return to the expected baseline
second dispose returns unchanged rather than throwing
```

## Main risk

Without lifecycle ownership, every future visual upgrade increases the number of resources that can leak or remain reachable through closures and `globalThis.CozyIsland`. Resource authority should therefore precede additional clouds, fog, grass, ocean, post-processing, or quality work.
