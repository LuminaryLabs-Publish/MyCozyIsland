# Current Audit: MyCozyIsland Dynamic Environment Frame Authority

Last updated: `2026-07-12T03-39-52-04-00`

## Summary

MyCozyIsland does not have one authoritative environment time. `scenario.tick(dt)` advances the repository-owned environment clock, and the host passes that clock's `elapsedSeconds` to the world renderer and shoreline foam. Ocean waves, volumetric cloud detail, and rolling fog instead use Three TSL's renderer-global `time` node.

Environment descriptors are also split between dynamic services and startup snapshots. Wind and illumination can be sampled from the environment clock, but vegetation wind, campfire wind, cloud weather, cloud lighting, cloud shadows, fog advection, and the initial illumination are evaluated once in `createLegacyWorldComposition()` and frozen into the render snapshot.

`scenario.reset()` resets the repository clock to 48 seconds. It does not reset TSL time, rebuild the static descriptors, or publish a new environment generation. The first frame after reset can therefore combine restarted foam, vegetation, and campfire phases with continuing ocean, cloud, and fog phases.

## Plan ledger

**Goal:** document one authoritative path from a committed environment clock through descriptor evaluation, renderer uniforms, reset, diagnostics, and the first visible frame.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `MyCozyIsland` as the oldest eligible synchronized repository.
- [x] Inspect startup composition, scenario tick/reset, environment clock, wind, illumination, atmosphere descriptors, renderer update methods, TSL time use, public host, and tests.
- [x] Identify the complete interaction loop, active domains, 50 cataloged kits, one extra runtime kit, nine providers, and five imported services.
- [x] Confirm world and foam update from scenario elapsed time.
- [x] Confirm ocean, cloud, and fog use renderer-global TSL time.
- [x] Confirm environment descriptors are evaluated once during composition.
- [x] Confirm reset changes only repository clock and camera state.
- [x] Confirm public readback exposes a static `snapshot` beside a dynamic `clock` without one frame identity.
- [x] Define environment frame, clock source, reset, consumer receipt, journal, fixture, and visible-frame contracts.
- [x] Change documentation only.
- [ ] Implement and run the environment frame fixtures.

## Runtime identity

```txt
route:                 index.html -> src/main-cloudform.js?v=foam-depth-camera-1
package:               0.4.1
Three.js:              0.185.0
NexusEngine commit:    481cbf6df742e81279bd42245c4238c6a1fc69f2
world id:              world:cozy-island-webgpu-v4
cataloged kits:        50
runtime kit surfaces:  51
providers:             9
```

## Interaction loop

```txt
startup composition
  -> environment clock starts at 48 seconds
  -> wind field references the clock
  -> illumination service references the clock
  -> illumination is sampled once
  -> vegetation wind is sampled once
  -> campfire wind is sampled once
  -> cloud weather, lighting, shadow, and horizon are sampled once
  -> fog advection is sampled once
  -> render snapshot freezes those values

renderer startup
  -> sky texture, scene fog, exposure, hemisphere, and sun use startup illumination
  -> ocean shader binds Three TSL global time
  -> cloud shader binds Three TSL global time
  -> fog shader binds Three TSL global time

frame
  -> scenario.tick(dt) advances environment clock
  -> scenario snapshot replaces only clock and camera
  -> worldRenderer.update(clock.elapsedSeconds)
  -> foamRenderer.update(clock.elapsedSeconds)
  -> ocean, cloud, and fog evaluate renderer-global time
  -> static sky, lights, and environment descriptors remain unchanged
  -> one post-composited frame mixes these authorities

reset
  -> clock.reset() returns elapsedSeconds to 48
  -> camera reset executes
  -> TSL time continues from renderer lifetime
  -> static descriptor snapshot remains the original object
```

## Source-backed time authorities

```txt
repository environment clock
  source: createEnvironmentClock
  initial time: 48 seconds
  advance: scenario.tick(dt)
  resettable: yes
  consumers: world sway, campfire animation phase, shoreline foam, public clock readback

renderer-global TSL time
  source: three/tsl time
  start: renderer/page lifetime
  advance: renderer internals
  resettable through scenario: no
  consumers: ocean wave displacement and normals, cloud detail drift, fog advection

startup descriptor time
  source: one-time clock and wind sampling during composition
  revision: none
  consumers: illumination, vegetation wind, campfire wind, cloud weather, cloud lighting, cloud shadow, fog advection
```

## Main source-backed finding

`createLegacyWorldComposition()` builds the environment clock and wind field, then immediately samples and freezes:

```txt
illumination
vegetationWind
campfire
cloudWeather
cloudDensity
cloudLighting
cloudShadow
cloudHorizon
fogDensity
fogAdvection
```

`createCozyIslandScenario().getRenderSnapshot()` spreads that frozen startup snapshot and replaces only `clock` and `camera`.

The host then calls:

```txt
worldRenderer.update(renderState.clock.elapsedSeconds)
foamRenderer.update(renderState.clock.elapsedSeconds)
```

But the render shaders use Three TSL global `time` for:

```txt
ocean wave phase
cloud detail coordinates
fog advection offsets
```

The resulting frame has no single environment time or revision.

## Reset divergence

```txt
before reset
  repository clock = 48 + runtime elapsed
  TSL time = renderer lifetime

scenario.reset()
  repository clock = 48
  TSL time = unchanged
  static descriptors = unchanged

first frame after reset
  vegetation/campfire/foam = restarted phase
  ocean/cloud/fog = continuing phase
  sky/lights/fog parameters = original startup values
```

## Public readback gap

`globalThis.CozyIsland` exposes live renderer objects, the static startup `snapshot`, the scenario, and `getState()` with a dynamic clock. It does not expose:

```txt
environmentFrameId
environmentFrameRevision
clockSourceId
clockRevision
resetGeneration
descriptorRevision
consumer receipt set
last committed environment frame
first visible frame acknowledgement
```

## Domains in use

```txt
browser startup, loader, error and debug projection
kit catalog declaration, validation and completeness
logical render graph declaration and validation
physical render pass and proxy-resource construction
WebGPU/WebGL2 backend and quality policy
legacy/Core world mode and lifecycle
Core World grid, focus, providers and materialization
camera rail, first-person input, movement, reset and frame projection
scenario clock, tick, reset and render snapshots
deterministic seed and environment clock
wind, weather, illumination and aerial perspective
vegetation wind and campfire atmosphere
cloud weather, density, lighting, shadow, horizon and LOD
fog density, advection, placement and depth composition
ocean waves, optics, caustics, foam and underwater atmosphere
Three TSL ocean, cloud and fog time evaluation
island, sea floor, biome, shoreline and ground contact
vegetation, rocks, props, grass and paths
render layers, depth, blend and output transform
adaptive performance and resolution
public host, diagnostics, tests and Pages deployment
```

## All implemented kits and offered services

### Catalog-admitted kits: 50

```txt
debug-overlay-host-kit                     diagnostics projection
webgl2-fallback-renderer-kit                fallback rendering policy
webgpu-compute-atmosphere-renderer-kit      atmosphere texture generation
webgpu-foam-renderer-kit                    shoreline foam rendering and animation
webgpu-ocean-renderer-kit                   ocean displacement, normals and optics
webgpu-performance-budget-kit               adaptive frame budget
webgpu-post-processing-renderer-kit         depth, fog, foam and output composition
webgpu-rolling-fog-renderer-kit              volume fog and advection
webgpu-stylized-material-renderer-kit       world materials and animation
webgpu-volumetric-cloud-renderer-kit        cloud volume rendering
camera-rail-sequence-kit                    rail, orbit, landing, reset and FPS input
cozy-island-scenario-kit                    clock tick, camera tick, reset and snapshots
terrain-surface-domain-kit                  island surface
vegetation-placement-domain-kit             deterministic placement graph
aerial-perspective-domain-kit               haze and exposure
campfire-atmosphere-domain-kit               fire, light, embers, smoke and wind descriptor
cloud-density-field-domain-kit              cloud density recipe
cloud-horizon-band-domain-kit               horizon continuation
cloud-lighting-domain-kit                   cloud lighting and extinction
cloud-lod-domain-kit                        texture and ray-step policy
cloud-shadow-domain-kit                     projected shadow policy
cloud-weather-domain-kit                    weather-to-cloud mapping
fog-advection-domain-kit                    wind-derived fog direction and speed
fog-field-domain-kit                        terrain-aware fog density
fog-volume-placement-domain-kit             fog bounds
ground-contact-domain-kit                   terrain seating and rejection
illumination-domain-kit                     sun, sky and exposure
ocean-caustics-domain-kit                   caustic descriptor
ocean-floor-profile-domain-kit              shelf, reef and deep floor
ocean-optics-domain-kit                     absorption, Fresnel and refraction
ocean-wave-domain-kit                       deterministic wave spectrum
prop-archetype-domain-kit                   fence, path, driftwood and clearing
render-archetype-domain-kit                 semantic render mapping
render-quality-domain-kit                   backend and DPR quality selection
render-snapshot-domain-kit                  immutable render aggregation
rock-archetype-domain-kit                   rock graph
shoreline-field-domain-kit                  signed coast field
shoreline-foam-domain-kit                   foam contours and animation parameters
stylized-material-descriptor-domain-kit     palettes and surface parameters
sun-glitter-domain-kit                      glitter lobe
terrain-biome-field-domain-kit              biome weights
terrain-lod-domain-kit                      terrain detail policy
underwater-atmosphere-domain-kit            underwater extinction
vegetation-archetype-domain-kit             vegetation catalog
vegetation-lod-domain-kit                   plant LOD
vegetation-wind-domain-kit                  bend and gust descriptors
weather-state-domain-kit                    stable weather intent
wind-field-domain-kit                       deterministic clock-driven wind
deterministic-seed-domain-kit               scoped random streams
environment-clock-domain-kit                elapsed time, scale, pause and reset
```

### Source-backed runtime kit outside catalog

```txt
cozy-ocean-composition-kit
  -> six-pass logical layer graph
  -> pass order and dependency validation
  -> transparent depth-write validation
  -> terrain handoff validation
  -> per-layer depth and blend contracts
```

### Core World providers: 9

```txt
cozy-island-terrain-provider
cozy-seafloor-terrain-provider
biome-classification-provider
shoreline-classification-provider
seafloor-material-provider
vegetation-provider
rock-provider
prop-provider
cell-presentation-provider
```

### Imported NexusEngine services: 5

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

## Candidate kits

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
admit frame command and predecessor environment revision
  -> advance one canonical environment clock
  -> evaluate wind, illumination, weather-derived and campfire descriptors
  -> create one immutable EnvironmentFrameSnapshot
  -> bind the same canonical time to CPU updates and TSL uniforms
  -> collect ocean, foam, cloud, fog, vegetation, campfire, light and sky receipts
  -> reject stale or partial consumer generations
  -> atomically commit one environment frame revision
  -> submit one visible frame carrying that revision
  -> publish first-visible-environment-frame acknowledgement
```

## Existing tests

The current suite constructs deterministic domains and confirms the scenario clock advances. It does not execute or compare renderer-global TSL time against scenario time.

Not proved:

```txt
all environment consumers use one canonical time
reset restarts every environment phase
static descriptors are regenerated or revisioned
WebGPU and WebGL2 use equivalent environment frame inputs
consumer receipts all cite one environment revision
public readback identifies the committed environment frame
first visible frame after reset cites the new reset generation
```

## Validation boundary

```txt
runtime source changed: no
environment implementation changed: no
render output changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
environment source inspected: yes
existing domain smoke inspected: yes
npm test run: no
new environment fixtures implemented: no
browser environment smoke run: no
```