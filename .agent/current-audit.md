# Current Audit: MyCozyIsland Lazy Cell Materialization Authority

Last updated: `2026-07-11T08-58-02-04-00`

## Summary

The runtime now separates lightweight Core World registration from heavy terrain, biome, shoreline, and presentation materialization. The staged scheduler is deterministic and row-bounded in isolation, but it is not called by the live browser host. Production therefore registers queued descriptors, builds the compatibility island, and renders forever without advancing the new materialization state.

## Plan ledger

**Goal:** document the complete lazy-world path and define the smallest authority boundary required to start it after the first committed frame, fence it to current world state, classify failures, and publish render-consumable readiness.

- [x] Reconcile all accessible Publish repositories with the central ledger.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` due to new undocumented runtime commits.
- [x] Read route, wrapper, scheduler, terrain, biome, shoreline, presentation, configuration, and test sources.
- [x] Identify the interaction loop, domains, kits, and services.
- [x] Verify the live route has no materialization-frame call.
- [x] Define admission, budget, epoch, readiness, failure, observation, and render-handoff boundaries.
- [x] Change no runtime behavior.

## Runtime identity

```txt
route:               src/main-cloudform.js?v=core-world-1
Three.js:            0.185.0
NexusEngine commit:  38229f59c22cb40024ffd13a9f48040de759f5d7
world mode:          core by default
rollback mode:       ?world=legacy
world id:            world:cozy-island-webgpu-v3
world seed:          cozy-island-webgpu-v2
partition:           48 m grid, radius 3
initial cells:       49
provider count:      7
local kit count:     50
package version:     0.3.1
```

## Interaction loop

```txt
route boot
  -> pinned module admission
  -> kit-catalog validation
  -> renderer/backend startup
  -> createCozyIslandWorldRuntime()
  -> prepare()
       Core World registers 49 cells
       terrain/biome/shoreline descriptors remain queued
  -> createLegacyRenderSnapshot()
  -> build whole-island compatibility render graph
  -> register input and renderer animation loop
  -> frame:
       scenario.tick(dt)
       camera projection
       updateWorldFocus(camera, mode, dt)
       world/foam updates
       post render
       diagnostics
       no lazy materialization step
```

## Implemented lazy service path

`createLazyCellMaterializer()` provides:

```txt
sync active cell identities
remove released scheduler rows
prioritize by LOD, focus distance, stable cell ID
advance at most maxCellsPerFrame candidates
terrain -> biome -> shoreline -> presentation -> done
report frames, workSteps, active, completed, pending, progress, per-cell stage
reset scheduler state
```

Current budgets:

```txt
maxCellsPerFrame:          1
terrainRowsPerStep:        1
classificationRowsPerStep: 4
```

### Terrain stage

Registers `cozy.terrain-patch.v2` descriptors without allocating fields. Materialization allocates height, normal, slope, curvature, moisture, exposure, rock exposure, shore distance, and clearing arrays, then fills bounded rows. A runtime handle is published only when all rows complete.

### Biome stage

Registers `cozy.biome-field.v2` descriptors and later derives seven normalized weight channels from the completed terrain arrays. It does not resample the terrain source.

### Shoreline stage

Registers `cozy.shoreline-field.v2` descriptors and later reuses terrain shore-distance values while deriving breaker, wetness, and planar normal arrays in bounded rows.

### Presentation stage

Rebuilds `cozy.render-cell.v2` after required fields are ready and changes its materialization marker from `queued` to `ready`.

## Main finding

The wrapper exports:

```txt
processMaterializationFrame()
getMaterializationState()
```

The live host calls neither. Its renderer loop stops at `updateWorldFocus()` before updating compatibility resources and rendering. The new work therefore does not begin after the first frame, despite the new design document describing that behavior.

The isolated test directly constructs and steps the materializer. It proves:

```txt
registration performs zero terrain samples
lowest-LOD nearest cell advances first
one configured terrain row is sampled per step
partial terrain does not publish a ready handle
two test cells eventually complete
biome and shoreline arrays exist
presentation descriptor becomes ready
released cells leave scheduler state
```

It does not prove route integration, startup timing, a browser frame budget, session/focus epochs, provider exceptions, retries, stale completion rejection, or visible render handoff.

## Domain map

### Platform and route host

Pinned import maps, kit validation, loader/error projection, WebGPU/WebGL2 admission, input listeners, animation loop, page lifecycle, global host, and static compatibility rendering.

### NexusEngine Core World

World identity, uniform-grid partitioning, focus, active-cell selection, provider phases, capability admission, descriptor lifecycle, diagnostics, snapshots, release, rollback, and reset.

### Product world wrapper

Composition creation, provider registration, initial prepare, focus throttling, world snapshot/query projection, compatibility bridge, lazy scheduler construction, materialization stepping, state, reset, and disposal.

### Provider domains

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

### Lazy materialization

Active-cell synchronization, deterministic priority, staged row work, provider runtime stores, readiness state, progress projection, and presentation refresh.

### Semantic world and gameplay

Deterministic clock, terrain, clearing, biome, shoreline, ground contact, paths, vegetation, rocks, props, campfire, camera rail, first-person movement, ocean, foam, wind, weather, illumination, clouds, fog, and aerial perspective.

### Rendering

Static whole-island compatibility graph, WebGPU/WebGL2 adapters, layered grass, ocean, foam, atmosphere volumes, clouds, fog, post-processing, adaptive performance, diagnostics, disconnected cell-render controller, cache, and disposal helpers.

### Validation and deployment

Static/catalog checks, semantic fixtures, fake Core World tests, lazy scheduler fixture, renderer cache/disposal fixtures, and GitHub Pages deployment.

## Services offered by the 50 local kits

```txt
determinism and time:
  stable seed, scoped RNG, hash/noise, deterministic environment clock

terrain and population:
  field sampling, plateau, biome, shoreline, LOD, contact, paths,
  vegetation, rocks, props, campfire

ocean and atmosphere:
  floor, waves, optics, underwater, caustics, glitter, foam,
  wind, weather, illumination, clouds, fog, aerial perspective

render descriptors and adapters:
  quality, materials, archetypes, snapshots, fallback, world, ocean,
  foam, atmosphere, cloud, fog, post, performance, debug

scenario:
  camera rail, first-person input/movement, tick, reset, snapshot
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

## Runtime-implied kits and services

```txt
core-world-runtime-adapter        pinned runtime composition
cozy-world-configuration          world, focus, terrain, budget policy
island-terrain-provider           descriptor registration and row materialization
biome-classification-provider     terrain-array classification
shoreline-classification-provider terrain shore reuse and shoreline arrays
vegetation/rock/prop providers    population descriptors and stores
cell-presentation-provider        queued/ready render-cell descriptors
lazy-cell-materializer            active-cell sync, priority, staged work, progress
cozy-world-query                  semantic queries
legacy-render-snapshot-bridge     compatibility snapshot
renderer-cell-cache               cell resource cache
renderer-resource-disposal        graph resource cleanup
cell-aware-renderer-controller    proposed live cell consumer
browser-input-adapter             wheel, pointer, keyboard, blur, resize
animation-loop-host               per-frame scenario/render scheduling
global-diagnostic-host            CozyIsland readback
```

## Missing materialization authority

```txt
host start admission
sessionId and sessionEpoch
focus/world revision fence
materialization command identity
cell work epoch
elapsed-time budget
provider-stage failure result
retry/backoff policy
stale completion rejection
cell readiness revision
provider readiness set
bounded journal
first-frame start acknowledgement
render handoff result
browser integration fixture
```

## Required composed domain

```txt
cozy-island-lazy-materialization-authority-domain
  -> materialization-frame-command-kit
  -> materialization-admission-kit
  -> materialization-priority-kit
  -> provider-stage-plan-kit
  -> row-work-budget-kit
  -> frame-time-budget-kit
  -> materialization-epoch-kit
  -> stale-cell-work-rejection-kit
  -> provider-stage-result-kit
  -> materialization-failure-kit
  -> materialization-retry-kit
  -> cell-readiness-revision-kit
  -> provider-readiness-set-kit
  -> presentation-readiness-commit-kit
  -> compatibility-render-handoff-kit
  -> materialization-observation-kit
  -> materialization-journal-kit
  -> lazy-materialization-fixture-kit
  -> browser-first-frame-materialization-smoke-kit
```

## Next safe ledge

```txt
MyCozyIsland Lazy Cell Materialization Authority
+ Live Host Admission / Epoch / Readiness Fixture Gate
```

Implement this in the existing product world wrapper and host. Promote only reusable scheduling and readiness primitives into the existing NexusEngine Core World DSK; do not create a parallel world system.
