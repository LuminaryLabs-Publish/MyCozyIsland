# Device-control audit: touch action, layout and gesture contract

**Timestamp:** `2026-07-15T01-04-57-04-00`  
**Status:** `device-control-surface-action-coverage-authority-audited`

## Summary

The existing canvas owns every touch pointer and interprets movement as camera look. A production touch layout needs distinct movement, look and action regions, semantic controls, safe-area placement and generation-bound gesture ownership.

## Plan ledger

**Goal:** define a touch surface that is complete, accessible and unable to bypass normalized input authority.

- [x] Identify required gameplay actions.
- [x] Identify current canvas and HUD pointer policies.
- [x] Define control-region and gesture ownership.
- [x] Define semantic and visible-frame requirements.
- [ ] Implement and execute the contract.

## Required action coverage

```txt
move: two-axis held input
look: two-axis relative input
sprint: held action
interact: edge action
cycle seed: edge action
select seed 1-4: discrete action
skip intro: edge action
```

## Layout contract

```txt
left safe-area region: virtual movement stick
right non-control canvas region: camera look
right action cluster: interact and sprint
bottom seed row: actionable semantic seed controls
intro state: visible skip action
all controls: stable IDs, labels, focus semantics and minimum hit areas
```

## Gesture contract

```txt
one pointer -> one admitted control owner
pointer capture -> bound to ControlSurfaceGeneration
movement-stick pointer -> never forwarded as look
look pointer -> never forwarded as movement
button pointer -> one edge or held action by descriptor
cancel, blur, hidden, suspend -> clear all held actions
viewport change -> retire old regions before adopting replacements
```

## Input ownership

Controls may only enqueue normalized commands. They must not mutate player, camera, Inventory, Agriculture, Foraging or interaction state directly.

## Evidence

```txt
DeviceControlAdmissionResult
ControlRegionReceipt[]
ActionCoverageReceipt[]
GestureOwnershipReceipt[]
FirstDeviceControlSurfaceFrameAck
FirstDeviceActionEffectFrameAck
```