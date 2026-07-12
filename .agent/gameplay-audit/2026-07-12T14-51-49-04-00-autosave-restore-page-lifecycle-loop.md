# Gameplay Audit: Autosave, Restore and Page-Lifecycle Loop

Timestamp: `2026-07-12T14-51-49-04-00`

## Summary

Autosave is driven by simulation delta inside the renderer loop, restore is a startup-only host action, and final persistence relies on a one-shot pagehide listener. These paths do not share save identity, lifecycle generation or a durable reset contract.

## Plan ledger

**Goal:** map every gameplay-to-persistence transition and identify where state can be lost, duplicated or misreported.

- [x] Trace startup restore.
- [x] Trace frame fingerprint and autosave cadence.
- [x] Trace pagehide final save.
- [x] Trace reset and global diagnostics.
- [x] Trace save state into HUD.
- [ ] Implement one lifecycle-aware persistence command stream later.

## Startup restore loop

```txt
main
  -> create adventure
  -> localStorage.getItem(SAVE_KEY)
  -> JSON.parse
  -> cozySave.restore
  -> construct static and initial frame snapshots
  -> construct renderer resources
  -> start animation loop
```

Failure handling is host-local:

```txt
empty key       -> continue with default state
parse failure   -> warn and continue with default state
restore failure -> continue with restored rollback/default state
corrupt record  -> remains at the same key for the next reload
```

No recovery choice, backup selection or quarantine result reaches gameplay.

## Autosave loop

```txt
renderer frame
  -> dt is clamped to <= 0.05 seconds
  -> autoSaveAccumulator += dt
  -> every accumulated 5 simulation seconds:
       compute durableFingerprint
       compare with last successful host fingerprint
       capture and write when changed
```

Consequences:

- Cadence follows rendered simulation time, not elapsed wall time.
- Background throttling can delay save checks indefinitely.
- Fast real-time gaps contribute at most 0.05 seconds per callback.
- Scenario elapsed time, player position and distance keep the fingerprint changing during normal play.
- Capture state changes before host durability is known.

## Page lifecycle loop

```txt
pagehide once
  -> storeSave
  -> gameplayRenderer.dispose
```

Missing lifecycle ownership:

```txt
no visibility-triggered save
no flush command ID
no page lifecycle generation
no deadline or result journal
no pageshow handler
no bfcache rearm
no stale listener rejection
no renderer loop retirement receipt
```

Because the listener is one-shot, a page restored from bfcache can later leave again without the original pagehide handler.

## Reset loop

```txt
global CozyIsland.resetAdventure
  -> cozySave.resetAll
  -> reset engine domains
  -> no immediate localStorage clear or baseline commit
  -> later autosave/pagehide may persist reset state
```

A reset followed by process termination before the next durable write can resurrect the previous save on reload.

## Multi-tab loop

```txt
tab A loads checksum X
tab B loads checksum X
tab A commits checksum Y
tab B later commits checksum Z from predecessor X
localStorage keeps Z
```

No tab identity, writer lease, storage event admission or predecessor comparison prevents silent lost updates.

## Required gameplay-facing results

```txt
SaveCommitResult
  committed | unchanged | conflicted | failed

RestoreResult
  restored | migrated | quarantined | defaulted | rollback-failed

ResetCommitResult
  committed | failed

LifecycleFlushResult
  committed | skipped-clean | timed-out | failed
```

## Required integration order

```txt
dirty gameplay revision
  -> autosave policy
  -> host save command
  -> verified storage commit
  -> save status projection

startup storage record
  -> restore admission
  -> participant commit
  -> first visible frame receipt

reset command
  -> engine reset
  -> immediate durable baseline/tombstone
  -> reset frame receipt
```
