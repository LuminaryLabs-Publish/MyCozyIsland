# Project breakdown: MyCozyIsland

Timestamp: `2026-07-10T08-48-58-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/MyCozyIsland`

Reason: the current public `LuminaryLabs-Publish` repository list was checked and compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger. No checked non-Cavalry repo was new, absent from the ledger, missing sampled root `.agent`, recently added, or undocumented. `MyCozyIsland` was the oldest eligible documented fallback after `TheUnmappedHouse` advanced to `2026-07-10T08-39-05-04-00`.

`TheCavalryOfRome` remained excluded by rule.

## Runtime files inspected

```txt
index.html
package.json
src/main-cloudform.js
src/kits/catalog.js
tests/static-check.mjs
tests/domain-smoke.mjs
```

## Interaction loop

```txt
index.html
  -> canvas#game + loader + debug + hint + error panel
  -> importmap loads Three/WebGPU 0.185.0
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validateKitCatalog(kitCatalog) requires 50 focused kits
  -> create WebGPURenderer and choose backend quality
  -> create deterministic domain snapshot from seed, weather, terrain, ocean, vegetation, atmosphere, render, and sequence kits
  -> create scene, sky, fog, lights, camera, stylized world, WebGPU ocean, foam, atmosphere textures, clouds, rolling fog, and post pipeline
  -> wheel mutates camera rail input
  -> pointer drag mutates camera rail input
  -> keyboard mutates scenario input and toggles debug
  -> blur clears input state
  -> resize mutates renderer and camera projection
  -> animation loop ticks scenario, copies camera, updates renderers, samples performance, renders post pipeline, and draws debug every 12 frames
  -> globalThis.CozyIsland exposes live renderer objects plus aggregate getState()
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
host-readback-next
node-webgpu-consumer-fixture-next
```

## Services that the kits offer

- `core/domain-kit`: DomainServiceKit metadata and capability validation.
- `kits/catalog`: 50 focused kit manifests.
- `kits/determinism`: seeded random stream and stable identity helpers.
- `kits/environment`: clock, wind, weather, illumination, aerial perspective, and vegetation wind rows.
- `kits/terrain`: terrain surface, field sampler, biome, shoreline, LOD, and ground contact rows.
- `kits/ocean`: ocean floor, waves, optics, foam, underwater, caustics, and glitter rows.
- `kits/vegetation`: archetypes, placement graph, vegetation LOD, rocks, props, and campfire rows.
- `kits/atmosphere`: cloud weather/density/lighting/LOD/shadow/horizon and fog density/advection/placement rows.
- `kits/render-descriptors`: material, render archetype, fallback, quality, and render snapshot rows.
- `kits/sequences`: camera rail and scenario rows.
- `kits/renderers`: WebGPU world, ocean, foam, volume textures, cloud, fog, post, and performance consumers.

## Kits

Implemented source/adapter kits:

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

Next-cut kits:

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

The blocker is host readback proof. The route already has a 50-kit source catalog and useful `npm test` static/domain coverage, but browser consumers still mutate or render through live objects. `globalThis.CozyIsland` exposes renderer, scene, camera, post pipeline, and aggregate getState(), but not JSON-safe proof rows for route/source fingerprints, kit catalog status, input results, scenario ticks, camera frames, volume textures, performance degrade/recover decisions, or render-consumption rows.

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Readback Ledger Refresh + Node Consumer Fixture Gate
```

## Validation

Docs-only pass.

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
browser smoke: not run
WebGPU/GPU validation: not run
DOM-free WebGPU consumer fixture: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: pending in central repo
```
