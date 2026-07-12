# Current Audit: MyCozyIsland Multi-Domain Transaction Commit Authority

Last updated: `2026-07-12T10-20-02-04-00`

## Summary

The active browser route runs a NexusEngine island-adventure loop: aerial arrival, first-person movement, seed selection, farm interaction, crop growth, coconut foraging, portable save capture, procedural rendering, HUD projection, diagnostics and reset.

The current boundary is atomic product action commitment. The installed core ledger provides repeat detection and cached results, but it executes the operation callback before recording the parent operation. Farming and foraging call nested inventory ledger operations inside their parent callbacks, so participant state and parent/child ledger history can diverge if a failure occurs before the parent record is written.

## Plan ledger

**Goal:** make farm and forage actions commit inventory, plot/node state, parent/child ledger records, save revision and visible rendering together, with complete rollback on failure.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `MyCozyIsland` by oldest-ledger and post-audit-change priority.
- [x] Identify the interaction loop, active domains, kits and services.
- [x] Trace core ledger semantics and product nesting.
- [x] Add timestamped architecture, render, gameplay, interaction, transaction and deploy audits.
- [x] Refresh root `.agent` files and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime fixes and executable failure fixtures remain future work.

## Selection evidence

```txt
Publish repositories: 10
eligible after Cavalry exclusion: 9
new or ledger-missing: 0
root .agent missing: 0
oldest central timestamp: MyCozyIsland at 2026-07-12T08:00:16-04:00
new post-audit commit: c6c52830... transaction-ledger smoke
```

## Complete interaction loop

```txt
startup
  -> create renderer and quality policy
  -> install core object, core ledger and 11 adventure domains
  -> create deterministic world, 12 plots and forage nodes
  -> validate and restore browser save when present
  -> create procedural world and atmosphere render services
  -> bind input, lifecycle and resize callbacks
  -> start animation loop

frame
  -> admit queued input
  -> advance scenario, crops, forage respawn and player
  -> resolve nearest target and context action
  -> derive camera, HUD and render snapshot
  -> update procedural render services
  -> render WebGPU/WebGL2 frame
  -> periodically evaluate save fingerprint

farm action
  -> parent cozy-farming operation
  -> optional child inventory debit/reward operation(s)
  -> plot mutation
  -> parent ledger record after callback return

forage action
  -> parent cozy-foraging operation
  -> child coconut and optional sprout reward operations
  -> node depletion/respawn mutation
  -> parent ledger record after callback return

save/restore
  -> capture world, ledger, scenario, inventory, farming, foraging and player
  -> write through browser host
  -> restore live owners sequentially
```

## Source-backed transaction findings

### Core ledger is idempotent, not atomic

`applyOnce()` checks for an existing record, executes `operation()`, then calls `record()`. An exception after any callback mutation leaves that mutation live while the parent operation remains unrecorded.

### Plant crosses two owners and ledgers

Planting opens a `cozy-farming` parent operation, removes a seed through a `cozy-inventory` child operation, then mutates the plot. The seed debit can exist without the planted plot or parent record.

### Harvest crosses multiple child rewards

Harvesting adds crop rewards, may add a coconut sprout, then resets the plot. Rewards can exist while the crop remains ready and the parent record is absent.

### Forage reward precedes node depletion

Foraging adds coconuts and an optional sprout before setting node availability to zero. A failure can leave the reward committed while the node remains harvestable.

### Save and render can observe the split

Neither the save projection nor render snapshot carries one committed adventure-transaction revision. They can read participant owners between nested mutations and parent commitment.

### Restore has no transaction-family invariant

Ledger and product owners restore independently. No rule detects a parent record missing while child records or participant mutations are present.

### Proof gap

`tests/core-transaction-ledger-smoke.mjs` verifies one standalone apply-once operation, duplicate reuse and snapshot restore. `tests/adventure-domains-smoke.mjs` verifies the happy path. Neither test injects a nested failure, and neither is invoked by `npm test`.

## Domains in use

```txt
browser shell, loader, HUD, hotbar, controls and diagnostics
WebGPU/WebGL2 renderer, quality, adaptive performance, resize and post pipeline
NexusEngine runtime, ECS phases, service installation and ticking
core object registration
core transaction ledger, repeat detection and portable records
seeded island world, terrain and surface queries
farm and forage layouts
normalized input queue and frame admission
scenario clock and objective
inventory and seed selection
farm plot lifecycle and deterministic yield
coconut collection and respawn
player movement, terrain grounding, view and stamina
nearest-target contextual interaction
aerial intro and first-person camera
save capture, checksum validation, restore and reset
renderer-neutral static/frame/HUD snapshots
terrain, biome, shoreline, ocean floor, vegetation, rocks, props and campfire
ocean, foam, cloud, fog, weather, wind, illumination and sky
render graph, depth, blend, output and backend parity
tests, CI, Pages deployment and internal audit tracking
atomic product transaction planning, commit, rollback and reconciliation: missing
transaction-to-save and transaction-to-frame correlation: missing
```

## Engine-installed kits and services

- `core-object-kit`: stable object registration, lookup and listing.
- `core-transaction-ledger-kit`: repeat detection, cached results, operation records, snapshots and reset.
- `cozy-world-domain-kit`: seeded model, surface queries, farm/forage layout, render base, snapshot and reset.
- `cozy-input-domain-kit`: command queue, held state, frame admission, clear, snapshot and reset.
- `cozy-scenario-domain-kit`: clock, objective, snapshot and reset.
- `cozy-inventory-domain-kit`: item balances, seed selection, child transactions, snapshot and reset.
- `cozy-farming-domain-kit`: plots, till, plant, water, growth, harvest, snapshot and reset.
- `cozy-foraging-domain-kit`: coconut nodes, collection, respawn, snapshot and reset.
- `cozy-player-domain-kit`: movement, grounding, view, stamina, snapshot and reset.
- `cozy-interaction-domain-kit`: targeting, context action, prompt, result, snapshot and reset.
- `cozy-camera-domain-kit`: aerial intro, first-person camera, terrain clearance and descriptor.
- `cozy-save-domain-kit`: capture, checksum validation, restore, reset and diagnostics.
- `cozy-render-snapshot-domain-kit`: static world, frame snapshot, HUD and debug descriptors.

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

Additional active source-backed kit:

- `cozy-ocean-composition-kit`: logical render graph, dependency ordering, transparent-depth validation, terrain handoff and per-layer depth/blend contracts.

## Kit census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional render-composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive legacy kits: 2
ordered Core World providers retained in source: 9
```

## Required parent domain

```txt
cozy-island-multi-domain-transaction-commit-authority-domain
```

## Candidate kits

```txt
adventure-transaction-id-kit
adventure-transaction-generation-kit
adventure-action-command-kit
adventure-action-admission-kit
transaction-participant-set-kit
transaction-predecessor-revision-kit
transaction-precondition-result-kit
transaction-mutation-plan-kit
inventory-mutation-candidate-kit
farm-mutation-candidate-kit
forage-mutation-candidate-kit
transaction-candidate-invariant-kit
transaction-commit-barrier-kit
transaction-ledger-record-plan-kit
atomic-participant-commit-kit
transaction-rollback-plan-kit
transaction-rollback-result-kit
adventure-transaction-commit-result-kit
transaction-retry-policy-kit
transaction-observation-kit
transaction-journal-kit
transaction-render-revision-kit
transaction-save-revision-kit
first-transaction-frame-ack-kit
nested-operation-failure-fixture-kit
participant-rollback-fixture-kit
save-during-transaction-fixture-kit
transaction-visible-frame-fixture-kit
```

## Required transaction

```txt
accepted action command
  -> resolve identity, generation, target and participants
  -> capture predecessor revisions
  -> validate preconditions
  -> build immutable mutation plan
  -> stage participant candidates
  -> validate cross-participant invariants
  -> atomically commit participant state and ledger records
  -> publish commit result and revision
  -> admit save and render projections
  -> acknowledge first visible frame

failure
  -> discard candidates or restore all predecessors
  -> publish typed rollback result
  -> prevent save/render admission from failed revision
  -> reconcile indeterminate transaction before retry
```

## Validation boundary

Documentation changed only. No runtime, transaction, gameplay, persistence, rendering, dependency or deployment behavior was modified.