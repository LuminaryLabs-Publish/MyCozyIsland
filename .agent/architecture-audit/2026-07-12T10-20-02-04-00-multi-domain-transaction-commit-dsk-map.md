# Architecture Audit: Multi-Domain Transaction Commit DSK Map

Timestamp: `2026-07-12T10-20-02-04-00`

## Current ownership

```txt
cozy-interaction-domain
  -> derives one operation ID
  -> calls farming or foraging

cozy-farming-domain
  -> owns plot lifecycle
  -> opens parent cozy-farming ledger operation
  -> calls cozy-inventory child operations
  -> mutates plot state

cozy-foraging-domain
  -> owns forage-node lifecycle
  -> opens parent cozy-foraging ledger operation
  -> calls cozy-inventory child operations
  -> mutates node state

cozy-inventory-domain
  -> owns item balances
  -> records child operations in cozy-inventory ledger

core-transaction-ledger
  -> repeat detection and result caching
  -> operation callback executes before record commit

cozy-save-domain / render snapshot
  -> read the resulting live owners
  -> have no transaction revision or split-state rejection
```

## Missing composed parent domain

```txt
cozy-island-multi-domain-transaction-commit-authority-domain
```

## Candidate kits

```txt
adventure-transaction-id-kit
adventure-transaction-generation-kit
adventure-action-command-kit
adventure-action-admission-kit
transaction-participant-set-kit
transaction-predecessor-revision-kit
transaction-precondition-result-kit
transaction-mutation-plan-kit
inventory-mutation-candidate-kit
farm-mutation-candidate-kit
forage-mutation-candidate-kit
transaction-candidate-invariant-kit
transaction-commit-barrier-kit
transaction-ledger-record-plan-kit
atomic-participant-commit-kit
transaction-rollback-plan-kit
transaction-rollback-result-kit
adventure-transaction-commit-result-kit
transaction-retry-policy-kit
transaction-observation-kit
transaction-journal-kit
transaction-render-revision-kit
transaction-save-revision-kit
first-transaction-frame-ack-kit
nested-operation-failure-fixture-kit
participant-rollback-fixture-kit
save-during-transaction-fixture-kit
transaction-visible-frame-fixture-kit
```

## Authority rule

```txt
No inventory, plot, forage-node, ledger, save or visible-frame owner may expose a new adventure action unless every required participant has committed the same transaction revision.
```

## Transaction model

```txt
command
  -> identity and generation admission
  -> target and participant resolution
  -> predecessor snapshot/revision capture
  -> immutable mutation plan
  -> candidate participant mutations
  -> invariant validation
  -> one commit barrier
  -> participant state commit
  -> parent and child ledger record commit
  -> typed result
  -> save/render projection
  -> first visible frame acknowledgement

failure before commit
  -> discard candidates

failure during commit
  -> restore all predecessors
  -> publish rollback receipts
  -> reject save/render projection from the failed revision
```

## Domain boundaries

The parent domain coordinates but does not absorb product rules:

```txt
inventory domain retains item validation and balance rules
farming domain retains plot state-machine and yield rules
foraging domain retains capacity and respawn rules
interaction domain retains target selection and prompts
core transaction ledger retains portable operation history
save domain retains durable serialization
render snapshot retains renderer-neutral projection
```

## Required engine integration

The existing `core-transaction-ledger-kit` remains useful for idempotency. The product needs a coordinating transaction authority above it because the core kit explicitly does not own game-specific balances or crop rules and currently records only after the operation callback returns.

## Implementation order

1. Add stable session/generation/action identity.
2. Separate action planning from live state mutation.
3. Define participant candidate snapshots and invariant checks.
4. Add one atomic commit/rollback boundary.
5. Commit ledger records as part of the same boundary.
6. Tag render and save projections with the committed transaction revision.
7. Add deterministic failure injection and rollback fixtures.
8. Add first-visible-frame acknowledgement.