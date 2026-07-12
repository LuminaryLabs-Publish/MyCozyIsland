# Save Persistence Audit: Capture, Commit, Conflict and Quarantine Contract

Timestamp: `2026-07-12T14-51-49-04-00`

## Summary

The current system conflates in-memory snapshot capture with durable persistence. This contract defines distinct capture, stage, verify, commit, restore, conflict, quarantine and rollback outcomes.

## Plan ledger

**Goal:** make every save result truthful and recoverable without moving gameplay ownership into the browser adapter.

- [x] Define capture and durable commit as separate phases.
- [x] Define staging, readback and pointer commit.
- [x] Define conflict detection and writer leases.
- [x] Define corrupt-record quarantine and backup retention.
- [x] Define reset and rollback truth.
- [ ] Implement and validate in browser later.

## Current false assumptions

```txt
capture success == durable save success      false
setItem success == verified readable record  unproven
rollback attempted == rollback succeeded     false
one localStorage key == sufficient recovery  fragile
pagehide once == complete lifecycle coverage false with bfcache
```

## Envelope contract

```txt
schema
producerVersion
producerFingerprint
worldId
worldSeed
saveSessionId
saveCommandId
storageGeneration
dirtyRevision
predecessorChecksum
capturedAt
payload
payloadChecksum
envelopeChecksum
```

The existing portable payload can remain inside this host envelope.

## Storage layout

```txt
my-cozy-island.save.active         -> pointer metadata
my-cozy-island.save.stage.<gen>    -> uncommitted candidate
my-cozy-island.save.data.<gen>     -> committed generation
my-cozy-island.save.backup.<gen>   -> bounded predecessor
my-cozy-island.save.quarantine.*   -> invalid records with reason
```

A smaller implementation may use fewer keys, but it must still preserve a verified predecessor until the successor is readable and active.

## Commit phases

```txt
CAPTURE
  create immutable engine snapshot
  do not mark durable success

STAGE
  serialize candidate
  write candidate generation

VERIFY
  read candidate back
  parse and verify checksums/schema/fingerprints

ADMIT
  compare active predecessor and writer lease

COMMIT
  update active pointer
  retain bounded predecessor backup

PROJECT
  publish committed result
  clear matching dirty revision
  update HUD
```

## Conflict contract

A save conflict exists when:

```txt
expected active generation != actual active generation
expected predecessor checksum != actual predecessor checksum
writer lease is absent, expired or owned by another tab
command sequence is stale
```

Conflict handling must not silently overwrite. Valid policies are:

```txt
reject and surface
explicit replace after user/system policy
merge only through a domain-specific reconciler
fork to a new slot
```

## Quarantine contract

Quarantine applies when a record:

```txt
cannot parse
has an invalid checksum
uses an unsupported schema
has an incompatible producer/world fingerprint
references a missing committed generation
fails participant restore preparation
```

Quarantine must record:

```txt
quarantineId
sourceKey
observed checksum or parse error
reason
storage generation when known
timestamp
fallback generation selected
```

It must not erase the last verified backup.

## Rollback truth

Current `restore()` returns `{ rolledBack: true }` after the rollback block even when rollback throws. Required results:

```txt
restore-rejected
restore-committed
restore-rolled-back
restore-rollback-failed
restore-indeterminate
```

`restore-rollback-failed` must include affected participants and allocate a recovery generation before gameplay resumes.

## Reset durability

Reset completion requires:

```txt
engine reset result
durable baseline or tombstone commit
predecessor retirement policy
reset storage generation
first reset frame receipt
```

A memory-only reset is pending, not complete.

## Status semantics

```txt
clean      no unsaved dirty revision
saving     admitted command in progress
saved      verified committed generation exists
retrying   dirty state remains after retryable failure
conflicted predecessor or writer lease conflict
failed     non-retryable persistence failure
restoring  verified record is being applied
recovered  backup or migrated record committed
```

## Required fixtures

```txt
setItem throws quota error
setItem silently stores malformed/truncated test adapter value
readback checksum mismatch
active pointer changes between stage and commit
two tabs write from same predecessor
corrupt active with valid backup
unsupported schema quarantine
rollback participant throws
reset then crash before autosave
pagehide -> bfcache pageshow -> second pagehide
```
