# Gameplay audit: hidden preload, resume and player entry loop

**Timestamp:** `2026-07-13T23-58-48-04-00`

## Summary

The hidden game advances normally until Core Startup reports playable readiness. The bridge then monkey-patches `engine.tick` and `engine.step`, sleeps the animation loop, and later restores both before resetting the player to the aerial intro. Entry preparation warnings do not block the entered acknowledgement, and no gameplay or render revision proves what state the first revealed frame contains.

## Plan ledger

**Goal:** preserve zero-background-simulation preload while making resume and player-entry preparation idempotent, revisioned and frame-correlated.

- [x] Trace startup, freeze, ready, Play, resume and reveal.
- [x] Identify simulation and presentation mutation points.
- [x] Identify player snapshot mutation and input clearing.
- [x] Separate gameplay preparation from GPU handoff settlement.
- [ ] Add attempt-bound preparation and rollback results.
- [ ] Add first resumed gameplay-frame proof.

## Current loop

```txt
preload game
  -> game animation loop ticks adventure
  -> startup host enters after first game frame
  -> bridge sees descriptor.playable
  -> bridge stores engine tick/step
  -> bridge replaces tick/step with no-op world return
  -> bridge stores animation callback
  -> bridge clears animation loop
  -> bridge reports ready

Play
  -> restore tick/step
  -> restore animation callback
  -> load player snapshot with mode=intro and introProgress=0.76
  -> clear input
  -> focus game canvas
  -> post entered
  -> parent reveals iframe
```

## Gameplay authority gaps

```txt
PreloadFreezeAttemptId: absent
GameResumeAttemptId: absent
ExpectedReadyRevision: absent
EngineFunctionGeneration: absent
PlayerSnapshotBefore: absent
PlayerSnapshotAfter: absent
InputClearReceipt: absent
ResumePreparedResult: absent
PreparationFailureResult: absent
RollbackToSleepingReady: absent
FirstResumedGameplayFrameAck: absent
```

`preparePlayerEntry()` catches exceptions, logs a warning and allows entry acknowledgement to continue. A partially restored player/input state is therefore not distinguishable from a successful entry result.

## Required preparation result

```txt
GameEntryPreparationResult
  entryAttemptId
  readyRevision
  simulationLeaseRevision
  presentationLeaseRevision
  playerBeforeFingerprint
  playerAfterFingerprint
  inputClearRevision
  status: Prepared | Failed | Stale | Duplicate | RolledBack
```

## Ownership

```txt
Core Startup: factual playable readiness
preload bridge: freeze/resume and player preparation
player domain: snapshot admission
input domain: clear result
renderer: first resumed frame evidence
GPU handoff authority: terminal composition result
```

## Acceptance cases

```txt
normal sleeping-ready to entered
repeated ready inspection
repeated Play
player loadSnapshot failure
input clear failure
renderer resume failure
pagehide during entry
late predecessor callback
rollback to sleeping-ready state
first frame contains expected intro/player revision
```

## Validation boundary

No runtime gameplay behavior changed. Existing tests match source strings and do not execute the browser loop.