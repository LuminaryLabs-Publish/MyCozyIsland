# Current audit: MyCozyIsland resource settlement and recovery authority

**Timestamp:** `2026-07-13T08-04-17-04-00`  
**Status:** `resource-settlement-recovery-authority-audited`  
**Branch:** `main`

## Summary

MyCozyIsland uses Core Transaction Ledger for repeat-safe operations and keeps Inventory, Agriculture and Foraging as bounded domains. The product settlement path nevertheless commits participant state sequentially: Agriculture settlement applies Inventory changes, commits Agriculture and emits its event, then records aggregate completion; Foraging invokes nested Inventory additions without checking their receipts before depleting the node. Recovery and visible projection do not prove that every participant adopted one settlement generation.

## Plan ledger

**Goal:** define one evidence-complete transaction for resource exchange, recovery, save eligibility and visible projection.

- [x] Compare Publish inventory, central ledger and root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland by the oldest eligible documented-selection rule.
- [x] Read product Agriculture settlement, Inventory, Foraging, Interaction, Save and Render Snapshot domains.
- [x] Read the pinned Core Transaction Ledger and official Agriculture implementations.
- [x] Preserve the complete 64-kit/service census.
- [x] Add architecture, render, gameplay, interaction, settlement, deployment and central-sync audits.
- [ ] Implement detached participant preparation, event buffering, atomic adoption, recovery evidence and fixtures.

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
browser event
  -> cozy-input frame
  -> player and nearest-target resolution
  -> contextual interaction derives stable operation ID

Agriculture target
  -> Agriculture plan with expected plot revision and resourceChanges
  -> Inventory applyChanges commits
  -> Agriculture commitPlan commits and emits event
  -> aggregate cozy-agriculture-actions record commits
  -> interaction/result/frame/save paths observe successor state

Wild Foraging target
  -> outer cozy-foraging applyOnce begins
  -> Inventory coconut addition commits
  -> optional sprout addition commits
  -> node depletion commits
  -> outer Foraging operation record commits
  -> interaction/result/frame/save paths observe successor state

Recovery
  -> aggregate Agriculture record absent
  -> inner Agriculture record found
  -> result promoted without proving matching Inventory effect
```

## Source-backed findings

- Core Transaction Ledger `applyOnce()` executes its callback before writing the operation record. It supplies idempotency but no participant prepare/commit boundary.
- Agriculture product settlement snapshots participants, applies Inventory first, commits Agriculture second and records aggregate completion last.
- Official Agriculture `commitPlan()` writes plot state and emits its domain event inside the inner ledger callback.
- Catch-based snapshot loading cannot retract an already emitted event or prove that observers never saw intermediate participant state.
- Agriculture recovery promotes an inner Agriculture result without checking the matching Inventory operation, balance fingerprint or participant revisions.
- Foraging performs one or two nested Inventory additions, ignores the returned receipts, then depletes the node and reports success.
- Save capture/restore reads or writes participant snapshots sequentially and carries no settlement generation.
- Render Snapshot concatenates participant revisions but carries no SettlementId, aggregate ledger sequence, participant receipts or first-visible-settlement acknowledgement.
- Existing tests prove successful Agriculture, Foraging, save and migration flows only.

## Domains in use

```txt
browser shell, input, animation, HUD, storage, lifecycle and diagnostics
NexusEngine composition, scheduler, clock and service graph
Core Object
Core Transaction Ledger
world, terrain, plots and forage descriptors
Inventory balances and seed selection
Agriculture land, soil, cultivation, water, growth, harvest, perennials and events
wild Foraging collection and respawn
contextual targeting and product settlement
player, scenario and camera
portable save capture, migration, restore, rollback and reset
renderer-neutral static/frame/HUD/debug snapshots
WebGPU/WebGL2 scene, atmosphere, ocean, foam, materials, post and quality
resource-settlement identity, preparation, commit, recovery, receipts, save eligibility and visible-frame proof
validation, build, Pages and central tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed total: 64
active route surfaces: 62
retained inactive catalog entries: 2
ordered Core World providers: 9
```

The complete per-kit service inventory is preserved in `.agent/trackers/2026-07-13T08-04-17-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Missing authority

```txt
SettlementId and settlement generation
expected participant and ledger revisions
detached Inventory/Agriculture/Foraging candidates
participant prepare results
buffered domain events
atomic participant and aggregate-record adoption
participant commit and rollback receipts
partial-attempt classification
recovery evidence and divergence quarantine
settlement-consistent save generation
ResourceSettlementResult
settlement observation journal
first visible settlement-frame acknowledgement
fault-injection and source/build/Pages parity fixtures
```

## Required parent domain

`cozy-island-resource-settlement-recovery-authority-domain`

## Validation boundary

Documentation only. No runtime, gameplay, Inventory, Agriculture, Foraging, ledger, save, rendering, dependency, package-script or deployment behavior changed. No executable settlement fixture was run.
