# Current audit: MyCozyIsland browser page-lifecycle authority

**Timestamp:** `2026-07-13T01-40-00-04-00`  
**Status:** `browser-page-lifecycle-authority-central-reconciled`  
**Branch:** `main`

## Summary

The active audit is browser page lifecycle authority. `src/main-adventure.js` registers one `{ once: true }` `pagehide` listener that calls `storeSave(adventure)` and `gameplayRenderer.dispose()` without checking `event.persisted`. There is no `pageshow` handler, lifecycle generation, complete participant registry, animation-loop stop/resume receipt or terminal retirement result.

`gameplayRenderer.dispose()` clears `plotEntries`, `forageEntries` and `cropGroups`; later `update(frame)` requires those maps for soil/crop projection, forage visibility and interaction-target placement. A retained-page return can therefore resume domain/HUD updates with a partially retired world presentation.

## Plan ledger

**Goal:** define one admitted lifecycle transaction whose Suspend, Resume or Retire result covers runtime, input, save and every rendering participant.

- [x] Compare Publish inventory, central ledger and root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland due to repo-local lifecycle state newer than central tracking.
- [x] Trace pagehide, animation, listeners, save and gameplay disposal.
- [x] Preserve the complete 64-kit and service inventory.
- [x] Add the timestamped reconciliation audit family.
- [x] Refresh root routing and machine state.
- [ ] Implement lifecycle commands, participant adapters, results and fixtures.

## Source-backed behavior

```txt
startup:
  initialize renderer and backend
  create adventure and restore save
  construct world, gameplay, atmosphere, ocean, foam, sky and post participants
  install canvas/window listeners
  start renderer.setAnimationLoop

pagehide:
  registered once
  event.persisted ignored
  save attempted
  gameplay renderer disposed
  animation loop continues without a lifecycle result
  listeners remain installed
  remaining resources have no retirement receipt

pageshow:
  no handler
  no retained participant validation
  no wall-time or input-generation reset
  no presentation reconstruction
```

## Interaction loop

```txt
browser startup -> construct authoritative adventure/presentation -> start loop
active frame -> tick -> project state -> render -> periodic save
pagehide -> direct save and partial disposal
possible return -> retained host resumes without reconstruction
result -> domain and HUD truth can diverge from gameplay presentation
```

## Domains in use

```txt
browser shell, canvas, HUD, storage, diagnostics and page lifecycle
lifecycle classification, suspension, resume and retirement
runtime session, lifecycle generation, frame and input admission
save flush, verification, restore and rollback
renderer participant registration, validation, rebuild and resource retirement
backend capability, static and adaptive quality
NexusEngine composition, scheduler, ECS phases and snapshots
Core Object and Core Transaction Ledger
world, terrain, Agriculture, Foraging, Inventory and player
input, interaction, camera, scenario and portable saves
renderer-neutral snapshots
WebGPU/WebGL2 atmosphere, ocean, foam, cloud, fog, lighting, materials and post-processing
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

The complete per-kit service inventory is in `.agent/trackers/2026-07-13T01-40-00-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Missing authority

```txt
page lifecycle command/session/generation
pagehide persisted-state classification
Suspend, Resume and Retire plans
animation-loop and input participants
save write/readback lifecycle receipt
complete renderer participant registry and dependency order
retain/validate/rebuild/dispose results
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

## Validation boundary

Documentation only. No runtime, lifecycle, rendering, gameplay, save, dependency, package-script or deployment behavior changed. No lifecycle fixture was run.