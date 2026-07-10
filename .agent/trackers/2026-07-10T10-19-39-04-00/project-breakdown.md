# Project Breakdown: MyCozyIsland WebGPU Host Fixture Readback

Timestamp: 2026-07-10T10-19-39-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland
Mode: docs-only audit refresh

## Selection

Selected `LuminaryLabs-Publish/MyCozyIsland` after comparing the current LuminaryLabs-Publish repository list with the central ledger in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry repo was new, missing from the ledger, missing root `.agent`, recently added, or otherwise undocumented. `MyCozyIsland` was the oldest eligible fallback after `TheUnmappedHouse` advanced.

`TheCavalryOfRome` remains excluded by standing rule.

## Interaction loop

```txt
index.html
  -> canvas#game + loader + debug + hint + error panel
  -> importmap: three / three-webgpu / three-tsl at 0.185.0
  -> ./src/main-cloudform.js?v=webgpu-volumetric-2
  -> validateKitCatalog(kitCatalog)
  -> create WebGPURenderer and choose quality by backend
  -> create deterministic domain snapshot
  -> create render snapshot and camera rail sequence
  -> create cozy island scenario
  -> create scene, fog, sky, lights, and camera
  -> create stylized world, WebGPU ocean, WebGPU foam, atmosphere volume textures, volumetric clouds, rolling fog, and WebGPU post pipeline
  -> wheel / pointer / keyboard / blur / resize consumers update input or camera state
  -> animation loop ticks scenario, copies scenario camera, updates renderers, samples performance, renders post pipeline, debug every 12 frames
  -> globalThis.CozyIsland exposes live renderer objects and aggregate getState()
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
webgpu-host-readback-next
node-webgpu-consumer-fixture-next
```

## Kit services

- `core/domain-kit`: validates DomainServiceKit metadata and capabilities.
- `kits/catalog`: provides 50 focused kit manifests.
- `kits/determinism`: provides seeded descriptor generation.
- `kits/environment`: provides time, wind, weather, illumination, aerial perspective, and vegetation wind rows.
- `kits/terrain`: provides surface, field sampler, biome, shoreline, LOD, and ground-contact rows.
- `kits/ocean`: provides ocean floor, waves, optics, foam, underwater, caustics, and glitter rows.
- `kits/vegetation`: provides archetypes, placement, ground contact, wind, LOD, rocks, props, and campfire rows.
- `kits/atmosphere`: provides cloud, fog, shadow, horizon, and aerial perspective rows.
- `kits/render-descriptors`: provides material, archetype, quality, fallback, and render snapshot rows.
- `kits/sequences`: provides camera rail and scenario rows.
- `kits/renderers`: adapts rows into WebGPU world, ocean, foam, atmosphere, cloud, fog, post, and performance consumers.
- next proof services: route/source fingerprint, kit catalog readback, input/scenario/camera journals, volume texture journal, performance journal, render-consumption ledger, JSON-safe CozyIslandHost, and Node WebGPU fixture.

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

## Needed next kits

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

The blocker is WebGPU host fixture readback:

```txt
source catalog and npm test coverage exist
browser consumers still mutate/render through live objects
globalThis.CozyIsland exposes renderer, scene, camera, post pipeline, and aggregate getState()
no JSON-safe proof rows for route/source fingerprints, kit catalog, input results, scenario ticks, camera frames, volume textures, performance decisions, or render-consumption rows
no Node WebGPU consumer fixture exists yet
```

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Fixture Readback Refresh + Node Consumer Fixture Gate
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
central ledger updated: pending central sync
```
