# Render Audit: Save Status Central Provenance Reconciliation

Timestamp: `2026-07-12T14-59-01-04-00`

## Summary

The HUD currently projects engine capture state, not verified browser durability. A frame may display `Saved` after the portable snapshot was captured even when `localStorage.setItem` failed.

## Plan ledger

**Goal:** make every visible save status identify the durable storage result that authorized it.

- [x] Separate portable snapshot capture from physical storage commit.
- [x] Trace the current HUD dependency on `SaveState.status`.
- [x] Record the missing commit, generation and frame identities.
- [x] Define the required visible-frame acknowledgement.
- [ ] Implement and execute render/save provenance fixtures.

## Current projection

```txt
cozySave.capture
  -> SaveState.status = captured
  -> saveCount increments
  -> host attempts localStorage.setItem
  -> render snapshot reads captured status
  -> HUD can display Saved
```

## Missing provenance

```txt
durableCommitId
storageGeneration
storageRecordFingerprint
verifiedStorageKey
writerTabId
predecessorChecksum
storageWriteResult
readbackVerificationResult
restoreGeneration
resetCommitId
visibleSaveFrameId
firstRestoredFrameAck
```

## Required projection rule

```txt
Captured
  means portable engine payload exists

Saving
  means a host persistence transaction is admitted or active

Saved
  requires verified durable commit and committed storage generation

Save failed
  requires typed failure and must not retain predecessor success as current truth

Restored
  requires committed participant restore plus first visible restored-frame acknowledgement
```

## Validation boundary

No renderer, HUD or save behavior changed. This file documents the required provenance contract only.