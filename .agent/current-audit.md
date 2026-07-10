# Current Audit: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Audit timestamp:** `2026-07-10T05-49-25-04-00`

## Summary

`MyCozyIsland` is currently a WebGPU-first volumetric cozy island route, not the older `hero-cloud-4` route described by the previous audit.

The active shell imports Three.js/WebGPU `0.185.0`, loads `./src/main-cloudform.js?v=webgpu-volumetric-2`, validates a 50-kit `DomainServiceKit` catalog, composes deterministic source snapshots, creates WebGPU volumetric cloud/fog/ocean/post renderers, drives a scenario/camera loop, and exposes aggregate live diagnostics through `globalThis.CozyIsland`.

## Current interaction loop

```txt
index.html
  -> Three.js/WebGPU importmap at 0.185.0
  -> ./src/main-cloudform.js?v=webgpu-volumetric-2
  -> validateKitCatalog(kitCatalog)
  -> create WebGPURenderer and choose quality by backend
  -> create deterministic domain snapshot
  -> create render snapshot and camera rail sequence
  -> create cozy island scenario
  -> create scene, fog, sky, lights, and camera
  -> create stylized world, WebGPU ocean, WebGPU foam, atmosphere volume textures, volumetric clouds, rolling fog, and WebGPU post pipeline
  -> create debug overlay and performance budget
  -> wheel / pointer / keyboard / blur / resize consumers update input or camera state
  -> animation loop ticks scenario, copies scenario camera to Three camera, updates world/foam, samples performance, renders post pipeline, and updates debug overlay every 12 frames
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
route-script-token
three-webgpu-render-host
kit-catalog-validation
DomainServiceKit-manifest-catalog
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
stylized-world-renderer
webgpu-ocean-renderer
webgpu-foam-renderer
atmosphere-volume-textures
volumetric-cloud-renderer
rolling-fog-renderer
webgpu-post-pipeline
performance-budget
wheel-input
pointer-drag-input
keyboard-input
resize-consumer
render-frame-loop
legacy-CozyIsland-diagnostics
static-check-test
domain-smoke-test
webgpu-source-profile-next
input-result-journal-next
scenario-tick-result-next
camera-state-readback-next
volume-texture-readback-next
performance-degrade-recover-readback-next
render-consumption-ledger-next
serializable-CozyIslandHost-next
```

## Kit services

```txt
core/domain-kit: DomainServiceKit definition and catalog validation
kits/catalog: 50 focused kit manifests
kits/determinism: seed/hash/noise/RNG helpers
kits/environment: clock, wind, weather, illumination, aerial perspective, vegetation wind
kits/terrain: terrain surface, biome, shoreline, LOD, ground contact, path network
kits/ocean: ocean floor, wave, optics, underwater, caustics, sun glitter, foam
kits/vegetation: vegetation, rock, prop, campfire source graphs
kits/atmosphere: cloud and fog source descriptors
kits/render-descriptors: quality, materials, render archetypes, snapshot, fallback, performance, debug
kits/sequences: camera rail and scenario runtime
kits/renderers: stylized world, atmosphere textures, volumetric clouds, rolling fog, WebGPU ocean/foam/post
```

## Current finding

The next useful step is WebGPU source/consumer proof, not a visual rewrite. Add fixture-readable records around the existing source descriptors and consumers before changing cloud/fog/ocean visuals, camera tuning, renderer architecture, or route token.
