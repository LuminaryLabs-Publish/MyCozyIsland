# Render Audit: Renderer Init and First-Frame Readiness Gap

Timestamp: `2026-07-11T14-41-28-04-00`

## Summary

Renderer initialization is only the first successful allocation in a much larger startup chain. The current route infers the backend after `renderer.init()`, constructs world and atmosphere resources, starts the animation loop and hides the loader without one render-readiness transaction.

## Plan ledger

**Goal:** require one render startup result proving backend admission, resource completeness and first visible frame correlation.

- [x] Trace renderer creation and backend detection.
- [x] Trace world, texture, cloud, fog, ocean, foam and post allocation.
- [x] Trace loader completion and loop startup.
- [x] Identify missing rollback and first-frame receipts.

## Current render startup

```txt
new WebGPURenderer
  -> await init
  -> infer webgpu/webgl2
  -> choose quality
  -> set pixel ratio, size, tone map and shadows
  -> prepare world snapshot
  -> create scene/camera/sky/lights
  -> create world/ocean/foam
  -> compute or bake cloud/fog textures
  -> create cloud/fog/post consumers
  -> start animation loop
  -> hide loader by timer
```

## Gaps

```txt
rendererInitResult: absent
backendAdmissionResult: absent
qualityFingerprint: absent
resource-set fingerprint: absent
render consumer readiness set: absent
rollback after partial render allocation: absent
firstFrameId: absent
firstFrameReceipt: absent
loader-to-frame correlation: absent
```

A successful `renderer.init()` does not prove that Core World, atmosphere textures, scene resources, post processing or the first visible output succeeded. If a later constructor throws, `fail()` does not dispose the already-created render graph.

## Required render readiness chain

```txt
RendererCandidate
  -> RendererInitResult
  -> BackendAdmissionResult
  -> StartupQualityResult
  -> RenderResourcePlan
  -> resource prepare receipts
  -> render one candidate frame
  -> first-frame readback/acknowledgement
  -> RenderStartupCommit
```

## Required first-frame receipt

```txt
startupId
startupGeneration
frameId
backend
backendCapabilityFingerprint
qualityFingerprint
worldRevision
environmentRevision
renderResourceFingerprint
canvasWidth
canvasHeight
pixelRatio
status
failures[]
```

## Validation gate

```txt
renderer.init rejection
WebGPU success
WebGL2 fallback success
no compatible backend
world prepare failure after renderer init
volume texture failure
post pipeline failure
first frame rejection
resource rollback order
loader hidden only after frame receipt
```