# Project breakdown: MyCozyIsland Core Startup integration and bootstrap admission

**Timestamp:** `2026-07-13T10-41-40-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Scope:** documentation-only runtime reconciliation

## Summary

MyCozyIsland now composes the optional NexusEngine Core Startup domain into the same engine instance used by the complete Agriculture adventure. The implementation replaces manual loading percentages with factual preparation state, continuation selection, structured failure projection and a first-render gate. The remaining boundary is earlier than Core Startup itself: `index.html` statically imports the complete browser module graph, so import-map, CDN, parse or module-evaluation failure can occur before the startup host, failure listeners or typed startup result exist.

## Plan ledger

**Goal:** reconcile the new Core Startup runtime and define one provider-independent bootstrap transaction from the static HTML shell through module admission, Core Startup preparation, first rendered frame and playable entry.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger rows and root `.agent` state.
- [x] Detect MyCozyIsland is ten commits ahead of its centrally reviewed documentation head.
- [x] Select and modify only `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Inspect the startup host, browser entrypoint, composition runtime, import map, post pipeline, startup smoke and package scripts.
- [x] Identify the complete startup/gameplay interaction loop and active domains.
- [x] Update the inventory to 65 source-backed kit surfaces plus two browser startup adapters.
- [x] Define the missing static-module bootstrap admission authority.
- [x] Add timestamped architecture, render, gameplay, interaction, startup, deployment and central-sync audits.
- [ ] Implement the bootstrap authority and executable import/provider/first-frame fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
runtime-ahead-of-central repositories: 1

MyCozyIsland       selected: 10 commits ahead of central documentation
IntoTheMeadow      centrally aligned at 2026-07-13T05-40-11-04-00
PhantomCommand     centrally aligned at 2026-07-13T05-59-03-04-00
HorrorCorridor     centrally aligned at 2026-07-13T07-00-29-04-00
ZombieOrchard      centrally aligned at 2026-07-13T07-41-11-04-00
PrehistoricRush    centrally aligned at 2026-07-13T08-39-12-04-00
TheUnmappedHouse   centrally aligned at 2026-07-13T09-03-20-04-00
TheOpenAbove       centrally aligned at 2026-07-13T09-40-27-04-00
AetherVale         centrally aligned at 2026-07-13T10-05-15-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/MyCozyIsland` is modified in the Publish organization.

## Reconciled runtime changes

```txt
acd3838  add Cozy Island startup host
 d0144ec  compose adventure through Core Startup
03bea1d  drive loading through Core Startup
6207085  prove Cozy Island Core Startup flow
4041c2f  pin Core Startup NexusEngine
3f7eef9  load Core Startup browser entrypoints
0e7843a  document Core Startup integration
54d4cc9  record Core Startup integration
f29e3f1  surface first-frame startup errors
2d2c131  preserve product startup display order
```

The runtime now:

- creates one engine with `core-startup-kit` installed;
- passes that engine into the complete adventure composition;
- declares runtime, renderer, composition, continuation, world and input preparations;
- selects new or restored continuation after save inspection;
- uses the browser startup presentation adapter to drive the existing loader DOM;
- wraps renderer and atmosphere initialization in bounded timeouts;
- reports structured pre-playable browser errors and unhandled rejections;
- requires one `postPipeline.render()` call before `enter()` can mark the launch playable;
- exposes startup state through `CozyIsland.startup` and `adventure.getState()`;
- adds a headless startup smoke before the Agriculture smoke.

## Complete interaction loop

```txt
HTML shell
  -> import map declares Three.js, NexusEngine, Core Startup, Core Object,
     Core Transaction Ledger and Agriculture provider URLs
  -> static module tag requests src/main-adventure.js
  -> browser resolves and evaluates the complete static module graph

Core Startup host
  -> create engine and install n:core-startup
  -> launch startup session with six preparation facts
  -> mark runtime ready
  -> connect renderer-neutral descriptor to product DOM copy

Renderer preparation
  -> construct Three WebGPU renderer
  -> await bounded renderer.init()
  -> select WebGPU or WebGL2 quality
  -> mark renderer ready

Adventure composition
  -> reuse the startup engine
  -> install Core Object, Core Transaction Ledger, world, input, Inventory,
     Agriculture, Foraging, player, scenario, interaction, camera, save and
     render-snapshot kits
  -> mark composition ready

Continuation
  -> read browser save
  -> validate/restore or select a new run
  -> publish continuation receipt

World preparation
  -> construct scene, camera, sky, lights, island, gameplay projection,
     ocean, foam, cloud/fog volumes and post pipeline
  -> mark world ready

Input preparation
  -> install wheel, pointer, keyboard, blur, visibility and resize adapters
  -> mark input ready

First animation frame
  -> adventure.tick(dt)
  -> update camera, lighting, world, gameplay, foam and HUD
  -> postPipeline.render()
  -> publish caller-authored first-frame receipt
  -> enter playable state
  -> fade and later hide loader

Steady state
  -> input queue -> engine tick -> frame snapshot -> scene/HUD projection
  -> adaptive quality sampling -> post pipeline
  -> periodic save capture and browser write
```

## Source-backed findings

### Core Startup ownership is correctly bounded

`core-startup-kit` owns factual launch state, preparation status, continuation, failure, first-frame admission, playable entry and portable startup snapshots. Product wording remains in `formatCozyStartupDescriptor()`, while DOM/CSS remain browser presentation concerns.

### One engine instance now owns startup and adventure state

`createCozyStartupHost()` creates the engine and `createCozyAdventure()` accepts that engine, installs the remaining kits and exposes the same Core Startup descriptor through adventure state. This avoids a split startup engine and gameplay engine.

### Static module failure remains outside the startup authority

The static module tag imports `src/main-adventure.js`. That module statically imports Three WebGPU, local renderer kits, the product startup host and all transitive NexusEngine/provider modules. `createCozyStartupHost()` and its global error listeners do not exist until the graph has resolved, parsed and evaluated. A failed import-map resolution, CDN request, syntax error or top-level evaluation can therefore leave the static loader at `Starting NexusEngine` without a typed failure, timeout, retry or fallback result.

### First-frame evidence is admission evidence, not visible completion evidence

The animation loop calls `postPipeline.render()` and immediately publishes a caller-authored receipt containing a frame ID, presentation ID, backend and pass order. The post pipeline returns no render result, submission ID, GPU completion receipt, readback or visible-frame acknowledgement. The gate proves call order in source and smoke tests, not that the frame became visible.

### Global startup failure capture is lifecycle-limited

The host registers `error` and `unhandledrejection` listeners after module evaluation and suppresses reporting after `playable`. `startupHost.dispose()` removes them, but the browser host does not currently call that disposal path during page retirement.

## Domains in use

```txt
static HTML shell and import-map resolution
browser module-provider and bootstrap admission
NexusEngine Core Startup launch/readiness/failure/continuation/first-frame state
browser startup presentation adapter and product loading copy
NexusEngine composition, scheduler, clock and service graph
Core Object registration
Core Transaction Ledger idempotency
seeded world, terrain, plots and forage descriptors
browser input command admission
Inventory balances and seed selection
Agriculture land, soil, cultivation, water, growth, harvest and perennials
wild Foraging collection and respawn
player movement, scenario time, interaction and camera
portable save capture, migration, restore, rollback and reset
renderer-neutral static/frame/HUD/debug snapshots
WebGPU/WebGL2 renderer, atmosphere, ocean, foam, materials and post pipeline
adaptive render quality and diagnostics
page lifecycle and browser storage
bootstrap identity, provider manifest, timeout, failure, retry and fallback
first-render submission and visible-frame acknowledgement
validation, Actions, Pages and central tracking
```

## Implemented kits and offered services

### Engine-installed core and adventure kits: 14

| Kit | Domain | Offered services |
|---|---|---|
| `core-startup-kit` | `n:core-startup` | launch, preparation registration, waiting/working/ready state, failure, retry/fallback descriptor, continuation selection, first-frame admission, playable entry, snapshot, load, reset |
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot layout, forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture settlement, wild forage action, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor |

### Cataloged world, render and host kits: 50

- `debug-overlay-host-kit`: draw, toggle, show, hide
- `webgl2-fallback-renderer-kit`: fallback capability policy, CPU volume source, feature-disable policy
- `webgpu-compute-atmosphere-renderer-kit`: cloud volume generation, fog volume generation, CPU fallback
- `webgpu-foam-renderer-kit`: shoreline foam geometry, animation, render-layer contract
- `webgpu-ocean-renderer-kit`: ocean geometry, wave deformation, optics, water-layer contract
- `webgpu-performance-budget-kit`: frame sampling, moving average, FPS state, degrade callback, recover callback
- `webgpu-post-processing-renderer-kit`: scene pass, fog pass, foam pass, depth mask, resolution scaling, pass-order readback
- `webgpu-rolling-fog-renderer-kit`: fog volume, material, step scaling, readback
- `webgpu-stylized-material-renderer-kit`: material descriptors, material construction
- `webgpu-volumetric-cloud-renderer-kit`: cloud volumes, raymarch materials, step scaling, readback
- `camera-rail-sequence-kit`: rail progression, camera-sequence descriptors
- `cozy-island-scenario-kit`: scenario descriptors, sequence descriptors
- `terrain-surface-domain-kit`: height query, normal query, material query, surface query
- `vegetation-placement-domain-kit`: deterministic placement graph
- `aerial-perspective-domain-kit`: horizon descriptor, distance descriptor, atmosphere descriptor
- `campfire-atmosphere-domain-kit`: campfire light, smoke descriptor, heat descriptor
- `cloud-density-field-domain-kit`: density recipe, texture budget
- `cloud-horizon-band-domain-kit`: horizon placement descriptors
- `cloud-lighting-domain-kit`: color, shadow, silver lining
- `cloud-lod-domain-kit`: step policy, volume-count policy
- `cloud-shadow-domain-kit`: shadow projection descriptors
- `cloud-weather-domain-kit`: coverage, weather state
- `fog-advection-domain-kit`: direction, speed
- `fog-field-domain-kit`: density recipe, texture budget
- `fog-volume-placement-domain-kit`: bounds, readability mask
- `ground-contact-domain-kit`: terrain contact, clearance query
- `illumination-domain-kit`: sun state, sky state, ambient state, exposure state
- `ocean-caustics-domain-kit`: caustic projection descriptors
- `ocean-floor-profile-domain-kit`: seafloor shape, depth profile
- `ocean-optics-domain-kit`: color, opacity, transmission, absorption, reflection
- `ocean-wave-domain-kit`: deterministic wave components, sea level
- `prop-archetype-domain-kit`: prop geometry archetypes, prop material archetypes
- `render-archetype-domain-kit`: renderer-neutral object archetypes
- `render-quality-domain-kit`: static tier selection, quality budgets
- `render-snapshot-domain-kit`: renderer-neutral world snapshot
- `rock-archetype-domain-kit`: rock placement archetypes, rock presentation archetypes
- `shoreline-field-domain-kit`: shoreline classification, distance field
- `shoreline-foam-domain-kit`: foam band descriptors
- `stylized-material-descriptor-domain-kit`: color, roughness, rim, outline
- `sun-glitter-domain-kit`: water highlight descriptors
- `terrain-biome-field-domain-kit`: deterministic biome classification
- `terrain-lod-domain-kit`: terrain resolution policy, distance policy
- `underwater-atmosphere-domain-kit`: underwater color, attenuation
- `vegetation-archetype-domain-kit`: tree, palm, fern, bush and grass archetypes
- `vegetation-lod-domain-kit`: density policy, distance policy
- `vegetation-wind-domain-kit`: wind deformation descriptor
- `weather-state-domain-kit`: weather state, transitions
- `wind-field-domain-kit`: deterministic direction, strength
- `deterministic-seed-domain-kit`: seed derivation, deterministic random
- `environment-clock-domain-kit`: elapsed time, environmental phase

### Additional composition kit: 1

- `cozy-ocean-composition-kit`: logical render-layer graph, pass-order validation, transparent-depth validation, terrain-handoff validation, per-layer depth/blend contracts

### Startup adapters outside the kit census: 2

- `browser-startup-presentation-adapter`: descriptor-to-DOM projection, failure projection, timeout helper, render/update bridge
- `cozy-startup-host`: product preparation order, product copy, engine reuse, continuation mapping, global pre-playable error capture and host disposal

### Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed kit surfaces: 65
active route surfaces: 63
retained inactive catalog entries: 2
startup adapters outside kit census: 2
ordered Core World providers retained: 9
```

## Required parent authority

```txt
cozy-island-static-module-bootstrap-admission-authority-domain
```

## Required transaction

```txt
StaticBootstrapCommand
  -> bind deployment, document and bootstrap generations
  -> install provider-independent error and timeout projection from local HTML
  -> resolve immutable import/provider manifest
  -> dynamically import the browser entry module under a bounded timeout
  -> validate exported bootstrap contract
  -> publish ModuleGraphAdmissionResult
  -> create exactly one Core Startup launch only after module admission
  -> bind launch ID to module/provider receipts
  -> execute renderer, composition, continuation, world and input preparations
  -> submit the first frame and publish a renderer-derived result
  -> acknowledge the first matching visible frame
  -> enter playable state or expose typed retry/fallback without partial adventure mutation
```

## Planned coordinating kits

```txt
bootstrap-generation-kit
bootstrap-provider-manifest-kit
bootstrap-command-kit
static-shell-failure-projection-kit
module-import-timeout-kit
module-graph-admission-result-kit
provider-source-receipt-kit
provider-version-integrity-kit
bootstrap-export-contract-kit
core-startup-launch-binding-kit
stale-bootstrap-rejection-kit
duplicate-bootstrap-rejection-kit
bootstrap-cancellation-kit
bootstrap-retry-policy-kit
bootstrap-fallback-policy-kit
bootstrap-observation-kit
bootstrap-journal-kit
first-render-submit-result-kit
visible-startup-frame-kit
first-visible-startup-ack-kit
bootstrap-disposal-kit
static-import-failure-fixture-kit
provider-timeout-fixture-kit
module-evaluation-failure-fixture-kit
first-frame-device-loss-fixture-kit
source-build-pages-bootstrap-parity-fixture-kit
```

## Validation boundary

This audit changes documentation only. The Core Startup runtime implementation already existed on `main`; this run does not alter startup, gameplay, rendering, persistence, dependencies, package scripts or deployment behavior. The new startup smoke was inspected but not independently executed, and no browser, built-output, provider-failure or Pages fixture was run.