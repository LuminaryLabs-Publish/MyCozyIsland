# Render Graph Audit: Pass Binding and Depth Provenance Contract

Timestamp: `2026-07-11T22-20-00-04-00`

## Summary

A valid logical graph is not sufficient proof of a valid frame. Every logical resource read must resolve to a current physical producer or admitted external source, and every depth-tested pass must identify the exact depth attachment used.

## Core invariant

```txt
for every logical read R by pass C
  exactly one admitted producer P or external source E exists
  one current physical binding connects R to C
  the binding cites graph, plan, surface, backend, and resource revisions
```

## Required types

```txt
CompiledRenderPlan {
  graphId
  graphVersion
  graphRevision
  compileRevision
  backend
  qualityRevision
  surfaceRevision
  logicalPasses[]
  physicalPasses[]
  fusionGroups[]
  resources[]
  bindings[]
  finalOutputResourceId
  validation
}

RenderResource {
  resourceId
  semanticName
  producerPassId
  attachmentKind
  format
  width
  height
  sampleCount
  resourceRevision
  transient
}

RenderResourceBinding {
  bindingId
  semanticRead
  resourceId
  producerPassId
  consumerPassId
  graphRevision
  compileRevision
  resourceRevision
  accepted
  rejectionReason
}

PhysicalPassReceipt {
  frameId
  physicalPassId
  logicalPassIds[]
  inputBindingIds[]
  outputResourceIds[]
  started
  completed
  backendResult
}

LayeredFrameReceipt {
  frameId
  graphRevision
  compileRevision
  backend
  surfaceRevision
  worldRevision
  materializationRevision
  passReceiptIds[]
  finalOutputResourceId
  presented
}
```

## Fusion contract

The current base scene fuses background, opaque world, and water. Fusion is valid only when:

```txt
logical ordering remains observable
required intermediate resources are physically available or explicitly elided
elided resources have a typed equivalence result
later consumers receive equivalent resources
fused depth and color provenance remain identifiable
```

A fused pass cannot silently erase `water-mask` or `water-surface-depth` while a later logical pass still declares those reads.

## Depth provenance contract

```txt
every depth test or depth sample identifies:
  producer physical pass
  attachment resource ID
  format and dimensions
  surface revision
  sample compatibility
  current frame or retained-generation policy
```

For foam, one of these policies must be selected and documented:

```txt
A. shared-depth test
   foam pass receives current opaque depth and tests against it

B. explicit manual-depth sample
   foam shader samples current opaque depth and applies admitted comparison

C. no depth occlusion
   logical graph removes depth dependency and product accepts overlay behavior
```

The current source declares policy A semantically but constructs neither A nor B physically.

## Water and fog provenance

```txt
water-mask
  must be produced as a physical resource,
  derived from an admitted alternative,
  or removed from foam logical reads

water-surface-depth
  must be produced/bound or removed from the contract

fog-transmittance
  must be produced by the rolling-fog pass,
  approximated through an admitted alternative,
  or removed from the contract
```

`foamScene.fog = scene.fog` is not equivalent to the logical rolling-fog transmittance resource unless an explicit parity result proves that substitution.

## Catalog completeness contract

```txt
all active source-backed kit surfaces
  -> cataloged DomainKit
  OR imported Nexus service
  OR Core World provider
  OR helper utility
  OR explicitly classified runtime composition kit
```

No active kit may be absent from both catalog and classification readback.

## Failure results

```txt
MissingResourceProducer
AmbiguousResourceProducer
MissingDepthAttachment
StaleResourceRevision
UnsupportedBackendBinding
InvalidFusionPlan
LogicalPhysicalParityFailure
PassExecutionFailure
VisibleFrameNotAcknowledged
```

## Required fixtures

```txt
compile current graph on WebGPU
compile current graph on WebGL2
remove opaque depth binding and require rejection
remove water mask binding and require rejection or admitted contract revision
replace fog transmittance with explicit alternative and prove parity
resize and reject old attachment revisions
change quality and reject old fog resources
capture foam behind representative opaque occluders
acknowledge one visible frame with complete provenance
```

## Acceptance gate

```txt
no undeclared physical dependency
no unresolved logical read
no depth test without attachment provenance
no fusion that drops a still-required resource
no manually maintained order that can diverge from execution
one detached result schema across WebGPU and WebGL2
```
