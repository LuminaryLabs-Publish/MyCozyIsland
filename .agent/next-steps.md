# Next Steps: MyCozyIsland

Last updated: `2026-07-11T08-41-02-04-00`

## Summary

Implement lifecycle ownership first, then replace Boolean focus updates with a versioned transaction that can be run against both the exact pinned Core World runtime and a contract-faithful test adapter. Do not wire live provider cells into rendering until an accepted world revision exists.

## Plan ledger

**Goal:** produce one accepted focus revision across wrapper state, Core World state and all seven provider stores, with deterministic retry and failure classification.

- [ ] Complete Runtime Session Lifecycle Authority and expose `sessionId` plus `sessionEpoch`.
- [ ] Define `FocusCommand` with command, session, epoch, expected revision, target and reason.
- [ ] Make initial `prepare()` retriable; set `prepared = true` only after an accepted initial focus result.
- [ ] Replace pre-commit wrapper mutation with detached target calculation.
- [ ] Capture wrapper, Core World and provider-store checkpoints before mutation.
- [ ] Run the exact pinned production runtime in Node fixtures.
- [ ] Upgrade or replace the fake runtime so it implements the same selection and provider contract.
- [ ] Add explicit `required`, `updated`, `retained` and `released` selection readback.
- [ ] Add provider result rows for every phase/cell/provider action.
- [ ] Classify complete, degraded, rejected, rolled-back and partial outcomes.
- [ ] Restore the last accepted wrapper/Core World/provider revision after a failed transaction where policy permits.
- [ ] Publish monotonic `worldRevision` and `providerRevisionSet` values.
- [ ] Return immutable `FocusTransactionResult` instead of Boolean.
- [ ] Journal bounded focus commands/results and expose clone-safe observations.
- [ ] Correlate accepted focus revisions with the runtime session epoch.
- [ ] Add production/fake parity, failure injection and retry fixtures.
- [ ] Keep visible provider-cell render consumption as the next separate transaction.

## Current implementation queue

```txt
1. Runtime Session Lifecycle Authority
   + Startup Rollback / Stop / Dispose / Restart Fixture Gate

2. Pinned Core World Focus Transaction Authority
   + Production/Fake Contract Parity and Failure Fixture Gate

3. Core World Render Commit Authority
   + Provider/Cell Consumer Fidelity Fixture Gate

4. Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

5. Dynamic Environment Frame Authority
   + Consumer Coherence Fixture Gate

6. Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

## Focus transaction candidate kits

```txt
focus-command-kit
focus-target-normalization-kit
focus-admission-kit
focus-checkpoint-kit
provider-store-checkpoint-kit
focus-selection-plan-kit
provider-transition-result-kit
focus-transaction-kit
focus-rollback-kit
world-revision-kit
provider-revision-set-kit
focus-result-kit
focus-journal-kit
focus-observation-kit
core-world-contract-adapter-kit
core-world-parity-fixture-kit
focus-failure-injection-kit
focus-retry-fixture-kit
```

Prefer extending the existing product world wrapper and existing NexusEngine Core World DSK. Add a reusable core primitive only when the transaction semantics are general across worlds.

## Command contract

```txt
FocusCommand {
  commandId
  sessionId
  sessionEpoch
  expectedWorldRevision
  source
  reason
  cameraMode
  targetPosition
  deltaSeconds
}
```

Admission rejects:

```txt
wrong session
stale epoch
unexpected revision
runtime not prepared
runtime stopping or disposed
non-portable or non-finite target
unsupported camera mode
```

## Result contract

```txt
FocusTransactionResult {
  commandId
  sessionId
  sessionEpoch
  status
  reason
  previousWorldRevision
  worldRevision
  previousFocus
  focus
  previousCellKey
  cellKey
  selection: { required, updated, retained, released }
  providerResults[]
  coreWorldSequence
  wrapperSnapshotFingerprint
  providerStoreFingerprint
  rollback
  diagnostics[]
  resultFingerprint
}
```

Allowed statuses:

```txt
unchanged
committed-complete
committed-degraded
rejected-stale
rejected-state
rejected-invalid
failed-before-focus
failed-after-focus-rolled-back
failed-provider-rolled-back
failed-provider-partial
```

## Transaction order

```txt
normalize command
  -> validate session/epoch/revision
  -> calculate target and cell without mutating wrapper state
  -> capture accepted checkpoint
  -> stage or execute production focus/cell transition
  -> collect provider and Core World outcomes
  -> validate world/provider parity
  -> commit wrapper bookkeeping only after acceptance
  -> assign world revision and fingerprint
  -> publish result and journal entry
```

## Initial prepare repair

Current order:

```txt
prepared = true
commitFocus(origin)
```

Required order:

```txt
status = preparing
execute initial FocusCommand
if committed:
  prepared = true
  status = ready
else:
  prepared = false
  retain or restore clean checkpoint
  return typed failure
```

A second `prepare()` after failure must retry or return an explicit terminal rejection; it must not silently return `null` or stale state.

## Contract parity fixture

Run the same scenario matrix against:

```txt
A. exact pinned NexusEngine modules
B. local contract adapter used by deterministic tests
```

Scenarios:

```txt
initial 49-cell prepare
same-cell no-op
movement below interval
movement below minimum distance
single cell-boundary crossing
multiple-cell jump
provider not-applicable
missing required capability
noncritical provider failure
critical provider failure
release failure
partition selection validation failure
provider async-method rejection
retry after initial failure
retry after movement failure
reset/dispose during focus command
```

Compare:

```txt
selection identities and counts
provider order and actions
cell states and descriptor versions
diagnostics and failure codes
release/rollback order
active-cell IDs
provider-store counts
focus and Core World sequence
portable snapshots
result classifications
```

## Failure injection points

```txt
before setFocus
immediately after setFocus commit
partition.selectCells
selection validation
first released cell
provider release
first updated cell
provider update
first required cell
provider prepare
provider effect normalization
Core World state validation
cellsChanged commit
wrapper snapshot assignment
wrapper cell-key assignment
result publication
```

## Acceptance conditions

```txt
failed initial prepare is retriable
no failed focus reports committed-complete
wrapper and Core World focus agree after every terminal result
accepted world revision has deterministic active-cell IDs
all provider stores match accepted active-cell policy
rollback result identifies every restored or residual row
stale session/epoch/revision commands cannot mutate state
repeat command ID is idempotent or explicitly rejected
production and test adapter classifications match
render receives only committed world revisions
```

## Follow-on render gate

After focus authority is executable:

```txt
accepted FocusTransactionResult
  -> detached provider/cell render plan
  -> resource capacity and lifecycle preflight
  -> atomic visible-cell commit
  -> RenderCommitResult correlated with worldRevision
```

Do not let the existing startup compatibility snapshot stand in for this proof.
