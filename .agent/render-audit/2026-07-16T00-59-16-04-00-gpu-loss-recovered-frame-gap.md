# Render audit: GPU loss and recovered-frame gap

**Timestamp:** `2026-07-16T00-59-16-04-00`  
**Status:** `renderer-device-context-loss-recovery-authority-audited`

## Summary

The visible menu and game frames are accepted only during initial startup. After the application becomes playable, there is no product-owned path that binds a lost renderer generation to a reconstructed resource set and one matching recovered visible frame.

## Plan ledger

**Goal:** prove that every visible frame after renderer recovery belongs to the current renderer, resource, route and simulation revisions.

- [x] Trace both renderers and their animation loops.
- [x] Trace hidden game freeze/resume.
- [x] Trace first-frame startup admission.
- [x] Confirm no product-level recovered-frame acknowledgement.
- [ ] Force loss and validate recovery in WebGPU and WebGL2.

## Current render flow

```txt
menu
  WebGPURenderer.init
  -> scene and RenderPipeline construction
  -> renderer.setAnimationLoop(render)
  -> hidden game preload begins

game
  WebGPURenderer.init under startup timeout
  -> scene, atmosphere, ocean, foam, cloud, fog and post construction
  -> renderer.setAnimationLoop(frame callback)
  -> postPipeline.render
  -> Core Startup presentFirstFrame
  -> playable entry
```

## Gap

```txt
active renderer generation G1
  -> device/context loss occurs
  -> no RendererLossObservedResult
  -> no render-suspension receipt
  -> no resource-registry revision is bound
  -> no renderer generation G2 is admitted
  -> no stale G1 callback rejection is proven
  -> no recovered frame F2 is acknowledged
```

The hidden-preload route adds another case:

```txt
game renderer G1 presents first frame
  -> animation loop is removed while hidden
  -> device/context can change while presentation sleeps
  -> Play restores the same callback
  -> entry acknowledgement is sent without a fresh renderer-health or frame result
```

## Required frame contract

```txt
FirstRecoveredFrameAck {
  documentGeneration
  routeGeneration
  rendererGeneration
  backend
  deviceOrContextGeneration
  resourceRegistryRevision
  staticSnapshotRevision
  frameSnapshotRevision
  presentationId
  visibleSurfaceId
  presentedAt
}
```

## Required visual behavior

- Stop the stale animation loop when loss is admitted.
- Preserve an explicit loading or recovery surface rather than a silent black/stale canvas.
- Reconstruct the complete physical pass order.
- Rehydrate procedural textures, compute buffers, render targets, post resources and scene materials.
- Present one frame from the accepted renderer-neutral snapshots.
- Resume entry or gameplay only after `FirstRecoveredFrameAck`.
- Fall back to a typed WebGL2 or semantic failure surface when recovery is exhausted.

## Validation boundary

No forced WebGPU device loss, WebGL context loss, hidden-preload loss, GPU-process restart or recovered-frame capture was executed. The finding is based on inspected product ownership and source flow.