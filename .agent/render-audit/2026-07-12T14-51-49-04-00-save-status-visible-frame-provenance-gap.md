# Render Audit: Save Status and Visible-Frame Provenance Gap

Timestamp: `2026-07-12T14-51-49-04-00`

## Summary

The HUD projects `Saved` from engine capture state, not from a verified browser-storage commit. Restore also has no first-visible-frame receipt tying the rendered island to the storage generation that produced it.

## Plan ledger

**Goal:** make save status and restored-world presentation cite one durable storage result and one visible frame.

- [x] Trace SaveState into `cozy-render-snapshot-domain-kit`.
- [x] Trace frame HUD projection in `src/main-adventure.js`.
- [x] Compare capture timing, storage write timing and frame timing.
- [x] Identify restore-to-first-frame provenance gaps.
- [ ] Add durable save and restore frame receipts in runtime work.

## Current projection loop

```txt
frame N
  -> get frame snapshot
  -> frame.save contains prior SaveState
  -> update HUD
  -> render world
  -> autosave check runs after render
  -> cozySave.capture marks state captured
  -> localStorage write may succeed or fail

frame N+1
  -> get frame snapshot
  -> HUD says Saved when state.status === captured
  -> no storage commit ID is available
```

The status is therefore one frame delayed relative to capture and uncorrelated with durable storage success.

## Concrete false-positive path

```txt
dirty state
  -> autosave interval expires
  -> capture succeeds
  -> SaveState.status = captured
  -> saveCount increments
  -> localStorage.setItem throws quota/security error
  -> host returns ok: false
  -> lastSaveFingerprint remains old
  -> next frame HUD still says Saved
```

The host will retry later, but the visual status is already false.

## Restore provenance gap

```txt
load localStorage
  -> parse and restore
  -> construct initialFrame
  -> build renderer resources
  -> begin animation loop
```

No shared result identifies:

```txt
storage generation
save commit ID
restore command ID
restore participant revision
migration receipt
first frame ID
first presented frame acknowledgement
```

A successful `restore()` result proves only that the sequential engine calls returned successfully. It does not prove that the first visible island frame came from the same durable record.

## Required frame contract

```txt
SaveCommitResult
  commitId
  storageGeneration
  dirtyRevision
  checksum
  predecessorChecksum
  committedAt

SaveStatusProjection
  state: dirty | saving | saved | conflicted | failed
  commitId
  storageGeneration
  pendingDirtyRevision
  lastFailure

RestoreResult
  restoreId
  storageGeneration
  checksum
  migrationId
  participantRevision

SaveFrameReceipt
  frameId
  saveCommitId or restoreId
  storageGeneration
  renderSnapshotRevision
  presented: true
```

## Required rendering behavior

1. `Saved` is projected only after `SaveCommitResult(committed)`.
2. A failed write projects `Save failed` or `Retrying`, not `Saved`.
3. A conflicted writer projects conflict state and keeps dirty changes explicit.
4. Restore success is projected only after the first matching frame is presented.
5. Migration and quarantine outcomes remain visible through bounded status history.
6. WebGPU and WebGL2 consumers receive identical save/restore provenance fields.

## Missing proof

```txt
storage-write-failure HUD fixture
quota-exceeded HUD fixture
restore-to-first-frame receipt fixture
migration-to-first-frame receipt fixture
WebGPU/WebGL2 save-status parity fixture
Pages restored-save frame smoke
```
