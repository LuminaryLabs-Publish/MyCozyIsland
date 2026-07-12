# Current Audit: MyCozyIsland Adaptive Quality Transaction Authority

Last updated: `2026-07-12T05-00-19-04-00`

## Summary

MyCozyIsland selects a frozen base quality descriptor at startup, then runs a separate mutable performance budget. The budget samples RAF callback spacing, applies an exponential moving average, and uses frame-count hysteresis to move between levels 0, 1, and 2.

A degradation updates cloud steps, fog steps, fog resolution, and renderer pixel ratio. Recovery is incomplete: `applyPerformanceLevel(0)` restores the volumetric controls but never calls `renderer.setPixelRatio(...)`, so a return to level zero can leave the renderer at a previously reduced DPR.

The current system also lacks one active-quality descriptor, transition revision, timing-source identity, visibility/throttling admission, explicit override policy, consumer receipt set, resize transaction, and visible-frame acknowledgement.

## Plan ledger

**Goal:** document one authoritative path from measured frame cost and quality policy through an accepted transition, symmetric renderer mutation, diagnostics, resize, recovery, and the first visible frame using the new quality revision.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `MyCozyIsland` as the oldest eligible synchronized repository.
- [x] Inspect quality selection, performance sampling, renderer mutations, resize, diagnostics, host readback, and tests.
- [x] Identify the complete interaction loop, active domains, 50 cataloged kits, one extra runtime kit, nine providers, and five imported services.
- [x] Confirm asymmetric pixel-ratio recovery.
- [x] Confirm frame-count dwell is refresh-rate dependent.
- [x] Confirm URL override is not represented as a fixed/adaptive policy.
- [x] Confirm no quality revision or frame receipt correlates the accepted level with visible output.
- [x] Define policy, sample, transition, consumer receipt, resize, recovery, journal, fixture, and frame-proof contracts.
- [x] Change documentation only.
- [ ] Implement and run adaptive-quality fixtures.

## Runtime identity

```txt
route:                 index.html -> src/main-cloudform.js?v=foam-depth-camera-1
package:               0.4.1
Three.js:              0.185.0
NexusEngine commit:    481cbf6df742e81279bd42245c4238c6a1fc69f2
world id:              world:cozy-island-webgpu-v4
cataloged kits:        50
runtime kit surfaces:  51
providers:             9
```

## Interaction loop

```txt
startup
  -> chooseRenderQuality({ backend })
  -> optional URL tier wins, otherwise capability policy chooses tier
  -> set renderer DPR to min(device DPR, base cap)
  -> allocate shadow, terrain, ocean, volume and world resources from base quality
  -> create performance budget with targetFrameMs

frame
  -> frameMs = clamp(now - last, 0..100)
  -> scenario/world/foam update
  -> performanceBudget.sample(frameMs)
  -> moving average and qualifying frame counters update
  -> accepted level transition invokes applyPerformanceLevel(level)
  -> post pipeline renders immediately with the mutated controls
  -> every 12 frames diagnostics read base quality plus budget state

degrade
  -> average > target * 1.26 for 90 qualifying frames
  -> increment level, maximum 2
  -> reduce cloud/fog step scale and fog resolution
  -> reduce DPR because level > 0

recover
  -> average < target * 0.86 for 360 qualifying frames
  -> decrement level
  -> restore cloud/fog controls toward base
  -> when level reaches 0, DPR is not restored
```

## Concrete defects

### Sticky pixel-ratio degradation

```txt
startup high tier at DPR 1.5
  -> level 1 sets cap to 1.32
  -> level 2 sets cap to 1.14
  -> recovery to level 1 sets cap to 1.32
  -> recovery to level 0 skips renderer.setPixelRatio
  -> active DPR remains 1.32 instead of returning to 1.5
```

The exact retained value depends on the preceding level and device DPR, but level zero does not authoritatively restore startup resolution.

### Refresh-rate-dependent dwell

```txt
90 qualifying frames:
  30 Hz -> about 3.0 seconds
  60 Hz -> about 1.5 seconds
 120 Hz -> about 0.75 seconds

360 qualifying frames:
  30 Hz -> about 12 seconds
  60 Hz -> about 6 seconds
 120 Hz -> about 3 seconds
```

The moving average changes the exact wall time, but the acceptance threshold is still frame-count based rather than elapsed-time based.

### Measurement ambiguity

`renderer` is created with timestamp tracking enabled, but the adaptive budget consumes RAF callback spacing. That value may include scheduling, tab throttling, OS stalls, browser pauses, and CPU work. No typed sample distinguishes CPU frame time, GPU time, presentation latency, callback delay, invalid samples, or visibility transitions.

### Override ambiguity

`?quality=low|medium|high|ultra` selects the base tier, but the performance budget remains active. The runtime has no explicit policy saying whether the override is a fixed lock, an upper bound, a lower bound, or an adaptive starting tier.

### Partial consumer coverage

Adaptive transitions currently affect:

```txt
cloud ray-step scale
fog ray-step scale
fog resolution scale
renderer pixel ratio on levels above zero
```

They do not transition already-created resources such as shadow-map size, cloud/fog texture dimensions, ocean segments, terrain resolution, vegetation density, or other base-quality allocations. This can be a valid policy, but it is not represented as an explicit mutable/immutable consumer contract.

## Domains in use

```txt
browser startup, loader, error and debug projection
kit catalog declaration, validation and completeness
logical render graph declaration and validation
physical render pass and proxy-resource construction
WebGPU/WebGL2 backend and base-quality selection
adaptive performance sampling and quality mutation
legacy/Core world mode and lifecycle
Core World grid, focus, providers and materialization
camera rail, first-person input, movement, reset and frame projection
scenario clock, tick, reset and render snapshots
deterministic seed, wind, weather, illumination and aerial perspective
cloud, fog, ocean, foam, vegetation, campfire and terrain presentation
island, sea floor, biome, shoreline and ground contact
render layers, depth, blend, post and output transform
browser input, resize, visibility, page lifecycle and public host
tests and Pages deployment
```

## All implemented kits and offered services

### Catalog-admitted kits: 50

```txt
debug-overlay-host-kit                     diagnostics projection
webgl2-fallback-renderer-kit                fallback rendering policy
webgpu-compute-atmosphere-renderer-kit      atmosphere texture generation
webgpu-foam-renderer-kit                    shoreline foam rendering and animation
webgpu-ocean-renderer-kit                   ocean displacement, normals and optics
webgpu-performance-budget-kit               moving average, hysteresis and level callbacks
webgpu-post-processing-renderer-kit         depth, fog, foam and output composition
webgpu-rolling-fog-renderer-kit              volume fog and advection
webgpu-stylized-material-renderer-kit       world materials and animation
webgpu-volumetric-cloud-renderer-kit        cloud volume rendering
camera-rail-sequence-kit                    rail, orbit, landing, reset and FPS input
cozy-island-scenario-kit                    clock tick, camera tick, reset and snapshots
terrain-surface-domain-kit                  island surface
vegetation-placement-domain-kit             deterministic placement graph
aerial-perspective-domain-kit               haze and exposure
campfire-atmosphere-domain-kit               fire, light, embers, smoke and wind descriptor
cloud-density-field-domain-kit              cloud density recipe
cloud-horizon-band-domain-kit               horizon continuation
cloud-lighting-domain-kit                   cloud lighting and extinction
cloud-lod-domain-kit                        texture and ray-step policy
cloud-shadow-domain-kit                     projected shadow policy
cloud-weather-domain-kit                    weather-to-cloud mapping
fog-advection-domain-kit                    wind-derived fog direction and speed
fog-field-domain-kit                        terrain-aware fog density
fog-volume-placement-domain-kit             fog bounds
ground-contact-domain-kit                   terrain seating and rejection
illumination-domain-kit                     sun, sky and exposure
ocean-caustics-domain-kit                   caustic descriptor
ocean-floor-profile-domain-kit              shelf, reef and deep floor
ocean-optics-domain-kit                     absorption, Fresnel and refraction
ocean-wave-domain-kit                       deterministic wave spectrum
prop-archetype-domain-kit                   fence, path, driftwood and clearing
render-archetype-domain-kit                 semantic render mapping
render-quality-domain-kit                   base tier and resource policy
render-snapshot-domain-kit                  immutable render aggregation
rock-archetype-domain-kit                   rock graph
shoreline-field-domain-kit                  signed coast field
shoreline-foam-domain-kit                   foam contours and animation parameters
stylized-material-descriptor-domain-kit     palettes and surface parameters
sun-glitter-domain-kit                      glitter lobe
terrain-biome-field-domain-kit              biome weights
terrain-lod-domain-kit                      terrain detail policy
underwater-atmosphere-domain-kit            underwater extinction
vegetation-archetype-domain-kit             vegetation catalog
vegetation-lod-domain-kit                   plant LOD
vegetation-wind-domain-kit                  bend and gust descriptors
weather-state-domain-kit                    stable weather intent
wind-field-domain-kit                       deterministic clock-driven wind
deterministic-seed-domain-kit               scoped random streams
environment-clock-domain-kit                elapsed time, scale, pause and reset
```

### Source-backed runtime kit outside catalog

```txt
cozy-ocean-composition-kit
  -> six-pass logical layer graph
  -> pass order and dependency validation
  -> transparent depth-write validation
  -> terrain handoff validation
  -> per-layer depth and blend contracts
```

### Core World providers: 9

```txt
cozy-island-terrain-provider
cozy-seafloor-terrain-provider
biome-classification-provider
shoreline-classification-provider
seafloor-material-provider
vegetation-provider
rock-provider
prop-provider
cell-presentation-provider
```

### Imported NexusEngine services: 5

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
defineWorldEffectProvider
```

## Required parent domain

```txt
cozy-island-adaptive-quality-transaction-authority-domain
```

## Candidate kits

```txt
quality-policy-id-kit
quality-policy-descriptor-kit
quality-override-policy-kit
frame-cost-sample-kit
frame-cost-source-kit
frame-cost-validity-kit
quality-observation-window-kit
quality-transition-command-kit
quality-transition-id-kit
quality-transition-revision-kit
quality-transition-admission-kit
quality-transition-result-kit
quality-dwell-time-kit
quality-consumer-plan-kit
quality-consumer-receipt-kit
pixel-ratio-quality-adapter-kit
volumetric-quality-adapter-kit
immutable-quality-resource-policy-kit
quality-resize-transaction-kit
quality-visibility-suspension-kit
quality-recovery-transaction-kit
quality-frame-commit-kit
quality-observation-kit
quality-transition-journal-kit
stale-quality-transition-rejection-kit
adaptive-quality-cadence-fixture-kit
pixel-ratio-recovery-fixture-kit
quality-override-policy-fixture-kit
quality-visible-frame-smoke-kit
```

## Required transaction

```txt
admit valid frame-cost sample
  -> identify CPU/GPU/presentation source and visibility state
  -> update a time-based observation window
  -> evaluate explicit fixed/adaptive override policy
  -> propose transition from expected quality revision
  -> construct complete mutable-consumer plan
  -> apply DPR, volumetric, and other admitted changes symmetrically
  -> collect typed consumer receipts
  -> reject partial or stale transition
  -> commit active quality descriptor and revision
  -> render one frame using that revision
  -> publish visible quality-frame acknowledgement
```

## Required proof

```txt
30/60/120 Hz produce equivalent time-based transition timing
level 2 -> 1 -> 0 restores exact base DPR
resize recomputes or explicitly preserves policy under one transaction
URL override follows a documented fixed/adaptive rule
hidden-tab and invalid timing samples cannot trigger transitions
all mutable consumers cite one quality revision
immutable consumers are explicitly classified
base tier, active level, DPR and consumer state agree in diagnostics
first visible frame after transition cites the committed quality revision
```

## Validation boundary

```txt
runtime source changed: no
quality implementation changed: no
render output changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
quality source inspected: yes
existing test chain inspected: yes
npm test run: no
new adaptive-quality fixtures implemented: no
browser adaptive smoke run: no
```