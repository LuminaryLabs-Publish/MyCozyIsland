# Render audit: save-status conflict visible-frame gap

**Timestamp:** `2026-07-15T15-01-22-04-00`

## Summary

The HUD can say `Saved` from in-memory capture status even though another document may later replace that commit. No visible frame is bound to a durable slot-head revision.

## Plan ledger

**Goal:** make visible save status describe one verified durable commit.

- [x] Trace `frame.save.status` into `#save-status`.
- [x] Separate capture success from durable commit success.
- [x] Identify the missing slot-head revision and conflict result.
- [ ] Render `Saving`, `Saved rN`, `Conflict`, `Read-only preload` and `Storage unavailable` from accepted results.
- [ ] Publish `FirstDurableSaveFrameAck`.

## Gap

```txt
capture() -> SaveState.status=captured
updateHud() -> Saved
other document can later overwrite the slot
no frame records the durable revision that remains current
```

A correct frame must bind document ID, writer session, commit ID, accepted slot-head revision, checksum and storage readback receipt.
