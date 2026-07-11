# Next Steps: MyCozyIsland

Last updated: `2026-07-11T09-08-59-04-00`

## Summary

The live route now advances lazy cell materialization. The next step is to stop treating aggregate scheduler counters as authority and introduce revisioned provider readiness plus an atomic renderer-cell commit.

## Plan ledger

**Goal:** preserve the working compatibility render while making every materialization step attributable, bounded, failure-safe, stale-resistant, and eligible for visible consumption only after a complete provider-version commit.

- [ ] Complete Runtime Session Lifecycle Authority and expose `sessionId` and `sessionEpoch`.
- [ ] Complete Pinned Core World Focus Transaction Authority and expose accepted `worldRevision` and `focusRevision`.
- [ ] Replace the raw helper call with `MaterializationFrameCommand` and `MaterializationFrameResult`.
- [ ] Attach `cellGeneration` and provider descriptor versions to every staged job.
- [ ] Reject work from released, reset, replaced, or stale cells.
- [ ] Add elapsed-time budgeting in addition to row and candidate limits.
- [ ] Catch provider exceptions and return typed retriable or terminal failures.
- [ ] Add bounded retry, backoff, and quarantine policy.
- [ ] Define the canonical required provider set for a render cell.
- [ ] Commit a monotonic `cellReadinessRevision` only after source-version parity passes.
- [ ] Include source versions and fingerprint in the presentation descriptor.
- [ ] Connect ready descriptors to the existing renderer cell cache.
- [ ] Add atomic prepare, update, release, rollback, and disposal results.
- [ ] Correlate a committed renderer-cell revision with its first visible frame.
- [ ] Keep the startup compatibility island until the cell-aware commit is acknowledged.
- [ ] Add DOM-free and browser fixtures for progress, failure, release, reset, and render consumption.

## Ordered implementation queue

```txt
1. Runtime Session Lifecycle Authority
2. Pinned Core World Focus Transaction Authority
3. Live Materialization Readiness Commit Authority
4. Core World Render Commit Authority
5. Camera Rail Baseline Authority
6. Dynamic Environment Frame Authority
7. Adaptive Quality Transaction Authority
```

## Candidate kits

```txt
materialization-frame-command-kit
materialization-admission-kit
materialization-epoch-kit
cell-generation-kit
materialization-priority-kit
provider-stage-plan-kit
row-work-budget-kit
frame-time-budget-kit
provider-stage-result-kit
provider-failure-classification-kit
materialization-retry-kit
stale-cell-work-rejection-kit
provider-readiness-policy-kit
provider-readiness-set-kit
cell-readiness-revision-kit
presentation-readiness-commit-kit
renderer-cell-plan-kit
renderer-cell-commit-result-kit
renderer-cell-rollback-kit
visible-frame-acknowledgement-kit
materialization-observation-kit
materialization-journal-kit
live-materialization-fixture-kit
browser-ready-cell-render-smoke-kit
```

## Materialization command

```txt
MaterializationFrameCommand {
  commandId
  sessionId
  sessionEpoch
  expectedWorldRevision
  expectedFocusRevision
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
runtime is not running
session or epoch is stale
world or focus revision differs
focus/budget values are non-finite
materializer is already executing
reset or dispose is in progress
```

## Materialization result

```txt
MaterializationFrameResult {
  commandId
  sessionId
  sessionEpoch
  worldRevision
  focusRevision
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

## Readiness commit

```txt
required provider rows accepted
  -> verify worldRevision and cellGeneration
  -> verify provider descriptor versions
  -> verify terrain/biome/shoreline/population availability
  -> compute providerReadinessSet fingerprint
  -> refresh presentation descriptor
  -> assign cellReadinessRevision
  -> publish clone-safe result
```

## Renderer transaction

```txt
CellReadinessRevision
  -> build detached RendererCellPlan
  -> prepare or update Three/WebGPU resources
  -> validate resource counts and bounds
  -> commit scene membership atomically
  -> release replaced resources
  -> acknowledge first visible frame
  -> retain rollback record until acknowledgement
```

## Required fixtures

```txt
production host advances materialization after compatibility frames
configured candidate and row budgets hold
elapsed-time budget stops additional work
priority is deterministic for identical inputs
focus movement reprioritizes current cells
released cell cannot publish a late readiness revision
reset/dispose rejects old commands
provider exception becomes typed failure
retry count and backoff are bounded
presentation readiness cites all required source versions
same source versions produce same readiness fingerprint
renderer prepares each accepted revision once
renderer rollback leaves compatibility world intact
released cells dispose resources once
visible frame cites committed renderer-cell revision
WebGPU and WebGL2 admission results agree
```

## Acceptance conditions

```txt
no untyped provider exception can terminate the animation loop
all work is fenced to current session/world/focus/cell identity
ready means a complete provider version set, not a Boolean marker
renderer consumes only accepted readiness revisions
compatibility rendering remains stable during partial or failed work
resource preparation, commit, rollback, and disposal are observable
browser proof shows a ready cell becoming visibly committed
```
