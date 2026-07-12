# Interaction Audit: Render Readback Admission Map

Timestamp: `2026-07-11T22-20-00-04-00`

## Summary

The public `CozyIsland` host exposes the logical graph, two manually maintained pass-order arrays, and raw renderer/runtime objects. It does not expose the admitted graph revision, compiled physical plan, resource bindings, pass results, or visible-frame receipt needed to establish what actually rendered.

## Current admission path

```txt
startup
  -> validate 50-entry kit catalog
  -> independently construct cozy-ocean-composition-kit
  -> validate logical graph
  -> manually construct physical post pipeline
  -> return hard-coded logical order
  -> return hard-coded physical order
  -> expose raw objects through globalThis.CozyIsland
```

## Current readback

```txt
CozyIsland.renderLayerGraph
CozyIsland.renderPassOrder
CozyIsland.physicalRenderPassOrder
CozyIsland.postPipeline
CozyIsland.renderer
CozyIsland.scene
CozyIsland.camera
CozyIsland.getState()
```

`getState()` reports graph validation and order strings but not:

```txt
graph revision
compile revision
surface revision
world revision
physical pass IDs
resource IDs
producer/consumer bindings
attachment formats and dimensions
pass success/failure receipts
last submitted output resource
first or latest visible-frame acknowledgement
```

## Interaction-dependent revisions

The graph is not directly edited by player input, but these interactions can invalidate physical resource assumptions:

```txt
window resize
  -> renderer size and camera projection change

adaptive quality callback
  -> DPR and fog resolution scale change

wheel / drag / WASD
  -> camera and world-focus revisions change

legacy/core selection
  -> world/provider state changes

WebGPU/WebGL2 selection
  -> physical backend and resource implementation change
```

The public readback does not correlate any of those revisions with the graph or visible frame.

## Required command map

```txt
AdmitRenderComposition
  inputs: catalog snapshot, graph, backend capabilities, world/surface revisions
  result: admitted graph revision or typed rejection

CompileRenderPlan
  inputs: admitted graph revision, backend, quality, surface
  result: physical plan, fusion groups, resources, bindings

AcquireRenderResources
  inputs: compiled plan and current revisions
  result: leases and attachment identities

ExecuteRenderPlan
  inputs: plan, frame command, camera/world/materialization revisions
  result: ordered physical pass receipts and final output identity

AcknowledgeLayeredFrame
  inputs: renderer submission and visible presentation evidence
  result: detached layered-frame receipt
```

## Required rejections

```txt
unclassified runtime kit
missing resource producer
ambiguous resource producer
stale graph revision
stale surface revision
stale world/materialization revision
unsupported backend format or pass
missing depth attachment for depth-tested consumer
execution order mismatch
stale or duplicate frame acknowledgement
```

## Required detached readback

```txt
LayeredRenderObservation {
  graphId
  graphRevision
  compileRevision
  backend
  qualityRevision
  surfaceRevision
  worldRevision
  materializationRevision
  physicalPasses
  resources
  bindings
  lastExecutionResult
  lastVisibleFrameReceipt
}
```

The observation must not expose mutable Three.js objects or GPU handles.

## Acceptance conditions

```txt
readback reflects admitted and executed state, not configured intent only
pass order derives from the compiled plan
resource bindings cite current revisions
resize and quality changes advance resource revisions
stale observations cannot authorize correctness claims
visible-frame receipt identifies final output and backend
```
