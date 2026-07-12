# START HERE: MyCozyIsland Agriculture Cutover Recovery Authority

Last updated: `2026-07-12T12-58-08-04-00`

## Summary

MyCozyIsland now uses the official pinned `n:production:agriculture` DSK. The product-specific farming kit is no longer installed. Tropical crop content, Inventory settlement, wild coconut Foraging, save migration and rendering remain in product-owned adapters.

The highest-priority gap is recovery truth. Product settlement snapshots Inventory, Agriculture and ledger owners and reloads them on exception, but it cannot retract Agriculture events or ECS journal rows already emitted. The partial-history recovery shortcut also accepts an Agriculture child record without proving the paired Inventory child record and resource delta. Save-v1 migration converts farming state but does not reconcile old `cozy-farming` transaction history with the new ledger family.

The `2026-07-12T12-58-08-04-00` reconciliation confirms the full Publish inventory, records the 13 installed kits and 64 source-backed kit surfaces, and synchronizes this repo-local authority with `LuminaryLabs-Dev/LuminaryLabs`.

## Plan ledger

**Goal:** make the Agriculture cutover recoverable and provenance-complete across Inventory, Agriculture, parent/child ledger records, event publication, save migration and the first visible frame.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` because a new Agriculture cutover landed after the prior audit.
- [x] Identify the complete interaction loop, domains, kits and offered services.
- [x] Inspect the pinned Agriculture provider and pinned core transaction ledger.
- [x] Audit settlement, rollback, recovery, migration, render projection and tests.
- [x] Add timestamped architecture and system audits.
- [x] Add a timestamped central-reconciliation tracker and audit set.
- [x] Refresh the root `.agent` routing entrypoint.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime recovery and executable failure fixtures remain future work.

## Active route

```txt
index.html
  -> pinned NexusEngine and NexusEngine-Kits import map
  -> src/main-adventure.js
  -> src/adventure/composition-runtime.js
  -> 13 engine-installed core/adventure kits
  -> official n:production:agriculture
  -> procedural WebGPU/WebGL2 presentation
```

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-12T12-58-08-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-12T12-58-08-04-00-agriculture-cutover-central-reconciliation-dsk-map.md`
5. `agriculture-cutover-audit/2026-07-12T12-58-08-04-00-central-ledger-reconciliation.md`
6. `render-audit/2026-07-12T12-58-08-04-00-agriculture-recovery-frame-provenance-reconciliation.md`
7. `architecture-audit/2026-07-12T12-50-46-04-00-agriculture-cutover-recovery-dsk-map.md`
8. `agriculture-cutover-audit/2026-07-12T12-50-46-04-00-state-ledger-event-migration-contract.md`
9. `gameplay-audit/2026-07-12T12-50-46-04-00-agriculture-settlement-recovery-loop.md`
10. `interaction-audit/2026-07-12T12-50-46-04-00-agriculture-recovery-admission-map.md`
11. `next-steps.md`
12. `validation.md`

## Current settlement path

```txt
interaction
  -> parent duplicate check
  -> Agriculture child recovery shortcut
  -> Agriculture plan with plot predecessor revision
  -> Inventory batch settlement
  -> Agriculture commit and event emission
  -> product parent record
  -> snapshot reload on exception
```

## Main findings

```txt
domain ownership
  -> official Agriculture boundary is correct
  -> wild coconuts remain Foraging
  -> cultivated coconuts are perennial Agriculture crops

rollback
  -> state snapshots can reload
  -> queued Agriculture events are not retracted
  -> ECS journal candidate rows are not retracted
  -> Inventory/ledger load changes observation sequence

recovery
  -> Agriculture child record can recreate parent
  -> paired Inventory child and resource delta are not proven

migration
  -> save-v1 farming state becomes Agriculture schema
  -> legacy cozy-farming ledger history remains untranslated

render
  -> participant revisions exist
  -> no transaction/recovery revision or first-frame receipt

proof
  -> happy path and synthetic migration exist
  -> failure, event rollback and authentic legacy-ledger fixtures do not
```

## Kit census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive catalog entries: 2
```

## Required authority

```txt
cozy-island-agriculture-cutover-recovery-authority-domain
```

It must own product transaction identity, participant and ledger parity, candidate event buffering, exact rollback or declared recovery generation, partial-history reconciliation, legacy-ledger migration, save/render transaction revision and first-visible-frame acknowledgement.

## Next safe ledge

Keep reusable crop rules in the official Agriculture DSK. Implement the missing coordination as a MyCozyIsland product authority. Do not move Inventory balances, wild resources, browser storage or renderer implementation into Agriculture.