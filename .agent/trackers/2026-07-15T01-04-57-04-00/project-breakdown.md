# Project breakdown: MyCozyIsland device-control action coverage

**Timestamp:** `2026-07-15T01-04-57-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `eac42511d9c462fb2e68604288810687d12f9bbf`  
**Status:** `device-control-surface-action-coverage-authority-audited`

## Summary

MyCozyIsland exposes a responsive full-screen game and pointer-look handling, but the playable action set remains keyboard-only. Narrow layouts hide the written controls, the seed hotbar is non-interactive, and touch pointers are consumed only as camera-drag deltas. A touch player can wait through the intro and look around, but cannot walk, sprint, interact, change seed, or deliberately skip the intro.

## Plan ledger

**Goal:** preserve the existing normalized input domain while admitting a complete, semantic action surface for every supported device class before gameplay is declared controllable.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm every eligible current head matches its recorded documentation head.
- [x] Select only MyCozyIsland by the oldest synchronized timestamp.
- [x] Trace game markup, responsive CSS, browser pointer/keyboard adapters and normalized input consumption.
- [x] Identify the complete interaction loop and all domains.
- [x] Preserve the complete 65-kit, one-composition-kit and five-adapter inventory.
- [x] Define the smallest device-control coordinating authority.
- [x] Change documentation only.
- [ ] Implement touch controls and executable device-parity fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest synchronized central documentation timestamp
prior central timestamp: 2026-07-14T20-05-56-04-00
```

Timestamp order at selection:

```txt
MyCozyIsland       2026-07-14T20-05-56-04-00  selected
IntoTheMeadow      2026-07-14T20-40-50-04-00
HorrorCorridor     2026-07-14T20-58-46-04-00
ZombieOrchard      2026-07-14T21-41-41-04-00
TheUnmappedHouse   2026-07-14T22-01-31-04-00
TheOpenAbove       2026-07-14T22-39-00-04-00
AetherVale         2026-07-14T23-00-09-04-00
PhantomCommand     2026-07-14T23-38-29-04-00
PrehistoricRush    2026-07-15T00-00-35-04-00
TheLongHaul        2026-07-15T00-38-54-04-00
```

## Complete interaction loop

```txt
index route
  -> postcard menu
  -> hidden game startup
  -> Core Startup prepares engine, world, save and presentation
  -> game entry reveals the adventure
  -> keyboard events enqueue move, sprint, interact, seed and intro actions
  -> pointer drag enqueues look deltas only
  -> normalized input frame drives player and interaction systems
  -> render snapshot updates WebGPU/WebGL2 world and HUD
  -> save fingerprint auto-persists changed gameplay
```

Touch path:

```txt
narrow or touch viewport
  -> written controls are hidden below 760px
  -> bottom hotbar remains pointer-events:none
  -> seed slots are non-focusable div elements
  -> pointerdown starts camera drag
  -> pointermove emits look deltas only
  -> no movement, sprint, interaction or seed command is emitted
  -> intro eventually completes from elapsed time
  -> player can look but cannot traverse or perform the farming loop
```

## Domains in use

```txt
route, menu shell and game entry
Core Startup readiness and first-frame presentation
browser keyboard, pointer, wheel, focus and visibility adapters
device capability and viewport classification
control-surface identity, semantics and layout
gesture arbitration and pointer capture
normalized input queue and frame admission
player movement, grounding, stamina and intro state
camera look, aerial intro and first-person view
interaction targeting and contextual action
Inventory, Agriculture and Foraging
scenario time and objective state
save capture, checksum, migration, restore and rollback
renderer-neutral static and frame snapshots
WebGPU/WebGL2 world, ocean, atmosphere, fog, cloud and post-processing
HUD, hotbar, prompt, diagnostics and startup presentation
validation, static delivery, Pages and central tracking
```

## Source-backed finding

`game.html` marks the canvas as the application surface, sets `touch-action:none`, hides the textual controls below `760px`, gives `#bottom-hud` `pointer-events:none`, and represents each seed slot as a `div` rather than an actionable control.

`main-adventure.js` maps wheel input, pointer drag and global keyboard events. Pointer commands contain look deltas only. The normalized input domain derives movement from `KeyW/KeyA/KeyS/KeyD`, sprint from Shift, interaction from `KeyE`, seed cycling from `KeyQ`, seed selection from digits 1–4, and intro skipping from Space or Enter. No touch-specific command or on-screen action source exists.

## Required authority

```txt
cozy-island-device-control-surface-action-coverage-authority-domain
```

```txt
DeviceControlAdmissionCommand
  -> bind document, viewport, device capability,
     control-surface generation and action-map revision
  -> resolve required gameplay actions for the admitted device class
  -> require move, look, sprint, interact,
     seed cycle/select and intro skip coverage
  -> create semantic keyboard, pointer and touch control descriptors
  -> arbitrate camera drag, virtual movement and action gestures
  -> route every accepted action through cozyInput
  -> reject stale, duplicate and superseded control generations
  -> publish DeviceControlAdmissionResult and action receipts
  -> publish FirstDeviceControlSurfaceFrameAck
  -> publish FirstDeviceActionEffectFrameAck
```

## Kit and service inventory

### Engine-installed kits

```txt
core-startup-kit: launch, preparation registration, waiting, working, ready, failure, retry/fallback descriptor, continuation selection, first-frame admission, playable entry, snapshot, load, reset
core-object-kit: registration, lookup, listing
core-transaction-ledger-kit: ledger, idempotency, record, apply-once, snapshot, reset
cozy-world-domain-kit: seeded world, surface query, plot layout, forage layout, render base, snapshot, reset
cozy-input-domain-kit: normalization, command queue, frame admission, held actions, clear, snapshot, reset
cozy-inventory-domain-kit: items, seed selection, transactions, batch settlement, snapshot, reset
agriculture-domain-kit: land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset
cozy-foraging-domain-kit: wild coconut nodes, collection, respawn, snapshot, reset
cozy-player-domain-kit: movement, grounding, view, stamina, snapshot, reset
cozy-scenario-domain-kit: time, objective, snapshot, reset
cozy-interaction-domain-kit: targeting, context action, agriculture settlement, wild forage action, prompt, result, snapshot, reset
cozy-camera-domain-kit: aerial intro, first-person view, terrain clearance, descriptor
cozy-save-domain-kit: capture, checksum validation, migration, restore, rollback, reset, diagnostics
cozy-render-snapshot-domain-kit: static world, agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor
```

### Cataloged world, render and host kits

```txt
debug-overlay-host-kit: draw, toggle, show, hide
webgl2-fallback-renderer-kit: fallback capability policy, CPU volume source, feature-disable policy
webgpu-compute-atmosphere-renderer-kit: cloud volume generation, fog volume generation, CPU fallback
webgpu-foam-renderer-kit: shoreline foam geometry, animation, render-layer contract
webgpu-ocean-renderer-kit: ocean geometry, wave deformation, optics, water-layer contract
webgpu-performance-budget-kit: frame sampling, moving average, FPS state, degrade callback, recover callback
webgpu-post-processing-renderer-kit: scene pass, fog pass, foam pass, depth mask, resolution scaling, pass-order readback
webgpu-rolling-fog-renderer-kit: fog volume, material, step scaling, readback
webgpu-stylized-material-renderer-kit: material descriptors, material construction
webgpu-volumetric-cloud-renderer-kit: cloud volumes, raymarch materials, step scaling, readback
camera-rail-sequence-kit: rail progression, camera-sequence descriptors
cozy-island-scenario-kit: scenario descriptors, sequence descriptors
terrain-surface-domain-kit: height, normal, material and surface queries
vegetation-placement-domain-kit: deterministic placement graph
aerial-perspective-domain-kit: horizon, distance and atmosphere descriptors
campfire-atmosphere-domain-kit: campfire light, smoke and heat descriptors
cloud-density-field-domain-kit: density recipe, texture budget
cloud-horizon-band-domain-kit: horizon placement descriptors
cloud-lighting-domain-kit: color, shadow, silver lining
cloud-lod-domain-kit: step policy, volume-count policy
cloud-shadow-domain-kit: shadow projection descriptors
cloud-weather-domain-kit: coverage, weather state
fog-advection-domain-kit: direction, speed
fog-field-domain-kit: density recipe, texture budget
fog-volume-placement-domain-kit: bounds, readability mask
ground-contact-domain-kit: terrain contact, clearance query
illumination-domain-kit: sun, sky, ambient and exposure state
ocean-caustics-domain-kit: caustic projection descriptors
ocean-floor-profile-domain-kit: seafloor shape, depth profile
ocean-optics-domain-kit: color, opacity, transmission, absorption, reflection
ocean-wave-domain-kit: deterministic wave components, sea level
prop-archetype-domain-kit: prop geometry and material archetypes
render-archetype-domain-kit: renderer-neutral object archetypes
render-quality-domain-kit: static tier selection, quality budgets
render-snapshot-domain-kit: renderer-neutral world snapshot
rock-archetype-domain-kit: rock placement and presentation archetypes
shoreline-field-domain-kit: shoreline classification, distance field
shoreline-foam-domain-kit: foam-band descriptors
stylized-material-descriptor-domain-kit: color, roughness, rim, outline
sun-glitter-domain-kit: water highlight descriptors
terrain-biome-field-domain-kit: deterministic biome classification
terrain-lod-domain-kit: terrain resolution and distance policy
underwater-atmosphere-domain-kit: underwater color, attenuation
vegetation-archetype-domain-kit: tree, palm, fern, bush and grass archetypes
vegetation-lod-domain-kit: density and distance policy
vegetation-wind-domain-kit: wind-deformation descriptor
weather-state-domain-kit: weather state, transitions
wind-field-domain-kit: deterministic direction, strength
deterministic-seed-domain-kit: seed derivation, deterministic random
environment-clock-domain-kit: elapsed time, environmental phase
```

### Composition kit

```txt
cozy-ocean-composition-kit: logical render-layer graph, pass-order validation, transparent-depth validation, terrain-handoff validation, per-layer depth and blend contracts
```

### Browser and product adapters

```txt
browser-startup-presentation-adapter: descriptor DOM projection, failure projection, timeout helper, render-update bridge
cozy-startup-host: preparation order, product copy, engine reuse, continuation mapping, pre-playable error capture, disposal
cozy-menu-scene-adapter: Three.js provider import, backend admission, procedural atlases, frond cards, postcard scene, TSL materials, wind compute/fallback, water, shoreline, fog, lighting, bloom, tone mapping, shadows, reduced motion, DPR/resize, animation loop, readback, retirement
cozy-menu-game-shell-adapter: iframe preload, progress projection, play gate, entry request, crossfade, history, focus transfer, fallback reveal, errors
cozy-game-preload-bridge-adapter: startup polling, embed-context classification, parent messaging, simulation/presentation sleep and resume, player-entry preparation, acknowledgement
```

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
planned device-control surfaces: 21
```

## Planned coordinating surfaces

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

## Validation boundary

This run changes documentation only. No runtime JavaScript, HTML, CSS, input behavior, gameplay, rendering, tests, dependencies, workflow or deployment behavior is changed. Existing Node smoke scripts do not create mobile browser contexts or exercise touch actions.