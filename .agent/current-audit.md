# Current Audit: MyCozyIsland Adaptive Quality Transaction Authority

Last updated: `2026-07-11T16-10-58-04-00`

## Summary

`MyCozyIsland` has a useful adaptive performance budget, but quality transitions are not authoritative transactions. The budget samples each RAF interval, changes a numeric level after frame-count thresholds, and invokes a callback that mutates cloud steps, fog steps, fog render-target scale and renderer pixel ratio in sequence.

The callback is not atomic and has a concrete recovery defect. Pixel ratio is only assigned when `level > 0`, so recovery from level 1 to level 0 restores the volumetric settings but leaves the renderer at the degraded pixel ratio. The public performance state can report `level: 0` even though the rendered resolution has not returned to the startup baseline.

## Plan ledger

**Goal:** define one revisioned quality transition that plans, applies, verifies, rolls back and visibly acknowledges all participating render consumers.

- [x] Reconcile the complete Publish inventory and exclude Cavalry of Rome.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` through the oldest eligible aligned-repository rule.
- [x] Read the route host, render-quality descriptor, performance budget, atmosphere renderers and post pipeline.
- [x] Trace startup quality selection and every runtime adaptive setter.
- [x] Identify the level-0 pixel-ratio recovery defect.
- [x] Identify frame-count cadence dependence, background-sampling risk and partial-application risk.
- [x] Identify all active domains, kits and services.
- [x] Define an adaptive-quality authority domain and fixture matrix.
- [x] Change no runtime behavior.

## Runtime identity

```txt
route script:         src/main-cloudform.js?v=core-world-3
package version:      0.3.1
Three.js:             0.185.0
NexusEngine commit:   38229f59c22cb40024ffd13a9f48040de759f5d7
world id:             world:cozy-island-webgpu-v3
local kit count:      50
Core World providers: 7
quality levels:       0, 1, 2
sample source:        RAF callback interval
slow threshold:       movingAverage > target * 1.26
fast threshold:       movingAverage < target * 0.86
degrade threshold:    90 qualifying frames
recover threshold:    360 qualifying frames
```

## Adaptive-quality interaction loop

```txt
startup
  -> detect backend
  -> choose render-quality tier
  -> set pixel-ratio cap
  -> create shadows, geometry, volume textures and post pipeline
  -> initialize performance level 0

render loop
  -> compute frameMs from RAF callback timestamps
  -> clamp frameMs to 1..100 inside performance budget
  -> update moving average and FPS estimate
  -> count over-budget or under-budget frames
  -> emit degrade or recover callback
  -> applyPerformanceLevel(level)
       cloudRenderer.setStepScale()
       fogRenderer.setStepScale()
       postPipeline.setFogResolutionScale()
       renderer.setPixelRatio() only when level > 0
  -> render frame
  -> periodically publish detached debug state
```

## Domain map

```txt
browser startup admission
  module graph, backend selection, startup quality and resource creation

runtime session lifecycle
  animation-loop ownership, visibility, stop, dispose and restart

adaptive performance policy
  frame samples, moving average, threshold counters, level changes and FPS estimate

quality transition authority
  command, transition identity, revision, plan, consumer results, commit and rollback

quality consumers
  cloud raymarch steps
  fog raymarch steps
  fog render-target resolution
  renderer pixel ratio
  startup-fixed shadows, terrain, vegetation, ocean, textures and post blur

visible-frame authority
  committed quality fingerprint and first frame rendered with that revision

Core World and semantic world
  focus, providers, materialization, terrain, population, ocean and atmosphere

validation and deployment
  Node/static tests, browser quality fixtures and Pages smoke
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
  stable seeds, scoped RNG, environment clock, wind, weather and illumination

terrain and classification
  height, normal, slope, curvature, moisture, exposure, plateau, biome, shoreline, LOD, contact and paths

population
  vegetation, rocks, props, grass and campfire placement/archetypes

ocean and atmosphere
  floor, waves, optics, underwater, caustics, glitter, foam, clouds, fog and aerial perspective

render descriptors and adapters
  startup quality, materials, archetypes, portable snapshots, WebGPU/WebGL2 consumers and post processing

adaptive performance
  moving-average sampling, degrade/recover decisions, cloud/fog step scaling, fog-resolution scaling and renderer pixel-ratio scaling

scenario
  camera rail, first-person movement, input state, tick, reset and render snapshots

Core World integration
  grid partition, focus, provider order, cell lifecycle, snapshots, materialization, query and compatibility bridge
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

## Imported NexusEngine services

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
createTerrainProviderAdapter
defineWorldEffectProvider
```

## Main findings

### Full recovery is false for renderer pixel ratio

`applyPerformanceLevel()` calls `renderer.setPixelRatio()` only inside `if (level > 0)`. Recovery to level 0 updates cloud steps, fog steps and fog resolution, but skips the pixel-ratio baseline assignment. The quality policy and visible renderer can therefore disagree.

### The transition is a sequence of side effects

The host mutates four consumers in order and receives no typed acknowledgement from any of them. If one setter throws or clamps unexpectedly, earlier consumers remain changed and later consumers are not applied. There is no rollback plan or partial-failure result.

### Thresholds are frame-count based

The degrade and recovery counters count qualifying samples, not elapsed wall time. Ninety samples represent different wall durations at 30, 60 and 120 Hz. The policy is therefore cadence-dependent even before rendering work changes.

### Visibility and stalls are not lifecycle barriers

RAF intervals are clamped and sampled without an explicit visibility baseline reset. Background throttling, tab restoration and long stalls can influence the moving average and transition counters without a typed defer, drop or resume result.

### Startup-fixed and adaptive quality are not separated by capability

Only four consumers participate dynamically. Shadow resolution, terrain resolution, ocean segments, vegetation scale, cloud texture size and post blur stay startup-fixed. That may be valid, but there is no capability manifest explaining which fields are mutable, rebuild-required or immutable.

### Diagnostics do not prove applied quality

The overlay prints the startup tier, FPS and cloud/fog steps. It does not print quality revision, actual renderer pixel ratio, fog render-target scale, per-consumer result, transition status or the first visible frame that consumed the change.

## Required parent domain

```txt
cozy-island-adaptive-quality-transaction-authority-domain
```

Candidate kits:

```txt
quality-policy-descriptor-kit
quality-sample-command-kit
visibility-sample-barrier-kit
quality-transition-id-kit
quality-revision-kit
quality-transition-admission-kit
quality-candidate-plan-kit
quality-consumer-capability-kit
quality-consumer-command-kit
quality-consumer-result-kit
quality-transition-commit-kit
quality-transition-rollback-kit
full-recovery-policy-kit
stale-quality-result-rejection-kit
quality-visible-frame-ack-kit
quality-observation-kit
quality-journal-kit
cadence-parity-fixture-kit
full-recovery-fixture-kit
partial-failure-rollback-fixture-kit
browser-quality-frame-smoke-kit
```

## Required quality transaction

```txt
receive QualitySampleCommand
  -> admit runtime session and visibility state
  -> normalize sample against monotonic time
  -> evaluate elapsed-time policy
  -> create transitionId and next qualityRevision
  -> derive complete candidate settings from immutable baseline
  -> classify each consumer as mutable, rebuild-required or fixed
  -> apply candidate settings to detached/rollback-capable consumers
  -> collect typed consumer results
  -> rollback all applied consumers if any required consumer fails
  -> atomically commit quality level and revision
  -> render one frame
  -> publish QualityVisibleFrameReceipt
  -> expose clone-safe observation and bounded journal
```

## Fixture matrix

```txt
30/60/120 Hz equivalent sample streams produce equal wall-time transition behavior
level 0 -> 1 -> 0 restores every mutable baseline value
level 0 -> 1 -> 2 -> 1 -> 0 restores every mutable baseline value
pixel ratio is observed directly after every transition
one injected consumer failure rolls back all preceding consumers
stale old-revision results cannot commit
hidden-tab intervals do not cause an unclassified transition
resize during transition preserves the selected pixel-ratio policy
diagnostics and visible frame carry the same quality revision
WebGPU and WebGL2 capability manifests are explicit
```

## Ordered queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. Core World Reset / Re-prepare Authority
4. Pinned Core World Focus Transaction Authority
5. Live Materialization Readiness Commit Authority
6. Core World Render Commit Authority
7. Camera Rail Baseline Authority
8. Dynamic Environment Frame Authority
9. Adaptive Quality Transaction Authority
```

Adaptive quality remains downstream of startup, runtime-session and visible-frame authority. This audit defines the contract without changing that dependency order.