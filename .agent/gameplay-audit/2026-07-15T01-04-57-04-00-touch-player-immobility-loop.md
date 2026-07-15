# Gameplay audit: touch-player immobility loop

**Timestamp:** `2026-07-15T01-04-57-04-00`  
**Status:** `device-control-surface-action-coverage-authority-audited`

## Summary

The core farming loop requires traversal, targeting, interaction and seed selection. Touch input currently supplies camera-look deltas only, so the player can reach first-person mode but cannot perform the authored loop.

## Plan ledger

**Goal:** ensure every admitted device can complete the same authoritative walk, farm, forage and save loop.

- [x] Trace touch pointer events.
- [x] Trace normalized input-frame fields.
- [x] Trace player and interaction consumers.
- [x] Confirm missing touch action producers.
- [ ] Add device-complete gameplay fixtures.

## Current touch loop

```txt
load adventure
  -> intro advances automatically with elapsed time
  -> touch drag changes yaw and pitch
  -> axisX and axisZ remain zero
  -> sprint remains false
  -> interactPressed remains false
  -> cycleSeedPressed remains false
  -> selectSeedIndex remains null
  -> player cannot reach plots or forage nodes
  -> Agriculture and Foraging actions cannot be initiated
```

## Required gameplay contract

```txt
touch movement -> normalized axis command -> player revision
touch sprint -> normalized held action -> stamina revision
touch interact -> normalized edge action -> interaction result
touch seed selection -> normalized selection action -> inventory/HUD revision
touch intro skip -> normalized edge action -> player mode revision
```

All actions must use the same deterministic `cozyInput` queue and downstream domain services as keyboard input. Direct DOM mutation of player, inventory, Agriculture or Foraging state is prohibited.