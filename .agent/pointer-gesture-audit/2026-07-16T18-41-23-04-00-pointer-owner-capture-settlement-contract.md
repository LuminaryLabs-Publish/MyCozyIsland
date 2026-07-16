# Pointer gesture audit: owner, capture and settlement contract

**Timestamp:** `2026-07-16T18-41-23-04-00`

## Plan ledger

**Goal:** define one exact lifecycle for pointer-look gestures across mouse, pen, touch, capture loss and route retirement.

- [x] Define one active owner per canvas and route revision.
- [x] Define capture as a lease, not implicit browser state.
- [x] Define secondary-pointer policy.
- [x] Define exact terminal reasons.
- [x] Define stale-event rejection and frame proof.
- [ ] Implement and test the contract.

## Contract

### Admission

A gesture is admitted only when:

- the route and canvas generations are current;
- no active owner exists, or replacement policy explicitly settles it first;
- the pointer button/type is supported;
- capture succeeds or the configured fallback explicitly accepts uncaptured movement;
- one new `GestureId`, `GestureRevision` and `CaptureRevision` are allocated.

### Movement

A move is accepted only when all of these match the active lease:

```txt
pointerId
gestureId
gestureRevision
captureRevision
routeRevision
canvasRevision
```

Coordinates must be normalized in one space before deltas enter `cozy-input-domain-kit`.

### Secondary pointers

Default policy:

```txt
owner remains active
secondary pointer is rejected or ignored with a typed result
no drag coordinates are overwritten
no look delta is emitted
no owner capture is released
```

### Settlement

The owner gesture settles exactly once for:

```txt
pointerup
pointercancel
lostpointercapture
window blur
document hidden
route retirement
canvas replacement
explicit owner replacement
```

A non-owner terminal event must not settle the owner gesture.

### Frame proof

The first rendered frame that consumes an accepted delta must bind the gesture, input frame, player, camera and presented-frame revisions.

## Current missing evidence

- no pointer-ID comparison on move;
- no owner comparison on up/cancel;
- no `lostpointercapture` listener;
- no gesture/capture revision;
- no secondary-pointer result;
- no terminal settlement result;
- no first matching frame acknowledgement.