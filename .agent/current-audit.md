# Current Audit: MyCozyIsland Adaptive Quality Transaction Authority

Last updated: `2026-07-11T12-50-35-04-00`

## Summary

The product has two quality systems:

1. `chooseRenderQuality()` selects an immutable startup tier from backend, memory, viewport, DPR, reduced-motion preference or URL override.
2. `createPerformanceBudget()` samples one value per rendered frame and invokes direct callbacks for adaptive levels 0, 1 and 2.

The adaptive path is not an authoritative transaction. It has no session or renderer generation fence, transition command, consumer plan, prepare/commit/rollback, effective-state fingerprint, typed result or committed-frame acknowledgement.

## Plan ledger

**Goal:** define cadence-independent adaptive-quality authority with full consumer recovery and visible-frame proof.

- [x] Reconcile the complete Publish inventory with central tracking.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` as the oldest eligible current entry.
- [x] Read the production route, quality descriptor, performance budget, atmosphere renderers and post pipeline.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Trace every adaptive consumer mutation.
- [x] Verify dwell thresholds are frame-count based.
- [x] Verify recovery to level 0 skips pixel-ratio restoration.
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
  -> initialize renderer and backend
  -> choose startup quality tier
  -> set pixel ratio, shadows and render-resource dimensions
  -> create Core World and compatibility snapshot
  -> construct world/ocean/foam/cloud/fog/post consumers
  -> create performance budget
  -> install browser callbacks and animation loop

frame
  -> calculate frameMs
  -> tick scenario and project camera
  -> update Core World focus
  -> update compatibility render animation
  -> performanceBudget.sample(frameMs)
  -> maybe increment/decrement internal adaptive level
  -> directly mutate cloud steps, fog steps, fog resolution and pixel ratio
  -> render post pipeline
  -> process materialization
  -> publish debug/global observations
```

## Domain map

```txt
platform and route host
  module admission, loader, renderer backend, listeners, timers, loop, pagehide and global host

startup quality
  backend, memory, viewport, DPR, reduced-motion and URL override policy

adaptive performance
  frame sample, EMA, threshold counters, levels and degrade/recover callbacks

Core World
  registration, grid partition, providers, focus, effects, active cells, snapshots and reset

product world
  prepare, focus throttling, lazy materialization, query facade and compatibility bridge

semantic world
  terrain, clearing, biome, shoreline, paths, placement, ocean, weather, illumination, clouds, fog and campfire

scenario
  camera rail, drag, wheel, first-person input, clock, reset and render snapshot

rendering
  world, ocean, foam, cloud, fog, post, cell cache, resource disposal and disconnected cell-aware renderer

quality authority
  sample admission, elapsed windows, decisions, transition transaction, effective state, rollback, journal and frame proof

validation and deployment
  static checks, semantic/world/provider/materialization/renderer tests and Pages deployment
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
  stable seeds, scoped RNG, identities and deterministic environment time

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

## Current adaptive policy

```txt
target: quality.targetFrameMs
sample clamp: 1..100 ms
EMA: 0.93 previous + 0.07 current
degrade: EMA > target * 1.26 for 90 samples
recover: EMA < target * 0.86 for 360 samples
levels: 0, 1, 2
```

### Effective consumer targets

```txt
level 0
  step scale 1.00
  fog resolution scale 1.00 * startup value
  pixel ratio startup value, but only at initial startup

level 1
  step scale 0.78
  fog resolution scale 0.82 * startup value
  pixel ratio cap 0.88 * startup cap

level 2
  step scale 0.62
  fog resolution scale 0.68 * startup value
  pixel ratio cap 0.76 * startup cap
```

## Main findings

### Refresh-rate-dependent dwell

The threshold counters advance once per rendered frame. Equivalent elapsed conditions produce different transition times:

```txt
90 samples: 3.00 s at 30 Hz, 0.75 s at 120 Hz
360 samples: 12.00 s at 30 Hz, 3.00 s at 120 Hz
```

### Level-zero recovery is incomplete

`applyPerformanceLevel(0)` restores cloud and fog step scales and fog resolution, but the pixel-ratio mutation is guarded by `if (level > 0)`. Once degraded, level 0 does not restore the startup pixel ratio.

### Transition is not atomic

Consumers mutate sequentially and return no prepare or commit receipts. If a later consumer fails, earlier consumers remain changed.

### Observations are incomplete

`performanceBudget.getState()` exposes only level, moving average, FPS and target. The global host adds cloud/fog steps and `activeScale`, but omits effective fog resolution, pixel ratio, quality revision, fingerprint and frame acknowledgement.

### Lifecycle admission is absent

Performance callbacks can still mutate renderer state during reset, quiescence, stop or disposal because the parent runtime-session authority does not yet exist.

## Required parent domain

```txt
cozy-island-adaptive-quality-authority-domain
```

Candidate kits:

```txt
quality-policy-schema-kit
performance-sample-envelope-kit
performance-window-timebase-kit
quality-level-decision-kit
quality-transition-command-kit
quality-transition-admission-kit
quality-session-fence-kit
quality-consumer-plan-kit
quality-consumer-prepare-kit
quality-consumer-commit-kit
quality-consumer-rollback-kit
effective-quality-state-kit
pixel-ratio-restore-kit
quality-transition-result-kit
quality-transition-journal-kit
quality-frame-ack-kit
quality-cadence-parity-fixture-kit
quality-full-recovery-fixture-kit
quality-partial-failure-fixture-kit
```

## Acceptance boundary

Adaptive quality is authoritative only when transition timing is elapsed-time based, every consumer prepares and commits one shared revision, failures restore the previous state, level-zero recovery restores every original value, session/reset/stop phases fence callbacks, effective state is fingerprinted, and one visible frame acknowledges the committed revision.
