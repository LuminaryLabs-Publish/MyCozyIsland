# START HERE: MyCozyIsland Core Startup and bootstrap admission

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-13T10-41-40-04-00`  
**Status:** `core-startup-integration-central-reconciled`  
**Technical status:** `core-startup-integrated-bootstrap-admission-gap-audited`  
**Retained statuses:** `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

MyCozyIsland now uses NexusEngine Core Startup inside the same engine instance as the complete Agriculture adventure. Preparations, continuation, structured pre-playable failure and first-render gating are implemented. The current audit isolates the earlier browser boundary: the static module graph must resolve and evaluate before the startup host can report a typed failure.

## Plan ledger

**Goal:** admit one browser module generation, bind it to one Core Startup launch and prove the first matching visible frame before playable entry.

- [x] Compare the full Publish inventory with central tracking and root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland because runtime was ten commits ahead of central documentation.
- [x] Reconcile Core Startup, engine reuse, preparations, continuation, first-frame ordering and tests.
- [x] Update the census to 65 source-backed kit surfaces and two startup adapters.
- [x] Add the `2026-07-13T10-41-40-04-00` tracker and audit family.
- [x] Reconcile the central repo ledger and internal change log.
- [ ] Implement static module admission, renderer-derived first-frame evidence and browser/build/Pages fixtures.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-13T10-41-40-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-13T10-41-40-04-00-core-startup-bootstrap-admission-dsk-map.md
.agent/startup-audit/2026-07-13T10-41-40-04-00-static-module-bootstrap-contract.md
.agent/render-audit/2026-07-13T10-41-40-04-00-startup-first-visible-frame-gap.md
```

## Active authority

```txt
cozy-island-static-module-bootstrap-admission-authority-domain
```

## Critical finding

```txt
index.html static module tag
  -> resolve Three.js, NexusEngine, Kits and local modules
  -> parse and evaluate complete module graph
  -> only then create cozy-startup-host
  -> only then install error/unhandled-rejection listeners
  -> only then Core Startup can publish failure
```

Import-map, provider, parse or module-evaluation failure can therefore leave the static loader at `Starting NexusEngine` without a typed terminal result, timeout, retry or fallback.

The first-frame gate proves `postPipeline.render()` was called before `enter()`, but its receipt is caller-authored and does not prove renderer submission or visible canvas presentation.

## Do not claim

Do not claim provider-independent startup failure handling, retry isolation, renderer submission proof, first-visible-frame acknowledgement, browser/build/Pages parity or production startup readiness until the fixture matrix passes on `main`.