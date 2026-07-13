# Current audit: MyCozyIsland Three.js menu presentation lifecycle

**Timestamp:** `2026-07-13T14-39-40-04-00`  
**Status:** `threejs-menu-presentation-lifecycle-authority-audited`  
**Branch:** `main`

## Summary

Four commits replaced the Canvas2D menu with a minimal Three.js composition containing one semantic sky, one hero palm and one Play gate. The menu remains the parent document while the full NexusEngine adventure preloads in a hidden same-origin iframe.

The new boundary is menu presentation lifecycle authority. The menu's remote Three.js import and module-scope WebGL construction must succeed before hidden game preload is scheduled. After player entry, the parent stops a boolean loop flag and calls `renderer.dispose()`, but records no provider, renderer, resource, frame, listener, scheduler, context or terminal retirement result.

## Plan ledger

**Goal:** preserve the minimal menu while making provider admission, first-frame readiness, active scheduling and complete retirement explicit and independently recoverable.

- [x] Compare the full Publish inventory, central ledgers, root `.agent` state and current repository heads.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland because four commits were newer than central tracking.
- [x] Inspect the complete four-commit diff and current menu, game, test and package surfaces.
- [x] Preserve the 65 DSK/kit inventory and five browser/product adapters.
- [x] Record that the fifteen-level menu taxonomy is semantic rather than fifteen executable kits.
- [x] Add architecture, render, startup, interaction, menu-renderer, deploy and central-sync audits.
- [x] Change documentation only.
- [ ] Implement and execute the authority and fixture matrix.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new eligible repositories: 0
central-ledger-missing repositories: 0
root-agent-missing repositories: 0
runtime-ahead repositories: 1
selected: LuminaryLabs-Publish/MyCozyIsland
prior repo-local documentation head: 6ea85e2c457315164cf12bdade7dabdca1c5d420
reviewed runtime head: a0077808c0344b52850c2cd4c5c787c521ee61db
commits reconciled: 4
changed files: 4
```

## Complete interaction loop

```txt
index.html
  -> preserve query/hash and route to menu.html

menu.html
  -> parse import map for Three.js 0.185.0
  -> load src/menu.js

menu module
  -> import remote Three.js
  -> create low-power WebGLRenderer
  -> construct gradient sky shader, lights and procedural palm
  -> size renderer and camera
  -> submit recursive menu RAF frames
  -> only then idle-schedule game.html?preload=1

hidden game
  -> resolve WebGPU/NexusEngine providers and local modules
  -> execute Core Startup
  -> construct one adventure and game renderer
  -> start hidden game animation loop
  -> freeze simulation at factual readiness
  -> post progress and ready messages

Play
  -> send cozy-game-enter
  -> resume simulation and prepare authored intro state
  -> receive entered or reach 900 ms fallback
  -> reveal iframe and rewrite history
  -> after 820 ms set sceneRunning false, focus the game and call renderer.dispose()

steady game
  -> game iframe is visible
  -> menu document remains the parent shell
```

## Domains in use

```txt
root routing and browser navigation
menu module/provider resolution
menu WebGL context and Three.js renderer
sky shader and atmospheric color composition
procedural palm geometry, materials and wind pose
menu resize, DPR and reduced-motion policy
menu RAF scheduling and first-frame presentation
Play input, progress and failure projection
same-origin iframe preload and cross-window messaging
Core Startup readiness, continuation and failure
NexusEngine simulation and service composition
Core Object and transaction idempotency
world, Inventory, Agriculture, Foraging and interaction
player, scenario, camera, portable saves and snapshots
WebGPU/WebGL2 game presentation and adaptive quality
simulation and presentation quiescence
history, focus, visibility and entry handoff
menu resource retirement and game surface adoption
page lifecycle, validation, Actions, Pages and central tracking
```

## Kit and service census

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

The installed kits provide Core Startup, object registration, idempotent transactions, deterministic world queries, input, Inventory, Agriculture, Foraging, movement, scenario, interaction, camera, portable saves and renderer-neutral snapshots.

The cataloged kits provide terrain, biome, vegetation, atmosphere, clouds, fog, ocean, shoreline, materials, archetypes, quality budgets, WebGPU/WebGL2 passes, deterministic seeds, weather, wind and environment time.

The five adapters provide startup projection, product startup orchestration, Three.js menu presentation, iframe preload/Play gating and game preload freeze/resume. The complete per-surface service inventory remains in `.agent/kit-registry.json`.

## Source-backed findings

### Menu provider gates game preload

`src/menu.js` imports Three.js and constructs its renderer and scene graph at module scope. `startPreload()` is scheduled only after renderer setup and an initial RAF callback. A provider, module, WebGL or scene-construction failure can therefore occur before the iframe receives a source URL.

### Two GPU renderers coexist

The parent menu owns a Three.js WebGL renderer while the hidden game independently owns a WebGPU/WebGL2 renderer and animation loop. No shared device/context budget, surface generation or dual-renderer policy is published.

### First menu frame is anonymous

The RAF calls `renderer.render(scene, camera)` but returns no renderer-derived submission result or first-menu-frame acknowledgement.

### Retirement is incomplete and anonymous

Entry eventually sets `sceneRunning = false` and calls `renderer.dispose()`. The source stores no RAF ID, does not remove owned listeners, does not dispose each scene geometry/material, does not clear scene references or canvas ownership, and returns no terminal retirement receipt.

### Existing test is structural

The menu smoke validates syntax and source markers for Three.js, one sky, one palm, one Play gate and the absence of 2D/terrain code. It does not execute provider failures, browser WebGL, first frame, concurrent renderers, resource disposal, listener retirement or route lifecycle.

## Required parent domain

```txt
cozy-island-threejs-menu-presentation-lifecycle-authority-domain
```

## Required transactions

```txt
MenuPresentationBootCommand
  -> allocate menu, provider, renderer, resource and scheduler generations
  -> start game preload from a provider-independent shell boundary
  -> admit provider and WebGL capability
  -> prepare detached renderer and scene resources
  -> submit and acknowledge the first menu frame
  -> publish Ready, Degraded, Failed, Cancelled or Stale

MenuPresentationRetireCommand
  -> bind accepted menu and player-entry generations
  -> stop exactly one RAF scheduler
  -> reject late callbacks
  -> remove owned listeners
  -> dispose every geometry, material and renderer resource
  -> apply explicit context-retention/release policy
  -> clear scene references and canvas ownership
  -> publish Retired, Partial, Failed, Stale or AlreadyRetired
```

The existing preload-handoff authority consumes these terminal results. It remains responsible for game readiness, player entry, history/focus transfer and first visible game-frame completion.

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, rendering, dependencies, package scripts, tests, workflows and deployment were not changed. Source and test files were inspected; no executable browser, build or Pages fixture was run.