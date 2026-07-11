# Quality System Audit: Quality Revision and Recovery Contract

Timestamp: `2026-07-11T16-10-58-04-00`

## Summary

Quality level is currently only an integer inside the performance budget. It does not identify the complete applied renderer state. A quality revision must instead fingerprint the full mutable consumer set and remain pending until all consumers commit and one visible frame acknowledges it.

## Plan ledger

**Goal:** define the canonical quality state, recovery baseline and transaction invariants.

- [x] Identify startup baseline fields.
- [x] Identify runtime-mutable consumers.
- [x] Identify startup-fixed or rebuild-required fields.
- [x] Define revision and fingerprint contracts.
- [x] Define full recovery and rollback invariants.

## Canonical mutable state

```txt
AppliedQualityState
  revision
  level
  pixelRatio
  cloudStepScale
  cloudSteps
  fogStepScale
  fogSteps
  fogResolutionScale
  backend
  viewport
  drawingBufferSize
  fingerprint
```

## Startup-fixed or rebuild-required candidates

```txt
shadowMapSize
terrainResolution
vegetationScale
oceanSegments
cloudTextureSize
postBlur
volume texture dimensions
world geometry density
```

Each field must be explicitly classified rather than silently ignored by adaptive transitions.

## Revision rules

```txt
revision 0 equals the admitted startup baseline
revision increments only after all required consumers accept
requested values are not applied values
clamped values participate in the fingerprint
failed transitions do not advance revision
rollback restores the prior revision fingerprint
stale results cannot modify current state
```

## Full recovery invariant

```txt
recover to level 0
  -> derive every mutable value from revision-0 baseline
  -> apply every mutable consumer, including pixel ratio
  -> verify actual values
  -> commit a new revision whose applied fingerprint equals baseline fingerprint
```

The revision number may differ from zero after recovery, but the applied-quality fingerprint must equal the admitted level-0 baseline fingerprint.

## Partial failure invariant

```txt
if any required consumer fails
  -> no level/revision commit
  -> rollback every already-applied consumer
  -> verify previous fingerprint
  -> publish failed/rolled-back result
```

## Observation contract

```txt
getQualityState()
  returns clone-safe policy, pending transition, current applied state,
  previous result and visible-frame receipt

never returns
  raw renderer
  materials
  uniforms
  render passes
  mutable callbacks
```

## Validation status

Documentation only. The canonical state, fingerprint and revision services do not yet exist.