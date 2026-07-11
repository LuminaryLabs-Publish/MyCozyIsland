# Project Breakdown: MyCozyIsland Dynamic Environment Frame Authority

Timestamp: `2026-07-11T12-58-06-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Summary

MyCozyIsland advances an environment clock every frame, but most environment consumers are built from one startup sample. Illumination, vegetation wind, campfire smoke wind, cloud weather/lighting/shadow, fog advection and the immutable render snapshot do not share a live frame identity or commit result.

The visible route therefore has multiple notions of time: the clock advances, ocean/foam and generic sway use elapsed seconds, while sun/sky/exposure, wind-derived descriptors, cloud/fog descriptors and campfire wind remain frozen at startup.

## Plan ledger

**Goal:** define one deterministic EnvironmentFrame that every dynamic world and render consumer prepares, commits, observes and acknowledges under the same clock/session revision.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` because its repo-local adaptive-quality audit was newer than central tracking.
- [x] Trace clock, wind, weather, illumination, cloud, fog, campfire, vegetation, ocean, foam and render consumers.
- [x] Identify the interaction loop, all domains, all 50 local kits and their services.
- [x] Confirm the scenario snapshot updates only clock and camera while environment descriptors remain startup-frozen.
- [x] Define frame identity, consumer transaction, reset baseline, render acknowledgement and fixture boundaries.
- [x] Change no runtime, rendering, package or deployment behavior.
- [x] Push documentation directly to `main` without a branch or pull request.

## Selection comparison

```txt
MyCozyIsland      central 2026-07-11T11-19-10-04-00 / repo-local 2026-07-11T12-50-35-04-00 / selected
TheOpenAbove      2026-07-11T11-31-06-04-00
HorrorCorridor    2026-07-11T11-39-11-04-00
PhantomCommand    2026-07-11T11-51-06-04-00
ZombieOrchard     2026-07-11T12-01-38-04-00
TheUnmappedHouse  2026-07-11T12-08-47-04-00
AetherVale        2026-07-11T12-18-42-04-00
IntoTheMeadow     2026-07-11T12-29-49-04-00
PrehistoricRush   2026-07-11T12-39-53-04-00
TheCavalryOfRome  excluded
```

## Interaction loop

```txt
startup
  -> create deterministic seed and environment clock
  -> create dynamic wind and illumination services
  -> sample illumination once
  -> sample vegetation wind once
  -> sample campfire wind once
  -> derive cloud weather/lighting/shadow once
  -> derive fog advection once
  -> freeze one render snapshot
  -> construct scene lights, sky, world, ocean, foam, cloud, fog and post consumers

frame
  -> tick clock and camera
  -> scenario returns static snapshot + current clock + current camera
  -> update Core World focus
  -> animate world and foam from elapsedSeconds
  -> sample adaptive performance
  -> render
  -> materialize cells

reset
  -> rewind clock and camera
  -> no environment frame revision
  -> no consumer prepare/commit/reset acknowledgement
```

## Domains in use

```txt
browser route, loader, errors, listeners, timers, animation loop and global host
renderer backend and startup quality admission
runtime session and resource lifecycle
Core World registration, partition, providers, focus, materialization and query
terrain, clearing, biome, shoreline, paths and ground contact
vegetation, rocks, props and campfire population
seed, environment clock, wind, weather and illumination
cloud weather, density, lighting, LOD, shadow and horizon
fog density, advection and placement
ocean floor, waves, optics, caustics, glitter, foam and underwater atmosphere
camera rail, first-person movement and scenario state
static render snapshots and compatibility rendering
world, ocean, foam, cloud, fog and post consumers
adaptive performance and debug projection
dynamic environment frame authority, reset and visible-frame proof
validation and Pages deployment
```

## Implemented kits and services

### Rendering and host kits

```txt
debug-overlay-host-kit                  debug projection
webgl2-fallback-renderer-kit            fallback capability policy
webgpu-compute-atmosphere-renderer-kit  cloud/fog volume creation
webgpu-foam-renderer-kit                foam geometry and animation
webgpu-ocean-renderer-kit               ocean geometry, optics and animation
webgpu-performance-budget-kit           EMA sampling and quality callbacks
webgpu-post-processing-renderer-kit     scene/fog/blur/output composition
webgpu-rolling-fog-renderer-kit         fog volumes and step scaling
webgpu-stylized-material-renderer-kit   world materials and instances
webgpu-volumetric-cloud-renderer-kit    cloud volumes and step scaling
camera-rail-sequence-kit                rail, drag and first-person camera
cozy-island-scenario-kit                clock/camera tick and render snapshot
```

### Domain kits

```txt
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

### Imported and runtime-implied services

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
createTerrainProviderAdapter
defineWorldEffectProvider
core-world runtime adapter
seven ordered providers
lazy cell materializer
world query and legacy snapshot bridge
renderer cell cache and disposal
cell-aware renderer controller
browser input, loader, loop and diagnostics
adaptive-quality callback host
```

## Main finding

```txt
environment clock: live
clock revision/id: absent
wind service: live when sampled
weather state: immutable preset
illumination service: live when sampled
scenario environment projection: startup-frozen
vegetation wind descriptor: startup-frozen
campfire smoke wind: startup-frozen
cloud weather/lighting/shadow: startup-frozen
fog advection: startup-frozen
sun/sky/exposure consumers: startup-frozen
ocean/foam/world animation: elapsed-time driven
shared EnvironmentFrame: absent
consumer prepare/commit/rollback: absent
consumer acknowledgement: absent
reset baseline result: absent
visible-frame acknowledgement: absent
```

`createLegacyWorldComposition()` samples illumination and wind-derived descriptors once, then freezes the render snapshot. `createCozyIslandScenario().getRenderSnapshot()` spreads that static snapshot and replaces only `clock` and `camera`.

The browser frame uses `elapsedSeconds` for world and foam animation, but does not query a new illumination, wind, cloud or fog state. The scene's sky, hemisphere light, directional light and exposure are constructed once. Campfire smoke continues using the wind direction captured at startup.

## Required parent domain

```txt
cozy-island-dynamic-environment-frame-authority-domain
```

Candidate kits:

```txt
environment-frame-schema-kit
environment-frame-id-kit
environment-clock-sample-kit
environment-frame-admission-kit
wind-frame-kit
weather-frame-kit
illumination-frame-kit
cloud-environment-frame-kit
fog-environment-frame-kit
ocean-environment-frame-kit
vegetation-wind-frame-kit
campfire-smoke-frame-kit
environment-consumer-plan-kit
environment-consumer-prepare-kit
environment-consumer-commit-kit
environment-consumer-rollback-kit
environment-frame-result-kit
environment-frame-fingerprint-kit
environment-frame-ack-kit
environment-reset-baseline-kit
environment-frame-journal-kit
environment-consumer-coherence-fixture-kit
environment-reset-replay-fixture-kit
browser-environment-frame-smoke-kit
```

## Required flow

```txt
ClockSample
  -> validate session, generation, monotonic tick and reset baseline
  -> derive immutable EnvironmentFrame
  -> assign frame id, revision and fingerprint
  -> build consumer plan
  -> prepare sky/light/exposure/wind/cloud/fog/ocean/foam/vegetation/campfire consumers
  -> commit all or rollback all
  -> render one frame
  -> collect consumer and visible-frame acknowledgement
  -> publish detached EnvironmentFrameResult and bounded journal row
```

## Ordered implementation queue

```txt
1. Runtime Session Lifecycle Authority
2. Core World Reset / Re-prepare Authority
3. Pinned Core World Focus Transaction Authority
4. Live Materialization Readiness Commit Authority
5. Core World Render Commit Authority
6. Camera Rail Baseline Authority
7. Dynamic Environment Frame Authority
8. Adaptive Quality Transaction Authority
```

## Validation

```txt
runtime source changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm test: not run
browser/WebGPU smoke: not run
environment coherence fixture: unavailable
environment reset replay fixture: unavailable
visible-frame acknowledgement fixture: unavailable
```
