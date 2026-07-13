# START HERE: MyCozyIsland menu/game preload handoff

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-13T12-38-45-04-00`  
**Status:** `menu-game-preload-handoff-scheduler-authority-audited`  
**Retained statuses:** `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

MyCozyIsland now routes through a living Canvas2D menu while the complete game starts in a hidden same-origin iframe. Core Startup supplies factual readiness and the bridge freezes simulation before enabling Play. The remaining authority gap is cross-document scheduler and handoff ownership: menu RAF, hidden game rendering, freeze/resume, messages, fallback reveal, focus/history transfer, and first visible game-frame proof are independent.

## Plan ledger

**Goal:** admit one preload generation and one player-entry transaction, transfer scheduler and input ownership once, and prove the first matching visible game frame.

- [x] Compare all ten Publish repositories with the central ledger and root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland because ten menu/game-shell commits were newer than central tracking.
- [x] Reconcile the interaction loop, domains, 65 DSK/kit surfaces, five adapters, and offered services.
- [x] Add the `2026-07-13T12-38-45-04-00` tracker and audit family.
- [ ] Implement generation-bound scheduler, quiescence, message, entry, retirement, and visible-frame contracts.
- [ ] Run source/browser/build/Pages fixtures.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-13T12-38-45-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-13T12-38-45-04-00-menu-game-preload-handoff-scheduler-dsk-map.md
.agent/preload-handoff-audit/2026-07-13T12-38-45-04-00-generation-quiescence-entry-contract.md
.agent/render-audit/2026-07-13T12-38-45-04-00-hidden-game-dual-loop-visible-frame-gap.md
```

## Active authority

```txt
cozy-island-menu-game-preload-handoff-scheduler-authority-domain
```

## Critical finding

```txt
menu Canvas2D RAF continues
hidden game animation loop continues
bridge replaces only engine.tick and engine.step
Play resumes simulation and sends entered immediately
parent reveals on entered or after a 900 ms fallback
no entry generation or first post-resume visible-frame acknowledgement
```

The menu visibility handler can also request an extra RAF callback on return to visibility without proving the recursive predecessor chain is retired.

## Do not claim

Do not claim single-scheduler ownership, hidden-render quiescence, exact freeze/resume, stale-message isolation, atomic focus/history transfer, first visible game-frame completion, BFCache safety, or deployed handoff parity until executable fixtures pass on `main`.