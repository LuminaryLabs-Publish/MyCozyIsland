# Next Steps: MyCozyIsland

Last updated: `2026-07-12T02-10-14-04-00`

## Summary

Replace mutable authored rail points with an immutable baseline plus separate session camera state. Every wheel, drag, key, reset, transition, descriptor, and visible frame should carry a revisioned result so reset can prove exact baseline restoration and repeated input cannot accumulate hidden path drift.

## Plan ledger

**Goal:** make camera rail construction, orbit, progress, first-person handoff, reset, replay, diagnostics, and visible-frame acknowledgement deterministic.

- [ ] Freeze or deep-clone the authored rail positions and look targets.
- [ ] Assign a stable baseline ID and deterministic baseline fingerprint.
- [ ] Separate authored baseline data from mutable session orbit/progress state.
- [ ] Replace in-place point mutation with a derived orbit transform or candidate path.
- [ ] Add monotonic camera state, path, reset-generation, and command revisions.
- [ ] Add typed wheel, drag, key, clear, and reset commands.
- [ ] Add typed accepted, duplicate, stale, clamped, ignored, and rejected results.
- [ ] Bind one pointer identity to one drag lease until release or cancellation.
- [ ] Make reset reconstruct the exact initial state from the admitted baseline.
- [ ] Publish baseline and path provenance in camera descriptors and public readback.
- [ ] Correlate the committed camera revision with the first rendered frame.
- [ ] Add reset-fidelity, repeated-drift, threshold-handoff, multi-pointer, and browser fixtures.
- [ ] Keep startup, session, world lifecycle, render graph, foam proxy, materialization, environment, and adaptive-quality gaps visible.

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Render Layer Graph Admission and Physical Resource Binding Authority
4a. Foam Depth Proxy Topology and Lifecycle Authority
5. Core World Reset / Re-prepare Authority
6. Pinned Core World Focus Transaction Authority
7. Live Materialization Readiness Commit Authority
8. Core World Render Commit Authority
9. Camera Rail Baseline Authority
10. Dynamic Environment Frame Authority
11. Adaptive Quality Transaction Authority
```

## Candidate kits

```txt
camera-rail-baseline-descriptor-kit
camera-rail-baseline-fingerprint-kit
camera-rail-path-revision-kit
camera-state-revision-kit
camera-input-command-kit
camera-input-admission-kit
camera-progress-command-kit
rail-orbit-command-kit
first-person-look-command-kit
camera-reset-command-kit
camera-reset-result-kit
camera-transition-result-kit
stale-camera-command-rejection-kit
camera-descriptor-provenance-kit
camera-input-journal-kit
first-visible-camera-frame-ack-kit
rail-reset-fidelity-fixture-kit
repeated-drag-drift-fixture-kit
browser-pointer-wheel-parity-smoke-kit
```

## Required data contracts

```txt
CameraRailBaseline {
  baselineId
  baselineVersion
  terrainRevision
  positionPoints[]
  lookPoints[]
  firstPersonThreshold
  railFov
  firstPersonFov
  playerEyeHeight
  fingerprint
}

CameraInputCommand {
  commandId
  sessionId
  runtimeGeneration
  resetGeneration
  expectedCameraRevision
  sequence
  source
  pointerId
  kind
  payload
}

CameraTransitionResult {
  commandId
  accepted
  classification
  previousCameraRevision
  nextCameraRevision
  baselineId
  pathRevision
  resetGeneration
  modeBefore
  modeAfter
  progressBefore
  progressAfter
  rejectionReason
}

CameraResetResult {
  commandId
  accepted
  previousCameraRevision
  nextCameraRevision
  previousResetGeneration
  nextResetGeneration
  restoredBaselineId
  restoredBaselineFingerprint
  descriptorFingerprint
}

VisibleCameraFrameAck {
  frameId
  cameraRevision
  pathRevision
  baselineId
  resetGeneration
  mode
  position
  lookAt
  fov
  visibleOutputId
}
```

## Minimum fixture matrix

```txt
initial baseline
  -> descriptor is deterministic for the same terrain revision

single rail drag
  -> derived orbit changes the candidate camera without changing baseline points

reset fidelity
  -> initial and post-reset descriptor fingerprints are identical

repeated drag/reset
  -> 100 cycles produce zero cumulative path drift

threshold handoff
  -> one admitted transition owns rail-to-first-person mode, FOV, yaw and pitch

stale command
  -> an old reset-generation or camera-revision command is rejected

multi-pointer
  -> unrelated pointer events cannot replace or terminate the active drag lease

browser parity
  -> wheel and pointer adapters produce the same typed commands as headless fixtures

visible frame
  -> first frame after reset cites the restored baseline and committed camera revision
```

## Acceptance conditions

```txt
no authored rail point is mutated after baseline admission
reset reconstructs exact initial camera state
repeated input and reset cannot accumulate drift
one camera command produces one typed transition result
stale old-generation commands cannot mutate current state
camera descriptors expose baseline, path and state revisions
browser input and headless commands share one admission path
first visible reset frame cites the committed camera revision
```