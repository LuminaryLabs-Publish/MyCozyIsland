# Current audit: MyCozyIsland host-clock fixed-step simulation

**Timestamp:** `2026-07-15T05-00-28-04-00`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `a8733b506ecbd43190a280942790cdaa0bd1b983`

## Summary

MyCozyIsland was selected as the oldest synchronized eligible repository after all higher-priority classes were cleared. The browser RAF host converts each callback gap into one simulation delta capped at `0.05`; the composition runtime caps the value to `0.05` again before `engine.tick()`.

Scenario time, intro progress, player movement, stamina, Agriculture growth, Foraging respawn and the autosave accumulator consume admitted simulation time. Below 20 FPS, excess wall time is discarded rather than accumulated, so the adventure enters implicit slow motion without an explicit host-clock result.

## Plan ledger

**Goal:** make elapsed-time admission, deterministic fixed steps, overload handling, time-consumer binding and visible-frame proof one coherent authority.

- [x] Compare 11 Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Confirm all eligible heads match documented heads.
- [x] Select only MyCozyIsland.
- [x] Identify the complete clock interaction loop and all time consumers.
- [x] Preserve all kits, adapters and offered services.
- [x] Define 20 host-clock authority surfaces.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledgers: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/MyCozyIsland
prior central timestamp: 2026-07-15T01-04-57-04-00
next oldest: IntoTheMeadow at 2026-07-15T01-39-38-04-00
```

## Source-backed finding

`src/main-adventure.js` computes:

```txt
frameMs = min(100, max(0, now - last))
dt = min(0.05, frameMs / 1000)
```

It executes one adventure tick and adds that same `dt` to the autosave accumulator.

`src/adventure/composition-runtime.js` clamps `deltaSeconds` to `0.05` again before calling `engine.tick()`.

`src/adventure/runtime-domains.js` uses `world.__nexusClock.delta` for the scenario clock, intro, movement, distance and stamina. `src/adventure/resource-domains.js` uses it for wild-resource respawn. Agriculture growth is installed into the same engine simulation schedule.

At 10 FPS, 100 ms wall intervals become 50 ms engine intervals. Ten callbacks advance about 0.5 simulation seconds during one wall second.

## Interaction loop

```txt
RAF timestamp
  -> local frame-gap clamp
  -> local simulation-delta clamp
  -> composition delta clamp
  -> NexusEngine tick
  -> input, scenario, player, Agriculture, Foraging
  -> interaction, camera and render snapshot
  -> physical render passes
  -> autosave accumulator
```

## Domains and census

```txt
browser RAF and lifecycle
host-clock admission and fixed-step policy
Core Startup, Object and Transaction Ledger
world, input, Inventory, Agriculture and Foraging
player, scenario, interaction, camera and save
render snapshots, atmosphere, ocean and post processing
menu, preload, HUD, diagnostics, validation and Pages

engine-installed kits: 14
cataloged kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
planned host-clock surfaces: 20
```

The complete kit-by-kit service inventory is preserved in the timestamped tracker and `.agent/kit-registry.json`.

## Required authority

```txt
cozy-island-host-clock-fixed-step-simulation-authority-domain
```

```txt
HostClockFrameCommand
  -> bind document, runtime, RAF and clock generations
  -> admit a monotonic timestamp interval
  -> classify active, suspended, resumed and overload states
  -> accumulate elapsed time
  -> execute bounded deterministic fixed steps
  -> retain residual time or publish a discarded-time receipt
  -> publish HostClockFrameResult
  -> bind scenario, player, Agriculture, Foraging and save consumers
  -> render the accepted simulation revision
  -> publish FirstClockAlignedFrameAck
```

## Existing proof boundary

Node smokes call `adventure.tick(dt)` directly and prove deterministic domain outcomes for caller-selected deltas. They do not launch RAF, throttle callback frequency, test long gaps, validate catch-up policy, inspect clock receipts or prove a matching rendered frame.

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, simulation behavior, gameplay, rendering, tests, dependencies, workflows and deployment behavior were not changed.