# Project breakdown: MyCozyIsland menu/game preload handoff

**Timestamp:** `2026-07-13T12-38-45-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Status:** `menu-game-preload-handoff-scheduler-authority-audited`

## Summary

MyCozyIsland now has a dedicated living menu, a hidden same-origin `game.html` preload surface, factual Core Startup progress, and a Play handoff that reveals the already-created game. The implementation avoids a second world build, but it has no single authority over the menu RAF, hidden game animation loop, simulation freeze/resume, entry generation, stale callbacks, or the first visible game frame.

## Plan ledger

**Goal:** preserve the seamless menu experience while making background preload, quiescence, entry, lifecycle, and visible-frame completion one typed generation-bound transaction.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm nine eligible central-ledger entries and root `.agent` folders.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` because ten menu/game-shell commits are newer than central tracking.
- [x] Inspect root routing, menu shell, Canvas2D loop, preload iframe, message protocol, game bridge, adventure tick, render loop, tests, package wiring, and deployment copy.
- [x] Identify the complete interaction loop and domains.
- [x] Preserve all 65 source-backed DSK/kit surfaces and enumerate five browser/product adapters.
- [x] Define the missing handoff and scheduler authority.
- [x] Add timestamped architecture, render, gameplay, interaction, preload-handoff, deploy, and central-sync audits.
- [ ] Implement runtime authority and executable source/browser/build/Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new or ledger-missing repositories: 0
root-agent-missing repositories: 0
runtime-ahead repositories: 1
selected: LuminaryLabs-Publish/MyCozyIsland
reason: current main is 10 commits ahead of the centrally reviewed documentation head
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/MyCozyIsland` is modified in the Publish organization.

## Complete interaction loop

```txt
root request
  -> index.html preserves query/hash
  -> location.replace(menu.html)

menu boot
  -> create full-screen Canvas2D palm scene
  -> start recursive menu requestAnimationFrame loop
  -> schedule background preload with requestIdleCallback or timeout
  -> set iframe src to game.html?preload=1

game preload
  -> load remote Three.js, NexusEngine, NexusEngine-Kits and local modules
  -> create Core Startup host and adventure engine
  -> initialize renderer and complete world construction
  -> start renderer.setAnimationLoop
  -> tick adventure, update presentation, render first frame
  -> Core Startup enters playable inside hidden iframe

bridge readiness
  -> poll Core Startup descriptor every 120 ms
  -> when playable, replace engine.tick and engine.step with no-op functions
  -> keep the game animation/render loop running
  -> send cozy-game-ready to the menu
  -> enable Play at visible 99 percent

player entry
  -> menu sends cozy-game-enter
  -> bridge restores engine.tick and engine.step
  -> reset player mode/introProgress and clear input
  -> bridge sends cozy-game-entered
  -> menu reveals the iframe, rewrites history to game.html, then stops menu animation after the transition
  -> if acknowledgement is absent for 900 ms, menu reveals the iframe anyway

steady game
  -> full input/tick/render/autosave loop
  -> pagehide saves and partially disposes gameplay presentation
```

## Source-backed main finding

### Two presentation schedulers remain active

The menu recursively schedules `requestAnimationFrame(animate)`. The hidden game independently runs `renderer.setAnimationLoop`. Opacity and pointer-event settings do not retire the hidden game renderer.

`freezeSimulation()` replaces only `engine.tick` and `engine.step`. The game loop still executes camera reads, world and gameplay renderer updates, foam updates, HUD projection, performance-budget sampling, `postPipeline.render()`, autosave fingerprint checks, and diagnostics.

### Entry is not one terminal transaction

The menu and iframe communicate with unversioned string message types. There is no `PreloadGeneration`, `EntryAttemptId`, scheduler lease, stale-message rejection, duplicate-result suppression, or terminal handoff result. The parent also reveals the iframe after a 900 ms timeout even when `cozy-game-entered` is not received.

### Visibility can duplicate the menu RAF chain

The recursive menu loop retains a pending RAF callback. On every transition back to visible, the `visibilitychange` listener requests another animation callback. No scheduler token prevents multiple recursive chains from becoming active.

### Visible completion is unproven

`cozy-game-entered` is posted immediately after simulation resume and player snapshot adjustment. It does not prove a successor game frame was simulated, submitted, or displayed. The parent can begin the fade before the first post-resume frame exists.

## Domains in use

```txt
root route and document navigation
menu scene generation and Canvas2D presentation
menu input, reduced-motion policy, progress and error projection
iframe preload surface and same-origin ownership
cross-window message admission
Core Startup readiness and continuation
NexusEngine composition and simulation
world, Inventory, Agriculture, Foraging, player, camera and interaction
save capture, migration and browser storage
WebGPU/WebGL2 atmosphere, ocean, foam, post-processing and quality
simulation freeze/resume and player intro preparation
history, focus and accessibility transition
browser visibility, pagehide and retirement
static tests, Actions, Pages and central tracking
missing preload-generation, scheduler, handoff-result and visible-frame authority
```

## Implemented DSK/kit census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed DSK/kit surfaces: 65
active route kit surfaces: 63
retained inactive catalog entries: 2
browser/product adapters: 5
total documented kit and adapter surfaces: 70
```

### Engine-installed kits and services

```txt
core-startup-kit
  launch, preparations, waiting, working, ready, failure, retry/fallback descriptors,
  continuation, first-frame admission, playable entry, snapshot, load, reset

core-object-kit
  registration, lookup, listing

core-transaction-ledger-kit
  idempotency ledger, record, apply-once, snapshot, reset

cozy-world-domain-kit
  seeded world, surface queries, plots, forage layout, render base, snapshot, reset

cozy-input-domain-kit
  normalization, command queue, frame admission, held actions, clear, snapshot, reset

cozy-inventory-domain-kit
  items, seed selection, transactions, batch settlement, snapshot, reset

agriculture-domain-kit
  land, soil, cultivation, water, growth, harvest, perennials, descriptors, events,
  snapshot, reset

cozy-foraging-domain-kit
  wild coconut nodes, collection, respawn, snapshot, reset

cozy-player-domain-kit
  movement, grounding, view, stamina, snapshot, reset

cozy-scenario-domain-kit
  time, objective, snapshot, reset

cozy-interaction-domain-kit
  targeting, contextual action, Agriculture settlement, wild forage action,
  prompt, result, snapshot, reset

cozy-camera-domain-kit
  aerial intro, first-person view, terrain clearance, descriptors

cozy-save-domain-kit
  capture, checksum validation, migration, restore, rollback, reset, diagnostics

cozy-render-snapshot-domain-kit
  static world, Agriculture descriptors, frame snapshot, HUD and debug descriptors
```

### Cataloged world/render/host kits and service families

```txt
Presentation and quality
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

World and scenario
  camera-rail-sequence-kit
  cozy-island-scenario-kit
  terrain-surface-domain-kit
  vegetation-placement-domain-kit
  aerial-perspective-domain-kit
  campfire-atmosphere-domain-kit

Cloud and fog
  cloud-density-field-domain-kit
  cloud-horizon-band-domain-kit
  cloud-lighting-domain-kit
  cloud-lod-domain-kit
  cloud-shadow-domain-kit
  cloud-weather-domain-kit
  fog-advection-domain-kit
  fog-field-domain-kit
  fog-volume-placement-domain-kit

Contact, light and ocean
  ground-contact-domain-kit
  illumination-domain-kit
  ocean-caustics-domain-kit
  ocean-floor-profile-domain-kit
  ocean-optics-domain-kit
  ocean-wave-domain-kit
  shoreline-field-domain-kit
  shoreline-foam-domain-kit
  sun-glitter-domain-kit
  underwater-atmosphere-domain-kit

Archetypes and renderer-neutral descriptors
  prop-archetype-domain-kit
  render-archetype-domain-kit
  render-quality-domain-kit
  render-snapshot-domain-kit
  rock-archetype-domain-kit
  stylized-material-descriptor-domain-kit
  terrain-biome-field-domain-kit
  terrain-lod-domain-kit
  vegetation-archetype-domain-kit
  vegetation-lod-domain-kit
  vegetation-wind-domain-kit

Environment fundamentals
  weather-state-domain-kit
  wind-field-domain-kit
  deterministic-seed-domain-kit
  environment-clock-domain-kit
```

Services include deterministic world and biome classification, height/normal/material queries, vegetation placement and LOD, atmosphere density and lighting, ocean waves/optics/caustics/foam, renderer-neutral snapshots and archetypes, WebGPU/WebGL2 resource construction, pass ordering, adaptive quality, diagnostics, and environment time.

### Additional composition kit

```txt
cozy-ocean-composition-kit
  logical render-layer graph, pass-order validation, transparent-depth validation,
  terrain handoff validation, per-layer depth/blend contracts
```

### Browser/product adapters

```txt
browser-startup-presentation-adapter
  Core Startup descriptor-to-DOM projection, failure projection, timeout helper

cozy-startup-host
  product preparation order/copy, shared-engine reuse, continuation mapping,
  global pre-playable error capture, host disposal

cozy-menu-scene-adapter
  Canvas2D scene, DPR sizing, reduced motion, recursive RAF, visibility resume

cozy-menu-game-shell-adapter
  iframe preload, progress projection, Play gate, history/focus transition,
  fallback reveal and error display

cozy-game-preload-bridge-adapter
  descriptor polling, parent messages, simulation freeze/resume,
  player intro preparation and entry acknowledgement
```

## Required parent authority

```txt
cozy-island-menu-game-preload-handoff-scheduler-authority-domain
```

## Required transaction

```txt
MenuGamePreloadCommand
  -> allocate shell, preload and entry generations
  -> start exactly one menu presentation scheduler
  -> create exactly one game preload surface
  -> bind Core Startup readiness to that preload generation
  -> quiesce simulation and hidden presentation through explicit leases
  -> return PreloadReady, Failed, Cancelled, Stale or Retired
  -> admit one PlayerEntryCommand
  -> resume simulation at one boundary
  -> prepare one successor presentation frame
  -> submit and acknowledge the first matching visible game frame
  -> atomically retire the menu scheduler and transfer focus/input ownership
  -> reject duplicate, stale and predecessor callbacks/messages
  -> return Entered, Failed, Cancelled, Stale or Retired
```

## Planned coordinating surfaces

```txt
cozy-island-menu-game-preload-handoff-scheduler-authority-domain
menu-shell-generation-kit
preload-surface-generation-kit
entry-attempt-id-kit
menu-frame-scheduler-kit
single-raf-chain-guard-kit
hidden-game-presentation-policy-kit
simulation-quiescence-lease-kit
presentation-quiescence-lease-kit
core-startup-preload-binding-kit
preload-progress-envelope-kit
cross-window-message-contract-kit
message-source-generation-admission-kit
stale-message-rejection-kit
duplicate-result-suppression-kit
player-entry-command-kit
player-entry-result-kit
history-transition-result-kit
focus-transfer-result-kit
first-post-resume-frame-kit
visible-game-frame-ack-kit
menu-scheduler-retirement-kit
preload-surface-retirement-kit
visibility-transition-kit
page-lifecycle-composition-kit
menu-game-handoff-observation-kit
preload-handoff-fixture-gate-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, renderer behavior, dependencies, package scripts, workflow and deployment were not changed. The menu shell test and package wiring were inspected but not independently executed. No claim is made for single-scheduler behavior, hidden-render quiescence, exact entry completion, stale-message fencing, visible-frame proof, BFCache safety, or deployed parity.