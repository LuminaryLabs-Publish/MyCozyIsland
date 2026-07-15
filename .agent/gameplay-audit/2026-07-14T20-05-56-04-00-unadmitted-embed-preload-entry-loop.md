# Gameplay audit: unadmitted embed preload entry loop

**Timestamp:** `2026-07-14T20-05-56-04-00`  
**Status:** `embed-context-route-admission-authority-audited`

## Summary

The adventure can become fully prepared and then stop accepting simulation progress solely because its URL contains `preload=1` or it is framed. That lifecycle decision is not based on gameplay or Core Startup failure; it is an unadmitted host-context decision.

## Plan ledger

**Goal:** keep the farm-and-forage loop playable in direct and unsupported embed contexts while reserving sleeping preload for the authenticated menu shell.

- [x] Trace entry into player movement and interaction.
- [x] Separate gameplay readiness from shell ownership.
- [x] Preserve direct route behavior.
- [ ] Add explicit context outcomes and recovery controls.

## Adventure loop

```txt
walk and sprint
  -> target plot or coconut node
  -> prepare soil or collect forage
  -> select seed
  -> plant and water
  -> advance growth
  -> harvest food
  -> update objective, inventory and save
```

## Failure loop

```txt
unadmitted preload classification
  -> world, player and renderer reach playable
  -> engine tick/step replaced
  -> animation loop cleared
  -> no admitted shell sends enter
  -> movement, growth, interaction and visible updates stop
```

## Gameplay rule

Only an accepted shell-preload result may suspend the adventure. Direct-play and unsupported-embed results must either remain playable or expose a visible recoverable failure. Neither may silently enter a frozen gameplay state.