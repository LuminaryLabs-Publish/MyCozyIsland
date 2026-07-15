# Project breakdown: MyCozyIsland save-writer lease and revision admission

**Timestamp:** `2026-07-15T15-01-22-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `e6947c349442520aaddf7e8a0788cfd4fb56f97e`  
**Status:** `save-writer-lease-revision-admission-authority-audited`

## Summary

MyCozyIsland has checksum-validated portable saves and periodic browser persistence, but every same-origin game document can overwrite the same localStorage slot without a writer lease or durable head revision. A stale tab or hidden preload can therefore replace newer accepted progress with an older but checksum-valid snapshot.

## Plan ledger

**Goal:** preserve one monotonic durable save history across active games, hidden preloads, multiple tabs and lifecycle exits.

- [x] Compare the complete 11-repository Publish inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only MyCozyIsland by the oldest synchronized timestamp.
- [x] Trace load, autosave, pagehide, hidden preload and save-envelope paths.
- [x] Preserve all 70 implemented kit and adapter surfaces.
- [x] Define one parent save-writer authority and 20 coordinating surfaces.
- [x] Change documentation only.
- [ ] Implement and execute multi-document conflict fixtures.

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

selected: LuminaryLabs-Publish/MyCozyIsland
selection rule: oldest synchronized central timestamp
prior timestamp: 2026-07-15T10-01-08-04-00
next oldest: LuminaryLabs-Publish/IntoTheMeadow at 2026-07-15T10-40-17-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu
  -> create a same-origin hidden game iframe
  -> game restores the shared localStorage save once
  -> startup reaches playable
  -> preload bridge freezes simulation and presentation
  -> Play resumes that document

adventure
  -> input, simulation, Agriculture and Foraging settle
  -> render/HUD snapshots update
  -> every five admitted simulation seconds, changed state is captured
  -> the host writes the snapshot to one shared localStorage key

document exit
  -> pagehide captures and writes unconditionally
  -> no writer lease, slot-head comparison or stale-write rejection occurs
```

## Domains in use

```txt
static menu and game routes
same-origin iframe preload and cross-window entry messaging
browser document identity, localStorage, storage events and page lifecycle
Core Startup, Object and Transaction Ledger
seeded world, input, Inventory, Agriculture and Foraging
player, scenario, interaction and camera
portable save capture, checksum, migration, restore and rollback
save-slot head revision, writer lease, conflict arbitration and durable commit
renderer-neutral snapshots and WebGPU/WebGL2 presentation
terrain, vegetation, atmosphere, ocean, foam and post processing
HUD, diagnostics, adaptive quality, validation, build and Pages
```

## Implemented kits and services

### Engine-installed kits

| Kit | Domain | Services |
|---|---|---|
| `core-startup-kit` | `n:core-startup` | launch, preparation, readiness, failure, continuation, first frame, playable entry, snapshot, load, reset |
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot/forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture/Foraging settlement, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture, frame, HUD and debug descriptors |

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

Their services cover renderer fallback, atmosphere volumes, ocean/foam/post passes, adaptive quality, camera/scenario descriptors, terrain and vegetation queries, cloud/fog/weather fields, illumination, shoreline/ocean optics, render archetypes, deterministic seeds and environment time.

### Composition and browser adapters

| Surface | Services |
|---|---|
| `cozy-ocean-composition-kit` | layer graph, pass order, depth/blend validation |
| `browser-startup-presentation-adapter` | startup/failure DOM projection, timeout and update bridge |
| `cozy-startup-host` | preparation order, engine reuse, continuation, global errors, disposal |
| `cozy-menu-scene-adapter` | WebGPU/WebGL2 postcard, atlases, wind, water, fog, lighting, post, resize, animation, retirement |
| `cozy-menu-game-shell-adapter` | iframe preload, progress, Play gate, entry, crossfade, history, focus, fallback |
| `cozy-game-preload-bridge-adapter` | embed classification, messaging, simulation/presentation freeze-resume, entry preparation and acknowledgement |

```txt
engine-installed kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total implemented surfaces: 70
planned save-writer authority surfaces: 20
```

## Source-backed finding

`src/main-adventure.js` owns one fixed key, loads it once during startup, writes every five admitted simulation seconds after a fingerprint change, and writes again unconditionally on `pagehide`.

`src/game-preload-bridge.js` lets a same-origin menu document fully start and restore the game before freezing simulation and presentation. That frozen document remains a potential writer because the host-level `pagehide` handler remains installed.

`src/adventure/persistence-render-domains.js` validates integrity, but the envelope has no durable commit revision, writer/document identity, base revision, timestamp, lease or compare-and-swap token. The save-domain `revision` is in-memory diagnostic state, not a storage-head revision.

```txt
tab A and preload/tab B restore R1
A progresses and writes R2
B remains stale on R1
B pagehide writes a valid older snapshot
next startup validates and accepts B
```

No `storage` observer, BroadcastChannel, Web Lock, writer heartbeat, head readback, conflict result or stale-writer rejection was found. This is a source-backed concurrency path, not a reproduced browser incident.

## Required authority

```txt
cozy-island-save-writer-lease-revision-authority-domain
```

```txt
SaveCommitCommand
  -> bind SaveSlotId, DocumentId, WriterSessionId and CommitId
  -> bind candidate base revision and durable fingerprint
  -> classify active player, hidden preload, suspended and retiring writers
  -> require an admitted writer lease
  -> read and verify the current slot head
  -> compare-and-swap one monotonic commit revision
  -> reject stale, duplicate, expired, read-only and superseded writers
  -> preserve predecessor and verify write/readback identity
  -> publish SaveCommitResult or SaveConflictResult
  -> synchronize other documents through slot-head observation
  -> release the lease on pagehide, retirement or expiry
  -> publish FirstDurableSaveFrameAck
```

## Planned authority surfaces

```txt
save-document-identity-kit
save-writer-session-kit
save-slot-head-revision-kit
save-candidate-base-revision-kit
writer-lease-admission-kit
writer-lease-heartbeat-expiry-kit
preload-readonly-save-policy-kit
storage-head-observer-kit
cross-document-head-sync-kit
stale-write-rejection-kit
compare-and-swap-save-commit-kit
predecessor-readback-verification-kit
save-conflict-result-kit
pagehide-save-policy-kit
writer-retirement-kit
save-commit-result-kit
first-durable-save-frame-ack-kit
multi-tab-conflict-fixture-kit
hidden-preload-stale-writer-fixture-kit
source-build-pages-save-parity-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, save schema, storage behavior, simulation, rendering, dependencies, tests, workflows and deployment were not changed.
