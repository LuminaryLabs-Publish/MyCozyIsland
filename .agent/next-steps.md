# Next Steps: MyCozyIsland Agriculture Cutover Recovery

Last updated: `2026-07-12T12-50-46-04-00`

## Goal

Implement one product coordination authority that makes official Agriculture actions atomic and recoverable across Inventory, Agriculture, parent/child ledgers, events, save migration and visible frames.

## Ordered implementation checklist

- [ ] Add `cozy-island-agriculture-cutover-recovery-authority-domain`.
- [ ] Define session, command, transaction and recovery generation identity.
- [ ] Replace frame-index-centered operation identity with durable session and command sequence identity.
- [ ] Freeze Inventory, plot, Agriculture state and ledger predecessor revisions before planning.
- [ ] Preserve the official Agriculture plan as the reusable crop-rule source of truth.
- [ ] Build Inventory and Agriculture candidate states without publishing live events.
- [ ] Reserve parent and child ledger records before participant commit.
- [ ] Add one commit barrier across Inventory, Agriculture and all required records.
- [ ] Publish Agriculture events only after aggregate commit succeeds.
- [ ] Add event-queue and ECS-journal segmentation for rollback.
- [ ] Define exact predecessor restore versus declared rollback-generation policy.
- [ ] Add `committed`, `rejected`, `rolled-back`, `reconciled`, `quarantined-legacy` and `indeterminate` results.
- [ ] Validate Inventory child record, Agriculture child record and resource delta before parent recovery.
- [ ] Add a bounded reconciliation journal and retry policy.
- [ ] Migrate or quarantine legacy `cozy-farming` ledger records during save-v1 restore.
- [ ] Add source schema, migration policy version and target Agriculture fingerprint to migration receipts.
- [ ] Replace the direct `cozyFarming` alias with an explicit compatibility adapter or remove it after a documented window.
- [ ] Add transaction and recovery revision to save snapshots.
- [ ] Add transaction and recovery revision to frame snapshots and HUD results.
- [ ] Add first-visible-frame acknowledgement for committed and recovered actions.
- [ ] Add failure injection after Inventory commit, Agriculture state commit, event enqueue and before parent record.
- [ ] Add event-queue and ECS-journal rollback parity fixtures.
- [ ] Add recovery fixtures with missing or conflicting child records.
- [ ] Add authentic pre-cutover save-v1 and ledger fixtures.
- [ ] Add post-migration retry exactly-once fixtures.
- [ ] Add WebGPU/WebGL2 transaction-frame parity smoke.
- [ ] Add Pages smoke using restored Agriculture saves.

## Acceptance criteria

```txt
successful plant or harvest
  -> Inventory delta, Agriculture state and all records commit once
  -> event publishes after commit
  -> save and frame cite the same transaction revision

failure after Agriculture event candidate
  -> predecessor state or declared rollback generation restored
  -> candidate event and journal rows not observable as committed
  -> retry cannot duplicate debit or reward

partial-history recovery
  -> parent success only after Inventory and Agriculture child parity proof
  -> conflicting history becomes indeterminate or quarantined

legacy save-v1
  -> farming state migrates
  -> old ledger history is classified and recorded
  -> retry after restore cannot duplicate a historical action

visible frame
  -> crop mesh, HUD result and participant revisions cite one committed transaction
```

Keep Agriculture rules in the official provider. Keep Inventory balances in Inventory and wild resources in Foraging. The new authority coordinates product transaction truth only.