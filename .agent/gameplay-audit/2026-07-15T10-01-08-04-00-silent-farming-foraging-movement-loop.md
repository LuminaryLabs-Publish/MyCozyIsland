# Gameplay audit: silent farming, foraging and movement loop

**Timestamp:** `2026-07-15T10-01-08-04-00`

## Plan ledger

**Goal:** identify the semantic gameplay results available for audio without moving gameplay authority into presentation code.

- [x] Trace movement, sprint and surface state.
- [x] Trace seed-selection and contextual interaction results.
- [x] Trace Agriculture and Foraging outcomes.
- [x] Confirm the browser host projects only visuals and HUD state.
- [ ] Add result-driven cue projection and fixtures.

## Current loop

```txt
walk or sprint
  -> player state updates position, distance, stamina and surface kind
  -> camera and renderer project the accepted state
  -> no footstep or exertion event is projected

interact near plot
  -> till, plant, water or harvest settles through Agriculture/Inventory
  -> interaction.lastAction records the result
  -> HUD and crop presentation update
  -> no accepted or rejected action cue is projected

interact near forage node
  -> Foraging settles collection or rejection
  -> inventory and node state update
  -> no collection, empty-node or respawn cue is projected

environment
  -> wind, ocean, clouds and fog animate visually
  -> no ambience source or lifecycle is owned
```

## Result-to-cue candidates

```txt
movement accepted on grass/sand/soil/rock
sprint start/stop and low stamina
seed selection changed
till accepted/rejected
plant accepted/rejected
water accepted/rejected
harvest accepted/rejected
forage accepted/rejected
crop ready
forage respawned
intro completed
save accepted/failed
```

These are candidate semantic events, not instructions to trigger audio from raw input.

## Risks without an authority

```txt
success sound before transaction acceptance
duplicate sound from repeated snapshots
footsteps based on requested rather than constrained travel
ambience playing while hidden preload is frozen
loops surviving pagehide or route replacement
unbounded overlapping voices
visual state and sound describing different revisions
```

## Validation boundary

No game audio implementation or gameplay behavior changed.