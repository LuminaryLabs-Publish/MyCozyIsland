# Render Audit: Pagehide GPU Resource Retirement Gap

Timestamp: `2026-07-11T17-50-37-04-00`

## Summary

The route allocates a WebGPU renderer, scene graph, sky texture, geometry, materials, storage/data textures, volumetric renderers and a post-processing pipeline. None of those route-owned render resources is retired by the current `pagehide` handler. The handler resets only the world runtime while the animation callback and global readback retain the render graph.

## Plan ledger

**Goal:** enumerate render ownership and define the retirement order and evidence required before the runtime can claim a complete dispose or restart.

- [x] Trace renderer and scene construction.
- [x] Trace volume texture and post-pipeline construction.
- [x] Inspect renderer factory return contracts.
- [x] Confirm route-level disposal is absent.
- [x] Identify shared-resource and double-disposal risks.
- [x] Define deterministic retirement order.
- [x] Define render-lifecycle fixtures.

## Current render ownership

```txt
THREE.WebGPURenderer
scene and camera
sky sphere geometry
sky MeshBasicNodeMaterial
sky CanvasTexture
hemisphere and directional lights
worldRenderer group
layered grass geometry/material/atlas texture
ocean geometry/material
foam geometries/materials
cloud shared box geometry and two materials
fog box geometry/material
cloud and fog Storage3DTexture or Data3DTexture resources
RenderPipeline
scene pass, depth node, volumetric pass and blur graph
shadow maps and renderer backend allocations
```

## Current factory contracts

```txt
createStylizedWorldRenderer
  returns group and update
  dispose: absent

createWebGPUOceanRenderer
  returns mesh and material
  geometry retirement: absent
  dispose: absent

createWebGPUFoamRenderer
  returns group and update
  dispose: absent

createVolumetricCloudRenderer
  returns group, step setter and step readback
  shared geometry/material retirement: absent
  dispose: absent

createRollingFogRenderer
  returns group, mesh, material and step controls
  dispose: absent

createWebGPUPostPipeline
  returns pipeline, render and fog-resolution setter
  pass/render-target retirement: absent
  dispose: absent

createAtmosphereVolumeTextures
  returns texture resources and compute nodes
  disposal contract: absent
```

## Concrete route gap

```txt
renderer.setAnimationLoop(callback)
  -> callback closes over renderer, scene, postPipeline, domains and all renderers

pagehide
  -> domains.dispose()
  -> no renderer.setAnimationLoop(null)
  -> no scene traversal
  -> no postPipeline disposal
  -> no cloud/fog texture disposal
  -> no renderer.dispose()
  -> no global reference revocation
```

## Why a generic scene traversal is not sufficient

```txt
shared cloud geometry is referenced by multiple meshes
shared cloud materials are referenced by multiple meshes
grass material owns an atlas texture
a material can reference maps or node resources not visible as child objects
post passes and render targets are not ordinary scene children
renderer/backend allocations are outside the scene graph
Core World renderer caches may own detached resources later
```

A retirement inventory needs stable resource identity and exactly-once disposal, not only `scene.traverse()`.

## Required retirement order

```txt
1. stop render submission
2. fence old-generation callbacks
3. detach input and resize mutation
4. dispose post pipeline and pass-owned render targets
5. dispose cloud/fog volume textures and compute-owned resources
6. inventory scene geometries, materials and textures by identity
7. remove scene graph ownership
8. dispose deduplicated textures
9. dispose deduplicated materials
10. dispose deduplicated geometries
11. dispose renderer and backend
12. clear retained references and publish receipt
```

## Required render retirement receipt

```txt
RenderRetirementReceipt
  sessionId
  generation
  rendererId
  stoppedFrameId
  postPipelineDisposed
  renderTargetCount
  textureCount
  materialCount
  geometryCount
  sharedResourceCount
  duplicateDisposePreventedCount
  rendererDisposed
  backendDisposed
  remainingLiveResourceCount
  fingerprint
```

## Required fixtures

```txt
cold start -> stop -> dispose
cold start -> pagehide(non-persisted) -> dispose
cold start -> pagehide(persisted) -> declared suspend policy
start -> dispose -> duplicate dispose
start -> dispose -> restart -> dispose
shared cloud geometry/material exactly-once retirement
grass atlas texture retirement
volume texture retirement for WebGPU and WebGL2 fallback
post render-target retirement
no render callback after stop
first restarted frame uses only new-generation resources
```

## Acceptance

```txt
no route-owned GPU or scene resource survives final dispose
no shared resource is disposed twice
no render submission occurs after loop revocation
post and off-scene resources are included
renderer/backend retirement is explicit
restart produces a new resource generation and frame receipt
```
