# Known gaps: MyCozyIsland save-writer lease and revision admission

**Timestamp:** `2026-07-15T15-01-22-04-00`

## Summary

The current durable slot protects payload integrity but not writer freshness or cross-document ordering.

## Plan ledger

**Goal:** keep unresolved risks explicit until implementation and proof exist.

- [ ] No durable slot-head revision.
- [ ] No document or writer-session identity.
- [ ] No writer lease, heartbeat or expiry.
- [ ] Hidden preload is not storage-read-only.
- [ ] No base-revision compare-and-swap.
- [ ] No stale autosave/pagehide rejection.
- [ ] No `storage`-event head synchronization.
- [ ] No conflict result or user recovery policy.
- [ ] Save success is not bound to the durable head.
- [ ] No predecessor/readback verification for concurrent commits.
- [ ] No two-tab, two-preload or crash-takeover fixture.
- [ ] No source/build/Pages concurrency parity proof.

## Important distinction

Checksum validation answers “are these bytes internally consistent?” It does not answer “is this the newest accepted save?” A stale document can produce a perfectly valid checksum.
