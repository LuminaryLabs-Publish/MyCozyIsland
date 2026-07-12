# Current Audit: MyCozyIsland Host Save Persistence Authority

Last updated: `2026-07-12T14-51-49-04-00`

## Summary

The active route is a NexusEngine island-adventure loop with deterministic world generation, normalized input, first-person movement, official Agriculture services, product Inventory settlement, wild coconut Foraging, portable save-v2 capture, save-v1 migration, renderer-neutral snapshots and WebGPU/WebGL2 presentation.

The current gap is the boundary between portable snapshot capture and browser durability. `cozy-save-domain-kit` updates SaveState to `captured` before `src/main-adventure.js` proves that localStorage accepted and can read back the record. A failed host write can therefore leave engine diagnostics and the HUD claiming `Saved` without a durable commit.

The prior Agriculture cutover recovery authority remains required for gameplay transaction truth. The new host-save authority composes after it and owns only browser persistence, restore admission, lifecycle and durable status.

## Plan ledger

**Goal:** make save capture, browser commit, restore, reset, conflict handling and visible save status one truthful generation-bound transaction.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `MyCozyIsland` as the oldest eligible central entry.
- [x] Identify the complete startup, frame, autosave, restore, pagehide and reset loops.
- [x] Identify every active domain.
- [x] Preserve all 13 engine-installed kits and their services.
- [x] Preserve all 50 cataloged world/render/host kits and the additional composition kit.
- [x] Audit capture/commit truth, rollback reporting, key migration, quarantine, writer conflicts and lifecycle generations.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh root `.agent` files and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime persistence implementation and browser fixtures remain future work.

## Selection evidence

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

selected: MyCozyIsland
reason: oldest eligible central entry
selected timestamp: 2026-07-12T12-58-08-04-00
excluded: TheCavalryOfRome
```

## Complete interaction loop

```txt
startup
  -> create WebGPU/WebGL2 renderer and quality policy
  -> install Core Object and Core Transaction Ledger
  -> install World, Input, Inventory and official Agriculture
  -> install Foraging, Player, Scenario, Interaction, Camera, Save and Render Snapshot
  -> read my-cozy-island.adventure-save.v1 from localStorage
  -> parse JSON and call cozySave.restore
  -> build static and first frame snapshots
  -> construct world and presentation resources
  -> bind input, resize, visibility and pagehide listeners
  -> start renderer animation loop

frame
  -> admit normalized input frame
  -> advance Agriculture growth and Foraging respawn
  -> advance scenario and player
  -> resolve and settle contextual interaction
  -> build renderer-neutral frame snapshot
  -> update world, gameplay, ocean, HUD and diagnostics
  -> render post-processing pipeline
  -> accumulate clamped simulation dt for autosave
  -> compare durableFingerprint with last successful host fingerprint

host autosave
  -> cozySave.capture builds portable v2 snapshot
  -> SaveState becomes captured and saveCount increments
  -> JSON.stringify
  -> localStorage.setItem on one fixed key
  -> update lastSaveFingerprint only when setItem returns

restore
  -> clone predecessor snapshots
  -> validate checksum and schema
  -> migrate v1 farming state when required
  -> sequentially load world, ledger, scenario, inventory, agriculture, foraging and player
  -> reset interaction
  -> on failure sequentially reload predecessor snapshots
  -> log rollback failure but still return rolledBack true

page lifecycle
  -> visibilitychange clears input only
  -> pagehide once calls storeSave
  -> pagehide disposes gameplayRenderer only
  -> no pageshow/bfcache persistence generation

reset
  -> public resetAdventure calls cozySave.resetAll
  -> engine owners reset
  -> durable record is replaced only by a later autosave or pagehide
```

## Source-backed strengths

- Dependencies and browser imports are pinned to immutable commits.
- Official Agriculture remains the correct reusable crop authority.
- Portable save payloads include world, ledger, scenario, inventory, Agriculture, Foraging and player snapshots.
- Payload checksum validation exists.
- Save-v1 farming state can migrate into Agriculture schema.
- The host retries autosave when a storage write fails because it does not advance `lastSaveFingerprint`.
- The engine save domain remains host-agnostic through adapter-owned persistence metadata.
- Node smoke proves engine-level v2 round trip and synthetic v1 migration.

## Source-backed gaps

### Capture is reported before durable commit

`cozySave.capture()` sets `status: captured`, increments `saveCount`, stores `lastHash` and increments SaveState revision before the host calls localStorage. A quota, security or serialization failure therefore leaves capture diagnostics that look like durable success.

### HUD save status is not durable truth

`updateHud()` displays `Saved` whenever `frame.save.status === "captured"`. It has no host commit result, storage generation, dirty revision or failure state. The next frame can display `Saved` after `localStorage.setItem` failed.

### Restore rollback result can lie

The restore catch block attempts participant rollback. If rollback throws, it logs the error, then still returns `{ ok: false, rolledBack: true }`. No `rollback-failed` or `indeterminate` state exists.

### Corrupt records are not quarantined

JSON parse, checksum and schema failures leave the same localStorage record in place. Every reload retries the same record. No verified backup, quarantine row, fallback generation or repair receipt exists.

### Key identity is ambiguous

The browser key is `my-cozy-island.adventure-save.v1`, while the current payload schema is `cozy-island-adventure-save/2`. The old key may preserve continuity, but no canonical key registry, key migration policy or migration receipt makes that intent explicit.

### Storage has no staged commit

The host overwrites one key directly. It has no staging generation, readback verification, active pointer, predecessor backup, storage commit ID or bounded retention policy.

### Multi-tab writes are uncoordinated

Multiple tabs can load one predecessor and later replace each other using last-writer-wins localStorage. No tab identity, writer lease, storage event admission, expected predecessor checksum or conflict result exists.

### Autosave cadence uses simulation time

The five-second accumulator advances by clamped frame `dt`, not monotonic wall time. Background throttling and long callback gaps can delay autosave. Normal movement and scenario time continuously change the durable fingerprint.

### Page lifecycle is not bfcache-safe

The pagehide listener uses `{ once: true }`. After a bfcache restore, no pageshow handler allocates a new lifecycle generation or rearms the save handler. Visibility changes clear input but do not trigger a persistence policy.

### Reset is not immediately durable

`resetAdventure()` resets in-memory owners but does not immediately clear or replace the durable record. A process termination before the next autosave/pagehide can resurrect the predecessor save.

### Restore has no first-frame proof

No storage generation, restore command ID or migration receipt is carried into the render snapshot. No acknowledgement proves that the first visible island frame matches the restored durable record.

### Browser persistence proof is absent

The Node smoke calls `cozySave.capture()` and `restore()` directly. It does not instantiate localStorage, page lifecycle, quota failures, corrupt records, multiple tabs, WebGPU/WebGL2 status projection or Pages persistence.

## Domains in use

```txt
browser shell, loader, controls, HUD, hotbar and diagnostics
browser localStorage adapter and page lifecycle
WebGPU/WebGL2 rendering, quality, adaptive performance, resize and post-processing
NexusEngine runtime, ECS phases, resources, events and service installation
core object registration
core transaction ledger, repeat detection, snapshot and reset
seeded island world, terrain and surface queries
farm plots and wild-resource layout
normalized input queue and frame admission
scenario clock, day, phase and objective
Inventory balances, seed selection and batch settlement
production catalog family
official Agriculture land, soil, cultivation, watering, growth, harvest and perennials
tropical Agriculture configuration and product transaction coordination
wild coconut collection and respawn
player movement, grounding, view and stamina
nearest-target contextual interaction
camera intro and first-person projection
portable save capture, checksum, schema migration, restore, rollback and reset
host save dirty tracking, storage commit, conflict, quarantine and lifecycle policy
renderer-neutral static/frame/HUD/debug snapshots
terrain, biome, shoreline, ocean floor, vegetation, rocks, props and campfire
ocean, foam, cloud, fog, weather, wind, illumination and sky
render graph, depth, blend, output and backend parity
tests, CI, Pages deployment and audit tracking
```

## Engine-installed kits and services

- `core-object-kit`: stable object registration, lookup and listing.
- `core-transaction-ledger-kit`: ledger creation, record, apply-once, duplicate readback, snapshot and reset.
- `cozy-world-domain-kit`: seeded model, surface queries, plot and forage layouts, render base, snapshot and reset.
- `cozy-input-domain-kit`: normalized command queue, held state, frame admission, clear, snapshot and reset.
- `cozy-inventory-domain-kit`: items, seed selection, single and batch transactions, snapshot and reset.
- `agriculture-domain-kit`: land, soil, cultivation, water, continuous/daily growth, harvest, perennials, descriptors, events, snapshot and reset.
- `cozy-foraging-domain-kit`: wild coconut nodes, collection, respawn, snapshot and reset.
- `cozy-player-domain-kit`: movement, terrain grounding, view, stamina, snapshot and reset.
- `cozy-scenario-domain-kit`: clock, day, phase, objective, snapshot and reset.
- `cozy-interaction-domain-kit`: targeting, Agriculture settlement, wild-forage action, prompt, result, snapshot and reset.
- `cozy-camera-domain-kit`: aerial intro, first-person view, terrain clearance and descriptor.
- `cozy-save-domain-kit`: capture, checksum, v1 migration, restore, rollback, reset and diagnostics.
- `cozy-render-snapshot-domain-kit`: static world, Agriculture descriptors, frame snapshot, HUD and debug descriptors.

## Cataloged world/render/host kits

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

- `cozy-ocean-composition-kit`: render-layer graph, dependency validation, transparent-depth validation, terrain handoff and per-layer depth/blend contracts.

## Kit census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive catalog entries: 2
ordered Core World providers retained in source: 9
```

## Required parent domain

```txt
cozy-island-host-save-persistence-authority-domain
```

## Candidate kits

```txt
save-session-id-kit
save-command-id-kit
save-storage-generation-kit
save-dirty-revision-kit
save-envelope-v3-kit
save-source-fingerprint-kit
save-storage-capability-kit
save-key-registry-kit
save-key-migration-kit
save-writer-lease-kit
save-predecessor-checksum-kit
save-capture-candidate-kit
save-stage-write-kit
save-readback-verification-kit
save-pointer-commit-kit
save-backup-retention-kit
corrupt-save-quarantine-kit
save-conflict-result-kit
save-commit-result-kit
save-restore-admission-kit
save-rollback-result-kit
save-reset-commit-kit
save-autosave-policy-kit
page-lifecycle-save-flush-kit
bfcache-save-resume-kit
save-status-projection-kit
save-observation-journal-kit
save-frame-ack-kit
storage-quota-failure-fixture-kit
corrupt-save-quarantine-fixture-kit
multi-tab-write-conflict-fixture-kit
pagehide-bfcache-cycle-fixture-kit
reset-crash-reload-fixture-kit
restore-rollback-failure-fixture-kit
browser-storage-roundtrip-smoke-kit
pages-storage-roundtrip-smoke-kit
```

## Required save transaction

```txt
dirty gameplay state
  -> increment dirty revision
  -> admit SaveCommand against session, writer lease and predecessor
  -> capture immutable portable candidate without marking durable success
  -> serialize and write staging generation
  -> read back and verify bytes, schema and checksums
  -> compare active predecessor again
  -> commit active pointer and retain bounded backup
  -> publish SaveCommitResult
  -> clear matching dirty revision
  -> project Saved with commit and storage generation
```

## Required restore transaction

```txt
startup
  -> resolve canonical key and active pointer
  -> migrate legacy key with receipt
  -> parse and verify candidate
  -> quarantine invalid active record
  -> select verified active or backup generation
  -> prepare participant restore
  -> commit all participants or publish truthful rollback failure
  -> publish RestoreResult
  -> acknowledge first visible frame from restored generation
```

## Required reset transaction

```txt
ResetCommand
  -> reset engine participants
  -> create baseline or tombstone candidate
  -> commit it immediately
  -> retire predecessor storage generation
  -> publish ResetCommitResult and first reset frame receipt
```

## Validation boundary

Documentation changed only. Runtime, save behavior, gameplay, rendering, dependencies and deployment were not modified in this audit run.