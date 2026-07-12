# Gameplay Audit: Farm, Forage, Autosave and Reload Loop

Timestamp: `2026-07-12T08:00:16-04:00`

## Loop

```txt
walk to target
  -> E action
  -> apply-once transaction
  -> inventory plus farm/forage mutation
  -> render/HUD projection
  -> auto-save fingerprint check
  -> localStorage write
  -> reload and restore
```

## Gameplay continuity defects

### Idle writes

The player resource revision changes every tick, so gameplay can be motionless while persistence still treats every five-second interval as dirty.

### Cross-domain commit boundaries

Planting removes inventory seed in a nested transaction before the plot update is committed. Harvesting and foraging add inventory before plot/node mutation. The outer transaction ledger provides repeat suppression, but no cross-domain rollback receipt proves both owners committed together.

### Reload command identity

Interaction operation IDs use input frame index and target ID. Transaction history survives restore; input frame generation does not. The same identifier can be reused by a later session.

### Reset residue

Resetting the adventure does not reset input queue, held state or input frame index. The replacement gameplay state can immediately consume predecessor input.

## Required gameplay proof

```txt
one contextual action
  -> one action ID
  -> one inventory result
  -> one farm/forage result
  -> one durable mutation receipt
  -> one save dirty revision

reload
  -> no cached predecessor result can satisfy a new action

reset
  -> no predecessor input or command identity survives
```
