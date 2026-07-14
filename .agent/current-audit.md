# Current audit: MyCozyIsland preload suspension lease and resumed-frame authority

**Timestamp:** `2026-07-14T15-01-54-04-00`  
**Status:** `preload-suspension-lease-resume-frame-authority-audited`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `fc5a119eefc7aad5e062b15df6325e2dc28a421a`

## Summary

MyCozyIsland was selected through the oldest synchronized documentation rule. Every eligible Publish repository already had central-ledger and root `.agent` coverage, and every current repository head matched its recorded repo-local documentation head.

The current audit isolates the hidden game suspension boundary. Once Core Startup reports `descriptor.playable`, `src/game-preload-bridge.js` replaces `engine.tick` and `engine.step`, captures the current Three.js animation callback, and calls `renderer.setAnimationLoop(null)`. When Play arrives, it restores those references, prepares the intro, sets a DOM flag, and posts `cozy-game-entered` immediately. The parent treats that message as reveal authority, while also retaining a 900 ms unconditional fallback reveal.

No runtime defect is asserted. The gap is that suspension and restoration are implicit object mutation rather than a revisioned application result. The repository cannot prove that the resumed engine, scheduler, renderer, callback, player state and visible frame belong to the same accepted preload generation.

## Plan ledger

**Goal:** preserve sleeping preload performance while making suspension, restoration, fallback, and visible entry one atomic, observable transaction.

- [x] Compare the complete 11-repository Publish inventory.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible central ledger entries and root `.agent` states.
- [x] Confirm zero new, missing, undocumented, root-agent-missing, or runtime-ahead eligible repositories.
- [x] Select MyCozyIsland as the oldest synchronized eligible repository.
- [x] Inspect `menu.html`, `game.html`, `src/menu.js`, `src/game-preload-bridge.js`, package scripts, source smoke, and current audit state.
- [x] Identify the interaction loop, domains, all kits, all adapters, and all offered services.
- [x] Preserve 65 source-backed kit surfaces and five adapters.
- [x] Define a 24-surface suspension and resumed-frame authority family.
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
selection reason: oldest synchronized central documentation timestamp
prior central timestamp: 2026-07-14T09-39-44-04-00
reviewed repository head: fc5a119eefc7aad5e062b15df6325e2dc28a421a
```

## Complete interaction loop

```txt
root route
  -> redirects to menu.html
  -> menu imports Three.js WebGPU, TSL and Bloom
  -> menu prepares the postcard scene and render loop
  -> menu schedules game.html?preload=1 in a hidden iframe
  -> game route initializes Core Startup, world, save, input and renderer
  -> preload bridge polls startupHost.getDescriptor()
  -> descriptor.playable becomes true
  -> freezeSimulation captures engine and replaces tick/step
  -> freezePresentation captures animation callback and clears it
  -> bridge posts progress and ready
  -> parent enables Play
  -> Play posts cozy-game-enter
  -> resumeSimulation restores captured methods
  -> resumePresentation restores captured callback
  -> preparePlayerEntry loads intro state, clears input and focuses canvas
  -> bridge posts cozy-game-entered before a resumed frame
  -> parent reveals immediately, or after 900 ms without the acknowledgement
  -> menu rendering stops after the crossfade
  -> player walks, farms, forages and auto-saves
```

## Domains in use

```txt
browser routing, history and focus
menu shell, progress and Play admission
optional postcard presentation
same-origin iframe preload
cross-window command and result messaging
Core Startup readiness, continuation and first game preparation
engine world, tick and step ownership
scheduler and render-loop ownership
hidden-preload suspension and restoration
player intro state and input clearing
entry fallback timing and reveal
first resumed simulation/frame evidence
stale, duplicate and superseded attempt handling
WebGPU/WebGL2 backend and renderer presentation
world, player, camera, Inventory, Agriculture, Foraging and interaction
save capture, validation, migration, restore and rollback
validation, build, Pages and central tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
planned suspension authority surfaces: 24
```

The complete per-kit service inventory is in the timestamped tracker and remains machine-readable in `.agent/kit-registry.json`.

## Source-backed findings

### Suspension mutates live providers

`freezeSimulation()` captures `globalThis.CozyIsland.engine`, saves its `tick` and `step` functions, then replaces both methods on the live engine object. The replacement returns the current world without advancing simulation.

`freezePresentation()` captures `globalThis.CozyIsland.renderer`, reads its current animation callback, and calls `setAnimationLoop(null)`.

There is no:

```txt
PreloadGeneration
SuspensionAttemptId
EngineRevision
SchedulerRevision
RendererRevision
AnimationLoopRevision
SuspensionLease
SuspensionPreparationResult
participant receipt
atomic adoption result
```

### Restoration is not correlated

`resumeSimulation()` and `resumePresentation()` restore the captured references without checking whether the public engine or renderer has been replaced, whether Core Startup has advanced, whether the callback still belongs to the accepted renderer generation, or whether a newer entry attempt superseded the current one.

### Entry acknowledgement precedes frame evidence

`enterGame()` restores participants, prepares player state, sets `data-menu-entered`, and posts `cozy-game-entered` in the same synchronous call stack. It does not wait for:

```txt
one resumed engine tick
one accepted renderer callback
one successful render submission
one visible iframe frame
one frame tied to the current startup and entry revisions
```

### Parent fallback can reveal an unproved successor

The parent schedules `revealGame()` 900 ms after sending the entry request. That fallback does not classify why acknowledgement was absent and does not prove the game resumed. A missing, stale, rejected, or failed entry can therefore be visually treated the same as a slow but successful entry.

### Message envelopes lack revision identity

Both sides check `event.source`, but neither side checks `event.origin`, schema version, attempt ID, sequence, startup revision, suspension lease, or entry revision. These retained protocol gaps directly affect suspension restoration.

### Existing validation is structural only

`tests/menu-game-shell-smoke.mjs` parses source and matches strings such as `freezeSimulation`, `setAnimationLoop(null)`, `resumePresentation`, and `cozy-game-entered`. It does not create a browser, initialize an engine or renderer, execute suspension, replace participants, inject restore failure, or capture the first resumed frame.

## Required authority

```txt
cozy-island-preload-suspension-lease-resume-frame-authority-domain
```

```txt
PreloadSuspensionCommand
  -> bind shell, startup, game, engine, scheduler, renderer and frame revisions
  -> validate the current playable Core Startup descriptor
  -> prepare detached simulation and presentation suspension candidates
  -> capture exact participant identities and callbacks
  -> stop hidden simulation and presentation atomically
  -> publish PreloadSuspensionResult and SuspensionLease

GameEntryCommand
  -> bind the accepted SuspensionLease and expected entry revision
  -> reject stale, duplicate, missing or superseded work
  -> prepare engine, scheduler, renderer, input and intro restoration
  -> restore all participants atomically or preserve the suspended predecessor
  -> execute one resumed simulation step and one render probe
  -> publish GameEntryResult and participant receipts
  -> publish FirstResumedGameFrameAck
  -> allow the parent to commit reveal and history

failure or timeout
  -> classify transport, restore, render or acknowledgement failure
  -> keep the suspended predecessor coherent
  -> expose explicit retry, reload or direct-route recovery
  -> never treat elapsed time alone as visible-entry proof
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, tests, dependencies, scripts, workflows and deployment behavior were not changed. No browser, build, artifact or Pages proof was executed.
