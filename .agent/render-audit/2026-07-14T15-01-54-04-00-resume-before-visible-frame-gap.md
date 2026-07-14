# Render audit: resume before visible-frame acknowledgement

**Timestamp:** `2026-07-14T15-01-54-04-00`  
**Status:** `preload-suspension-lease-resume-frame-authority-audited`

## Summary

The child posts `cozy-game-entered` immediately after restoring the saved animation callback. The acknowledgement proves that synchronous restoration code ran far enough to post a message; it does not prove that Three.js accepted a frame, the GPU submitted it, or the now-visible iframe displayed it.

## Plan ledger

**Goal:** bind shell reveal to one exact resumed game frame rather than to a method call or timeout.

- [x] Trace presentation sleep and resume.
- [x] Trace acknowledgement and parent reveal.
- [x] Confirm the 900 ms fallback does not inspect a frame.
- [x] Identify missing frame identities and receipts.
- [ ] Add a resumed render probe and visible-frame acknowledgement.

## Current render path

```txt
playable startup descriptor
  -> get renderer.getAnimationLoop()
  -> store callback
  -> renderer.setAnimationLoop(null)
  -> post ready

entry command
  -> renderer.setAnimationLoop(stored callback)
  -> post cozy-game-entered
  -> parent begins reveal
```

## Missing evidence

```txt
RendererRevision
AnimationLoopRevision
RenderSubmissionLease
ResumedFrameId
RenderProbeResult
GPU submission receipt
iframe visibility receipt
FirstResumedGameFrameAck
frame-to-entry revision correlation
frame-to-startup revision correlation
```

## Failure classes currently conflated

```txt
animation callback restored but never invoked
callback invoked but renderer throws
renderer submits but iframe remains hidden
iframe becomes visible with a stale pre-suspension frame
child message delayed while frame is healthy
child message missing while restoration failed
parent timeout reveals a still-suspended game
```

All can reach the same parent fallback reveal path.

## Required render transaction

```txt
GameEntryPreparationResult
  -> validate renderer and callback identities
  -> restore one accepted animation lease
  -> execute one explicit render probe
  -> correlate backend, viewport, DPR and game revision
  -> publish GameEntryRenderResult
  -> publish FirstResumedGameFrameAck

parent
  -> accept only the matching frame acknowledgement
  -> commit opacity, pointer, focus and history changes
```

## Required fixture matrix

```txt
WebGPU normal resume
WebGL2 fallback resume
callback missing
callback replaced
renderer replaced
render exception
zero-frame timeout
stale canvas contents
reduced-motion reveal
resize during resume
pagehide during resume
source/build/Pages parity
```

## Validation boundary

No browser or GPU fixture was executed. No visible defect is claimed. The gap is the absence of application-owned frame evidence.
