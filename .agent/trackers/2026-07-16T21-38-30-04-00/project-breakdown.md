# MyCozyIsland Breakdown — Menu Adaptive Quality Feedback

**Timestamp:** `2026-07-16T21-38-30-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `c280f86a7057532bcd4815cd4270846a84effd8a`  
**Selection class:** runtime-ahead priority

## Selection

The current `LuminaryLabs-Publish` inventory contains 11 repositories. `LuminaryLabs-Publish/TheCavalryOfRome` is excluded. All ten eligible repositories have central ledger entries and root `.agent` state. MyCozyIsland was selected because its runtime was seven commits ahead of the documented repo-local head `4a281f442e60fc154a477365e1e507ce76f7e276`.

The runtime delta replaces the former menu renderer with a declarative scene recipe, procedural texture atlases, a WebGPU-first Three.js/TSL renderer, responsive composition, quality tiers, GPU wind, animated water, post-processing and expanded smoke coverage.

## Interaction loop

```txt
index route
  -> replace with menu route

menu boot
  -> load declarative scene recipe and 15 menu domain descriptors
  -> initialize WebGPURenderer and detect WebGPU/WebGL2 backend
  -> choose one quality tier from initial viewport, DPR and CPU concurrency
  -> create sky, sun, horizon, water, shoreline, flowers, palm, wind and lighting
  -> create bloom pipeline
  -> begin the animation loop
  -> asynchronously preload game.html in a hidden same-origin iframe

menu frame
  -> damp pointer parallax
  -> decay pointer/hover wind boost
  -> update camera pose
  -> dispatch WebGPU palm-wind compute when available
  -> render scene plus bloom

resize
  -> reuse the quality tier selected at boot
  -> clamp DPR to the original tier
  -> update camera framing and renderer size
  -> keep original geometry, particle, shadow and post budgets

entry
  -> wait for Core Startup readiness
  -> post cozy-game-enter
  -> reveal and focus prepared gameplay iframe
  -> retire the menu renderer

game loop
  -> restore/create island state
  -> admit input
  -> tick scenario, player, Agriculture, Foraging and interaction
  -> project camera, world, HUD and save state
  -> render and autosave
```

## Domains in use

- Static route and module-import-map ownership.
- Same-origin iframe preload, readiness, entry, history and focus handoff.
- Core Startup, Object and Transaction Ledger.
- Seeded island world, surface queries and render descriptors.
- Input, Inventory, Agriculture, Foraging, player, scenario, interaction, camera and saves.
- WebGPU/WebGL2 full-game presentation and renderer-neutral snapshots.
- Declarative menu scene, composition, camera, hero palm, palm materials, palm motion, sky, shoreline, water, flowers, lighting, atmosphere, post effects, Play gate and background game preload.
- Procedural texture generation, TSL vertex/material logic, GPU compute, bloom, shadows, responsive framing and lifecycle disposal.
- Validation, build, Pages deployment and central documentation governance.

## Implemented kits and offered services

### Engine-installed core and adventure kits — 14

- `core-startup-kit`: launch, preparation registration, readiness, failure, continuation, first-frame admission, playable entry, snapshots, load and reset.
- `core-object-kit`: object registration, lookup and listing.
- `core-transaction-ledger-kit`: idempotency, apply-once settlement, records, snapshots and reset.
- `cozy-world-domain-kit`: seeded world, surface queries, plot and forage layouts, render bases, snapshots and reset.
- `cozy-input-domain-kit`: normalization, command queue, frame admission, held actions, clear, snapshots and reset.
- `cozy-inventory-domain-kit`: items, seed selection, transactions, batch settlement, snapshots and reset.
- `agriculture-domain-kit`: land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshots and reset.
- `cozy-foraging-domain-kit`: wild coconut nodes, collection, respawn, snapshots and reset.
- `cozy-player-domain-kit`: movement, grounding, view, stamina, snapshots and reset.
- `cozy-scenario-domain-kit`: time, objectives, snapshots and reset.
- `cozy-interaction-domain-kit`: targeting, context actions, agriculture settlement, foraging settlement, prompts, results, snapshots and reset.
- `cozy-camera-domain-kit`: aerial introduction, first-person view, terrain clearance and descriptors.
- `cozy-save-domain-kit`: capture, checksum validation, migration, restore, rollback, reset and diagnostics.
- `cozy-render-snapshot-domain-kit`: static world, agriculture descriptors, frame snapshots, HUD and debug descriptors.

### Cataloged world/render/host kits — 50

`debug-overlay-host-kit`, `webgl2-fallback-renderer-kit`, `webgpu-compute-atmosphere-renderer-kit`, `webgpu-foam-renderer-kit`, `webgpu-ocean-renderer-kit`, `webgpu-performance-budget-kit`, `webgpu-post-processing-renderer-kit`, `webgpu-rolling-fog-renderer-kit`, `webgpu-stylized-material-renderer-kit`, `webgpu-volumetric-cloud-renderer-kit`, `camera-rail-sequence-kit`, `cozy-island-scenario-kit`, `terrain-surface-domain-kit`, `vegetation-placement-domain-kit`, `aerial-perspective-domain-kit`, `campfire-atmosphere-domain-kit`, `cloud-density-field-domain-kit`, `cloud-horizon-band-domain-kit`, `cloud-lighting-domain-kit`, `cloud-lod-domain-kit`, `cloud-shadow-domain-kit`, `cloud-weather-domain-kit`, `fog-advection-domain-kit`, `fog-field-domain-kit`, `fog-volume-placement-domain-kit`, `ground-contact-domain-kit`, `illumination-domain-kit`, `ocean-caustics-domain-kit`, `ocean-floor-profile-domain-kit`, `ocean-optics-domain-kit`, `ocean-wave-domain-kit`, `prop-archetype-domain-kit`, `render-archetype-domain-kit`, `render-quality-domain-kit`, `render-snapshot-domain-kit`, `rock-archetype-domain-kit`, `shoreline-field-domain-kit`, `shoreline-foam-domain-kit`, `stylized-material-descriptor-domain-kit`, `sun-glitter-domain-kit`, `terrain-biome-field-domain-kit`, `terrain-lod-domain-kit`, `underwater-atmosphere-domain-kit`, `vegetation-archetype-domain-kit`, `vegetation-lod-domain-kit`, `vegetation-wind-domain-kit`, `weather-state-domain-kit`, `wind-field-domain-kit`, `deterministic-seed-domain-kit`, `environment-clock-domain-kit`.

These provide renderer fallback, atmosphere preparation, ocean/foam/post-processing, quality policy, camera/scenario descriptors, terrain and vegetation queries, cloud/fog/weather fields, illumination, shoreline/ocean optics, render archetypes, deterministic seeds and environment time.

### Additional composition kit — 1

- `cozy-ocean-composition-kit`: layer graph, pass ordering, transparent-depth validation, terrain handoff and depth-blend contracts.

### Explicit menu domain and kit registry — 15

- `n:entry:menu:scene`: menu scene state and entry transition.
- `n:entry:menu:composition`: rule-of-thirds composition and negative space.
- `n:entry:menu:camera`: camera descriptor and responsive framing.
- `n:entry:menu:hero-palm`: hero palm descriptor.
- `n:entry:menu:palm-material`: bark and alpha-cut frond shading.
- `n:entry:menu:palm-motion`: wind field and palm deformation.
- `n:entry:menu:sky`: sunset sky and sun presentation.
- `n:entry:menu:shoreline`: curved distant shoreline.
- `n:entry:menu:water`: animated wave strip and foam glints.
- `n:entry:menu:flowers`: distant flower-card clusters.
- `n:entry:menu:lighting`: key, fill, rim and shadow policy.
- `n:entry:menu:atmosphere`: horizon haze and depth separation.
- `n:entry:menu:post-effects`: exposure, bloom and final output.
- `n:entry:menu:play-gate`: readiness and player entry request.
- `n:entry:menu:game-preload`: background game preparation and handoff.

### Browser/product adapters — 4 outside the explicit menu registry

- `browser-startup-presentation-adapter`: startup descriptor DOM projection, failure projection, timeout helpers and render updates.
- `cozy-startup-host`: preparation ordering, engine reuse, continuation mapping, global error capture and disposal.
- `cozy-menu-game-shell-adapter`: iframe preload, progress, Play gate, entry, crossfade, history, focus and fallback.
- `cozy-game-preload-bridge-adapter`: embed classification, messaging, simulation/presentation freeze and resume, entry preparation and acknowledgement.

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits:     50
additional composition kits:           1
explicit menu domain/kit surfaces:     15
other browser/product adapters:         4
total implemented surfaces:            84
planned menu quality surfaces:          18
```

## Main finding

`chooseMenuQuality()` selects `high`, `balanced` or `low` once during renderer construction using the initial backend, viewport size, device-pixel ratio and hardware-concurrency estimate. The selected tier fixes DPR cap, shadow-map size, particle count, water tessellation and horizon tessellation.

The resize path reuses that original tier. It changes renderer size and camera/palm composition, but it does not re-run quality admission or rebuild tier-bound scene resources. The frame loop does not measure frame cost, GPU completion, long tasks, memory pressure or sustained missed-frame evidence. `getState()` reports the original tier but exposes no transition revision, reason or settled frame acknowledgement.

```txt
initial backend-aware tier selection: present
initial viewport/DPR/CPU heuristic: present
tier-bound DPR cap: present
tier-bound geometry and particles: present
tier-bound shadow budget: present
responsive camera composition: present
visibility suspension: present

runtime frame-cost sampling: absent
resize/DPR quality re-admission: absent
sustained overload admission: absent
sustained recovery admission: absent
quality transition hysteresis: absent
resource rebuild/retirement result: absent
quality generation/revision: absent
FirstMenuQualityBoundFrameAck: absent
browser performance fixture: absent
```

This is a source-backed quality-ownership and executable-proof gap. It does not prove that the current menu misses frame targets on a specific device.

## Proposed authority

```txt
cozy-island-menu-frame-budget-adaptive-quality-authority-domain
```

```txt
MenuQualityAdmissionCommand
  -> bind backend, viewport, DPR, hardware and scene-recipe revisions
  -> admit one initial quality generation
  -> publish MenuQualityAdmissionResult

MenuFrameBudgetEvidenceCommand
  -> sample CPU frame cost, GPU completion and missed-frame evidence
  -> normalize hidden, entering and inactive periods
  -> publish bounded rolling evidence

MenuQualityTransitionCommand
  -> require sustained overload or sustained recovery
  -> apply downgrade/upgrade hysteresis and cooldown
  -> stage DPR, shadow, particle, geometry and post budgets
  -> rebuild or retire generation-bound resources exactly once
  -> publish MenuQualityTransitionResult

MenuQualityFrameCommitCommand
  -> render from one accepted quality generation
  -> reject stale resources and transitions
  -> publish FirstMenuQualityBoundFrameAck
```

### Proposed coordinating surfaces — 18

`menu-quality-capability-admission-kit`, `menu-quality-generation-kit`, `menu-frame-budget-sampler-kit`, `menu-gpu-completion-evidence-kit`, `menu-missed-frame-evidence-kit`, `menu-visibility-evidence-filter-kit`, `menu-overload-hysteresis-kit`, `menu-recovery-hysteresis-kit`, `menu-quality-cooldown-kit`, `menu-dpr-budget-transition-kit`, `menu-shadow-budget-transition-kit`, `menu-particle-budget-transition-kit`, `menu-geometry-budget-transition-kit`, `menu-post-budget-transition-kit`, `menu-resource-generation-retirement-kit`, `menu-quality-transition-result-kit`, `first-menu-quality-bound-frame-ack-kit`, `menu-quality-browser-fixture-kit`.

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, scene content, shaders, tests, workflows and deployment are unchanged. Source files were inspected; runtime browser fixtures, performance captures, builds and Pages smoke were not run. No adaptive-quality correctness or production-readiness claim is made.