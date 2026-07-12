# Architecture Audit: Agriculture Cutover Central Reconciliation DSK Map

Timestamp: `2026-07-12T12-58-08-04-00`

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

`n:production` is a catalog family. Agriculture is the executable reusable DSK. MyCozyIsland owns tropical configuration and cross-domain product coordination.

## Correct ownership split

```txt
Agriculture
  land, soil, cultivation, water, growth, harvest, perennials

Inventory
  balances, seed stock, tools, food and batch settlement

Foraging
  wild coconut nodes, collection and respawn

MyCozyIsland product authority
  command identity
  target selection
  tropical content
  cross-domain transaction coordination
  save migration
  HUD and renderer-neutral projection

Renderer
  Three.js/WebGPU/WebGL2 implementation only
```

## Current topology

```txt
cozy-interaction
  -> cozy-agriculture-actions parent ledger
  -> cozy-inventory child ledger
  -> agriculture child ledger
  -> Inventory state
  -> Agriculture state
  -> Agriculture event queue
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

## Required invariants

1. A parent success record cannot exist without matching Inventory and Agriculture child records and participant deltas.
2. An Agriculture child record cannot independently authorize parent recovery.
3. Candidate events and journal rows cannot become committed before the aggregate commit barrier succeeds.
4. Rollback must restore an exact predecessor observation or publish a distinct recovery generation.
5. Legacy `cozy-farming` history must be migrated, quarantined or explicitly retired.
6. Save, HUD and render snapshots must cite one committed transaction or recovery revision.
7. The first visible crop/HUD frame must acknowledge the same committed revision.
8. Compatibility aliases must adapt the previous contract or have a declared removal window.

## Required transaction

```txt
accepted action
  -> resolve session, command, transaction and target identity
  -> freeze participant and ledger predecessors
  -> build immutable Agriculture plan and resource delta
  -> prepare Inventory and Agriculture candidates
  -> reserve parent and child records
  -> validate cross-owner invariants
  -> atomically commit state and records
  -> publish Agriculture events after commit
  -> publish transaction/recovery result and revision
  -> admit save and render projection
  -> acknowledge first visible frame

failure or incomplete history
  -> classify rejected, rolled-back, reconciled, quarantined or indeterminate
  -> suppress candidate effects
  -> restore exact predecessor or publish a new recovery generation
  -> prove child records and deltas before parent recovery
  -> migrate or quarantine legacy history
  -> publish reconciliation receipt before retry
```

## Reconciliation result

The latest repo-local DSK map is source-backed and remains the architecture authority. This timestamped entry records its central synchronization boundary without moving reusable Agriculture rules into product code.