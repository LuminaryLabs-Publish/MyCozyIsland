# Project breakdown: MyCozyIsland save, world and content compatibility

**Timestamp:** `2026-07-16T05-41-12-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `75a1941e1305780b06276b15a3d9d8834f6a3530`  
**Status:** `save-world-content-compatibility-admission-authority-audited`

## Summary

MyCozyIsland was selected by the oldest synchronized central-ledger timestamp after the current 11-repository Publish inventory showed no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repository.

The focused audit isolates save compatibility across world generation, content definitions, participant schemas and the first restored visible frame. Save v2 validates a checksum and supports one v1-to-v2 Agriculture migration, but it does not admit or reject a save against a versioned world-generation manifest, content-pack identity, dependency fingerprint or participant topology. The already-created runtime model remains bound to the current configuration while restored participant snapshots may come from an older configuration.

## Plan ledger

**Goal:** require every restore to prove that the save, current world model, content catalog, installed domains and visible frame belong to one compatible release generation, or route the save through an explicit migration, quarantine or new-island fallback.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central-ledger entries and ten root `.agent` states.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead repositories.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` by the oldest synchronized timestamp.
- [x] Inspect save capture, checksum validation, schema migration, restore ordering and rollback.
- [x] Inspect world construction, world snapshot loading, current-model queries and render-base ownership.
- [x] Inspect Agriculture and Foraging configuration, participant snapshots and successful-path tests.
- [x] Identify the full interaction loop, domains, kits, adapters and offered services.
- [x] Preserve all 70 implemented surfaces.
- [x] Define one parent compatibility authority and 20 coordinating surfaces.
- [x] Add the timestamped repo-local audit family.
- [ ] Implement compatibility admission, migration/rebuild and executable fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

MyCozyIsland      2026-07-16T00-59-16-04-00 selected
IntoTheMeadow     2026-07-16T01-38-56-04-00
PrehistoricRush   2026-07-16T02-03-42-04-00
HorrorCorridor    2026-07-16T02-40-29-04-00
TheOpenAbove      2026-07-16T03-03-22-04-00
ZombieOrchard     2026-07-16T03-41-28-04-00
TheUnmappedHouse  2026-07-16T04-02-40-04-00
PhantomCommand    2026-07-16T04-27-44-04-00
AetherVale        2026-07-16T04-40-16-04-00
TheLongHaul       2026-07-16T05-01-43-04-00
TheCavalryOfRome  excluded
```

## Complete interaction loop

```txt
menu boot
  -> initialize postcard renderer
  -> create hidden same-origin game frame
  -> wait for game first-frame readiness

game construction
  -> create Core Startup engine
  -> install Core Object and Core Transaction Ledger
  -> create current seeded world model from COZY_WORLD_CONFIG
  -> install Inventory, current Agriculture config and Foraging
  -> install Player, Scenario, Interaction, Camera, Save and Render Snapshot
  -> initialize current forage state from current world-model nodes

save restore
  -> read localStorage envelope
  -> validate checksum
  -> accept save schema v2 or migrate v1 farming to Agriculture v2
  -> load world snapshot
  -> load transaction ledger, scenario, inventory, Agriculture, Foraging and player snapshots
  -> reset interaction
  -> publish a successful restore result
  -> build static and frame snapshots from the already-created current runtime model

entry and active play
  -> reveal prepared game
  -> input, growth, respawn, player, scenario and interaction settle
  -> save fingerprint is evaluated
  -> WebGPU/WebGL2 renders current model plus restored participant state
  -> autosave captures current participant snapshots
```

## Source-backed compatibility path

### Save envelope

`cozy-island-adventure-save/2` captures:

```txt
schema
product version
world snapshot
scenario snapshot
transaction-ledger snapshot
inventory snapshot
Agriculture snapshot
Foraging snapshot
player snapshot
checksum
```

It does not capture one authoritative release manifest containing:

```txt
world-generation algorithm version
world-config digest
content-pack identity and digest
item/crop definition digest
installed DSK and participant-schema fingerprints
NexusEngine and NexusEngine-Kits revisions
migration graph version
render-model compatibility version
```

### Restore admission

`validateEnvelope()` proves only checksum integrity. `migrateSavePayload()` recognizes only save schemas v1 and v2. No compatibility command compares the save's world/content identities with the current runtime before participant mutation begins.

### Current model versus restored state

`createCozyWorldDomain()` constructs one immutable runtime model from the current `COZY_WORLD_CONFIG` before restore. `loadSnapshot()` merges saved state but forces the current configured world ID and seed. The API continues returning `model.renderBase`, `model.plots`, `model.forageNodes`, surface queries and collision constraints from the already-created current model.

Agriculture is also installed from the current tropical configuration before restore. A future save from a different layout or content revision can therefore be accepted into participant state without rebuilding or rejecting the current world model and render base.

### Existing proof

The current adventure smoke verifies successful same-version Agriculture, Foraging, v2 save/restore and v1 migration. It does not mutate the world seed, farm layout, forage topology, item/crop catalog, dependency revision or participant schemas and then prove reject, migrate, rebuild or fallback behavior.

## Main finding

```txt
checksum validation: present
save schema v1 -> v2 migration: present
same-version successful restore smoke: present
world seed stored in world snapshot: present
world config stored in world snapshot: present

release compatibility manifest: absent
world-generation algorithm identity: absent
world-config digest admission: absent
content/item/crop digest admission: absent
installed-domain schema fingerprint admission: absent
dependency revision compatibility policy: absent
current-model versus saved-model comparison: absent
world-model rebuild from accepted save: absent
Agriculture/Foraging topology rebind result: absent
incompatible-save quarantine or fallback result: absent
restore generation identity: absent
FirstRestoredWorldFrameAck: absent
cross-version browser/build/Pages fixtures: absent
```

This is a source-backed upgrade and compatibility gap. The current product uses one fixed world configuration, and no existing user save was shown to be corrupted or visibly mismatched.

## Domains in use

```txt
application routes and same-origin preload
Core Startup
Core Object
Core Transaction Ledger
seeded world model and surface queries
normalized browser input
Inventory
official Agriculture
wild Foraging
player movement and stamina
scenario time and objectives
contextual interaction
camera and aerial introduction
portable save capture, migration and restore
renderer-neutral static and frame snapshots
WebGPU/WebGL2 menu and game presentation
atmosphere, ocean, foam, cloud, fog and post-processing
save compatibility and migration admission
world/content topology reconciliation
restored visible-frame convergence
validation, build, Pages and central governance
```

## Kit and service census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total implemented surfaces: 70
planned save-compatibility surfaces: 20
```

### Engine-installed kits

| Kit | Domain | Services |
|---|---|---|
| `core-startup-kit` | `n:core-startup` | launch, preparation registration, readiness, failure, continuation, first-frame admission, playable entry, snapshot, load, reset |
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot layout, forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture settlement, wild Foraging action, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor |

### Cataloged world, render and host kits

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

Service families cover renderer fallback, atmosphere preparation, ocean/foam/post processing, adaptive quality, camera/scenario descriptors, terrain/vegetation queries, cloud/fog/weather fields, illumination, shoreline/ocean optics, render archetypes, deterministic seeds and environment time.

### Composition and adapters

- `cozy-ocean-composition-kit`: layer graph, pass-order validation, transparent-depth validation, terrain handoff and depth-blend contracts.
- `browser-startup-presentation-adapter`: descriptor DOM projection, failure projection, timeout helper and render-update bridge.
- `cozy-startup-host`: preparation order, engine reuse, continuation mapping, global error capture and disposal.
- `cozy-menu-scene-adapter`: WebGPU/WebGL2 postcard, procedural atlases, wind, water, fog, lighting, post, resize, animation and retirement.
- `cozy-menu-game-shell-adapter`: iframe preload, progress, play gate, entry, crossfade, history, focus and fallback.
- `cozy-game-preload-bridge-adapter`: embed classification, messaging, simulation/presentation freeze-resume, entry preparation and acknowledgement.

## Required authority

```txt
cozy-island-save-world-content-compatibility-admission-authority-domain
```

```txt
SaveCompatibilityAdmissionCommand
  -> bind save schema, product release, world generation, world config,
     content catalog, installed DSK and participant-schema identities
  -> validate checksum before mutation
  -> classify exact, migratable, rebuild-required, incompatible or corrupt
  -> select one migration/rebuild graph
  -> create one RestoreGeneration
  -> restore or rebuild all participants atomically
  -> rebind world objects, Agriculture plots and Foraging nodes
  -> reject stale or incompatible restore work
  -> publish SaveCompatibilityAdmissionResult
  -> expose quarantine or new-island fallback when required
  -> render one matching restored world frame
  -> publish FirstRestoredWorldFrameAck
```

## Planned authority surfaces

```txt
save-release-manifest-kit
world-generation-version-kit
world-config-digest-kit
content-pack-identity-kit
dependency-contract-fingerprint-kit
participant-schema-fingerprint-kit
save-compatibility-admission-kit
save-migration-graph-kit
world-model-rebuild-kit
agriculture-layout-rebind-kit
foraging-layout-rebind-kit
object-registry-rebind-kit
transaction-ledger-compatibility-kit
incompatible-save-quarantine-kit
new-island-fallback-kit
restore-generation-identity-kit
stale-restore-rejection-kit
restored-frame-convergence-kit
first-restored-world-frame-ack-kit
save-compatibility-source-build-pages-fixture-kit
```

## Repo-local output

Added:

```txt
.agent/trackers/2026-07-16T05-41-12-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T05-41-12-04-00.md
.agent/architecture-audit/2026-07-16T05-41-12-04-00-save-world-content-compatibility-dsk-map.md
.agent/render-audit/2026-07-16T05-41-12-04-00-restored-state-current-world-visible-frame-gap.md
.agent/gameplay-audit/2026-07-16T05-41-12-04-00-save-restore-world-version-loop.md
.agent/interaction-audit/2026-07-16T05-41-12-04-00-save-compatibility-command-result-map.md
.agent/save-compatibility-audit/2026-07-16T05-41-12-04-00-world-seed-content-migration-contract.md
.agent/deploy-audit/2026-07-16T05-41-12-04-00-save-compatibility-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T05-41-12-04-00-oldest-selection-save-compatibility-reconciliation.md
```

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

## Validation boundary

This run changed documentation only. It did not change save schemas, world generation, content definitions, participant restore behavior, renderer behavior, tests, workflows or deployment. No cross-version save, changed-seed save, changed-layout save, incompatible-content save, migration graph, quarantine, fallback, restored-frame or Pages fixture was executed.