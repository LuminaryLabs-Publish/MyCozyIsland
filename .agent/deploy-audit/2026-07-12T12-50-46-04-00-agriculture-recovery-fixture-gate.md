# Deploy Audit: Agriculture Recovery Fixture Gate

Timestamp: `2026-07-12T12-50-46-04-00`

## Existing proof

`npm test` runs `tests/adventure-domains-smoke.mjs`. The smoke confirms:

- `n:production:agriculture` is installed.
- `n:cozy-farming` is not installed.
- annual crop prepare, plant, water, growth and harvest work.
- cultivated coconut palms regrow.
- wild coconuts remain Foraging resources.
- save-v2 round-trips.
- a synthetic save-v1 payload migrates.

## Missing release fixtures

```txt
failure after Inventory child commit
failure after Agriculture state commit
failure after Agriculture event enqueue
failure before product parent record
recovery with missing Inventory child record
recovery with conflicting resource delta
recovery with stale plot revision
rollback event-queue parity
rollback ECS-journal parity
authentic old save-v1 fixture
legacy cozy-farming ledger migration
post-migration retry exactly-once proof
save during indeterminate transaction
WebGPU/WebGL2 first-frame transaction parity
Pages smoke with restored Agriculture save
```

## Required gate

A deployment is not Agriculture-recovery complete until the test matrix proves:

```txt
committed action
  -> one Inventory delta
  -> one Agriculture mutation
  -> one child record per required ledger
  -> one product parent result
  -> one post-commit event
  -> one visible-frame acknowledgement

rolled-back action
  -> exact predecessor or declared rollback generation
  -> no committed gameplay event
  -> no duplicate reward on retry
  -> no save/frame success projection

legacy restore
  -> state migration and transaction-history classification
  -> no duplicate seed debit or harvest reward after retry
```

## Validation in this documentation run

No command was executed from a local checkout. No browser or Pages smoke was run. Existing source and test files were reviewed through the GitHub connector only.