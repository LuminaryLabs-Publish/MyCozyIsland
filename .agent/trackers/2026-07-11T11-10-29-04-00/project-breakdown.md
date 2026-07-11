# Project Breakdown: MyCozyIsland Core World Reset / Re-prepare Authority

Timestamp: `2026-07-11T11-10-29-04-00`

## Summary

`MyCozyIsland` was selected under the oldest eligible documented-repository rule. The audit found that the product reset API clears the pinned Core World runtime definitions, but the next prepare does not register them again.

## Plan ledger

**Goal:** map the complete project, identify the reset/recovery ownership gap, and define a fixture-backed DSK boundary without changing runtime behavior.

- [x] Compare the 10 accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible ledger entries and root `.agent` states.
- [x] Select only `MyCozyIsland`.
- [x] Read product and pinned Core World reset paths.
- [x] Identify interaction loop, domains, services, and kits.
- [x] Document render, gameplay, interaction, recovery, and deploy consequences.
- [x] Push documentation only to `main`.

## Interaction loop

```txt
construct wrapper
  -> register world once
  -> prepare 49 cells
  -> run focus/materialization/render loop
  -> resetWorlds clears cells, providers, state, and definitions
  -> wrapper marks itself unprepared
  -> later prepare attempts setFocus on an unregistered world
```

## Domains in use

```txt
browser route and host
Core World coordination
product world wrapper
uniform-grid partition and flat surface
terrain foundation
biome and shoreline classification
vegetation, rock, and prop population
cell presentation
lazy materialization
world query and compatibility bridge
camera/scenario/environment
ocean/foam/cloud/fog rendering
adaptive performance and diagnostics
validation and Pages deployment
```

## Services and kits

The repository contains 50 local kits, six imported NexusEngine construction services, seven ordered world providers, and runtime adapters for world coordination, queries, compatibility rendering, cell caching, disposal, input, animation, loader/error projection, and diagnostics. The complete inventory is in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Main finding

The public wrapper shape implies `reset()` is reusable, but the implementation performs a definition-clearing teardown. Reset, recreate, and terminal dispose must become distinct commands with world generation, provider/materializer release results, re-registration, prepare verification, stale-work rejection, and rollback.

## Required output

```txt
START_HERE.md
current-audit.md
next-steps.md
known-gaps.md
validation.md
kit-registry.json
turn-ledger timestamp
architecture audit
render audit
gameplay audit
interaction audit
recovery audit
deploy audit
central ledger and change log
```
