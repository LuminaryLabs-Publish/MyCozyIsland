# Project breakdown: MyCozyIsland resource settlement and recovery authority

**Timestamp:** `2026-07-13T08-04-17-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Scope:** documentation-only architecture audit

## Summary

MyCozyIsland composes deterministic island exploration, Inventory, official Agriculture, wild Foraging, contextual interaction, portable saves, renderer-neutral snapshots, and WebGPU/WebGL2 presentation. The current audit isolates cross-domain resource settlement and recovery: Agriculture, Inventory, Foraging, and Core Transaction Ledger are coordinated through sequential writes and nested idempotency records rather than one atomic participant transaction.

## Plan ledger

**Goal:** define one transaction that either commits Inventory, Agriculture or Foraging, ledger records, events, save eligibility and visible projection together, or leaves every participant unchanged.

- [x] Compare the complete ten-repository Publish inventory against the nine eligible central ledger rows.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm every eligible repository has a central ledger and root `.agent` entry.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` as the oldest synchronized eligible entry.
- [x] Trace Agriculture planning, Inventory settlement, Agriculture commit, Foraging collection, Core Transaction Ledger and save/render projections.
- [x] Identify the complete interaction loop and all active domains.
- [x] Preserve all 64 source-backed kit surfaces and their offered services.
- [x] Define `cozy-island-resource-settlement-recovery-authority-domain`.
- [x] Add timestamped architecture, render, gameplay, interaction, settlement, deployment and central-sync audits.
- [ ] Runtime implementation and executable fault-injection fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 0

MyCozyIsland       2026-07-13T04-21-10-04-00 selected oldest
TheUnmappedHouse   2026-07-13T04-47-00-04-00
AetherVale         2026-07-13T05-00-02-04-00
TheOpenAbove       2026-07-13T05-19-21-04-00
IntoTheMeadow      2026-07-13T05-40-11-04-00
PhantomCommand     2026-07-13T05-59-03-04-00
PrehistoricRush    2026-07-13T06-39-10-04-00
HorrorCorridor     2026-07-13T07-00-29-04-00
ZombieOrchard      2026-07-13T07-41-11-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/MyCozyIsland` is modified in the Publish organization.

## Complete interaction loop

```txt
browser input
  -> cozy-input frame
  -> player and nearest-target resolution
  -> cozy-interaction chooses Agriculture or wild Foraging
  -> operation ID derives from target revision, input frame, and selected crop

Agriculture path
  -> planInteraction creates plot successor and resourceChanges
  -> Inventory applyChanges commits first
  -> Agriculture commitPlan mutates plot and emits domain event
  -> aggregate cozy-agriculture-actions record commits last
  -> interaction state stores returned wrapper
  -> render snapshot combines participant revisions
  -> host renders HUD/world and later may save

Foraging path
  -> outer cozy-foraging applyOnce starts
  -> one or two Inventory add operations commit independently
  -> forage node is depleted
  -> outer forage ledger record commits after the callback
  -> interaction and render snapshots project the result

Recovery path
  -> aggregate Agriculture record missing
  -> code checks only the inner Agriculture ledger
  -> recovered Agriculture result is promoted to aggregate completion
  -> no Inventory ledger/balance, participant revision, save generation, or visible-frame proof is required
```

## Domains in use

```txt
browser shell, input adapters, animation loop, HUD, storage, lifecycle and diagnostics
NexusEngine composition, scheduler, clock and service graph
Core Object registration
Core Transaction Ledger idempotency and portable operation records
seeded world, terrain, farm plots and forage-node descriptors
Inventory balances, seed selection, per-operation changes and snapshots
Agriculture planning, land, soil, cultivation, water, growth, harvest, perennials, events and snapshots
wild Foraging collection, respawn and snapshots
contextual targeting, Agriculture settlement and Foraging settlement
player, scenario, camera and renderer-neutral frame projection
portable save capture, checksum, migration, restore, rollback and reset
WebGPU/WebGL2 scene, ocean, foam, atmosphere, materials, post-processing and quality adaptation
resource-settlement identity, participant preparation, atomic commit, event buffering, recovery evidence and visible-frame acknowledgement
tests, source/build/Pages proof and central tracking
```

## Source-backed findings

### Agriculture settlement is sequential, not atomic

`settleCozyAgricultureInteraction()` captures Inventory, Agriculture and ledger snapshots, commits Inventory first, commits Agriculture second, and records the aggregate result last. Participant state and Agriculture events are published before aggregate completion. Catch-based snapshot restoration cannot retract already emitted events or prove that observers never saw the intermediate state.

### Agriculture recovery validates only one participant

When the aggregate `cozy-agriculture-actions` record is absent but the inner `agriculture` record exists, recovery promotes that result directly into the aggregate ledger. It does not verify the matching Inventory operation, current balances, plot state, participant revisions, save generation or visible frame.

### Foraging settlement ignores Inventory receipts

`cozyForaging.harvest()` runs inside an outer `cozy-foraging` `applyOnce`, invokes one or two independent Inventory `add()` operations, ignores their returned results, then depletes the node and reports success. There is no shared prepare/commit boundary, rollback snapshot, participant receipt or explicit partial-attempt recovery result.

### Core Transaction Ledger provides idempotency, not multi-participant commit

`applyOnce()` checks for an existing record, executes the callback, and records the result afterward. It does not stage multiple domain candidates, buffer events, roll back participant writes or publish an aggregate commit result.

### Save and frame projections do not prove settlement coherence

Save capture and restore read or write participant snapshots sequentially. The render-frame revision concatenates participant revisions but carries no settlement ID, ledger sequence, participant receipt or first-visible-settlement acknowledgement.

### Existing tests cover happy paths only

`tests/adventure-domains-smoke.mjs` proves prepare, plant, water, harvest, perennial regrowth, wild collection, save restore and migration. It does not inject participant failure, replay a partial ledger, test event rollback, verify stale/duplicate aggregate recovery or prove source/build/Pages equivalence.

## Implemented kits and offered services

### Engine-installed core and adventure kits: 13

| Kit | Domain | Offered services |
|---|---|---|
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot layout, forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture settlement, wild forage action, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor |

### Cataloged world, render and host kits: 50

- `debug-overlay-host-kit`: draw, toggle, show, hide
- `webgl2-fallback-renderer-kit`: fallback capability policy, CPU volume source, feature-disable policy
- `webgpu-compute-atmosphere-renderer-kit`: cloud volume generation, fog volume generation, CPU fallback
- `webgpu-foam-renderer-kit`: shoreline foam geometry, animation, render-layer contract
- `webgpu-ocean-renderer-kit`: ocean geometry, wave deformation, optics, water-layer contract
- `webgpu-performance-budget-kit`: frame sampling, moving average, FPS state, degrade callback, recover callback
- `webgpu-post-processing-renderer-kit`: scene pass, fog pass, foam pass, depth mask, resolution scaling, pass-order readback
- `webgpu-rolling-fog-renderer-kit`: fog volume, material, step scaling, readback
- `webgpu-stylized-material-renderer-kit`: material descriptors, material construction
- `webgpu-volumetric-cloud-renderer-kit`: cloud volumes, raymarch materials, step scaling, readback
- `camera-rail-sequence-kit`: rail progression, camera-sequence descriptors
- `cozy-island-scenario-kit`: scenario descriptors, sequence descriptors
- `terrain-surface-domain-kit`: height query, normal query, material query, surface query
- `vegetation-placement-domain-kit`: deterministic placement graph
- `aerial-perspective-domain-kit`: horizon descriptor, distance descriptor, atmosphere descriptor
- `campfire-atmosphere-domain-kit`: campfire light, smoke descriptor, heat descriptor
- `cloud-density-field-domain-kit`: density recipe, texture budget
- `cloud-horizon-band-domain-kit`: horizon placement descriptors
- `cloud-lighting-domain-kit`: color, shadow, silver lining
- `cloud-lod-domain-kit`: step policy, volume-count policy
- `cloud-shadow-domain-kit`: shadow projection descriptors
- `cloud-weather-domain-kit`: coverage, weather state
- `fog-advection-domain-kit`: direction, speed
- `fog-field-domain-kit`: density recipe, texture budget
- `fog-volume-placement-domain-kit`: bounds, readability mask
- `ground-contact-domain-kit`: terrain contact, clearance query
- `illumination-domain-kit`: sun state, sky state, ambient state, exposure state
- `ocean-caustics-domain-kit`: caustic projection descriptors
- `ocean-floor-profile-domain-kit`: seafloor shape, depth profile
- `ocean-optics-domain-kit`: color, opacity, transmission, absorption, reflection
- `ocean-wave-domain-kit`: deterministic wave components, sea level
- `prop-archetype-domain-kit`: prop geometry archetypes, prop material archetypes
- `render-archetype-domain-kit`: renderer-neutral object archetypes
- `render-quality-domain-kit`: static tier selection, quality budgets
- `render-snapshot-domain-kit`: renderer-neutral world snapshot
- `rock-archetype-domain-kit`: rock placement archetypes, rock presentation archetypes
- `shoreline-field-domain-kit`: shoreline classification, distance field
- `shoreline-foam-domain-kit`: foam band descriptors
- `stylized-material-descriptor-domain-kit`: color, roughness, rim, outline
- `sun-glitter-domain-kit`: water highlight descriptors
- `terrain-biome-field-domain-kit`: deterministic biome classification
- `terrain-lod-domain-kit`: terrain resolution policy, distance policy
- `underwater-atmosphere-domain-kit`: underwater color, attenuation
- `vegetation-archetype-domain-kit`: tree, palm, fern, bush and grass archetypes
- `vegetation-lod-domain-kit`: density policy, distance policy
- `vegetation-wind-domain-kit`: wind deformation descriptor
- `weather-state-domain-kit`: weather state, transitions
- `wind-field-domain-kit`: deterministic direction, strength
- `deterministic-seed-domain-kit`: seed derivation, deterministic random
- `environment-clock-domain-kit`: elapsed time, environmental phase

### Additional composition kit: 1

- `cozy-ocean-composition-kit`: logical render-layer graph, pass-order validation, transparent-depth validation, terrain-handoff validation, per-layer depth/blend contracts

### Census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed total: 64
active route surfaces: 62
retained inactive catalog entries: 2
ordered Core World providers: 9
```

## Required parent DSK

```txt
cozy-island-resource-settlement-recovery-authority-domain
```

## Required transaction

```txt
ResourceSettlementCommand
  -> allocate SettlementId and settlement generation
  -> bind actor, target, operation ID and expected participant revisions
  -> prepare Inventory, Agriculture or Foraging candidates without publication
  -> validate balances, plot/node state and ledger predecessors
  -> buffer domain events
  -> reject stale, duplicate, divergent or partial evidence with zero mutation
  -> atomically commit all participants and aggregate ledger record
  -> publish typed participant receipts and ResourceSettlementResult
  -> release buffered events only after commit
  -> mark one save-eligible settlement generation
  -> project the committed settlement into one render frame
  -> publish FirstVisibleSettlementFrameAck
```

## Planned coordinating kits

```txt
settlement-id-kit
settlement-generation-kit
resource-settlement-command-kit
expected-participant-revision-kit
inventory-settlement-candidate-kit
agriculture-settlement-candidate-kit
foraging-settlement-candidate-kit
resource-balance-preflight-kit
transaction-ledger-predecessor-kit
participant-prepare-kit
participant-event-buffer-kit
participant-commit-kit
participant-rollback-kit
duplicate-settlement-rejection-kit
stale-participant-rejection-kit
partial-ledger-recovery-kit
recovery-evidence-kit
inventory-settlement-receipt-kit
agriculture-settlement-receipt-kit
foraging-settlement-receipt-kit
aggregate-ledger-record-kit
resource-settlement-result-kit
settlement-observation-kit
settlement-journal-kit
save-consistency-check-kit
visible-settlement-frame-kit
first-visible-settlement-ack-kit
fault-injection-fixture-kit
partial-save-recovery-fixture-kit
source-build-pages-settlement-parity-fixture-kit
```

## Validation boundary

Documentation only. No runtime, gameplay, Inventory, Agriculture, Foraging, ledger, save, rendering, dependency, package-script or deployment behavior changed. No executable settlement fixture was run.
