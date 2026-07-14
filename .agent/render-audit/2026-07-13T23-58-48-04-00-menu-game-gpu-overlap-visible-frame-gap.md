# Render audit: menu/game GPU overlap and visible-frame gap

**Timestamp:** `2026-07-13T23-58-48-04-00`

## Summary

The menu now performs WebGPU compute wind and bloom every active frame. The hidden game owns a second WebGPU/WebGL2 renderer and complex post-processing stack. The game is slept after readiness, then resumed before the parent begins a 780 ms crossfade, so both presentation stacks can submit during entry without one overlap budget or first-visible-game-frame settlement.

## Plan ledger

**Goal:** bind every active GPU workload to one presentation generation and retire the predecessor only after the successor frame is proven.

- [x] Identify menu compute, render pipeline and animation-loop ownership.
- [x] Identify hidden game renderer, animation loop and sleep/resume ownership.
- [x] Map entry acknowledgement and crossfade timing.
- [x] Identify incomplete menu resource retirement.
- [ ] Add frame, device and surface generation receipts.
- [ ] Add real-browser overlap and retirement fixtures.

## Current render sequence

```txt
menu frame
  -> optional renderer.compute(windCompute)
  -> renderPipeline.render()

game preload frame
  -> adventure.tick()
  -> world/gameplay/foam updates
  -> performance sampling
  -> postPipeline.render()
  -> Core Startup first-frame and playable entry

ready bridge
  -> replace engine tick/step
  -> renderer.setAnimationLoop(null)

Play
  -> restore engine tick/step
  -> restore game animation loop
  -> post cozy-game-entered
  -> parent starts opacity crossfade
  -> menu and game submit concurrently
  -> after 780 ms stop/dispose menu renderer
```

## Evidence gaps

```txt
MenuSurfaceGeneration: absent
GameSurfaceGeneration: absent
BackendGeneration: absent
DeviceOrContextGeneration: absent
MenuFrameId: absent
GameResumedFrameId: absent
PresentationOverlapId: absent
OverlapBudget: absent
FirstResumedGameFrameAck: absent
MenuComputeStopReceipt: absent
MenuFrameStopReceipt: absent
MenuResourceRetirementResult: absent
```

## Retirement gaps

The parent calls:

```txt
renderer.setAnimationLoop(null)
renderPipeline.dispose()
environmentTarget.dispose() when present
renderer.dispose()
```

The application does not explicitly enumerate or prove retirement of:

```txt
palm trunk, frond, coconut and sky geometries
node and standard materials
wind StorageBufferAttribute and compute node
scene lights and shadow allocations
resize, message, keyboard and click listeners
entry/fade timers
CozyMenu public references to disposed objects
```

This is a missing application-owned manifest and receipt. It does not assert that Three.js fails to internally release every backend allocation.

## Required frame envelope

```txt
PresentationFrameEnvelope
  surfaceGeneration
  backendGeneration
  deviceContextGeneration
  frameId
  startupReadyRevision
  entryAttemptId
  visibleState
  submittedAt
```

## Acceptance criteria

```txt
hidden game remains sleeping after ready
one current Play attempt resumes it once
first resumed game frame is acknowledged
menu/game overlap remains inside policy
menu compute stops before resource retirement
all declared menu resources return terminal receipts
CozyMenu no longer exposes disposed raw resources
resize and stale timers cannot touch retired renderer
WebGPU and WebGL2 paths return the same semantic result classes
```

## Validation boundary

Static tests assert source markers only. No browser GPU timing, memory, device-loss, overlap or retirement fixture was run.