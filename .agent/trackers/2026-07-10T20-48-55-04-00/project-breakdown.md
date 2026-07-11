# Project Breakdown: MyCozyIsland Runtime Session and WebGPU Resource Authority

Timestamp: `2026-07-10T20-48-55-04-00`

## Plan ledger

**Goal:** Compare the complete Publish inventory against the central ledger, select one eligible repository, document its interaction loop, domains, services, and kits, and define the next implementation-safe boundary without changing runtime behavior.

- [x] Reviewed all ten accessible Publish repositories.
- [x] Excluded `TheCavalryOfRome`.
- [x] Confirmed all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Selected only `MyCozyIsland` as the oldest eligible documented fallback.
- [x] Read the active HTML route and Three/WebGPU import map.
- [x] Read `main-cloudform.js`, the 50-kit catalog, scenario code, renderer modules, and tests.
- [x] Identified the complete interaction loop.
- [x] Identified all domain groups.
- [x] Identified all services offered by the kits.
- [x] Identified all 50 kits.
- [x] Refreshed required root `.agent` files.
- [x] Added timestamped architecture, render, gameplay, interaction, lifecycle, and deploy audits.
- [x] Changed documentation only.
- [x] Used `main` only and created no branch or pull request.

## Selection comparison

```txt
MyCozyIsland       selected / 2026-07-10T19-11-19-04-00
PrehistoricRush    tracked  / 2026-07-10T19-30-36-04-00
AetherVale         tracked  / 2026-07-10T19-38-41-04-00
IntoTheMeadow      tracked  / 2026-07-10T19-48-39-04-00
TheOpenAbove       tracked  / 2026-07-10T19-58-34-04-00
HorrorCorridor     tracked  / 2026-07-10T20-08-46-04-00
PhantomCommand     tracked  / 2026-07-10T20-19-35-04-00
ZombieOrchard      tracked  / 2026-07-10T20-30-23-04-00
TheUnmappedHouse   tracked  / 2026-07-10T20-38-24-04-00
TheCavalryOfRome   excluded
```

No eligible repository was new, ledger-missing, root-agent-missing, or otherwise undocumented.

## Interaction loop

```txt
page load
  -> import Three/WebGPU 0.185.0
  -> execute main-cloudform.js
  -> validate 50 kit descriptors
  -> initialize renderer and backend
  -> choose quality
  -> compose deterministic domain snapshot
  -> construct scene resources
  -> compute or bake cloud/fog volume textures
  -> create cloud, fog, ocean, foam, world, sky, and post consumers
  -> install wheel/pointer/keyboard/blur/resize listeners
  -> hide loader
  -> setAnimationLoop
  -> scenario tick
  -> rail or first-person camera projection
  -> world and foam update
  -> performance sample/degrade/recover
  -> post render
  -> periodic debug draw
  -> latest aggregate host readback
```

### Player loop

```txt
scroll wheel -> move camera rail progress
pointer drag -> orbit influence during rail / yaw-pitch in first person
WASD -> move after rail completion
Shift -> faster movement
terrain/clearing checks -> accept or reject movement
H -> toggle diagnostics
blur -> clear held keys
```

## Domains in use

### Platform adapters

The route uses ten renderer/host adapters covering diagnostics, fallback, atmosphere compute, ocean, foam, performance, post-processing, fog, world rendering, and clouds.

### Authored sequences

The camera rail owns the reveal-to-first-person transition and input state. The cozy-island scenario advances the deterministic clock and camera sequence and emits render snapshots.

### Large domains

Terrain surface generation owns the field samplers and island shape. Vegetation placement owns deterministic biome/slope/clearing-aware placement.

### Environment domains

Deterministic seed, clock, wind, weather, illumination, aerial perspective, cloud, fog, terrain, shoreline, ocean, vegetation, world-prop, material, quality, and render-snapshot domains are all active.

## Services offered

| Service family | Services |
|---|---|
| Determinism | scoped seeded RNG, hash/unit generation, stable identity |
| Time | deterministic clock tick, snapshot, reset |
| Weather | wind field, weather state, illumination, aerial perspective |
| Terrain | height/field sampling, biome weighting, shoreline distance, LOD, ground contact |
| Ocean | floor profile, wave state, optics, underwater atmosphere, caustics, glitter, foam contours |
| Vegetation | archetypes, placement graph, wind response, LOD, rocks, props, campfire descriptors |
| Atmosphere | cloud/fog density recipes, advection, lighting, LOD, shadow, horizon, placement |
| Render descriptors | backend/quality selection, materials, archetypes, immutable snapshot, fallback policy |
| Render adapters | GPU/CPU volume creation, world/ocean/foam/cloud/fog/post construction, frame submission |
| Sequence/gameplay | rail input, camera state, constrained first-person movement, scenario tick/reset |
| Host | adaptive performance, debug overlay, aggregate latest-state readback |

## All kits

The active catalog contains exactly 50 DomainServiceKit descriptors:

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

## Main finding

The route has a strong descriptor architecture and a functioning WebGPU-first consumer stack, but lifecycle authority remains concentrated implicitly inside `main()`.

```txt
construction: centralized
start: implicit
animation-loop ownership: implicit
listener ownership: implicit
partial-start rollback: absent
stop: absent
dispose: absent
restart: absent
resource ownership proof: partial/absent
host lifecycle readback: absent
```

The gap is broader than the previous grass-specific ownership finding. Every resource family must participate in one route session transaction. The layered grass path should be the first child owner migrated beneath that transaction.

## Next safe ledge

```txt
MyCozyIsland Runtime Session Lifecycle Authority + WebGPU Resource Disposal Fixture Gate
```

## Validation boundary

This was a documentation-only pass. No runtime, dependency, package script, deployment, route, renderer, or visual behavior changed. Tests and browser/GPU checks were not run.
