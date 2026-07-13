# Render audit: startup first-visible-frame evidence gap

**Timestamp:** `2026-07-13T10-41-40-04-00`

## Summary

The loader can no longer complete before the first call to `postPipeline.render()`, which is a meaningful ordering improvement. The startup receipt remains caller-authored, however, and carries no renderer submission identifier, device/backend generation, GPU completion result, readback or visible-frame acknowledgement.

## Plan ledger

**Goal:** bind playable entry to one renderer-derived first-frame result and one matching visible presentation receipt.

- [x] Trace world construction into the animation loop.
- [x] Confirm `postPipeline.render()` precedes `presentFirstFrame()` and `enter()`.
- [x] Inspect the post pipeline return contract.
- [x] Identify missing renderer and visible-frame provenance.
- [ ] Add submission, presentation and device-loss fixtures.

## Current path

```txt
adventure.tick(dt)
  -> camera/light/world/gameplay/foam/HUD updates
  -> postPipeline.render()
  -> startupHost.presentFirstFrame({
       frameId: caller counter,
       presentationId: cozy-main,
       backend,
       receipt: authored pass-order list
     })
  -> startupHost.enter({ inputReady: true })
```

`createWebGPUPostPipeline().render()` synchronizes foam-depth transforms and calls `pipeline.render()`, but returns no result. The startup receipt therefore proves host call order, not renderer acceptance or visibility.

## Missing evidence

```txt
RenderDeviceGeneration
RenderPipelineGeneration
StartupFrameEnvelopeId
source frame revision
render submission ID
backend submission result
GPU/device-loss result
canvas presentation result
visible pixel/readback receipt
FirstVisibleStartupFrameAck
stale first-frame rejection
```

## Required render transaction

```txt
FirstStartupFrameCommand
  -> bind bootstrap, launch, device, pipeline and frame generations
  -> capture immutable startup frame envelope
  -> submit physical pass plan
  -> return Accepted, Failed, DeviceLost, Stale or Cancelled
  -> verify canvas/presentation generation
  -> publish VisibleStartupFrameAck
  -> allow Core Startup enter only for the matching accepted frame
```

## Failure consequences today

- A later asynchronous backend/device failure can occur after the caller-authored receipt is accepted.
- The receipt does not prove the expected canvas received the expected launch generation.
- A replaced renderer or stale animation callback has no generation fence.
- Headless smoke proves source-level sequencing but cannot prove browser visibility.

## Required fixtures

```txt
first frame on WebGPU
first frame on WebGL2 fallback
synchronous pipeline failure
asynchronous device loss after submit
canvas replacement before acknowledgement
stale animation callback after restart
source versus built output parity
GitHub Pages visible-frame parity
```

## Validation boundary

Documentation only. No render code, pass graph, quality policy or backend behavior changed.