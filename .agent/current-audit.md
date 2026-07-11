# Current Audit: MyCozyIsland Core World Provider and Render Authority

Last updated: `2026-07-11T05-10-36-04-00`

## Runtime identity

`MyCozyIsland` is a static WebGPU-first scenic exploration route driven by `index.html` and `src/main-cloudform.js?v=core-world-1`.

Pinned runtime inputs:

```txt
Three.js:    0.185.0
NexusEngine: 38229f59c22cb40024ffd13a9f48040de759f5d7
world mode:  core by default
rollback:    ?world=legacy
```

The repository retains 50 local Nexus-style kit descriptors and now coordinates its world through the imported NexusEngine Core World domain.

## Interaction loop

```txt
route load
  -> validate 50 local kit descriptors
  -> initialize WebGPU/WebGL2 backend and quality
  -> create legacy deterministic composition
  -> create Core World engine, world, grid, surface, and providers
  -> prepare the island-centered active cells
  -> bridge active provider rows into one legacy render snapshot
  -> construct sky, lights, world, ocean, foam, cloud, fog, and post resources
  -> install wheel, pointer, keyboard, blur, resize, loader timers, and animation loop
  -> scenario tick and camera projection
  -> update Core World focus from camera position in first-person mode
  -> Core World provider prepare/update/release and portable snapshot
  -> update existing world/foam animation by elapsed time
  -> sample adaptive performance and render post pipeline
  -> publish Core World and host diagnostics
```

Player interaction remains scroll-to-descend, pointer-drag orbit/look, WASD movement inside the central clearing, H diagnostics, blur key clearing, and viewport resize.

## Domain map

### Platform and route host

- static shell, loader, error projection, import map, route startup
- local kit-catalog validation
- WebGPU/WebGL2 backend and startup-quality admission
- browser input, pointer capture, resize, timeouts, animation loop, pagehide, and global host
- missing route-session transaction, rollback, stop, exact disposal, restart, and stale-epoch admission

### Imported NexusEngine Core World

- world registration and identity
- 48 m uniform-grid partition with radius three
- flat world surface used for coordination
- focus and active-cell lifecycle
- ordered provider phases
- portable world snapshots
- diagnostics and reset/dispose entry points

Imported services:

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
createTerrainProviderAdapter
defineWorldEffectProvider
```

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

Provider services include cell array generation, classification, deterministic instance partitioning, portable descriptors, runtime stores, prepare/update/release participation, and provider diagnostics.

### World query and compatibility

- `createCozyWorldQuery()` standardizes height, normal, slope, fields, biome, shoreline, material, surface, water-depth, ground-contact, and cell queries
- `legacy-render-snapshot-bridge` flattens active provider records into the existing render snapshot contract
- global composition fallback preserves current output when active cell rows do not equal the complete population graph

### Authored sequence and gameplay

- camera rail reveal
- first-person central-clearing exploration
- deterministic environment clock
- camera and scenario snapshots
- world focus follows first-person camera at a cell boundary or configured 10 Hz/minimum-movement threshold

### Terrain, world, ocean, and atmosphere

- deterministic seed and noise
- island surface, clearing plateau, terrain fields, biome and shoreline
- terrain LOD, ground contact, path network
- vegetation, rocks, fence, driftwood, props, campfire, and layered grass
- ocean floor, waves, optics, underwater, caustics, glitter, and foam
- wind, weather, illumination, aerial perspective
- cloud and fog semantic descriptors

### Rendering

- Three/WebGPU renderer, scene, camera, sky, lights, shadows
- whole-island stylized world renderer
- WebGPU ocean and foam
- compute/CPU atmosphere volume textures
- volumetric clouds, rolling fog, post pipeline
- performance budget and debug overlay
- renderer-cell cache, disposal helper, and world-cell controller utilities

### Validation and deployment

- static source/catalog checks
- deterministic domain smoke
- world baseline and Core World runtime fixtures
- provider order, query parity, population parity, snapshot portability, and cell lifecycle fixtures
- renderer cell-cache and resource-disposal utility fixtures
- static GitHub Pages deployment

## Services offered by the 50 local kits

```txt
determinism and time:
  stable seed, scoped RNG, hash/noise, deterministic clock

terrain and world:
  surface/field sampling, biome, shoreline, LOD, ground contact, path, vegetation, rocks, props, campfire

ocean and atmosphere:
  floor, waves, optics, underwater, caustics, glitter, foam, wind, weather, illumination, clouds, fog, aerial perspective

render descriptors:
  quality, materials, archetypes, immutable compatibility snapshots, fallback policy

render adapters:
  world, ocean, foam, atmosphere volume generation, cloud, fog, post, performance, debug

scenario:
  camera rail, first-person movement, input state, scenario tick/reset/snapshot
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

## Runtime-implied provider and adapter kits

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

## Main authority gap

Core World advances semantic cell state, but the visible renderer is a one-time compatibility consumer.

```txt
prepare()
  -> worldSnapshot revision 0
  -> createLegacyRenderSnapshot()
  -> createStylizedWorldRenderer(snapshot)

later updateWorldFocus()
  -> worldSnapshot/provider stores may advance
  -> no new compatibility snapshot
  -> no presentation descriptor commit
  -> no cell resource prepare/update/release
  -> no render revision acknowledgement
```

The presentation provider is not the production renderer input. The cell-renderer utilities are not wired to `src/main-cloudform.js`. Current diagnostics expose active-cell counts and provider counts, but not world revision, presentation revision, render revision, fallback kinds, consumed cell IDs, resource deltas, or the last commit result.

## Compatibility risk

The bridge uses provider rows only when flattened instance counts equal the complete global graph. Otherwise, it falls back to the global vegetation, rock, or prop graph. This preserves output but can report Core World mode without proving that cell authority reached rendering.

## Existing lifecycle gap

`pagehide` calls `domains.dispose()`, which resets the Core World domain. It does not clear the renderer animation loop, remove listeners, cancel loader timers, dispose scene/GPU resources, dispose the renderer/backend, or retire `globalThis.CozyIsland`.

## Candidate authority kits

```txt
route-session-state-kit
runtime-session-epoch-kit
resource-registration-kit
startup-rollback-kit
listener-timeout-animation-lease-kit
three-webgpu-disposal-kit
world-revision-kit
provider-result-journal-kit
presentation-descriptor-snapshot-kit
world-render-command-kit
world-revision-admission-kit
cell-render-resource-owner-kit
cell-render-prepare-kit
cell-render-update-kit
cell-render-release-kit
shared-render-resource-registry-kit
render-commit-result-kit
compatibility-render-policy-kit
world-render-correlation-kit
world-render-observation-kit
provider-render-fixture-kit
browser-cell-lifecycle-smoke-kit
```

## Safe implementation boundaries

```txt
1. Runtime Session Lifecycle Authority
2. Core World Render Commit Authority
3. Camera Rail Baseline Authority
4. Dynamic Environment Frame Authority
5. Adaptive Quality Transaction Authority
```

Do not make the cell renderer visibly authoritative until lifecycle ownership, shadow parity, exact resource deltas, and browser WebGPU/WebGL2 proof exist.