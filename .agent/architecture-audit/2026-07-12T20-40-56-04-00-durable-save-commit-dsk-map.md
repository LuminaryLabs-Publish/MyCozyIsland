# Architecture audit: durable save commit DSK map

**Timestamp:** `2026-07-12T20-40-56-04-00`

## Summary

The existing `cozy-save-domain-kit` owns portable state capture, checksum validation, migration, participant restore, rollback and reset. The browser host separately owns `localStorage`, autosave cadence, pagehide persistence and visible save wording. There is no authority joining those two boundaries into one durable commit.

## Plan ledger

**Goal:** separate portable snapshot semantics from adapter-owned storage mechanics while joining them through typed commands, results and revisions.

- [x] Map current producer, adapter and presentation boundaries.
- [x] Preserve the existing save DSK as renderer and host agnostic.
- [x] Identify missing durable commit and restore-generation contracts.
- [x] Define candidate kits without moving browser APIs into the core DSK.
- [ ] Implement and prove the composed authority.

## Current topology

```txt
cozy-save-domain-kit
  owns:
    capture
    checksum validation
    v1 -> v2 migration
    participant restore
    rollback attempt
    reset
    diagnostics

main-adventure browser adapter
  owns:
    localStorage key
    JSON parse/stringify
    five-second autosave cadence
    pagehide save
    adapter exceptions

render snapshot + HUD
  reads:
    SaveState.status
  maps:
    captured -> Saved
```

## Missing parent domain

```txt
cozy-island-durable-save-commit-authority-domain
```

The parent composes portable save semantics with host persistence without allowing either side to publish durable success alone.

## Required DSK composition

```txt
portable-save-capture-domain
  -> SaveCandidateEnvelope

browser-save-storage-adapter-domain
  -> StorageWriteResult
  -> StorageReadbackResult

save-commit-authority-domain
  -> DurableSaveReceipt
  -> predecessor-slot preservation
  -> stale-generation rejection

save-restore-authority-domain
  -> RestoreCandidate
  -> participant barrier
  -> RestoreResult
  -> truthful RollbackResult

save-presentation-domain
  -> save-status descriptor from durable receipts only
  -> first-visible-save-frame acknowledgement
```

## Candidate kits

```txt
save-command-id-kit
save-session-id-kit
save-commit-generation-kit
save-slot-id-kit
save-candidate-envelope-kit
save-capture-result-kit
save-storage-adapter-kit
save-storage-write-result-kit
save-storage-readback-kit
save-storage-error-classifier-kit
durable-save-receipt-kit
save-predecessor-slot-kit
save-restore-command-kit
save-restore-generation-kit
save-participant-registry-kit
save-restore-candidate-kit
save-restore-validation-kit
save-rollback-plan-kit
save-rollback-result-kit
save-stale-result-rejection-kit
save-observation-kit
save-journal-kit
save-visible-frame-ack-kit
```

## Invariants

```txt
Captured != Persisted
Persisted requires successful write and validated readback
HUD Saved requires DurableSaveReceipt
failed candidate never replaces last-known-good slot
restore success requires every participant and post-restore fingerprint
rolledBack=true requires every predecessor participant to be restored
late write or restore results cannot commit across a newer generation
pagehide result is explicit and never inferred from capture state
```

## Domain ownership rule

Browser storage APIs remain in the host adapter. The save DSK remains portable. The composed authority owns the command/result protocol, generation, predecessor preservation and presentation receipt that connect them.