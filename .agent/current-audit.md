# Current audit: pointer-look gesture ownership

**Timestamp:** `2026-07-16T18-41-23-04-00`  
**Status:** `pointer-look-gesture-ownership-authority-audited`

## Summary

MyCozyIsland has deterministic input-frame accumulation but no browser-level pointer gesture authority. The host stores a pointer ID on pointerdown, then accepts move events from any pointer while a shared drag record exists and clears the gesture for any pointerup or pointercancel. The input domain strips pointer identity and queues only anonymous look deltas.

## Plan ledger

**Goal:** make each pointer-look gesture owner-specific, capture-bound, revisioned and exactly settled before it changes player or camera truth.

- [x] Inspect pointerdown, pointermove, pointerup and pointercancel handling.
- [x] Inspect input command normalization and frame admission.
- [x] Inspect player yaw, pitch and movement basis.
- [x] Inspect camera and presented-frame projection.
- [x] Map admission, delta, settlement and frame acknowledgement surfaces.
- [ ] Implement and test the authority.

## Source-backed behavior

### Browser host

```txt
pointerdown
  -> drag = { x, y, id: event.pointerId }
  -> setPointerCapture(event.pointerId)

pointermove
  -> if drag exists, enqueue event.client - drag coordinates
  -> no event.pointerId comparison

pointerup
  -> drag = null
  -> releasePointerCapture(event.pointerId)
  -> no owner comparison

pointercancel
  -> drag = null
  -> no owner comparison

lostpointercapture
  -> no listener
```

### Input domain

```txt
enqueuePointer(deltaX, deltaY)
  -> command type pointer
  -> fixed generation 1
  -> no pointerId
  -> no gestureId
  -> no captureRevision
  -> no routeRevision
```

The input frame sums all admitted pointer commands, clamps lookX/lookY and publishes accepted command IDs. It cannot identify whether a command came from the active pointer owner.

### Player and camera

`cozy-player-domain-kit` applies lookX/lookY directly to yaw and pitch. Yaw also defines the forward/right basis used for first-person movement. The camera and renderer then project that state without a gesture-bound frame receipt.

## Main gap

```txt
secondary pointer event
  -> can overwrite shared drag coordinates
  -> can publish a look delta against another pointer's history
  -> can clear the owner gesture
  -> input frame cannot classify the source
  -> player and camera consume the result
  -> no terminal result or matching frame acknowledgement exists
```

This is a source-backed ownership and evidence gap. It is not a claim that every touch device reproduces a visible defect.

## Required authority

```txt
cozy-island-pointer-look-gesture-ownership-authority-domain
```

### Admission

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
```

### Delta

```txt
PointerGestureDeltaCommand
  gestureId
  gestureRevision
  pointerId
  captureRevision
  eventSequence
  coordinates
  delta
```

### Settlement

```txt
PointerGestureSettlementCommand
  gestureId
  gestureRevision
  pointerId
  reason
```

### Results and frame proof

```txt
PointerGestureAdmissionResult
PointerGestureDeltaResult
PointerGestureSettlementResult
FirstPointerLookFrameAck
```

## Domains and services

The active composition remains unchanged: 14 engine-installed kits, 50 cataloged environment/render kits, one ocean composition kit and five browser/product adapters. Their complete IDs and service families are recorded in the timestamped tracker and machine registry.

## Validation boundary

This run changes documentation only. It does not alter JavaScript, HTML, CSS, input behavior, player behavior, camera behavior, rendering, dependencies, tests, workflows or deployment.