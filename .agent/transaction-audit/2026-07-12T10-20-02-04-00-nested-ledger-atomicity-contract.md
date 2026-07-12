# Transaction Audit: Nested Ledger Atomicity Contract

Timestamp: `2026-07-12T10-20-02-04-00`

## Core ledger semantics

The installed NexusEngine ledger performs:

```txt
get existing record
  -> if present, return cached result
  -> otherwise execute operation callback
  -> record returned result
```

This provides idempotent result reuse after a successful record. It is not an atomic multi-owner transaction manager.

## Product nesting

```txt
cozy-farming parent ledger
  -> cozy-inventory child ledger(s)
  -> farming state

cozy-foraging parent ledger
  -> cozy-inventory child ledger(s)
  -> foraging state
```

The child records and participant states can commit before the parent callback returns and before the parent record exists.

## Failure classes

### Callback exception

A callback exception propagates before the parent record is written. Mutations already performed by the callback remain live.

### Process interruption

A browser/process interruption between child mutation and parent record can persist or display a partial graph.

### Save during split

The save domain has no transaction barrier and can capture child ledger/state without the corresponding parent record/state.

### Retry after split

A retry can observe cached child results while the parent operation is absent. The product has no typed reconciliation proof that all participants reached the intended final state.

### Restore of split snapshot

Restore loads ledger and product owners independently. There is no cross-participant transaction invariant that detects an incomplete parent/child transaction family.

## Required contract

```txt
TransactionState
  planned
  prepared
  committing
  committed
  rolling-back
  rolled-back
  indeterminate
```

Every participant must support:

```txt
prepare(transaction plan) -> candidate receipt
commit(transaction ID) -> participant commit receipt
rollback(transaction ID) -> participant rollback receipt
read revision and transaction provenance
```

The coordinating authority must:

```txt
freeze participant set
capture predecessors
validate candidates
commit all participants and ledger records under one barrier
publish one terminal result
block save/render on committing or indeterminate revisions
reconcile incomplete transaction families during restore
```

## Relationship to core transaction ledger

Keep `core-transaction-ledger-kit` as the portable idempotency journal. Add product coordination above it. Do not overload the core kit with farming, inventory or forage rules.

## Candidate reconciliation rules

- Parent present and all children present with matching metadata: committed.
- Parent absent and no child mutation: not started.
- Parent absent with child records or participant mutation: incomplete, require rollback or deterministic completion.
- Parent present with missing child record/participant revision: corrupt, block save/render and reconcile.
- Transaction revision mismatch across participant snapshots: reject restore candidate.

## Test requirements

- Throw immediately after seed removal.
- Throw immediately after harvest reward.
- Throw after first forage reward but before optional sprout.
- Throw after all rewards but before plot/node mutation.
- Save and restore each incomplete state.
- Retry with the same transaction ID.
- Retry with a new command ID.
- Assert exactly-once balances, plot/node state, ledger parity and visible-frame revision.