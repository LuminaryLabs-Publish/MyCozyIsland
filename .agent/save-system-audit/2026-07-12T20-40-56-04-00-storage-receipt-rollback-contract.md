# Save-system audit: storage receipt and rollback contract

**Timestamp:** `2026-07-12T20-40-56-04-00`

## Summary

Portable save envelopes are checksummed and migration-aware, but durable storage and restore rollback lack authoritative receipts. This contract keeps browser storage adapter-owned while requiring exact commit, readback, predecessor and rollback evidence.

## Plan ledger

**Goal:** define the invariants for truthful durable-save and restore results.

- [x] Preserve portable save capture and migration boundaries.
- [x] Separate candidate capture from durable commit.
- [x] Define storage and rollback receipts.
- [x] Define stale-result and predecessor rules.
- [ ] Implement and prove the contract.

## Required identities

```txt
SaveCommandId
SaveSessionId
RunGeneration
SaveCommitGeneration
SaveSlotId
CandidateChecksum
PredecessorSlotRevision
RestoreGeneration
ParticipantRevisionSet
DurableSaveReceiptId
```

## Durable commit states

```txt
Idle
Capturing
CandidateReady
Writing
Verifying
Committed
Failed
Superseded
```

`Captured` is not a terminal durable state.

## DurableSaveReceipt

```txt
receiptId
commandId
sessionId
runGeneration
commitGeneration
slotId
schema
version
candidateChecksum
readbackChecksum
predecessorSlotRevision
committedSlotRevision
reason
timestampObservation
```

The receipt is valid only when write and readback checksums match the candidate and the command remains current.

## Storage failure result

```txt
commandId
commitGeneration
slotId
reason:
  quota-exceeded
  security-blocked
  storage-unavailable
  serialization-failed
  write-failed
  readback-missing
  readback-corrupt
  readback-mismatch
  stale
predecessorPreserved
retryable
```

## Restore contract

```txt
read durable envelope
  -> validate checksum and schema
  -> migrate detached candidate
  -> capture predecessor for every participant
  -> apply candidate under one restore generation
  -> validate participant revisions and durable fingerprint
  -> commit RestoreResult
```

## Rollback contract

```txt
rollback attempted: Boolean
rollback succeeded: Boolean
restored participants: ordered IDs
failed participants: ordered IDs
predecessor fingerprint expected
post-rollback fingerprint observed
```

`rolledBack: true` is forbidden unless every required participant and the post-rollback fingerprint are proven.

## Participant set

```txt
cozy-world
core-transaction-ledger
cozy-scenario
cozy-inventory
agriculture
cozy-foraging
cozy-player
cozy-interaction reset/projection
```

## Required invariants

```txt
one current writer per slot and commit generation
late results cannot overwrite a newer generation
failure preserves the last-known-good slot
success advances the durable fingerprint exactly once
visible Saved state requires a durable receipt
restore is all-participant or explicitly partial/failed
rollback truth is independently reported
migration never silently replaces the durable predecessor before validation
```

## Observability

Bounded diagnostics must report recent commands, durations, bytes, candidate/readback hashes, failure classes, predecessor preservation, rollback participant results and the visible receipt revision without storing full save payloads.