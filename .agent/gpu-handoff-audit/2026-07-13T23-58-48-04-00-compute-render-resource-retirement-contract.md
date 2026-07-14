# GPU handoff audit: compute, render and resource retirement contract

**Timestamp:** `2026-07-13T23-58-48-04-00`

## Summary

The WebGPU menu has a compute storage buffer, TSL node graphs, procedural geometries, lights, shadows, a RenderPipeline and bloom. The handoff currently stops the animation loop and disposes the pipeline and renderer after a timer, but there is no application manifest proving every owned participant reached a terminal state.

## Plan ledger

**Goal:** make GPU retirement explicit enough to diagnose partial cleanup without coupling the product to private Three.js internals.

- [x] Enumerate application-created menu resource classes.
- [x] Separate stop, disposal, listener cleanup and capability revocation.
- [x] Define semantic receipts independent of WebGPU/WebGL2 internals.
- [ ] Implement resource registration and idempotent retirement.
- [ ] Add failure injection and repeat-entry fixtures.

## Resource manifest

```txt
MenuPresentationResourceManifest
  surfaceGeneration
  backendGeneration
  renderer
  renderPipeline
  scene
  camera
  geometries[]
  materials[]
  textures[]
  lights[]
  shadowResources[]
  computeNodes[]
  storageBuffers[]
  animationLoopLease
  eventListenerLeases[]
  timerLeases[]
  publicCapabilityLease
```

## Retirement phases

```txt
1. close new frame and compute admission
2. cancel or fence pending callbacks
3. stop animation loop
4. stop compute dispatch
5. dispose post-processing pipeline
6. traverse application-owned scene resources
7. dispose compute/storage participants when supported
8. dispose renderer/backend
9. remove listeners and timers
10. revoke public capability
11. publish terminal retirement result
```

## Required result

```txt
MenuPresentationRetirementResult
  retirementId
  surfaceGeneration
  backendGeneration
  stoppedFrameSubmission
  stoppedComputeSubmission
  participantReceipts[]
  listenersRemoved
  timersCancelled
  capabilityRevoked
  status: Retired | PartiallyRetired | Failed | Stale | Duplicate
```

## Idempotency

A repeated retirement command for the same generation must return the prior terminal result. A command for a predecessor generation must not touch the current menu or game renderer.

## Current source observations

```txt
sceneRunning fence: present
setAnimationLoop(null): present
renderPipeline.dispose(): present
renderer.dispose(): present
environmentTarget assignment: not found
scene traversal disposal: absent
compute/storage explicit disposal: absent
listener removal: absent
timer cancellation registry: absent
CozyMenu revocation: absent
retirement result: absent
```

## Capability policy

`globalThis.CozyMenu` currently retains the raw renderer, scene, camera and palm. A retired generation should expose either no capability or an immutable historical descriptor that contains no mutable/disposed GPU objects.

## Fixture requirements

```txt
WebGPU normal retirement
WebGL2 fallback retirement
retirement before renderer init completes
retirement during compute dispatch
pipeline disposal failure
scene participant disposal failure
resize after retirement
late animation callback
repeated retirement
pagehide during crossfade
public capability read after retirement
```

## Validation boundary

This contract records application ownership only. It makes no claim about Three.js internal resource-release behavior until browser instrumentation proves it.