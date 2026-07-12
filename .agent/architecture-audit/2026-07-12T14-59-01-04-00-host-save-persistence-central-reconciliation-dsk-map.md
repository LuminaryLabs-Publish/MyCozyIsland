# Architecture Audit: Host Save Persistence Central Reconciliation DSK Map

Timestamp: `2026-07-12T14-59-01-04-00`

## Summary

The engine save domain owns portable gameplay snapshots. The browser host must separately own physical durability, storage conflicts, lifecycle flushes and durable-status projection. These responsibilities should compose without moving Agriculture or gameplay ownership into localStorage.

## Plan ledger

**Goal:** preserve the product/domain boundary and define the missing host persistence authority as a composable DSK.

- [x] Preserve official Agriculture ownership.
- [x] Preserve Inventory and Foraging ownership.
- [x] Preserve `cozy-save-domain-kit` as the portable snapshot authority.
- [x] Separate engine capture from browser durability.
- [x] Define host storage identity, admission, commit and recovery services.
- [x] Define render and first-frame acknowledgement boundaries.
- [ ] Implement and prove the composed authority.

## Existing composition

```txt
NexusEngine composition
  -> object / transaction / world / input / time
  -> Inventory
  -> official Agriculture
  -> wild-resource Foraging
  -> player / interaction / camera
  -> cozy-save-domain-kit
       portable schema
       checksum
       migration
       capture
       restore
       reset
  -> renderer-neutral snapshots

browser host
  -> localStorage read/write
  -> autosave scheduling
  -> pagehide callback
  -> HUD save status
```

## Missing parent domain

```txt
cozy-island-host-save-persistence-authority-domain
```

## Candidate kits

```txt
save-command-id-kit
storage-generation-kit
dirty-state-revision-kit
canonical-save-key-kit
save-key-migration-kit
storage-record-schema-kit
storage-record-fingerprint-kit
storage-predecessor-admission-kit
browser-tab-identity-kit
writer-lease-kit
staged-save-record-kit
storage-write-result-kit
storage-readback-verification-kit
active-save-pointer-kit
save-backup-retention-kit
corrupt-record-quarantine-kit
restore-candidate-kit
restore-commit-result-kit
restore-rollback-truth-kit
reset-durability-kit
page-lifecycle-save-kit
bfcache-rearm-kit
durable-save-status-kit
storage-conflict-result-kit
save-observation-journal-kit
first-restored-frame-ack-kit
browser-persistence-fixture-kit
multi-tab-conflict-fixture-kit
bfcache-lifecycle-fixture-kit
pages-persistence-smoke-kit
```

## Required transaction

```txt
meaningful gameplay revision
  -> derive dirty-state revision and portable save candidate
  -> admit current storage generation and predecessor checksum
  -> acquire or validate writer lease
  -> write staged record
  -> read back and verify schema, checksum and bytes
  -> atomically advance active pointer
  -> retain bounded predecessor backup
  -> publish durable commit result
  -> project truthful HUD status
  -> acknowledge first frame carrying the commit or restored generation

restore
  -> read active pointer and candidate record
  -> quarantine invalid active records
  -> fall back to valid backup when policy permits
  -> construct detached engine restore candidate
  -> commit participants or report truthful rollback failure
  -> acknowledge first restored frame
```

## Ownership constraints

```txt
Agriculture owns cultivated state
Inventory owns balances and settlement
Foraging owns wild resources
cozy-save-domain-kit owns portable snapshot semantics
browser persistence authority owns physical storage durability
renderer owns projection only
```

## Central reconciliation status

The `2026-07-12T14-51-49-04-00` source-backed audit remains the technical authority. This file records its DSK boundary for synchronization into `LuminaryLabs-Dev/LuminaryLabs`.