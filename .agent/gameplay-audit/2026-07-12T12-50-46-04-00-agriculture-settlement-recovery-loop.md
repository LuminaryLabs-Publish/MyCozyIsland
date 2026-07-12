# Gameplay Audit: Agriculture Settlement and Recovery Loop

Timestamp: `2026-07-12T12-50-46-04-00`

## Loop

```txt
player enters first-person mode
  -> nearest plot selected within 3.25 units
  -> E builds operation ID from target kind, target ID, target revision, input frame and selected crop
  -> Agriculture plans prepare, plant, water or harvest
  -> Inventory changes settle
  -> Agriculture plan commits
  -> product parent result records
  -> HUD and crop descriptors update
```

Wild coconut palms remain under `cozy-foraging-domain-kit`; cultivated coconut palms are perennial Agriculture crops.

## Source-backed strengths

- Official Agriculture DSK owns plot, soil, growth, harvest and perennial meaning.
- Plot plans carry predecessor revision and deterministic plan ID.
- Inventory batch settlement validates item definitions and balances before mutation.
- Agriculture commit rejects stale plot plans.
- Product settlement captures predecessor snapshots and attempts rollback on exceptions.
- Dependencies are pinned to immutable NexusEngine and NexusEngine-Kits commits.

## Recovery gaps

- Existing Agriculture child history can trigger parent recovery without paired Inventory child validation.
- Recovery does not compare current Inventory balances with the plan resource delta.
- Snapshot rollback does not retract Agriculture events or ECS journal rows.
- Inventory and ledger load operations change observation sequence during rollback.
- Legacy farming transaction history remains in old ledger names after save migration.
- Operation identity still includes input frame index rather than a durable session and command sequence.
- The hidden `cozyFarming` alias changes semantics without an adapter result.

## Required outcome classes

```txt
committed
rejected
rolled-back
reconciled
quarantined-legacy
indeterminate
```

Every successful prepare, plant, water or harvest must produce one result that names the plot predecessor, Inventory delta, Agriculture plan, child records, parent record, committed transaction revision and first visible frame.