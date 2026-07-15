# Architecture audit: device-control surface action coverage DSK map

**Timestamp:** `2026-07-15T01-04-57-04-00`  
**Status:** `device-control-surface-action-coverage-authority-audited`

## Summary

The renderer host owns browser event listeners, while `cozy-input-domain-kit` owns normalized commands and deterministic frame admission. The missing boundary is a device/control-surface authority that proves each supported device can emit the complete required gameplay action set without bypassing `cozyInput`.

## Plan ledger

**Goal:** add device-complete controls without moving gameplay truth into DOM or renderer adapters.

- [x] Map browser keyboard, pointer and wheel ownership.
- [x] Map normalized input commands and frame fields.
- [x] Map player, camera and interaction consumers.
- [x] Preserve current domain ownership.
- [x] Define the smallest parent authority.
- [ ] Implement and test it.

## Current graph

```txt
game.html control hints and passive hotbar
  -> main-adventure browser listeners
  -> cozyInput command queue
  -> deterministic input frame
  -> player, camera and interaction systems
  -> render snapshot and HUD
```

The graph has no touch action producer for movement, sprint, interaction, seed control or intro skip.

## Required parent domain

```txt
cozy-island-device-control-surface-action-coverage-authority-domain
```

## Boundaries

| Domain | Owns | Must not own |
|---|---|---|
| Device capability | supported device classes and available event capabilities | gameplay state |
| Control presentation | semantic buttons, sticks, labels and responsive placement | player mutation |
| Gesture arbitration | movement-stick, look-drag and action-pointer ownership | command meaning |
| `cozy-input` | normalization, ordering, held state and frame admission | DOM layout |
| Player | movement, grounding, sprint stamina and intro state | browser events |
| Interaction | targeting and contextual Agriculture/Foraging settlement | touch layout |
| Renderer/HUD | visible world, prompt, seed state and acknowledgement | action admission |

## Planned surfaces

```txt
device-capability-manifest-kit
viewport-control-policy-kit
action-map-descriptor-kit
touch-control-layout-kit
virtual-movement-stick-kit
touch-look-surface-kit
touch-sprint-action-kit
touch-interact-action-kit
touch-seed-cycle-action-kit
touch-seed-select-action-kit
touch-intro-skip-action-kit
semantic-control-surface-kit
pointer-gesture-arbitration-kit
control-generation-kit
device-control-admission-kit
normalized-control-command-kit
stale-control-rejection-kit
first-control-surface-frame-ack-kit
first-device-action-frame-ack-kit
device-control-browser-fixture-kit
source-build-pages-device-parity-kit
```

## Transaction

```txt
DeviceControlAdmissionCommand
  -> classify device and viewport
  -> resolve required action map
  -> prepare semantic control surfaces
  -> verify every required action has a producer
  -> bind gestures to one control generation
  -> route accepted actions through cozyInput
  -> publish DeviceControlAdmissionResult
  -> publish FirstDeviceControlSurfaceFrameAck
  -> publish FirstDeviceActionEffectFrameAck
```

## Retained architecture

All 14 installed adventure kits, 50 cataloged kits, the ocean composition kit and five browser/product adapters remain unchanged.