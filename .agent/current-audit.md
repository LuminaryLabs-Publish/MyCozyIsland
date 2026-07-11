# Current Audit: MyCozyIsland Runtime Session and Resource Authority

Last updated: `2026-07-10T20-48-55-04-00`

## Runtime identity

`MyCozyIsland` is a static WebGPU-first scenic exploration route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

## Interaction loop

```txt
load index.html and import Three/WebGPU
  -> validate exactly 50 DomainServiceKit descriptors
  -> initialize WebGPURenderer and choose backend/quality
  -> compose deterministic environment and render snapshot
  -> construct sky, world, ocean, foam, volume textures, clouds, fog, and post pipeline
  -> install wheel/pointer/keyboard/blur/resize listeners
  -> start renderer.setAnimationLoop
  -> scenario.tick(dt)
  -> camera rail or first-person descriptor
  -> world and foam updates
  -> performance-budget sample and quality adjustment
  -> postPipeline.render()
  -> periodic diagnostics
  -> globalThis.CozyIsland latest-state readback
```

Player interaction is scroll-to-descend, pointer-drag look/orbit, WASD movement after rail completion, Shift speed modifier, and H diagnostics. Movement is constrained to the authored clearing and excludes the central campfire radius.

## Domain map

### Platform and renderer adapters

- debug overlay host
- WebGL2 fallback policy
- WebGPU atmosphere compute
- WebGPU foam
- WebGPU ocean
- performance budget
- post-processing
- rolling volumetric fog
- stylized world rendering
- volumetric clouds

### Authored content

- camera rail sequence
- cozy-island scenario

### Large domains

- terrain surface generation
- vegetation placement

### Atomic and shared domains

- deterministic seed and environment clock
- wind, weather, illumination, and aerial perspective
- terrain biome, shoreline, LOD, and ground contact
- ocean floor, waves, optics, underwater atmosphere, caustics, glitter, and foam
- vegetation archetypes, wind, LOD, rocks, props, and campfire atmosphere
- cloud weather, density, lighting, LOD, shadow, and horizon band
- fog density, advection, and volume placement
- render quality, materials, archetypes, and immutable render snapshot

## Services offered by the kits

```txt
seed: world seed, scoped RNG, stable identity, deterministic hashes
time: deterministic tick, state snapshot, reset
weather: weather state, wind field, illumination, aerial perspective
terrain: height/field sampling, biome weights, shoreline distance, ground contact, terrain LOD
water: floor profile, wave spectrum, optical descriptor, underwater descriptor, caustics, glitter, foam contours
vegetation: archetype catalog, placement graph, wind descriptor, LOD policy, rock graph, prop graph
atmosphere: cloud/fog recipes, lighting, LOD, shadow, horizon, advection, placement
render descriptors: quality selection, material catalog, archetype catalog, immutable render snapshot, fallback policy
render adapters: world/ocean/foam/cloud/fog/post construction and frame submission
sequence/gameplay: rail input, camera descriptor, constrained movement, scenario tick/reset, render snapshot
host diagnostics: performance sampling, adaptive degradation/recovery, debug overlay, latest aggregate state
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

## Main finding

Construction is centralized in `main()`, but lifecycle authority is absent.

- `renderer.setAnimationLoop()` is started without a public stop/restart contract.
- wheel, pointer, keyboard, blur, and resize listeners are installed through anonymous closures and cannot be removed as a coordinated set.
- `fail()` reports startup errors but does not roll back resources already created.
- the sky texture/material/geometry, atmosphere textures/compute nodes, world, cloud, fog, ocean, foam, post, and renderer resources have no route-owned disposal ledger.
- renderer factories generally return live objects and update controls, not `dispose()` or JSON-safe ownership snapshots.
- `globalThis.CozyIsland` exposes mutable live handles and latest aggregate state, but no lifecycle state, session ID, resource counts, disposal result, or bounded journal.
- repeated mount, hot reload, future route transition, or restart can create duplicate loops/listeners and orphan GPU resources.

## Safe implementation boundary

```txt
MyCozyIsland Runtime Session Lifecycle Authority + WebGPU Resource Disposal Fixture Gate
```

The earlier layered-grass consumer/resource owner work remains the first child-resource proof under this boundary.
