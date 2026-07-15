# Interaction audit: device-control command/result map

**Timestamp:** `2026-07-15T01-04-57-04-00`  
**Status:** `device-control-surface-action-coverage-authority-audited`

## Summary

Keyboard and pointer commands enter `cozyInput`, but there is no typed admission result proving that an active device has producers for every required action. Touch gestures are admitted only as camera-look input.

## Plan ledger

**Goal:** correlate device capability, control presentation, normalized commands and visible action effects.

- [x] Map browser producers.
- [x] Map normalized commands and frame fields.
- [x] Map player, camera and interaction consumers.
- [x] Define missing command/result identities.
- [ ] Implement and execute the map.

## Current map

```txt
keydown/up -> enqueueKey -> move/sprint/interact/seed/intro fields
pointer drag -> enqueuePointer -> lookX/lookY
wheel -> enqueueWheel -> wheelPixels
blur/hidden -> clear -> held-key retirement

touch pointer drag -> enqueuePointer -> lookX/lookY only
```

## Required map

```txt
DeviceControlAdmissionCommand
  -> DeviceControlAdmissionResult

TouchMoveCommand
  -> normalized axis command receipt
  -> PlayerMovementResult

TouchSprintCommand
  -> normalized held-action receipt
  -> StaminaResult

TouchInteractCommand
  -> normalized edge-action receipt
  -> InteractionResult

TouchSeedCommand
  -> normalized selection receipt
  -> InventorySelectionResult

TouchIntroSkipCommand
  -> normalized edge-action receipt
  -> PlayerModeResult
```

## Rejection classes

```txt
unsupported device
incomplete action map
stale control generation
duplicate pointer ownership
gesture conflict
hidden or suspended surface
out-of-bounds action region
superseded viewport layout
```

Every terminal result must retain device, control generation, command ID, input-frame revision and downstream state revision.