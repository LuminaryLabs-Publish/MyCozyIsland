# Quality-system audit: participant revision and rollback contract

**Timestamp:** `2026-07-12T23-08-37-04-00`

## Summary

Cloud steps, fog steps, fog resolution and renderer DPR are independent mutable participants with no shared revision. The quality authority must treat them as one prepare/commit/readback/rollback set.

## Plan ledger

**Goal:** define exact participant contracts and invariants.

- [x] Identify all current mutable participants.
- [x] Define predecessor and successor state.
- [x] Define rollback and stale-result rules.
- [ ] Implement participant adapters.

## Participant contract

Each participant must provide:

```txt
id
supported range
readCurrent()
prepare(target, expectedRevision)
commit(planId)
verify(planId)
rollback(predecessor, planId)
retire(planId)
```

## Invariants

```txt
one quality revision per committed participant set
no partial success result
recovery restores every degraded participant
actual readback, not requested value, drives diagnostics
late results cannot mutate a newer surface generation
rollback failure is terminal and observable
visible frame cites committed render generation
```

## Participants

```txt
renderer DPR
cloud raymarch steps
fog raymarch steps
fog pass resolution scale
future shadow, vegetation and post-effect participants only after explicit registration
```

Documentation only.