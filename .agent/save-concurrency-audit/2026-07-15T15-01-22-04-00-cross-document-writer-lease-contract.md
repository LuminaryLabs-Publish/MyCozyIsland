# Save concurrency audit: cross-document writer-lease contract

**Timestamp:** `2026-07-15T15-01-22-04-00`

## Summary

The durable save slot is a shared resource. Integrity checks prove bytes are internally consistent, not that the writer is current.

## Plan ledger

**Goal:** admit exactly one current writer while preserving safe recovery from crashes and tab changes.

- [ ] Assign stable `DocumentId` and ephemeral `WriterSessionId`.
- [ ] Keep embedded preload read-only before `cozy-game-enter`.
- [ ] Acquire a bounded lease on accepted player entry.
- [ ] Renew the lease while active and visible.
- [ ] Observe slot-head changes from other documents.
- [ ] Require candidate `baseRevision === currentRevision`.
- [ ] Commit `revision + 1` with writer and predecessor metadata.
- [ ] Read back and verify the committed record.
- [ ] Reject stale autosave and pagehide writers.
- [ ] Release or expire leases on hide, pagehide, crash and retirement.
- [ ] Define user-visible conflict recovery without silently merging simulation state.

## Durable record

```txt
SaveRecord
  schema
  slotId
  commitRevision
  commitId
  writerSessionId
  predecessorRevision
  createdAt
  payload
  checksum
```

## Invariants

```txt
one accepted head per slot revision
monotonic commitRevision
checksum and readback verification
hidden preload cannot mutate the slot
pagehide cannot bypass stale-base checks
conflicts never report Saved
```
