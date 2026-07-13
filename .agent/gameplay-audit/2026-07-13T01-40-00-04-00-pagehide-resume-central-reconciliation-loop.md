# Gameplay audit: pagehide/resume reconciliation loop

**Timestamp:** `2026-07-13T01-40-00-04-00`

## Summary

Gameplay state can continue after a retained-page return while its Agriculture and Foraging presentation indexes have been destroyed. The simulation/HUD and visible world can therefore disagree without a typed failure.

## Plan ledger

**Goal:** keep simulation, interaction and visible gameplay under one lifecycle generation across suspension and resume.

- [x] Trace pagehide from save through gameplay disposal.
- [x] Trace later frame updates that depend on cleared indexes.
- [x] Identify gameplay and interaction consequences.
- [ ] Prove round-trip parity with executable fixtures.

## Reachable source-derived loop

```txt
player tills, waters, plants, harvests or forages
  -> authoritative domain state changes
  -> pagehide fires for a BFCache-eligible navigation
  -> save candidate is attempted
  -> gameplayRenderer.dispose clears presentation indexes
  -> retained page is restored
  -> no pageshow reconstruction occurs
  -> adventure ticks and HUD updates continue
  -> crop/soil/forage projection cannot resolve cleared entries
  -> interaction target marker cannot resolve plot/forage descriptors
  -> visible state may remain stale while domain truth advances
  -> once-only pagehide handler cannot process a later departure
```

## Required gameplay obligations

```txt
Suspend preserves gameplay presentation state or records an explicit rebuild requirement.
Resume validates Agriculture, Foraging and interaction participant generations.
Rebuild reconstructs maps from the authoritative static and dynamic snapshots.
No gameplay input is admitted before resume/rebuild reaches a terminal result.
The first resumed frame proves plot, forage, target and HUD parity.
```

## Validation boundary

This is a source-derived path, not a measured production incident. Runtime behavior was not changed.