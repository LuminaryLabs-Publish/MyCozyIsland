# Current audit: MyCozyIsland browser page-lifecycle authority

**Timestamp:** `2026-07-13T01-31-36-04-00`  
**Status:** `browser-page-lifecycle-suspension-retirement-authority-audited`  
**Branch:** `main`

## Summary

The active audit is browser page lifecycle authority. The host installs one `{ once: true }` `pagehide` listener that calls `storeSave(adventure)` and `gameplayRenderer.dispose()` regardless of whether the document is being retained for a later return.

There is no `pageshow` path, lifecycle generation, suspend/resume state, complete renderer participant registry, animation-loop stop/resume receipt or terminal-retirement result. `gameplayRenderer.dispose()` clears the plot, forage and crop maps that later frame updates require.

## Plan ledger

**Goal:** define one admitted lifecycle transaction whose suspend, resume or retirement result covers runtime, input, save and every render participant.

- [x] Compare the Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland by the oldest eligible synchronized rule.
- [x] Trace pagehide, save, gameplay disposal and absent pageshow behavior.
- [x] Preserve the full 64-kit and service inventory.
- [x] Define the missing parent domain and candidate kits.
- [x] Add required timestamped audit output.
- [ ] Implement lifecycle commands, participant adapters, results and fixtures.

## Source-backed behavior

```txt
startup:
  renderer.init
  adventure creation and restore
  world/gameplay/atmosphere/ocean/foam/post construction
  window and canvas listener installation
  renderer.setAnimationLoop

pagehide listener:
  registered once
  ignores event.persisted
  calls storeSave
  calls gameplayRenderer.dispose
  does not stop animation loop
  does not detach listeners
  does not dispose remaining resources
  publishes no result

pageshow:
  no handler
  no participant validation
  no timing-baseline reset
  no input-generation reset
  no presentation rebuild
```

## Gameplay renderer disposal effect

```txt
dispose geometry and materials under gameplay group
clear plotEntries
clear forageEntries
clear cropGroups
```

`update(frame)` requires those maps to update soil/crops, forage visibility and interaction-target placement. A retained-page return can therefore resume a live simulation with a partially retired presentation surface.

## Interaction loop

```txt
browser startup
  -> construct authoritative adventure and all presentation participants
  -> start continuous animation loop

active frame
  -> tick adventure
  -> project current frame into camera, lighting, world, gameplay and HUD
  -> render and periodically save

pagehide
  -> direct save and partial disposal
  -> no lifecycle command, generation or receipt

possible pageshow
  -> retained host resumes without reconstruction
  -> frame loop uses cleared gameplay indexes
  -> visible world can diverge from HUD/domain truth
```

## Domains in use

```txt
browser shell, canvas, HUD, storage and page lifecycle
lifecycle event classification, suspension, resume and retirement
runtime session, lifecycle generation and frame admission
input lifecycle and held-action cleanup
save flush, verification and lifecycle receipt
renderer participant registration and resource retirement
backend capability and static/adaptive quality
NexusEngine composition and snapshots
Core Object and Core Transaction Ledger
world, terrain, Agriculture, Foraging, Inventory and player
input, interaction, camera, scenario and saves
renderer-neutral snapshots
WebGPU/WebGL2 atmosphere, ocean, foam, clouds, fog and post-processing
validation, CI, Pages deployment and central tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed total: 64
active route: 62
retained inactive entries: 2
ordered Core World providers: 9
```

The complete per-kit service inventory is in `.agent/trackers/2026-07-13T01-31-36-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Missing authority

```txt
page lifecycle command ID
runtime session and lifecycle generation
pagehide persisted-state classification
Suspend, Resume and Retire plans
animation-loop lifecycle participant
input lifecycle participant and new generation
save-flush write/readback receipt
complete renderer participant registry
participant dependency order
retain/rebuild/dispose results
exactly-once disposal receipt
stale/duplicate lifecycle-event rejection
terminal PageLifecycleResult
first resumed visible-frame acknowledgement
browser/backend/Pages lifecycle fixtures
```

## Required parent domain

```txt
cozy-island-browser-page-lifecycle-authority-domain
```

## Required result

`PageLifecycleResult` must identify command, runtime session, predecessor/successor lifecycle generations, classified transition, participant receipts, save-flush result, incomplete work, terminal phase and first resumed visible-frame ID when applicable.

## Validation boundary

Documentation only. No runtime, lifecycle, rendering, gameplay, save, dependency, package-script or deployment behavior changed. No BFCache, repeated-navigation, terminal-retirement, backend-parity or Pages lifecycle fixture was run.