# Interaction audit: pointer gesture command and result map

**Timestamp:** `2026-07-16T18-41-23-04-00`

## Plan ledger

**Goal:** replace implicit shared drag mutation with typed, revision-bound commands and results.

- [x] Map current pointer events and input commands.
- [x] Define admission, delta and settlement results.
- [x] Define stale and secondary-pointer rejection.
- [x] Define matching-frame acknowledgement.
- [ ] Implement the command/result path.

## Current implicit path

```txt
pointerdown -> overwrite drag
pointermove -> anonymous enqueuePointer
pointerup -> clear drag
pointercancel -> clear drag
```

## Proposed commands

```txt
PointerGestureAdmissionCommand
  documentRevision
  routeRevision
  canvasRevision
  pointerId
  pointerType
  button
  coordinates
  expectedGestureRevision

PointerGestureDeltaCommand
  gestureId
  gestureRevision
  pointerId
  captureRevision
  coordinates
  delta
  eventSequence

PointerGestureSettlementCommand
  gestureId
  gestureRevision
  pointerId
  reason: up | cancel | lost-capture | blur | hidden | route-retired | replaced
```

## Proposed results

```txt
PointerGestureAdmissionResult
  accepted
  gestureId
  gestureRevision
  pointerId
  captureRevision
  secondaryPolicy
  reason

PointerGestureDeltaResult
  accepted
  gestureId
  inputCommandId
  normalizedDelta
  reason

PointerGestureSettlementResult
  settled
  gestureId
  terminalReason
  captureReleased
  nextGestureRevision

FirstPointerLookFrameAck
  gestureId
  inputFrameRevision
  playerRevision
  cameraRevision
  presentedFrameRevision
```

## Rejection classes

```txt
secondary-pointer
pointer-mismatch
stale-gesture
stale-route
capture-missing
capture-lost
outside-canvas
already-settled
unsupported-button
```

Exact results must be retained long enough to classify duplicate or delayed events without mutating camera truth twice.