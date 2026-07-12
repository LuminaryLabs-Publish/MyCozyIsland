# Render Audit: Input, Camera and Visible-Frame Provenance Gap

Timestamp: `2026-07-12T17-01-09-04-00`

## Summary

The visible camera correctly derives from player state, but the frame carries no browser-input session, focus generation, gesture identity or typed command result. A camera change can therefore be observed without proving which browser event was admitted or whether that event belonged to the active canvas gesture.

## Plan ledger

**Goal:** correlate each accepted input frame with player, camera and the first presented WebGPU/WebGL2 frame.

- [x] Trace browser events to `InputFrame`.
- [x] Trace look input to player yaw and pitch.
- [x] Trace player state to camera descriptor.
- [x] Trace camera descriptor to Three.js camera and post pipeline.
- [x] Identify missing provenance fields and receipts.
- [ ] Implement frame correlation and browser proof.

## Current render path

```txt
pointer delta
  -> input.lookX / input.lookY
  -> player yaw / pitch
  -> camera descriptor
  -> Three.js camera position / lookAt / FOV
  -> postPipeline.render()
```

## Current gaps

```txt
no input session ID in frame
no surface or focus revision in frame
no pointer gesture ID in frame
no typed command admission result
no player input-consumption receipt
no camera adoption receipt
no render frame ID linked to input
no first-visible-input-frame acknowledgement
```

## Multi-pointer consequence

Because pointer moves are not matched to the pointer that began the drag, the visible camera can move from a second pointer while the host still appears to have one active gesture. The rendered frame cannot expose or diagnose that mismatch.

## Required frame fields

```txt
frameId
inputSessionId
inputGeneration
focusGeneration
acceptedCommandIds
activeGestureId
playerRevision
interactionRevision
cameraDescriptorId
cameraRevision
presentationBackend
presentedAt
```

## Required receipts

```txt
PlayerInputReceipt
CameraAdoptionReceipt
InputVisibleFrameAck
```

## Backend requirement

The same provenance contract must hold for WebGPU and WebGL2 fallback. Backend selection may change presentation implementation, not input ownership or frame identity.

## Validation boundary

No rendering or runtime code changed. No pixel, browser or Pages smoke was run. This audit does not claim visible-frame provenance is implemented.