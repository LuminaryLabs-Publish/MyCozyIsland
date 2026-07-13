# Render audit: save-status visible-frame gap

**Timestamp:** `2026-07-12T20-40-56-04-00`

## Summary

The visible save label is derived from the portable save DSK's in-memory `status`, not from browser storage evidence. `capture()` sets the state to `captured`; `updateHud()` renders `Saved` for that value. `localStorage.setItem()` runs afterward and can fail without correcting the frame state.

## Plan ledger

**Goal:** ensure the HUD can only display durable success from a storage receipt tied to the visible frame.

- [x] Trace SaveState into the renderer-neutral frame.
- [x] Trace the frame into `#save-status`.
- [x] Compare capture timing with adapter persistence timing.
- [x] Define the missing frame receipt.
- [ ] Implement browser and Pages proof.

## Current projection

```txt
cozySave.capture()
  -> SaveState.status = captured
  -> render snapshot includes save state
  -> updateHud(frame)
  -> captured ? Saved : Auto-save on

storeSave()
  -> localStorage.setItem() happens after capture
  -> adapter failure returns ok:false
  -> SaveState remains captured
  -> next frame can still display Saved
```

## Missing frame evidence

```txt
save command ID
save commit generation
storage slot ID
candidate checksum
write result
readback checksum
DurableSaveReceipt ID
last-known-good predecessor slot
save presentation revision
first visible save-status acknowledgement
```

## Required visible contract

```txt
DurableSaveReceipt
  -> save-status descriptor
  -> renderer-neutral frame cites receipt ID and commit generation
  -> WebGPU/WebGL2 host presents frame
  -> SaveVisibleFrameAck cites the same receipt and generation
```

Failure states must remain visible and distinct:

```txt
captured locally
saving
saved durably
quota blocked
storage unavailable
readback mismatch
restore failed
rollback failed
```

## Proof gap

The Node smoke does not instantiate localStorage or assert HUD text. No browser, fallback-renderer or Pages fixture injects a failing storage adapter and verifies that `Saved` is withheld.