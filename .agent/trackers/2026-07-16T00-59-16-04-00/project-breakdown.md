# Project breakdown: MyCozyIsland renderer device and context loss recovery

**Timestamp:** `2026-07-16T00-59-16-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `6505b5dd0c3ff9b6524e93b1d7bf841a6de4df54`  
**Status:** `renderer-device-context-loss-recovery-authority-audited`

## Summary

MyCozyIsland owns two WebGPU-first Three.js surfaces: the postcard menu and the full island game. Both initialize a renderer and start an animation loop, but the product source does not define a renderer-generation identity, WebGPU device-loss observer, WebGL context-loss observer, bounded recovery attempt, resource rehydration result, stale-generation rejection or first-recovered-frame acknowledgement. The hidden preloaded game can also sleep and later resume the same renderer without a product-owned health admission step.

## Plan ledger

**Goal:** preserve one authoritative visual generation across menu preload, game entry and runtime GPU loss, and either recover to a proven frame or expose a typed fallback without allowing stale render work to continue.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and ten root `.agent` states.
- [x] Confirm no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repository.
- [x] Select only MyCozyIsland through the oldest synchronized timestamp rule.
- [x] Trace menu renderer initialization, hidden game preload, presentation freeze/resume, game renderer initialization, animation, startup failure and page lifecycle.
- [x] Preserve all 70 implemented kit, composition and adapter surfaces and their services.
- [x] Identify the missing renderer-loss and recovery ownership boundary.
- [x] Define one parent authority and 20 coordinating surfaces.
- [x] Add the timestamped root `.agent` audit family.
- [x] Change documentation only.
- [ ] Implement and execute WebGPU-loss, WebGL-context-loss, hidden-preload, recovery, artifact and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

MyCozyIsland      2026-07-15T19-58-42-04-00 selected
IntoTheMeadow     2026-07-15T20-38-13-04-00
PrehistoricRush   2026-07-15T20-59-46-04-00
HorrorCorridor    2026-07-15T21-39-15-04-00
TheOpenAbove      2026-07-15T22-00-36-04-00
ZombieOrchard     2026-07-15T22-40-29-04-00
TheUnmappedHouse  2026-07-15T23-00-03-04-00
PhantomCommand    2026-07-16T00-00-40-04-00
AetherVale        2026-07-16T00-26-16-04-00
TheLongHaul       2026-07-16T00-38-29-04-00
TheCavalryOfRome  excluded
```

## Complete interaction loop

```txt
menu boot
  -> construct WebGPURenderer
  -> await renderer.init
  -> create scene, compute wind and post pipeline
  -> start menu animation loop
  -> start hidden same-origin game preload

hidden game preparation
  -> construct a second WebGPURenderer
  -> prepare atmosphere, scene and post pipeline
  -> present one accepted first frame
  -> freeze simulation and set the game animation loop to null
  -> publish cozy-game-ready

entry
  -> Play sends cozy-game-enter
  -> hidden game restores the same animation-loop callback
  -> menu disposes its own renderer and pipeline after the crossfade
  -> no renderer-health admission or recovered-frame acknowledgement

active adventure
  -> browser input enters cozy-input
  -> player, scenario, Agriculture, Foraging and interaction settle
  -> render snapshot publishes the accepted frame
  -> world, gameplay, ocean, foam, cloud, fog and post surfaces update
  -> postPipeline.render presents the visible frame

renderer/device loss path
  -> WebGPU device or WebGL context becomes unavailable
  -> no product-owned loss observer publishes a typed result
  -> no renderer generation is retired
  -> no bounded reconstruction or resource rehydration begins
  -> no stale animation callback is rejected
  -> no fallback or first-recovered-frame acknowledgement exists
```

## Domains in use

```txt
static menu and game routes
same-origin iframe preload, messaging, entry and focus handoff
Core Startup, Object and Transaction Ledger
seeded world, input, Inventory, Agriculture and Foraging
player, scenario, interaction and camera
portable save and renderer-neutral snapshots
menu WebGPU/WebGL2 presentation
full-game WebGPU/WebGL2 presentation
atmosphere, cloud, fog, ocean, foam and post-processing
renderer capability, generation, loss, recovery and fallback
simulation/input policy during presentation loss
first-recovered-frame convergence
validation, build, Pages and central governance
```

## Implemented kits and services

### Engine-installed kits

| Kit | Domain | Services |
|---|---|---|
| `core-startup-kit` | `n:core-startup` | launch, preparation, readiness, failure, continuation, first frame, playable entry, snapshot, load, reset |
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot/forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture/Foraging settlement, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture, frame, HUD and debug descriptors |

### Cataloged world, render and host kits

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

Their services cover renderer fallback, atmosphere-volume preparation, ocean, foam and post passes, adaptive quality, camera/scenario descriptors, terrain and vegetation queries, cloud/fog/weather fields, illumination, shoreline and ocean optics, render archetypes, deterministic seeds and environment time.

### Composition and browser adapters

| Surface | Services |
|---|---|
| `cozy-ocean-composition-kit` | layer graph, pass order, depth/blend validation |
| `browser-startup-presentation-adapter` | startup/failure DOM projection, timeout and update bridge |
| `cozy-startup-host` | preparation order, engine reuse, continuation, global startup errors, disposal |
| `cozy-menu-scene-adapter` | WebGPU/WebGL2 postcard, atlases, wind, water, fog, lighting, post, resize, animation, retirement |
| `cozy-menu-game-shell-adapter` | iframe preload, progress, Play gate, entry, crossfade, history, focus, fallback |
| `cozy-game-preload-bridge-adapter` | embed classification, messaging, simulation/presentation freeze-resume, entry preparation and acknowledgement |

```txt
engine-installed kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total implemented surfaces: 70
planned renderer-recovery surfaces: 20
```

## Source-backed finding

`src/menu.js` creates and initializes a `THREE.WebGPURenderer`, creates a render pipeline and starts an animation loop. Its product failure path is `main().catch(reportFailure)`, which covers startup rejection but does not establish runtime device/context loss ownership.

`src/main-adventure.js` also creates a `THREE.WebGPURenderer`, bounds initialization with Core Startup, constructs atmosphere and post resources and starts one animation loop. The inspected host does not subscribe to a product-owned WebGPU device-loss result or WebGL `webglcontextlost`/`webglcontextrestored` result.

`src/adventure/startup-host.js` ignores global errors after Core Startup reports the application playable. Runtime renderer loss therefore has no defined route back into a typed product failure or recovery state.

`src/game-preload-bridge.js` freezes the hidden game's presentation by removing the animation loop and later restores the same callback. It does not re-admit renderer capability or require a fresh presented-frame acknowledgement before publishing entry success.

This establishes a missing product authority and proof boundary. It does not claim that Three.js or the browser can never recover internally, and no physical device-loss incident was reproduced.

## Required authority

```txt
cozy-island-render-device-context-recovery-authority-domain
```

```txt
RenderRecoveryAdmissionCommand
  -> bind document, route, renderer, backend, device/context and resource generations
  -> observe WebGPU device loss and WebGL context loss/restoration
  -> classify transient, recoverable, fatal, stale and retired generations
  -> suspend presentation and apply the declared simulation/input policy
  -> reject stale animation callbacks and stale recovery work
  -> create one bounded recovery attempt
  -> reconstruct the renderer, post pipeline and registered GPU resources
  -> rehydrate scene descriptors from renderer-neutral snapshots
  -> validate hidden-preload and active-route ownership
  -> publish RenderRecoveryResult or RenderFallbackResult
  -> present one accepted recovered frame
  -> publish FirstRecoveredFrameAck
```

## Planned authority surfaces

```txt
renderer-capability-observation-kit
renderer-generation-identity-kit
webgpu-device-loss-observer-kit
webgl-context-loss-observer-kit
context-loss-admission-kit
render-suspension-on-loss-kit
simulation-policy-on-render-loss-kit
input-policy-on-render-loss-kit
recovery-attempt-command-kit
renderer-reconstruction-kit
render-resource-rehydration-kit
scene-resource-registry-kit
post-pipeline-rebuild-kit
preload-recovery-coordination-kit
stale-render-generation-rejection-kit
recovery-timeout-policy-kit
renderer-failure-fallback-kit
render-recovery-result-kit
first-recovered-frame-ack-kit
renderer-loss-source-build-pages-fixture-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, simulation, gameplay, render behavior, GPU-resource behavior, dependencies, tests, workflows and deployment were not changed.