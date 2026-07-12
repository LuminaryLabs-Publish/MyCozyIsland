# Render audit: input-visible-frame final-head gap

**Timestamp:** `2026-07-12T19-00-22-04-00`

## Summary

The visible WebGPU/WebGL2 frame can be derived from player and camera state influenced by browser input, but the frame does not identify the input session, surface revision, focus generation, pointer gesture, command result or consumer receipts that authorized that state.

## Plan ledger

**Goal:** make the first frame affected by an input command cite the exact admitted input generation and committed consumer results.

- [x] Trace browser event through input, player, interaction, camera and render snapshot.
- [x] Confirm renderer-neutral snapshots do not carry input provenance.
- [x] Confirm no first-visible-input-frame acknowledgement exists.
- [ ] Add input provenance to frame plans.
- [ ] Add WebGPU and WebGL2 parity fixtures.

## Current gap

```txt
browser event
  -> input command
  -> InputFrame
  -> player / interaction
  -> camera
  -> renderer-neutral frame
  -> visible frame

missing correlation:
  inputSessionId
  inputSurfaceRevision
  focusGeneration
  pointerGestureId
  inputCommandId
  InputAdmissionResult
  consumer receipts
  visible frame acknowledgement
```

## Required result

```txt
InputVisibleFrameAck {
  frameId,
  inputSessionId,
  inputGeneration,
  commandResultIds,
  playerReceiptId,
  interactionReceiptId?,
  cameraReceiptId,
  backend,
  presentedAt
}
```

## Validation boundary

No renderer source or output changed. No browser pixel, WebGPU, WebGL2 or Pages fixture was executed.