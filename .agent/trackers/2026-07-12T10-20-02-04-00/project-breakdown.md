# Project Breakdown: MyCozyIsland Multi-Domain Transaction Commit Authority

Timestamp: `2026-07-12T10-20-02-04-00`
Repository: `LuminaryLabs-Publish/MyCozyIsland`
Branch: `main`

## Summary

`MyCozyIsland` is a NexusEngine-composed procedural island adventure with an aerial introduction, first-person exploration, farm plots, deterministic crop growth, coconut foraging, inventory, save/restore, WebGPU/WebGL2 rendering, diagnostics, tests and Pages deployment.

The current audit isolates multi-domain transaction truth. The installed `core-transaction-ledger-kit` provides repeat detection, but `applyOnce()` executes product mutations before it records the parent operation. Farming and foraging nest inventory operations inside parent farm/forage operations, so a failure between participant mutation and parent recording can leave inventory, plot/node state and ledger history on different commit boundaries.

## Plan ledger

**Goal:** define one atomic transaction authority for farm and forage commands so every participant mutation, ledger record, render snapshot and durable save observes one committed outcome or one complete rollback.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm every eligible repository has a central ledger entry and root `.agent` state.
- [x] Select only `MyCozyIsland`, the oldest central entry and a repository with a newer post-audit transaction-ledger smoke commit.
- [x] Trace startup, input, interaction, farming, foraging, inventory, transaction ledger, save, render snapshot and test paths.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Reconcile all kits and offered services.
- [x] Add a timestamped architecture, render, gameplay, interaction, transaction and deployment audit family.
- [x] Refresh the required root `.agent` files and machine registry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime transaction implementation and executable failure fixtures remain future work.

## Selection evidence

```txt
accessible Publish repositories: 10
eligible repositories after Cavalry exclusion: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

oldest central ledger timestamp:
  MyCozyIsland: 2026-07-12T08:00:16-04:00

post-audit source/test change:
  c6c52830b9c75588184cfe8a40fe623a5ed7104f
  test: verify installed NexusEngine transaction ledger
```

## Complete interaction loop

```txt
startup
  -> create WebGPU/WebGL2 renderer and choose quality
  -> install core object, core transaction ledger and 11 adventure domains
  -> initialize deterministic island, farm plots, forage nodes and landmarks
  -> restore a validated save when available
  -> create terrain, gameplay, ocean, cloud, fog, foam and post renderers
  -> bind input, lifecycle and resize callbacks
  -> start the animation loop

frame
  -> normalize browser input into one input frame
  -> advance scenario, crops, forage respawn and player movement
  -> resolve nearest plot or forage target
  -> execute an interaction on E
  -> derive camera, HUD and render snapshots
  -> update procedural render services
  -> render the visible frame
  -> periodically evaluate auto-save

farm command
  -> derive interaction:<input-frame-index>:<plot-id>
  -> begin parent cozy-farming applyOnce
  -> optionally run nested cozy-inventory remove/add operations
  -> mutate plot state
  -> return product result
  -> record parent ledger operation after the callback returns

forage command
  -> derive interaction operation ID
  -> begin parent cozy-foraging applyOnce
  -> add coconuts and optional sprout through nested inventory operations
  -> deplete the forage node and start respawn
  -> return product result
  -> record parent ledger operation after the callback returns

save/restore
  -> capture world, ledger, scenario, inventory, farming, foraging and player
  -> write through the browser storage host
  -> restore owners sequentially into the live graph
```

## Domains in use

```txt
browser shell, loading, HUD, hotbar, controls and debug projection
WebGPU/WebGL2 renderer, quality, adaptive performance, resize and post processing
NexusEngine runtime, ECS phases, service installation and ticking
core object registration
core transaction ledger and idempotency
seeded island world, terrain and surface queries
farm and forage layout
normalized input queue and frame admission
scenario clock and objective
inventory and seed selection
farm plot lifecycle and deterministic yields
coconut collection and respawn
player movement, grounding, view and stamina
nearest-target contextual interaction
aerial intro and first-person camera
save capture, checksum, restore and reset
renderer-neutral static/frame/HUD snapshots
terrain, vegetation, rocks, props and campfire
ocean, foam, clouds, fog, weather, wind and illumination
render-layer graph, depth, blend and output
diagnostics, tests, CI and Pages deployment
atomic multi-participant transaction commit and rollback: missing
```

## Kit and service inventory

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional render-composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive legacy kits: 2
ordered Core World providers retained in source: 9
```

### Engine-installed kits

- `core-object-kit`: stable object registration, lookup and listing.
- `core-transaction-ledger-kit`: repeat detection, operation-result records, snapshots and reset.
- `cozy-world-domain-kit`: seeded world model, terrain/surface queries, farm/forage layouts, render base, snapshot and reset.
- `cozy-input-domain-kit`: normalized command queue, held state, frame admission, clear, snapshot and reset.
- `cozy-scenario-domain-kit`: clock, objective, snapshot and reset.
- `cozy-inventory-domain-kit`: items, seed selection, nested inventory transactions, snapshot and reset.
- `cozy-farming-domain-kit`: plots, tilling, planting, watering, growth, harvesting, snapshot and reset.
- `cozy-foraging-domain-kit`: coconut nodes, collection, respawn, snapshot and reset.
- `cozy-player-domain-kit`: movement, terrain grounding, view, stamina, snapshot and reset.
- `cozy-interaction-domain-kit`: target selection, context action, prompt, result, snapshot and reset.
- `cozy-camera-domain-kit`: aerial intro, first-person descriptor and terrain clearance.
- `cozy-save-domain-kit`: capture, checksum validation, restore, reset and diagnostics.
- `cozy-render-snapshot-domain-kit`: static world, frame snapshot, HUD and debug descriptors.

### World/render/host kits

The existing 50-kit catalog covers debug host projection; WebGL2 fallback; WebGPU atmosphere, foam, ocean, performance, post, fog, material and cloud services; terrain, biome, shoreline, ocean floor, vegetation, rock, prop, weather, clock, wind, illumination and material descriptors; camera/scenario legacy services; quality, LOD and render snapshots.

Additional active kit:

- `cozy-ocean-composition-kit`: logical render graph, dependency ordering, depth/blend contracts, transparent-depth validation and terrain handoff validation.

## Main source finding

NexusEngine `coreTransactionLedger.applyOnce()` currently performs:

```txt
check existing record
  -> execute operation callback
  -> record result
```

It does not stage participant state, mark a pending parent operation, rollback mutations when the callback throws, or issue one atomic commit receipt.

Product operations cross multiple owners:

```txt
plant
  -> parent cozy-farming operation
  -> child cozy-inventory seed removal
  -> plot mutation
  -> parent record

harvest
  -> parent cozy-farming operation
  -> child inventory reward operations
  -> plot reset
  -> parent record

forage
  -> parent cozy-foraging operation
  -> child inventory reward operations
  -> node depletion
  -> parent record
```

A failure or interruption after a child operation but before the parent record can expose a split state. Inventory may contain the committed debit/reward while the plot or node and parent ledger still represent the predecessor. The render snapshot and auto-save path have no transaction revision with which to reject that intermediate graph.

## Existing proof boundary

`tests/core-transaction-ledger-smoke.mjs` proves one isolated operation executes once, a duplicate returns the cached result and the ledger snapshot restores. It does not execute the product farm/forage participants, inject a failure between nested operations, validate rollback, inspect save capture during the split, or acknowledge the first visible frame after commit.

`tests/adventure-domains-smoke.mjs` proves the happy path for till, plant, water, harvest, forage and save/restore. Neither new smoke is currently included in the package `npm test` script.

## Required parent domain

```txt
cozy-island-multi-domain-transaction-commit-authority-domain
```

## Required transaction

```txt
AdventureActionCommand
  -> assign session, generation and operation identity
  -> resolve canonical target and participant set
  -> capture participant predecessor revisions
  -> validate command and resource preconditions
  -> build an immutable mutation plan
  -> stage inventory and farm/forage candidates
  -> validate candidate invariants
  -> atomically commit participant state and ledger record
  -> publish AdventureTransactionCommitResult
  -> derive render/save snapshots from the committed revision
  -> acknowledge the first visible committed frame

failure
  -> discard candidates or restore every predecessor
  -> record typed failure without completing the action identity
  -> preserve retry policy explicitly
  -> publish rollback receipts and unresolved ownership
```

## Validation boundary

```txt
runtime source changed: no
transaction behavior changed: no
gameplay changed: no
rendering changed: no
persistence changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm test: not run
product transaction failure fixture: unavailable
participant rollback fixture: unavailable
save-during-split fixture: unavailable
first committed-frame fixture: unavailable
```

This is a documentation and authority-design pass. It does not claim atomic product transactions are implemented.