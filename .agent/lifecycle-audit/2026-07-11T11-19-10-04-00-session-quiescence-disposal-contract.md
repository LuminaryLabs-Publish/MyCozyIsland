# Lifecycle Audit: Session Quiescence and Disposal Contract

Timestamp: `2026-07-11T11-19-10-04-00`

## Summary

World recovery, page exit, startup failure, and explicit restart need one lifecycle authority. The current route owns these concerns implicitly and cannot prove that live callbacks stopped before semantic or render resources were cleared.

## Plan ledger

**Goal:** define phase transitions, lease retirement, failure aggregation, idempotency, and terminal behavior for the complete browser session.

- [x] Separate reusable world reset from full session stop.
- [x] Define session phases and generations.
- [x] Define quiescence order.
- [x] Define acquisition rollback.
- [x] Define terminal disposal result.
- [x] Define stale callback and retained-host behavior.

## Session phases

```txt
created
booting
running
quiescing
resetting
repreparing
stopping
disposing
blocked
failed
disposed
```

Valid major paths:

```txt
created -> booting -> running
booting -> failed -> disposing -> disposed
running -> quiescing -> resetting -> repreparing -> running
running -> stopping -> disposing -> disposed
any live phase -> blocked when recovery cannot roll back safely
```

## Required quiescence order

```txt
1. retire the current session generation
2. reject new public and browser commands
3. stop successor animation callbacks
4. retire held input and drag state
5. clear loader and delayed DOM timers
6. freeze focus and materialization admission
7. checkpoint world and renderer identities
8. execute world recovery or terminal world disposal
9. retire render resources when terminal
10. remove listeners
11. revoke the global host
12. publish detached terminal or recovery result
```

## Startup rollback

Every acquisition must register a reverse action:

```txt
renderer initialization
world wrapper construction
world preparation
scene and lights
world/ocean/foam renderers
volume textures
cloud/fog renderers
post pipeline
performance/debug controllers
listeners
timers
animation loop
global host
```

If acquisition N fails, N-1 through 1 retire in reverse order. Rollback failures are aggregated rather than swallowed.

## Disposal result

```txt
SessionDisposalResult {
  commandId
  sessionId
  sessionGeneration
  status
  phaseBefore
  phaseAfter
  animationLoopResult
  listenerResults[]
  timerResults[]
  inputResult
  worldResult
  renderResourceResults[]
  rendererResult
  globalHostResult
  failures[]
  fingerprintBefore
  fingerprintAfter
}
```

Statuses:

```txt
disposed
already-disposed
blocked
partial-failure
rollback-complete
rollback-failed
rejected-stale
```

## Idempotency rules

```txt
stop after disposed returns already-disposed
dispose after pagehide disposal returns same terminal identity
old host commands return rejected-stale or rejected-disposed
old animation callback returns without work
old timer callback performs no DOM mutation
old listener callback performs no input or renderer mutation
```

## Reset integration

A reusable Core World reset is a child transaction of a live session. It may not directly control browser listeners or renderer ownership. The session authority must first quiesce consumers, call the world recovery domain, correlate the next world and renderer generation, acknowledge the first visible frame, and then resume.

## Acceptance boundary

Complete disposal means zero admitted callbacks, zero active animation lease, zero active timers/listeners, no mutable global host, terminal world state, retired render resources, and a detached result that remains readable after all live objects are released.