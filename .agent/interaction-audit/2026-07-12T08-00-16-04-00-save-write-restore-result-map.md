# Interaction Audit: Save, Write and Restore Result Map

Timestamp: `2026-07-12T08:00:16-04:00`

## Current map

```txt
host timer
  -> fingerprint()
  -> capture()
     -> status captured
  -> localStorage.setItem()
     -> host-only success/error
  -> update lastSaveFingerprint only on host success

startup
  -> localStorage.getItem()
  -> JSON.parse()
  -> restore()
     -> checksum
     -> sequential live-domain mutation
     -> restored/error status

interaction
  -> operation ID uses input frame index and target
  -> ledger applyOnce
```

## Missing typed results

```txt
SaveCommand
SaveCaptureResult
StorageWriteResult
SaveCommitResult
RestoreCommand
RestoreValidationResult
RestoreCommitResult
RestoreRollbackResult
InputGenerationResult
TransactionContinuityResult
RestoredFrameAck
```

## Required admission rules

- Save commands observe one durable revision and one runtime generation.
- Duplicate save IDs return the original terminal result.
- Storage success is required before `Saved`.
- Restore commands cannot mutate the live graph before candidate validation.
- Input and transaction identity must be migrated or rebased together.
- Stale or older slot revisions cannot replace newer durable state.
