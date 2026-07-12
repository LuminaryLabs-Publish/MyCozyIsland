# Architecture Audit: Adventure Persistence Authority DSK Map

Timestamp: `2026-07-12T08:00:16-04:00`

## Parent domain

```txt
cozy-island-adventure-persistence-authority-domain
```

## Intent

Own the complete transaction from a committed durable mutation through semantic dirty detection, adapter-backed save commit, atomic restore, runtime-generation continuity and first restored-frame proof.

## Composition

```txt
save-session-id-kit
save-operation-id-kit
durable-state-schema-kit
durable-state-projection-kit
durable-state-fingerprint-kit
semantic-dirty-set-kit
save-command-kit
save-admission-kit
save-capture-plan-kit
storage-adapter-capability-kit
storage-write-result-kit
save-commit-result-kit
save-status-projection-kit
restore-command-kit
restore-candidate-graph-kit
restore-validation-kit
restore-migration-kit
restore-commit-kit
restore-rollback-kit
input-generation-continuity-kit
operation-id-continuity-kit
transaction-ledger-rebase-kit
stale-save-result-rejection-kit
first-restored-frame-ack-kit
persistence-observation-kit
persistence-journal-kit
idle-autosave-fixture-kit
storage-failure-fixture-kit
partial-restore-fixture-kit
operation-id-reload-fixture-kit
persistence-roundtrip-browser-smoke-kit
```

## Ownership boundaries

```txt
gameplay domains
  -> own canonical durable values
  -> emit committed mutation receipts

persistence authority
  -> owns dirty set, projection, fingerprint, commands, results and journal

storage adapter
  -> owns localStorage capability and physical write receipt
  -> never owns gameplay truth

restore candidate
  -> owns validation and migration before live authority transfer

render/HUD
  -> consume committed save/restore results
  -> never infer success from capture alone
```

## Save transaction

```txt
durable mutation receipt
  -> semantic dirty set
  -> durable projection
  -> canonical fingerprint
  -> SaveCommand(saveId, observedRevision)
  -> immutable capture candidate
  -> adapter write
  -> StorageWriteResult
  -> SaveCommitResult
  -> clear dirty set
  -> HUD and visible-frame acknowledgement
```

## Restore transaction

```txt
RestoreCommand
  -> read and checksum validation
  -> schema migration
  -> candidate graph construction
  -> restore world, scenario, inventory, farming, foraging, player,
     input generation and transaction ledger
  -> invariant validation
  -> atomic authority transfer
  -> predecessor retirement
  -> first restored-frame acknowledgement
```

## Required invariants

- Capture is not equivalent to durable storage.
- A failed adapter write cannot project `Saved`.
- Idle render/simulation revisions do not dirty durable state.
- Restore either commits every owner or no owner.
- Input generation and transaction ledger share one continuity policy.
- Save/reset/load results are idempotent and revision-scoped.
- Stale writes and stale restore results cannot replace newer state.
