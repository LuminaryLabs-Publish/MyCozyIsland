# Interaction Audit: Save Command and Storage Admission Map

Timestamp: `2026-07-12T14-51-49-04-00`

## Summary

Save operations are plain function calls with no command identity, expected predecessor, writer authority or typed durable result. This audit defines the missing admission boundary for autosave, startup restore, reset and page lifecycle.

## Plan ledger

**Goal:** ensure every storage-affecting action is admitted against the current session, dirty revision, storage generation and writer lease before it can replace durable state.

- [x] Identify all host save entry points.
- [x] Identify missing command and predecessor fields.
- [x] Define accepted, rejected, conflicted and failed result shapes.
- [x] Define stale and duplicate handling.
- [ ] Implement through a host persistence adapter later.

## Current entry points

```txt
startup loadSave(adventure)
autosave storeSave(adventure)
pagehide storeSave(adventure)
global captureSave()
global resetAdventure()
```

They do not share:

```txt
sessionId
commandId
commandSequence
storageGeneration
expectedDirtyRevision
expectedPredecessorChecksum
writerLeaseId
source: autosave | lifecycle | manual | reset
retryOf
```

## Save command admission

```txt
SaveCommand
  sessionId
  commandId
  sequence
  source
  expectedDirtyRevision
  expectedPredecessorChecksum
  expectedStorageGeneration
  writerLeaseId
```

Admission order:

```txt
validate active session
  -> validate command identity and sequence
  -> reject duplicate or stale command
  -> validate dirty revision
  -> validate storage capability
  -> validate writer lease
  -> validate expected predecessor checksum/generation
  -> prepare immutable candidate
  -> reserve staging generation
```

## Save results

```txt
committed
  commitId
  storageGeneration
  checksum
  dirtyRevision
  predecessorChecksum

unchanged
  currentCommitId
  currentStorageGeneration

rejected
  reason: stale-session | stale-dirty-revision | duplicate | no-capability

conflicted
  expectedPredecessor
  actualPredecessor
  conflictGeneration

failed
  phase: serialize | stage-write | readback | pointer-commit | backup
  retryable
  activePredecessorPreserved
```

## Restore admission

```txt
RestoreCommand
  sessionId
  commandId
  candidateKey
  expectedSchemaRange
  expectedWorldId
  expectedProducerFingerprint
```

Admission order:

```txt
resolve canonical pointer
  -> inspect legacy key candidates
  -> parse without mutating live owners
  -> verify checksum/schema/source fingerprints
  -> quarantine invalid candidate
  -> choose verified active or backup generation
  -> prepare participant restore
  -> commit or publish truthful rollback failure
```

## Reset admission

```txt
ResetCommand
  sessionId
  commandId
  expectedStorageGeneration
  policy: baseline | tombstone | erase
```

Reset is complete only after engine state and durable state agree on the successor generation.

## Page lifecycle admission

```txt
LifecycleFlushCommand
  sessionId
  lifecycleGeneration
  reason: hidden | pagehide | freeze
  deadline
  expectedDirtyRevision
```

A bfcache `pageshow` must allocate a new lifecycle generation, restore listener ownership and reject callbacks from the predecessor generation.

## Duplicate and stale behavior

1. Duplicate SaveCommand returns the prior result and performs no write.
2. A stale predecessor becomes `conflicted`, not silent overwrite.
3. A stale tab loses its writer lease before stage write.
4. A stale lifecycle callback cannot commit after pageshow generation changes.
5. A repeated reset returns its committed baseline generation.
6. A failed write preserves both the predecessor and dirty revision.

## Required observations

```txt
save command journal
storage generation journal
writer lease journal
quarantine journal
restore/rollback journal
lifecycle flush journal
first-frame receipt journal
```
