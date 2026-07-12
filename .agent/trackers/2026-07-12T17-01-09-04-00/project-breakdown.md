# Project Breakdown: MyCozyIsland Browser Input Ownership

Timestamp: `2026-07-12T17-01-09-04-00`

## Summary

This documentation-only breakdown selects MyCozyIsland as the oldest eligible tracked Publish repository and audits the complete path from browser events through `cozy-input-domain-kit`, player, interaction, camera and the visible frame.

## Plan ledger

**Goal:** define one authoritative browser-input boundary that proves surface ownership, focus, pointer gesture, command identity, generation, consumption and first visible effect.

- [x] Compare the full ten-repository Publish inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible central ledgers and root `.agent` states.
- [x] Select only `MyCozyIsland` by oldest eligible timestamp.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Identify all 64 source-backed kit surfaces.
- [x] Record every installed-kit service.
- [x] Trace keyboard, pointer, wheel, focus and visibility input.
- [x] Trace input consumers and visible-frame projection.
- [x] Add architecture, render, gameplay, interaction, input and deploy audits.
- [x] Refresh required root `.agent` files.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Repository selection

```txt
selected: LuminaryLabs-Publish/MyCozyIsland
reason: oldest eligible central ledger entry
selected timestamp: 2026-07-12T14-59-01-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
new eligible repos: 0
ledger-missing eligible repos: 0
root-.agent-missing eligible repos: 0
```

## Complete interaction loop

```txt
page startup
  -> build canvas, HUD, loader and debug surfaces
  -> import pinned Three.js, NexusEngine and Agriculture sources
  -> create renderer and quality policy
  -> create adventure and install 13 engine kits
  -> restore save when available
  -> construct static world and gameplay renderers
  -> attach browser input listeners
  -> start animation loop

browser keyboard
  -> window keydown or keyup
  -> optional host-only H diagnostic toggle
  -> prevent default for selected gameplay keys
  -> enqueue key command without checking canvas focus

browser pointer
  -> any pointerdown creates drag and requests capture
  -> any pointermove while drag exists enqueues look delta
  -> any pointerup clears drag
  -> pointercancel clears drag
  -> no matching pointer-ID or lost-capture requirement

browser wheel
  -> canvas wheel always prevents default
  -> enqueue normalized wheel command

input frame
  -> sort queue by sequence
  -> accept every command with generation 1
  -> update held keys and one-shot actions
  -> process clear at its sequence position
  -> process later commands after clear
  -> publish InputFrame and acceptedCommandIds

consumption
  -> player applies movement, sprint, look and intro skip
  -> interaction applies seed selection and context action
  -> camera derives intro or first-person descriptor
  -> render snapshot derives HUD and camera state
  -> Three.js renders the frame
```

## Domains in use

```txt
browser shell, canvas and HUD
browser input surface and focus
keyboard event mapping
pointer gesture and capture lifecycle
wheel normalization
input command queue and frame admission
NexusEngine runtime and ECS phase ordering
core object registry
core transaction ledger
seeded island world and terrain queries
Inventory and seed selection
official Agriculture
wild Foraging
player movement, grounding, view and stamina
scenario time and objective
contextual interaction
camera intro and first-person projection
portable save and browser persistence
renderer-neutral snapshots
WebGPU/WebGL2 rendering and adaptive quality
validation, CI and Pages deployment
```

## Installed kits and offered services

| Kit | Domain path | Offered services |
|---|---|---|
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface queries, plots, forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture settlement, forage action, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture descriptors, frame, HUD, debug snapshots |

## Cataloged world/render/host kits

```txt
debug-overlay-host-kit
webgl2-fallback-renderer-kit
webgpu-compute-atmosphere-renderer-kit
webgpu-foam-renderer-kit
webgpu-ocean-renderer-kit
webgpu-performance-budget-kit
webgpu-post-processing-renderer-kit
webgpu-rolling-fog-renderer-kit
webgpu-stylized-material-renderer-kit
webgpu-volumetric-cloud-renderer-kit
camera-rail-sequence-kit
cozy-island-scenario-kit
terrain-surface-domain-kit
vegetation-placement-domain-kit
aerial-perspective-domain-kit
campfire-atmosphere-domain-kit
cloud-density-field-domain-kit
cloud-horizon-band-domain-kit
cloud-lighting-domain-kit
cloud-lod-domain-kit
cloud-shadow-domain-kit
cloud-weather-domain-kit
fog-advection-domain-kit
fog-field-domain-kit
fog-volume-placement-domain-kit
ground-contact-domain-kit
illumination-domain-kit
ocean-caustics-domain-kit
ocean-floor-profile-domain-kit
ocean-optics-domain-kit
ocean-wave-domain-kit
prop-archetype-domain-kit
render-archetype-domain-kit
render-quality-domain-kit
render-snapshot-domain-kit
rock-archetype-domain-kit
shoreline-field-domain-kit
shoreline-foam-domain-kit
stylized-material-descriptor-domain-kit
sun-glitter-domain-kit
terrain-biome-field-domain-kit
terrain-lod-domain-kit
underwater-atmosphere-domain-kit
vegetation-archetype-domain-kit
vegetation-lod-domain-kit
vegetation-wind-domain-kit
weather-state-domain-kit
wind-field-domain-kit
deterministic-seed-domain-kit
environment-clock-domain-kit
```

Additional kit: `cozy-ocean-composition-kit`, offering logical render-layer graph, pass-order validation, transparent-depth validation, terrain handoff and depth/blend contracts.

## Census

```txt
engine-installed kits: 13
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed total: 64
active route surfaces: 62
inactive catalog entries: 2
```

## Main findings

1. Global keyboard listeners do not require canvas focus.
2. Pointer move and release do not verify the active pointer ID.
3. No primary-pointer or primary-button policy exists.
4. Lost pointer capture is not handled.
5. Input generation is permanently `1`.
6. Duplicate command IDs are accepted.
7. Rejection diagnostics are not advanced.
8. Clear does not close the generation or reject later stale commands.
9. Debug input bypasses the DSK command path.
10. No input-consumer or first-visible-frame receipt exists.

## Required authority

```txt
cozy-island-browser-input-ownership-authority-domain
```

Required service families:

```txt
surface and session identity
focus generation and admission
primary pointer/button policy
pointer gesture and capture lifecycle
keyboard, pointer and wheel samples
command identity and deduplication
input-generation fencing
clear and admission results
rejection reasons and observations
player/interaction/camera consumer receipts
first-visible-input-frame acknowledgement
browser and Pages fixtures
```

## Required transaction

```txt
browser event
  -> current surface and focus proof
  -> current gesture/capture proof when pointer-sourced
  -> sample and command identity
  -> generation and duplicate admission
  -> typed result
  -> normalized InputFrame commit
  -> consumer receipts
  -> renderer-neutral frame
  -> visible-frame acknowledgement
```

## Validation

```txt
runtime changed: no
input behavior changed: no
gameplay changed: no
rendering changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm test: not run
browser input smoke: not run
Pages input smoke: not run
```

This breakdown documents the current defect and target boundary. It does not claim the runtime is fixed.