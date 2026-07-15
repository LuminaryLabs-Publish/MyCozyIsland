# Project breakdown: MyCozyIsland host-clock fixed-step simulation

**Timestamp:** `2026-07-15T05-00-28-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `a8733b506ecbd43190a280942790cdaa0bd1b983`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`

## Summary

The browser RAF host converts each callback interval into one simulation delta, clamps that delta to `0.05`, and sends it through `createCozyAdventure.tick()`, which clamps it to `0.05` again. Scenario time, player movement and stamina, Agriculture growth, Foraging respawn, intro progress and the autosave accumulator all consume admitted simulation delta.

At callback rates below 20 FPS, elapsed wall time is discarded instead of accumulated. A 100 ms callback gap advances at most 50 ms of simulation, so movement, growth, respawn, day time and autosave timing slow relative to wall time. There is no fixed-step accumulator, bounded catch-up result, dropped-time receipt, pause classification, interpolation alpha or first clock-aligned frame acknowledgement.

## Plan ledger

**Goal:** admit browser elapsed time through one revisioned host-clock authority that advances deterministic fixed steps within an explicit budget and proves the rendered frame corresponds to the accepted simulation revision.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and ten root `.agent` states.
- [x] Compare each eligible current `main` head with its central repo-local documentation head.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repositories.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` by the oldest synchronized central timestamp.
- [x] Inspect the RAF host, composition tick boundary, scenario clock, player movement/stamina, Foraging respawn, autosave cadence and smoke coverage.
- [x] Identify the complete interaction loop.
- [x] Preserve all 65 source-backed kits, one composition kit and five browser/product adapters.
- [x] Identify every kit and offered service.
- [x] Define the host-clock authority and 20 planned authority surfaces.
- [x] Add a new timestamped tracker and audit family.
- [x] Change documentation only.
- [ ] Implement fixed-step admission and executable browser/build/Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
central-ledger missing: 0
root-agent missing: 0
undocumented: 0
runtime ahead of central: 0

selected: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest synchronized eligible repository
prior central timestamp: 2026-07-15T01-04-57-04-00
next oldest timestamp: IntoTheMeadow at 2026-07-15T01-39-38-04-00
```

## Interaction loop

```txt
browser RAF timestamp
  -> frameMs = clamp(now - last, 0, 100)
  -> dt = clamp(frameMs / 1000, 0, 0.05)
  -> createCozyAdventure.tick(dt)
  -> second clamp to 0.05
  -> NexusEngine tick
  -> input frame admission
  -> scenario/environment clock
  -> player movement, stamina and intro
  -> Agriculture growth
  -> Foraging respawn
  -> interaction and camera
  -> render snapshot and HUD
  -> post pipeline render
  -> autosaveAccumulator += dt

low callback rate
  -> wall interval exceeds 50 ms
  -> excess elapsed time is discarded
  -> no catch-up steps are executed
  -> simulation and autosave run slower than wall time
  -> rendered frames expose no clock-loss receipt
```

## Source-backed clock finding

`src/main-adventure.js` derives `frameMs` from the RAF timestamp, limits it to 100 ms, then limits the simulation delta to 50 ms. The same file increments the autosave accumulator from that admitted delta.

`src/adventure/composition-runtime.js` applies a second 50 ms clamp before calling `engine.tick()`.

`src/adventure/runtime-domains.js` consumes `world.__nexusClock.delta` for the scenario clock, intro progress, movement, distance and stamina.

`src/adventure/resource-domains.js` consumes the same delta for wild-coconut respawn. The installed Agriculture kit also advances growth through the engine simulation clock.

A 10 FPS callback stream therefore advances about 0.5 seconds of simulation per second of wall time. This is a deterministic slow-motion policy, but it is implicit, unreported and not represented as an intentional pause, overload or catch-up result.

## Domains in use

```txt
Core Startup and playable-entry readiness
Core Object registration
Core Transaction Ledger and idempotency
seeded island world and surface queries
normalized input and frame admission
Inventory and seed selection
Agriculture land, soil, cultivation, water, growth, harvest and perennials
wild Foraging collection and respawn
player movement, grounding, view and stamina
scenario/environment time and objectives
contextual interaction and cross-domain settlement
camera intro and first-person view
portable save capture, validation, migration, rollback and reset
renderer-neutral static and frame snapshots
host clock, RAF timestamps, simulation delta and autosave cadence
terrain, vegetation, atmosphere, ocean, weather, lighting and materials
WebGPU/WebGL2 rendering, quality control and post processing
menu, preload, cross-window entry and browser lifecycle
HUD, diagnostics, validation, build, Pages and central tracking
```

## Complete kit and service inventory

### Engine-installed kits

```txt
core-startup-kit
  launch, preparation-registration, waiting, working, ready, failure,
  retry-fallback-descriptor, continuation-selection, first-frame-admission,
  playable-entry, snapshot, load, reset

core-object-kit
  registration, lookup, listing

core-transaction-ledger-kit
  ledger, idempotency, record, apply-once, snapshot, reset

cozy-world-domain-kit
  seeded-world, surface-query, plot-layout, forage-layout, render-base,
  snapshot, reset

cozy-input-domain-kit
  normalization, command-queue, frame-admission, held-actions, clear,
  snapshot, reset

cozy-inventory-domain-kit
  items, seed-selection, transactions, batch-settlement, snapshot, reset

agriculture-domain-kit
  land, soil, cultivation, water, growth, harvest, perennials,
  descriptors, events, snapshot, reset

cozy-foraging-domain-kit
  wild-coconut-nodes, collection, respawn, snapshot, reset

cozy-player-domain-kit
  movement, grounding, view, stamina, snapshot, reset

cozy-scenario-domain-kit
  time, objective, snapshot, reset

cozy-interaction-domain-kit
  targeting, context-action, agriculture-settlement, wild-forage-action,
  prompt, result, snapshot, reset

cozy-camera-domain-kit
  aerial-intro, first-person-view, terrain-clearance, descriptor

cozy-save-domain-kit
  capture, checksum-validation, migration, restore, rollback, reset,
  diagnostics

cozy-render-snapshot-domain-kit
  static-world, agriculture-descriptors, frame-snapshot, hud-descriptor,
  debug-descriptor
```

### Cataloged world, render and host kits

```txt
debug-overlay-host-kit: draw, toggle, show, hide
webgl2-fallback-renderer-kit: fallback-capability-policy, cpu-volume-source, feature-disable-policy
webgpu-compute-atmosphere-renderer-kit: cloud-volume-generation, fog-volume-generation, cpu-fallback
webgpu-foam-renderer-kit: shoreline-foam-geometry, animation, render-layer-contract
webgpu-ocean-renderer-kit: ocean-geometry, wave-deformation, optics, water-layer-contract
webgpu-performance-budget-kit: frame-sampling, moving-average, fps-state, degrade-callback, recover-callback
webgpu-post-processing-renderer-kit: scene-pass, fog-pass, foam-pass, depth-mask, resolution-scaling, pass-order-readback
webgpu-rolling-fog-renderer-kit: fog-volume, material, step-scaling, readback
webgpu-stylized-material-renderer-kit: material-descriptors, material-construction
webgpu-volumetric-cloud-renderer-kit: cloud-volumes, raymarch-materials, step-scaling, readback
camera-rail-sequence-kit: rail-progression, camera-sequence-descriptors
cozy-island-scenario-kit: scenario-descriptors, sequence-descriptors
terrain-surface-domain-kit: height-query, normal-query, material-query, surface-query
vegetation-placement-domain-kit: deterministic-placement-graph
aerial-perspective-domain-kit: horizon-descriptor, distance-descriptor, atmosphere-descriptor
campfire-atmosphere-domain-kit: campfire-light, smoke-descriptor, heat-descriptor
cloud-density-field-domain-kit: density-recipe, texture-budget
cloud-horizon-band-domain-kit: horizon-placement-descriptors
cloud-lighting-domain-kit: color, shadow, silver-lining
cloud-lod-domain-kit: step-policy, volume-count-policy
cloud-shadow-domain-kit: shadow-projection-descriptors
cloud-weather-domain-kit: coverage, weather-state
fog-advection-domain-kit: direction, speed
fog-field-domain-kit: density-recipe, texture-budget
fog-volume-placement-domain-kit: bounds, readability-mask
ground-contact-domain-kit: terrain-contact, clearance-query
illumination-domain-kit: sun-state, sky-state, ambient-state, exposure-state
ocean-caustics-domain-kit: caustic-projection-descriptors
ocean-floor-profile-domain-kit: seafloor-shape, depth-profile
ocean-optics-domain-kit: color, opacity, transmission, absorption, reflection
ocean-wave-domain-kit: deterministic-wave-components, sea-level
prop-archetype-domain-kit: prop-geometry-archetypes, prop-material-archetypes
render-archetype-domain-kit: renderer-neutral-object-archetypes
render-quality-domain-kit: static-tier-selection, quality-budgets
render-snapshot-domain-kit: renderer-neutral-world-snapshot
rock-archetype-domain-kit: rock-placement-archetypes, rock-presentation-archetypes
shoreline-field-domain-kit: shoreline-classification, distance-field
shoreline-foam-domain-kit: foam-band-descriptors
stylized-material-descriptor-domain-kit: color, roughness, rim, outline
sun-glitter-domain-kit: water-highlight-descriptors
terrain-biome-field-domain-kit: deterministic-biome-classification
terrain-lod-domain-kit: terrain-resolution-policy, distance-policy
underwater-atmosphere-domain-kit: underwater-color, attenuation
vegetation-archetype-domain-kit: tree-archetypes, palm-archetypes, fern-archetypes, bush-archetypes, grass-archetypes
vegetation-lod-domain-kit: density-policy, distance-policy
vegetation-wind-domain-kit: wind-deformation-descriptor
weather-state-domain-kit: weather-state, transitions
wind-field-domain-kit: deterministic-direction, strength
deterministic-seed-domain-kit: seed-derivation, deterministic-random
environment-clock-domain-kit: elapsed-time, environmental-phase
```

### Composition kit

```txt
cozy-ocean-composition-kit
  logical-render-layer-graph, pass-order-validation,
  transparent-depth-validation, terrain-handoff-validation,
  per-layer-depth-and-blend-contracts
```

### Browser and product adapters

```txt
browser-startup-presentation-adapter
  descriptor-dom-projection, failure-projection, timeout-helper,
  render-update-bridge

cozy-startup-host
  product-preparation-order, product-copy, engine-reuse,
  continuation-mapping, pre-playable-global-error-capture, host-disposal

cozy-menu-scene-adapter
  Three/WebGPU provider import, backend admission, procedural atlases,
  frond cards, postcard construction, TSL materials, wind compute/fallback,
  water, shoreline, fog, lighting, bloom, tone mapping, shadows,
  reduced motion, DPR resize, animation loop, readback and retirement

cozy-menu-game-shell-adapter
  iframe-preload, progress-projection, play-gate, entry-request, crossfade,
  history-transition, focus-transfer, fallback-reveal, error-display

cozy-game-preload-bridge-adapter
  startup-descriptor-polling, embed-context-classification,
  parent-messaging, simulation-freeze/resume, presentation-sleep/resume,
  player-entry-preparation, entry-acknowledgement
```

## Census

```txt
engine-installed core and adventure kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
planned host-clock authority surfaces: 20
```

## Required authority

```txt
cozy-island-host-clock-fixed-step-simulation-authority-domain
```

```txt
HostClockFrameCommand
  -> bind document, runtime, RAF and clock generations
  -> read the monotonic RAF timestamp
  -> classify active, suspended, resumed and overload intervals
  -> accumulate admitted elapsed wall time
  -> execute deterministic fixed steps within a bounded step budget
  -> retain or explicitly discard excess time with a typed receipt
  -> publish one HostClockFrameResult
  -> expose simulation revision, step count, residual time and interpolation alpha
  -> bind scenario, player, Agriculture, Foraging and autosave consumers
  -> render the accepted simulation revision
  -> publish FirstClockAlignedFrameAck
```

## Planned authority surfaces

```txt
host-clock-manifest-kit
raf-timestamp-adapter-kit
elapsed-time-classifier-kit
fixed-step-accumulator-kit
step-budget-policy-kit
catch-up-policy-kit
dropped-time-receipt-kit
pause-suspension-classifier-kit
simulation-clock-generation-kit
clock-admission-kit
clock-step-result-kit
interpolation-alpha-kit
scenario-clock-binding-kit
player-clock-binding-kit
agriculture-clock-binding-kit
foraging-clock-binding-kit
autosave-wall-clock-policy-kit
first-clock-aligned-frame-ack-kit
clock-browser-fixture-kit
source-build-pages-clock-parity-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, simulation behavior, gameplay, rendering, tests, dependencies, workflows and deployment were not changed. No fixed-step correctness, real-time pacing, overload policy, interpolation, clock-aligned frame convergence, artifact parity or production readiness is claimed.