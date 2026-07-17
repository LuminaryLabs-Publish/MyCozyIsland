# Current audit: host save commit durability projection

**Timestamp:** `2026-07-17T03-06-12-04-00`  
**Status:** `host-save-commit-durability-projection-authority-audited`

## Summary

MyCozyIsland was selected through the oldest synchronized documented-selection rule. The runtime has a strong in-memory save envelope, checksum, migration and rollback path, but host persistence is not represented by a typed command/result boundary.

## Source-backed behavior

```txt
autosave demand
  -> compare current durable-state fingerprint
  -> cozySave.capture()
  -> save domain becomes captured
  -> saveCount increments and lastError clears
  -> browser calls localStorage.setItem
  -> success advances host fingerprint
  -> failure returns only from the host helper

HUD
  -> reads frame.save.status
  -> status captured renders Saved

pagehide
  -> calls the same store helper
  -> disposes gameplay renderer
```

## Main gap

Capture state and durable persistence state are conflated. The save domain claims `captured` before the host effect settles, and a failed host write cannot publish an authoritative failure into the save state. The HUD can therefore render `Saved` without a matching durable commit receipt.

Existing tests validate capture, checksum restore, migration and rollback in memory. They do not exercise actual `localStorage`, quota or availability failure, page retirement, stale results, retries or save-status frame convergence.

This is an ownership and durability-projection gap, not proof that a player has lost a save.

## Required authority

`cozy-island-host-save-commit-durability-projection-authority-domain`

Required results:

- `SaveEnvelopeCaptureResult`
- `HostSaveCommitResult`
- `SaveDurabilitySettlementResult`
- `SaveStatusProjectionResult`
- `FirstDurableSaveStatusFrameAck`
- `PageLifecycleSaveResult`

## Domains and services

The current composition contains 14 engine-installed core/adventure kits, 50 cataloged world/render/host kits, one additional composition kit, 16 explicit menu domain/kit surfaces and four browser/product adapters. Complete IDs, loops and offered services are in the timestamped tracker and `.agent/kit-registry.json`.

## Validation boundary

Documentation only. No runtime JavaScript, HTML, CSS, save envelope, localStorage behavior, gameplay, rendering, test, workflow or deployment behavior was changed.
