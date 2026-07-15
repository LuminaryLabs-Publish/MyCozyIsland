# Current audit: MyCozyIsland device-control action coverage

**Timestamp:** `2026-07-15T01-04-57-04-00`  
**Status:** `device-control-surface-action-coverage-authority-audited`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `eac42511d9c462fb2e68604288810687d12f9bbf`

## Summary

MyCozyIsland was selected as the oldest synchronized eligible repository after all higher-priority classes were cleared. The current source renders a responsive full-screen adventure and accepts pointer drag, but only keyboard commands can produce movement, sprint, interaction, seed control and intro skipping.

On viewports below `760px`, the written controls are hidden. The bottom hotbar has `pointer-events:none`, seed entries are non-actionable `div` elements, and canvas pointer handling emits only look deltas. A touch player can wait through the time-driven intro and rotate the camera, but cannot traverse the island or perform Agriculture and Foraging actions.

## Plan ledger

**Goal:** admit one complete device action map before a device class is considered playable.

- [x] Compare 11 Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Confirm all eligible heads match documented heads.
- [x] Select only MyCozyIsland.
- [x] Identify the full interaction loop and domains.
- [x] Preserve all kits, adapters and offered services.
- [x] Define 21 device-control surfaces.
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
prior central timestamp: 2026-07-14T20-05-56-04-00
```

## Source-backed finding

`game.html` defines a focusable application canvas with `touch-action:none`. Its narrow-layout media rule hides `#controls`. The seed hotbar is visually present but sits inside a `pointer-events:none` HUD and uses non-focusable `div` slots.

`main-adventure.js` maps pointer events to camera drag and maps global keyboard events to `cozyInput`. `runtime-domains.js` derives:

```txt
movement: KeyW/KeyA/KeyS/KeyD
sprint: ShiftLeft/ShiftRight
interact: KeyE
cycle seed: KeyQ
select seed: Digit1-Digit4
intro skip: Space/Enter
look: pointer deltas
```

No touch command carries movement axes or action semantics.

## Interaction loop

```txt
menu and preload
  -> game entry
  -> keyboard/pointer browser adapter
  -> cozyInput queue and deterministic input frame
  -> player, camera and interaction systems
  -> render snapshot, HUD and auto-save
```

Touch loop:

```txt
pointerdown/pointermove
  -> camera-look command only
  -> no movement or action command
  -> intro eventually ends from elapsed time
  -> first-person player remains unable to complete the game loop
```

## Domains and census

```txt
device capability and viewport policy
control-surface identity, semantics and responsive layout
gesture arbitration and pointer capture
normalized input queue and frame admission
player movement, sprint stamina and intro
camera look and first-person view
interaction, Inventory, Agriculture and Foraging
HUD, rendering and frame acknowledgements
save, validation, build, Pages and central tracking

engine-installed kits: 14
cataloged kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
planned device-control surfaces: 21
```

The complete kit-by-kit service inventory is preserved in the timestamped tracker and `.agent/kit-registry.json`.

## Required authority

```txt
cozy-island-device-control-surface-action-coverage-authority-domain
```

```txt
DeviceControlAdmissionCommand
  -> bind document, viewport, device capability,
     control generation and action-map revision
  -> resolve the required gameplay action set
  -> require move, look, sprint, interact,
     seed cycle/select and intro-skip producers
  -> prepare semantic keyboard, pointer and touch surfaces
  -> arbitrate movement, look and action gestures
  -> route every action through cozyInput
  -> reject stale, duplicate or conflicting control work
  -> publish DeviceControlAdmissionResult
  -> publish FirstDeviceControlSurfaceFrameAck
  -> publish FirstDeviceActionEffectFrameAck
```

## Existing proof boundary

The package runs Node source and domain smokes. No current fixture launches a coarse-pointer browser, exercises touch controls, validates semantic hit targets or proves a touch action reaches authoritative gameplay and the next frame.

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, input behavior, gameplay, rendering, tests, dependencies, workflow and deployment behavior were not changed.