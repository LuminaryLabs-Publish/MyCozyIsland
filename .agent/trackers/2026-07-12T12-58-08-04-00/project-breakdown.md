# Project Breakdown: MyCozyIsland Agriculture Cutover Central Reconciliation

Timestamp: `2026-07-12T12-58-08-04-00`
Repository: `LuminaryLabs-Publish/MyCozyIsland`
Branch: `main`

## Summary

MyCozyIsland now installs the official pinned `n:production:agriculture` Domain Service Kit instead of the removed product-specific farming kit. The domain split is sound: Agriculture owns reusable cultivated-land rules; Inventory owns balances; Foraging owns wild coconuts; MyCozyIsland owns tropical content, interaction settlement, save migration and presentation.

The repo-local `2026-07-12T12-50-46-04-00` audit family is newer than the central ledger. This run reconciles that source-backed audit and records the remaining recovery boundary: snapshot reload cannot retract queued Agriculture events or ECS journal rows, partial-history recovery does not prove paired Inventory history and resource deltas, and save-v1 migration leaves legacy `cozy-farming` ledger records untranslated.

## Plan ledger

**Goal:** synchronize the official Agriculture cutover across repo-local and central documentation while preserving one clear implementation target for atomic state, ledger, event, migration and visible-frame recovery.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Identify `MyCozyIsland` as the oldest central entry and detect newer repo-local Agriculture cutover documentation.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Review the Agriculture cutover commit and latest root `.agent` audit family.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Reconcile all source-backed kits and offered services.
- [x] Add a new timestamped tracker, turn-ledger entry and focused audit set.
- [x] Preserve runtime, dependency and deployment behavior.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement effect-complete rollback, partial-history reconciliation and executable failure fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

oldest central ledger at selection:
  MyCozyIsland: 2026-07-12T10-20-02-04-00

newer repo-local audit:
  2026-07-12T12-50-46-04-00

runtime cutover:
  6b642344d2875f76eef1184111793ff0e206109f
  feat: cut over to agriculture domain kit

selected: LuminaryLabs-Publish/MyCozyIsland
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/MyCozyIsland` was modified in the Publish organization.

## Complete interaction loop

```txt
startup
  -> import commit-pinned NexusEngine and NexusEngine-Kits
  -> install Core Object and Core Transaction Ledger
  -> install World, Input and Inventory
  -> install official n:production:agriculture with tropical configuration
  -> install Foraging, Player, Scenario, Interaction, Camera, Save and Render Snapshot
  -> initialize deterministic plots, wild forage nodes and world descriptors
  -> restore save-v2 or migrate save-v1 when present
  -> build WebGPU/WebGL2 presentation
  -> bind lifecycle, resize and input adapters
  -> start RAF

frame
  -> admit normalized input
  -> advance Agriculture growth
  -> advance wild-resource respawn
  -> advance scenario and player
  -> resolve nearest plot or forage target
  -> settle contextual interaction
  -> assemble camera, HUD and renderer-neutral snapshot
  -> render
  -> evaluate durable save fingerprint

Agriculture action
  -> derive product operation identity
  -> check product parent ledger
  -> check Agriculture child-recovery shortcut
  -> prepare plot-revision-bound Agriculture plan
  -> validate Inventory definitions and balances
  -> snapshot Inventory, Agriculture and ledger owners
  -> apply Inventory resource changes
  -> commit Agriculture plan and queue event
  -> record product parent result
  -> on exception reload selected snapshots

save restore
  -> verify checksum
  -> migrate save-v1 farming state when required
  -> load world, ledger, scenario, inventory, agriculture, foraging and player
  -> reset Interaction
  -> publish save status
```

## Domains in use

```txt
browser shell, loader, controls, HUD and diagnostics
WebGPU/WebGL2 rendering, quality, resize, post-processing and backend parity
NexusEngine runtime, ECS phases, resources, events and service installation
core object registration
core transaction ledger and repeat detection
seeded island world, terrain and surface queries
farm and wild-resource layout
normalized input queue and frame admission
scenario time, day and objective
Inventory balances, seed selection and batch settlement
production catalog family
official Agriculture land, soil, cultivation, watering, growth, harvest and perennials
tropical Agriculture configuration and product transaction coordination
wild coconut Foraging and respawn
player movement, grounding, view and stamina
nearest-target contextual interaction
camera intro and first-person projection
save capture, checksum, migration, restore, rollback and reset
renderer-neutral world, Agriculture, HUD and debug snapshots
terrain, shoreline, ocean floor, vegetation, rocks, props and campfire
ocean, foam, cloud, fog, weather, wind, illumination and sky
render graph, depth, blend and output
validation, CI, Pages deployment and internal audit tracking
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

- `core-object-kit`: object registration, lookup and listing.
- `core-transaction-ledger-kit`: ledger creation, repeat detection, record, apply-once, snapshot and reset.
- `cozy-world-domain-kit`: seeded world, surface queries, plot/forage layouts, render base, snapshot and reset.
- `cozy-input-domain-kit`: command queue, held state, frame admission, clear, snapshot and reset.
- `cozy-inventory-domain-kit`: item definitions, balances, seed selection, single/batch settlement, snapshot and reset.
- `agriculture-domain-kit`: land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot and reset.
- `cozy-foraging-domain-kit`: wild coconut nodes, collection, respawn, snapshot and reset.
- `cozy-player-domain-kit`: movement, grounding, view, stamina, snapshot and reset.
- `cozy-scenario-domain-kit`: clock, day, phase, objective, snapshot and reset.
- `cozy-interaction-domain-kit`: targeting, Agriculture settlement, wild-forage action, prompt, result, snapshot and reset.
- `cozy-camera-domain-kit`: aerial intro, first-person view, terrain clearance and descriptor.
- `cozy-save-domain-kit`: capture, checksum, migration, restore, rollback, reset and diagnostics.
- `cozy-render-snapshot-domain-kit`: static world, Agriculture descriptors, frame, HUD and debug snapshots.

The complete 50-kit world/render/host inventory and `cozy-ocean-composition-kit` service map remain authoritative in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Main findings

1. The official Agriculture boundary is correct and the old `cozy-farming-domain-kit` is no longer installed.
2. Snapshot rollback restores selected state but does not retract Agriculture events or ECS journal rows emitted before failure.
3. Snapshot loading itself changes observation sequence through revisions and snapshot-loaded events, so rollback is not an exact predecessor restoration.
4. Existing Agriculture child history can recreate the product parent without proving the paired Inventory child record or resource delta.
5. Save-v1 migration converts farming state but leaves legacy `cozy-farming` transaction history untranslated and unreconciled.
6. Save and render snapshots expose participant revisions but no committed Agriculture transaction/recovery revision or first-visible-frame acknowledgement.
7. Existing tests cover happy paths and synthetic migration, not failure injection, event rollback, partial-history parity or authentic legacy-ledger migration.

## Required authority

```txt
cozy-island-agriculture-cutover-recovery-authority-domain
```

Required responsibilities:

```txt
command and transaction identity
participant and predecessor revision capture
immutable Agriculture plan and resource-delta preparation
Inventory and Agriculture candidate state
parent/child ledger reservation
atomic aggregate commit
post-commit event publication
event and journal suppression for failed candidates
exact rollback or declared recovery generation
child-record and resource-delta reconciliation
legacy farming-ledger migration or quarantine
save and render transaction revision
first visible Agriculture frame acknowledgement
failure and migration fixtures
```

## Validation boundary

Documentation only. Runtime source, gameplay, persistence, rendering, dependencies, package scripts and deployment behavior were not changed. No local checkout or executable smoke result is claimed.