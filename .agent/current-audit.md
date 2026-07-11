# Current Audit: MyCozyIsland Pinned Core World Contract Parity

Last updated: `2026-07-11T06-50-30-04-00`

## Runtime identity

`MyCozyIsland` is a static WebGPU-first scenic exploration route driven by `index.html` and `src/main-cloudform.js?v=core-world-1`.

```txt
Three.js:          0.185.0
NexusEngine:       38229f59c22cb40024ffd13a9f48040de759f5d7
world mode:        core by default
rollback mode:     ?world=legacy
world id:          world:cozy-island-webgpu-v3
world seed:        cozy-island-webgpu-v2
partition:         48 m uniform grid, radius 3
initial cells:     49
local kit count:   50
Core providers:    7
```

## Interaction loop

```txt
route load
  -> validate 50 local kit descriptors
  -> initialize WebGPU/WebGL2 backend and startup quality
  -> create legacy deterministic semantic composition
  -> import pinned NexusEngine engine and Core World modules
  -> register one world, grid, flat surface and seven ordered providers
  -> prepare 49 island-centered active cells
  -> create one legacy compatibility render snapshot
  -> construct sky, lights, world, ocean, foam, cloud, fog and post resources
  -> register wheel, pointer, keyboard, blur, resize, timers and animation loop
  -> scenario tick and camera projection
  -> update Core World focus from camera position
  -> Core World releases, updates, retains and prepares cells
  -> wrapper reports only changed=true/false
  -> existing world and foam renderers advance by elapsed time
  -> sample performance and render post pipeline
  -> publish live Core World and host objects through globalThis.CozyIsland
```

Player interaction remains scroll-to-descend, pointer-drag orbit/look, WASD movement inside the central clearing, H diagnostics, blur key clearing, and viewport resize.

## Domain map

### Platform and route host

- static HTML shell, loader, error projection, import map and route startup
- local kit-catalog validation
- WebGPU/WebGL2 backend and startup-quality admission
- wheel, pointer, keyboard, blur and resize input
- loader timers, animation loop, performance sampling and global host projection
- missing route-session transaction, rollback, stop, exact disposal, restart and stale-epoch admission

### Imported NexusEngine Core World

- world registration and identity
- uniform-grid partitioning and active-cell selection
- flat world surface coordination
- focus state and cell lifecycle
- ordered provider phases
- capability dependencies and critical-provider admission
- portable effects, snapshots and diagnostics
- rollback of providers prepared earlier in one failed cell
- best-effort release and domain reset

Imported services:

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
createTerrainProviderAdapter
defineWorldEffectProvider
```

### MyCozyIsland world wrapper

- creates legacy semantic composition
- resolves the pinned runtime
- registers Core World and providers
- owns wrapper-local prepared, worldSnapshot, focus accumulator, last focus and last cell key
- commits initial and later focus
- exposes world query, provider stores, presentation descriptors, diagnostics, reset and dispose
- reduces each later focus operation to a Boolean result
- does not expose production provider status, failed cells, selection deltas or a typed focus receipt

### MyCozyIsland provider domains

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

Provider services include deterministic per-cell terrain arrays, classification arrays, population partitioning, prop and campfire rows, portable presentation descriptors, runtime stores, prepare/update/release participation and snapshots.

### World query and compatibility

- `createCozyWorldQuery()` provides height, normal, slope, fields, biome, shoreline, material, surface, water-depth, ground-contact and cell queries
- `legacy-render-snapshot-bridge` flattens active provider records into the old render snapshot contract
- global composition fallback preserves current output when provider rows do not equal the complete population graph

### Authored sequence and gameplay

- camera rail reveal
- first-person central-clearing exploration
- deterministic environment clock
- camera and scenario snapshots
- focus follows first-person camera at cell boundaries or the configured 10 Hz/minimum-movement threshold

### Terrain, world, ocean and atmosphere

- deterministic seed and noise
- island terrain, clearing plateau, terrain fields, biome and shoreline
- terrain LOD, ground contact and path network
- vegetation, rocks, fence, driftwood, props, campfire and layered grass
- ocean floor, waves, optics, underwater, caustics, glitter and foam
- wind, weather, illumination and aerial perspective
- cloud and fog semantic descriptors

### Rendering

- Three/WebGPU renderer, scene, camera, sky, lighting and shadows
- whole-island stylized world renderer
- WebGPU ocean and foam
- compute or CPU atmosphere volumes
- volumetric clouds, rolling fog and post pipeline
- performance budget and debug overlay
- isolated renderer-cell cache, disposal helper and world-cell controller utilities

### Validation and deployment

- source and catalog checks
- deterministic domain smoke
- legacy/Core World baseline and query/population parity fixtures
- provider order, snapshot portability and cell lifecycle fixtures
- isolated renderer cache/disposal fixtures
- static GitHub Pages deployment

## Services offered by the 50 local kits

```txt
determinism and time:
  stable seed, scoped RNG, hash/noise, deterministic clock

terrain and world:
  terrain sampling, fields, biome, shoreline, LOD, ground contact, path, vegetation, rocks, props, campfire

ocean and atmosphere:
  floor, waves, optics, underwater, caustics, glitter, foam, wind, weather, illumination, clouds, fog, aerial perspective

render descriptors:
  quality, materials, archetypes, immutable compatibility snapshots, fallback policy

render adapters:
  world, ocean, foam, atmosphere volumes, cloud, fog, post, performance and debug

scenario:
  camera rail, first-person movement, input state, tick, reset and snapshot
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

## Runtime-implied providers, adapters and hosts

```txt
core-world-runtime-adapter
cozy-world-configuration
island-terrain-provider
biome-classification-provider
shoreline-classification-provider
vegetation-provider
rock-provider
prop-provider
cell-presentation-provider
cozy-world-query
legacy-render-snapshot-bridge
renderer-cell-cache
renderer-resource-disposal
cell-aware-world-renderer-controller
browser-input-adapter
loader-and-error-projection
animation-loop-host
global-diagnostic-host
```

## Production runtime versus test-double contract

The browser and the Node tests do not currently execute the same Core World semantics.

### Pinned production Core World

```txt
partition.selectCells returns:
  required
  retained
  released
  updated

prepare path:
  validate cell
  evaluate provider.matches
  check required capabilities
  execute ordered phases
  normalize portable effect references
  record provider status and diagnostics
  roll back earlier providers inside a failed cell
  commit cell state as active or failed

world update order:
  release removed cells
  update changed cells
  prepare required cells
  retry non-active retained cells
  commit the resulting world state
```

### Local fake runtime

```txt
partition.selectCells returns:
  one bare cell array

update path:
  derive active/released cells inside the fake
  release every provider for removed cells
  update every retained cell
  prepare every new cell
  record every row as active

missing:
  provider.matches
  requires/provides capability admission
  critical-provider semantics
  portable descriptor validation
  provider statuses
  diagnostics
  failed-cell records
  provider-chain rollback
  production selection shape
  snapshot-load reconciliation
```

The existing tests therefore prove the wrapper and providers against a simplified local model, not against the exact runtime shipped through the browser import map.

## Focus transition authority gap

`commitFocus()` performs two separate mutations:

```txt
setFocus()
  -> commits the new focus

updateWorld()
  -> releases old cells first
  -> updates/prepares the next set
  -> may commit failed cell records
```

The wrapper then stores the returned snapshot and `updateWorldFocus()` returns only `true`. It does not distinguish:

```txt
accepted-complete
accepted-degraded
unchanged
rejected-stale
failed-before-commit
failed-after-partial-provider-effects
```

There is no wrapper-level active-cell-set transaction, provider-store checkpoint, rollback receipt, focus revision, failure policy or bounded result journal.

## Initial preparation retry defect

`prepare()` sets `prepared = true` before calling `commitFocus()`.

```txt
first prepare
  -> prepared = true
  -> commitFocus throws
  -> worldSnapshot can remain null

second prepare
  -> sees prepared = true
  -> returns null
  -> does not retry
```

The test double never injects this failure, so the existing suite cannot detect the poisoned startup state.

## Render consequence

The whole-island renderer still consumes only the startup compatibility snapshot. That masks incomplete later provider transitions because the global visual graph remains present.

A future cell-aware renderer would instead need to decide whether a world revision containing failed or missing cells is admissible. Without a typed focus/world result, it could consume an incomplete revision, release prior visible cells, or create holes while diagnostics still report Core World mode.

## Existing lifecycle gap

`pagehide` calls `domains.dispose()`, which resets Core World state. It does not cancel the animation loop, remove listeners, cancel loader timers, dispose the Three/WebGPU graph or backend, or retire the global host.

## Candidate contract-parity and focus-transaction kits

```txt
core-world-runtime-identity-kit
core-world-contract-adapter-kit
focus-command-envelope-kit
focus-admission-kit
focus-transition-stage-kit
active-cell-set-transaction-kit
provider-failure-policy-kit
provider-result-journal-kit
provider-store-checkpoint-kit
focus-rollback-kit
focus-result-kit
world-correlation-kit
pinned-runtime-test-harness-kit
fake-runtime-contract-fixture-kit
production-runtime-failure-fixture-kit
browser-focus-failure-smoke-kit
```

## Safe implementation boundaries

```txt
1. Runtime Session Lifecycle Authority
2. Pinned Core World Contract Parity and Focus Transaction Authority
3. Core World Render Commit Authority
4. Camera Rail Baseline Authority
5. Dynamic Environment Frame Authority
6. Adaptive Quality Transaction Authority
```

Do not make provider cells visibly authoritative until the production runtime contract, failure policy, focus result, lifecycle epoch, resource ownership and browser failure behavior are proven.
