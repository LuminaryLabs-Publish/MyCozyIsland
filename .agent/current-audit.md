# Current audit: MyCozyIsland public runtime capability authority

**Timestamp:** `2026-07-13T04-10-37-04-00`  
**Status:** `public-runtime-capability-authority-audited`  
**Branch:** `main`

## Summary

`src/main-adventure.js` always assigns a browser-global `CozyIsland` object after startup. The wrapper is frozen, but its values include the live `renderer`, `scene`, `camera`, `adventure`, raw `engine`, multiple domain APIs and direct save/reset functions. These references expose both read and mutation capabilities without a production/debug policy, grant, caller identity, expected revision, typed terminal result, revocation or visible-frame receipt.

The engine and domain APIs include mutating methods such as `tick`, input enqueue/clear, Inventory add/remove/applyChanges/loadSnapshot/reset, Foraging harvest/loadSnapshot/reset, save restore/resetAll and the broader NexusEngine service graph. An external host call can therefore become a second writer beside the animation loop and browser-input adapters.

## Plan ledger

**Goal:** define one minimal public capability surface that admits, executes, records and revokes debug/support operations without exposing raw runtime ownership.

- [x] Compare Publish inventory, central ledger and root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland as the oldest eligible synchronized repository.
- [x] Trace browser-global publication and exposed participant references.
- [x] Trace representative mutating engine, input, Inventory, Foraging and save/reset services.
- [x] Preserve the complete 64-kit and service inventory.
- [x] Add the timestamped capability audit family.
- [ ] Implement channel policy, capability grants, command admission, revocation and fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

MyCozyIsland       2026-07-13T01-40-00-04-00 selected
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
  -> initialize WebGPU renderer with WebGL2 fallback backend
  -> install 13 NexusEngine/core adventure kits
  -> restore save and construct world/render participants
  -> install canvas/window listeners
  -> start renderer.setAnimationLoop
  -> publish globalThis.CozyIsland

normal frame
  -> browser input adapters enqueue commands
  -> adventure.tick(dt)
  -> simulation, Agriculture, Foraging and player state advance
  -> renderer-neutral frame snapshot is built
  -> world/gameplay/foam/HUD/performance participants update
  -> post pipeline renders
  -> periodic save may capture and write state

public capability path
  -> caller reads CozyIsland from the global object
  -> caller can access renderer, scene, camera, adventure, engine and domain APIs
  -> caller can tick, enqueue, mutate, restore or reset outside the host loop
  -> no admission result binds the action to runtime/input/render generations
  -> subsequent normal frame projects the resulting state

page lifecycle
  -> pagehide partially disposes gameplayRenderer
  -> global host has no explicit revoke result
```

## Source-backed findings

- The host is installed unconditionally after startup; no development-build or capability check surrounds it.
- `Object.freeze()` protects only the top-level property table. It does not freeze the referenced renderer, scene, camera, adventure, engine or domain APIs.
- `adventure.tick()` and raw `engine` access allow simulation execution outside the registered animation loop.
- `cozyInput` exposes enqueue and clear operations.
- `cozyInventory` exposes selection, add, remove, batch changes, snapshot load and reset.
- `cozyForaging` exposes harvest, snapshot load and reset.
- `cozySave` exposes capture, restore and `resetAll`; the public `resetAdventure` function invokes that multi-domain reset directly.
- Raw renderer, scene and camera references permit presentation mutation outside renderer-neutral snapshots.
- `getState()` reports a newly captured state view, not the state proven visible on screen.
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

The complete per-kit service inventory is recorded in `.agent/trackers/2026-07-13T04-10-37-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

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
