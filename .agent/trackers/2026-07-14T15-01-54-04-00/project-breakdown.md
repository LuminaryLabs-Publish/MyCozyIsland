# Project breakdown: MyCozyIsland preload suspension lease and resumed-frame authority

**Timestamp:** `2026-07-14T15-01-54-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `fc5a119eefc7aad5e062b15df6325e2dc28a421a`  
**Status:** `preload-suspension-lease-resume-frame-authority-audited`

## Summary

MyCozyIsland combines a WebGPU-first postcard menu, a hidden preloaded game iframe, NexusEngine Core Startup, deterministic adventure services, Agriculture, Foraging, portable saves, and WebGPU/WebGL2 presentation. The current audit isolates the hidden game sleep/resume boundary. The bridge saves performance by replacing live engine methods and clearing the renderer animation loop after readiness, but it has no typed suspension lease or visible resumed-frame proof.

## Plan ledger

**Goal:** document every current participant and service, then define the smallest authority needed to suspend and restore one exact game generation before reveal.

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare ten eligible repositories against central ledgers and root `.agent` states.
- [x] Confirm no new, missing, undocumented, root-agent-missing, or runtime-ahead eligible repository.
- [x] Select only MyCozyIsland by the oldest synchronized central timestamp.
- [x] Inspect menu, game route, preload bridge, source smoke and package wiring.
- [x] Identify the complete interaction loop.
- [x] Identify all domains in use.
- [x] Identify all source-backed kits and adapters.
- [x] Identify all offered services.
- [x] Define a 24-surface future suspension authority.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected: LuminaryLabs-Publish/MyCozyIsland
prior central timestamp: 2026-07-14T09-39-44-04-00
selection rule: oldest synchronized documentation timestamp
```

## Interaction loop

```txt
index.html
  -> replace route with menu.html

menu.html
  -> load Three.js WebGPU/TSL providers
  -> initialize postcard renderer and scene
  -> schedule hidden game.html?preload=1

game.html
  -> load NexusEngine and Agriculture providers
  -> initialize Core Startup and adventure composition
  -> prepare world, save, input, player, camera and renderer
  -> publish startupHost descriptor

preload bridge
  -> poll descriptor
  -> forward progress
  -> on playable, freeze engine tick/step
  -> capture and stop renderer animation loop
  -> post ready

entry
  -> player activates Play
  -> parent posts cozy-game-enter
  -> child restores engine and renderer references
  -> child prepares intro and focus
  -> child posts cozy-game-entered immediately
  -> parent reveals on acknowledgement or 900 ms timeout
  -> menu stops after crossfade

adventure
  -> walk and sprint
  -> select seeds
  -> cultivate, plant, water and harvest
  -> forage wild coconuts
  -> advance scenario time and objectives
  -> render world/HUD snapshots
  -> auto-save durable state
```

## Domains in use

```txt
browser route and document lifecycle
history, focus and iframe visibility
module/import-map provider identity
menu shell, progress and controls
postcard scene, atlas, compute wind and bloom
same-origin preload and cross-window protocol
Core Startup readiness and continuation
engine world, ECS, tick and step
transaction ledger and idempotency
world generation and surface queries
input normalization and command queues
inventory and seed selection
agriculture and perennial growth
wild-resource foraging and respawn
player movement, grounding, stamina and intro mode
scenario time and objectives
interaction targeting and settlement
camera intro and first-person view
save capture, migration, validation, restore and rollback
renderer-neutral world and HUD snapshots
WebGPU/WebGL2 game rendering
adaptive quality and atmosphere/ocean composition
hidden simulation and presentation suspension
entry restoration, timeout and first-frame evidence
validation, test wiring and Pages deployment
repo-local and central audit tracking
```

## Complete implemented kit and service inventory

### Engine-installed core and adventure kits: 14

| Kit | Domain | Services |
|---|---|---|
| `core-startup-kit` | `n:core-startup` | launch, preparation registration, waiting, working, ready, failure, retry/fallback descriptor, continuation selection, first-frame admission, playable entry, snapshot, load, reset |
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot layout, forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, agriculture settlement, wild forage action, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor |

### Cataloged world, render and host kits: 50

| Kit | Offered services |
|---|---|
| `debug-overlay-host-kit` | draw, toggle, show, hide |
| `webgl2-fallback-renderer-kit` | fallback capability policy, CPU volume source, feature-disable policy |
| `webgpu-compute-atmosphere-renderer-kit` | cloud volume generation, fog volume generation, CPU fallback |
| `webgpu-foam-renderer-kit` | shoreline foam geometry, animation, render-layer contract |
| `webgpu-ocean-renderer-kit` | ocean geometry, wave deformation, optics, water-layer contract |
| `webgpu-performance-budget-kit` | frame sampling, moving average, FPS state, degrade callback, recover callback |
| `webgpu-post-processing-renderer-kit` | scene pass, fog pass, foam pass, depth mask, resolution scaling, pass-order readback |
| `webgpu-rolling-fog-renderer-kit` | fog volume, material, step scaling, readback |
| `webgpu-stylized-material-renderer-kit` | material descriptors, material construction |
| `webgpu-volumetric-cloud-renderer-kit` | cloud volumes, raymarch materials, step scaling, readback |
| `camera-rail-sequence-kit` | rail progression, camera-sequence descriptors |
| `cozy-island-scenario-kit` | scenario descriptors, sequence descriptors |
| `terrain-surface-domain-kit` | height, normal, material and surface queries |
| `vegetation-placement-domain-kit` | deterministic placement graph |
| `aerial-perspective-domain-kit` | horizon, distance and atmosphere descriptors |
| `campfire-atmosphere-domain-kit` | campfire light, smoke and heat descriptors |
| `cloud-density-field-domain-kit` | density recipe, texture budget |
| `cloud-horizon-band-domain-kit` | horizon placement descriptors |
| `cloud-lighting-domain-kit` | color, shadow, silver lining |
| `cloud-lod-domain-kit` | step policy, volume-count policy |
| `cloud-shadow-domain-kit` | shadow projection descriptors |
| `cloud-weather-domain-kit` | coverage, weather state |
| `fog-advection-domain-kit` | direction, speed |
| `fog-field-domain-kit` | density recipe, texture budget |
| `fog-volume-placement-domain-kit` | bounds, readability mask |
| `ground-contact-domain-kit` | terrain contact, clearance query |
| `illumination-domain-kit` | sun, sky, ambient and exposure state |
| `ocean-caustics-domain-kit` | caustic projection descriptors |
| `ocean-floor-profile-domain-kit` | seafloor shape, depth profile |
| `ocean-optics-domain-kit` | color, opacity, transmission, absorption, reflection |
| `ocean-wave-domain-kit` | deterministic wave components, sea level |
| `prop-archetype-domain-kit` | prop geometry and material archetypes |
| `render-archetype-domain-kit` | renderer-neutral object archetypes |
| `render-quality-domain-kit` | static tier selection, quality budgets |
| `render-snapshot-domain-kit` | renderer-neutral world snapshot |
| `rock-archetype-domain-kit` | rock placement and presentation archetypes |
| `shoreline-field-domain-kit` | shoreline classification, distance field |
| `shoreline-foam-domain-kit` | foam-band descriptors |
| `stylized-material-descriptor-domain-kit` | color, roughness, rim, outline |
| `sun-glitter-domain-kit` | water highlight descriptors |
| `terrain-biome-field-domain-kit` | deterministic biome classification |
| `terrain-lod-domain-kit` | terrain resolution and distance policy |
| `underwater-atmosphere-domain-kit` | underwater color, attenuation |
| `vegetation-archetype-domain-kit` | tree, palm, fern, bush and grass archetypes |
| `vegetation-lod-domain-kit` | density and distance policy |
| `vegetation-wind-domain-kit` | wind deformation descriptor |
| `weather-state-domain-kit` | weather state, transitions |
| `wind-field-domain-kit` | deterministic direction, strength |
| `deterministic-seed-domain-kit` | seed derivation, deterministic random |
| `environment-clock-domain-kit` | elapsed time, environmental phase |

### Additional composition kit: 1

| Kit | Offered services |
|---|---|
| `cozy-ocean-composition-kit` | logical render-layer graph, pass-order validation, transparent-depth validation, terrain-handoff validation, per-layer depth/blend contracts |

### Browser and product adapters: 5

| Adapter | Offered services |
|---|---|
| `browser-startup-presentation-adapter` | descriptor DOM projection, failure projection, timeout helper, render-update bridge |
| `cozy-startup-host` | product preparation order, product copy, engine reuse, continuation mapping, pre-playable global error capture, host disposal |
| `cozy-menu-scene-adapter` | Three.js WebGPU import, backend admission, procedural frond/flower atlases, alpha-cut cards, postcard scene, TSL materials, compute wind, WebGL2 fallback wind, water, shoreline, fog, lighting, pipeline, bloom, tone mapping, shadows, reduced motion, DPR resize, animation loop, public readback, delayed retirement |
| `cozy-menu-game-shell-adapter` | iframe preload, progress projection, Play gate, entry request, crossfade, history transition, focus transfer, fallback reveal, error display |
| `cozy-game-preload-bridge-adapter` | startup descriptor polling, parent messaging, simulation freeze/resume, presentation sleep/resume, player entry preparation, entry acknowledgement |

## Inventory totals

```txt
engine-installed kits: 14
cataloged kits: 50
additional composition kits: 1
source-backed kit total: 65
browser/product adapters: 5
total documented surfaces: 70
retained inactive catalog entries: 2
ordered Core World providers retained: 9
```

## Main finding

```txt
Core Startup playable
  -> live engine methods replaced
  -> live renderer loop cleared
  -> no suspension lease or participant result

Play
  -> captured references restored
  -> no current-participant identity check
  -> no atomic rollback
  -> entered acknowledgement posted before a resumed frame

parent
  -> reveals on acknowledgement
  -> or reveals after 900 ms without accepted child evidence
```

## Required parent authority

```txt
cozy-island-preload-suspension-lease-resume-frame-authority-domain
```

### Planned authority surfaces: 24

```txt
preload-generation-kit
suspension-attempt-kit
suspension-lease-kit
engine-participant-revision-kit
scheduler-participant-revision-kit
renderer-participant-revision-kit
animation-loop-revision-kit
input-participant-revision-kit
player-participant-revision-kit
preload-suspension-command-kit
preload-suspension-preparation-result-kit
preload-suspension-result-kit
entry-attempt-kit
game-entry-command-kit
stale-entry-rejection-kit
atomic-restoration-kit
restoration-rollback-kit
resumed-simulation-probe-kit
resumed-render-probe-kit
game-entry-result-kit
first-resumed-game-frame-ack-kit
entry-timeout-classification-kit
entry-recovery-control-kit
browser-build-pages-suspension-parity-kit
```

## Validation boundary

Documentation only. No runtime, gameplay, rendering, tests, dependencies, scripts, workflows or deployment behavior changed. Existing checks are source-structural and do not execute a browser suspension or restoration transaction.
