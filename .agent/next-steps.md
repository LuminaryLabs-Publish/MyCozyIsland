# Next Steps: MyCozyIsland

Last updated: `2026-07-11T11-10-29-04-00`

## Summary

Fix the world reset contract before adding browser restart or cell-aware rendering. A reusable reset must retain or recreate the world definition, clear provider/materializer state exactly once, advance a world generation, and prove fresh preparation.

## Plan ledger

**Goal:** separate reusable reset from terminal disposal and make every recovery step observable, rollback-capable, generation-fenced, and fixture-backed.

- [ ] Add route-level `sessionId` and `sessionEpoch` ownership.
- [ ] Introduce `WorldResetCommand` with `soft-reset`, `recreate`, and `terminal-dispose` policies.
- [ ] Reject reset while startup, focus commit, materialization, or render-cell commit is in an unsafe phase.
- [ ] Capture the admitted world definition and provider order before release.
- [ ] Advance a monotonic `worldGeneration` before old work can complete.
- [ ] Freeze focus, materialization, and renderer-cell admission for the old generation.
- [ ] Collect typed provider release/reset results instead of relying on swallowed failures.
- [ ] Clear all seven provider stores and materializer jobs exactly once.
- [ ] For reusable reset, retain or re-register the world definition before prepare.
- [ ] Prepare the origin and verify 49 active cells and seven provider layers.
- [ ] Publish `WorldRecoveryResult` with before/after fingerprints and diagnostics.
- [ ] Roll back or remain blocked when re-registration or prepare fails.
- [ ] Make terminal disposal idempotent and reject all later commands explicitly.
- [ ] Correlate renderer state and visible frames with `worldGeneration`.
- [ ] Add DOM-free reset/re-prepare and browser restart fixtures.

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

## Candidate kits

```txt
world-reset-command-kit
world-reset-admission-kit
world-reset-policy-kit
world-generation-kit
world-definition-checkpoint-kit
provider-release-plan-kit
provider-release-result-kit
provider-store-reset-kit
materializer-cancellation-kit
world-reregistration-kit
world-reprepare-kit
world-recovery-result-kit
world-recovery-fingerprint-kit
world-recovery-journal-kit
world-recovery-rollback-kit
world-terminal-disposal-kit
reset-reprepare-fixture-kit
browser-world-restart-smoke-kit
```

## Reset command

```txt
WorldResetCommand {
  commandId
  sessionId
  sessionEpoch
  expectedWorldId
  expectedWorldGeneration
  policy
  reason
  preserveDefinition
  restoreFocus
}
```

Policies:

```txt
soft-reset
  release active cells and heavy provider state
  retain registered definition
  prepare fresh origin generation

recreate
  release and remove definition
  re-register the admitted definition
  prepare fresh origin generation

terminal-dispose
  release and remove everything
  reject future prepare/focus/materialization commands
```

## Recovery result

```txt
WorldRecoveryResult {
  commandId
  sessionId
  sessionEpoch
  priorWorldGeneration
  nextWorldGeneration
  policy
  status
  releasedCells[]
  providerResults[]
  materializerResult
  definitionResult
  prepareResult
  activeCellCount
  providerCellCounts
  diagnostics[]
  beforeFingerprint
  afterFingerprint
}
```

Statuses:

```txt
reset-complete
recreated-and-prepared
disposed
rejected-stale
rejected-state
release-failed
registration-failed
prepare-failed
rollback-complete
blocked
```

## Required reset transaction

```txt
admit command
  -> mark old generation closing
  -> freeze focus/materialization/render admission
  -> checkpoint definition and observable state
  -> release active cells in reverse provider order
  -> reset provider stores and materializer
  -> clear or retain definition according to policy
  -> register definition when required
  -> prepare origin
  -> verify 49 active cells and seven provider stores
  -> publish new generation and result
  -> resume admission
```

## Required fixtures

```txt
prepare -> reset -> prepare succeeds on same wrapper
fresh generation differs from prior generation
active cell count returns to 49
all provider cell counts return to 49
old materializer jobs cannot publish after reset
reset after partial terrain rows produces clean providers
reset after a cell crossing releases prior cells once
provider release failure is reported
provider reset failure is reported
registration failure leaves runtime blocked or rolled back
prepare failure does not resume rendering/materialization
terminal dispose is idempotent
prepare after terminal dispose is rejected
browser restart owns one animation loop and one listener set
visible frame identifies the new world generation
```

## Acceptance conditions

```txt
reset and dispose are distinct explicit policies
no definition-clearing reset can be followed by an unregistered prepare
all seven providers participate in one observable release/reset result
all old-generation commands and callbacks are rejected
reusable reset returns a fully prepared 49-cell world
terminal dispose permanently closes the wrapper
renderer and debug readback cite the current world generation
```
