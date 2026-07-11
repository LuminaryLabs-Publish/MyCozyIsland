# Current Audit: MyCozyIsland Runtime Session Lifecycle Authority

Last updated: `2026-07-11T07-01-49-04-00`

## Plan ledger

**Goal:** define one authoritative browser runtime session that owns startup, callbacks, Core World work, render resources, global exposure, stop, exact disposal, failure rollback and restart before any later world or render transaction can be trusted.

- [x] Reconcile the current Publish inventory with central tracking.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Trace the complete route interaction and frame loop.
- [x] Catalogue all domains, imported services, local kits and runtime-implied hosts.
- [x] Inventory acquired browser, Core World, Three.js, WebGPU and diagnostic resources.
- [x] Compare success, startup-failure and pagehide cleanup paths.
- [x] Define the required session identity, state, resource lease and teardown contract.
- [x] Change no runtime behavior during this documentation pass.

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
  -> resolve pinned import map
  -> validate 50 local kit descriptors
  -> construct WebGPURenderer
  -> await renderer.init()
  -> choose backend and quality
  -> construct Core World wrapper
  -> await initial 49-cell prepare
  -> create one legacy compatibility snapshot
  -> construct scene, camera, sky and lights
  -> construct whole-island world renderer
  -> construct ocean and foam
  -> await atmosphere volume textures
  -> construct cloud, fog and post resources
  -> construct performance and debug services
  -> register wheel, pointer, keyboard, blur and resize listeners
  -> schedule loader completion and hide timers
  -> start renderer.setAnimationLoop
  -> each frame:
       scenario tick
       camera projection
       Core World focus update
       world and foam update
       performance sample
       post render
       periodic debug projection
  -> register pagehide callback
  -> publish globalThis.CozyIsland
```

Player interaction remains scroll-to-descend, pointer-drag orbit/look, WASD movement inside the clearing, H diagnostics, blur key clearing and viewport resize.

## Domain map

### Platform and route host

- static HTML shell, loader, error panel, import map and route startup
- pinned module admission
- kit-catalog validation
- WebGPU/WebGL2 backend and startup-quality admission
- startup sequencing and fatal projection
- loader timers, animation loop and global host projection
- missing startup transaction, session identity, rollback, stop, restart and stale-epoch admission

### Browser interaction

- canvas wheel input
- pointer capture, drag, release and cancellation
- window keydown, keyup, blur and resize
- loader timeout callbacks
- pagehide callback
- no listener or timer lease registry
- no single remove/cancel result

### Imported NexusEngine Core World

- world registration and identity
- uniform-grid partitioning and active-cell selection
- flat world surface coordination
- focus and cell lifecycle
- provider ordering and capability admission
- portable effects, snapshots and diagnostics
- provider rollback, release and reset

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

- creates the deterministic semantic composition
- resolves the pinned runtime
- registers one world and seven providers
- prepares initial cells and updates focus
- exposes query, provider stores, snapshots, diagnostics, reset and dispose
- owns wrapper-local prepared state, focus accumulator, last focus and last cell key
- dispose resets Core World state only
- no session epoch or stale-command admission

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

Provider services include deterministic per-cell terrain arrays, classification arrays, population partitioning, prop and campfire rows, portable presentation descriptors, runtime stores, prepare/update/release participation and snapshots.

### Scenario and gameplay

- camera rail reveal
- first-person clearing exploration
- deterministic environment clock
- camera and scenario snapshots
- Core World focus follows the first-person camera at cell boundaries or the configured cadence
- no explicit pause, stop or session-finalization state

### Terrain, population, ocean and atmosphere

- deterministic seed and noise
- island terrain, clearing plateau, fields, biome and shoreline
- terrain LOD, ground contact and path network
- vegetation, rocks, fence, driftwood, props, campfire and layered grass
- ocean floor, waves, optics, underwater, caustics, glitter and foam
- wind, weather, illumination and aerial perspective
- cloud and fog semantic descriptors

### Rendering

- Three/WebGPU renderer, scene, camera, sky, lights and shadows
- whole-island stylized world graph
- WebGPU ocean and shoreline foam
- generated cloud and fog volume textures
- volumetric clouds and rolling fog
- render pipeline and post composition
- performance budget and debug overlay
- isolated renderer-cell cache and disposal helpers
- no common live-renderer dispose contract
- no route-level resource registry

### Diagnostics and global exposure

- debug overlay toggled by H
- live mutable resources exposed through `globalThis.CozyIsland`
- getState reads Core World, camera, clock, performance and volumetric state
- no session ID, lifecycle state, ownership counts, disposal result or tombstone
- global object is never deleted or previous value restored

### Validation and deployment

- source and catalog checks
- deterministic domain smoke
- legacy/Core World baseline, query and population parity fixtures
- provider order, portability and cell-lifecycle fixtures
- isolated renderer cache/disposal fixtures
- static GitHub Pages deployment
- no executable startup rollback, stop, dispose, restart or stale-callback fixture

## Services offered by the 50 local kits

```txt
determinism and time:
  stable seed, scoped RNG, hash/noise, deterministic environment clock

terrain and world:
  height, normal, slope, fields, biome, shoreline, LOD, ground contact, path,
  vegetation, rocks, props and campfire descriptors

ocean and atmosphere:
  floor, waves, optics, underwater, caustics, glitter, foam, wind, weather,
  illumination, clouds, fog and aerial perspective

render descriptors:
  quality, materials, archetypes, immutable compatibility snapshots and fallback policy

render adapters:
  world, grass, ocean, foam, atmosphere volume, cloud, fog, post,
  performance and debug projection

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

## Runtime-implied kits and hosts

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

## Acquired-resource inventory

### Browser leases

```txt
canvas wheel listener
canvas pointerdown listener
canvas pointerup listener
canvas pointercancel listener
canvas pointermove listener
window keydown listener
window keyup listener
window blur listener
window resize listener
window pagehide listener
loader completion timeout
loader hide timeout
renderer animation loop callback
globalThis.CozyIsland assignment
```

### Semantic and world resources

```txt
legacy semantic composition
pinned NexusEngine instance
Core World registration
uniform-grid partition
flat world surface
seven provider registrations
seven provider runtime stores
world query and compatibility bridge
scenario and environment clock
```

### Render and GPU resources

```txt
WebGPURenderer and backend
scene and perspective camera
CanvasTexture sky and sphere geometry
hemisphere and directional lights
whole-island world graph
layered-grass atlas, geometry, material and instanced mesh
ocean geometry and node material
foam geometries and materials
cloud and fog volume textures
cloud group and material
fog group, material and render layer
RenderPipeline and pass graph
performance budget and debug overlay
```

## Main lifecycle finding

There is no object that owns the full resource inventory.

`main()` acquires resources in sequence. The only top-level failure path is `main().catch(fail)`, which projects an error but does not cancel callbacks or dispose already-created resources. The global host is published only after the animation loop starts, so a partially constructed session can be live without any public controller capable of stopping it.

The page-exit path is partial:

```txt
pagehide
  -> domains.dispose()
  -> reset Core World state

still live or not explicitly retired:
  renderer animation loop
  input and resize listeners
  loader timers
  scene graph resources
  generated textures
  post pipeline
  renderer/backend
  global host
```

`disposeRendererObject()` can traverse a graph and dispose geometry, materials and textures, but the live route never invokes it. The ocean, foam, cloud, fog, post and world renderer factories do not share one idempotent `dispose()` result. No resource identity ledger prevents duplicate release or proves zero residual resources.

## Failure windows

```txt
renderer constructed, renderer.init rejects
Core World engine/providers created, initial prepare rejects
world graph created, atmosphere texture generation rejects
render resources created, later constructor rejects
listeners installed, setup throws before pagehide registration
animation loop starts, global host publication throws
pagehide occurs while a frame or focus update is executing
future restart starts while old callbacks remain admissible
```

Each window can leave a different subset of resources active because there is no reverse-order cleanup stack.

## Required runtime session state

```txt
sessionId
sessionEpoch
lifecycleState
startCommandId
stopCommandId
startedAt
stoppedAt
backend
quality
worldMode
runtimeCommit
acquisitionSequence
resourceLeaseCount
listenerLeaseCount
timerLeaseCount
animationLoopActive
focusWorkActive
renderSubmitActive
globalLeaseActive
lastFrameId
lastAcceptedFrameId
stopReason
disposalStatus
disposalFailures
resourceFingerprint
recentLifecycleResults
```

Allowed lifecycle states:

```txt
idle
starting
running
stopping
disposing
stopped
failed
```

## Candidate lifecycle kits

```txt
runtime-session-id-kit
runtime-session-state-kit
runtime-session-command-kit
runtime-session-result-kit
runtime-session-owner-kit
startup-acquisition-ledger-kit
reverse-cleanup-stack-kit
listener-lease-kit
timer-lease-kit
animation-loop-lease-kit
session-epoch-admission-kit
frame-generation-fence-kit
focus-work-generation-fence-kit
render-resource-registry-kit
renderer-disposal-adapter-kit
global-exposure-lease-kit
startup-rollback-kit
terminal-disposal-kit
restart-handoff-kit
lifecycle-observation-kit
runtime-lifecycle-journal-kit
runtime-lifecycle-fixture-kit
browser-restart-smoke-kit
```

## Required disposal order

```txt
close command admission
  -> advance session epoch
  -> stop renderer animation loop
  -> reject old frame/focus/render callbacks
  -> cancel loader timers
  -> remove listeners
  -> retire global host lease
  -> stop scenario and Core World admission
  -> dispose post and atmosphere resources
  -> dispose foam, ocean and world graphs
  -> dispose generated textures
  -> dispose renderer/backend
  -> reset/dispose Core World
  -> publish structured disposal result
```

The exact order may change during implementation, but it must be explicit, idempotent and fixture-proven.

## Existing second-order Core World gap

The browser uses the pinned production Core World runtime while Node fixtures inject a simpler fake. The fake omits production selection deltas, capability admission, critical failure, diagnostics, failed-cell states and rollback. `prepare()` can also poison retries by setting `prepared = true` before `commitFocus()` succeeds, while `updateWorldFocus()` collapses all outcomes to Boolean.

This remains the second infrastructure slice after lifecycle authority.

## Safe implementation boundaries

```txt
1. Runtime Session Lifecycle Authority
2. Pinned Core World Contract Parity and Focus Transaction Authority
3. Core World Render Commit Authority
4. Camera Rail Baseline Authority
5. Dynamic Environment Frame Authority
6. Adaptive Quality Transaction Authority
```

Do not make provider cells visibly authoritative until session ownership, exact disposal, production-runtime parity, typed focus results and render admission are proven.
