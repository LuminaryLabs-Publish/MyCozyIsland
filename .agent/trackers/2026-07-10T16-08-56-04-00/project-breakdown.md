# Project Breakdown: MyCozyIsland Adaptive Quality Transition Authority

Timestamp: 2026-07-10T16-08-56-04-00
Repository: `LuminaryLabs-Publish/MyCozyIsland`
Branch: `main`

## Selection ledger

The complete accessible Publish installation contained ten repositories. All nine eligible non-Cavalry repositories were already tracked centrally and had root `.agent` state. The oldest documented fallback was selected.

```txt
MyCozyIsland       selected / prior 2026-07-10T14-42-01-04-00
TheOpenAbove       tracked / 2026-07-10T14-50-38-04-00
PrehistoricRush    tracked / 2026-07-10T14-59-00-04-00
AetherVale         tracked / 2026-07-10T15-09-26-04-00
IntoTheMeadow      tracked / 2026-07-10T15-18-29-04-00
HorrorCorridor     tracked / 2026-07-10T15-31-03-04-00
PhantomCommand     tracked / 2026-07-10T15-38-40-04-00
ZombieOrchard      tracked / 2026-07-10T15-48-18-04-00
TheUnmappedHouse   tracked / 2026-07-10T15-58-47-04-00
TheCavalryOfRome   excluded by rule
```

No new, ledger-missing, root-`.agent`-missing, recently added undocumented, or otherwise undocumented eligible repository was found.

## Product read

`MyCozyIsland` is a static browser route that composes a deterministic island descriptor graph and consumes it through Three/WebGPU `0.185.0`. It presents a scroll-driven aerial rail that transitions into bounded first-person movement, with WebGPU-first atmosphere volume creation, volumetric clouds, rolling fog, stylized terrain/ocean/vegetation, adaptive performance, and optional diagnostics.

## Interaction loop

```txt
open index.html
  -> load Three/WebGPU import map
  -> import src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate exactly 50 kit manifests
  -> initialize WebGPURenderer
  -> select startup quality from backend, memory, viewport, DPR, motion preference, or URL override
  -> compose deterministic environment, terrain, ocean, vegetation, atmosphere, materials, and render snapshot
  -> create camera rail and scenario
  -> create world, ocean, foam, volume texture, cloud, fog, and post consumers
  -> wheel advances or reverses rail progress
  -> pointer drag changes yaw/pitch and early rail orbit influence
  -> WASD and Shift move inside the clearing after rail completion
  -> blur clears pressed keys
  -> resize updates renderer size and camera aspect
  -> each animation callback derives frameMs and dt
  -> scenario ticks clock and camera sequence
  -> camera consumes scenario render snapshot
  -> world and foam update
  -> performance budget samples frameMs
  -> degrade/recover callback may mutate cloud/fog/post/DPR state
  -> post pipeline submits the frame
  -> debug overlay refreshes every 12 frames when visible
  -> globalThis.CozyIsland exposes live objects and aggregate state
```

## Domains in use

```txt
route-shell
import-map
route-version-token
DOM canvas/loader/error/hint/debug
DomainServiceKit manifest/capability graph
seeded determinism and stable identity
environment clock
wind field
weather state
illumination
aerial perspective
terrain surface and fields
terrain biome
terrain LOD
shoreline signed distance and breaker field
ground contact
path network
ocean floor
wave state
ocean optics
shore foam
underwater atmosphere
ocean caustics
sun glitter
vegetation archetypes
vegetation placement
vegetation wind
vegetation LOD
rock graph
prop graph
campfire atmosphere
cloud weather
cloud density
cloud lighting
cloud LOD
cloud shadow
cloud horizon
fog density
fog advection
fog volume placement
stylized material descriptors
render archetypes
startup quality selection
WebGL2 fallback policy
immutable render snapshot
camera rail
first-person clearing movement
Cozy Island scenario
WebGPU render host
scene and lighting composition
world renderer
ocean renderer
foam renderer
atmosphere volume texture compute/CPU fallback
volumetric cloud renderer
rolling fog renderer
post pipeline
performance budget and hysteresis
inline adaptive quality actuation
input adapter
resize adapter
animation loop
debug overlay
legacy global diagnostics
Node static validation
Node deterministic domain smoke validation
planned frame-cost and transition authority
```

## Services offered by the kits

```txt
catalog validation
  stable IDs, base type, descriptions, capability uniqueness, dependency closure

determinism
  seeded RNG, hashes, value noise, FBM, stable source composition

environment
  clock, wind, weather, illumination, aerial perspective, vegetation wind

terrain
  height/field sampling, biome blending, shoreline, LOD, contact, paths

ocean
  floor, waves, optics, foam, underwater state, caustics, glitter

vegetation
  archetypes, deterministic placement, ground seating, wind, LOD, rocks, props, campfire

atmosphere
  cloud/fog recipes, lighting, shadows, horizon, advection, volume placement

render descriptors
  materials, archetypes, quality policy, fallback policy, immutable snapshot

sequence/gameplay
  rail progress, orbit, first-person movement, scenario tick/reset/render snapshot

render adapters
  world, ocean, foam, volume textures, clouds, fog, post pipeline, debug overlay

performance
  moving average, FPS estimate, over/under-budget hysteresis, degrade/recover callbacks

validation
  static source assertions and deterministic domain composition smoke
```

## Kits

### Source-backed DomainServiceKit manifests

The route contains exactly 50 manifests:

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

### Runtime-implied kits

```txt
webgpu-static-shell-kit
webgpu-importmap-kit
webgpu-route-token-kit
webgpu-render-host-kit
webgpu-quality-selection-kit
webgpu-scene-composition-kit
sky-gradient-kit
lighting-composition-kit
world-render-consumer-kit
ocean-render-consumer-kit
foam-render-consumer-kit
atmosphere-texture-compute-kit
volumetric-cloud-consumer-kit
rolling-fog-consumer-kit
post-pipeline-consumer-kit
performance-budget-consumer-kit
input-consumer-kit
resize-consumer-kit
animation-loop-kit
legacy-CozyIsland-diagnostics-kit
node-static-check-kit
node-domain-smoke-kit
```

## Source-backed performance finding

```txt
renderer option:
  trackTimestamp: true

observed sample:
  frameMs = now - last callback timestamp

sample order:
  scenario tick
  camera projection
  world/foam update
  performanceBudget.sample(frameMs)
  postPipeline.render()

quality actuation:
  cloudRenderer.setStepScale(...)
  fogRenderer.setStepScale(...)
  postPipeline.setFogResolutionScale(...)
  renderer.setPixelRatio(...) only when level > 0
```

The adaptive policy therefore cannot claim direct GPU timing, and full recovery can leave the degraded DPR in place. The policy also has no transition result or complete absolute quality descriptor.

## Plan ledger

### Goal

Make adaptive quality deterministic, reversible, typed, and fixture-backed before changing visual content.

### Checklist

- [x] Compare full Publish inventory against central ledger and root audit state.
- [x] Select one eligible repository only.
- [x] Identify the interaction loop.
- [x] Identify domains, services, and kits.
- [x] Inspect timing, hysteresis, quality actuation, host readback, and current tests.
- [x] Refresh required root `.agent` documents.
- [x] Add a timestamped tracker and turn ledger.
- [x] Add architecture, render, interaction, gameplay, grass, cloud, host-proof, performance, and deploy audits.
- [ ] Implement a pure frame-cost sampler.
- [ ] Implement absolute quality states and reversible application.
- [ ] Add transition results and bounded readback.
- [ ] Add the DOM-free adaptive-quality fixture.
- [ ] Run the fixture and existing `npm test` after runtime implementation.

## Next safe ledge

```txt
MyCozyIsland Adaptive Quality Transition Authority + Frame-Cost Fixture Gate
```

## Validation

Documentation-only. Runtime source, dependencies, route, deployment, branches, and pull requests were unchanged. Existing tests were not run.