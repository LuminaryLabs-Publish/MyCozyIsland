# Camera System Audit: Baseline Revision and Reset Fidelity Contract

Timestamp: `2026-07-12T02-10-14-04-00`

## Summary

Camera reset fidelity requires authored rail data to remain immutable and session camera state to be reconstructible from a named baseline. The current closure does not make that distinction.

## Plan ledger

**Goal:** define exact baseline, state, revision, reset, replay, and frame contracts for the camera system.

- [x] Define baseline-owned data.
- [x] Define session-owned data.
- [x] Define reset and replay invariants.
- [x] Define revision and proof requirements.
- [ ] Implement contracts later.

## Baseline contract

```txt
CameraRailBaseline
  baselineId
  version
  terrainRevision
  positionPoints[]
  lookPoints[]
  firstPersonThreshold
  railStartFov
  firstPersonFov
  playerEyeHeight
  clearingPolicy
  fingerprint
```

Baseline requirements:

```txt
deep immutable
finite normalized values
terrain revision admitted before construction
stable deterministic fingerprint
not exposed as mutable public data
not modified by wheel, drag, movement, descriptor or reset
```

## Session state contract

```txt
CameraSessionState
  sessionId
  runtimeGeneration
  resetGeneration
  cameraRevision
  pathRevision
  progress
  orbit
  yaw
  pitch
  playerPosition
  pressedKeys
  activePointerLease
  mode
```

## Reset contract

```txt
CameraResetCommand
  commandId
  expectedCameraRevision
  expectedResetGeneration
  baselineId

CameraResetResult
  accepted
  previousCameraRevision
  nextCameraRevision
  previousResetGeneration
  nextResetGeneration
  restoredBaselineId
  restoredBaselineFingerprint
  restoredDescriptorFingerprint
  rejectionReason
```

Reset invariants:

```txt
all session input effects removed
all keys and pointer leases released
progress, orbit, yaw, pitch and player restored
path revision advances or returns to declared baseline revision
baseline fingerprint remains unchanged
post-reset descriptor equals initial descriptor
old-generation commands become stale
```

## Replay fidelity contract

```txt
same baseline + same command sequence
  -> same transition results
  -> same camera descriptors
  -> same mode handoff
  -> same first visible camera frames within declared render tolerance
```

## Observation contract

```txt
CameraObservation
  baselineId
  baselineFingerprint
  terrainRevision
  pathRevision
  cameraRevision
  resetGeneration
  lastCommandId
  lastTransitionResult
  descriptor
  committedFrameId
```

## Fixture gate

```txt
baseline immutability
initial/reset descriptor equality
repeated drag/reset zero drift
command replay determinism
stale generation rejection
threshold transition exactness
pointer lease isolation
visible reset-frame correlation
```