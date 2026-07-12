# Interaction Audit: Browser Event Admission Central Reconciliation Map

Timestamp: `2026-07-12T17-10-31-04-00`

## Summary

The current host converts DOM events into input commands but does not publish a typed admission result. This map defines the command and result boundary needed before browser events can enter the existing input frame.

## Plan ledger

**Goal:** make every keyboard, pointer, wheel, clear, and capture-lifecycle event produce one explicit accepted, rejected, stale, or duplicate result.

- [x] Map current DOM events to input commands.
- [x] Identify missing ownership evidence.
- [x] Define command and result types.
- [x] Define zero-mutation rejection behavior.
- [ ] Implement command admission.
- [ ] Add event-order fixtures.

## Current event map

```txt
keydown / keyup
  -> enqueueKey

pointerdown
  -> host drag state and setPointerCapture

pointermove
  -> enqueuePointer

pointerup / pointercancel
  -> clear host drag state

wheel
  -> enqueueWheel

blur / hidden
  -> clear
```

## Required command envelope

```txt
BrowserInputCommand {
  commandId
  inputSessionId
  surfaceId
  surfaceRevision
  focusGeneration
  gestureId?
  pointerId?
  pointerType?
  button?
  sampleType
  samplePayload
  sequence
  createdAt
}
```

## Required result union

```txt
InputAdmissionAccepted
InputAdmissionRejected
InputAdmissionStale
InputAdmissionDuplicate
InputGenerationClosed
PointerGestureStarted
PointerGestureUpdated
PointerGestureEnded
PointerGestureCancelled
PointerCaptureLost
```

Every result must include the command ID, current generation, reason, predecessor and successor revision, and whether any frame state changed.

## Rejection rules

```txt
keyboard without admitted canvas focus -> rejected
keyboard from editable control -> rejected
non-primary pointer -> rejected unless policy allows
unsupported button -> rejected
pointermove with wrong pointer ID -> rejected
pointerup with wrong pointer ID -> rejected without clearing gesture
command from closed generation -> stale
duplicate command ID -> duplicate
command after clear from predecessor generation -> stale
```

## Result propagation

```txt
accepted result
  -> normalized input queue
  -> InputFrame commit
  -> consumer receipts
  -> visible-frame acknowledgement

rejected, stale or duplicate result
  -> zero gameplay mutation
  -> bounded observation and journal
  -> optional debug projection only
```

This boundary keeps browser-specific evidence in the host authority while preserving the existing renderer-neutral input DSK.