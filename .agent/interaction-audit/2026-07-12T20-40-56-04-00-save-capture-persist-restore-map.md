# Interaction audit: save capture, persist and restore map

**Timestamp:** `2026-07-12T20-40-56-04-00`

## Summary

Save interactions cross two authorities without one shared command or result. The portable DSK owns snapshot semantics, while the browser host owns durable storage and page lifecycle. Current callers infer success from intermediate state.

## Plan ledger

**Goal:** define explicit commands and typed results for startup restore, autosave, pagehide save and rollback.

- [x] Map every current save entry point.
- [x] Map participant and presentation consumers.
- [x] Identify missing identities, generations and results.
- [ ] Implement the interaction protocol and fixtures.

## Current interaction map

```txt
startup restore
  localStorage.getItem
    -> JSON.parse
    -> cozySave.restore
    -> checksum/migration
    -> sequential participant loads
    -> optional rollback
    -> loader text mentions save restored when result.ok

autosave
  elapsed five seconds
    -> durable fingerprint comparison
    -> cozySave.capture
    -> localStorage.setItem
    -> advance host fingerprint only on adapter success

pagehide
  event
    -> storeSave
    -> no completion or failure consumer
    -> dispose gameplay renderer

public host
  CozyIsland.captureSave
    -> returns portable snapshot only
  CozyIsland.resetAdventure
    -> resets durable participants in memory
```

## Missing command envelopes

```txt
SaveCommitCommand:
  commandId
  runtimeSessionId
  runGeneration
  expectedDurableFingerprint
  storageSlotId
  storageGeneration
  reason: autosave | manual | pagehide

RestoreCommand:
  commandId
  runtimeSessionId
  expectedRunGeneration
  storageSlotId
  restoreGeneration
  expectedSchema
  expectedChecksum
```

## Required typed results

```txt
SaveCaptured
SavePersisted
SaveRejectedStale
SaveStorageUnavailable
SaveQuotaExceeded
SaveSecurityBlocked
SaveReadbackMismatch
SaveCancelled

RestoreAccepted
RestoreMigrated
RestoreRejectedInvalidEnvelope
RestoreParticipantFailed
RestoreRolledBack
RestoreRollbackFailed
RestoreRejectedStale
```

## Admission map

```txt
caller intent
  -> allocate command and generation
  -> validate predecessor and slot
  -> capture detached candidate
  -> persist and verify
  -> commit receipt or preserve predecessor
  -> publish observation
  -> project visible status
```

## Zero-mutation rules

```txt
stale save generation -> no slot or status mutation
failed write -> no durable-success status
failed readback -> predecessor remains authoritative
invalid restore envelope -> no participant mutation
failed restore with successful rollback -> predecessor restored exactly
failed rollback -> explicit partial/failed state, never rolledBack:true
```

## Consumers

```txt
autosave fingerprint tracker
save HUD
loader text
pagehide lifecycle
public debug host
render-snapshot domain
central diagnostics and fixtures
```

No consumer currently receives one receipt proving the candidate is durable and visible.