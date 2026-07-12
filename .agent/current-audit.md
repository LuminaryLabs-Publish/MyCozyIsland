# Current Audit: MyCozyIsland Agriculture Cutover Recovery Authority

Last updated: `2026-07-12T12-50-46-04-00`

## Summary

The active route is a NexusEngine island-adventure loop with deterministic world generation, normalized input, first-person movement, official Agriculture services, product Inventory settlement, wild coconut Foraging, save-v2 capture, save-v1 migration, renderer-neutral snapshots and WebGPU/WebGL2 presentation.

Commit `6b642344d2875f76eef1184111793ff0e206109f` replaced the installed product-specific farming DSK with the pinned official `n:production:agriculture` DSK. The cutover improves bounded ownership and adds plan-based plot mutation, stale-plan rejection, batch Inventory settlement and perennial coconut regrowth.

The current gap is complete recovery truth. Snapshot reload restores selected owner state after an exception, but it does not retract queued Agriculture events or ECS journal entries. The recovery shortcut can accept an Agriculture child record without verifying the Inventory child record and resource delta. Save-v1 migration converts farming state but does not translate or reconcile legacy `cozy-farming` ledger history.

## Plan ledger

**Goal:** make Agriculture actions atomic and recoverable across Inventory, Agriculture, parent/child ledgers, event publication, save migration and visible-frame projection.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `MyCozyIsland` by post-audit runtime-change priority.
- [x] Identify the interaction loop, all domains, all kits and offered services.
- [x] Inspect product settlement and official provider implementation.
- [x] Inspect core ledger, ECS event queue, save migration, render snapshot and tests.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh root `.agent` files and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime recovery and executable failure fixtures remain future work.

## Selection evidence

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

selected: MyCozyIsland
reason: new runtime Agriculture cutover after prior 10-20-02 audit
runtime commit: 6b642344d2875f76eef1184111793ff0e206109f
excluded: TheCavalryOfRome
```

## Complete interaction loop

```txt
startup
  -> import pinned NexusEngine and NexusEngine-Kits Agriculture source
  -> install Core Object and Core Transaction Ledger
  -> install World, Input and Inventory
  -> install official Agriculture with tropical config and 12 plots
  -> install Foraging, Player, Scenario, Interaction, Camera, Save and Render Snapshot
  -> initialize deterministic wild-resource nodes
  -> restore save-v2 or migrate save-v1 when present
  -> build procedural WebGPU/WebGL2 presentation
  -> bind lifecycle, resize and input callbacks
  -> start RAF

frame
  -> admit normalized input frame
  -> advance Agriculture continuous growth
  -> advance wild Foraging respawn
  -> advance scenario and player
  -> choose nearest plot or forage node
  -> settle E interaction
  -> assemble camera, HUD and render snapshot
  -> render frame
  -> evaluate durable save fingerprint

Agriculture settlement
  -> derive operation ID from target revision, input frame and crop
  -> check cozy-agriculture-actions parent ledger
  -> check agriculture child ledger recovery shortcut
  -> plan prepare, plant, water or harvest against plot revision
  -> validate Inventory item definitions and balances
  -> capture Inventory, Agriculture and ledger snapshots
  -> apply Inventory resourceChanges
  -> commit Agriculture plan and emit event
  -> record product parent result
  -> on exception reload owner snapshots

save restore
  -> validate checksum
  -> migrate save-v1 farming state when required
  -> sequentially load world, ledger, scenario, inventory, agriculture, foraging and player
  -> reset Interaction
  -> publish save result
```

## Source-backed strengths

- Dependencies and browser imports are pinned to immutable commits.
- No `n:cozy-farming` domain is installed.
- Official Agriculture owns renderer-neutral land, soil, cultivation, water, growth, harvest and perennial semantics.
- Tropical content is supplied through configuration rather than copied provider logic.
- Plan IDs and plot predecessor revisions support stale-plan rejection.
- Inventory batch settlement validates all changes before writing its state.
- Cultivated coconut palms regrow under Agriculture; wild coconut palms remain Foraging resources.
- Save-v2 stores Agriculture schema directly.
- Render snapshots use Agriculture as authoritative crop state.
- `npm test` now runs the adventure Agriculture smoke.

## Source-backed gaps

### Rollback is state-only, not effect-complete

Agriculture commit writes state and queues a domain event before the product parent record is written. If a later step throws, the catch path reloads Inventory, Agriculture and ledger snapshots, but it has no event-queue checkpoint or ECS-journal rollback. Cleanup systems can observe a candidate Agriculture event after participant state was reverted.

### Rollback does not reproduce exact predecessor observation

`cozyInventory.loadSnapshot()` increments Inventory revision. Core Transaction Ledger snapshot loading increments capability sequence and emits `snapshotLoaded`. Agriculture snapshot loading emits `SnapshotLoaded`. The state payload may be restored while observation sequence, events and journal provenance differ from the predecessor.

### Partial-history recovery assumes Inventory parity

When an `agriculture` child record exists and the product parent is absent, the product adapter writes the parent record immediately. It does not require the paired `cozy-inventory` child record, verify the expected resource delta or compare current Inventory balances with the Agriculture result.

### Save migration omits transaction-family migration

Save-v1 migration converts farming state into `nexusengine.agriculture/1`, but carries `transactionLedger` unchanged. Legacy `cozy-farming` records remain under the old ledger identity and are not mapped, quarantined or reconciled with `agriculture` and `cozy-agriculture-actions` records.

### Compatibility alias is name-only

`engine.n.cozyFarming` points directly at `engine.n.agriculture`. It is non-enumerable and read-only, but does not translate the old farming API or result contract.

### Proof is happy-path focused

The smoke proves domain installation, annual crops, perennial coconuts, wild-resource separation, save-v2 round trip and a synthetic v1 migration. It does not inject failures, inspect events/journal after rollback, validate child-record parity, migrate authentic old ledgers or correlate a transaction with the first visible frame.

## Domains in use

```txt
browser shell, loader, HUD, hotbar, controls and diagnostics
WebGPU/WebGL2 renderer, quality, adaptive performance, resize and post-processing
NexusEngine runtime, ECS phases, resources, events and service installation
core object registration
core transaction ledger, repeat detection, snapshot and reset
seeded island world, terrain and surface queries
farm and wild-resource layout
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
save capture, checksum, schema migration, restore, rollback and reset
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
cozy-island-agriculture-cutover-recovery-authority-domain
```

## Candidate kits

```txt
agriculture-action-command-kit
agriculture-transaction-id-kit
agriculture-transaction-generation-kit
agriculture-participant-set-kit
agriculture-predecessor-revision-kit
agriculture-resource-delta-kit
agriculture-candidate-plan-kit
inventory-candidate-settlement-kit
agriculture-candidate-state-kit
transaction-ledger-record-reservation-kit
agriculture-commit-barrier-kit
post-commit-agriculture-event-kit
transaction-event-suppression-kit
transaction-journal-segment-kit
agriculture-recovery-admission-kit
child-record-parity-kit
resource-delta-reconciliation-kit
legacy-farming-ledger-migration-kit
legacy-transaction-quarantine-kit
agriculture-rollback-result-kit
agriculture-reconciliation-result-kit
agriculture-transaction-observation-kit
agriculture-transaction-journal-kit
agriculture-save-revision-kit
agriculture-render-revision-kit
first-agriculture-frame-ack-kit
failure-after-inventory-fixture-kit
failure-after-agriculture-fixture-kit
event-rollback-fixture-kit
legacy-ledger-migration-fixture-kit
```

## Required transaction

```txt
accepted action
  -> resolve session, command, transaction and target identity
  -> freeze participant and ledger predecessors
  -> build immutable Agriculture plan and resource delta
  -> prepare Inventory and Agriculture candidates
  -> reserve parent and child records
  -> validate cross-owner invariants
  -> commit state and records atomically
  -> publish Agriculture events after commit
  -> publish transaction result and revision
  -> admit save and render projections
  -> acknowledge first visible frame

failure or incomplete history
  -> classify rolled-back, reconciled, quarantined or indeterminate
  -> restore exact predecessor or create a declared recovery generation
  -> suppress candidate events and journal rows
  -> prove child records and resource deltas before parent recovery
  -> migrate or quarantine legacy ledger history
  -> publish reconciliation receipt before retry
```

## Validation boundary

Documentation changed only. Runtime, gameplay, save, rendering, dependencies and deployment were not modified in this audit run.