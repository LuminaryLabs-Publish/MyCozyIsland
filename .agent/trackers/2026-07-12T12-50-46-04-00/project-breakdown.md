# Project Breakdown: MyCozyIsland Agriculture Cutover Recovery Authority

Timestamp: `2026-07-12T12-50-46-04-00`
Repository: `LuminaryLabs-Publish/MyCozyIsland`
Branch: `main`

## Summary

MyCozyIsland now installs the official `n:production:agriculture` DSK from a pinned NexusEngine-Kits commit and no longer installs `cozy-farming-domain-kit`. Tropical crop content, inventory settlement, wild coconut foraging, save migration and renderer descriptors remain product-owned.

The cutover is structurally correct, but its product settlement and recovery boundary is incomplete. Snapshot rollback restores resources after an exception, yet it cannot retract Agriculture events or ECS journal entries already emitted. Recovery accepts an existing Agriculture child record without proving the paired Inventory child record and resource delta exist. Legacy save migration converts farming state but does not translate or reconcile old `cozy-farming` ledger history into the new `agriculture` and `cozy-agriculture-actions` transaction family.

## Plan ledger

**Goal:** make the Agriculture cutover one recoverable, provenance-complete transaction boundary across Inventory, Agriculture, transaction ledgers, event publication, save migration and the first visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `MyCozyIsland` because a new Agriculture runtime cutover landed after its previous documentation boundary.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Reconcile all source-backed kits and offered services.
- [x] Review the pinned Agriculture provider and pinned NexusEngine transaction ledger.
- [x] Review product settlement, rollback, recovery, save-v2 capture, v1 migration, render snapshots and tests.
- [x] Add timestamped architecture, render, gameplay, interaction, agriculture-cutover and deploy audits.
- [x] Refresh required root `.agent` documents and machine registry.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Runtime recovery, event rollback and migration-ledger reconciliation remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

selection override:
  MyCozyIsland received commit 6b642344d2875f76eef1184111793ff0e206109f
  feat: cut over to agriculture domain kit
  after its prior 2026-07-12T10-20-02-04-00 audit boundary

selected repository: LuminaryLabs-Publish/MyCozyIsland
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/MyCozyIsland` was modified in the Publish organization.

## Complete interaction loop

```txt
startup
  -> import pinned NexusEngine and NexusEngine-Kits Agriculture source
  -> install Core Object and Core Transaction Ledger
  -> install Cozy World, Input and Inventory
  -> install official n:production:agriculture with tropical config
  -> install Wild Foraging, Player, Scenario, Interaction, Camera, Save and Render Snapshot
  -> initialize deterministic plots and forage nodes
  -> optionally restore save-v2 or migrate save-v1
  -> create procedural WebGPU/WebGL2 presentation
  -> start RAF

frame
  -> normalize queued input
  -> advance Agriculture continuous growth and wild-resource respawn
  -> advance player and scenario
  -> resolve nearest Agriculture plot or wild forage node
  -> on E, derive operation identity from target revision, frame index and selected crop
  -> settle Agriculture or Foraging
  -> assemble camera, HUD and renderer-neutral frame snapshot
  -> render and evaluate auto-save

Agriculture action
  -> check product parent ledger
  -> check Agriculture child ledger recovery shortcut
  -> plan against current plot revision
  -> validate Inventory definitions and balances
  -> snapshot Inventory, Agriculture and ledger owners
  -> apply Inventory resource changes
  -> commit Agriculture plan and emit Agriculture event
  -> record product parent result
  -> on exception, reload snapshots

save restore
  -> checksum envelope
  -> migrate save-v1 farming state when required
  -> sequentially load world, ledger, scenario, inventory, agriculture, foraging and player
  -> reset interaction
  -> publish save status
```

## Domains in use

```txt
browser shell, HUD, loader, controls and diagnostics
NexusEngine runtime, ECS resources, events, phases and service registry
core object identity and lookup
core transaction ledger and repeat detection
procedural island world, farm layout and wild-resource layout
normalized browser input
inventory balances and seed selection
production catalog family
official Agriculture land, soil, cultivation, water, growth, harvest and perennial authority
tropical Agriculture content and product settlement
wild coconut Foraging collection and respawn
player movement, terrain grounding, view and stamina
scenario time, day and objective
nearest-target contextual interaction
camera intro and first-person presentation
save capture, checksum, schema migration, restore, rollback and reset
renderer-neutral static, frame, HUD and debug snapshots
terrain, biome, shoreline, vegetation, rocks, props, ocean, foam, atmosphere, weather and lighting
WebGPU/WebGL2 rendering, quality, resize, post-processing and backend parity
tests, CI, static hosting, Pages deployment and internal audit tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional render-composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive catalog entries: 2
```

### Engine-installed kits

- `core-object-kit`: stable object registration, lookup and listing.
- `core-transaction-ledger-kit`: ledger creation, record, apply-once, duplicate readback, snapshot and reset.
- `cozy-world-domain-kit`: seeded world model, surface queries, plot/forage layouts, render base, snapshot and reset.
- `cozy-input-domain-kit`: command queue, held state, normalized frame admission, clear, snapshot and reset.
- `cozy-inventory-domain-kit`: item definitions, balances, seed selection, batch resource settlement, snapshot and reset.
- `agriculture-domain-kit`: land, soil, cultivation, water, continuous/daily growth, harvest, perennials, descriptors, events, snapshot and reset.
- `cozy-foraging-domain-kit`: wild coconut nodes, collection, respawn, snapshot and reset.
- `cozy-player-domain-kit`: movement, grounding, view, stamina, snapshot and reset.
- `cozy-scenario-domain-kit`: clock, day, phase, objective, snapshot and reset.
- `cozy-interaction-domain-kit`: nearest targeting, Agriculture settlement, wild forage action, prompt, result, snapshot and reset.
- `cozy-camera-domain-kit`: aerial intro, first-person view, terrain clearance and camera descriptor.
- `cozy-save-domain-kit`: save-v2 capture, checksum, v1 migration, restore, rollback, reset and diagnostics.
- `cozy-render-snapshot-domain-kit`: static world, Agriculture descriptors, frame snapshot, HUD and debug descriptors.

### Main findings

1. `settleCozyAgricultureInteraction()` snapshots three owners and reloads them on exception, but any Agriculture event already queued and any ECS journal rows already recorded remain outside that rollback.
2. Inventory and Core Transaction Ledger snapshot loading increments internal revision or sequence and emits snapshot-loaded events, so rollback does not reproduce the exact predecessor observation state.
3. The recovery shortcut accepts an existing `agriculture` child record and writes the product parent record without checking the paired `cozy-inventory` child record or verifying that the expected resource changes exist in Inventory.
4. Save-v1 migration converts farming state but carries the legacy transaction ledger unchanged. Old `cozy-farming` records are not translated into or reconciled with the new transaction family.
5. The hidden `cozyFarming` alias points directly at the new Agriculture API. It preserves property reachability, not the old API contract.
6. The smoke test proves happy-path annual crops, perennial coconut regrowth, wild forage separation, save-v2 round trip and a synthetic v1 migration. It does not inject failures, inspect event queues, validate recovery parity or migrate authentic old ledger histories.
7. Render snapshots expose Agriculture revision but no product transaction ID, recovery phase, event-generation receipt or first-visible-frame acknowledgement.

## Required authority

```txt
cozy-island-agriculture-cutover-recovery-authority-domain
```

Required transaction:

```txt
accepted Agriculture action
  -> resolve session, command and transaction identity
  -> freeze plot, inventory and ledger predecessor revisions
  -> build immutable Agriculture plan and resource delta
  -> prepare Inventory and Agriculture candidates
  -> reserve parent and child ledger records
  -> commit state and ledger records under one barrier
  -> publish Agriculture events only after commit
  -> publish typed transaction result and revision
  -> admit save and render projection
  -> acknowledge first visible frame

failure or partial-history recovery
  -> classify rejected, rolled-back or indeterminate
  -> restore exact predecessor state or rebuild a new generation
  -> suppress candidate events and journal rows
  -> validate every child record and resource delta before parent recovery
  -> migrate or quarantine legacy transaction families
  -> publish reconciliation receipt before retry
```

## Validation boundary

Documentation changed only in this run. Runtime source, gameplay, persistence, rendering, package dependencies and deployment behavior were not modified. Source inspection used the GitHub connector. No local checkout or executable smoke result is claimed.