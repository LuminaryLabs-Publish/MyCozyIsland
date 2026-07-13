# Interaction audit: menu boot, entry and retirement result map

**Timestamp:** `2026-07-13T14-39-40-04-00`

## Summary

Play admission currently relies on game-ready state, but menu presentation boot and retirement do not return typed results. The shell cannot distinguish a ready menu, degraded menu, failed menu, partially retired menu or stale callback.

## Plan ledger

**Goal:** bind user-visible Play state to terminal game readiness while making menu presentation state explicit and independently recoverable.

- [x] Trace initial disabled state and progress projection.
- [x] Trace ready, failure, Enter/Space and click paths.
- [x] Trace reveal and delayed menu retirement.
- [x] Define result composition with the existing entry authority.
- [ ] Implement and execute interaction fixtures.

## Current interaction map

```txt
page visible
  -> Play disabled: Preparing 1%
  -> menu module must initialize
  -> hidden game preload starts later
  -> progress messages update Play copy
  -> ready enables Play

Play click or Enter/Space
  -> send unversioned cozy-game-enter
  -> disable button and show Entering
  -> entered message or 900 ms timer calls revealGame()
  -> body enters transition
  -> after 820 ms stop menu flag, focus iframe and dispose renderer
```

## Missing menu results

```txt
MenuBootReady
MenuBootDegraded
MenuBootFailed
MenuFirstFrameAccepted
MenuRetirementStarted
MenuRetirementComplete
MenuRetirementPartial
MenuAlreadyRetired
MenuStaleCallbackRejected
```

## Required composition

```txt
ShellReadyResult
  gamePreloadResult: Ready
  menuPresentationResult: Ready | Degraded
  playEnabled: true

PlayerEntryResult
  gameEntryResult: Entered
  firstVisibleGameFrameAck: required
  menuRetirementResult: Retired | DegradedRetirement
  historyResult: committed
  focusResult: committed or explicitly deferred
```

A menu presentation failure must not silently masquerade as game preload failure. A partial menu retirement must not silently masquerade as sole game-surface ownership.

## Admission rules

```txt
Play remains governed by accepted game readiness
menu provider failure may permit degraded Play under authored policy
rapid duplicate Play admits one entry attempt
retirement binds to the accepted entry and menu generations
late menu callbacks after retirement are rejected
failure copy remains accessible without the Three.js module
```

## Required fixtures

```txt
menu provider rejected before module evaluation
WebGLRenderer constructor rejected
menu first frame rejected
game ready with degraded menu
rapid click plus Enter/Space
entry timeout while menu remains active
successful entry with exact menu retirement
partial resource disposal result
late RAF callback after retirement
repeated direct/menu route navigation
```

## Validation boundary

No interaction behavior changed. Existing smoke checks source markers only and does not dispatch real browser input or observe terminal menu lifecycle results.