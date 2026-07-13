# Project breakdown: MyCozyIsland Three.js menu presentation lifecycle

**Timestamp:** `2026-07-13T14-39-40-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Runtime reviewed:** `a0077808c0344b52850c2cd4c5c787c521ee61db`  
**Status:** `threejs-menu-presentation-lifecycle-authority-audited`

## Summary

Four commits replaced the Canvas2D menu with a minimal Three.js composition containing one semantic sky, one hero palm and one Play gate. The full game still preloads in a hidden same-origin iframe. The new menu adds a second GPU renderer and a new static provider dependency before preload can begin.

The current gap is lifecycle authority. Three.js must import and `WebGLRenderer` construction must succeed before `startPreload()` is scheduled. A provider, module, WebGL or scene-construction failure can therefore leave the button at `Preparing 1%` and prevent the otherwise independent game preload. After entry, only `renderer.dispose()` is called; the menu scene graph, geometries, materials, listeners, canvas and retirement evidence remain unowned.

## Plan ledger

**Goal:** preserve the three-element menu while making its provider admission, first frame, active scheduler and complete resource retirement explicit and independently recoverable.

- [x] Enumerate all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible current heads with central ledger heads.
- [x] Select only MyCozyIsland because four source/test/docs commits were newer than central tracking.
- [x] Inspect the complete four-commit diff and current menu source.
- [x] Identify the full interaction loop, domains, kits, adapters and offered services.
- [x] Preserve the 65 DSK/kit surfaces and five browser/product adapters.
- [x] Record that the fifteen-level menu taxonomy is semantic, not fifteen executable kits.
- [x] Define menu presentation boot and retirement contracts.
- [x] Add timestamped architecture, render, startup, interaction, menu-renderer, deploy and central-sync audits.
- [ ] Implement the authority and execute browser/build/Pages fixtures.

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
selected repository: LuminaryLabs-Publish/MyCozyIsland
prior repo-local documentation head: 6ea85e2c457315164cf12bdade7dabdca1c5d420
reviewed runtime head: a0077808c0344b52850c2cd4c5c787c521ee61db
commits reconciled: 4
changed files: README.md, menu.html, src/menu.js, tests/menu-game-shell-smoke.mjs
TheCavalryOfRome: excluded
```

## Complete interaction loop

```txt
root request
  -> index.html routes to menu.html

menu document boot
  -> parse static import map for Three.js 0.185.0
  -> import src/menu.js
  -> import remote Three.js module
  -> construct WebGLRenderer
  -> construct sky shader, lights and palm scene graph
  -> resize renderer and camera
  -> submit recursive menu RAF frames
  -> only then idle-schedule game.html?preload=1

hidden game preload
  -> resolve game providers and modules
  -> execute Core Startup
  -> construct one adventure and game renderer
  -> begin hidden game animation loop
  -> freeze simulation at factual readiness
  -> send progress and ready messages

player entry
  -> Play sends cozy-game-enter
  -> bridge resumes simulation and prepares intro state
  -> bridge sends cozy-game-entered before visible-frame proof
  -> parent reveals iframe and rewrites history
  -> after 820 ms set sceneRunning false, focus game and call renderer.dispose()

steady game
  -> hidden iframe becomes the visible application
  -> menu document remains the parent shell
```

## Domains in use

```txt
root routing and browser navigation
menu static module/provider resolution
menu WebGL context and Three.js renderer
sky shader and atmospheric color composition
procedural palm geometry, materials and wind pose
menu resize, DPR and reduced-motion policy
menu RAF scheduling and first-frame presentation
Play input, progress and error projection
same-origin iframe preload and cross-window messages
Core Startup readiness and continuation
NexusEngine simulation and service composition
world, Inventory, Agriculture, Foraging, interaction, player, scenario and camera
save migration, browser storage and autosave
WebGPU/WebGL2 game presentation and adaptive quality
simulation/presentation quiescence and entry handoff
menu resource retirement and game surface adoption
page lifecycle, validation, Actions, Pages and central tracking
```

## Kits, adapters and services

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed DSK/kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
```

The 14 installed kits provide Core Startup, object registration, idempotent transactions, deterministic world queries, input, Inventory, Agriculture, Foraging, player movement, scenario state, contextual interaction, camera behavior, portable saves and renderer-neutral snapshots.

The 50 cataloged kits provide terrain, biome, vegetation, atmosphere, clouds, fog, ocean, shoreline, materials, archetypes, quality budgets, WebGPU/WebGL2 render passes, deterministic seeds, weather, wind and environment time.

The additional `cozy-ocean-composition-kit` provides render-layer graph and pass-order/depth/blend validation.

The five adapters are:

| Adapter | Offered services |
|---|---|
| `browser-startup-presentation-adapter` | Core Startup descriptor DOM projection, failure projection, bounded timeout and update bridge. |
| `cozy-startup-host` | Product preparation order, copy, continuation mapping, engine reuse and host disposal. |
| `cozy-menu-scene-adapter` | Three.js provider import, WebGL renderer construction, sky shader, palm construction, reduced motion, resize/DPR, RAF and delayed renderer disposal. |
| `cozy-menu-game-shell-adapter` | Iframe preload, progress projection, Play gate, history transition, focus transfer, fallback reveal and error display. |
| `cozy-game-preload-bridge-adapter` | Startup polling, parent messaging, simulation freeze/resume, player-entry preparation and entry acknowledgement. |

The fifteen-level menu taxonomy is a semantic decomposition of sky, palm and Play. Only the application, entry, menu and menu-scene levels are executable ownership boundaries.

## Source-backed findings

### Menu provider gates game preload

`menu.html` statically maps `three` to jsDelivr and loads `src/menu.js` as a module. `src/menu.js` imports Three.js, constructs the renderer and complete menu scene at module scope, then schedules `startPreload()` only after the first RAF. Provider or renderer failure occurs before preload and before `reportFailure()` can provide a terminal shell result.

### Two GPU renderers coexist

The menu owns a low-power WebGL renderer while the hidden game owns its WebGPU/WebGL2 renderer and animation loop. No shared device/context budget, surface generation, memory observation or dual-renderer policy exists.

### Retirement is incomplete and anonymous

Entry waits 820 ms, sets `sceneRunning = false` and calls `renderer.dispose()`. It does not publish a scheduler-retirement receipt, cancel a stored RAF ID, remove resize/message/keyboard/click listeners, dispose scene geometries and materials, clear scene references, remove the canvas or report context release.

### Existing test is structural

The smoke test verifies Three.js markers, one sky function, one palm function, one Play button and the absence of 2D/terrain code. It does not execute provider failure, WebGL construction failure, first menu frame, concurrent GPU usage, resource disposal, listener retirement or repeated entry lifecycle.

## Required authority

```txt
cozy-island-threejs-menu-presentation-lifecycle-authority-domain
```

```txt
MenuPresentationBootCommand
  -> allocate menu attempt, provider, renderer, resource and scheduler generations
  -> start game preload from a provider-independent shell boundary
  -> admit an approved Three.js provider or typed fallback
  -> create detached renderer and scene-resource candidates
  -> submit and acknowledge the first menu frame
  -> publish Ready, Degraded, Failed, Cancelled or Stale

MenuPresentationRetireCommand
  -> bind accepted menu and player-entry generations
  -> stop exactly one RAF scheduler
  -> reject late callbacks
  -> remove owned listeners
  -> dispose every geometry, material and renderer resource
  -> release or explicitly retain the context under policy
  -> clear scene references and hidden canvas ownership
  -> publish Retired, Failed, Partial, Stale or AlreadyRetired
```

The existing preload-handoff authority should consume these terminal results. It should not absorb Three.js provider or GPU-resource mechanics.

## Validation boundary

This audit changes documentation only. Runtime JavaScript, HTML, CSS, gameplay, rendering, dependencies, package scripts, tests and deployment behavior remain unchanged. Source and test files were inspected. `npm test`, browser fixtures, build-output fixtures and Pages fixtures were not executed.