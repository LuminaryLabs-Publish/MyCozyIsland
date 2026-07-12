# Interaction Audit: Render Proxy Readback Admission Map

Timestamp: `2026-07-12T00-20-01-04-00`

## Public interaction path

```txt
H key
  -> toggle debug overlay

CozyIsland.getState()
  -> return world, graph validation, logical pass strings,
     physical pass strings, camera descriptor, clock,
     performance, volumetrics and materialization

raw CozyIsland host
  -> exposes renderer, scene, camera, world runtime,
     source renderers and postPipeline
```

## Missing admission and evidence

```txt
no graph revision in readback
no proxy topology revision
no proxy membership receipt
no depth attachment identity
no binding success/failure result
no pass execution receipt
no disposal state
no visible-frame identity
raw postPipeline and renderer remain publicly reachable
```

## Required readback contract

```txt
RenderProxyObservation {
  sessionId
  runtimeGeneration
  frameId
  graphId
  graphRevision
  physicalPlanRevision
  sourceTopologyRevision
  proxyTopologyRevision
  membershipResult
  opaqueDepthBinding
  passResults[]
  visibleOutputId
  lifecyclePhase
  disposalResult
}
```

Public diagnostics should expose detached observations and typed commands rather than the raw renderer and pipeline owners.
