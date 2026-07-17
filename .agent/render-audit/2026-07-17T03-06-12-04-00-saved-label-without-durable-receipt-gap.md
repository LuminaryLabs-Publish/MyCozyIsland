# Render audit — Saved label without durable receipt

**Timestamp:** `2026-07-17T03-06-12-04-00`

## Current projection

`updateHud(frame)` renders `Saved` whenever `frame.save.status === "captured"`.

The status is set by `cozySave.capture()` before the browser host attempts `localStorage.setItem`. If storage throws, the host returns `{ ok: false }`, but the save-domain state remains captured and the HUD can continue to show `Saved`.

## Missing visible-frame evidence

- Save generation and envelope digest.
- Host commit status.
- Last durable digest.
- Storage failure diagnostics.
- `SaveDurabilitySettlementResult`.
- `FirstDurableSaveStatusFrameAck`.

## Required projection states

```txt
idle      no pending envelope
saving    envelope captured, host effect pending
saved     matching host commit persisted
failed    matching host commit failed
unavailable storage capability denied
```

A visible `Saved` frame must bind the same save generation and digest as the successful host commit receipt.
