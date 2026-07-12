# Render Audit: Input Visible-Frame Central Reconciliation Gap

Timestamp: `2026-07-12T17-10-31-04-00`

## Summary

The renderer consumes committed player and camera state, but the visible frame does not identify the input session, focus generation, gesture, command set, or consumer receipts that produced it. Presentation can therefore show a movement or camera effect without proving which browser evidence was admitted.

## Plan ledger

**Goal:** require the first visible frame affected by input to cite the exact admitted input generation and consumer results.

- [x] Trace input into player, camera, HUD and Three.js presentation.
- [x] Identify the missing provenance fields.
- [x] Define the visible-frame acknowledgement.
- [ ] Implement renderer-neutral provenance.
- [ ] Prove WebGPU, WebGL2 and Pages parity.

## Current frame path

```txt
InputFrame
  -> player state
  -> interaction state
  -> camera descriptor
  -> cozy-render-snapshot-domain-kit
  -> gameplay renderer update
  -> WebGPU or WebGL2 frame
```

## Missing frame provenance

```txt
input session ID
input surface ID and revision
focus generation
pointer gesture ID
accepted command IDs with typed results
player consumption receipt
interaction consumption receipt
camera consumption receipt
renderer frame ID
first visible effect acknowledgement
```

## Concrete gaps

```txt
unfocused keyboard command
  -> can move the player
  -> rendered movement has no focus proof

second-pointer move
  -> can rotate the camera during another pointer's drag
  -> rendered camera has no gesture-owner proof

command after blur clear
  -> can reactivate movement in the same queue
  -> rendered frame has no closed-generation proof

duplicate one-shot command
  -> can be accepted more than once
  -> rendered interaction has no duplicate-result proof
```

## Required acknowledgement

```txt
InputVisibleFrameAck {
  frameId
  rendererBackend
  inputSessionId
  surfaceId
  surfaceRevision
  focusGeneration
  inputFrameRevision
  acceptedCommandIds
  rejectedCommandIds
  consumerReceiptIds
  cameraRevision
  playerRevision
  interactionRevision
  visibleAt
}
```

## Proof matrix

```txt
Chromium WebGPU
Chromium forced WebGL2 fallback
keyboard and mouse
mobile or touch pointer path
blur and visibility lifecycle
GitHub Pages deployment
```

No visible-input-frame correctness claim is made until the acknowledgement exists and is exercised by browser-level fixtures.