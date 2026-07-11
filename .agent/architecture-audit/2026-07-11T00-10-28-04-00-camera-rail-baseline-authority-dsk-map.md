# Architecture Audit: Camera Rail Baseline Authority DSK Map

Timestamp: `2026-07-11T00-10-28-04-00`

## Existing composition

```txt
cozy-island-scenario-kit
  requires render:snapshot
  requires sequence:camera-rail
  requires environment:clock
  owns scenario tick/getRenderSnapshot/reset

camera-rail-sequence-kit
  requires terrain:height-sampler
  owns progress/yaw/pitch/pressed/player
  stores rail positions and look targets
  exposes input/tick/descriptor/reset
```

## Current ownership defect

Authored rail geometry and runtime orbit behavior share the same mutable array. The drag adapter mutates `railPositions`, so a transient interaction becomes an authored-path mutation. Reset does not own or restore that mutation.

```txt
authored data + runtime state + input mutation + reset
  all inside one closure
  no baseline descriptor
  no revision
  no result contract
  no fingerprint
```

## Recommended DSK boundary

```txt
camera-rail-authored-baseline-kit
  immutable positions/look targets
  authored fingerprint

camera-orbit-offset-state-kit
  bounded runtime offset
  no authored mutation

camera-sequence-input-result-kit
  accepted/rejected/no-op result rows

camera-sequence-state-kit
  progress/mode/yaw/pitch/orbit/player/keys/revision

camera-sequence-reset-transaction-kit
  atomic baseline restoration
  before/after fingerprints

scenario-reset-transaction-kit
  clock + camera reset commit/rollback

camera-rail-reset-fixture-kit
  deterministic repeated-cycle proof
```

## Contract rules

- Authored arrays are deeply immutable.
- Runtime interaction never writes authored rows.
- Reset is explicit, typed, idempotent, and complete.
- Descriptor/state readback is JSON-safe and bounded.
- A reset after any accepted input returns the construction fingerprint.
- Scenario reset reports child results and one aggregate result.

## Deferred

Camera feel, path-point retuning, easing changes, and additional sequence content remain outside this gate.