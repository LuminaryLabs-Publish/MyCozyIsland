# START HERE: MyCozyIsland dual-surface GPU handoff and retirement

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-13T23-58-48-04-00`  
**Status:** `dual-surface-gpu-handoff-retirement-authority-audited`  
**Reviewed runtime head:** `9416ecd21622e2a5b940ee27aac6224b09979dba`

**Retained statuses:** `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

The menu is now a WebGPU-first Three.js presentation with TSL physical materials, bloom and a compute wind field. The full game preloads behind it in a second WebGPU/WebGL2 surface, sleeps after Core Startup readiness, resumes on Play and overlaps the menu during the fade. No authority currently joins the two presentation leases, first resumed game frame, overlap budget, complete menu resource retirement and public-capability revocation.

## Plan ledger

**Goal:** keep the high-fidelity menu and instant entry while ensuring one current game surface becomes visible and the predecessor menu surface reaches a provable terminal state.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude TheCavalryOfRome.
- [x] Select only MyCozyIsland as the sole runtime-ahead repository.
- [x] Reconcile seven runtime commits through `9416ecd`.
- [x] Inspect menu, game, preload bridge, tests and package wiring.
- [x] Preserve 65 kit surfaces and five adapters.
- [x] Add the `2026-07-13T23-58-48-04-00` audit family.
- [ ] Implement presentation leases, first-frame settlement and complete retirement receipts.
- [ ] Run WebGPU/WebGL2 browser, build and Pages fixtures.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-13T23-58-48-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-13T23-58-48-04-00-dual-surface-gpu-handoff-dsk-map.md
.agent/render-audit/2026-07-13T23-58-48-04-00-menu-game-gpu-overlap-visible-frame-gap.md
.agent/gameplay-audit/2026-07-13T23-58-48-04-00-hidden-preload-resume-entry-loop.md
.agent/interaction-audit/2026-07-13T23-58-48-04-00-presentation-handoff-command-result-map.md
.agent/gpu-handoff-audit/2026-07-13T23-58-48-04-00-compute-render-resource-retirement-contract.md
.agent/deploy-audit/2026-07-13T23-58-48-04-00-dual-surface-gpu-fixture-gate.md
.agent/central-sync-audit/2026-07-13T23-58-48-04-00-runtime-ahead-gpu-handoff-reconciliation.md
```

## Active authority

```txt
cozy-island-dual-surface-gpu-handoff-retirement-authority-domain
```

It owns menu/game presentation generations and leases, backend/device correlation, resource manifests, first resumed game-frame acknowledgement, bounded overlap, menu compute/frame stop, complete retirement results and public-capability revocation.

Core Startup still owns factual readiness. The cross-window protocol owns message admission. The game bridge owns local freeze/resume and player preparation. Each renderer owns local resources and frame receipts. The parent shell commits reveal, history and focus only after consuming a terminal handoff result.

## Critical finding

```txt
Play
  -> game simulation and renderer resume
  -> entered message posts immediately
  -> menu/game GPU work overlaps for up to 780 ms
  -> parent disposes pipeline and renderer
  -> no first resumed game frame or complete menu retirement result
```

## Do not claim

Do not claim bounded GPU overlap, complete resource cleanup, retired-listener safety, capability revocation, frame-correlated entry or deployed WebGPU/WebGL2 parity until executable fixtures pass on `main`.