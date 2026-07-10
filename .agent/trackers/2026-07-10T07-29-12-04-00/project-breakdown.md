# MyCozyIsland WebGPU Host Proof Ledger Breakdown

Timestamp: 2026-07-10T07-29-12-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland
Scope: documentation and repo-local audit refresh only.

## Selection reason

No checked non-Cavalry Publish repo was new, ledger-missing, missing sampled root `.agent`, recently added but undocumented, or otherwise undocumented. `MyCozyIsland` was the oldest eligible documented fallback after central ledger comparison.

`TheCavalryOfRome` was excluded by standing rule.

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
  -> wheel / pointer / keyboard / blur / resize consumers update input or camera state
  -> animation loop ticks scenario, copies scenario camera, updates world/foam, samples performance, renders post pipeline, debug every 12 frames
  -> globalThis.CozyIsland exposes live renderer objects and aggregate getState()
```

## Domains in use

- Static route shell, WebGPU importmap, canvas host, loader projection, debug overlay, error projection, and route script token.
- DomainServiceKit manifest catalog validation and 50-kit capability catalog.
- Deterministic seed, environment clock, wind field, weather state, and illumination state.
- Terrain surface, terrain biome field, shoreline field, terrain LOD policy, and ocean-floor profile.
- Ocean wave state, ocean optics, underwater atmosphere, caustics, sun glitter, and shoreline foam.
- Vegetation archetype catalog, ground contact, placement graph, vegetation wind, vegetation LOD, rock graph, prop graph, and campfire atmosphere.
- Cloud weather state, density recipe, lighting profile, LOD policy, shadow, horizon band, fog density, fog advection, fog volume placement, and aerial perspective.
- Stylized material catalog, render archetype catalog, WebGL2 fallback policy, render snapshot, camera rail sequence, and cozy island scenario.
- Stylized world renderer, WebGPU ocean renderer, WebGPU foam renderer, atmosphere volume textures, volumetric cloud renderer, rolling fog renderer, post pipeline, and performance budget.
- Wheel input, pointer input, keyboard input, blur consumer, resize consumer, render frame loop, and legacy CozyIsland diagnostics.
- Static check and domain smoke validation domains.

## Kit services currently offered

- `core/domain-kit` validates DomainServiceKit manifest shape and capability metadata.
- `kits/catalog` registers the 50 active kits and capability rows.
- `kits/determinism` provides seeded deterministic services.
- `kits/environment` provides time, wind, weather, and light descriptors.
- `kits/terrain` provides terrain, shoreline, biome, and LOD descriptors.
- `kits/ocean` provides ocean surface, foam, optics, caustic, and floor descriptors.
- `kits/vegetation` provides archetype, placement, wind, rock, prop, and campfire descriptors.
- `kits/atmosphere` provides cloud, fog, shadow, horizon, and aerial perspective descriptors.
- `kits/render-descriptors` provides material, archetype, fallback, and render snapshot descriptors.
- `kits/sequences` provides camera rail and scenario descriptors.
- `kits/renderers` adapts descriptors into WebGPU world, ocean, foam, atmosphere, cloud, fog, and post renderers.

## Kits

### Implemented source kits

- domain-kit-catalog-validation
- determinism-kit
- environment-kit
- terrain-kit
- ocean-kit
- vegetation-kit
- atmosphere-kit
- render-descriptor-kit
- sequence-kit
- webgpu-renderer-kit

### Runtime-implied consumer kits

- webgpu-static-shell-kit
- webgpu-importmap-kit
- webgpu-route-token-kit
- webgpu-render-host-kit
- webgpu-quality-selection-kit
- webgpu-scene-composition-kit
- sky-gradient-kit
- lighting-composition-kit
- world-render-consumer-kit
- ocean-render-consumer-kit
- foam-render-consumer-kit
- atmosphere-texture-compute-kit
- volumetric-cloud-consumer-kit
- rolling-fog-consumer-kit
- post-pipeline-consumer-kit
- performance-budget-consumer-kit
- input-consumer-kit
- resize-consumer-kit
- animation-loop-kit
- legacy-CozyIsland-diagnostics-kit
- node-static-check-kit
- node-domain-smoke-kit

### Next-cut proof kits

- webgpu-route-profile-kit
- webgpu-source-fingerprint-kit
- kit-catalog-readback-kit
- render-snapshot-normalizer-kit
- input-action-frame-kit
- input-result-kit
- input-result-journal-kit
- scenario-tick-result-kit
- camera-frame-readback-kit
- volume-texture-result-kit
- performance-level-result-kit
- render-consumption-ledger-kit
- cozy-island-host-proof-kit
- node-webgpu-consumer-fixture-kit

## Main finding

The live route has useful source-domain decomposition, a 50-kit catalog, and `npm test` coverage for static and domain smoke checks. The browser runtime still lacks host-proof rows that a fixture can read without touching WebGPU objects.

The next implementation should not start with visual rewrite, cloud rewrite, ocean rewrite, fog rewrite, camera retune, renderer replacement, route-token churn, or new route content.

## Blocking gap

The blocker is WebGPU source-consumer and host-proof readback:

```txt
no normalized route/source fingerprint
no kit catalog readback in host state
no input accepted/rejected/no-change rows
no scenario tick result rows
no camera frame result rows
no volume texture result rows
no performance degrade/recover reason rows
no render-consumption ledger rows
globalThis.CozyIsland exposes live objects and aggregate state, not a JSON-safe proof ledger
```

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Proof Ledger Refresh + Node Consumer Fixture Gate
```

## Validation status

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
browser smoke: not run
WebGPU/GPU validation: not run
DOM-free WebGPU consumer fixture: not run because proof files do not exist yet
pushed to main: yes
```
