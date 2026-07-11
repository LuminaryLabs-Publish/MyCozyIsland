# Render Audit: Partial GPU Resource Startup Leak Gap

Timestamp: `2026-07-11T19-20-22-04-00`

## Summary

The browser route can acquire GPU and scene resources before a later startup phase throws. The catch path only updates the error panel. It does not know which resources exist, does not stop callbacks, and does not dispose the renderer/backend or partial scene graph.

## Acquisition order

```txt
WebGPURenderer
  -> backend initialization
  -> scene/camera/sky/lights
  -> stylized world renderer
  -> ocean renderer
  -> foam renderer
  -> cloud/fog volume textures
  -> volumetric cloud renderer
  -> rolling fog renderer
  -> post pipeline
  -> performance budget consumers
  -> animation loop
```

## Failure windows

```txt
renderer initialized, world creation fails
world prepared, world renderer fails
world/ocean/foam exist, volume generation fails
volumes exist, cloud/fog construction fails
all scene resources exist, post construction fails
all resources exist, first render fails
```

Each window has a different live resource set, but the route has no acquisition ledger or rollback plan.

## Missing render contracts

```txt
stable resource IDs
resource owner and dependency metadata
unified dispose result per renderer factory
volume texture retirement result
post-pass/render-target retirement result
scene traversal and shared-resource deduplication
renderer/backend disposal receipt
first-frame render result
rollback fingerprint
```

## Current public evidence gap

`globalThis.CozyIsland` is published only at the end, so partial startup ownership is not observable or recoverable through the public host. The error panel proves only that an exception surfaced; it does not prove which GPU resources were retired.

## Required render-capability result

```txt
RenderCapability
  id
  kind
  ownerTransactionId
  dependencies
  publicObjects
  disposeAdapter
  disposed
  disposalReceipt
```

## Required failure behavior

```txt
render-phase failure
  -> stop new render acquisition
  -> stop installed animation loop
  -> detach callback consumers
  -> dispose post targets and passes
  -> dispose cloud/fog renderers
  -> dispose volume textures
  -> dispose ocean/foam/world renderers
  -> dispose scene textures/materials/geometries exactly once
  -> dispose renderer/backend
  -> publish resource counts and failures
```

## Required fixture matrix

```txt
throw after renderer.init
throw after world renderer
throw after ocean/foam
throw after volume generation
throw after cloud renderer
throw after fog renderer
throw after post pipeline
throw on first frame
assert zero loop/listener/timer leases
assert exact resource retirement counts
assert no duplicate shared-resource disposal
assert WebGPU/WebGL2 rollback parity
```

## Validation status

```txt
source inspection: complete
render code changed: no
browser capture: not run
GPU allocation measurement: not run
failure injection: unavailable
retirement receipts: unavailable
```
