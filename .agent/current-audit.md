# Current Audit: MyCozyIsland Adventure Persistence Commit and Restore Authority

Last updated: `2026-07-12T08:00:16-04:00`

## Summary

The active browser route now runs a complete NexusEngine island-adventure loop: aerial arrival, first-person movement, seed selection, farm interaction, crop growth, coconut foraging, portable save capture, localStorage auto-save, procedural rendering, HUD projection, diagnostics, and reset.

The save boundary is not yet authoritative. It uses per-frame revision counters as change detection, commits `captured` before storage succeeds, restores the live graph in place, and persists transaction history without persisting the input-generation identity used to form interaction operation IDs.

## Plan ledger

**Goal:** make the new farming-adventure cutover persist only meaningful durable changes, commit storage truth only after the host write succeeds, restore atomically, preserve operation identity across reloads, and prove the first restored visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Prioritize only `MyCozyIsland` because 27 newer commits replaced the active route with a NexusEngine farming adventure after its previous audit.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Reconcile all engine-installed, world-generation, rendering, host, and retained legacy kits and their services.
- [x] Trace input, farming, foraging, transaction IDs, auto-save, localStorage, restore, reset, HUD projection, tests, and deployment.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and machine registry.
- [x] Push `LuminaryLabs-Publish/MyCozyIsland` directly to `main`.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs` on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime fixes and executable persistence fixtures remain future work.

## Selection evidence

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

recent undocumented source change:
MyCozyIsland moved index.html to main-adventure.js and added 13 engine-installed adventure kits,
a farming/foraging loop, save domain, render-snapshot domain, host auto-save, and a new smoke file.
```

## Complete interaction loop

```txt
startup
  -> create WebGPU renderer and choose quality
  -> install 13 NexusEngine/core adventure kits
  -> initialize deterministic world, 12 farm plots and coconut nodes
  -> load and checksum-validate localStorage save when present
  -> create world, gameplay, ocean, cloud, fog, foam and post renderers
  -> bind wheel, pointer, keyboard, blur, visibility, resize and pagehide
  -> start renderer animation loop

frame
  -> normalize callback delta to 0..0.05 seconds
  -> engine tick admits queued input
  -> advance scenario clock
  -> advance crop growth and coconut respawn
  -> advance player movement and stamina
  -> resolve contextual farm/forage interaction
  -> derive camera, HUD and render snapshot
  -> update renderer state and HUD
  -> sample adaptive performance
  -> render post pipeline
  -> every five accumulated seconds compare save fingerprint
  -> capture and write localStorage when fingerprint differs

farm action
  -> E creates interaction:<input-frame-index>:<target-id>
  -> transaction ledger applies action once
  -> till, plant, water or harvest
  -> inventory and plot state mutate

forage action
  -> E creates interaction operation ID
  -> transaction ledger applies once
  -> inventory receives coconuts and optional sprout
  -> node enters respawn

restore
  -> validate schema and checksum
  -> mutate world
  -> mutate transaction ledger
  -> mutate scenario
  -> mutate inventory
  -> mutate farming
  -> mutate foraging
  -> mutate player
  -> reset interaction
  -> publish restored status
```

## Source-backed persistence findings

### Idle auto-save churn

`cozySave.fingerprint()` hashes inventory, farming, foraging, and player revision numbers. `cozyPlayerMovementSystem` increments player revision on every tick, including idle ticks with no position, stamina, mode, yaw, or pitch change. The host checks this fingerprint every five seconds, so an idle runtime still writes localStorage continuously.

### Storage status can lie

`capture()` sets save status to `captured` before `storeSave()` calls `localStorage.setItem`. A storage quota, privacy, serialization, or adapter failure returns an unsuccessful result to the host but does not move the save domain out of `captured`. The next HUD snapshot can therefore render `Saved` for a write that failed.

### Restore is not atomic

`restore()` mutates seven live owners in sequence. Its catch block records an error but does not restore predecessor snapshots. A failure after the first mutation leaves a mixed old/new graph.

### Operation identity is not reload-safe

The save includes the core transaction ledger but excludes `cozyInput`. Interaction IDs use `input.frame.index`; a replacement runtime starts that index at zero. Restored ledger entries and reused input indices can collide after reload, producing a cached predecessor result instead of a new action.

### Reset is incomplete

`resetAll()` resets the transaction ledger and durable gameplay domains but not `cozyInput`. Queued input, held keys, input sequence, frame index, and clear state are outside the reset transaction.

### Proof gap

A new `tests/adventure-domains-smoke.mjs` proves a happy-path capture/reset/restore round trip, but `npm test` does not invoke it. There are no idle-write, adapter-failure, partial-restore, operation-ID collision, or first-restored-frame fixtures.

## Domains in use

```txt
browser document, loader, error, HUD, hotbar and debug projection
WebGPU/WebGL2 renderer creation, quality, adaptive performance and resize
NexusEngine runtime, ECS phases and service installation
core object registry and repeat-safe transaction ledger
seeded island model, surface query, farm layout, forage layout and landmarks
normalized browser input queue and frame admission
scenario clock and objective
inventory and seed selection
farm plot lifecycle and deterministic harvest yield
coconut collection and respawn
player movement, terrain grounding, view and stamina
nearest-target contextual interaction
aerial intro and first-person camera
portable save capture, checksum, localStorage adapter and restore
renderer-neutral static/frame snapshots and HUD descriptors
terrain, biome, shoreline, ocean floor, vegetation, rocks, props and campfire
cloud, fog, weather, wind, illumination and sky
ocean, foam, render layers, post-processing and output
diagnostics, tests and Pages deployment
semantic dirty tracking, atomic storage commit and atomic restore: missing
operation-ID continuity and restored-frame proof: missing
```

## Engine-installed kits and services

- `core-object-kit`: stable object registration, lookup and listing.
- `core-transaction-ledger-kit`: repeat-safe apply-once operations, snapshots, restore and reset.
- `cozy-world-domain-kit`: seeded world model, surface queries, farm/forage layouts, render base, snapshot and reset.
- `cozy-input-domain-kit`: normalized command queue, held state, frame admission, clear, snapshot and reset.
- `cozy-scenario-domain-kit`: clock, objective, snapshot and reset.
- `cozy-inventory-domain-kit`: items, seed selection, repeat-safe transactions, snapshot and reset.
- `cozy-farming-domain-kit`: plots, till, plant, water, growth, harvest, snapshot and reset.
- `cozy-foraging-domain-kit`: coconut nodes, collection, respawn, snapshot and reset.
- `cozy-player-domain-kit`: movement, terrain grounding, view, stamina, snapshot and reset.
- `cozy-interaction-domain-kit`: nearest targeting, contextual action, prompt, result, snapshot and reset.
- `cozy-camera-domain-kit`: aerial intro, first-person view, terrain clearance and camera descriptor.
- `cozy-save-domain-kit`: capture, checksum validation, restore, reset and diagnostics.
- `cozy-render-snapshot-domain-kit`: static world, frame snapshot, HUD descriptor and debug descriptor.

## World, presentation and host kit inventory

The repository retains 50 cataloged world/render/host kits. The active adventure route consumes all except the retired `camera-rail-sequence-kit` and `cozy-island-scenario-kit`; their source remains for compatibility.

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

Additional active source-backed kit:

- `cozy-ocean-composition-kit`: logical render-layer graph, dependency order, depth/blend contracts, transparent-depth validation and terrain handoff validation.

## Kit census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional render-composition kit: 1
source-backed kit surfaces in repository: 64
active route kit surfaces: 62
retained inactive legacy kits: 2
ordered Core World providers retained in source: 9
```

## Required parent domain

```txt
cozy-island-adventure-persistence-authority-domain
```

## Candidate kits

```txt
save-session-id-kit
save-operation-id-kit
durable-state-schema-kit
durable-state-projection-kit
durable-state-fingerprint-kit
semantic-dirty-set-kit
save-command-kit
save-admission-kit
save-capture-plan-kit
storage-adapter-capability-kit
storage-write-result-kit
save-commit-result-kit
save-status-projection-kit
restore-command-kit
restore-candidate-graph-kit
restore-validation-kit
restore-migration-kit
restore-commit-kit
restore-rollback-kit
input-generation-continuity-kit
operation-id-continuity-kit
transaction-ledger-rebase-kit
stale-save-result-rejection-kit
first-restored-frame-ack-kit
persistence-observation-kit
persistence-journal-kit
idle-autosave-fixture-kit
storage-failure-fixture-kit
partial-restore-fixture-kit
operation-id-reload-fixture-kit
persistence-roundtrip-browser-smoke-kit
```

## Required transaction

```txt
committed durable gameplay mutation
  -> update semantic dirty set
  -> derive canonical durable projection
  -> compute versioned durable fingerprint
  -> admit save command once
  -> capture immutable save candidate
  -> validate storage capability
  -> write through adapter
  -> receive durable storage receipt
  -> commit save status and revision only after receipt
  -> project Saved state and frame acknowledgement

restore command
  -> validate schema, checksum, version and migration path
  -> construct candidate engine graph or full rollback snapshot
  -> restore input generation and transaction continuity together
  -> validate candidate invariants
  -> atomically transfer authority
  -> retire predecessor graph
  -> acknowledge first restored visible frame
```

## Validation boundary

Documentation changed only. No runtime, test script, dependency, renderer, gameplay, persistence, or deployment behavior was modified in this audit.
