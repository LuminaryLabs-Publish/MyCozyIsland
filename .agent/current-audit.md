# Current Audit: MyCozyIsland Camera Rail Reset Authority

Last updated: `2026-07-11T00-10-28-04-00`

## Runtime identity

`MyCozyIsland` is a static WebGPU-first scenic exploration route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

## Interaction loop

```txt
load route and import Three/WebGPU
  -> validate exactly 50 DomainServiceKit descriptors
  -> initialize WebGPURenderer and startup quality
  -> compose deterministic environment/render snapshot
  -> construct scene, sky, terrain, vegetation, ocean, foam, cloud, fog, and post resources
  -> install wheel, pointer, keyboard, blur, and resize listeners
  -> start renderer.setAnimationLoop
  -> scenario.tick(dt)
  -> environment clock tick
  -> camera rail or first-person state tick
  -> project camera descriptor into Three camera
  -> update world and foam
  -> sample adaptive performance
  -> render post pipeline
  -> publish periodic debug and aggregate host state
```

Player interaction is scroll-to-descend, pointer-drag look/orbit, WASD movement after rail completion, Shift speed modifier, H diagnostics, blur key clearing, and resize projection updates.

## Domain map

### Platform and renderer adapters

- WebGPU/WebGL2 renderer host
- debug overlay
- WebGL2 fallback policy
- GPU/CPU atmosphere volume creation
- world, ocean, foam, cloud, fog, sky, and post render consumers
- startup quality selection and adaptive performance budget
- browser input, animation-loop, loader, error, and resize adapters
- global host diagnostics

### Authored sequence and gameplay domains

- camera rail sequence
- cozy-island scenario
- reveal-to-first-person transition
- constrained clearing movement
- campfire exclusion and camera projection
- scenario clock/reset composition

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
- immutable authored camera-rail baseline
- camera sequence state/readback and typed input results
- deterministic reset transaction and reset fingerprint
- adaptive-quality target, transaction, rollback, and observation

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
  archetype catalog, placement graph, wind and LOD descriptors, rocks, props, campfire, layered rendering

atmosphere:
  cloud/fog recipes, lighting, LOD, shadow, horizon, advection, placement, volume textures

render description/consumption:
  startup quality, material/archetype catalogs, immutable snapshot, fallback policy, world/ocean/foam/cloud/fog/post consumers

scenario/input:
  wheel progress, pointer drag, key state, rail sampling, first-person movement, scenario tick/reset/snapshot

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

## Verified camera-sequence behavior

`createCameraRailSequence()` creates seven authored rail positions and seven look targets. Before progress reaches `0.985`, `input.drag()` changes yaw and pitch and then mutates every position row in `railPositions` by adding an X offset.

`reset()` restores progress, yaw, pitch, pressed keys, and player position, but does not restore the mutated rail positions. `createCozyIslandScenario().reset()` simply calls the clock reset and camera-sequence reset, so scenario reset inherits the incomplete camera reset.

Consequences:

- a pre-transition pointer drag permanently changes the authored rail for that sequence instance
- reset does not reproduce the construction-time camera descriptor
- repeated drag/reset cycles can accumulate path drift
- there is no immutable authored baseline separate from runtime orbit state
- input methods and reset return no typed result
- the descriptor exposes no path fingerprint, revision, reset count, or orbit offset
- the current Node smoke test ticks one frame but never exercises drag/reset fidelity

## Safe implementation boundaries

```txt
1. MyCozyIsland Runtime Session Lifecycle Authority
   + WebGPU Resource Disposal Fixture Gate

2. MyCozyIsland Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

3. MyCozyIsland Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

The lifecycle host should own the scenario instance. Camera reset must then restore a stable authored baseline exactly, and adaptive quality should remain a separate transaction under that host.