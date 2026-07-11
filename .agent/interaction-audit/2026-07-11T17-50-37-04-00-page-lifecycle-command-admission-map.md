# Interaction Audit: Page Lifecycle Command Admission Map

Timestamp: `2026-07-11T17-50-37-04-00`

## Summary

Browser page events currently invoke side effects directly. `pagehide` calls `domains.dispose()` without a lifecycle command, session identity, persisted-page policy, result, rollback or restart handoff. Input and resize callbacks also have no lifecycle admission and remain capable of mutating retained objects after stop or world reset.

## Plan ledger

**Goal:** normalize page and user events into lifecycle-aware commands so stale or invalid callbacks cannot mutate a stopped, suspended or disposed session.

- [x] Inventory page, input, resize and timer event sources.
- [x] Identify direct mutation paths.
- [x] Define lifecycle command envelopes.
- [x] Define admission rules and typed results.
- [x] Define stale callback and duplicate-event behavior.
- [x] Define interaction fixtures.

## Current event map

```txt
wheel
  -> input.wheel(deltaY)

pointerdown
  -> create drag state
  -> set pointer capture

pointermove
  -> input.drag(dx, dy)

pointerup/cancel
  -> clear drag

keydown/keyup
  -> debug toggle or input.key(code, state)

blur
  -> input.clear()

resize
  -> renderer.setSize
  -> camera projection mutation

loader timeouts
  -> loader class/hidden mutation

pagehide
  -> domains.dispose()
```

All handlers close over live mutable objects and have no `sessionId` or `generation` check.

## Required command envelopes

```txt
PageLifecycleCommand
  commandId
  sessionId
  generation
  type
    suspend
    resume
    stop
    dispose
    restart
  eventType
  persisted
  visibilityState
  timestamp

InputCommand
  commandId
  sessionId
  generation
  source
  payload

ResizeCommand
  commandId
  sessionId
  generation
  width
  height
  devicePixelRatio

TimerCommand
  timerId
  sessionId
  generation
  purpose
```

## Admission rules

```txt
running
  accepts input, resize, frame, focus, materialization and quality work

suspending/stopping/disposing
  rejects new input, resize and frame work
  accepts only lifecycle completion callbacks for current generation

suspended
  accepts resume or dispose
  rejects gameplay and quality sampling

disposed
  accepts restart only

any state
  rejects mismatched session/generation
  deduplicates commandId
```

## Required results

```txt
LifecycleCommandResult
  commandId
  sessionId
  generation
  previousState
  nextState
  status
    accepted
    completed
    duplicate
    rejected-stale
    rejected-state
    failed
    rolled-back
  stoppedLoopCount
  removedListenerCount
  cancelledTimerCount
  retiredResourceCount
  errorCode
  fingerprint
```

## Required listener registry row

```txt
ListenerLease
  leaseId
  sessionId
  generation
  target
  eventType
  optionsFingerprint
  installed
  removed
  removalReceipt
```

Anonymous callbacks may still be used internally, but the exact function reference and options must be retained by the registry so removal is deterministic.

## Stale callback policy

```txt
callback begins
  -> read captured sessionId/generation
  -> compare with active lifecycle authority
  -> reject before mutation when stale
  -> record bounded stale-callback result
```

This applies to animation callbacks, loader timers, page events, input, resize, materialization work and adaptive-quality callbacks.

## Fixtures

```txt
duplicate pagehide
stale pagehide from prior generation
persisted pagehide -> suspended
non-persisted pagehide -> disposed
pageshow while running -> rejected/no-op
pageshow from suspended -> resume
input during stopping -> rejected
resize during disposed -> rejected
loader timeout after dispose -> rejected and no DOM mutation
pointer capture released during stop
listener registry reaches zero after final dispose
```

## Acceptance

```txt
no browser callback mutates runtime state without lifecycle admission
page lifecycle policy is explicit and observable
duplicate and stale events are idempotent
listener and timer ownership is removable and countable
results can be correlated with the first resumed or restarted frame
```
