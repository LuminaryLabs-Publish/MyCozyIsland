# Current Audit: MyCozyIsland Dynamic Environment Frame Authority

Last updated: `2026-07-11T01-50-30-04-00`

## Runtime identity

`MyCozyIsland` is a static WebGPU-first scenic exploration route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

## Interaction loop

```txt
load route and validate 50 kits
  -> initialize WebGPU/WebGL2 backend and startup quality
  -> compose deterministic seed, clock, weather, wind, illumination, world, and atmosphere
  -> freeze one render snapshot
  -> construct sky, lights, world, ocean, foam, cloud, fog, and post resources
  -> install wheel, pointer, keyboard, blur, and resize listeners
  -> renderer animation loop
  -> scenario.tick(dt)
  -> environment clock and camera sequence tick
  -> scenario projects startup snapshot + current clock + current camera
  -> world and foam update from elapsed seconds
  -> performance budget samples render cadence
  -> post pipeline renders
  -> debug and `globalThis.CozyIsland` expose aggregate state
```

Player interaction is scroll-to-descend, pointer-drag orbit/look, WASD clearing movement after landing, Shift speed, H diagnostics, blur key clearing, and viewport resize.

## Domain map

### Platform and renderer adapters

- WebGPU/WebGL2 renderer host and startup fallback
- compute or CPU atmosphere volume creation
- stylized world, ocean, foam, cloud, fog, sky, post, debug, input, loader, error, resize, and animation-loop adapters
- startup quality and adaptive performance budget
- global browser-host diagnostics

### Authored sequence and gameplay

- camera rail reveal
- first-person clearing exploration
- wheel, pointer, keyboard, and blur input
- scenario clock, camera projection, and reset

### World and environment

- deterministic seed and clock
- wind, weather, illumination, aerial perspective
- terrain, biome, shoreline, ground contact, and terrain LOD
- ocean floor, waves, optics, underwater atmosphere, caustics, sun glitter, and foam
- vegetation archetypes, placement, wind intent, vegetation LOD, rocks, props, layered grass, and campfire
- cloud weather, density, lighting, LOD, shadow, and horizon
- fog density, advection, and placement
- render materials, archetypes, quality, fallback, and render snapshot

### Missing authority domains

- route runtime-session lifecycle and resource ownership
- immutable camera-rail baseline and atomic reset
- dynamic environment-frame identity and projection
- environment consumer admission, application, and staleness observation
- adaptive-quality target/application/rollback/observation

## Services offered by current kits

```txt
determinism and time:
  stable seed, scoped RNG, hash/noise, environment clock tick/state/reset

environment:
  live wind sampling, weather preset, live illumination sampling, aerial perspective

terrain and shoreline:
  height/field/biome/shore sampling, placement contact, terrain LOD

ocean:
  floor, waves, optics, underwater, caustics, glitter, foam contours

vegetation and world:
  archetypes, deterministic placement, wind descriptor, LOD, rocks, props, campfire

atmosphere:
  cloud weather/density/lighting/LOD/shadow/horizon
  fog density/advection/placement
  compute or CPU volume textures

render and host:
  immutable render snapshot
  world/ocean/foam/cloud/fog/post consumers
  startup quality and sustained-frame performance sampling
  debug and aggregate host projection

scenario:
  rail sampling, first-person movement, input state, scenario tick/reset/snapshot
```

## Implemented kit inventory

The repository still declares exactly 50 source-backed kits:

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

## Verified temporal behavior

`createEnvironmentClock()` advances `elapsedSeconds` every scenario tick. `createWindField()` and `createIlluminationState()` are live services because each read queries the current clock.

`createDomainSnapshot()` then samples and freezes clock-derived outputs during startup:

- `illuminationService.getState()`
- `createVegetationWindDescriptor(windField)`
- `createCampfireAtmosphereDescriptor(terrain, windField)`
- `createCloudWeatherState(weather, windField)`
- `createCloudLightingProfile(illuminationService)`
- `createFogAdvectionDescriptor(windField)`

`createRenderSnapshot()` freezes those descriptors. `createCozyIslandScenario().getRenderSnapshot()` spreads the frozen snapshot and replaces only `clock` and `camera`.

The browser loop advances the scenario, then updates only the camera, generic world elapsed-time animation, foam elapsed-time animation, performance budget, and post render. It does not request or apply a new illumination/wind/environment frame.

## Consumer consequences

- sky gradient texture is built once
- hemisphere light, sun light, shadow configuration, exposure, and scene fog are configured once
- cloud lighting values are captured once
- fog wind direction and speed uniforms are captured once
- cloud drift, cloud shadow drift, vegetation wind, and campfire smoke wind are captured once
- world vegetation sway uses generic sine waves instead of current wind samples
- shader `time` animates presentation without proving semantic wind/illumination freshness
- scenario reset changes the clock but provides no environment-frame reset/application result
- host readback exposes clock but no environment frame ID, revision, source time, consumer rows, or staleness

## Current proof surface

`tests/domain-smoke.mjs` composes two startup snapshots, checks deterministic static data, ticks one scenario frame, and asserts only that clock time increased and the camera remains in rail mode. It never compares two environment frames or proves that clock-driven consumer state changes, resets, or is applied.

## Safe implementation boundaries

```txt
1. Runtime Session Lifecycle Authority
2. Camera Rail Baseline Authority
3. Dynamic Environment Frame Authority
4. Adaptive Quality Transaction Authority
```

A future environment-frame owner should publish one immutable JSON-safe frame per committed simulation tick or declared lower-frequency cadence. Render consumers should return applied/skipped/rejected rows against that frame ID. Presentation can retain shader-time animation, but it must not substitute for semantic state provenance.
