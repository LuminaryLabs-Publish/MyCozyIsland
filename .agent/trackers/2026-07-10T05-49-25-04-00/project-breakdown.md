# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-10T05-49-25-04-00`

## Selection

The current public `LuminaryLabs-Publish` repository page showed 9 repositories. `TheCavalryOfRome` was excluded by standing rule.

No checked public non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented. `MyCozyIsland` was selected as the oldest eligible documented fallback after `TheUnmappedHouse` advanced to `2026-07-10T05-40-17-04-00`.

## Current public repositories observed

```txt
LuminaryLabs-Publish/MyCozyIsland         selected / prior central latest 2026-07-10T04-29-10-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-10T04-40-52-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T04-50-40-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T04-58-56-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T05-11-51-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T05-21-20-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T05-28-12-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T05-40-17-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Current product read

`MyCozyIsland` has moved beyond the older hero-cloud Three.js route documented in the previous pass.

The current live shell is `index.html -> ./src/main-cloudform.js?v=webgpu-volumetric-2`. It imports Three.js/WebGPU `0.185.0`, starts a `THREE.WebGPURenderer`, validates a 50-kit Nexus-style catalog, composes deterministic environmental/domain descriptors, builds WebGPU volumetric cloud/fog/ocean/post renderers, and exposes `globalThis.CozyIsland` with aggregate runtime diagnostics.

## Interaction loop

```txt
index.html
  -> importmap maps three / three/webgpu / three/tsl to Three.js 0.185.0
  -> canvas#game + loader + debug + error panel mount
  -> ./src/main-cloudform.js?v=webgpu-volumetric-2
  -> validateKitCatalog(kitCatalog) requires 50 focused DomainServiceKit manifests
  -> create WebGPURenderer and choose render quality from backend
  -> createDomainSnapshot({ backend, quality })
  -> deterministic seed, clock, wind, weather, illumination, terrain, biome, shoreline, ocean, vegetation, rocks, props, campfire, clouds, fog, aerial perspective, materials, render archetypes, fallback policy
  -> createRenderSnapshot(...)
  -> createCameraRailSequence(terrain)
  -> createCozyIslandScenario({ clock, cameraSequence, snapshot })
  -> create scene, fog, sky, hemisphere light, sun light, camera
  -> createStylizedWorldRenderer(snapshot)
  -> createWebGPUOceanRenderer and createWebGPUFoamRenderer
  -> createAtmosphereVolumeTextures for cloud/fog textures
  -> createVolumetricCloudRenderer and createRollingFogRenderer
  -> createWebGPUPostPipeline and createDebugOverlay
  -> createPerformanceBudget with degrade/recover callbacks
  -> wheel updates cameraSequence.input.wheel(deltaY)
  -> pointer drag updates cameraSequence.input.drag(dx, dy)
  -> keydown toggles H diagnostics or updates key state
  -> keyup/blur clear input state
  -> resize updates renderer and camera projection
  -> renderer animation loop ticks scenario, copies renderState camera to Three camera, updates world/foam, samples performance, renders post pipeline, and draws debug overlay every 12 frames
  -> globalThis.CozyIsland exposes renderer, scene, camera, backend, quality, kit catalog/status, snapshot, scenario, volumetric renderers, post pipeline, performanceBudget, and getState()
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

## Services and kits

Current explicit kit services:

```txt
core/domain-kit: define and validate DomainServiceKit manifests
kits/catalog: 50 focused kit manifests and capability graph
kits/determinism: seed, hashing, seeded RNG, noise, interpolation helpers
kits/environment: clock, wind, weather, illumination, aerial perspective, vegetation wind
kits/terrain: terrain surface, biome field, shoreline, terrain LOD, ground contact, path network
kits/ocean: ocean floor, waves, optics, underwater, caustics, sun glitter, foam
kits/vegetation: vegetation archetypes/placement/LOD, rocks, props, campfire atmosphere
kits/atmosphere: cloud weather/density/lighting/LOD/shadow/horizon, fog density/advection/placement
kits/render-descriptors: quality, materials, render archetypes, render snapshot, fallback, performance budget, debug overlay
kits/sequences: camera rail sequence and cozy island scenario tick/readback
kits/renderers: stylized world, atmosphere volume textures, volumetric clouds, rolling fog, WebGPU ocean/foam, WebGPU post pipeline
```

Runtime-implied kits:

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

Next-cut proof kits:

```txt
webgpu-route-token-readback-kit
webgpu-source-profile-kit
kit-catalog-readback-kit
source-fingerprint-kit
render-snapshot-normalizer-kit
input-action-frame-kit
input-result-kit
input-result-journal-kit
scenario-tick-result-kit
camera-state-readback-kit
volume-texture-result-kit
performance-level-result-kit
render-consumption-ledger-kit
serializable-CozyIslandHost-kit
webgpu-consumer-fixture-kit
central-ledger-readback-kit
```

## Main finding

Do not start next with a visual rewrite, cloud rewrite, ocean rewrite, fog rewrite, camera retune, renderer replacement, or route-token churn.

The durable blocker is WebGPU source/consumer readback. The route has a strong 50-kit catalog and two Node checks, but the browser runtime still exposes live Three.js/WebGPU objects and aggregate diagnostics through `globalThis.CozyIsland`. It lacks JSON-serializable source fingerprints, input result rows, scenario tick rows, performance degrade/recover rows, texture/render consumer rows, and an additive `CozyIslandHost` surface.

## Next safe ledge

```txt
MyCozyIsland WebGPU Source Consumer Readback Refresh + Node Fixture Gate
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
pushed to main: yes, documentation only
central ledger updated: yes
```
