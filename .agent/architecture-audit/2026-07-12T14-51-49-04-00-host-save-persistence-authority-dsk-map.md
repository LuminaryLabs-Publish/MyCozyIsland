# Architecture Audit: Host Save Persistence Authority DSK Map

Timestamp: `2026-07-12T14-51-49-04-00`

## Summary

The portable engine save domain and the browser persistence adapter currently share no authoritative commit protocol. `cozy-save-domain-kit` can prove checksum-valid capture and domain restore, while `src/main-adventure.js` independently owns localStorage, autosave cadence and page lifecycle. The missing parent boundary is browser durability.

## Plan ledger

**Goal:** separate portable snapshot semantics from host durability while giving the product one typed save transaction and one truthful projection result.

- [x] Preserve `cozy-save-domain-kit` as renderer- and host-agnostic snapshot authority.
- [x] Keep browser storage effects outside engine gameplay domains.
- [x] Identify host-owned capture, write, restore, reset and lifecycle gaps.
- [x] Define candidate DSK/service composition.
- [x] Define commit, restore, reset and page-lifecycle transactions.
- [ ] Implement after explicit runtime approval.

## Current boundary

```txt
cozy-save-domain-kit
  owns payload assembly
  owns checksum validation
  owns schema migration
  owns sequential domain restore
  owns in-engine SaveState

src/main-adventure.js
  owns localStorage key
  owns JSON parse/stringify
  owns autosave cadence
  owns pagehide write
  owns lastSaveFingerprint
  owns HUD save wording

missing
  one commit identity
  one durability result
  one conflict policy
  one quarantine policy
  one lifecycle generation
```

## Required parent domain

```txt
cozy-island-host-save-persistence-authority-domain
```

### Domain ownership

```txt
portable snapshot rules         -> cozy-save-domain-kit
browser storage capabilities    -> host persistence authority
save dirty/commit truth         -> host persistence authority
multi-tab writer arbitration    -> host persistence authority
page lifecycle flush            -> host persistence authority
gameplay state                  -> existing gameplay domains
rendering                       -> existing render consumers
```

## Candidate kits

```txt
save-session-id-kit
save-command-id-kit
save-storage-generation-kit
save-dirty-revision-kit
save-envelope-v3-kit
save-source-fingerprint-kit
save-storage-capability-kit
save-key-registry-kit
save-key-migration-kit
save-writer-lease-kit
save-predecessor-checksum-kit
save-capture-candidate-kit
save-stage-write-kit
save-readback-verification-kit
save-pointer-commit-kit
save-backup-retention-kit
corrupt-save-quarantine-kit
save-conflict-result-kit
save-commit-result-kit
save-restore-admission-kit
save-rollback-result-kit
save-reset-commit-kit
save-autosave-policy-kit
page-lifecycle-save-flush-kit
bfcache-save-resume-kit
save-status-projection-kit
save-observation-journal-kit
save-frame-ack-kit
storage-quota-failure-fixture-kit
corrupt-save-quarantine-fixture-kit
multi-tab-write-conflict-fixture-kit
pagehide-bfcache-cycle-fixture-kit
reset-crash-reload-fixture-kit
restore-rollback-failure-fixture-kit
browser-storage-roundtrip-smoke-kit
pages-storage-roundtrip-smoke-kit
```

## Service map

### Identity and admission

- save session, command and storage generation identity
- expected dirty revision and predecessor checksum admission
- storage capability and quota classification
- canonical key and legacy key migration
- writer lease and tab identity

### Capture and commit

- immutable candidate capture without marking durable success
- staging-slot write
- JSON and checksum readback verification
- compare-and-swap predecessor validation
- atomic active-pointer commit
- bounded backup retention
- typed committed, rejected, conflicted and failed results

### Restore and quarantine

- canonical active-record resolution
- legacy key migration receipt
- corrupt-record quarantine
- detached restore preparation or explicit participant transaction
- truthful rollback result
- first restored-frame acknowledgement

### Lifecycle and projection

- dirty-revision tracking
- autosave policy using monotonic wall time
- visibility/pagehide flush policy
- bfcache pageshow rearm
- reset tombstone or baseline commit
- HUD status derived from durable result, not capture status
- bounded observation journal

## Required save transaction

```txt
state becomes dirty
  -> increment dirty revision
  -> SaveCommand cites expected dirty revision and predecessor checksum
  -> capture immutable candidate without mutating committed status
  -> acquire current writer lease
  -> write candidate to staging key
  -> read back and verify bytes, schema and checksum
  -> confirm predecessor still matches
  -> switch active pointer to candidate generation
  -> retain bounded predecessor backup
  -> publish SaveCommitResult(committed)
  -> clear dirty revision through committed generation
  -> project Saved with commit ID
```

Failure path:

```txt
write, quota, serialization, conflict or readback failure
  -> active predecessor remains authoritative
  -> dirty revision remains pending
  -> publish typed failure
  -> HUD must not say Saved
  -> retry policy uses the same or superseding command identity
```

## Required restore transaction

```txt
startup
  -> resolve canonical key and active pointer
  -> migrate legacy key when required
  -> parse and verify envelope
  -> quarantine invalid candidate without deleting last good backup
  -> validate producer, world and dependency fingerprints
  -> prepare restore against participant predecessors
  -> commit all participants or publish truthful rollback failure
  -> publish RestoreResult with storage generation
  -> render and acknowledge first frame from restored generation
```

## Required reset transaction

```txt
ResetCommand
  -> reset engine participants
  -> create new baseline or tombstone candidate
  -> durably commit it immediately
  -> retire predecessor save generation
  -> publish reset commit and first-frame receipt
```

## Invariants

1. `captured` never means durable.
2. A HUD `Saved` state requires a committed storage generation.
3. A failed write never clears dirty state.
4. A restore result cannot claim rollback when rollback failed.
5. Corrupt active data cannot erase the last verified backup.
6. A tab without the writer lease cannot silently overwrite a newer generation.
7. A bfcache resume gets a fresh lifecycle generation and rearmed flush policy.
8. Reset durability is immediate and independently verifiable.
9. First visible restored state cites the same storage and restore generation.

## Dependency order

```txt
cozy-save-domain-kit portable snapshot contract
  -> host storage capability and key registry
  -> writer lease and predecessor admission
  -> staged commit and readback verification
  -> restore/quarantine/reset authority
  -> lifecycle flush and status projection
  -> browser and Pages fixtures
```
