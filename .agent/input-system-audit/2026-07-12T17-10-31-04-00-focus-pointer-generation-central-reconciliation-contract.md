# Input System Audit: Focus, Pointer, and Generation Central Reconciliation Contract

Timestamp: `2026-07-12T17-10-31-04-00`

## Summary

The input state has deterministic sequence ordering, but it does not have a changing focus or input generation. Pointer identity is stored by the host without being enforced by move and release handlers. This contract defines the minimum lifecycle required to make clear, capture loss, blur, visibility changes, and successor input safe.

## Plan ledger

**Goal:** fence every input lifecycle transition with explicit surface, focus, gesture, and generation identities.

- [x] Identify current sequence and generation behavior.
- [x] Identify pointer ownership and capture gaps.
- [x] Define generation-closing events.
- [x] Define successor acquisition requirements.
- [ ] Implement the lifecycle authority.
- [ ] Add multi-pointer and stale-generation fixtures.

## Current state

```txt
nextSequence increments: yes
command generation changes: no
command generation value: 1
focus generation exists: no
surface revision exists: no
gesture ID exists: host pointer ID only
pointermove owner check: no
pointerup owner check: no
lost-capture handler: no
clear closes generation: no
duplicate ID rejection: no
```

## Required lifecycle state

```txt
InputLifecycleState {
  inputSessionId
  surfaceId
  surfaceRevision
  focusGeneration
  inputGeneration
  focused
  activeGestureId
  activePointerId
  activePointerType
  captureState
  acceptedCommandIds
  closedGenerationIds
  revision
}
```

## Generation-closing events

```txt
window blur
document hidden
pagehide
canvas focus loss
pointercancel
lostpointercapture
surface replacement
runtime reset
save restore when input state is replaced
backend or host reconstruction
```

## Clear transaction

```txt
observe current input generation
  -> stop accepting new predecessor commands
  -> release held keyboard state
  -> clear one-shot actions and deltas
  -> terminate active gesture and capture
  -> mark predecessor generation closed
  -> allocate successor generation only after valid reacquisition
  -> publish InputGenerationClosedResult
```

## Pointer policy

```txt
pointerdown
  -> require admitted surface and focus
  -> require primary pointer and supported button
  -> create gesture ID bound to pointer ID
  -> request capture and record result

pointermove
  -> require active gesture and matching pointer ID

pointerup
  -> require matching pointer ID
  -> end only the matching gesture

pointercancel or lostpointercapture
  -> cancel matching gesture
  -> close or fence the gesture generation
```

## Duplicate policy

A command ID is accepted at most once per input session. Replays return `InputAdmissionDuplicate` and perform zero input, gameplay, camera, Agriculture, Inventory, or render mutation.