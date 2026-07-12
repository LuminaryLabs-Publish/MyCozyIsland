# Architecture Audit: Agriculture Cutover Recovery DSK Map

Timestamp: `2026-07-12T12-50-46-04-00`

## Current composition

```txt
NexusEngine
├─ n:core-object
├─ n:core-transaction-ledger
├─ n:cozy-world
├─ n:cozy-input
├─ n:cozy-inventory
├─ n:production:agriculture
├─ n:cozy-foraging
├─ n:cozy-player
├─ n:cozy-scenario
├─ n:cozy-interaction
├─ n:cozy-camera
├─ n:cozy-save
└─ n:cozy-render-snapshot
```

`n:production` is a catalog family. No executable parent production kit is required. Agriculture owns reusable land, soil, cultivation, watering, growth, harvest and perennial semantics. MyCozyIsland owns tropical content, Inventory settlement, wild resources, interaction sequencing, save migration and presentation.

## Current transaction topology

```txt
cozy-interaction
  -> product parent ledger: cozy-agriculture-actions
  -> inventory child ledger: cozy-inventory
  -> agriculture child ledger: agriculture
  -> Agriculture state and event queue
  -> product parent record
```

## Missing parent authority

```txt
cozy-island-agriculture-cutover-recovery-authority-domain
```

### Candidate kits

```txt
agriculture-action-command-kit
agriculture-transaction-id-kit
agriculture-transaction-generation-kit
agriculture-participant-set-kit
agriculture-predecessor-revision-kit
agriculture-resource-delta-kit
agriculture-candidate-plan-kit
inventory-candidate-settlement-kit
agriculture-candidate-state-kit
transaction-ledger-record-reservation-kit
agriculture-commit-barrier-kit
post-commit-agriculture-event-kit
transaction-event-suppression-kit
transaction-journal-segment-kit
agriculture-recovery-admission-kit
child-record-parity-kit
resource-delta-reconciliation-kit
legacy-farming-ledger-migration-kit
legacy-transaction-quarantine-kit
agriculture-rollback-result-kit
agriculture-reconciliation-result-kit
agriculture-transaction-observation-kit
agriculture-transaction-journal-kit
agriculture-save-revision-kit
agriculture-render-revision-kit
first-agriculture-frame-ack-kit
failure-after-inventory-fixture-kit
failure-after-agriculture-fixture-kit
event-rollback-fixture-kit
legacy-ledger-migration-fixture-kit
```

## Invariants

1. A parent result cannot exist unless all required child records and participant deltas exist and match.
2. A child record cannot authorize parent recovery without Inventory and Agriculture parity proof.
3. Agriculture events publish only after state and ledger commit succeeds.
4. Rolled-back candidates publish no gameplay event and no committed journal row.
5. Save and render snapshots cite one committed transaction revision.
6. Legacy `cozy-farming` history is migrated, quarantined or explicitly retired, never silently ignored.
7. The `cozyFarming` compatibility surface must either adapt the old contract or be removed after a declared compatibility window.

## Required flow

```txt
command admission
  -> freeze target, crop, inventory and ledger predecessors
  -> build Agriculture plan and resource delta
  -> prepare Inventory and Agriculture candidates
  -> reserve parent and child records
  -> validate cross-owner invariants
  -> commit state and records atomically
  -> publish events
  -> publish result and transaction revision
  -> save/render admission
  -> first-frame acknowledgement
```

This domain coordinates product transaction truth. It does not absorb reusable Agriculture rules, Inventory balances, world generation or renderer implementation.