# Current Audit: MyCozyIsland Runtime Session Resource Authority

Last updated: `2026-07-11T04-09-54-04-00`

## Runtime identity

`MyCozyIsland` is a static WebGPU-first scenic exploration route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

## Interaction loop

```txt
load route and validate 50 kits
  -> initialize WebGPU/WebGL2 backend and startup quality
  -> compose deterministic seed, environment, terrain, biome, placement, ocean, atmosphere and render snapshot
  -> construct sky, lights, terrain/world, ocean, foam, cloud, fog and post resources
  -> install wheel, pointer, keyboard, blur and resize listeners
  -> schedule loader-hide timeouts
  -> renderer animation loop
  -> scenario.tick(dt)
  -> camera rail or first-person clearing movement
  -> world and foam elapsed-time updates
  -> performance-budget sample
  -> post render
  -> debug and global host projection
```

Player interaction is scroll-to-descend, pointer-drag orbit/look, WASD clearing movement after landing, Shift speed, H diagnostics, blur key clearing, and viewport resize.

## Domain map

### Runtime and platform

- application shell, loader, error and route startup
- kit-catalog validation
- WebGPU/WebGL2 backend and startup-quality admission
- browser input, pointer capture, viewport resize and frame scheduling
- loader timeouts and global-host publication
- missing runtime-session lifecycle, epoch, startup transaction, rollback, stop, disposal and restart authority

### Render resources

- WebGPURenderer and backend
- scene, camera, sky, lights and shadow resources
- world, ocean, foam, cloud, fog and post consumers
- 2D canvas texture, 3D/storage textures and compute nodes
- geometry, materials, instancing, passes, pipeline nodes and uniforms
- adaptive performance and debug overlay
- missing resource registry, common dispose contract and resource-count observation

### Authored sequence and gameplay

- camera rail reveal
- first-person clearing exploration
- wheel, pointer, keyboard, blur and resize input
- scenario clock, camera projection and reset

### Terrain and world layers

- deterministic seed and coherent procedural noise
- natural island surface and coastal shelf
- terrain-relative clearing plateau
- height, normal, slope, curvature, moisture, exposure, rock exposure, shore distance, water and clearing fields
- biome mixing for wet sand, dry sand, grass, soil, forest floor, moss and rock
- terrain LOD and grid-mesh consumption
- shoreline field and foam contours
- path network and ground contact
- vegetation, rocks, fence, driftwood, campfire and layered grass

### Environment and atmosphere

- clock, wind, weather, illumination and aerial perspective
- ocean floor, waves, optics, underwater atmosphere, caustics, glitter and foam
- cloud weather, density, lighting, LOD, shadow and horizon
- fog density, advection and placement
- render materials, archetypes, quality, fallback and render snapshot

### Ordered missing authority domains

1. route runtime-session lifecycle and resource ownership
2. immutable camera-rail baseline and atomic reset
3. terrain-clearing descriptor identity, revision and consumer proof
4. dynamic environment-frame identity and projection
5. adaptive-quality target/application/rollback/observation

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
  immutable source snapshot, world/ocean/foam/cloud/fog/post consumers,
  adaptive performance, debug overlay and live global host projection

scenario:
  camera-rail sampling, first-person movement, input state, scenario tick/reset/snapshot

validation and deploy:
  static catalog/source checks, deterministic domain smoke and Pages artifact
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

## Runtime ownership matrix

```txt
resource or side effect                 acquired by                         current release
WebGPURenderer                          main()                              none
animation loop                          renderer.setAnimationLoop           none
scene/camera                            main()                              none
sky texture/material/geometry           createSky                           none
lights/shadow resources                 main()                              none
world resources                         createStylizedWorldRenderer          none
layered grass atlas/geometry/material   inner grass renderer                handle discarded, no dispose
ocean resources                         createWebGPUOceanRenderer            none
foam resources                          createWebGPUFoamRenderer             none
cloud resources                         createVolumetricCloudRenderer        none
fog resources                           createRollingFogRenderer             none
3D/storage textures and compute nodes   createAtmosphereVolumeTextures      none
post passes/pipeline                    createWebGPUPostPipeline             none
performance callbacks                   createPerformanceBudget              none
debug overlay state                     createDebugOverlay                   none
canvas/window listeners                 anonymous route callbacks            none
loader timeouts                         anonymous nested timeouts             none
global host                             globalThis.CozyIsland assignment      no unpublish/tombstone
```

## Main gap

The route has deterministic source composition but no deterministic runtime-session lifecycle.

`main()` acquires every runtime resource as local state and returns no owner handle. `fail()` reports an error but cannot roll back resources already acquired. The route has no `stop()`, `dispose()`, `restart()`, session epoch, resource journal, listener/timer lease registry, animation-loop release, stale-callback admission, global-host retirement, or bounded lifecycle readback.

Renderer factories expose partial operational handles but no common `dispose()` contract. A repeated startup in one page context can create a second scene and resource graph without proving that the first loop, listeners, timeouts, textures, materials, geometry, passes, pipeline resources and renderer backend were retired.

## Required lifecycle contract

```txt
idle -> starting -> running -> stopping/stopped -> disposing/disposed
                    \-> rolling-back -> failed

disposed/failed/stopped -> restart -> new sessionEpoch -> starting
```

A future owner must:

- allocate a monotonic session epoch
- register every acquisition with a reverse-order release closure
- commit startup only after the complete required graph is ready
- invoke the same release stack on partial startup failure
- freeze input and frame admission before teardown
- clear animation loop, listeners and timeouts
- retire global host publication
- dispose post, atmosphere, scene and renderer resources exactly once
- expose bounded JSON-safe state and recent results
- reject stale callbacks and commands from previous epochs
- prove deterministic semantic restart and fresh runtime resource identity

## Candidate authority kits

```txt
route-session-state-kit
runtime-session-epoch-kit
runtime-command-admission-kit
startup-transaction-kit
resource-registration-kit
startup-rollback-kit
listener-lease-kit
timeout-lease-kit
animation-loop-lease-kit
renderer-resource-owner-kit
three-resource-disposal-kit
atmosphere-volume-disposal-kit
post-pipeline-disposal-kit
global-host-publication-kit
runtime-session-result-kit
runtime-lifecycle-observation-kit
runtime-lifecycle-fixture-kit
browser-webgpu-restart-smoke-kit
```

## Safe implementation boundaries

```txt
1. Runtime Session Lifecycle Authority
2. Camera Rail Baseline Authority
3. Terrain Clearing Surface Authority
4. Dynamic Environment Frame Authority
5. Adaptive Quality Transaction Authority
```

Do not add further persistent render resources before the first boundary has an executable disposal and restart gate.
