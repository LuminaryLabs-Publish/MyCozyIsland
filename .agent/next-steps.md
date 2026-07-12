# Next Steps: MyCozyIsland Multi-Domain Transaction Authority

Last updated: `2026-07-12T10-20-02-04-00`

## Goal

Implement one session-scoped action transaction authority that stages farm/forage participants, commits product state and ledger records atomically, rolls back completely, and correlates save/render output with the committed revision.

## Ordered implementation checklist

- [ ] Add `cozy-island-multi-domain-transaction-commit-authority-domain`.
- [ ] Define session, generation, command and transaction identity.
- [ ] Replace input-frame-only operation identity with session/generation/sequence identity.
- [ ] Add immutable `AdventureActionCommand` and typed admission results.
- [ ] Resolve and freeze the participant set before mutation.
- [ ] Capture inventory, plot/node and ledger predecessor revisions.
- [ ] Split farming and foraging APIs into pure planning and explicit commit operations.
- [ ] Add inventory, farm and forage candidate-state builders.
- [ ] Validate balances, target state, yields and cross-participant invariants before commit.
- [ ] Add one transaction commit barrier for participant state and parent/child ledger records.
- [ ] Add complete rollback receipts for every participant.
- [ ] Define `committed`, `rejected`, `rolled-back` and `indeterminate` terminal results.
- [ ] Block save and render admission while a revision is committing or indeterminate.
- [ ] Add transaction revision to save and render snapshots.
- [ ] Reconcile incomplete parent/child transaction families during restore.
- [ ] Add first-visible-frame acknowledgement for committed and rolled-back transactions.
- [ ] Keep game-specific validation in inventory/farming/foraging domains.
- [ ] Keep portable idempotency in `core-transaction-ledger-kit`.
- [ ] Wire `tests/adventure-domains-smoke.mjs` and `tests/core-transaction-ledger-smoke.mjs` into `npm test`.
- [ ] Add failure injection after each nested participant operation.
- [ ] Add save-during-split, restore-reconciliation and retry fixtures.
- [ ] Add WebGPU/WebGL2 transaction-to-frame parity smoke.
- [ ] Pin NexusEngine browser imports to one reviewed commit.
- [ ] Continue the previously documented persistence authority after transaction commit truth exists.

## Acceptance criteria

```txt
plant failure after seed debit
  -> seed balance restored
  -> plot unchanged
  -> no parent or child terminal record remains
  -> no save or frame exposes the candidate

harvest failure after reward
  -> reward restored
  -> plot remains predecessor
  -> retry produces exactly one reward

forage failure after coconut reward
  -> inventory and node both rollback
  -> node cannot remain harvestable with committed reward

successful action
  -> all participant and ledger receipts share one transaction revision
  -> save snapshot cites that revision
  -> first visible frame cites that revision

restore
  -> incomplete parent/child transaction family is rejected or deterministically reconciled

indeterminate commit
  -> input retry, save and rendering are blocked until reconciliation completes
```