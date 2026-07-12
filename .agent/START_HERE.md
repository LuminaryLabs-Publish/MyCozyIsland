# START HERE: MyCozyIsland Multi-Domain Transaction Commit Authority

Last updated: `2026-07-12T10-20-02-04-00`

## Summary

`MyCozyIsland` is a NexusEngine-composed farming and foraging adventure with deterministic island generation, normalized input, first-person movement, inventory, farm plots, coconut nodes, save/restore and WebGPU/WebGL2 presentation.

The highest-priority gap is now multi-domain transaction truth. The core ledger records a parent operation only after the product callback returns, while farming and foraging execute nested inventory operations inside that callback. A failure between child mutation and parent recording can leave inventory, plot/node state, ledger history, save projection and visible rendering on different commit boundaries.

## Plan ledger

**Goal:** make every farm and forage action one atomic transaction across inventory, plot/node state, parent/child ledger records, save revision and the first visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `MyCozyIsland`, the oldest central entry with a newer post-audit transaction-ledger smoke commit.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Reconcile all 64 source-backed kit surfaces and offered services.
- [x] Trace interaction identity, parent/child ledger calls, inventory, farming, foraging, save and render snapshots.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and machine registry.
- [x] Push only to `main`.
- [x] Create no branch or pull request.
- [ ] Runtime fixes and executable transaction-failure fixtures remain future work.

## Active route

```txt
index.html
  -> src/main-adventure.js?v=cozy-adventure-cutover-1
  -> src/adventure/composition-runtime.js
  -> 13 engine-installed core/adventure kits
  -> procedural world and WebGPU/WebGL2 render services
```

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `architecture-audit/2026-07-12T10-20-02-04-00-multi-domain-transaction-commit-dsk-map.md`
4. `transaction-audit/2026-07-12T10-20-02-04-00-nested-ledger-atomicity-contract.md`
5. `gameplay-audit/2026-07-12T10-20-02-04-00-farm-forage-nested-transaction-loop.md`
6. `render-audit/2026-07-12T10-20-02-04-00-split-commit-visible-state-gap.md`
7. `next-steps.md`
8. `validation.md`

## Current transaction path

```txt
interaction
  -> operation ID from input frame and target
  -> parent farming or foraging applyOnce
  -> nested inventory applyOnce operations
  -> plot or node mutation
  -> parent callback returns
  -> parent ledger record is written
```

## Main findings

```txt
core applyOnce
  -> checks for an existing record
  -> executes live product mutation
  -> records only after callback success

plant
  -> seed removal can commit before plot planting and parent record

harvest
  -> reward can commit before plot reset and parent record

forage
  -> coconut/sprout rewards can commit before node depletion and parent record

save/render
  -> no shared transaction revision
  -> can observe a mixed participant graph

proof
  -> standalone ledger smoke proves duplicate reuse only
  -> adventure smoke proves happy path only
  -> neither is wired into npm test
```

## Domains and kits

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive legacy kits: 2
Core World providers retained in source: 9
```

The active domains cover browser hosting, rendering, NexusEngine runtime/ECS, core object and ledger services, seeded world generation, input, scenario, inventory, farming, foraging, player, interaction, camera, save, render snapshots, terrain, vegetation, props, ocean, foam, atmosphere, weather, diagnostics, tests and deployment.

## Required authority

```txt
cozy-island-multi-domain-transaction-commit-authority-domain
```

It must own transaction identity and generation, participant resolution, predecessor revisions, immutable mutation plans, candidate states, invariant validation, atomic participant/ledger commit, rollback, retry policy, save/render revision admission, observations, journals, failure fixtures and first-visible-frame acknowledgement.

## Next safe ledge

Implement candidate-based farm/forage action planning before adding more crops, tools, crafting or multiplayer. Keep game-specific rules in inventory/farming/foraging domains, keep portable idempotency in `core-transaction-ledger-kit`, and place atomic multi-owner coordination in the new product authority domain.