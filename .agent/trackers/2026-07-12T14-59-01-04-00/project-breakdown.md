# MyCozyIsland Project Breakdown: Host Save Persistence Central Reconciliation

Timestamp: `2026-07-12T14-59-01-04-00`

## Summary

MyCozyIsland was selected because it had the oldest eligible central-ledger timestamp and its repo-local host-save persistence audit was newer than the central record. This run reconciles that audit without changing runtime behavior.

## Plan ledger

**Goal:** synchronize the current MyCozyIsland architecture, interaction loop, kit/service census and host-save persistence findings with the central LuminaryLabs ledger while preserving the official Agriculture ownership boundary.

- [x] Compare the full ten-repository `LuminaryLabs-Publish` inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Select only `MyCozyIsland`.
- [x] Confirm the repo-local `2026-07-12T14-51-49-04-00` audit is newer than the central `2026-07-12T12-58-08-04-00` record.
- [x] Reconcile the interaction loop, domains, kits and offered services.
- [x] Preserve the official `n:production:agriculture` DSK and product ownership split.
- [x] Add a new timestamped tracker and turn-ledger entry.
- [x] Add architecture, render, persistence and deployment reconciliation records.
- [x] Update root `.agent` routing and validation.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime persistence implementation and executable browser fixtures remain future work.

## Organization comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

MyCozyIsland       central 2026-07-12T12-58-08-04-00; local 2026-07-12T14-51-49-04-00; selected
TheUnmappedHouse   2026-07-12T13-08-15-04-00
AetherVale         2026-07-12T13-20-00-04-00
TheOpenAbove       2026-07-12T13-29-56-04-00
IntoTheMeadow      2026-07-12T13-54-00-04-00
PhantomCommand     2026-07-12T13-59-50-04-00
PrehistoricRush    2026-07-12T14-10-22-04-00
HorrorCorridor     2026-07-12T14-30-36-04-00
ZombieOrchard      2026-07-12T14-38-35-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/MyCozyIsland` is modified in the Publish organization.

## Interaction loop

```txt
startup
  -> load pinned NexusEngine and NexusEngine-Kits modules
  -> compose 13 engine-installed adventure kits
  -> install official Agriculture with tropical content/configuration
  -> generate island, plots, wild-resource nodes and landmarks
  -> read the browser save record
  -> restore save-v2 or migrate save-v1
  -> construct WebGPU or WebGL2 presentation
  -> start the animation loop

frame
  -> admit normalized input
  -> advance scenario time, Agriculture growth and Foraging respawn
  -> advance player movement and contextual interaction
  -> derive camera, HUD, save and render snapshots
  -> render the frame
  -> compare the durable fingerprint every five simulation seconds
  -> capture an engine save candidate
  -> attempt localStorage persistence

page lifecycle
  -> one-shot pagehide save attempt
  -> no pageshow re-arm after bfcache restoration

reset
  -> reset engine participants
  -> update in-memory save state
  -> leave durable storage update to a later host path
```

## Domains in use

```txt
browser application and import-map boot
NexusEngine composition/runtime
object identity and repeat-safe transaction ledger
procedural Core World generation and ordered providers
normalized browser input
scenario time
Inventory settlement
Agriculture land, soil, cultivation, water, growth, harvest and perennials
wild-resource Foraging
player movement and contextual interaction
camera state
portable save schema, checksum, migration, restore and reset
browser localStorage hosting
save fingerprint and autosave cadence
WebGPU/WebGL2 presentation
renderer-neutral HUD and render snapshots
page lifecycle and public CozyIsland host capabilities
validation, Pages deployment and audit tracking
```

## Kit census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits:     50
additional composition kit:            1
source-backed kit surfaces:            64
active route kit surfaces:             62
inactive catalog entries:               2
ordered Core World providers:            9
```

## Offered services

```txt
stable object registration and operation deduplication
deterministic world queries and tropical island generation
browser input admission and scenario-time advancement
Inventory batch settlement
Agriculture plot, soil, cultivation, watering, growth, harvest and perennial operations
wild coconut spawning, collection and respawn
player movement, camera and contextual interaction
portable v2 save capture, checksum, v1 migration, restore, rollback attempt and reset
browser save loading and localStorage write attempts
durable-state fingerprint comparison and autosave scheduling
WebGPU/WebGL2 world presentation
HUD, save-status and renderer-neutral frame projection
public host inspection/reset controls
Node smoke, build and Pages deployment surfaces
```

## Reconciled findings

```txt
capture-versus-commit
  engine save capture marks status captured and increments saveCount
  browser localStorage commit occurs afterward
  failed storage can still produce a Saved HUD state

restore
  corrupt active records remain at the canonical key
  rollback failure can still be reported as rolledBack true

storage ownership
  the legacy .v1 key stores /2 schema
  no staged write, readback verification, active pointer or backup protocol

concurrency
  no tab identity, writer lease or predecessor-checksum admission
  last writer silently wins

lifecycle
  autosave cadence follows clamped simulation time
  pagehide is once-only and pageshow does not re-arm after bfcache
  reset is not immediately durable

proof
  no durable commit ID, storage generation or first restored-frame acknowledgement
  Node smoke bypasses localStorage, conflicts, bfcache and deployed Pages behavior
```

## Required authority

```txt
cozy-island-host-save-persistence-authority-domain
  -> save command and storage generation identity
  -> dirty revision and predecessor checksum admission
  -> canonical key migration
  -> tab identity and writer lease
  -> staged record write and readback verification
  -> active-pointer commit and backup retention
  -> corrupt-record quarantine
  -> truthful rollback and reset results
  -> lifecycle flush/re-arm policy
  -> durable save-status projection
  -> first restored-frame acknowledgement
  -> browser, multi-tab, bfcache and Pages fixtures
```

## Validation boundary

```txt
runtime source changed: no
save behavior changed: no
Agriculture behavior changed: no
Inventory behavior changed: no
render output changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
```

This run synchronizes documentation only. It does not claim browser durability, conflict safety, corrupt-record recovery, bfcache-safe flushing, immediate reset durability or first-visible-frame provenance.