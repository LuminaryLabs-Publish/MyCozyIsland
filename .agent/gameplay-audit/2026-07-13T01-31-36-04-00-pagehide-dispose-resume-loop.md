# Gameplay audit: pagehide dispose/resume loop

**Timestamp:** `2026-07-13T01-31-36-04-00`

## Summary

The gameplay simulation and HUD can resume after a retained-page navigation while the renderer indexes used to project plots, crops, forage nodes and the interaction marker have already been cleared. The lifecycle boundary therefore allows gameplay truth and world presentation to diverge.

## Plan ledger

**Goal:** bind gameplay suspension and resume to one lifecycle generation and one complete presentation receipt.

- [x] Trace pagehide mutation.
- [x] Trace Agriculture, Foraging and interaction projection dependencies.
- [x] Define the source-derived retained-page failure loop.
- [x] Define gameplay resume admission requirements.
- [ ] Add executable crop, forage and interaction round-trip fixtures.

## Failure loop

```txt
player prepares, plants, waters or harvests a plot
  -> authoritative Agriculture state and HUD update
  -> pagehide fires
  -> save candidate is written
  -> gameplay presentation is disposed and its indexes are cleared
  -> page is retained and later restored
  -> no gameplay resume command or renderer rebuild occurs
  -> adventure.tick continues
  -> HUD can reflect current inventory/Agriculture state
  -> plot/crop meshes cannot be updated through cleared plotEntries
  -> forage visuals cannot be updated through cleared forageEntries
  -> target marker cannot resolve the current target
```

## Gameplay authority gap

The following lifecycle facts are absent from frame and gameplay snapshots:

```txt
runtime session ID
page lifecycle generation
suspended/resumed phase
presentation participant revision
gameplay renderer retain/rebuild result
first resumed frame ID
```

## Required gameplay resume transaction

```txt
ResumeGameplayCommand
  -> validate suspended runtime session and lifecycle generation
  -> clear stale held input and pending browser commands
  -> validate Agriculture, Foraging, Inventory and interaction snapshots
  -> retain or rebuild gameplay presentation indexes
  -> project the current authoritative frame
  -> resume ticking only after mandatory participants are ready
  -> publish ResumeGameplayResult
  -> acknowledge the first matching visible frame
```

## Required fixtures

```txt
BFCache round trip after planting
BFCache round trip after watering
BFCache round trip after harvest
BFCache round trip after wild coconut collection
round trip while a plot is targeted
round trip while a forage node is targeted
second pagehide after a completed round trip
```

## Do not claim

Do not claim gameplay continuity across browser navigation until simulation, HUD, world visuals and interaction projection are proven to resume from one lifecycle generation.