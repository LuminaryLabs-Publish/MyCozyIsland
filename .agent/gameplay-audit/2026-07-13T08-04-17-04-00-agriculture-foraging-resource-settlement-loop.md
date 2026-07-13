# Gameplay audit: Agriculture and Foraging resource-settlement loop

**Timestamp:** `2026-07-13T08-04-17-04-00`

## Summary

The playable loop is coherent on successful execution, but its resource-changing actions do not share one atomic transaction. Agriculture and Foraging can publish participant state before an aggregate settlement result exists.

## Plan ledger

**Goal:** preserve the current exploration and cultivation loop while defining exact commit invariants for every resource-changing action.

- [x] Trace target selection and operation identity.
- [x] Trace prepare, plant, water, harvest and wild-forage actions.
- [x] Trace participant write and ledger order.
- [x] Define gameplay invariants and failure cases.
- [ ] Implement and run failure-injection scenarios.

## Current playable loop

```txt
walk island
  -> choose seed
  -> approach farm plot or wild coconut palm
  -> press E
  -> resolve nearest target
  -> derive operation ID
  -> execute Agriculture or Foraging path
  -> update prompt, HUD and visible world
  -> periodic save may persist changed state
```

## Agriculture action loop

```txt
prepare/plant/water/harvest intent
  -> Agriculture planInteraction
  -> validate Inventory definitions and balances
  -> snapshot Inventory, Agriculture and ledger
  -> Inventory applyChanges commits
  -> Agriculture commitPlan commits and emits event
  -> aggregate product record commits
  -> interaction stores result
```

### Gameplay risk

If the aggregate record is absent after participant commits, retry recovery trusts the Agriculture record without proving the matching Inventory effect. A planting action could therefore be classified as recovered while seed balance evidence is missing or divergent.

## Foraging action loop

```txt
wild-forage intent
  -> outer Foraging applyOnce
  -> Inventory add coconuts
  -> optional Inventory add coconut sprout
  -> deplete node and start respawn
  -> outer Foraging result record
```

### Gameplay risk

The Inventory add results are ignored. There is no shared preflight, participant receipt or rollback path proving that resource addition and node depletion committed together.

## Required gameplay invariants

```txt
prepare
  plot becomes tilled exactly once; no Inventory change

plant
  one seed removal and one crop successor commit together

water
  one plot-water transition commits exactly once; no Inventory change

harvest
  plot successor and every yield/seed-return addition commit together

wild forage
  every Inventory addition and node depletion commit together

duplicate
  returns the original terminal result and changes no participant

stale action
  rejects with zero participant mutation

failure
  publishes no event, HUD success or save-eligible generation

recovery
  requires matching fingerprints and receipts from all affected participants
```

## Required scenarios

```txt
Inventory prepare failure before Agriculture adoption
Agriculture stale-plan failure after Inventory candidate preparation
aggregate-record failure after participant preparation
Foraging coconut-add failure
Foraging sprout-add failure
retry after participant-only attempt
retry after aggregate-only evidence
save captured during attempted settlement
render requested during attempted settlement
```

## Validation boundary

Documentation only. Gameplay source and behavior are unchanged.
