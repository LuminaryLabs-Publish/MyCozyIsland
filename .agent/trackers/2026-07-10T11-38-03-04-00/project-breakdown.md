# Project breakdown: MyCozyIsland

Timestamp: `2026-07-10T11-38-03-04-00`

## Selected repo

```txt
LuminaryLabs-Publish/MyCozyIsland
```

## Selection reason

The current public `LuminaryLabs-Publish` repository list was compared against central ledger recency and sampled root `.agent` state.

No checked non-Cavalry repo was new, absent from the ledger, missing sampled root `.agent`, recently added, or otherwise undocumented.

`MyCozyIsland` was selected as the oldest eligible documented fallback after `TheUnmappedHouse` advanced to `2026-07-10T11-30-28-04-00`. `TheCavalryOfRome` remained excluded by rule.

## Current product read

`MyCozyIsland` is a WebGPU-first volumetric island route.

The live route is:

```txt
index.html
  -> canvas#game + loader + debug + hint + error panel
  -> importmap: three / three-webgpu / three-tsl at 0.185.0
  -> ./src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate 50 DomainServiceKit manifests
  -> compose deterministic source descriptors
  -> create WebGPURenderer and quality policy
  -> create scene, camera, sky, lights, fog
  -> create terrain, vegetation, ocean, foam, clouds, rolling fog, and post pipeline
  -> wheel / pointer / keyboard / blur / resize mutate camera/input state
  -> animation loop ticks scenario, updates render consumers, samples performance, renders post pipeline, writes debug every 12 frames
  -> globalThis.CozyIsland exposes live renderer objects and aggregate getState()
```

## Interaction loop

```txt
page load
  -> import WebGPU Three.js route
  -> validate kitCatalog
  -> create deterministic domain snapshot
  -> create camera rail sequence and cozy island scenario
  -> initialize WebGPU renderer and render consumers
  -> wheel calls input.wheel(deltaY)
  -> pointer drag calls input.drag(dx, dy)
  -> keyboard calls input.key(code, true/false)
  -> blur calls input.clear()
  -> resize mutates renderer/camera dimensions
  -> animation frame ticks scenario
  -> camera copies scenario render snapshot camera
  -> world/foam/cloud/fog/post/performance consumers update
  -> debug overlay draws aggregate state
  -> legacy CozyIsland.getState() returns aggregate backend, quality, camera, clock, performance, volumetrics, and kit count
```

## Domains in use

```txt
static-route-shell
webgpu-importmap
canvas-route-host
loader-projection
error-projection
debug-overlay-dom
route-token
DomainServiceKit-catalog
kit-capability-validation
deterministic-seed-service
environment-clock
wind-field
weather-state
illumination-state
terrain-surface
terrain-biome-field
shoreline-field
terrain-lod-policy
ocean-floor-profile
ocean-wave-state
ocean-optics
underwater-atmosphere
ocean-caustics
sun-glitter
shoreline-foam
vegetation-archetype-catalog
ground-contact-service
vegetation-placement-graph
vegetation-wind
vegetation-lod
rock-graph
prop-graph
campfire-atmosphere
cloud-weather-state
cloud-density-recipe
cloud-lighting-profile
cloud-lod-policy
cloud-shadow
cloud-horizon-band
fog-density-recipe
fog-advection
fog-volume-placement
aerial-perspective
stylized-material-catalog
render-archetype-catalog
webgl2-fallback-policy
render-snapshot
camera-rail-sequence
cozy-island-scenario
webgpu-render-host
stylized-world-render-consumer
webgpu-ocean-render-consumer
webgpu-foam-render-consumer
atmosphere-volume-texture-consumer
volumetric-cloud-render-consumer
rolling-fog-render-consumer
webgpu-post-pipeline-consumer
performance-budget-consumer
wheel-input-consumer
pointer-input-consumer
keyboard-input-consumer
resize-consumer
legacy-CozyIsland-diagnostics
node-static-check
node-domain-smoke
webgpu-host-journal-readback-next
node-webgpu-consumer-fixture-next
```

## Services the kits offer

- `core/domain-kit`: validates DomainServiceKit metadata and capability shape.
- `kits/catalog`: provides the 50-kit source catalog.
- `kits/determinism`: provides seeded descriptor generation and stable noise helpers.
- `kits/environment`: provides time, wind, weather, illumination, aerial perspective, and vegetation wind rows.
- `kits/terrain`: provides surface sampling, biome fields, shoreline fields, LOD, path, and ground contact services.
- `kits/ocean`: provides floor profile, wave state, optics, foam, underwater atmosphere, caustics, and glitter descriptors.
- `kits/vegetation`: provides vegetation archetypes, placements, ground contact, LOD, rocks, props, and campfire atmosphere descriptors.
- `kits/atmosphere`: provides cloud weather, cloud density, lighting, LOD, shadow, horizon band, fog density, advection, and volume placement descriptors.
- `kits/render-descriptors`: provides material catalog, render archetypes, quality, fallback, render snapshot, performance budget, and debug overlay.
- `kits/sequences`: provides camera rail sequence and cozy island scenario.
- `kits/renderers`: adapts source rows into WebGPU world, ocean, foam, atmosphere texture, cloud, fog, post, and performance consumers.
- Planned proof services: route profile, source fingerprint, kit catalog readback, input result journal, scenario tick journal, camera frame readback, volume texture journal, performance journal, render-consumption ledger, JSON-safe CozyIslandHost, and Node fixture.

## Implemented source kits

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

## Runtime implied kits

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

## Next-cut kits

```txt
webgpu-route-profile-kit
webgpu-source-fingerprint-kit
kit-catalog-readback-kit
render-snapshot-normalizer-kit
input-action-frame-kit
input-result-kit
input-result-journal-kit
scenario-tick-result-kit
camera-frame-readback-kit
volume-texture-result-kit
performance-level-result-kit
render-consumption-ledger-kit
cozy-island-host-readback-kit
node-webgpu-consumer-fixture-kit
```

## Main finding

`MyCozyIsland` should not start next with visual rewrite, cloud rewrite, ocean rewrite, fog rewrite, camera retune, renderer replacement, route-token churn, or new route content.

The blocker is host journal readback. `globalThis.CozyIsland` exposes live renderer objects and aggregate state, but not JSON-safe proof rows for source fingerprint, kit catalog status, input results, scenario ticks, camera frames, volume textures, performance decisions, or render-consumption rows.

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Journal Readback Refresh + Node Consumer Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
browser smoke: not run
WebGPU/GPU validation: not run
DOM-free WebGPU consumer fixture: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: yes
```
