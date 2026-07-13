# START HERE: MyCozyIsland resource settlement and recovery authority

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-13T08-04-17-04-00`  
**Status:** `resource-settlement-recovery-authority-audited`  
**Retained statuses:** `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

MyCozyIsland is a NexusEngine-composed procedural island Agriculture and wild-resource adventure with Inventory, portable saves and WebGPU/WebGL2 presentation. The active audit isolates cross-domain resource settlement: Inventory, official Agriculture, wild Foraging and Core Transaction Ledger are valid bounded owners, but product settlement currently coordinates them through sequential writes, nested idempotency records and snapshot restoration rather than one atomic participant transaction.

## Plan ledger

**Goal:** make every planting, harvest and wild-forage resource exchange commit one settlement generation across every affected participant, or leave all participants unchanged.

- [x] Compare the complete Publish inventory against central tracking and root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland as the oldest synchronized eligible repository.
- [x] Trace Agriculture planning, Inventory changes, Foraging collection, ledger recording, save capture and visible projection.
- [x] Preserve the complete 64-kit and service inventory.
- [x] Add the `2026-07-13T08-04-17-04-00` tracker and audit family.
- [x] Refresh required root documents and machine state.
- [ ] Implement atomic prepare/commit, event buffering, recovery evidence and executable fixtures.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-13T08-04-17-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-13T08-04-17-04-00-resource-settlement-recovery-authority-dsk-map.md
.agent/resource-settlement-audit/2026-07-13T08-04-17-04-00-inventory-agriculture-foraging-atomicity-contract.md
```

## Active authority

```txt
cozy-island-resource-settlement-recovery-authority-domain
```

## Critical finding

```txt
Agriculture:
  Inventory commits
  -> Agriculture commits and may emit an event
  -> aggregate product record commits last

Foraging:
  Inventory additions occur inside an outer Foraging applyOnce
  -> their receipts are ignored
  -> node depletion and outer record follow
```

Core Transaction Ledger supplies repeat-safe operation records, not multi-participant atomic commit. Agriculture recovery currently trusts inner Agriculture evidence without proving Inventory parity.

## Do not claim

Do not claim atomic Agriculture/Inventory settlement, atomic wild Foraging settlement, event rollback, evidence-complete recovery, settlement-consistent saves or visible settlement provenance until the required source, browser, build and Pages fixture matrix passes on `main`.
