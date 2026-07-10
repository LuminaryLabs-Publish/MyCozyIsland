# Current Audit: MyCozyIsland WebGPU Host Proof Ledger

Last updated: 2026-07-10T07-29-12-04-00

## Current runtime identity

`MyCozyIsland` is a WebGPU volumetric island route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

The live route validates a 50-kit DomainServiceKit catalog, composes deterministic source descriptors, creates WebGPU render consumers, and exposes legacy live diagnostics at `globalThis.CozyIsland`.

## Interaction loop

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
  -> wheel / pointer / keyboard / blur / resize consumers update input or camera state
  -> animation loop ticks scenario, copies scenario camera, updates world/foam, samples performance, renders post pipeline, debug every 12 frames
  -> globalThis.CozyIsland exposes live renderer objects and aggregate getState()
```

## Domains in use

- Static route shell, WebGPU importmap, canvas route host, loader projection, error projection, debug overlay DOM, and route script token.
- Three/WebGPU render host and quality selection.
- DomainServiceKit manifest catalog and kit capability validation.
- Deterministic seed service.
- Environment clock, wind field, weather state, and illumination state.
- Terrain surface, biome field, shoreline field, terrain LOD policy, and ocean-floor profile.
- Ocean wave state, ocean optics, underwater atmosphere, ocean caustics, sun glitter, and shoreline foam.
- Vegetation archetype catalog, ground contact service, vegetation placement graph, vegetation wind, vegetation LOD, rock graph, prop graph, and campfire atmosphere.
- Cloud weather state, cloud density recipe, cloud lighting profile, cloud LOD policy, cloud shadow, and cloud horizon band.
- Fog density recipe, fog advection, fog volume placement, and aerial perspective.
- Stylized material catalog, render archetype catalog, WebGL2 fallback policy, and render snapshot.
- Camera rail sequence and cozy island scenario.
- Stylized world renderer, WebGPU ocean renderer, WebGPU foam renderer, atmosphere volume textures, volumetric cloud renderer, rolling fog renderer, WebGPU post pipeline, and performance budget.
- Wheel input, pointer-drag input, keyboard input, blur consumer, resize consumer, render frame loop, and legacy CozyIsland diagnostics.
- Static check and domain smoke test domains.

## Kit services

- `core/domain-kit`: validates DomainServiceKit metadata and capability rows.
- `kits/catalog`: provides the 50-kit manifest catalog.
- `kits/determinism`: provides stable seeded descriptor generation.
- `kits/environment`: provides time, wind, weather, and illumination source rows.
- `kits/terrain`: provides terrain, shoreline, biome, LOD, and floor rows.
- `kits/ocean`: provides ocean wave, foam, optics, caustic, glitter, and floor rows.
- `kits/vegetation`: provides vegetation archetype, placement, ground contact, wind, LOD, rock, prop, and campfire rows.
- `kits/atmosphere`: provides cloud, fog, shadow, horizon, and aerial perspective rows.
- `kits/render-descriptors`: provides material, archetype, fallback, and render snapshot rows.
- `kits/sequences`: provides camera rail and scenario rows.
- `kits/renderers`: adapts rows into WebGPU world, ocean, foam, atmosphere, cloud, fog, and post consumers.

## Kits

### Implemented source kits

```txt
domain-kit-catalog-validation
determinism-kit
environment-kit
terrain-kit
ocean-kit
vegetation-kit
atmosphere-kit
render-descriptor-kit
sequence-kit
webgpu-renderer-kit
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

### Needed next kits

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
cozy-island-host-proof-kit
node-webgpu-consumer-fixture-kit
```

## Current conclusion

The route should not start next with visual expansion or renderer replacement. The blocker is WebGPU source-consumer and host-proof readback. Add fixture-readable proof rows first.
