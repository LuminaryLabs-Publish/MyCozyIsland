# Next Steps: MyCozyIsland

Last updated: `2026-07-11T08-58-02-04-00`

## Summary

Keep runtime lifecycle and focus transaction authority first. Then wire the existing lazy materializer into the live host through a session- and world-revision-fenced frame command, with typed provider-stage results and a readiness revision before any provider cell becomes visible.

## Plan ledger

**Goal:** make the implemented scheduler run safely after the first committed compatibility frame and produce trustworthy cell readiness for a later render transaction.

- [ ] Complete Runtime Session Lifecycle Authority and expose `sessionId` plus `sessionEpoch`.
- [ ] Complete Pinned Core World Focus Transaction Authority and expose accepted `worldRevision`.
- [ ] Add one explicit first-frame materialization-start acknowledgement.
- [ ] Call materialization through a typed host command, not an unowned helper call.
- [ ] Fence every work step to session, world revision, cell identity, cell generation, and provider descriptor version.
- [ ] Reject work for released, replaced, reset, or stale cells.
- [ ] Add both row-count and elapsed-time budgets.
- [ ] Return typed results for terrain, biome, shoreline, and presentation stages.
- [ ] Add failure classification, retry limits, backoff, and terminal blocked state.
- [ ] Assign monotonic `cellReadinessRevision` only after all required provider stages are ready.
- [ ] Publish a `providerReadinessSet` and clone-safe progress observation.
- [ ] Correlate presentation refresh with the readiness revision it consumes.
- [ ] Keep compatibility rendering active until an explicit cell-render commit succeeds.
- [ ] Add host, focus-change, release, reset, failure, and browser fixtures.

## Ordered implementation queue

```txt
1. Runtime Session Lifecycle Authority
2. Pinned Core World Focus Transaction Authority
3. Lazy Cell Materialization Authority
4. Core World Render Commit Authority
5. Camera Rail Baseline Authority
6. Dynamic Environment Frame Authority
7. Adaptive Quality Transaction Authority
```

## Candidate materialization kits

```txt
materialization-frame-command-kit
materialization-admission-kit
materialization-priority-kit
provider-stage-plan-kit
row-work-budget-kit
frame-time-budget-kit
materialization-epoch-kit
stale-cell-work-rejection-kit
provider-stage-result-kit
materialization-failure-kit
materialization-retry-kit
cell-readiness-revision-kit
provider-readiness-set-kit
presentation-readiness-commit-kit
compatibility-render-handoff-kit
materialization-observation-kit
materialization-journal-kit
lazy-materialization-fixture-kit
browser-first-frame-materialization-smoke-kit
```

## Command contract

```txt
MaterializationFrameCommand {
  commandId
  sessionId
  sessionEpoch
  expectedWorldRevision
  frameSequence
  cameraMode
  focus
  maxCells
  maxRows
  maxMilliseconds
}
```

Reject when:

```txt
runtime not running
first compatibility frame not committed
wrong session or stale epoch
unexpected world revision
non-finite focus or budget
materializer already executing
reset/dispose in progress
```

## Result contract

```txt
MaterializationFrameResult {
  commandId
  sessionId
  sessionEpoch
  worldRevision
  frameSequence
  status
  elapsedMilliseconds
  processed[]
  completedCells[]
  releasedCells[]
  failedCells[]
  pendingCells
  readinessRevisions[]
  diagnostics[]
  resultFingerprint
}
```

Statuses:

```txt
idle
advanced
completed
budget-exhausted
rejected-stale
rejected-state
failed-retriable
failed-terminal
```

## Per-cell authority flow

```txt
active descriptor admitted
  -> assign materialization epoch
  -> terrain row steps
  -> terrain-ready result
  -> biome row steps from accepted terrain arrays
  -> shoreline row steps from accepted terrain arrays
  -> provider readiness parity check
  -> presentation refresh
  -> cell readiness revision commit
  -> eligible for detached render plan
```

## Required fixtures

```txt
live host starts work only after first committed frame
registration alone samples zero terrain rows
configured cell and row budgets are respected
elapsed-time budget stops additional work
nearest lowest-LOD priority is deterministic
focus change reprioritizes without duplicating jobs
released cell cannot publish late readiness
reset/dispose rejects old work
provider throw is classified and bounded
retry resumes or restarts by declared policy
presentation readiness cites provider versions
compatibility renderer remains stable during partial work
browser debug state shows progress greater than zero
```

## Acceptance conditions

```txt
production route advances materialization frames
no work runs before first-frame acknowledgement
all work carries current session and world revision
released or stale jobs cannot commit
provider failures cannot poison the animation loop
ready cells have complete provider readiness sets
render consumes only explicit readiness revisions
isolated and live-host fixtures agree
```
