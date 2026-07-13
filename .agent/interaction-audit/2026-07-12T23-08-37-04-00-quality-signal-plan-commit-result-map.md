# Interaction audit: quality signal, plan, commit and result

**Timestamp:** `2026-07-12T23-08-37-04-00`

## Summary

Frame-time signals currently call mutating callbacks directly. The missing boundary is a typed interaction from performance evidence to an admitted quality plan and terminal result.

## Plan ledger

**Goal:** replace callback mutation with explicit commands and results.

- [x] Identify signal sources.
- [x] Identify target participants.
- [x] Define rejection and result states.
- [ ] Wire the command path.

## Required map

```txt
PerformanceBudgetSignal
  -> AdaptiveQualityTransitionCommand
  -> expected quality revision
  -> participant capability/readback
  -> detached target plan
  -> admission
  -> commit or rollback
  -> AdaptiveQualityTransitionResult
  -> diagnostics projection
  -> visible-frame acknowledgement
```

## Terminal results

```txt
Committed
NoChange
Stale
Unsupported
ParticipantRejected
VerificationFailed
RolledBack
RollbackFailed
Cancelled
```

Duplicate commands must be idempotent. Resize, backend change and page lifecycle must either join the same generation or reject stale transition work.

Documentation only.