# Current Audit: MyCozyIsland Terrain Clearing Surface Authority

Last updated: `2026-07-11T02-02-59-04-00`

## Runtime identity

`MyCozyIsland` is a static WebGPU-first scenic exploration route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

## Interaction loop

```txt
load route and validate 50 kits
  -> initialize WebGPU/WebGL2 backend and startup quality
  -> compose deterministic seed, environment, terrain, biome, placement, ocean, atmosphere, and render snapshot
  -> construct sky, lights, terrain/world, ocean, foam, cloud, fog, and post resources
  -> install wheel, pointer, keyboard, blur, and resize listeners
  -> renderer animation loop
  -> scenario.tick(dt)
  -> camera rail or first-person clearing movement
  -> world and foam elapsed-time updates
  -> performance-budget sample
  -> post render
  -> debug and `globalThis.CozyIsland` projection
```

Player interaction is scroll-to-descend, pointer-drag orbit/look, WASD clearing movement after landing, Shift speed, H diagnostics, blur key clearing, and viewport resize.

## Domain map

### Platform and renderer adapters

- WebGPU/WebGL2 renderer host and startup fallback
- compute or CPU atmosphere-volume creation
- world, ocean, foam, cloud, fog, sky, post, debug, input, loader, error, resize, and animation-loop adapters
- startup quality and adaptive performance budget
- global browser-host diagnostics

### Authored sequence and gameplay

- camera rail reveal
- first-person clearing exploration
- wheel, pointer, keyboard, blur, and resize input
- scenario clock, camera projection, and reset

### Terrain and world layers

- deterministic seed and coherent procedural noise
- natural island surface and coastal shelf
- terrain-relative clearing plateau
- surface height, normal, slope, curvature, moisture, exposure, rock exposure, shore distance, water, and clearing fields
- biome mixing for wet sand, dry sand, grass, soil, forest floor, moss, and rock
- terrain LOD and grid-mesh consumption
- shoreline field and foam contours
- path network
- ground-contact seating
- vegetation archetypes, deterministic suitability, spacing, and placement
- rock placement
- fence, driftwood, and campfire placement
- layered grass rendering

### Environment and atmosphere

- clock, wind, weather, illumination, and aerial perspective
- ocean floor, waves, optics, underwater atmosphere, caustics, glitter, and foam
- cloud weather, density, lighting, LOD, shadow, and horizon
- fog density, advection, and placement
- render materials, archetypes, quality, fallback, and render snapshot

### Missing authority domains

- route runtime-session lifecycle and resource ownership
- immutable camera-rail baseline and atomic reset
- terrain-clearing descriptor identity, revision, and fingerprint
- terrain-layer consumer admission and application results
- dynamic environment-frame identity and projection
- adaptive-quality target/application/rollback/observation

## Services offered by current kits

```txt
determinism and time:
  stable seed, scoped RNG, hash/noise, clock tick/state/reset

terrain:
  natural-height sampling, clearing plateau flattening, height/normal/field sampling, LOD

biome and shoreline:
  normalized material weights, shoreline signed distance, breaker/wetness, contours

ground contact and placement:
  slope-aware seating, path clearance, spatial spacing, deterministic vegetation/rock/prop graphs

ocean:
  floor, waves, optics, underwater, caustics, glitter, foam contours

vegetation and world:
  archetypes, placement, wind descriptor, LOD, rocks, fence, driftwood, campfire, layered grass

atmosphere:
  weather, illumination, clouds, fog, aerial perspective, compute/CPU volume textures

render and host:
  immutable render snapshot, world/ocean/foam/cloud/fog/post consumers, adaptive performance, debug and host projection

scenario:
  camera-rail sampling, first-person movement, input state, scenario tick/reset/snapshot
```

## Implemented kit inventory

The repository declares exactly 50 source-backed kits:

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

## Verified clearing behavior

`createTerrainSurface()` now separates `naturalHeightAt()` from clearing flattening. It computes one `clearingPlateauHeight` by averaging twelve natural-terrain samples on a ring at `1.32 × clearingRadius`.

```txt
clearingRadius: 17 m
inner full-blend threshold: 13.26 m
blend end: 19.72 m
fence radius: 19.38 m
plateau sample ring: 22.44 m
current test ring: 11.56 m
surface variation amplitude: 0.14 m before noise output scaling
```

The biome field reduces forced clearing soil and preserves more grass. All downstream placement consumers call the same terrain service during startup:

```txt
terrain.sampleHeight/sampleFields
  -> biomeField
  -> groundContact
  -> vegetation graph
  -> rock graph
  -> prop graph
  -> campfire descriptor
  -> render snapshot
  -> terrain grid, paths, props, rocks, vegetation, grass
```

## Main gap

The implementation is deterministic but the plateau is an internal closure value. The route cannot inspect or prove:

- the exact plateau height chosen for a seed
- the twelve source samples and their aggregate
- the blend thresholds and variation budget as a descriptor
- continuity of height, normal, slope, curvature, and biome weights through the transition
- that the fence and campfire were seated against the same terrain revision
- that render geometry consumed the same revision as placement graphs
- that a changed terrain algorithm invalidates stale placement or render snapshots

The current domain smoke samples the center plus twelve points at `0.68 × clearingRadius` and checks variation below `0.5 m`. It does not sample the fence/transition edge, compare placement positions, inspect biome continuity, or correlate terrain generation with render consumption.

## Safe implementation boundaries

```txt
1. Runtime Session Lifecycle Authority
2. Camera Rail Baseline Authority
3. Terrain Clearing Surface Authority
4. Dynamic Environment Frame Authority
5. Adaptive Quality Transaction Authority
```

A future terrain-clearing owner should publish one immutable JSON-safe descriptor containing seed, algorithm revision, source sample ring, plateau height, blend radii, variation policy, and fingerprint. Every biome, placement, contact, and render consumer should return an applied/skipped/rejected row against that terrain revision.
