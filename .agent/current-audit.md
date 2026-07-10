# Current Audit: MyCozyIsland WebGPU Frame Correlation Journal

Last updated: 2026-07-10T14-42-01-04-00

## Current runtime identity

`MyCozyIsland` is a static WebGPU volumetric island route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

The route validates a 50-kit DomainServiceKit catalog, composes deterministic source descriptors, builds WebGPU/WebGL2 render consumers, runs a camera-rail scenario, and exposes live diagnostics through `globalThis.CozyIsland`.

## Interaction loop

```txt
route shell and import map
  -> validate kit catalog
  -> initialize WebGPURenderer
  -> choose backend quality
  -> compose deterministic source snapshot
  -> build camera rail and scenario
  -> build world/ocean/foam/atmosphere/cloud/fog/post consumers
  -> consume wheel/pointer/keyboard/blur/resize events
  -> scenario.tick(dt)
  -> scenario.getRenderSnapshot()
  -> project camera
  -> update world and foam
  -> sample performance budget
  -> postPipeline.render()
  -> aggregate debug readback every 12 frames
```

## Domains in use

```txt
static route shell
WebGPU import map and route token
canvas, loader, error, hint, and debug DOM surfaces
DomainServiceKit catalog and capability validation
deterministic seed and environment clock
wind, weather, illumination, and aerial perspective
terrain surface, biome, shoreline, LOD, and ground contact
ocean floor, waves, optics, foam, underwater, caustics, and glitter
vegetation archetypes, placement, wind, LOD, rocks, props, and campfire
cloud weather, density, lighting, LOD, shadow, and horizon
fog density, advection, and volume placement
material, render archetype, quality, fallback, and render snapshot
camera rail and Cozy Island scenario
WebGPU render host and scene composition
world, ocean, foam, cloud, fog, and post consumers
performance budget and adaptive quality
wheel, pointer, keyboard, blur, debug, and resize input
legacy live diagnostics
Node static and domain smoke validation
planned host proof, frame identity, correlation, journal, and fixture domains
```

## Services offered by the kits

- Catalog validation: checks kit metadata, ownership, capabilities, and composition shape.
- Determinism: creates stable seeded descriptor graphs.
- Environment: supplies clock, wind, weather, illumination, and atmospheric state.
- Terrain: supplies height sampling, biomes, shorelines, LOD, and ground contact.
- Ocean: supplies floor, wave, optical, foam, underwater, caustic, and glitter descriptors.
- Vegetation: supplies archetypes, deterministic placement, ground alignment, wind, LOD, rocks, props, and campfire atmosphere.
- Atmosphere: supplies cloud and fog recipes, lighting, shadows, horizon bands, advection, and placement.
- Render description: supplies material/archetype catalogs, quality policy, fallback policy, and normalized source snapshot inputs.
- Sequence and gameplay: supplies camera-rail input and scenario ticking/render snapshots.
- Render consumption: adapts source rows into world, ocean, foam, volume textures, clouds, fog, post processing, and debug output.
- Performance: samples frame cost and invokes degrade/recover callbacks.
- Validation: runs route/static checks and domain smoke composition.

## Implemented kits

The complete implemented list remains in `.agent/kit-registry.json` and includes 50 source kits, 23 runtime-implied host/consumer kits, and validation kits.

## Missing proof kits

```txt
webgpu-route-profile-kit
webgpu-source-fingerprint-kit
host-frame-sequence-kit
frame-correlation-record-kit
kit-catalog-readback-kit
render-snapshot-normalizer-kit
input-command-record-kit
input-result-kit
scenario-step-record-kit
camera-projection-record-kit
volume-build-record-kit
performance-transition-record-kit
render-submit-record-kit
bounded-proof-journal-kit
cozy-island-host-readback-kit
node-frame-correlation-fixture-kit
```

## Main finding

The primary gap is no longer merely the absence of aggregate readback fields. The route lacks a shared causal record connecting one input or autonomous frame to its scenario step, camera projection, adaptive-quality decision, and render submission.

`globalThis.CozyIsland.getState()` returns current aggregates only. It cannot answer which input changed the camera, which scenario state was rendered, whether performance degradation happened before or after submission, or which source revision produced atmosphere textures.

## Next safe ledge

```txt
MyCozyIsland WebGPU Frame Correlation Journal + Node Fixture Gate
```

Do not change rendering or content until this causal proof surface exists.