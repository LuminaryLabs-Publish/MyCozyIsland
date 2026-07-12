# Interaction Audit: World Lifecycle Command / Result Map

Timestamp: `2026-07-11T20-51-14-04-00`

## Summary

World lifecycle is currently exposed as direct method calls with implicit success. `prepare()` returns a snapshot, `reset()` returns nothing and `dispose()` returns nothing. No caller can distinguish accepted, duplicate, stale, failed, rolled back or terminal operations.

## Plan ledger

**Goal:** define the lifecycle command and result vocabulary consumed by startup, restart, page lifecycle, rendering and diagnostics.

- [x] Inventory public lifecycle methods.
- [x] Compare return values across modes.
- [x] Identify missing admission and idempotency.
- [x] Define commands and typed results.

## Current API

```txt
prepare() -> snapshot or rejection
reset() -> undefined
dispose() -> undefined
updateWorldFocus() -> boolean
processMaterializationFrame() -> state
getQuery() -> long-lived raw object
```

## Required commands

```txt
PrepareWorldCommand
ResetWorldCommand
DisposeWorldCommand
AcquireWorldQueryCommand
ReleaseWorldQueryCommand
```

Every command carries:

```txt
sessionId
commandId
sequence
worldMode
expectedPhase
expectedGeneration
reason
```

## Required results

```txt
Prepared
ResetCommitted
Disposed
Duplicate
RejectedStale
RejectedTerminal
FailedRolledBack
FailedBlocked
```

Results must include before/after phase, generation, definition state, active-cell count, provider/materializer retirement receipts, unresolved ownership and optional first-frame acknowledgement.

## Admission rules

```txt
prepare accepted from NEW or RESET
reset accepted from READY or FAILED-recoverable
dispose accepted from any non-DISPOSED phase
dispose duplicate is idempotent
commands after DISPOSED are rejected
query leases are generation-bound
```
