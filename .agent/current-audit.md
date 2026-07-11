# Current Audit: MyCozyIsland Live Materialization Readiness Commit

Last updated: `2026-07-11T09-08-59-04-00`

## Summary

The production browser route now advances lazy Core World materialization after rendering the compatibility island. Terrain, biome, shoreline, and presentation stages can therefore complete in the live host. The remaining defect is not scheduler activation; it is missing transactional identity, failure containment, provider-version readiness, and visible render consumption.

## Plan ledger

**Goal:** reconcile the newly wired production loop and define the authority required to convert synchronous provider progress into a stable `CellReadinessRevision` and then a committed visible frame.

- [x] Reconcile the full accessible Publish inventory with central tracking.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` due to new undocumented runtime integration.
- [x] Read the route, world wrapper, materializer, presentation provider, descriptor schema, compatibility bridge, renderer cache, and lazy fixture.
- [x] Identify the interaction loop, domains, kits, and services.
- [x] Verify the host now invokes `processMaterializationFrame()` after the second rendered frame.
- [x] Verify the live renderer still consumes only the startup compatibility snapshot.
- [x] Define command, epoch, generation, readiness-set, render-commit, and fixture boundaries.
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
  -> validate local kit catalog
  -> initialize WebGPU/WebGL2 renderer
  -> createCozyIslandWorldRuntime()
  -> prepare()
       Core World registers 49 lightweight cells
       provider stores receive queued descriptors
  -> createLegacyRenderSnapshot()
  -> construct whole-island compatibility graph
  -> construct ocean, foam, cloud, fog, post, input, and diagnostics
  -> start renderer animation loop

frame
  -> calculate frameMs and dt
  -> scenario.tick(dt)
  -> project camera
  -> updateWorldFocus(camera, mode, dt)
  -> update compatibility render uniforms
  -> sample adaptive performance
  -> render compatibility frame
  -> increment frame counter
  -> when frames > 1:
       processMaterializationFrame(camera, mode)
       sync active cells
       select one candidate by LOD, distance, cell ID
       advance terrain, biome, shoreline, or presentation stage
  -> periodically project aggregate materialization counters
```

## Implemented materialization services

`createLazyCellMaterializer()` provides:

```txt
active-cell synchronization
released-state removal
deterministic priority by LOD, focus distance, cell ID
bounded candidate count per call
terrain row stepping
biome row stepping from accepted terrain arrays
shoreline row stepping from accepted terrain fields
presentation descriptor refresh
aggregate frame/work/completion counters
per-cell stage observation
reset
```

Current policy:

```txt
maxCellsPerFrame:          1
terrainRowsPerStep:        1
classificationRowsPerStep: 4
stages: terrain -> biome -> shoreline -> presentation -> done
```

## Main finding

The live integration fixes the previous dead-queue defect, but the helper result is not a durable authority result.

### Identity gap

`processMaterializationFrame()` accepts only position, camera mode, and an optional cell count. It carries no:

```txt
commandId
sessionId or sessionEpoch
worldRevision
focusRevision
cellGeneration
provider descriptor version
frame sequence acknowledgement
```

### Failure gap

Provider calls are synchronous and unguarded. A terrain, biome, shoreline, or presentation exception can escape through the animation callback. There is no typed failure, retry policy, quarantine state, or terminal blocked result.

### Budget gap

The scheduler limits candidate count and provider rows, not elapsed CPU time. A configured row can become more expensive as resolution or provider complexity grows. Materialization runs after the visible render, and its current cost is not correlated with the frame or readiness result that caused it.

### Readiness gap

The presentation provider sets `materialization` to `ready` when terrain, biome, and shoreline records are present, but it does not publish a canonical required-provider version set or a monotonic `cellReadinessRevision`. Vegetation, rock, and prop handles are included without a joined source fingerprint.

### Render-consumption gap

The host builds `worldRenderer` once from `createLegacyRenderSnapshot()` at startup. It never reads:

```txt
getPresentationDescriptors()
provider runtime readiness
renderer-cell-cache
cell-aware renderer controller
cell readiness revision
```

Materialization can complete while the visible scene remains unchanged. Debug counters prove scheduler progress, not render consumption.

## Domain map

### Platform and route host

Pinned import maps, catalog validation, loader/error projection, WebGPU/WebGL2 admission, browser input, resize, animation loop, pagehide callback, performance adaptation, and global diagnostic publication.

### NexusEngine Core World

World registration, uniform-grid partition, surface, focus, active-cell selection, ordered providers, capability admission, effect descriptors, snapshots, diagnostics, release, rollback, and reset.

### Product world wrapper

Legacy semantic composition, Core World runtime resolution, provider creation, prepare, throttled focus updates, query/state projection, compatibility bridge, materializer construction, frame processing, reset, and disposal.

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

### Semantic world and gameplay

Deterministic seed and clock, terrain, clearing, biome, shoreline, ground contact, paths, vegetation, rocks, props, campfire, camera rail, first-person movement, ocean, foam, wind, weather, illumination, clouds, fog, and aerial perspective.

### Rendering

Startup render snapshot, whole-island stylized renderer, layered grass, ocean, foam, volume textures, cloud/fog consumers, post-processing, adaptive quality, diagnostics, renderer cell cache, resource disposal helper, and disconnected cell-aware controller.

### Validation and deployment

Catalog/static checks, deterministic domain smoke, Core World runtime and provider-order tests, query/population parity, snapshot portability, cell lifecycle, isolated lazy materialization, renderer cache/disposal tests, and GitHub Pages deployment.

## Services offered by the 50 local kits

```txt
determinism and time:
  stable seed, scoped RNG, hash/noise, deterministic environment clock

terrain and population:
  height/normal/slope/curvature/moisture/exposure fields
  local plateau, biome and shoreline classification, terrain LOD
  ground contact, paths, vegetation, rocks, props, campfire

ocean and atmosphere:
  floor, waves, optics, underwater, caustics, glitter, foam
  wind, weather, illumination, clouds, fog, aerial perspective

render descriptors and adapters:
  quality, material and archetype descriptors, portable snapshots
  WebGL2 fallback, WebGPU world/ocean/foam/atmosphere/cloud/fog/post
  adaptive performance and debug projection

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

## Imported NexusEngine services

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
createTerrainProviderAdapter
defineWorldEffectProvider
```

## Runtime-implied kits and services

```txt
core-world-runtime-adapter         pinned runtime composition
cozy-world-configuration           world/focus/materialization policy
island-terrain-provider            descriptor and row materialization
biome-classification-provider      terrain-array classification
shoreline-classification-provider  shore-distance reuse and shoreline arrays
vegetation-provider                cell population records
rock-provider                      cell rock records
prop-provider                      prop and campfire records
cell-presentation-provider         queued/ready render-cell descriptors
lazy-cell-materializer             sync, priority, staged work, counters
cozy-world-query                   semantic query facade
legacy-render-snapshot-bridge      startup compatibility snapshot
renderer-cell-cache                prepare/update/release cache
renderer-resource-disposal         graph resource cleanup
cell-aware-world-renderer-controller proposed live cell consumer
browser-input-adapter              wheel, pointer, keyboard, blur, resize
animation-loop-host                scenario, render, materialization scheduling
global-diagnostic-host             CozyIsland readback
```

## Missing authority

```txt
runtime session and epoch
accepted world/focus revision
materialization command/result identity
cell generation
provider source-version set
elapsed-time budget
classified provider failure
retry/backoff/terminal policy
stale completion rejection
cell readiness revision
renderer prepare/update/release transaction
visible-frame acknowledgement
bounded journal and browser fixture
```

## Required composed domain

```txt
cozy-island-live-materialization-readiness-domain
  -> materialization-frame-command-kit
  -> materialization-admission-kit
  -> materialization-epoch-kit
  -> cell-generation-kit
  -> materialization-priority-kit
  -> row-work-budget-kit
  -> frame-time-budget-kit
  -> provider-stage-result-kit
  -> provider-failure-classification-kit
  -> materialization-retry-kit
  -> stale-cell-work-rejection-kit
  -> provider-readiness-set-kit
  -> cell-readiness-revision-kit
  -> presentation-readiness-commit-kit
  -> renderer-cell-plan-kit
  -> renderer-cell-commit-result-kit
  -> visible-frame-acknowledgement-kit
  -> materialization-observation-kit
  -> materialization-journal-kit
  -> live-materialization-fixture-kit
  -> browser-ready-cell-render-smoke-kit
```

## Next safe ledge

```txt
MyCozyIsland Live Materialization Readiness Commit Authority
+ Provider-Version / Render-Consumption Fixture Gate
```

Implement the authority inside the existing world wrapper and route. Promote only reusable generation/readiness primitives into the existing NexusEngine Core World DSK. Keep the compatibility renderer until a cell-render commit can prepare, acknowledge, roll back, and dispose resources deterministically.