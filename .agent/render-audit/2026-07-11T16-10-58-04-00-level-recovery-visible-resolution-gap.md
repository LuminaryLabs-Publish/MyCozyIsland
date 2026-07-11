# Render Audit: Level Recovery and Visible Resolution Gap

Timestamp: `2026-07-11T16-10-58-04-00`

## Summary

The render host can report adaptive level 0 after recovery while the renderer remains at the level-1 pixel ratio. No render-frame receipt or applied-value observation exposes this mismatch.

## Plan ledger

**Goal:** define the render proof needed to show that a committed quality revision reached every consumer and became visible.

- [x] Trace cloud, fog, post and pixel-ratio mutations.
- [x] Compare level-0 startup and recovery paths.
- [x] Identify missing render observations.
- [x] Define visible-frame acceptance.

## Current recovery path

```txt
level 1 -> level 0
  cloud steps: baseline restored
  fog steps: baseline restored
  fog target scale: baseline restored
  renderer pixel ratio: setter skipped
  pipeline renders
  debug quality label: startup tier only
```

## Missing render evidence

```txt
actual renderer pixel ratio
actual drawing-buffer dimensions
actual fog target scale
quality transition ID
quality revision
per-consumer applied fingerprint
first frame rendered after commit
frame-to-quality correlation
```

## Required render receipt

```txt
QualityVisibleFrameReceipt
  sessionId
  renderFrameId
  transitionId
  qualityRevision
  backend
  viewport
  drawingBufferSize
  pixelRatio
  cloudSteps
  fogSteps
  fogResolutionScale
  qualityFingerprint
  presented
```

## Acceptance

```txt
level 0 recovery restores startup drawing-buffer policy
all required consumers share one committed revision
diagnostics read applied values, not requested values
no revision is reported committed before one visible frame
resize preserves the committed quality policy
```

## Validation status

Documentation only. No browser render capture, drawing-buffer readback or GPU inspection was run.