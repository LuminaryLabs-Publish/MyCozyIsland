# Render audit: hidden game dual-loop and visible-frame gap

**Timestamp:** `2026-07-13T12-38-45-04-00`

## Summary

The menu and hidden game each own a presentation loop. Simulation freeze does not stop the hidden game renderer, and entry acknowledgement is emitted before a post-resume visible game frame is proven.

## Plan ledger

**Goal:** make hidden preload rendering policy explicit and bind entry completion to one visible successor frame.

- [x] Trace menu Canvas2D RAF ownership.
- [x] Trace game `renderer.setAnimationLoop` ownership.
- [x] Trace `freezeSimulation()` and `resumeSimulation()` effects.
- [x] Trace iframe opacity, reveal timing, and menu-loop retirement.
- [x] Identify missing render generations and receipts.
- [ ] Implement quiescence, scheduler transfer, and visible-frame proof.

## Current render path

```txt
menu.html
  -> requestAnimationFrame(animate)
  -> draw sky, clouds, island, sea and palm
  -> recursively schedule successor frame

game.html hidden iframe
  -> renderer.setAnimationLoop
  -> adventure.tick(dt)
  -> worldRenderer.update
  -> gameplayRenderer.update
  -> foamRenderer.update
  -> HUD and performance budget update
  -> postPipeline.render
```

After Core Startup reports playable:

```txt
freezeSimulation
  -> replace engine.tick and engine.step
  -> game animation loop continues
  -> renderer and presentation participants continue running
```

## Entry gap

```txt
resume engine
  -> mutate player intro snapshot
  -> send cozy-game-entered immediately
  -> parent starts opacity transition
  -> no requirement for a post-resume render submission
  -> no visible canvas acknowledgement
```

## Missing render evidence

```txt
MenuFrameSchedulerId
MenuFrameRevision
GamePresentationSchedulerId
PreloadSurfaceGeneration
HiddenPresentationPolicyRevision
QuiescenceReceipt
PostResumeFrameId
RendererSubmissionId
CanvasVisibilityRevision
FirstVisibleGameFrameAck
MenuLastVisibleFrameReceipt
SchedulerTransferResult
```

## Required policy

- At most one recursive menu RAF chain may be active.
- Hidden-game presentation must be explicitly `Running`, `Throttled`, `Paused`, or `Retired`.
- Simulation and presentation quiescence must use separate leases.
- Entry may not complete on message receipt alone.
- The first post-resume frame must cite the entry generation and be acknowledged as visible before the menu scheduler is terminally retired.
- Failed entry must preserve the last valid menu frame and permit a typed retry.

## Validation gap

The static smoke confirms source markers only. It does not count RAF callbacks, inspect GPU submissions, test hidden iframe throttling, force visibility transitions, or verify the first visible post-resume frame.