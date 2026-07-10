# Current Audit: MyCozyIsland WebGPU Host Readback Ledger

Last updated: 2026-07-10T13-08-51-04-00

## Current runtime identity

`MyCozyIsland` is a WebGPU volumetric island route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

The live route validates a 50-kit DomainServiceKit catalog, composes deterministic source descriptors, creates WebGPU render consumers, and exposes legacy live diagnostics at `globalThis.CozyIsland`.

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
webgpu-host-readback-ledger-next
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
- Next proof services: route/source fingerprint, kit catalog readback, input/scenario/camera readback, volume texture readback, performance readback, render-consumption ledger, JSON-safe CozyIslandHost, and Node WebGPU fixture.

## Implemented source kits

See `.agent/kit-registry.json` for the full 50-kit source catalog.

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
input-readback-ledger-kit
scenario-tick-result-kit
camera-frame-readback-kit
volume-texture-result-kit
performance-level-result-kit
render-consumption-ledger-kit
cozy-island-host-readback-kit
node-webgpu-consumer-fixture-kit
```

## Current conclusion

The route should not start next with visual expansion, cloud/ocean/fog rewrite, camera retune, route-token churn, or renderer replacement. The blocker is WebGPU host readback proof. Add fixture-readable proof rows first.
