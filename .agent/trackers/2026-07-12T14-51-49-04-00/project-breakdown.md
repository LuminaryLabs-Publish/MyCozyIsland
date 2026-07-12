# Project Breakdown: MyCozyIsland Host Save Persistence Authority

Timestamp: `2026-07-12T14-51-49-04-00`
Repository: `LuminaryLabs-Publish/MyCozyIsland`
Branch: `main`

## Summary

MyCozyIsland is a NexusEngine-composed island adventure with deterministic world generation, normalized input, official Agriculture, product Inventory and Foraging, renderer-neutral snapshots, WebGPU/WebGL2 presentation and a browser-owned localStorage adapter.

This run selects MyCozyIsland by the oldest documented-selection rule. The full ten-repository Publish inventory was compared with the central ledger, `TheCavalryOfRome` was excluded, and all nine eligible repositories already had central tracking and root `.agent` state.

The new audit isolates the boundary between `cozy-save-domain-kit` capture/restore semantics and actual browser durability. The engine marks a snapshot as captured before the host proves that localStorage accepted it. Storage failure can therefore leave the engine and HUD claiming `Saved` even though no durable commit occurred.

## Plan ledger

**Goal:** define one truthful save authority from dirty state through immutable capture, browser-storage admission, verified commit, restore, reset, page lifecycle, conflict handling and first-visible-frame acknowledgement.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` as the oldest eligible central entry.
- [x] Inspect `src/main-adventure.js`, `src/adventure/persistence-render-domains.js`, composition, tests and current audits.
- [x] Identify the complete startup, frame, autosave, pagehide, restore and reset loops.
- [x] Identify all domains in use.
- [x] Preserve the complete 64-surface kit/service census.
- [x] Audit capture-versus-commit truth, restore rollback reporting, corrupt-save handling, key migration, lifecycle flush and cross-tab conflicts.
- [x] Add timestamped architecture, render, gameplay, interaction, save-persistence and deployment audits.
- [x] Refresh all required root `.agent` files.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Runtime persistence implementation and executable browser fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

MyCozyIsland       2026-07-12T12-58-08-04-00 selected
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

Only `LuminaryLabs-Publish/MyCozyIsland` was modified in the Publish organization.

## Complete interaction loop

```txt
startup
  -> create WebGPU/WebGL2 renderer and quality policy
  -> install 13 engine kits
  -> read my-cozy-island.adventure-save.v1 from localStorage
  -> JSON parse and call cozySave.restore
  -> build world and presentation from restored or default state
  -> bind input, resize, visibility and pagehide listeners
  -> start renderer animation loop

frame
  -> admit input and tick NexusEngine
  -> update camera, environment, gameplay meshes and HUD
  -> render post-processing pipeline
  -> accumulate simulation dt toward five-second autosave check
  -> compare durableFingerprint with last successful host fingerprint
  -> capture engine snapshot and attempt localStorage write when dirty

capture and host write
  -> cozySave.capture builds v2 envelope and checksum
  -> SaveState immediately becomes captured and increments saveCount
  -> host serializes snapshot
  -> localStorage.setItem attempts one-key replacement
  -> host updates lastSaveFingerprint only on success

restore
  -> parse host value
  -> validate checksum and schema
  -> sequentially load world, ledger, scenario, inventory, agriculture, foraging and player
  -> reset interaction
  -> on failure attempt sequential snapshot rollback
  -> return rolledBack true even when rollback itself throws

pagehide
  -> capture and write once
  -> dispose only gameplayRenderer
  -> listener is not rearmed after a bfcache pageshow

reset
  -> reset engine owners
  -> wait for later autosave or pagehide to replace the durable record
```

## Main findings

1. `cozySave.capture()` mutates SaveState before browser storage commit is known.
2. `storeSave()` can fail after capture, leaving `status: captured`, an incremented `saveCount` and a HUD that says `Saved` without a durable write.
3. `restore()` reports `rolledBack: true` even when rollback throws and only logs the rollback failure.
4. Invalid or corrupt localStorage content is retried on every load; no quarantine, backup or repair pointer exists.
5. The host key ends in `.v1` while the current payload schema is `/2`; no canonical key registry or explicit key migration receipt exists.
6. Multiple tabs share one unleased key and use last-writer-wins replacement without predecessor checksum admission or conflict results.
7. The pagehide listener uses `{ once: true }`; a bfcache restoration does not rearm it, and no pageshow generation exists.
8. Reset is not immediately durable. A crash or process kill before the next autosave/pagehide can restore the pre-reset record.
9. No storage commit ID, dirty revision, staging slot, readback verification, backup retention, durable commit result or first restored-frame receipt exists.
10. Existing Node tests exercise engine capture/restore directly and do not instantiate localStorage, quota errors, corrupt records, multiple tabs or page lifecycle.

## Domains in use

```txt
browser application shell, loader, HUD, hotbar and diagnostics
browser localStorage adapter and page lifecycle
WebGPU/WebGL2 renderer, quality, performance, resize and post-processing
NexusEngine runtime, ECS resources, events and service installation
core object registration
core transaction ledger and idempotency
seeded world, terrain and surface queries
farm plots and wild-resource layout
normalized input queue and frame admission
scenario clock, day, phase and objective
Inventory balances, selection and batch settlement
official Agriculture land, soil, cultivation, water, growth, harvest and perennials
product Agriculture transaction coordination
wild coconut Foraging and respawn
player movement, grounding, view and stamina
nearest-target contextual interaction
camera intro and first-person projection
save capture, checksum, migration, restore, rollback and reset
host storage commit, dirty tracking, conflict and lifecycle policy
renderer-neutral world, Agriculture, HUD and debug snapshots
terrain, biome, shoreline, ocean floor, vegetation, rocks, props and campfire
ocean, foam, clouds, fog, weather, wind, illumination and sky
render graph, depth, blend and backend parity
validation, CI, Pages deployment and internal audit tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional runtime composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive catalog entries: 2
ordered Core World providers retained: 9
```

### Engine-installed kits

- `core-object-kit`: registration, lookup and listing.
- `core-transaction-ledger-kit`: ledger, repeat detection, record, apply-once, snapshot and reset.
- `cozy-world-domain-kit`: seeded world, surface queries, plot/forage layout, render base, snapshot and reset.
- `cozy-input-domain-kit`: command queue, held state, frame admission, clear, snapshot and reset.
- `cozy-inventory-domain-kit`: items, selection, transactions, batch settlement, snapshot and reset.
- `agriculture-domain-kit`: land, soil, cultivation, watering, growth, harvest, perennials, descriptors, events, snapshot and reset.
- `cozy-foraging-domain-kit`: wild coconut nodes, collection, respawn, snapshot and reset.
- `cozy-player-domain-kit`: movement, grounding, view, stamina, snapshot and reset.
- `cozy-scenario-domain-kit`: clock, day, phase, objective, snapshot and reset.
- `cozy-interaction-domain-kit`: targeting, Agriculture settlement, Foraging action, prompt, result, snapshot and reset.
- `cozy-camera-domain-kit`: aerial intro, first-person view, terrain clearance and descriptor.
- `cozy-save-domain-kit`: capture, checksum validation, migration, restore, rollback, reset and diagnostics.
- `cozy-render-snapshot-domain-kit`: static world, Agriculture descriptors, frame, HUD and debug snapshots.

### Cataloged world/render/host kits

```txt
debug-overlay-host-kit
webgl2-fallback-renderer-kit
webgpu-compute-atmosphere-renderer-kit
webgpu-foam-renderer-kit
webgpu-ocean-renderer-kit
webgpu-performance-budget-kit
webgpu-post-processing-renderer-kit
webgpu-rolling-fog-renderer-kit
webgpu-stylized-material-renderer-kit
webgpu-volumetric-cloud-renderer-kit
camera-rail-sequence-kit
cozy-island-scenario-kit
terrain-surface-domain-kit
vegetation-placement-domain-kit
aerial-perspective-domain-kit
campfire-atmosphere-domain-kit
cloud-density-field-domain-kit
cloud-horizon-band-domain-kit
cloud-lighting-domain-kit
cloud-lod-domain-kit
cloud-shadow-domain-kit
cloud-weather-domain-kit
fog-advection-domain-kit
fog-field-domain-kit
fog-volume-placement-domain-kit
ground-contact-domain-kit
illumination-domain-kit
ocean-caustics-domain-kit
ocean-floor-profile-domain-kit
ocean-optics-domain-kit
ocean-wave-domain-kit
prop-archetype-domain-kit
render-archetype-domain-kit
render-quality-domain-kit
render-snapshot-domain-kit
rock-archetype-domain-kit
shoreline-field-domain-kit
shoreline-foam-domain-kit
stylized-material-descriptor-domain-kit
sun-glitter-domain-kit
terrain-biome-field-domain-kit
terrain-lod-domain-kit
underwater-atmosphere-domain-kit
vegetation-archetype-domain-kit
vegetation-lod-domain-kit
vegetation-wind-domain-kit
weather-state-domain-kit
wind-field-domain-kit
deterministic-seed-domain-kit
environment-clock-domain-kit
```

Additional source-backed kit:

- `cozy-ocean-composition-kit`: render-layer graph, pass ordering, transparent-depth validation, terrain handoff and per-layer depth/blend contracts.

## Required parent domain

```txt
cozy-island-host-save-persistence-authority-domain
```

It coordinates browser durability only. `cozy-save-domain-kit` keeps portable engine snapshot rules; gameplay domains keep their state; renderer implementations remain consumers.

## Validation boundary

Documentation changed only. Runtime, gameplay, Agriculture, persistence behavior, rendering, dependencies and deployment were not modified.