# Gameplay audit: Core Startup to playable adventure loop

**Timestamp:** `2026-07-13T10-41-40-04-00`

## Summary

Gameplay does not begin as an independent product-owned loading percentage chain anymore. The adventure reuses the Core Startup engine, restores or creates continuation state, builds the world, installs input and enters playable only after a first render call. Static module admission and visible-frame proof remain outside that loop.

## Plan ledger

**Goal:** make the transition from document load to player control one revisioned launch transaction without changing Agriculture, Foraging or movement ownership.

- [x] Trace startup state into adventure composition.
- [x] Trace save continuation selection.
- [x] Trace world/input readiness into the first animation frame.
- [x] Confirm gameplay systems remain bounded DSKs.
- [x] Identify pre-launch and visible-entry gaps.
- [ ] Add bootstrap and visible-playable fixtures.

## Current loop

```txt
module graph accepted implicitly
  -> launch Core Startup
  -> renderer ready
  -> install adventure DSKs
  -> restore or select new continuation
  -> build world and atmosphere
  -> install input adapters
  -> mark all preparations ready
  -> tick adventure once
  -> render once
  -> mark first frame presented
  -> enter playable
  -> continue simulation/input/render/save loop
```

## Domains preserved

```txt
Core Startup owns factual readiness
Save owns continuation data
World owns deterministic island descriptors
Input owns queued commands
Player owns movement/stamina/view
Inventory owns balances and selection
Agriculture owns crop lifecycle
Foraging owns wild resource nodes
Interaction owns contextual action routing
Scenario owns time/objective
Camera owns view descriptors
Render Snapshot owns renderer-neutral projection
Three/browser host owns scene and submission
```

## Gameplay-side gaps

- No accepted module-graph result is attached to the launch.
- No launch generation fences stale browser callbacks.
- `enter()` requires the Core Startup first-frame fact but not renderer-derived visible evidence.
- Global startup listeners are not retired by the current page lifecycle path.
- Save continuation is selected before world construction, but bootstrap failure has no aggregate rollback/disposal result.

## Required playable-entry result

```txt
PlayableEntryResult
  launchId
  bootstrapGeneration
  moduleGraphReceipt
  continuationReceipt
  preparationRevisions
  firstRenderSubmitReceipt
  visibleFrameAck
  inputGeneration
  terminal status
```

## Validation boundary

Documentation only. No gameplay, Agriculture, Foraging, movement, save or camera behavior changed.