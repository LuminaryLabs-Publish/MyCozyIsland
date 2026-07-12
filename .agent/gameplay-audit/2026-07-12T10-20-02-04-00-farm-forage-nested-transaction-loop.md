# Gameplay Audit: Farm and Forage Nested Transaction Loop

Timestamp: `2026-07-12T10-20-02-04-00`

## Farm loop

```txt
E near plot
  -> interaction operation ID
  -> cozy-farming applyOnce
  -> till directly, or
  -> remove seed through cozy-inventory applyOnce then plant, or
  -> water directly, or
  -> add harvest rewards through cozy-inventory applyOnce then reset plot
  -> parent operation record
```

## Forage loop

```txt
E near coconut node
  -> interaction operation ID
  -> cozy-foraging applyOnce
  -> add coconuts through cozy-inventory applyOnce
  -> optionally add sprout through another child operation
  -> deplete node and begin respawn
  -> parent operation record
```

## Gameplay risk

The player-facing action is one semantic command, but the implementation commits several independently visible mutations. The parent ledger does not stage or rollback child operations.

Failure windows include:

```txt
seed removed but crop not planted
reward granted but crop remains harvestable
coconuts granted but forage node remains available
child operation recorded but parent operation absent
parent retry or reload has no authoritative repair result
```

The current save and render paths can observe the split graph. Reload continuity is particularly unsafe because the save persists ledger and gameplay owners independently and the interaction operation identity is not session/generation scoped.

## Required gameplay invariant

```txt
For one accepted interaction command:
  inventory delta
  plot or forage-node delta
  parent ledger record
  child ledger records
  interaction result
  save revision
  visible frame revision
must commit together or not commit at all.
```

## Required outcomes

- `committed`: every participant and ledger record shares one transaction revision.
- `rejected`: no participant mutation occurred.
- `rolled-back`: every participant matches its predecessor and rollback receipts are complete.
- `indeterminate`: authority blocks retry, save and rendering until reconciliation succeeds.

## Missing gameplay proof

The happy-path adventure smoke proves normal progression only. No fixture injects a failure between inventory and plot/node mutation, no fixture reloads a partially committed graph, and no fixture proves exactly-once reward delivery across rollback and retry.