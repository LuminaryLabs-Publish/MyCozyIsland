# START HERE: MyCozyIsland Three.js menu presentation lifecycle

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-13T14-39-40-04-00`  
**Status:** `threejs-menu-presentation-lifecycle-authority-audited`  
**Retained statuses:** `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

MyCozyIsland now opens on a minimal Three.js menu with one semantic sky, one hero palm and one Play gate while the full game preloads in a hidden iframe. The new menu adds a static remote Three.js dependency, a second GPU renderer and scene resources that persist in the parent shell after the game is revealed.

The current audit isolates menu presentation lifecycle authority. Three.js import and `WebGLRenderer`/scene construction must succeed before `startPreload()` is scheduled. Entry later calls only `renderer.dispose()` after 820 ms, with no terminal scheduler, listener, geometry, material, context or resource-retirement receipt.

## Plan ledger

**Goal:** make menu provider admission, first frame, active scheduling and complete retirement explicit without changing the three-element visual design or gameplay.

- [x] Compare all ten Publish repositories with the central ledger and root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland because four source/test/docs commits were newer than central tracking.
- [x] Reconcile the new Three.js menu and fifteen-level semantic taxonomy.
- [x] Preserve 65 DSK/kit surfaces and five browser/product adapters.
- [x] Add the `2026-07-13T14-39-40-04-00` tracker and audit family.
- [ ] Implement provider-independent preload, first-frame and retirement contracts.
- [ ] Run source/browser/build/Pages fixtures.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-13T14-39-40-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-13T14-39-40-04-00-threejs-menu-presentation-lifecycle-dsk-map.md
.agent/menu-renderer-audit/2026-07-13T14-39-40-04-00-provider-first-frame-resource-retirement-contract.md
.agent/startup-audit/2026-07-13T14-39-40-04-00-menu-provider-preload-independence.md
.agent/render-audit/2026-07-13T14-39-40-04-00-menu-game-dual-gpu-surface-retirement-gap.md
.agent/interaction-audit/2026-07-13T14-39-40-04-00-menu-boot-entry-retirement-result-map.md
.agent/deploy-audit/2026-07-13T14-39-40-04-00-threejs-menu-lifecycle-fixture-gate.md
.agent/central-sync-audit/2026-07-13T14-39-40-04-00-threejs-menu-runtime-reconciliation.md
```

## Active authority

```txt
cozy-island-threejs-menu-presentation-lifecycle-authority-domain
```

It owns menu provider/capability admission, renderer and resource generations, first menu frame, one RAF scheduler and complete menu retirement. The existing preload-handoff authority consumes its terminal results and remains responsible for iframe readiness, player entry, history/focus transfer and first visible game-frame completion.

## Critical finding

```txt
menu Three.js import or renderer failure
  -> module may not reach startPreload()
  -> hidden game preparation does not begin
  -> Play can remain disabled at Preparing 1%

successful entry
  -> menu and game renderers overlap through the fade
  -> sceneRunning becomes false
  -> renderer.dispose() runs
  -> no per-resource, listener, scheduler or context retirement result exists
```

## Do not claim

Do not claim provider-independent preload, first-menu-frame readiness, bounded dual-renderer usage, complete menu resource retirement, sole game-surface ownership, visible entry completion, lifecycle convergence or deployed parity until executable fixtures pass on `main`.