# Known Gaps: MyCozyIsland Multi-Domain Transactions

Last updated: `2026-07-12T10-20-02-04-00`

## Critical

1. **Parent record follows live mutation:** `coreTransactionLedger.applyOnce()` records only after the product callback returns.
2. **Nested participant commits:** farming and foraging commit inventory child operations before parent plot/node state and parent ledger history.
3. **No atomic rollback:** an exception or interruption can leave child ledger/state committed while the parent operation is absent.
4. **Save can capture split state:** save admission has no transaction barrier or committed transaction revision.
5. **Render can display split state:** frame snapshots have no participant-parity or transaction-revision gate.
6. **Restore does not reconcile transaction families:** parent and child ledger records and product owners restore independently.

## High

- Interaction IDs still use input frame index and target ID rather than session/generation/transaction identity.
- No participant set, predecessor revision, mutation plan or candidate graph exists.
- No typed commit, rollback or indeterminate result exists.
- No retry policy distinguishes terminal product rejection from infrastructure failure.
- Failed product results can be stored as completed ledger results without outcome classification.
- Inventory, farming and foraging expose direct live mutation APIs outside a coordinating capability boundary.
- The browser import map references NexusEngine `@main` rather than a reviewed commit.
- The previously documented persistence boundary still has idle write churn, false saved status and non-atomic restore.

## Medium

- Save and render snapshots expose no transaction provenance.
- HUD interaction results expose no participant receipts or rollback state.
- Global `CozyIsland` capabilities can access live owners without transaction admission.
- No bounded transaction journal or reconciliation diagnostics exist.
- No policy defines behavior during pagehide or browser termination while a transaction is committing.
- No policy defines whether failed action IDs are retryable or consumed.
- Duplicate composition paths still create maintenance risk.

## Proof gaps

- `tests/adventure-domains-smoke.mjs` is not invoked by `npm test`.
- `tests/core-transaction-ledger-smoke.mjs` is not invoked by `npm test`.
- No failure injection after seed removal.
- No failure injection after harvest reward.
- No failure injection between coconut and sprout reward.
- No participant rollback parity fixture.
- No save-during-split fixture.
- No incomplete-transaction restore fixture.
- No same-ID and new-ID retry fixture.
- No transaction-to-visible-frame fixture.
- No WebGPU/WebGL2 transaction revision parity smoke.