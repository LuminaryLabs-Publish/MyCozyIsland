# MyCozyIsland Breakdown — Menu Preload-to-Ready Presentation Handoff

**Timestamp:** `2026-07-17T01-39-36-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `347c78f358994822f9fedf91c3e16d33d6909e7e`  
**Previous repo-local documentation head:** `44230778bc1875d34e60abc466ed8573af91f7bb`  
**Selection class:** runtime-ahead priority

## Selection

The full accessible `LuminaryLabs-Publish` inventory contains 11 repositories:

`AetherVale`, `HorrorCorridor`, `IntoTheMeadow`, `MyCozyIsland`, `PhantomCommand`, `PrehistoricRush`, `TheCavalryOfRome`, `TheLongHaul`, `TheOpenAbove`, `TheUnmappedHouse`, and `ZombieOrchard`.

`LuminaryLabs-Publish/TheCavalryOfRome` is excluded. All ten eligible repositories have central ledger entries and root `.agent` state. MyCozyIsland was selected because its runtime is six commits ahead of its previous repo-local documentation head.

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger missing: 0
root .agent missing: 0
runtime-ahead repositories requiring reconciliation: 1

selected: LuminaryLabs-Publish/MyCozyIsland
base documentation head: 44230778bc1875d34e60abc466ed8573af91f7bb
reviewed runtime head: 347c78f358994822f9fedf91c3e16d33d6909e7e
ahead by: 6 commits
changed files: 6
```

Reviewed runtime delta:

```txt
menu.html                                      modified
src/menu.js                                   modified
src/menu/menu-scene-recipe.js                 modified
src/menu/menu-three-renderer-lite.js          added
src/menu/menu-three-renderer.js               removed
tests/menu-game-shell-smoke.mjs               modified
```

The delta replaces the prior bloom/shadow-heavy menu renderer with a direct particle-first renderer, one merged palm-frond batch, one three-layer atmosphere particle batch, explicit preload/idle/interactive frame caps, preload DPR reduction, opaque depth-writing water, no dynamic shadows, and no full-screen bloom pass.

## Interaction loop

```txt
index route
  -> enter menu.html

menu boot
  -> load recipe v5 and 16 explicit menu domain/kit descriptors
  -> initialize Three.js WebGPURenderer
  -> use WebGPU when available or WebGL2 backend fallback
  -> choose one startup quality tier
  -> allocate direct sky, sun, horizon, shoreline, water, flowers,
     palm, contact shadow, lighting and atmosphere particle resources
  -> disable dynamic shadow maps
  -> render directly with ACES tone mapping and no bloom pass
  -> start hidden same-origin game preload

preload presentation mode
  -> cap menu DPR at min(1, quality.dprCap)
  -> target 24 rendered frames per second
  -> keep background game simulation and presentation preparing
  -> project progress through the Play button

pointer and focus interaction
  -> normalize pointer position
  -> estimate pointer energy
  -> damp camera parallax
  -> boost palm and particle wind
  -> target 60 rendered frames per second for 900 ms

background game readiness
  -> Core Startup reports playable
  -> game preload bridge freezes game simulation
  -> game preload bridge freezes game presentation
  -> iframe posts cozy-game-ready
  -> menu host marks gameReady
  -> menu renderer switches preloading=false
  -> resize restores the selected quality DPR cap
  -> subsequent menu frames target 30 frames per second
  -> Play is enabled immediately

entry
  -> player activates Play
  -> menu wakes interaction presentation
  -> host posts cozy-game-enter
  -> game bridge resumes simulation and presentation
  -> host reveals and focuses the prepared game
  -> menu renderer is disposed

game loop
  -> restore or create island state
  -> admit input
  -> tick scenario, player, Agriculture, Foraging and interaction
  -> project camera, world, HUD and save state
  -> render and autosave
```

## Domains in use

- Static route, import-map and cache-key ownership.
- Same-origin iframe preload, progress, readiness, entry, history and focus handoff.
- Core Startup, Object and Transaction Ledger.
- Seeded island world, surface queries and render descriptors.
- Input, Inventory, Agriculture, Foraging, player, scenario, interaction, camera and saves.
- Renderer-neutral snapshots plus WebGPU/WebGL2 full-game presentation.
- Declarative menu scene, composition, camera, hero palm, palm material, palm motion, sky, shoreline, water, flowers, particles, lighting, atmosphere, post effects, Play gate and game preload.
- Procedural atlas generation, TSL materials and vertex deformation, direct ACES output, responsive framing, frame-rate throttling, DPR budgeting, visibility suspension and lifecycle disposal.
- Validation, Pages deployment and central documentation governance.

## Implemented kits and offered services

### Engine-installed core and adventure kits — 14

- `core-startup-kit`: launch, preparation registration, readiness, failure, continuation, first-frame admission, playable entry, snapshot, load and reset.
- `core-object-kit`: object registration, lookup and listing.
- `core-transaction-ledger-kit`: ledger identity, idempotency, record, apply-once settlement, snapshot and reset.
- `cozy-world-domain-kit`: seeded world, surface query, plot layout, forage layout, render base, snapshot and reset.
- `cozy-input-domain-kit`: normalization, command queue, frame admission, held actions, clear, snapshot and reset.
- `cozy-inventory-domain-kit`: items, seed selection, transactions, batch settlement, snapshot and reset.
- `agriculture-domain-kit`: land, soil, cultivation, watering, growth, harvest, perennials, descriptors, events, snapshot and reset.
- `cozy-foraging-domain-kit`: wild coconut nodes, collection, respawn, snapshot and reset.
- `cozy-player-domain-kit`: movement, grounding, view, stamina, snapshot and reset.
- `cozy-scenario-domain-kit`: time, objectives, snapshot and reset.
- `cozy-interaction-domain-kit`: targeting, context actions, agriculture settlement, wild-forage settlement, prompts, results, snapshot and reset.
- `cozy-camera-domain-kit`: aerial introduction, first-person view, terrain clearance and camera descriptors.
- `cozy-save-domain-kit`: capture, checksum validation, migration, restore, rollback, reset and diagnostics.
- `cozy-render-snapshot-domain-kit`: static world, Agriculture descriptors, frame snapshots, HUD and debug descriptors.

### Cataloged world, render and host kits — 50

`debug-overlay-host-kit`, `webgl2-fallback-renderer-kit`, `webgpu-compute-atmosphere-renderer-kit`, `webgpu-foam-renderer-kit`, `webgpu-ocean-renderer-kit`, `webgpu-performance-budget-kit`, `webgpu-post-processing-renderer-kit`, `webgpu-rolling-fog-renderer-kit`, `webgpu-stylized-material-renderer-kit`, `webgpu-volumetric-cloud-renderer-kit`, `camera-rail-sequence-kit`, `cozy-island-scenario-kit`, `terrain-surface-domain-kit`, `vegetation-placement-domain-kit`, `aerial-perspective-domain-kit`, `campfire-atmosphere-domain-kit`, `cloud-density-field-domain-kit`, `cloud-horizon-band-domain-kit`, `cloud-lighting-domain-kit`, `cloud-lod-domain-kit`, `cloud-shadow-domain-kit`, `cloud-weather-domain-kit`, `fog-advection-domain-kit`, `fog-field-domain-kit`, `fog-volume-placement-domain-kit`, `ground-contact-domain-kit`, `illumination-domain-kit`, `ocean-caustics-domain-kit`, `ocean-floor-profile-domain-kit`, `ocean-optics-domain-kit`, `ocean-wave-domain-kit`, `prop-archetype-domain-kit`, `render-archetype-domain-kit`, `render-quality-domain-kit`, `render-snapshot-domain-kit`, `rock-archetype-domain-kit`, `shoreline-field-domain-kit`, `shoreline-foam-domain-kit`, `stylized-material-descriptor-domain-kit`, `sun-glitter-domain-kit`, `terrain-biome-field-domain-kit`, `terrain-lod-domain-kit`, `underwater-atmosphere-domain-kit`, `vegetation-archetype-domain-kit`, `vegetation-lod-domain-kit`, `vegetation-wind-domain-kit`, `weather-state-domain-kit`, `wind-field-domain-kit`, `deterministic-seed-domain-kit`, and `environment-clock-domain-kit`.

These provide renderer fallback, atmospheric preparation, ocean and foam presentation, post-processing, performance policy, camera and scenario descriptors, terrain and vegetation queries, cloud/fog/weather fields, illumination, shoreline and ocean optics, archetype descriptors, deterministic seeds and environment time.

### Additional composition kit — 1

- `cozy-ocean-composition-kit`: layer graph, pass-order validation, transparent-depth validation, terrain handoff and depth-blend contracts.

### Explicit menu domain and kit registry — 16

- `n:entry:menu:scene`: scene state and entry transition.
- `n:entry:menu:composition`: rule-of-thirds composition and negative space.
- `n:entry:menu:camera`: camera descriptor and responsive framing.
- `n:entry:menu:hero-palm`: hero palm descriptor.
- `n:entry:menu:palm-material`: bark shading and alpha-cut frond shading.
- `n:entry:menu:palm-motion`: TSL wind deformation for trunk and batched fronds.
- `n:entry:menu:sky`: sunset gradient, sun disc and sun glow.
- `n:entry:menu:shoreline`: curved distant shoreline.
- `n:entry:menu:water`: opaque animated wave strip, depth writing and lightweight foam edge.
- `n:entry:menu:flowers`: one batched atlas-backed flower accent surface.
- `n:entry:menu:particles`: one batched wind-mote, water-sparkle and petal surface.
- `n:entry:menu:lighting`: hemisphere, key, fill, rim and static contact-shadow policy.
- `n:entry:menu:atmosphere`: horizon haze, fog and depth separation.
- `n:entry:menu:post-effects`: ACES exposure and direct final output without bloom.
- `n:entry:menu:play-gate`: progress, ready state and entry request.
- `n:entry:menu:game-preload`: background preparation, freeze, resume and handoff.

### Browser and product adapters outside the explicit menu registry — 4

- `browser-startup-presentation-adapter`: startup descriptor DOM projection, failure projection, timeout helpers and render updates.
- `cozy-startup-host`: preparation ordering, engine reuse, continuation mapping, global error capture and disposal.
- `cozy-menu-game-shell-adapter`: iframe preload, progress, Play gate, entry, crossfade, history, focus and fallback.
- `cozy-game-preload-bridge-adapter`: embed classification, messaging, simulation/presentation freeze and resume, entry preparation and acknowledgement.

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits:     50
additional composition kits:           1
explicit menu domain/kit surfaces:     16
other browser/product adapters:         4
total implemented surfaces:            85
planned ready-handoff surfaces:        18
```

## Main finding

The new performance path establishes real preload and ready presentation modes:

```txt
preloading=true
  -> DPR <= 1
  -> 24 rendered FPS target

preloading=false
  -> selected quality DPR cap
  -> 30 rendered FPS target
```

The readiness path currently settles in this order:

```txt
cozy-game-ready message
  -> mark gameReady
  -> setPreloading(false)
  -> resize renderer and restore quality DPR cap
  -> enable Play
  -> wait for a later animation-loop frame
```

`setPreloading(false)` updates the renderer's pixel ratio, size and scheduling state, but it does not publish a transition generation or render acknowledgement. `markReady()` enables Play immediately after requesting that transition. The player can therefore activate entry before any frame proves that the post-preload DPR and frame mode reached the visible canvas.

The ready message and subsequent entry request also carry no preload session ID, menu presentation generation, viewport revision, DPR revision or first-ready-frame identity. The iframe source and origin checks are useful, but they do not create a durable result chain across ready admission, menu presentation transition, Play admission and entry retirement.

```txt
same-origin/source validation: present
background game freeze before ready: present
preload DPR cap: present
preload frame cap: present
ready DPR restoration: present
idle and interactive frame caps: present
visibility suspension: present

preload session identity: absent
menu presentation generation: absent
typed ready-admission result: absent
typed DPR/frame-budget transition result: absent
stale or duplicate ready settlement: absent
FirstReadyMenuFrameAck: absent
Play waits for matching ready frame: absent
entry binds matching ready generation: absent
real-browser handoff fixture: absent
```

This is a source-backed handoff and visible-frame convergence gap. It is not proof that a player observed a hitch, stale frame or failed entry on a specific device.

## Proposed authority

`cozy-island-menu-preload-ready-presentation-handoff-authority-domain`

```txt
GamePreloadReadyAdmissionCommand
  -> bind iframe source, origin, preload session, Core Startup continuation,
     renderer, quality, viewport and DPR revisions
  -> reject stale, duplicate or retired ready evidence
  -> publish GamePreloadReadyAdmissionResult

MenuPresentationBudgetTransitionCommand
  -> transition preload DPR/frame policy to ready DPR/frame policy
  -> stage resize and renderer state without enabling Play
  -> publish MenuPresentationBudgetTransitionResult

ReadyMenuFrameCommitCommand
  -> render one accepted ready presentation generation
  -> publish actual backend, DPR, viewport and frame-mode evidence
  -> publish FirstReadyMenuFrameAck

PlayGateAdmissionCommand
  -> require game readiness and FirstReadyMenuFrameAck
  -> enable Play for the matching generation
  -> publish PlayGateAdmissionResult

EntryHandoffCommand
  -> bind activation to the admitted ready generation
  -> resume game simulation and presentation exactly once
  -> reveal the game and retire the menu generation
  -> publish EntryHandoffResult
```

### Proposed coordinating surfaces — 18

`preload-session-identity-kit`, `preload-ready-message-admission-kit`, `startup-continuation-binding-kit`, `menu-presentation-generation-kit`, `preload-frame-budget-policy-kit`, `ready-frame-budget-policy-kit`, `menu-dpr-transition-kit`, `menu-frame-rate-transition-kit`, `menu-resize-settlement-kit`, `menu-render-commit-result-kit`, `first-ready-menu-frame-ack-kit`, `play-gate-convergence-kit`, `stale-ready-message-rejection-kit`, `duplicate-ready-settlement-kit`, `entry-generation-binding-kit`, `reduced-motion-handoff-policy-kit`, `menu-ready-browser-fixture-kit`, and `artifact-pages-ready-handoff-fixture-kit`.

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, scene recipe, renderer behavior, tests, workflows and deployment were not changed by this audit. The six-commit runtime delta and current source tests were inspected. `npm test`, a browser render, performance capture, built-artifact smoke and Pages-origin smoke were not run.

No first-ready-frame convergence, Play-gate convergence, stale-ready rejection, duplicate-ready safety, entry-generation correctness, browser parity, artifact parity, Pages parity or production readiness is claimed.