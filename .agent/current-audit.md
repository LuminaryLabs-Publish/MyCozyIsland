# Current Audit: MyCozyIsland Adaptive Quality Transition Authority

Last updated: 2026-07-10T16-08-56-04-00

## Current runtime identity

`MyCozyIsland` is a static WebGPU-first volumetric island route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

The route validates an exact 50-kit DomainServiceKit catalog, composes deterministic source descriptors, creates WebGPU/WebGL2 consumers, runs a camera-rail-to-first-person scenario, adapts volumetric quality from observed frame intervals, and exposes live diagnostics through `globalThis.CozyIsland`.

## Interaction loop

```txt
route shell and import map
  -> validate kit catalog
  -> initialize WebGPURenderer with trackTimestamp enabled
  -> choose startup quality
  -> compose deterministic source snapshot
  -> build camera rail and scenario
  -> build world/ocean/foam/atmosphere/cloud/fog/post consumers
  -> consume wheel/pointer/keyboard/blur/resize events
  -> animation callback derives callback-to-callback frameMs
  -> scenario.tick(dt)
  -> scenario.getRenderSnapshot()
  -> project camera
  -> update world and foam
  -> performanceBudget.sample(frameMs)
  -> possible inline quality mutation
  -> postPipeline.render()
  -> aggregate debug readback every 12 frames
```

## Domains in use

```txt
static route shell
WebGPU import map and route token
canvas, loader, error, hint, and debug DOM surfaces
DomainServiceKit manifest and capability validation
deterministic seed and environment clock
wind, weather, illumination, and aerial perspective
terrain surface, biome, shoreline, LOD, and ground contact
ocean floor, waves, optics, foam, underwater, caustics, and glitter
vegetation archetypes, placement, wind, LOD, rocks, props, and campfire
cloud weather, density, lighting, LOD, shadow, and horizon
fog density, advection, and volume placement
material, render archetype, quality, fallback, and render snapshot
camera rail, grounded movement, and Cozy Island scenario
WebGPU render host and scene composition
world, ocean, foam, cloud, fog, volume-texture, and post consumers
frame interval sampling and adaptive quality policy
inline quality actuation for cloud steps, fog steps, fog resolution, and DPR
wheel, pointer, keyboard, blur, debug-toggle, and resize input
legacy live diagnostics
Node static and deterministic domain smoke validation
planned frame-cost, transition result, quality-state applier, journal, host-readback, and fixture domains
```

## Services offered by the kits

- Catalog validation: stable IDs, DomainServiceKit base, capability ownership, dependency closure, and exact catalog count.
- Determinism: seeded random streams, stable hashes, noise, and reproducible descriptor composition.
- Environment: deterministic clock, wind, weather, illumination, aerial perspective, and vegetation wind.
- Terrain: height and field sampling, biome blending, shoreline data, LOD policy, ground contact, and path descriptors.
- Ocean: floor profile, wave state, optics, foam contours, underwater atmosphere, caustics, and sun glitter.
- Vegetation: archetype catalogs, deterministic placement, ground seating, wind, LOD, rocks, props, and campfire descriptors.
- Atmosphere: cloud and fog recipes, lighting, shadows, horizon bands, advection, and bounded volume placement.
- Render description: materials, render archetypes, startup quality policy, fallback policy, and immutable render snapshot composition.
- Sequence and gameplay: camera-rail input, first-person movement, scenario ticking, reset, and render snapshots.
- Render consumption: stylized world, ocean, foam, compute/CPU volume textures, volumetric clouds, rolling fog, post processing, and debug display.
- Performance: exponentially smoothed frame interval, degrade/recover thresholds, and callbacks for quality mutation.
- Validation: static route/source assertions and deterministic domain smoke composition.

## Implemented kits

The authoritative implemented list is in `.agent/kit-registry.json`:

```txt
50 source-backed DomainServiceKit manifests
22 runtime-implied shell, host, consumer, loop, diagnostic, and Node validation kits
```

## Performance authority finding

The current boundary is split:

```txt
createPerformanceBudget()
  owns moving average, hysteresis counters, level, degrade/recover decision

src/main-cloudform.js applyPerformanceLevel()
  owns cloud step scale, fog step scale, fog resolution scale, and DPR mutation
```

This split is not self-describing or fully reversible.

Verified source behavior:

- `frameMs` is computed from successive animation callback timestamps.
- the budget is sampled before `postPipeline.render()`.
- renderer timestamp tracking is enabled but not read by the budget.
- level transitions have no durable result record.
- the public state omits the over/under-budget counters and applied quality settings.
- recovery to level `0` does not reset renderer DPR because `setPixelRatio()` is guarded by `level > 0`.
- vegetation density, shadows, ocean geometry, and startup texture sizes remain fixed while only selected volumetric settings and DPR adapt.

## Missing next kits

```txt
frame-cost-sampler-kit
adaptive-quality-policy-kit
quality-state-descriptor-kit
quality-state-applier-kit
quality-transition-result-kit
performance-transition-journal-kit
gpu-timestamp-readback-kit
render-submit-correlation-kit
cozy-island-performance-host-kit
node-adaptive-quality-fixture-kit
```

## Main finding

The route should not receive another visual tuning pass before adaptive quality has a typed, reversible transaction boundary. The current policy can report recovery while leaving reduced DPR active, and it cannot prove whether a transition was triggered by callback interval, CPU submission, GPU work, resize, or input-driven load.

## Next safe ledge

```txt
MyCozyIsland Adaptive Quality Transition Authority + Frame-Cost Fixture Gate
```

Preserve the current visual route and 50-kit architecture while adding pure quality-state application, transition results, host readback, and a DOM-free fixture.