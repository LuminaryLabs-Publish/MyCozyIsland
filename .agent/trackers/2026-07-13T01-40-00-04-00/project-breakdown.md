# Project breakdown: MyCozyIsland page-lifecycle central reconciliation

**Timestamp:** `2026-07-13T01-40-00-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Status:** `browser-page-lifecycle-authority-central-reconciled`

## Summary

MyCozyIsland is a NexusEngine-composed procedural island adventure with official Agriculture, wild Foraging, portable saves, deterministic world construction and WebGPU/WebGL2 presentation. This run reconciles the completed repo-local page-lifecycle audit with the central ledger.

The source-backed defect is unchanged: a once-only `pagehide` handler always writes a save candidate and destructively disposes only `gameplayRenderer`. It does not inspect `event.persisted`, has no `pageshow` path, leaves the animation loop and most listeners/resources active, and clears the plot, forage and crop indexes needed by later presentation updates.

## Plan ledger

**Goal:** maintain one synchronized evidence chain from browser lifecycle events through save, input, frame and renderer participants to a typed suspend, resume or retire result and the first matching visible frame.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with central ledger and root `.agent` state.
- [x] Detect MyCozyIsland repo-local page-lifecycle documentation newer than central tracking.
- [x] Select and modify only `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Re-read pagehide, animation-loop, listener and gameplay-renderer lifecycle source.
- [x] Identify the complete interaction loop and domains.
- [x] Preserve all 64 source-backed kit surfaces and their offered services.
- [x] Add a new timestamped reconciliation audit family.
- [x] Refresh required root `.agent` routing and machine state.
- [x] Prepare the paired central ledger and internal change-log update.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement and execute BFCache, repeated-navigation and terminal-retirement fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central: MyCozyIsland

MyCozyIsland       selected: page-lifecycle audit at 2026-07-13T01-31-36-04-00
TheUnmappedHouse   central 2026-07-12T23-20-51-04-00
AetherVale         central 2026-07-12T23-40-11-04-00
TheOpenAbove       central 2026-07-13T00-00-02-04-00
IntoTheMeadow      central 2026-07-13T00-18-48-04-00
PhantomCommand     central 2026-07-13T00-40-00-04-00
PrehistoricRush    central 2026-07-13T00-58-50-04-00
HorrorCorridor     central 2026-07-13T01-08-28-04-00
ZombieOrchard      central 2026-07-13T01-18-20-04-00
TheCavalryOfRome   excluded
```

## Complete interaction loop

```txt
startup
  -> initialize WebGPURenderer and select WebGPU or WebGL2
  -> choose static quality and install 13 engine/core adventure kits
  -> restore portable save
  -> construct world, gameplay, atmosphere, ocean, foam, sky and post resources
  -> install canvas/window listeners
  -> start renderer.setAnimationLoop

active frame
  -> derive clamped wall-time delta
  -> tick NexusEngine adventure
  -> update camera, lighting, world, Agriculture, Foraging and HUD
  -> sample adaptive performance budget
  -> render post pipeline
  -> periodically persist changed save fingerprint

pagehide today
  -> call storeSave(adventure)
  -> call gameplayRenderer.dispose()
  -> dispose gameplay subtree geometry/materials
  -> clear plotEntries, forageEntries and cropGroups
  -> consume the once-only listener
  -> publish no lifecycle result

retained-page return today
  -> browser may restore retained document and heap
  -> no pageshow handler executes
  -> no timing or input generation resets
  -> animation may resume against cleared gameplay indexes
  -> Agriculture/Foraging visuals and target lookup can diverge from domain truth

terminal departure today
  -> no aggregate stop for animation loop or listeners
  -> no complete save-flush receipt
  -> no ordered retirement of renderer, world, sky, atmosphere, ocean, foam or post resources
```

## Domains in use

```txt
browser document, canvas, HUD, storage, diagnostics and page lifecycle
page lifecycle classification, suspension, resume and retirement
runtime session, lifecycle generation, animation-loop and frame admission
input ownership, held-action cleanup and listener retirement
save capture, storage write/readback, migration, restore and rollback
renderer participant registration, retention, reconstruction and disposal
backend capability, static quality and adaptive quality
NexusEngine composition, scheduler, ECS phases and snapshots
Core Object and Core Transaction Ledger
seeded world, terrain, plots, forage nodes and spatial queries
Inventory and official Agriculture
wild Foraging
player movement, grounding, view and stamina
scenario time and objective
contextual interaction and cross-domain settlement
camera intro, first-person view and terrain clearance
renderer-neutral static world, frame, HUD and debug snapshots
WebGPU/WebGL2 atmosphere, ocean, foam, clouds, fog, lighting, materials and post-processing
validation, CI, Pages deployment and central tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits:     50
additional composition kit:           1
source-backed kit surfaces:           64
active route surfaces:                62
inactive catalog entries:              2
ordered Core World providers:          9
```

### Engine-installed kits

```txt
core-object-kit: registration, lookup, listing
core-transaction-ledger-kit: ledger, idempotency, record, apply-once, snapshot, reset
cozy-world-domain-kit: seeded world, surface query, plot layout, forage layout, render base, snapshot, reset
cozy-input-domain-kit: normalization, command queue, frame admission, held actions, clear, snapshot, reset
cozy-inventory-domain-kit: items, seed selection, transactions, batch settlement, snapshot, reset
agriculture-domain-kit: land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset
cozy-foraging-domain-kit: wild coconut nodes, collection, respawn, snapshot, reset
cozy-player-domain-kit: movement, grounding, view, stamina, snapshot, reset
cozy-scenario-domain-kit: time, objective, snapshot, reset
cozy-interaction-domain-kit: targeting, contextual action, Agriculture settlement, Foraging settlement, prompt, result, snapshot, reset
cozy-camera-domain-kit: aerial intro, first-person view, terrain clearance, descriptor
cozy-save-domain-kit: capture, checksum validation, migration, restore, rollback, reset, diagnostics
cozy-render-snapshot-domain-kit: static world, Agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor
```

### Cataloged world, render and host kits

```txt
debug-overlay-host-kit: draw, toggle, show, hide
webgl2-fallback-renderer-kit: fallback capability policy, CPU volume source, feature-disable policy
webgpu-compute-atmosphere-renderer-kit: cloud/fog volume generation and CPU fallback
webgpu-foam-renderer-kit: shoreline foam geometry, animation and layer contract
webgpu-ocean-renderer-kit: ocean geometry, waves, optics and water-layer contract
webgpu-performance-budget-kit: frame sampling, moving average, FPS state, degrade and recover callbacks
webgpu-post-processing-renderer-kit: scene/fog/foam passes, depth masks, scaling and pass-order readback
webgpu-rolling-fog-renderer-kit: fog volume, material, step scaling and readback
webgpu-stylized-material-renderer-kit: stylized descriptors and material construction
webgpu-volumetric-cloud-renderer-kit: cloud volumes, raymarch materials, step scaling and readback
camera-rail-sequence-kit: authored rail progression and camera descriptors
cozy-island-scenario-kit: authored scenario and sequence descriptors
terrain-surface-domain-kit: height, normal, material and surface queries
vegetation-placement-domain-kit: deterministic placement graph
aerial-perspective-domain-kit: horizon, distance and atmosphere descriptor
campfire-atmosphere-domain-kit: campfire light, smoke and heat descriptors
cloud-density-field-domain-kit: density recipe and texture budget
cloud-horizon-band-domain-kit: horizon placement descriptors
cloud-lighting-domain-kit: color, shadow and silver-lining descriptors
cloud-lod-domain-kit: step and volume-count policy
cloud-shadow-domain-kit: projection descriptors
cloud-weather-domain-kit: coverage and weather state
fog-advection-domain-kit: direction and speed
fog-field-domain-kit: density recipe and texture budget
fog-volume-placement-domain-kit: bounds and readability mask
ground-contact-domain-kit: terrain contact and clearance query
illumination-domain-kit: sun, sky, ambient and exposure state
ocean-caustics-domain-kit: caustic projection descriptors
ocean-floor-profile-domain-kit: seafloor shape and depth profile
ocean-optics-domain-kit: color, opacity, transmission, absorption and reflection
ocean-wave-domain-kit: deterministic wave components and sea level
prop-archetype-domain-kit: prop geometry/material archetypes
render-archetype-domain-kit: renderer-neutral object archetypes
render-quality-domain-kit: static tier selection and quality budgets
render-snapshot-domain-kit: renderer-neutral world snapshot construction
rock-archetype-domain-kit: placement and presentation archetypes
shoreline-field-domain-kit: shoreline classification and distance field
shoreline-foam-domain-kit: foam-band descriptors
stylized-material-descriptor-domain-kit: color, roughness, rim and outline descriptors
sun-glitter-domain-kit: water-highlight descriptors
terrain-biome-field-domain-kit: deterministic biome classification
terrain-lod-domain-kit: terrain resolution and distance policy
underwater-atmosphere-domain-kit: underwater color and attenuation
vegetation-archetype-domain-kit: tree, palm, fern, bush and grass archetypes
vegetation-lod-domain-kit: density and distance policy
vegetation-wind-domain-kit: wind deformation descriptor
weather-state-domain-kit: weather state and transitions
wind-field-domain-kit: deterministic direction and strength
deterministic-seed-domain-kit: seed derivation and deterministic random services
environment-clock-domain-kit: elapsed time and environmental phase
```

### Additional composition kit

```txt
cozy-ocean-composition-kit: render-layer graph, pass-order validation, transparent-depth validation, terrain handoff validation and per-layer depth/blend contracts
```

## Source-backed finding

`src/main-adventure.js` registers `pagehide` with `{ once: true }`, calls `storeSave(adventure)` and `gameplayRenderer.dispose()`, and does not inspect `event.persisted`, register `pageshow`, stop `renderer.setAnimationLoop`, detach listeners or retire the complete resource set.

`src/adventure/renderer-gameplay.js` clears `plotEntries`, `forageEntries` and `cropGroups` during disposal. Its later `update(frame)` requires those maps for soil/crop changes, forage visibility and target-marker placement.

## Required parent domain

```txt
cozy-island-browser-page-lifecycle-authority-domain
```

## Required transaction

```txt
PageLifecycleCommand
  -> bind runtime session and expected lifecycle generation
  -> classify persisted pagehide, terminal pagehide, pageshow, explicit stop or failure
  -> choose Suspend, Resume or Retire

Suspend
  -> clear held input
  -> pause frame production without destructive renderer disposal
  -> flush save through a typed receipt
  -> publish Suspended

Resume
  -> validate retained runtime and participant generations
  -> reset wall-time baseline and input generation
  -> resume frame production
  -> publish Resumed
  -> acknowledge the first matching visible frame

Retire
  -> reject new input and frames
  -> stop animation loop
  -> detach listeners
  -> flush and verify save
  -> dispose every registered participant exactly once in dependency order
  -> revoke global capabilities
  -> publish Retired, Degraded or Failed with receipts
```

## Candidate coordinating kits

```txt
page-lifecycle-command-id-kit
page-lifecycle-generation-kit
page-lifecycle-event-classifier-kit
bfcache-persistence-classifier-kit
page-lifecycle-state-machine-kit
page-suspend-plan-kit
page-resume-plan-kit
page-retirement-plan-kit
animation-loop-lifecycle-participant-kit
input-lifecycle-participant-kit
save-flush-lifecycle-participant-kit
renderer-lifecycle-participant-registry-kit
gameplay-renderer-lifecycle-participant-kit
world-renderer-lifecycle-participant-kit
atmosphere-resource-lifecycle-participant-kit
ocean-resource-lifecycle-participant-kit
foam-resource-lifecycle-participant-kit
post-pipeline-lifecycle-participant-kit
sky-texture-lifecycle-participant-kit
lifecycle-drain-barrier-kit
resource-disposal-receipt-kit
stale-lifecycle-event-rejection-kit
page-lifecycle-result-kit
page-lifecycle-observation-kit
page-lifecycle-journal-kit
first-resumed-frame-ack-kit
bfcache-roundtrip-fixture-kit
repeated-pagehide-pageshow-fixture-kit
terminal-retirement-fixture-kit
webgpu-webgl2-lifecycle-parity-fixture-kit
pages-lifecycle-smoke-kit
```

## Validation boundary

Documentation only. Runtime, gameplay, rendering, save, input, dependency and deployment behavior are unchanged. No browser BFCache, repeated-navigation, terminal-retirement, resource-receipt, backend-parity, first-resumed-frame or Pages lifecycle fixture was executed.