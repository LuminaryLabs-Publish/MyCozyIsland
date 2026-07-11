# Current Audit: MyCozyIsland Browser Runtime Session Lifecycle

Last updated: `2026-07-11T11-19-10-04-00`

## Summary

The product route owns startup and live browser state directly inside `main()`. It creates the renderer, Core World wrapper, compatibility render graph, volumetric resources, post pipeline, performance/debug services, browser listeners, loader timers, animation loop, and global host without one runtime-session authority.

The preceding reset audit remains valid: Core World reset clears the world definition without re-registration. This pass identifies the parent boundary required to make any recovery safe. The live animation callback has no phase or generation admission, the raw global host exposes mutable runtime and render objects, and `pagehide` disposes only the world wrapper.

## Plan ledger

**Goal:** define one browser-session authority that owns acquisition, callback admission, reset quiescence, startup rollback, complete resource retirement, idempotent disposal, and restart proof.

- [x] Reconcile the full Publish inventory with central tracking.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` because current repo-local state was centrally stale.
- [x] Read the production route, Core World wrapper, latest reset audit, and live render path.
- [x] Identify the interaction loop, domains, kits, and services.
- [x] Inventory listeners, timers, animation-loop work, public-host references, and render resources.
- [x] Verify pagehide calls only world-wrapper disposal.
- [x] Verify reset/dispose remain callable through the raw global host while the loop stays active.
- [x] Define session phases, generation fences, lease ownership, rollback, quiescence, and disposal results.
- [x] Change no runtime behavior.

## Runtime identity

```txt
route:               src/main-cloudform.js?v=core-world-1
Three.js:            0.185.0
NexusEngine commit:  38229f59c22cb40024ffd13a9f48040de759f5d7
world id:            world:cozy-island-webgpu-v3
world seed:          cozy-island-webgpu-v2
partition:           48 m uniform grid, radius 3
initial active cells:49
provider count:      7
local kit count:     50
package version:     0.3.1
```

## Interaction loop

```txt
startup
  -> validate kit catalog
  -> create and initialize WebGPURenderer
  -> choose backend and quality
  -> create Core World runtime
  -> prepare world at origin
  -> snapshot compatibility world
  -> create scene, camera, sky and lights
  -> create world/ocean/foam/cloud/fog/post render resources
  -> create performance and debug services
  -> attach browser listeners
  -> schedule loader timeout chain
  -> install renderer.setAnimationLoop
  -> publish globalThis.CozyIsland

frame
  -> scenario.tick(dt)
  -> read scenario render snapshot
  -> mutate camera
  -> updateWorldFocus
  -> update compatibility world and foam
  -> sample adaptive performance
  -> postPipeline.render
  -> processMaterializationFrame
  -> update debug/global observations

page exit
  -> pagehide callback
  -> domains.dispose only
```

## Main findings

### No authoritative session phase

The route has no `booting`, `running`, `quiescing`, `resetting`, `stopping`, `disposing`, `blocked`, or `disposed` state. Every callback assumes the complete object graph is live.

### Animation callback is not leased

`renderer.setAnimationLoop()` is installed without a session generation check. The route never calls `renderer.setAnimationLoop(null)` during reset, pagehide, failure, or disposal.

### Reset can occur under a live frame

`globalThis.CozyIsland.worldRuntime` exposes the raw wrapper. A same-page caller can invoke `reset()` or `dispose()` while the animation callback continues scenario, camera, render, performance, materialization, and debug work.

After world reset:

```txt
scenario and camera: continue advancing
Core World definition and cells: cleared
prepared flag: false
materializer: cleared
compatibility renderer: still displays startup snapshot
post pipeline: continues submitting
input listeners: remain active
public host: remains mutable
```

### Pagehide is incomplete teardown

`pagehide` calls `domains.dispose()` only. It does not retire:

```txt
renderer animation loop
wheel/pointer/keyboard/blur/resize listeners
loader timeout handles
drag and held input state
scene geometries/materials/textures
world/ocean/foam/cloud/fog renderer resources
cloud and fog volume textures
post-processing pipeline and targets
performance/debug callbacks
renderer and canvas ownership
globalThis.CozyIsland
```

### Startup has no rollback ledger

If startup fails after the renderer, world, volume textures, or listeners are acquired, `main().catch(fail)` projects an error but does not unwind prior acquisitions.

## Domain map

### Platform and route host

Module admission, catalog validation, loader/error DOM, renderer backend selection, quality selection, browser input, resize, animation loop, pagehide, global host, and fatal projection.

### Core World coordination

World registration, partition, surface, focus, active-cell lifecycle, ordered providers, effects, snapshots, reset, and domain disposal.

### Product world wrapper

Legacy composition, provider construction, prepare, focus throttling, lazy materialization, query facade, compatibility snapshot bridge, reset, disposal, and state projection.

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

Deterministic seed/time, terrain, clearing, biome, shoreline, ground contact, paths, vegetation, rocks, props, campfire, camera rail, first-person movement, ocean, foam, wind, weather, illumination, clouds, fog, and aerial perspective.

### Rendering

Compatibility snapshot rendering, whole-island stylized renderer, ocean/foam, volumetric cloud/fog, post-processing, performance adaptation, debug projection, cell-cache utilities, disposal utilities, and disconnected cell-aware rendering.

### Lifecycle and recovery

Startup acquisition, session phase, callback generation, listener/timer/animation leases, reset quiescence, world recovery, renderer retirement, host revocation, stop/dispose idempotency, rollback, and restart proof are currently implicit or absent.

### Validation and deployment

Static catalog checks, deterministic domain smoke, Core World/provider/query/population/snapshot/cell tests, lazy materialization, renderer utilities, and GitHub Pages deployment.

## Services offered by the 50 local kits

```txt
determinism and time
  stable seeds, scoped RNG, identities, deterministic environment clock

terrain and population
  height/normal/slope/curvature/moisture/exposure fields
  plateau, biome, shoreline, LOD, ground contact, paths
  vegetation, rock, prop and campfire placement

ocean and atmosphere
  floor, waves, optics, underwater, caustics, glitter and foam
  wind, weather, illumination, clouds, fog and aerial perspective

render descriptors and adapters
  quality, materials, archetypes and immutable snapshots
  WebGPU/WebGL2 world, ocean, foam, atmosphere, cloud, fog and post
  performance budgeting and debug projection

scenario
  camera rail, first-person movement, tick, reset and snapshot

Core World integration
  grid focus, provider order, cell lifecycle and portable snapshots
  lazy row materialization, query facade and compatibility bridge
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

## Required parent domain

```txt
cozy-island-runtime-session-lifecycle-domain
```

Candidate kits:

```txt
runtime-session-authority-kit
runtime-session-phase-kit
runtime-session-generation-kit
startup-acquisition-ledger-kit
startup-rollback-kit
animation-loop-lease-kit
listener-lease-kit
timer-lease-kit
reset-quiescence-kit
input-retirement-kit
world-session-adapter-kit
renderer-resource-inventory-kit
renderer-retirement-kit
global-host-revocation-kit
idempotent-session-stop-kit
session-disposal-result-kit
session-lifecycle-journal-kit
browser-single-session-fixture-kit
browser-restart-smoke-kit
```

## Required phase flow

```txt
created -> booting -> running
booting -> failed -> disposing -> disposed
running -> quiescing -> resetting -> repreparing -> running
running -> stopping -> disposing -> disposed
recovery failure -> blocked or rollback -> running
```

## Acceptance boundary

A browser session is complete only when one owner accounts for all callbacks and resources, reset retires live work before Core World recovery, a new world/renderer generation is visibly acknowledged before resume, partial startup unwinds, old callback and host references are inert, repeated disposal is idempotent, and terminal results remain readable after all live objects are released.