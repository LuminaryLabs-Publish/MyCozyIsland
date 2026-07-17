# Deploy audit — Browser storage failure fixture gate

**Timestamp:** `2026-07-17T03-06-12-04-00`

## Required source fixtures

- Capture returns a checksum envelope without claiming durability.
- Successful host commit advances the matching durable digest once.
- `localStorage.setItem` exception settles failure and preserves the previous durable digest.
- Disabled or unavailable storage projects an unavailable state.
- Duplicate and stale commit results do not mutate current save state.
- Retry success clears only the matching failure.
- HUD `Saved` requires the successful commit generation.
- In-memory capture/restore/migration tests continue to pass.

## Required browser fixtures

- WebGPU and WebGL2 gameplay with successful autosave.
- Quota-exceeded write failure.
- Security/availability failure.
- Corrupt stored JSON and checksum mismatch.
- Rapid mutations during a pending save.
- `visibilitychange`, `pagehide`, reload and back-forward cache behavior.
- Matching `FirstDurableSaveStatusFrameAck`.

## Delivery gate

Run the same fixtures against source hosting, packaged/static artifact output and the GitHub Pages origin. Do not claim durable-save correctness or deployed parity until the matching commit receipts and visible frames converge in all required origins.
