# Next Steps: MyCozyIsland

Last updated: `2026-07-11T11-19-10-04-00`

## Summary

Implement browser runtime-session ownership before reusable Core World reset, restart, or live cell-render cutover. The session must own startup acquisitions, callback admission, world recovery quiescence, renderer retirement, public-host revocation, and idempotent disposal.

## Plan ledger

**Goal:** convert the implicit `main()` ownership graph into one explicit lifecycle transaction with phase, generation, leases, rollback, detached results, and executable browser proof.

- [ ] Add `sessionId`, `sessionGeneration`, and a canonical session phase machine.
- [ ] Wrap every startup acquisition in a reverse-order rollback ledger.
- [ ] Retain and lease the renderer animation-loop installation.
- [ ] Retain exact handler/options tuples for every browser listener.
- [ ] Retain loader timeout handles and fence delayed DOM callbacks.
- [ ] Replace raw callback mutation with session-generation admission.
- [ ] Replace raw `globalThis.CozyIsland` mutation surfaces with typed commands and detached observations.
- [ ] Add a `quiescing` phase that freezes scenario, input, focus, materialization, rendering, adaptive quality, and debug publication before world recovery.
- [ ] Integrate the Core World reset/re-prepare transaction as a child of the session lifecycle.
- [ ] Add `worldGeneration` and `rendererGeneration` correlation.
- [ ] Acknowledge the first visible frame before resuming from reset.
- [ ] Inventory and dispose scene, material, texture, render-target, pipeline, renderer, and canvas ownership.
- [ ] Make pagehide and explicit stop converge on one idempotent terminal transaction.
- [ ] Revoke old global-host and callback references after generation retirement.
- [ ] Publish bounded lifecycle journals and detached disposal/recovery results.
- [ ] Add DOM-free, WebGPU, WebGL2, legacy-mode, pagehide, reset, stop, and restart fixtures.

## Ordered implementation queue

```txt
1. Runtime Session Lifecycle Authority
2. Core World Reset / Re-prepare Authority
3. Pinned Core World Focus Transaction Authority
4. Live Materialization Readiness Commit Authority
5. Core World Render Commit Authority
6. Camera Rail Baseline Authority
7. Dynamic Environment Frame Authority
8. Adaptive Quality Transaction Authority
```

## Candidate lifecycle kits

```txt
runtime-session-authority-kit
runtime-session-phase-kit
runtime-session-generation-kit
startup-acquisition-ledger-kit
startup-rollback-kit
animation-loop-lease-kit
listener-lease-kit
timer-lease-kit
reset-quiescence-kit
input-retirement-kit
world-session-adapter-kit
renderer-resource-inventory-kit
renderer-retirement-kit
global-host-revocation-kit
idempotent-session-stop-kit
session-disposal-result-kit
session-lifecycle-journal-kit
browser-single-session-fixture-kit
browser-restart-smoke-kit
```

## Session command contracts

```txt
StartSessionCommand {
  commandId
  requestedMode
  expectedRouteRevision
}

ResetWorldCommand {
  commandId
  sessionId
  expectedSessionGeneration
  expectedWorldGeneration
  policy
  reason
}

StopSessionCommand {
  commandId
  sessionId
  expectedSessionGeneration
  reason
}
```

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

## Required startup transaction

```txt
admit StartSession
  -> allocate session generation
  -> initialize renderer
  -> construct and prepare world
  -> acquire scene/render graph
  -> acquire performance/debug services
  -> register listeners and timers
  -> install one animation-loop lease
  -> publish read-only host
  -> commit running

on any failure
  -> retire acquired steps in reverse order
  -> publish rollback result
  -> leave no active loop, listener, timer, host or renderer owner
```

## Required reset transaction

```txt
admit ResetWorld
  -> enter quiescing
  -> retire held input and drag state
  -> reject successor old-generation callbacks
  -> freeze scenario/focus/materialization/render publication
  -> execute Core World recovery
  -> prepare new world generation
  -> correlate renderer generation
  -> commit and acknowledge first visible frame
  -> resume running
```

## Required stop/dispose transaction

```txt
admit StopSession
  -> retire session generation
  -> clear animation loop
  -> clear timers
  -> remove listeners
  -> revoke public host
  -> dispose world
  -> dispose post/cloud/fog/ocean/foam/world/scene resources
  -> dispose renderer and canvas ownership
  -> publish detached terminal result
```

## Session disposal result

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

## Required fixture matrix

```txt
one startup creates one renderer, loop, listener set, timer set and host
startup failure after every acquisition rolls back cleanly
reset freezes all live consumers before world recovery
held input and pointer drag cannot cross reset generation
world recovery creates a fresh world generation
first visible frame identifies new world and renderer generations
retained old callbacks and host references are inert
pagehide during startup, reset and running is idempotent
terminal stop twice returns the same terminal identity
restart creates one clean successor session
WebGPU, WebGL2 and legacy modes pass
```

## Acceptance conditions

```txt
all mutation enters session admission
all callbacks are leased and generation-fenced
world reset cannot run under an admitted old frame
all startup acquisitions have rollback
all terminal resources have disposal results
pagehide and explicit stop share one transaction
old references cannot mutate successor state
restart leaves exactly one active browser session
```