# START HERE: MyCozyIsland save-writer lease and revision admission

**Last updated:** `2026-07-15T15-01-22-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `e6947c349442520aaddf7e8a0788cfd4fb56f97e`  
**Status:** `save-writer-lease-revision-admission-authority-audited`

**Retained statuses:** `game-audio-event-projection-authority-audited`, `host-clock-fixed-step-simulation-authority-audited`, `device-control-surface-action-coverage-authority-audited`, `embed-context-route-admission-authority-audited`, `preload-suspension-lease-resume-frame-authority-audited`, `menu-postcard-atlas-frame-admission-audited`, `menu-failure-game-bootstrap-fallback-authority-audited`, `dual-surface-gpu-handoff-retirement-authority-audited`, `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

Every same-origin MyCozyIsland document can write the same localStorage slot. Save checksums protect integrity, but no durable revision or writer lease prevents a stale tab or hidden preload from overwriting newer accepted progress.

## Plan ledger

**Goal:** make the durable save slot monotonic across tabs, preloads, autosave and page lifecycle.

- [x] Compare all 11 Publish repositories and ten eligible ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Select only MyCozyIsland by the oldest synchronized timestamp.
- [x] Trace load, autosave, pagehide, preload and save-envelope ownership.
- [x] Preserve all 70 implemented surfaces.
- [x] Add the `2026-07-15T15-01-22-04-00` audit family.
- [ ] Implement writer lease, revisioned compare-and-swap commit and browser fixtures.

## Interaction loop

```txt
menu
  -> create a same-origin hidden game iframe
  -> game restores the shared localStorage save once
  -> startup reaches playable
  -> preload bridge freezes simulation and presentation
  -> Play resumes that document

adventure
  -> input, simulation, Agriculture and Foraging settle
  -> render/HUD snapshots update
  -> every five admitted simulation seconds, changed state is captured
  -> the host writes the snapshot to one shared localStorage key

document exit
  -> pagehide captures and writes unconditionally
  -> no writer lease, slot-head comparison or stale-write rejection occurs
```

## Active domains

```txt
static menu and game routes
same-origin iframe preload and cross-window entry messaging
browser document identity, localStorage, storage events and page lifecycle
Core Startup, Object and Transaction Ledger
seeded world, input, Inventory, Agriculture and Foraging
player, scenario, interaction and camera
portable save capture, checksum, migration, restore and rollback
save-slot head revision, writer lease, conflict arbitration and durable commit
renderer-neutral snapshots and WebGPU/WebGL2 presentation
terrain, vegetation, atmosphere, ocean, foam and post processing
HUD, diagnostics, adaptive quality, validation, build and Pages
```

## Census

```txt
engine-installed kits: 14
cataloged kits: 50
composition kits: 1
browser/product adapters: 5
total implemented surfaces: 70
planned save-writer surfaces: 20
```

## Active authority

```txt
cozy-island-save-writer-lease-revision-authority-domain
```

```txt
SaveCommitCommand
  -> bind SaveSlotId, DocumentId, WriterSessionId and CommitId
  -> bind candidate base revision and durable fingerprint
  -> classify active player, hidden preload, suspended and retiring writers
  -> require an admitted writer lease before mutation
  -> read and verify the current slot head
  -> compare-and-swap one new monotonic commit revision
  -> reject stale, duplicate, expired, read-only and superseded writers
  -> preserve the predecessor and verify write/readback identity
  -> publish SaveCommitResult or SaveConflictResult
  -> synchronize other documents through storage/head-change observation
  -> release the lease on pagehide, retirement or expiry
  -> publish FirstDurableSaveFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-15T15-01-22-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-15T15-01-22-04-00-save-writer-lease-revision-dsk-map.md`
4. `save-concurrency-audit/2026-07-15T15-01-22-04-00-cross-document-writer-lease-contract.md`
5. `gameplay-audit/2026-07-15T15-01-22-04-00-stale-document-save-regression-loop.md`
6. `interaction-audit/2026-07-15T15-01-22-04-00-save-commit-command-result-map.md`
7. `render-audit/2026-07-15T15-01-22-04-00-save-status-conflict-visible-frame-gap.md`
8. `deploy-audit/2026-07-15T15-01-22-04-00-multi-document-save-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Do not claim

Do not claim multi-tab safety, preload write safety, stale-write rejection, durable head monotonicity, conflict recovery, visible save truth, artifact parity or production readiness until executable fixtures pass on `main`.
