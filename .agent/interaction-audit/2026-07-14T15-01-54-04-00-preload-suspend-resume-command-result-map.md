# Interaction audit: preload suspend/resume command-result map

**Timestamp:** `2026-07-14T15-01-54-04-00`  
**Status:** `preload-suspension-lease-resume-frame-authority-audited`

## Summary

Current messages are unversioned `{ type, ...payload }` objects. Source-window checks exist, but there is no origin, schema, attempt, sequence, lease or revision admission. The same `cozy-game-entered` message represents both first entry and repeated entry.

## Plan ledger

**Goal:** replace ambiguous message types with correlated commands and terminal results while preserving the current same-origin iframe design.

- [x] Map parent-to-child and child-to-parent messages.
- [x] Map local state gates and timers.
- [x] Identify missing admission and result identity.
- [ ] Add versioned envelopes and idempotent results.

## Current messages

```txt
child -> parent
  cozy-game-progress
  cozy-game-ready
  cozy-game-entered
  cozy-game-failed

parent -> child
  cozy-game-enter
```

## Current local gates

```txt
parent: gameReady, entering, preloadStarted, lastProgress
child: announcedReady, announcedFailure, entered
child: frozenEngine, frozenRenderer, originalTick, originalStep, originalAnimationLoop
```

## Required envelope

```txt
{
  schemaVersion,
  shellGeneration,
  gamePreloadAttemptId,
  startupRevision,
  suspensionLeaseId,
  entryAttemptId,
  sequence,
  type,
  payload
}
```

## Required admission

```txt
validate event.source
validate event.origin
validate schema version
validate shell and preload generations
validate monotonic sequence
validate expected suspension lease
reject duplicate and stale entry attempts
reject results from superseded iframe or startup revisions
```

## Required command/result map

```txt
PreloadSuspensionCommand
  -> PreloadSuspensionPreparationResult
  -> PreloadSuspensionResult

GameEntryCommand
  -> GameEntryPreparationResult
  -> GameEntryResult
  -> FirstResumedGameFrameAck

EntryTimeoutCommand
  -> EntryTimeoutResult
  -> EntryRecoveryResult
```

## Idempotency rules

```txt
same accepted entry command
  -> return the original GameEntryResult
  -> do not restore participants twice
  -> do not create a second animation loop

stale or superseded command
  -> typed rejection
  -> preserve current suspended or active state

repeated entered query
  -> immutable readback of accepted result
  -> not a new uncorrelated acknowledgement
```

## Validation boundary

No message protocol was changed or executed. This audit defines the future admission contract only.
