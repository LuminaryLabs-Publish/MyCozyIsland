# Current Audit: MyCozyIsland Dynamic Environment Frame Authority

Last updated: `2026-07-11T12-58-06-04-00`

## Summary

MyCozyIsland has live clock, wind and illumination services, but the production render graph does not consume one live environment frame. `createLegacyWorldComposition()` samples illumination and wind-dependent descriptors during startup, freezes one render snapshot, and passes that snapshot into the scenario and renderer constructors.

`createCozyIslandScenario().getRenderSnapshot()` refreshes only `clock` and `camera`. World sway, campfire pulse, ocean and foam use elapsed seconds, while sun/sky/exposure, vegetation wind, campfire smoke wind, cloud weather/lighting/shadow and fog advection remain tied to startup values.

## Plan ledger

**Goal:** define one deterministic, session-fenced environment-frame transaction with reset and visible-frame proof.

- [x] Reconcile the complete Publish inventory with central tracking.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` because repo-local documentation was newer than central tracking.
- [x] Read the production route, world composition, environment services, scenario and renderer updates.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace every live and startup-frozen environment consumer.
- [x] Define a composed authority domain and fixture matrix.
- [x] Change no runtime behavior.

## Runtime identity

```txt
route:               src/main-cloudform.js?v=core-world-1
Three.js:            0.185.0
NexusEngine commit:  38229f59c22cb40024ffd13a9f48040de759f5d7
world id:            world:cozy-island-webgpu-v3
world seed:          cozy-island-webgpu-v2
initial active cells:49
provider count:      7
local kit count:     50
package version:     0.3.1
```

## Interaction loop

```txt
startup
  -> validate 50 kits
  -> initialize WebGPU/WebGL2 renderer
  -> create deterministic seed and environment clock
  -> create wind, weather and illumination services
  -> sample illumination once
  -> sample vegetation/campfire wind once
  -> derive cloud and fog descriptors once
  -> freeze render snapshot
  -> construct world/ocean/foam/cloud/fog/post consumers
  -> install callbacks and animation loop

frame
  -> calculate frameMs and dt
  -> tick clock and camera
  -> scenario returns static snapshot + current clock/camera
  -> update Core World focus
  -> update world and foam from elapsedSeconds
  -> sample adaptive performance
  -> render
  -> process materialization
  -> publish debug/global observations

reset
  -> reset clock and camera
  -> no environment frame revision
  -> no consumer reset transaction
  -> no visible baseline-frame acknowledgement
```

## Domain map

```txt
platform and route host
  module admission, loader, renderer backend, listeners, timers, loop, pagehide and global host

runtime lifecycle
  session ownership, callback admission, reset, stop, disposal and restart gaps

Core World
  registration, grid partition, providers, focus, effects, active cells, snapshots and reset

semantic world
  terrain, clearing, biome, shoreline, paths, population, ocean and atmosphere

environment source
  deterministic seed, clock, wind, weather, illumination and aerial perspective

environment derivatives
  cloud weather/density/lighting/LOD/shadow/horizon, fog density/advection/placement, vegetation wind and campfire smoke

scenario
  camera rail, first-person input, clock tick, reset and render snapshot

rendering
  sky, lights, exposure, world, ocean, foam, cloud, fog, post, cell cache and disposal

dynamic environment authority
  frame derivation, identity, consumer plan, prepare/commit/rollback, reset baseline, journal and frame proof

adaptive quality
  performance sampling and direct cloud/fog/post/pixel-ratio mutation

validation and deployment
  static tests, semantic/world/provider/materialization/renderer tests and Pages deployment
```

## Provider domains

```txt
FOUNDATION
  cozy-island-terrain-provider
CLASSIFICATION
  biome-classification-provider
  shoreline-classification-provider
POPULATION
  vegetation-provider
  rock-provider
  prop-provider
PRESENTATION
  cell-presentation-provider
```

## Services offered by the 50 local kits

```txt
determinism and time
  stable seeds, scoped RNG, mutable environment clock and reset

terrain and placement
  height, normal, slope, curvature, moisture, exposure, plateau, biome, shoreline, LOD, contact and paths

population
  vegetation, rocks, props, grass and campfire placement/archetypes

ocean and atmosphere
  floor, waves, optics, underwater, caustics, glitter, foam, wind, weather, illumination, clouds, fog and aerial perspective

render descriptors and adapters
  startup quality, materials, archetypes, immutable snapshots, WebGPU/WebGL2 renderers, post processing and debug

scenario
  camera rail, movement input, tick, reset and render snapshots

Core World integration
  grid focus, provider ordering, cell lifecycle, portable snapshots, lazy materialization, query and legacy bridge

adaptive performance
  EMA frame sampling, level transitions, cloud/fog step scaling, fog-resolution scaling and pixel-ratio degradation
```

## Complete local kit inventory

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

## Live versus frozen consumers

```txt
live:
  clock elapsedSeconds
  camera descriptor
  generic world sway
  campfire flame/light pulse
  ocean animation
  foam animation

startup-frozen:
  sky gradient
  hemisphere intensity
  sun direction/color/intensity
  renderer exposure
  scene fog descriptor
  vegetation wind descriptor
  campfire smoke wind direction/response
  cloud weather, lighting, shadow and horizon
  fog density, advection and placement
```

## Main findings

### Scenario projection is incomplete

The scenario spreads the startup snapshot and replaces only `clock` and `camera`. It does not derive a new wind, illumination, cloud, fog or ocean frame.

### Dynamic services are sampled once

`createIlluminationState()` and `createWindField()` can produce time-dependent values, but world composition consumes them during startup and freezes dependent descriptors.

### Render consumers have no shared identity

There is no `environmentFrameId`, revision, fingerprint, consumer acknowledgement set or visible-frame receipt.

### Reset is not an environment transaction

Clock and camera reset independently. Render consumers do not prepare or acknowledge a canonical baseline environment frame.

### Observations are incomplete

The public host exposes clock and performance state, but no canonical live environment state or consumer parity evidence.

## Required parent domain

```txt
cozy-island-dynamic-environment-frame-authority-domain
```

Candidate kits:

```txt
environment-frame-schema-kit
environment-frame-id-kit
environment-clock-sample-kit
environment-frame-admission-kit
wind-frame-kit
weather-frame-kit
illumination-frame-kit
cloud-environment-frame-kit
fog-environment-frame-kit
ocean-environment-frame-kit
vegetation-wind-frame-kit
campfire-smoke-frame-kit
environment-consumer-plan-kit
environment-consumer-prepare-kit
environment-consumer-commit-kit
environment-consumer-rollback-kit
environment-frame-result-kit
environment-frame-fingerprint-kit
environment-frame-ack-kit
environment-reset-baseline-kit
environment-frame-journal-kit
environment-consumer-coherence-fixture-kit
environment-reset-replay-fixture-kit
browser-environment-frame-smoke-kit
```

## Acceptance boundary

Dynamic environment behavior is authoritative only when one admitted clock sample produces one immutable environment frame, every consumer commits the same revision or rolls back, reset reproduces the canonical baseline, stale frames reject without mutation, observations expose the effective state, and one visible frame acknowledges the environment fingerprint.
