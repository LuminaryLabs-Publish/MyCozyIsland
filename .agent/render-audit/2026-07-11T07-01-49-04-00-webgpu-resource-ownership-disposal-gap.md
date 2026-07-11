# Render Audit: WebGPU Resource Ownership and Disposal Gap

Timestamp: `2026-07-11T07-01-49-04-00`

## Plan ledger

**Goal:** identify every live render resource that must be owned and retired by one session before a restart or navigation can be considered safe.

- [x] Trace route-level renderer construction.
- [x] Inspect world, grass, ocean, foam and post factory returns.
- [x] Inspect the existing graph-disposal helper.
- [x] Identify the missing live-host teardown boundary.

## Live render graph

```txt
WebGPURenderer/backend
scene
perspective camera
sky CanvasTexture, material and sphere geometry
hemisphere light
directional light and shadow resources
whole-island world group
layered-grass atlas, geometry, material and instanced mesh
ocean plane geometry and node material
foam band geometries and materials
cloud and fog volume textures
cloud group/material
fog group/material/layer
RenderPipeline, scene pass, volumetric pass and blur graph
performance budget
debug overlay
```

## Current ownership problem

The route stores live references in local variables and later publishes them through `globalThis.CozyIsland`. Renderer factories generally expose objects and update methods, not a common `dispose()` receipt.

`disposeRendererObject()` can traverse one object graph and dispose non-shared geometries, materials and textures. The live route does not call it. The helper also does not by itself own post-pipeline nodes, backend state, timers, listeners or global references.

## Concrete gaps

```txt
worldRenderer: group + update, no dispose
oceanRenderer: mesh + material, no dispose
foamRenderer: group + update, no dispose
postPipeline: pipeline + render + scale setter, no dispose
sky: returned as bare Mesh, no host release
volumeTextures: live textures, no route release result
renderer: no route-level dispose/backend result
```

The layered-grass renderer allocates a generated atlas, geometry, material and instanced mesh. The ocean allocates a high-segment plane and node material. Foam allocates geometry/material per band. None are currently tied to a terminal session result.

## Required render-resource adapter

Every renderer service should expose or be wrapped by:

```txt
resourceId
resourceKind
ownerSessionId
ownerEpoch
rootObjects
sharedResources
prepareResult
dispose()
getDisposalState()
```

The disposal result should report:

```txt
status
objectsVisited
geometriesDisposed
materialsDisposed
texturesDisposed
pipelinesDisposed
backendDisposed
sharedResourcesRetained
failures
residualResourceIds
```

## Required ordering

```txt
stop frame admission
  -> finish/reject in-flight render
  -> detach scene consumers
  -> dispose post graph
  -> dispose cloud/fog resources and generated volume textures
  -> dispose foam and ocean
  -> dispose world and grass graph
  -> dispose sky resources
  -> dispose renderer/backend
```

The final implementation order must follow actual Three/WebGPU requirements and be verified in both WebGPU and WebGL2 fallback modes.

## Fixture requirements

```txt
clean full-session disposal
repeat disposal
partial construction disposal
shared resource retention
material-owned texture disposal
generated volume texture disposal
post pipeline disposal
renderer/backend disposal
zero unexplained scene children after teardown
zero old-session render callbacks after restart
```

## Current status

```txt
live route disposal wired: no
common renderer disposal contract: no
route resource registry: no
residual resource readback: no
browser proof: no
runtime source changed by audit: no
```
