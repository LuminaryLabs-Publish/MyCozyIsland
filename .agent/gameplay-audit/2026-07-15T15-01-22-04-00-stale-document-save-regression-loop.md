# Gameplay audit: stale-document save regression loop

**Timestamp:** `2026-07-15T15-01-22-04-00`

## Summary

A checksum-valid but older document snapshot can become the next loaded game because save freshness is not represented or arbitrated.

## Plan ledger

**Goal:** prevent an inactive or stale document from regressing durable adventure progress.

- [x] Trace startup restore, active progression, autosave and pagehide.
- [x] Confirm all writers share one key.
- [x] Confirm the envelope has integrity but no durable ordering.
- [ ] Reject writes whose base revision is behind the current slot head.
- [ ] Make hidden preload read-only until accepted entry.
- [ ] Add a deterministic two-tab regression fixture.

## Reachable loop

```txt
A and B restore R1
A harvests, gathers and writes R2
B remains frozen or inactive on R1
B pagehide writes a valid R1-derived snapshot
next startup loads B
A's accepted progress is lost
```

This is a source-derived concurrency path, not a reproduced incident.
