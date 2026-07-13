# Current audit: MyCozyIsland menu/game preload handoff

**Timestamp:** `2026-07-13T12-38-45-04-00`  
**Status:** `menu-game-preload-handoff-scheduler-authority-audited`  
**Branch:** `main`

## Summary

Ten commits added a living menu, dedicated game route, hidden full-game preload, Core Startup progress bridge, simulation freeze/resume, seamless Play reveal, failure projection, tests, deployment copy, and documentation. The shell is functional, but no single authority owns its two presentation schedulers or proves a terminal player-entry frame.

## Plan ledger

**Goal:** define one evidence chain from menu boot through preload quiescence, player entry, scheduler transfer, and the first visible post-resume game frame.

- [x] Compare the full Publish inventory, central ledgers, root `.agent` state, and current heads.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland because runtime was ten commits ahead of central documentation.
- [x] Inspect all changed source, test, workflow, package, and documentation files.
- [x] Preserve the 65 DSK/kit inventory and add three menu/preload adapters to the existing two startup adapters.
- [x] Add architecture, render, gameplay, interaction, preload-handoff, deploy, and central-sync audits.
- [ ] Implement and execute the authority and fixture matrix.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new or missing eligible repositories: 0
runtime-ahead repositories: 1
selected: LuminaryLabs-Publish/MyCozyIsland
prior documentation head: 74ca9b222da21cfec3a474472c93e66c74e267f6
reviewed runtime head: a696b1b67f2c3bd783c0ebabe8aa5623a6206763
commits reconciled: 10
```

## Complete interaction loop

```txt
index.html
  -> preserve query/hash and replace route with menu.html

menu.html + src/menu.js
  -> start procedural Canvas2D menu RAF
  -> idle-schedule game.html?preload=1 in hidden iframe
  -> project progress and failures

game.html + main-adventure.js
  -> load providers/modules
  -> execute Core Startup and construct one adventure
  -> start WebGPU/WebGL2 animation loop
  -> render first frame and enter Core Startup playable

preload bridge
  -> poll descriptor every 120 ms
  -> replace engine.tick/step with no-op functions
  -> announce ready

Play
  -> send unversioned cozy-game-enter
  -> restore engine tick/step
  -> reset player intro snapshot and clear input
  -> announce entered immediately
  -> reveal iframe, rewrite history and transfer focus
  -> stop menu animation after transition
  -> reveal after 900 ms even if entered acknowledgement is absent
```

## Source-backed findings

- The menu owns a recursive Canvas2D RAF.
- The hidden iframe owns an independent `renderer.setAnimationLoop`.
- `freezeSimulation()` affects engine tick/step only; hidden presentation continues.
- The hidden game still updates renderer participants, HUD, quality sampling, post-processing, autosave checks, and diagnostics.
- Messages validate `event.source` and same-origin target, but carry no protocol revision or generation.
- `cozy-game-entered` is posted before a post-resume render submission or visible-frame acknowledgement.
- The menu fallback reveals the game after 900 ms without a terminal game result.
- Returning to visibility requests another menu RAF callback without a chain token.
- Existing tests inspect syntax and source markers, not browser scheduling, quiescence, races, or visibility.

## Domains in use

```txt
root routing and navigation
menu artwork, Canvas2D rendering and reduced-motion policy
menu input, progress and error projection
iframe preload surface and same-origin ownership
cross-window messaging
Core Startup and continuation
NexusEngine simulation and service composition
world, Inventory, Agriculture, Foraging, interaction, player, scenario and camera
save migration, browser storage and autosave
WebGPU/WebGL2 world, atmosphere, ocean, foam, post-processing and quality
simulation and presentation quiescence
history, focus, accessibility and visible-frame transfer
visibility, pagehide and retirement
validation, Actions, Pages and central tracking
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

The complete kit and service inventory is in the timestamped project breakdown and `.agent/kit-registry.json`.

## Missing authority

```txt
MenuShellGeneration
MenuSchedulerId and single-chain guard
PreloadSurfaceGeneration
Core Startup/preload binding
SimulationQuiescenceLease
PresentationQuiescenceLease
revisioned cross-window protocol
PlayerEntryAttemptId
stale and duplicate result rejection
post-resume state/presentation revision
renderer submission receipt
first visible game-frame acknowledgement
atomic history/focus/menu-retirement result
page lifecycle composition
source/browser/build/Pages fixtures
```

## Required parent domain

`cozy-island-menu-game-preload-handoff-scheduler-authority-domain`

## Validation boundary

Documentation only. No runtime, gameplay, rendering, dependency, package, workflow, or deployment behavior changed. Existing test sources and commit status were inspected; tests were not independently executed.