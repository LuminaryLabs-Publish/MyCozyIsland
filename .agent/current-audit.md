# Current audit: MyCozyIsland public runtime capability reconciliation

**Timestamp:** `2026-07-13T04-21-10-04-00`  
**Status:** `public-runtime-capability-publication-central-reconciled`  
**Technical status:** `public-runtime-capability-authority-audited`  
**Branch:** `main`

## Summary

`src/main-adventure.js` assigns a browser-global `CozyIsland` object after startup. The wrapper is frozen, but its values include the live `renderer`, `scene`, `camera`, `adventure`, raw `engine`, multiple domain APIs and direct save/reset functions. These references expose read and mutation capabilities without a production/debug policy, grant, caller identity, expected revision, typed terminal result, revocation or visible-frame receipt.

The technical audit was completed at `2026-07-13T04-10-37-04-00`. This run reconciles its root routing, machine state and central ledger publication.

## Plan ledger

**Goal:** define one minimal public capability surface that admits, executes, records and revokes debug/support operations without exposing raw runtime ownership.

- [x] Compare Publish inventory, central ledger and root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Detect MyCozyIsland capability documentation newer than central tracking.
- [x] Select only MyCozyIsland.
- [x] Trace browser-global publication and exposed participant references.
- [x] Trace representative mutating engine, input, Inventory, Foraging and save/reset services.
- [x] Preserve the complete 64-kit and service inventory.
- [x] Add the capability audit and central-reconciliation families.
- [x] Align required root documents and machine registry.
- [ ] Implement channel policy, capability grants, command admission, revocation and fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 1

MyCozyIsland       central 2026-07-13T01-40-00-04-00
                   local   2026-07-13T04-10-37-04-00 selected
TheUnmappedHouse   2026-07-13T01-49-49-04-00
AetherVale         2026-07-13T02-15-51-04-00
TheOpenAbove       2026-07-13T02-18-03-04-00
IntoTheMeadow      2026-07-13T02-39-44-04-00
PhantomCommand     2026-07-13T02-49-07-04-00
PrehistoricRush    2026-07-13T03-20-58-04-00
HorrorCorridor     2026-07-13T03-38-31-04-00
ZombieOrchard      2026-07-13T03-59-28-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/MyCozyIsland` is modified in the Publish organization.

## Complete interaction loop

```txt
boot
  -> initialize WebGPU renderer with WebGL2 fallback
  -> install 13 NexusEngine/core adventure kits
  -> restore save and construct world/render participants
  -> install browser listeners and start animation loop
  -> publish globalThis.CozyIsland

normal frame
  -> browser adapters queue input
  -> adventure.tick(dt)
  -> simulation, Agriculture, Foraging and player state advance
  -> renderer-neutral frame snapshot is built
  -> world/gameplay/foam/HUD/performance participants update
  -> post pipeline renders
  -> periodic save may persist state

public capability path
  -> caller reads CozyIsland
  -> caller can access renderer, scene, camera, adventure, engine and domain APIs
  -> caller can tick, enqueue, mutate, restore or reset outside the host loop
  -> no admission result binds the action to runtime/input/render generations
  -> subsequent normal frame projects the resulting state

page lifecycle
  -> pagehide partially disposes gameplayRenderer
  -> public host has no explicit revoke result
```

## Source-backed findings

- The host is installed unconditionally after startup; no development-build or capability check surrounds it.
- `Object.freeze()` protects only the top-level property table, not referenced owners.
- `adventure.tick()` and raw `engine` access allow simulation execution outside the registered animation loop.
- `cozyInput` exposes enqueue and clear operations.
- `cozyInventory` exposes selection, add, remove, batch changes, snapshot load and reset.
- `cozyForaging` exposes harvest, snapshot load and reset.
- `cozySave` exposes capture, restore and `resetAll`; `resetAdventure` invokes that multi-domain reset directly.
- Raw renderer, scene and camera references permit presentation mutation outside renderer-neutral snapshots.
- `getState()` captures current state, not the state proven visible on screen.
- No host command record identifies source, session, capability, expected revision, changed domains, rejection reason or matching frame.

## Domains in use

```txt
browser shell, global-object publication, canvas, HUD and diagnostics
public/debug/support channel policy and capability admission
runtime session, generation, command identity and revocation
NexusEngine composition, scheduling, ticking and service lookup
Core Object and Core Transaction Ledger
world, terrain, Agriculture, Foraging, Inventory and player
input, interaction, camera, scenario and portable saves
renderer-neutral static/frame snapshots
WebGPU/WebGL2 renderer, scene, camera, atmosphere, ocean, foam and post-processing
browser lifecycle, storage, validation, build, Pages and central tracking
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

The complete per-kit service inventory is recorded in `.agent/trackers/2026-07-13T04-21-10-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Missing authority

```txt
PublicHostId and PublicHostGeneration
build/debug/support channel policy
capability manifest and grant IDs
read-only snapshot projection
caller/source identity
PublicCapabilityCommandId and sequence
expected runtime/domain/render revisions
stale and duplicate rejection
participant prepare/commit/rollback results
reset confirmation and scope
bounded observations and audit journal
host revoke/retire result
first visible capability-effect frame acknowledgement
source/build/Pages capability fixtures
```

## Required parent domain

`cozy-island-public-runtime-capability-authority-domain`

## Validation boundary

Documentation only. No runtime, host, rendering, gameplay, save, input, dependency, package-script or deployment behavior changed. No capability fixture was run.