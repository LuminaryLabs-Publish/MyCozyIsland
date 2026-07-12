# Project Breakdown: MyCozyIsland Dynamic Environment Frame Authority

Timestamp: `2026-07-12T03-39-52-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Summary

MyCozyIsland is a WebGPU-first browser island with a WebGL2 fallback, NexusEngine Core World providers, deterministic terrain and populations, a scroll-driven camera rail, first-person exploration, layered ocean/foam/cloud/fog rendering, adaptive quality, diagnostics, tests, and Pages deployment.

This pass isolates dynamic environment frame coherence. The runtime advances a resettable scenario clock for world and foam animation, while ocean, clouds, and fog use Three TSL global time. Wind, illumination, cloud, fog, vegetation, and campfire descriptors are also sampled once during composition. One visible frame can therefore combine multiple time sources and stale startup descriptors.

## Plan ledger

**Goal:** define one canonical environment-frame transaction across clock advancement, descriptor evaluation, render consumers, reset, diagnostics, and visible output.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` as the oldest eligible synchronized repository.
- [x] Inspect environment, atmosphere, composition, scenario, host, world, ocean, cloud, fog, foam, tests, and public readback.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits and offered services.
- [x] Identify nine Core World providers and five imported NexusEngine services.
- [x] Define the parent DSK and candidate kit composition.
- [x] Add timestamped architecture, render, gameplay, interaction, environment, deploy, and ledger files.
- [x] Update required root `.agent` documents.
- [x] Push documentation only to `main`.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
MyCozyIsland       2026-07-12T02-10-14-04-00  selected
PrehistoricRush    2026-07-12T02-21-55-04-00
TheOpenAbove       2026-07-12T02-29-50-04-00
IntoTheMeadow      2026-07-12T02-38-23-04-00
HorrorCorridor     2026-07-12T02-49-19-04-00
PhantomCommand     2026-07-12T03-00-46-04-00
ZombieOrchard      2026-07-12T03-11-51-04-00
TheUnmappedHouse   2026-07-12T03-21-27-04-00
AetherVale         2026-07-12T03-28-44-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
page startup
  -> validate 50-kit catalog
  -> initialize WebGPU/WebGL2 renderer and quality
  -> create legacy composition and Core World runtime
  -> prepare world cells
  -> freeze startup render snapshot
  -> create sky, lights, terrain, ocean, foam, cloud, fog, post pipeline
  -> install input, resize, loader, animation and pagehide callbacks

camera and world interaction
  -> wheel changes camera progress
  -> drag changes camera view and rail path
  -> first-person keys move inside the clearing
  -> camera position updates Core World focus
  -> lazy materialization progresses after rendering

dynamic environment frame
  -> renderer callback calculates dt
  -> scenario advances environment clock
  -> world and foam update from scenario elapsedSeconds
  -> ocean, cloud and fog shaders evaluate TSL global time
  -> static startup illumination and wind-derived descriptors remain unchanged
  -> post pipeline submits one mixed-time frame

reset surface
  -> public scenario.reset resets environment clock and camera
  -> world and foam phases restart
  -> ocean, cloud and fog phases continue
  -> descriptor snapshot remains unchanged
```

## Main finding

```txt
one canonical time authority: absent
one immutable environment frame: absent
clock source identity and revision: absent
environment reset generation: absent
dynamic descriptor regeneration: absent
canonical TSL time uniform: absent
render consumer receipts: absent
stale or partial frame rejection: absent
visible environment frame acknowledgement: absent
```

## Domains in use

```txt
browser startup, loader, error and debug projection
kit catalog declaration and validation
logical and physical render graph composition
backend and render-quality policy
adaptive performance and resolution
legacy and Core World lifecycle
Core World partition, focus, providers, cells, materialization and query
camera rail, first-person movement and browser input
scenario tick, reset and render snapshots
deterministic seed service
environment clock, pause, time scale and reset
wind field and weather state
illumination and aerial perspective
terrain, biome, shoreline, LOD and contact
sea floor, waves, optics, underwater atmosphere, caustics and glitter
vegetation archetypes, placement, LOD and wind
rocks, props, paths and campfire
cloud weather, density, lighting, LOD, shadow and horizon
fog density, advection and placement
sky texture and environment map
ocean, cloud, fog, foam, world and post render consumers
render layer, depth, blend and output transform
public host, diagnostics, tests and Pages deployment
```

## Implemented kit inventory and services

### Host and renderer kits

```txt
debug-overlay-host-kit
  -> toggleable browser diagnostics
  -> backend, quality, FPS, volumetric step and kit-count projection

webgl2-fallback-renderer-kit
  -> CPU atmosphere-volume fallback
  -> reduced cloud/fog policy and DPR cap

webgpu-compute-atmosphere-renderer-kit
  -> GPU Storage3DTexture cloud and fog density generation

webgpu-foam-renderer-kit
  -> shoreline ribbon geometry
  -> depth-tested transparent foam animation

webgpu-ocean-renderer-kit
  -> transparent ocean surface
  -> TSL wave displacement and normals
  -> optics and render-layer contract

webgpu-performance-budget-kit
  -> moving frame-time average
  -> degrade and recover callbacks

webgpu-post-processing-renderer-kit
  -> ordered physical render passes
  -> depth, fog, water, atmosphere, foam and output composition

webgpu-rolling-fog-renderer-kit
  -> volume fog rendering
  -> TSL time-based advection
  -> adaptive steps and resolution

webgpu-stylized-material-renderer-kit
  -> terrain, sea floor, vegetation, rocks, props, paths and campfire
  -> scenario-time animation for sway and campfire

webgpu-volumetric-cloud-renderer-kit
  -> raymarched hero and horizon clouds
  -> TSL time-based detail drift
  -> adaptive ray steps
```

### Scenario and environment kits

```txt
camera-rail-sequence-kit
  -> authored rail and look points
  -> wheel, drag and key input
  -> rail interpolation, first-person movement and reset

cozy-island-scenario-kit
  -> environment clock tick
  -> camera tick
  -> render snapshot projection
  -> clock and camera reset

deterministic-seed-domain-kit
  -> stable seed and scoped random streams

environment-clock-domain-kit
  -> elapsed seconds, time scale, pause, tick and reset

wind-field-domain-kit
  -> clock-driven direction, strength, gust and turbulence samples

weather-state-domain-kit
  -> stable weather preset values

illumination-domain-kit
  -> clock/weather-derived sun, ambient, sky and exposure

aerial-perspective-domain-kit
  -> horizon tint, extinction and height falloff

vegetation-wind-domain-kit
  -> sampled direction, strength, gust, turbulence and bend policy

campfire-atmosphere-domain-kit
  -> flame, light, ember and wind-responsive smoke descriptors
```

### Terrain, population and ocean kits

```txt
terrain-surface-domain-kit                  island surface and height fields
terrain-biome-field-domain-kit              biome weights
shoreline-field-domain-kit                  signed coast field
terrain-lod-domain-kit                      terrain resolution policy
ground-contact-domain-kit                   surface seating and rejection
ocean-floor-profile-domain-kit              shelf, reef and deep floor
ocean-wave-domain-kit                       deterministic wave spectrum
ocean-optics-domain-kit                     absorption, Fresnel and refraction
underwater-atmosphere-domain-kit            underwater extinction
ocean-caustics-domain-kit                   caustic descriptor
sun-glitter-domain-kit                      highlight lobe
shoreline-foam-domain-kit                   foam contours and animation parameters
vegetation-archetype-domain-kit             vegetation catalog
vegetation-placement-domain-kit             deterministic placement graph
vegetation-lod-domain-kit                   plant LOD
rock-archetype-domain-kit                   rock graph
prop-archetype-domain-kit                   fence, path, driftwood and clearing
```

### Atmosphere kits

```txt
cloud-weather-domain-kit                    weather/wind-to-cloud mapping
cloud-density-field-domain-kit              volume density recipe
cloud-lighting-domain-kit                   cloud color and extinction
cloud-lod-domain-kit                        texture and ray-step policy
cloud-shadow-domain-kit                     shadow descriptor
cloud-horizon-band-domain-kit               horizon continuation
fog-field-domain-kit                        fog density recipe
fog-advection-domain-kit                    wind-derived direction and speed
fog-volume-placement-domain-kit             volume bounds and readability mask
```

### Rendering descriptor kits

```txt
render-archetype-domain-kit                 semantic render mapping
render-quality-domain-kit                   backend and capability tier
render-snapshot-domain-kit                  immutable descriptor aggregation
stylized-material-descriptor-domain-kit     material palette and parameters
```

### Source-backed runtime kit outside the catalog

```txt
cozy-ocean-composition-kit
  -> six-pass logical graph
  -> pass dependency and order validation
  -> depth and blend contracts
  -> terrain handoff validation
```

## Core World providers

```txt
1. cozy-island-terrain-provider
2. cozy-seafloor-terrain-provider
3. biome-classification-provider
4. shoreline-classification-provider
5. seafloor-material-provider
6. vegetation-provider
7. rock-provider
8. prop-provider
9. cell-presentation-provider
```

## Imported NexusEngine services

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
defineWorldEffectProvider
```

## Required parent domain

```txt
cozy-island-dynamic-environment-frame-authority-domain
```

## Candidate DSK composition

```txt
environment-frame-command-kit
environment-frame-id-kit
environment-frame-revision-kit
environment-clock-source-kit
environment-clock-revision-kit
environment-reset-generation-kit
environment-frame-snapshot-kit
dynamic-wind-evaluation-kit
dynamic-illumination-evaluation-kit
dynamic-atmosphere-evaluation-kit
dynamic-campfire-environment-kit
canonical-render-time-uniform-kit
environment-render-plan-kit
environment-consumer-receipt-kit
environment-frame-commit-kit
stale-environment-frame-rejection-kit
environment-frame-observation-kit
environment-frame-journal-kit
environment-clock-source-divergence-fixture-kit
environment-reset-phase-parity-fixture-kit
environment-visible-frame-parity-smoke-kit
```

## Required transaction

```txt
EnvironmentFrameCommand
  -> validate session, runtime generation, reset generation and predecessor revision
  -> advance one canonical clock
  -> evaluate dynamic environment descriptors exactly once
  -> construct immutable EnvironmentFrameSnapshot
  -> update CPU consumers from the snapshot
  -> update GPU uniforms from the same canonical time and descriptors
  -> collect required consumer receipts
  -> reject stale, duplicate or partial results
  -> atomically commit one environment frame revision
  -> submit visible output
  -> publish VisibleEnvironmentFrameAck
```

## Validation boundary

```txt
runtime source changed: no
render source changed: no
environment behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm test: not run
new fixtures: unavailable
browser smoke: not run
Pages smoke: not run
```