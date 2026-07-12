# World Lifecycle Audit: Legacy / Core Phase and Generation Contract

Timestamp: `2026-07-11T20-51-14-04-00`

## Summary

A structurally shared wrapper must not hide mode-specific lifecycle semantics. The canonical contract must make phase, generation, reusable-reset policy, terminal disposal and read-model validity explicit.

## Plan ledger

**Goal:** define lifecycle state, transition invariants, read-model leases and mode adapters for one authoritative world wrapper.

- [x] Identify current phases implied by code.
- [x] Identify legacy/Core semantic differences.
- [x] Identify stale reference surfaces.
- [x] Define canonical phase and generation contract.
- [x] Define parity and terminal-use fixtures.

## Canonical state

```txt
WorldLifecycleState {
  sessionId
  worldId
  mode
  phase
  generation
  definitionRevision
  snapshotRevision
  activeCellCount
  providerStateRevision
  materializerRevision
  queryLeaseCount
  lastResult
}
```

## Transition table

| From | Command | To | Notes |
|---|---|---|---|
| NEW | Prepare | READY | commit only with valid snapshot |
| READY | Prepare | READY | typed idempotent duplicate |
| READY | Reset | RESET | freeze and retire generation |
| RESET | Prepare | READY | new generation |
| NEW/READY/RESET/FAILED | Dispose | DISPOSED | idempotent terminal retirement |
| DISPOSED | any mutation | DISPOSED | reject with terminal result |

## Mode adapters

```txt
legacy adapter
  -> no Core World cells
  -> still increments generation on successful reset/prepare
  -> returns canonical result schema

core adapter
  -> retains or re-registers definition for reusable reset
  -> retires providers/materializer in declared order
  -> verifies active-cell/provider parity before READY
```

## Read-model policy

Queries, diagnostics and snapshots are leases bound to one generation. After reset or disposal they either return a detached immutable historical observation or a typed stale/terminal result. Raw mutable engine and provider objects are not public lifecycle read models.

## Required fixtures

```txt
legacy/core result-shape parity
prepare duplicate idempotency
reset then prepare generation advance
terminal dispose idempotency
prepare/update/query after dispose rejection
stale query lease rejection
provider/materializer retirement count parity
first READY frame after reset
```
