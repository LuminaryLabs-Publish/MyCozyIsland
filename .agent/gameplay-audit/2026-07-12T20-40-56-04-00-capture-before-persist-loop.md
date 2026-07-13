# Gameplay audit: capture-before-persist loop

**Timestamp:** `2026-07-12T20-40-56-04-00`

## Summary

Autosave detects a changed durable fingerprint, but `cozySave.capture()` publishes `captured` before the browser adapter proves persistence. A failing storage write leaves gameplay state intact and causes later retries, yet the current frame can still claim the run was saved.

## Plan ledger

**Goal:** make autosave progression depend on a durable receipt rather than an in-memory snapshot event.

- [x] Trace five-second autosave cadence.
- [x] Trace the durable fingerprint and retry behavior.
- [x] Trace pagehide persistence.
- [x] Identify false-success and rollback-reporting paths.
- [ ] Implement and run durability fixtures.

## Current loop

```txt
frame tick
  -> autoSaveAccumulator += dt
  -> every five seconds compute durable fingerprint
  -> fingerprint differs from lastSaveFingerprint
  -> storeSave(adventure)
  -> cozySave.capture()
       -> status = captured
       -> saveCount += 1
       -> revision += 1
  -> localStorage.setItem()
       -> success: adapter returns ok:true and advances lastSaveFingerprint
       -> failure: adapter returns ok:false and lastSaveFingerprint remains old
  -> next frame projects SaveState.status
```

## False-success path

```txt
changed game state
  -> capture succeeds in memory
  -> localStorage quota/security failure
  -> adapter returns ok:false
  -> SaveState remains captured
  -> HUD renders Saved
  -> durable slot still contains predecessor or nothing
```

The stale fingerprint causes future retries, which is useful, but it does not repair the false visible success or provide a bounded retry/backoff policy.

## Restore failure path

```txt
restore candidate passes envelope validation
  -> one participant load fails
  -> rollback begins
  -> one rollback participant also fails
  -> error is logged
  -> restore returns rolledBack:true
```

This can let callers treat a partially restored world as safely reverted.

## Gameplay consequences

```txt
player may leave believing progress is durable when it is not
pagehide may end before storage completion is proven
successive failed autosaves can repeatedly capture and increment diagnostics
partial restore can leave cross-domain state inconsistent
visible save status has no relation to the actual storage slot
```

## Required gameplay contract

```txt
changed durable fingerprint
  -> SaveCommitCommand
  -> candidate capture
  -> storage write and readback
  -> DurableSaveReceipt
  -> advance lastDurableFingerprint
  -> publish Saved

failure
  -> preserve predecessor fingerprint and slot
  -> publish typed failure
  -> retry under explicit policy
  -> never publish Saved
```

## Proof gap

The current smoke test proves Agriculture/Foraging state can be captured and restored in memory. It does not emulate browser storage, failures, page lifecycle, retry budgets or HUD truthfulness.