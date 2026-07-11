# Current Audit: MyCozyIsland Runtime and Adaptive Quality Authority

Last updated: `2026-07-10T22-29-21-04-00`

## Runtime identity

`MyCozyIsland` is a static WebGPU-first scenic exploration route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

## Interaction loop

```txt
load index.html and import Three/WebGPU
  -> validate exactly 50 DomainServiceKit descriptors
  -> initialize WebGPURenderer
  -> choose backend and startup quality
  -> compose deterministic environment/render snapshot
  -> construct sky, world, ocean, foam, density textures, clouds, fog, and post pipeline
  -> install wheel, pointer, keyboard, blur, and resize listeners
  -> start renderer.setAnimationLoop
  -> scenario.tick(dt)
  -> project camera state
  -> update world and foam
  -> sample frame interval
  -> possibly degrade/recover adaptive quality
  -> render post pipeline
  -> draw periodic diagnostics
  -> expose aggregate CozyIsland state
```

Player interaction is scroll-to-descend, pointer-drag look/orbit, WASD movement after rail completion, Shift speed modifier, H diagnostics, blur key clearing, and resize projection updates.

## Domain map

### Platform and renderer adapters

- WebGPU/WebGL2 renderer host
- debug overlay
- WebGL2 fallback policy
- GPU/CPU atmosphere volume creation
- world, ocean, foam, cloud, fog, and post render consumers
- startup quality selection
- adaptive performance budget
- browser input and resize adaptation
- global host diagnostics

### Authored content and scenario

- camera rail sequence
- cozy-island scenario
- reveal-to-first-person transition
- constrained clearing movement
- campfire exclusion and camera projection

### Environment and world domains

- deterministic seed and environment clock
- wind, weather, illumination, and aerial perspective
- terrain surface, biome field, shoreline, LOD, and ground contact
- ocean floor, waves, optics, underwater atmosphere, caustics, glitter, and foam
- vegetation archetypes, placement, wind, LOD, rocks, props, campfire, and layered grass
- cloud weather, density, lighting, LOD, shadow, and horizon
- fog density, advection, and placement
- render materials, archetypes, quality, fallback, and immutable snapshot

### Missing authority domains

- route runtime-session lifecycle and resource ownership
- adaptive-quality target state
- adaptive-quality transition transaction
- per-control application results and rollback
- quality override admission semantics
- applied-quality observation and transition journal

## Services offered by current kits

```txt
determinism:
  stable seed, scoped RNG, hashes, value noise, FBM

time/environment:
  clock tick/state/reset, wind, weather, illumination, aerial perspective

terrain:
  height and field sampling, biome weights, shoreline distance, ground contact, LOD

ocean:
  floor profile, wave state, optical and underwater descriptors, caustics, glitter, foam contours

vegetation/world:
  archetype catalog, placement graph, wind and LOD descriptors, rocks, props, campfire, layered world rendering

atmosphere:
  cloud/fog recipes, lighting, LOD, shadow, horizon, advection, placement, volume texture creation

render description:
  startup quality selection, material and archetype catalogs, immutable render snapshot, fallback policy

render consumption:
  world/ocean/foam/cloud/fog/post construction, frame update, render submission

scenario/input:
  wheel/drag/key input, rail camera, first-person movement, scenario tick/reset/snapshot

performance/debug:
  moving-average frame sampling, hysteresis, degrade/recover callbacks, overlay projection, aggregate state
```

## Implemented kit inventory

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

## Verified adaptive-quality behavior

`createPerformanceBudget()` owns a three-level state machine: level 0, 1, and 2. It degrades after 90 over-budget samples and recovers after 360 under-budget samples. It exposes only `{ level, movingAverage, fps, target }`.

`applyPerformanceLevel()` applies a transition sequentially:

```txt
activeScale
  -> cloudRenderer.setStepScale()
  -> fogRenderer.setStepScale()
  -> postPipeline.setFogResolutionScale()
  -> renderer.setPixelRatio() only when level > 0
```

Consequences:

- recovery to level 0 restores cloud steps, fog steps, and fog resolution
- recovery to level 0 does not restore the startup pixel ratio
- the budget can report level 0 while the renderer remains degraded
- transition application has no typed result or rollback if one mutation fails
- static `quality.tier` and `quality.source` do not describe the applied dynamic controls
- `?quality=` has no documented runtime-adaptation admission policy
- debug and host state omit the applied pixel ratio, fog-resolution scale, target control row, and transition history

## Safe implementation boundaries

```txt
1. MyCozyIsland Runtime Session Lifecycle Authority
   + WebGPU Resource Disposal Fixture Gate

2. MyCozyIsland Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

The first gate owns construction, stop, disposal, and restart. The second gate makes each dynamic quality transition atomic, reversible, and observable under that host.
