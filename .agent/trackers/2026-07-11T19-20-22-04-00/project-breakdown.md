# Project Breakdown: MyCozyIsland Browser Startup Admission and Failure Rollback

Timestamp: `2026-07-11T19-20-22-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Branch: `main`

## Summary

`MyCozyIsland` performs startup as one long `main()` procedure. It allocates the WebGPU/WebGL2 renderer, Core World runtime, scene graph, atmosphere textures, render systems, post pipeline, performance callbacks, browser listeners, loader timers and animation loop before publishing `globalThis.CozyIsland`.

Any exception is routed to `fail(error)`, which only reports the error in the DOM. It does not retire resources already acquired. `createCozyIslandWorldRuntime().prepare()` also marks the world prepared before committing its initial focus, so a thrown focus/provider update can leave `prepared === true` with no committed world snapshot and make a retry return the poisoned null result.

## Plan ledger

**Goal:** define one startup transaction that admits configuration, records every acquired capability, commits only after a valid first frame, and rolls back partial ownership in reverse order on every failure.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` as the oldest eligible central entry.
- [x] Trace module boot, catalog validation, backend initialization, Core World creation and prepare.
- [x] Trace scene, volume, renderer, post, callback, timer, loop and global-host acquisition.
- [x] Identify startup failure and retry behavior.
- [x] Inventory all domains, providers, kits and services.
- [x] Define the startup admission and rollback parent domain.
- [x] Define failure-injection, rollback-order and first-frame fixture gates.
- [x] Change documentation only.
- [ ] Implement the startup transaction and execute the fixtures.

## Repository selection

The current Publish inventory contains:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome   excluded
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

All nine eligible repositories were present in central tracking and had root `.agent` state. `MyCozyIsland` had the oldest eligible central `Last updated` value at selection: `2026-07-11T17-50-37-04-00`.

## Product interaction loop

```txt
module boot
  -> resolve DOM surfaces
  -> call main()
  -> validate the 50-kit catalog
  -> construct and initialize WebGPURenderer
  -> classify backend and select quality/world mode
  -> create Core World runtime and providers
  -> prepare initial world focus
  -> derive compatibility render snapshot
  -> create scene, camera, sky and lights
  -> create world, ocean and foam renderers
  -> create cloud/fog volume textures
  -> create cloud and fog renderers
  -> create post pipeline and performance budget
  -> install input and resize listeners
  -> schedule loader timers
  -> start animation loop
  -> install pagehide callback
  -> publish global CozyIsland host

startup exception today
  -> main().catch(fail)
  -> log and show error panel
  -> retain every capability acquired before the throw
  -> expose no rollback result or retry-safe baseline
```

## Concrete failure paths

### Partial GPU/runtime ownership

```txt
renderer.init succeeds
  -> world runtime and some render resources are acquired
  -> atmosphere or post construction throws
  -> fail(error) updates only the DOM
  -> renderer/backend, world runtime and prior resources remain live
```

### Poisoned Core World prepare

```txt
prepare()
  -> prepared = true
  -> commitFocus()
  -> provider/Core World update throws
  -> worldSnapshot remains null
  -> prepared remains true
  -> later prepare() returns null without retrying commitFocus()
```

### No committed-start boundary

```txt
animation loop installed
  -> no startup transaction ID
  -> no acquisition ledger
  -> no first-frame acknowledgement
  -> no atomic transition from starting to running
```

## Domains in use

```txt
browser module loading and DOM projection
kit catalog validation and startup configuration
renderer backend initialization and quality selection
Core World construction, provider registration, prepare and focus
runtime session and startup lifecycle
terrain, biome, shoreline, population and presentation providers
camera rail, first-person input and scenario state
scene graph, sky, lighting and fog
world, ocean, foam, cloud and rolling-fog rendering
GPU/CPU atmosphere volume generation
post processing and depth composition
performance sampling and adaptive quality
browser listeners, pointer capture, resize and loader timers
animation-loop ownership and frame projection
diagnostics, static tests and Pages deployment
```

## Providers

```txt
FOUNDATION:      cozy-island-terrain-provider
CLASSIFICATION:  biome-classification-provider
                 shoreline-classification-provider
POPULATION:      vegetation-provider
                 rock-provider
                 prop-provider
PRESENTATION:    cell-presentation-provider
```

## Implemented kits and services

The repository retains 50 source-backed local kits.

```txt
debug-overlay-host-kit                     diagnostics projection
webgl2-fallback-renderer-kit                fallback volume/render behavior
webgpu-compute-atmosphere-renderer-kit      cloud/fog volume generation
webgpu-foam-renderer-kit                    shoreline foam presentation
webgpu-ocean-renderer-kit                   wave displacement and ocean shading
webgpu-performance-budget-kit               frame samples and quality callbacks
webgpu-post-processing-renderer-kit         scene/depth/fog composition
webgpu-rolling-fog-renderer-kit              rolling depth-aware fog
webgpu-stylized-material-renderer-kit       stylized world presentation
webgpu-volumetric-cloud-renderer-kit        bounded cloud raymarching
camera-rail-sequence-kit                    rail, first-person transition and input
cozy-island-scenario-kit                    scenario tick, reset and snapshots
terrain-surface-domain-kit                  height and terrain fields
vegetation-placement-domain-kit             deterministic placement graph
aerial-perspective-domain-kit               haze and horizon descriptors
campfire-atmosphere-domain-kit               fire, embers and smoke descriptors
cloud-density-field-domain-kit              cloud density recipe
cloud-horizon-band-domain-kit               distant cloud descriptors
cloud-lighting-domain-kit                   cloud lighting profile
cloud-lod-domain-kit                        cloud resolution and step policy
cloud-shadow-domain-kit                     projected cloud shadow policy
cloud-weather-domain-kit                    weather-to-cloud mapping
fog-advection-domain-kit                    wind/clock fog motion
fog-field-domain-kit                        fog density recipe
fog-volume-placement-domain-kit             bounded fog placement
ground-contact-domain-kit                   terrain seating and rejection
illumination-domain-kit                     sun, sky, ambient and exposure
ocean-caustics-domain-kit                   caustic descriptor
ocean-floor-profile-domain-kit              shelf, reef and floor surface
ocean-optics-domain-kit                     absorption, Fresnel and refraction
ocean-wave-domain-kit                       multidirectional wave spectrum
prop-archetype-domain-kit                   prop descriptor graph
render-archetype-domain-kit                 semantic render mapping
render-quality-domain-kit                   startup quality selection
render-snapshot-domain-kit                  immutable render aggregation
rock-archetype-domain-kit                   deterministic rock graph
shoreline-field-domain-kit                  coast distance and breaker fields
shoreline-foam-domain-kit                   foam contours and decay
stylized-material-descriptor-domain-kit     palette and material classes
sun-glitter-domain-kit                      view-dependent glitter descriptor
terrain-biome-field-domain-kit              blended biome weights
terrain-lod-domain-kit                      terrain detail and culling policy
underwater-atmosphere-domain-kit            underwater haze and thresholds
vegetation-archetype-domain-kit             plant silhouettes and metadata
vegetation-lod-domain-kit                   vegetation LOD policy
vegetation-wind-domain-kit                  wind bend and gust response
weather-state-domain-kit                    stable weather intent
wind-field-domain-kit                       deterministic wind and turbulence
deterministic-seed-domain-kit               scoped RNG and stable identity
environment-clock-domain-kit                deterministic environment time
```

Imported NexusEngine services:

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
createTerrainProviderAdapter
defineWorldEffectProvider
```

## Required parent domain

```txt
cozy-island-browser-startup-authority-domain
  -> startup-transaction-id-kit
  -> startup-phase-kit
  -> startup-config-admission-kit
  -> backend-init-result-kit
  -> startup-acquisition-ledger-kit
  -> startup-capability-lease-kit
  -> world-prepare-transaction-kit
  -> first-frame-readiness-kit
  -> startup-commit-result-kit
  -> startup-failure-result-kit
  -> startup-rollback-plan-kit
  -> reverse-order-retirement-kit
  -> retry-baseline-kit
  -> startup-observation-kit
  -> startup-journal-kit
  -> startup-failure-injection-fixture-kit
  -> browser-backend-startup-smoke-kit
```

## Required startup transaction

```txt
StartCommand
  -> allocate startupTransactionId
  -> validate catalog, DOM, query configuration and pinned imports
  -> enter STARTING
  -> acquire renderer/backend and record lease
  -> create world runtime and record lease
  -> prepare world through an atomic prepare result
  -> acquire scene and rendering resources one by one
  -> record each callback, timer and animation-loop lease
  -> render and acknowledge the first valid frame
  -> publish clone-safe StartupCommitResult
  -> enter RUNNING

on any failure
  -> freeze new acquisition
  -> classify the failed phase
  -> retire acquired capabilities in reverse dependency order
  -> restore world prepared state and all public surfaces
  -> publish StartupFailureResult plus rollback receipts
  -> enter FAILED_RETRYABLE or FAILED_TERMINAL
```

## Required fixture matrix

```txt
catalog validation failure
renderer constructor/init failure
Core World import/runtime capability failure
provider registration failure
initial focus/update failure
world renderer failure
atmosphere texture failure
cloud/fog renderer failure
post-pipeline failure
listener/timer/loop installation failure
first-frame render failure
rollback order and exactly-once retirement
prepare failure followed by clean retry
WebGPU/WebGL2 result parity
no global host before startup commit
first committed frame matches startup transaction
```

## Ordered implementation queue

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

## Validation status

```txt
runtime source changed: no
render behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm test: not run
browser startup smoke: not run
failure-injection fixtures: unavailable
rollback receipts: unavailable
clean retry proof: unavailable
first-frame startup proof: unavailable
```
