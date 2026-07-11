# Project Breakdown: MyCozyIsland Runtime Session Resource Authority

Timestamp: `2026-07-11T04-09-54-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Branch: `main`

## Summary

`MyCozyIsland` has a deterministic 50-kit world and a working WebGPU-first route, but the browser entry point owns startup, listeners, timeouts, animation, renderer resources, global publication, and failure handling as untracked local variables. The next safe implementation is one runtime-session owner with an epoch, startup transaction, explicit resource leases, ordered idempotent disposal, restart, rollback, and bounded JSON readback.

## Plan ledger

**Goal:** document the full route and define one lifecycle authority that can start, stop, dispose, restart, and roll back the WebGPU scene without leaking listeners, loops, timers, textures, geometry, materials, passes, or stale global state.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `MyCozyIsland` by the oldest documented-selection rule.
- [x] Read the route composer, renderer factories, scenario, test scripts, and current audit state.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Identify all 50 declared kits and the services they offer.
- [x] Trace renderer, scene, texture, geometry, material, pass, listener, timeout, animation-loop, and global-host ownership.
- [x] Add timestamped architecture, render, gameplay, interaction, lifecycle, and deployment audits.
- [x] Refresh the required root `.agent` files.
- [x] Change no runtime source, package script, dependency, route, rendering behavior, or deployment configuration.
- [x] Create no branch or pull request.

## Publish inventory comparison

```txt
AetherVale         2026-07-11T02-10-13-04-00
HorrorCorridor     2026-07-11T03-18-44-04-00
IntoTheMeadow      2026-07-11T02-28-12-04-00
MyCozyIsland       2026-07-11T02-02-59-04-00  selected
PhantomCommand     2026-07-11T03-41-49-04-00
PrehistoricRush    2026-07-11T02-48-17-04-00
TheCavalryOfRome   excluded
TheOpenAbove       2026-07-11T03-01-38-04-00
TheUnmappedHouse   2026-07-11T04-00-07-04-00
ZombieOrchard      2026-07-11T03-48-31-04-00
```

All nine eligible repositories were tracked and documented. `MyCozyIsland` had the oldest central ledger timestamp at selection, and its repository head contained only the prior documentation audit after that timestamp. No new, ledger-missing, `.agent`-missing, or recently added undocumented repository took precedence.

## Product and interaction loop

```txt
index.html
  -> Three/WebGPU 0.185.0 import map
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate exactly 50 DomainServiceKit descriptors
  -> create WebGPURenderer and initialize backend
  -> select startup quality
  -> compose deterministic world, environment, terrain, placement, and render snapshot
  -> create camera sequence and scenario
  -> create scene, sky, lights, world, ocean, foam, atmosphere volumes, clouds, fog, and post pipeline
  -> create adaptive performance and debug services
  -> register wheel, pointer, keyboard, blur, and resize listeners
  -> schedule loader-hide timeouts
  -> install renderer animation loop
  -> tick scenario and project camera
  -> update world and foam
  -> sample performance and render post pipeline
  -> publish live renderer/service objects through globalThis.CozyIsland
```

Player interaction is scroll-to-descend, pointer-drag orbit/look, WASD movement after landing, Shift speed, H diagnostics, blur input clearing, and viewport resize.

## Domains in use

```txt
application shell, loader and error projection
kit-catalog validation
WebGPU/WebGL2 renderer admission
runtime initialization and startup sequencing
runtime-session lifecycle and resource ownership gap
browser listener, timeout and animation-loop leases
scene, camera, sky and lighting resources
seeded determinism and environment clock
wind, weather, illumination and aerial perspective
terrain, clearing, biome, shoreline and LOD
path network and ground contact
vegetation, rocks, props, fence, driftwood and campfire
layered grass rendering
ocean floor, waves, optics, underwater, caustics, glitter and foam
cloud weather, density, lighting, LOD, shadow and horizon
fog density, advection and placement
render materials, archetypes, quality and snapshot
world, ocean, foam, cloud, fog and post consumers
camera rail, first-person movement and scenario reset
adaptive performance and debug overlay
global browser-host publication
static, deterministic-domain and deployment validation
```

## Implemented kits

The route declares exactly 50 source-backed kits:

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

## Kit services

```txt
determinism and time:
  stable seed, scoped RNG, hash/noise, clock tick/state/reset

terrain and world:
  natural height, clearing plateau, fields, biome weights, shoreline, LOD,
  ground contact, paths, vegetation, rocks, props, fence, campfire and grass

ocean and atmosphere:
  floor, waves, optics, underwater, caustics, glitter, foam,
  cloud/fog recipes, lighting, LOD, advection, placement and volume generation

render:
  materials, archetypes, immutable source snapshot, world/ocean/foam/cloud/fog/post consumers,
  startup backend/quality selection and adaptive performance callbacks

scenario and interaction:
  camera rail, first-person movement, input state, scenario tick/reset/snapshot

host and validation:
  loader/error/debug projection, aggregate host state, catalog validation,
  deterministic Node smoke and Pages deployment
```

## Resource ownership finding

The route has no object that owns the complete runtime session. `main()` creates the renderer and all downstream resources as local variables, installs anonymous listeners and nested timeouts, starts `renderer.setAnimationLoop()`, publishes live objects globally, and then returns no handle.

```txt
startup side effects
  -> no transaction receipt
  -> no owner registry
  -> no rollback path
  -> no stop operation
  -> no dispose operation
  -> no restart operation
  -> no session epoch
```

Specific ownership gaps:

- `fail(error)` only updates error UI; it cannot undo partial startup.
- Canvas and window listeners use anonymous callbacks, so they cannot be removed by identity.
- Loader completion uses two untracked timeouts.
- The animation loop is never cleared with `renderer.setAnimationLoop(null)`.
- World, grass, ocean, foam, cloud, fog, atmosphere-volume, sky, and post factories expose no common `dispose()` contract.
- Geometry, materials, canvas textures, 3D textures, storage textures, passes, pipeline nodes, shadow maps, and renderer/backend state are not released.
- `globalThis.CozyIsland` exposes live renderer and service objects but no lifecycle state, epoch, stop, dispose, restart, resource counts, or terminal result.
- A second startup in the same page context can create another resource graph without proving the previous graph was retired.

## Proposed DSK boundary

```txt
cozy-island-runtime-session-domain
  -> route-session-state-kit
  -> runtime-session-epoch-kit
  -> startup-transaction-kit
  -> resource-registration-kit
  -> listener-lease-kit
  -> timeout-lease-kit
  -> animation-loop-lease-kit
  -> renderer-resource-owner-kit
  -> three-resource-disposal-kit
  -> atmosphere-volume-disposal-kit
  -> post-pipeline-disposal-kit
  -> global-host-publication-kit
  -> runtime-session-result-kit
  -> runtime-lifecycle-observation-kit
  -> runtime-lifecycle-fixture-kit
  -> browser-webgpu-restart-smoke-kit
```

## Required lifecycle order

```txt
construct session epoch
  -> register startup transaction
  -> acquire renderer/backend
  -> acquire deterministic source graph
  -> acquire scene and render consumers
  -> acquire listeners, timers and animation loop
  -> publish bounded host state
  -> run
  -> freeze new input and frame admission
  -> clear animation loop
  -> remove listeners
  -> clear timeouts
  -> unpublish or tombstone global host
  -> dispose post passes and atmosphere textures
  -> dispose scene graph geometry, materials and textures
  -> dispose renderer/backend
  -> mark epoch disposed
```

Disposal must be idempotent and reverse acquisition order. Startup failure must invoke the same disposal stack for every resource acquired before the error.

## Next safe ledge

```txt
MyCozyIsland Runtime Session Lifecycle Authority
+ WebGPU Resource Disposal and Restart Fixture Gate
```

This remains ahead of camera-baseline, terrain-layer, dynamic-environment, and adaptive-quality authority because every later implementation needs a reliable session owner and teardown path.

## Validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
rendering changed: no
deployment changed: no
branch created: no
pull request created: no
npm test: not run in connector-only documentation pass
browser/WebGPU smoke: not run
lifecycle fixture: unavailable
restart fixture: unavailable
```
