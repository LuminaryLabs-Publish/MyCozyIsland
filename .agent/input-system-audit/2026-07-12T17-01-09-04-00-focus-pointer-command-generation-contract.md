# Input System Audit: Focus, Pointer and Command Generation Contract

Timestamp: `2026-07-12T17-01-09-04-00`

## Summary

`cozy-input-domain-kit` provides deterministic sequence ordering and frame normalization, but browser focus and pointer ownership are not represented as revisioned input authority.

## Plan ledger

**Goal:** define exact invariants for focus generations, pointer gestures, command IDs, clear fencing and diagnostics.

- [x] Inspect InputState and command normalization.
- [x] Inspect browser event-to-command adapters.
- [x] Identify missing invariants.
- [x] Define replacement contracts.
- [ ] Implement and fixture-test the contracts.

## Current InputState

```txt
nextSequence
queue
pressed
frame.index
frame.revision
frame axes/look/wheel/actions
frame.acceptedCommandIds
revision
rejectedCommands
```

## Current invariants that hold

```txt
sequence numbers increase within one runtime
queue is processed in sorted sequence order
pointer and wheel totals are clamped
native key repeat does not produce one-shot actions
queue is cleared after each input phase
```

## Missing invariants

```txt
one active input surface
one current focus generation
one active primary look gesture
move/up/cancel belong to the gesture pointer
command ID is unique within the session
generation changes after lifecycle clear
predecessor-generation commands cannot reactivate state
all ignored commands increment typed rejection diagnostics
accepted command set is linked to consumer and visible-frame receipts
```

## Required focus contract

```txt
FocusAcquired(surfaceId, surfaceRevision)
  -> new focusGeneration
  -> new inputGeneration

FocusLost(reason)
  -> close focusGeneration
  -> close inputGeneration
  -> release held keys
  -> terminate active gesture
  -> reject predecessor commands
```

## Required pointer contract

```txt
pointerdown
  require current focus
  require isPrimary
  require primary button
  allocate gestureId
  capture pointer

pointermove
  require gestureId and pointerId match
  require capture generation current

pointerup/cancel/lostcapture
  require matching gesture
  close exactly once
  emit terminal result
```

## Required command contract

```txt
commandId unique per input session
command cites focusGeneration and inputGeneration
duplicate command returns duplicate without mutation
stale generation returns rejected-stale without mutation
clear closes generation before successor commands are considered
rejectedCommands increments by typed reason
```

## Reset and save policy

Active focus, held keys, pointer capture and gestures are ephemeral host state. They must not be restored from a gameplay save. Reset must close the current generation and require explicit focus reacquisition.

## Validation target

A deterministic fixture must prove that reordering or replaying browser events cannot cross focus or gesture generations and cannot produce hidden gameplay mutation.