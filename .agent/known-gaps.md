# Known Gaps: MyCozyIsland Agriculture Cutover

Last updated: `2026-07-12T12-50-46-04-00`

## Critical

1. **Rollback does not retract events:** Agriculture events queued before a later failure remain outside snapshot restoration.
2. **Rollback does not retract ECS journal rows:** candidate state writes and restoration writes remain in the same world journal without transaction classification.
3. **Recovery can accept incomplete child history:** an Agriculture child record can recreate the product parent without paired Inventory record or resource-delta proof.
4. **Legacy ledgers are not migrated:** save-v1 converts farming state but carries old `cozy-farming` transaction history unchanged.
5. **No save/frame transaction barrier:** save and render snapshots expose participant revisions but no committed Agriculture transaction or recovery revision.

## High

- Inventory snapshot loading increments revision during rollback rather than restoring the exact predecessor observation.
- Core Transaction Ledger snapshot loading increments capability sequence and emits `snapshotLoaded`.
- Agriculture snapshot loading emits `SnapshotLoaded` during rollback.
- No outcome type distinguishes rejected, rolled-back, reconciled, quarantined or indeterminate history.
- No event-publication barrier exists after aggregate commit.
- No child-record and state-parity validator exists.
- Operation identity still includes input frame index rather than durable session and command sequence.
- The hidden `cozyFarming` alias preserves a name but not the removed API contract.
- Global `CozyIsland` diagnostics expose live owners outside a product transaction admission boundary.

## Medium

- Save-v1 migration test is synthetic and reuses current Agriculture plot structures.
- No authentic pre-cutover save and ledger fixture is retained.
- Render snapshots do not cite Agriculture plan ID, resource-delta fingerprint or record IDs.
- HUD lastAction does not include a recovery or first-frame receipt.
- No bounded reconciliation journal exists.
- No policy defines page termination during an indeterminate Agriculture action.
- Continuous growth advances plot revisions independently of product transactions, but snapshots expose no source classification for revision changes.
- Compatibility alias retirement and deprecation policy are undocumented.

## Proof gaps

- No failure injection after Inventory settlement.
- No failure injection after Agriculture state mutation.
- No failure injection after Agriculture event enqueue.
- No event-queue rollback fixture.
- No ECS-journal rollback fixture.
- No recovery fixture with missing Inventory child history.
- No conflicting resource-delta recovery fixture.
- No authentic legacy-ledger migration fixture.
- No post-migration retry exactly-once fixture.
- No save-during-indeterminate fixture.
- No transaction-to-first-visible-frame fixture.
- No WebGPU/WebGL2 recovery-revision parity smoke.
- No Pages restored-save smoke.