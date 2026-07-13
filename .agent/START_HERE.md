# START HERE: MyCozyIsland cross-window preload and entry protocol

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-13T19-40-56-04-00`  
**Status:** `cross-window-preload-entry-protocol-authority-audited`  
**Retained statuses:** `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

MyCozyIsland preloads the full game in a same-origin hidden iframe while a Three.js menu remains interactive. The current parent/child messages use restricted target origins and expected source windows, but have no protocol version, attempt identity, iframe generation, message identity, sequence, schema result or first-visible-game-frame correlation.

The active audit defines one cross-window protocol authority spanning preload progress, readiness, failure, player-entry request, entry preparation, frame acknowledgement, shell commit, cancellation and retirement.

## Plan ledger

**Goal:** make every menu/game cross-window command and result attributable to one current shell, iframe, preload and entry generation.

- [x] Compare all ten Publish repositories with central and root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no eligible repository is new, missing or runtime-ahead.
- [x] Select only MyCozyIsland by the oldest eligible central timestamp.
- [x] Inspect the current parent and child message handlers.
- [x] Preserve 65 DSK/kit surfaces and five adapters.
- [x] Add the `2026-07-13T19-40-56-04-00` audit family.
- [ ] Implement typed protocol admission, sequencing and terminal results.
- [ ] Run source, browser, build and Pages fixtures.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-13T19-40-56-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-13T19-40-56-04-00-cross-window-preload-entry-protocol-dsk-map.md
.agent/preload-handoff-audit/2026-07-13T19-40-56-04-00-message-generation-terminal-result-contract.md
.agent/render-audit/2026-07-13T19-40-56-04-00-entry-visible-frame-protocol-gap.md
.agent/gameplay-audit/2026-07-13T19-40-56-04-00-unacknowledged-entry-fallback-loop.md
.agent/interaction-audit/2026-07-13T19-40-56-04-00-cross-window-message-admission-map.md
.agent/deploy-audit/2026-07-13T19-40-56-04-00-cross-window-protocol-fixture-gate.md
.agent/central-sync-audit/2026-07-13T19-40-56-04-00-cross-window-protocol-reconciliation.md
```

## Active authority

```txt
cozy-island-cross-window-preload-entry-protocol-authority-domain
```

It owns protocol versions and envelopes, shell/frame/preload/entry generations, origin and source binding, schema validation, message IDs, sequences, replay suppression, progress/ready/failure admission, entry result correlation, timeout/cancellation/retirement and bounded diagnostics.

Core Startup continues to own factual readiness. The game renderer owns frame submission evidence. The shell owns Play intent, reveal, history and focus after consuming a valid entry result.

## Critical finding

```txt
cozy-game-enter
  -> simulation resumes
  -> player state is prepared
  -> cozy-game-entered posts immediately
  -> no post-resume visible-frame proof

no entered message within 900 ms
  -> parent reveals iframe anyway
  -> no terminal child result
```

## Do not claim

Do not claim stale-message rejection, duplicate suppression, entry atomicity, visible entry completion, BFCache convergence or deployed protocol parity until executable fixtures pass on `main`.