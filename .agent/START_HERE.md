# START HERE: MyCozyIsland shell startup fault isolation

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Aligned:** `2026-07-14T05-02-03-04-00`  
**Status:** `menu-failure-game-bootstrap-fallback-authority-audited`  
**Reviewed pre-audit repository head:** `b7edce0ac6c7fc7005be56f649141e31690e4eee`

**Retained statuses:** `dual-surface-gpu-handoff-retirement-authority-audited`, `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

MyCozyIsland’s primary game route has its own Core Startup, WebGPU/WebGL2 fallback, world composition and first-frame admission. The parent nevertheless starts that route only after the optional WebGPU palm menu has imported its providers, initialized its renderer and built its scene and pipeline. A menu-only failure can therefore prevent the game from attempting startup.

## Plan ledger

**Goal:** retain the high-fidelity menu while making game preload and degraded entry independent from menu presentation success.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only MyCozyIsland as the oldest eligible entry.
- [x] Inspect shell, menu, game, preload bridge, Core Startup and tests.
- [x] Preserve 65 kit surfaces and five adapters.
- [x] Add the `2026-07-14T05-02-03-04-00` audit family.
- [ ] Implement independent game-preload launch, typed menu failure and degraded entry.
- [ ] Run browser fault injection, build and Pages fixtures.

## Read first

```txt
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/trackers/2026-07-14T05-02-03-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-14T05-02-03-04-00-shell-startup-fault-isolation-dsk-map.md
.agent/render-audit/2026-07-14T05-02-03-04-00-menu-failure-game-surface-fallback-gap.md
.agent/gameplay-audit/2026-07-14T05-02-03-04-00-menu-failure-blocked-game-entry-loop.md
.agent/interaction-audit/2026-07-14T05-02-03-04-00-shell-bootstrap-command-result-map.md
.agent/startup-fallback-audit/2026-07-14T05-02-03-04-00-menu-provider-game-bootstrap-isolation-contract.md
.agent/deploy-audit/2026-07-14T05-02-03-04-00-startup-failure-fixture-gate.md
.agent/central-sync-audit/2026-07-14T05-02-03-04-00-oldest-selection-startup-fallback-reconciliation.md
```

## Active authority

```txt
cozy-island-shell-startup-fault-isolation-authority-domain
```

It owns shell generation, independent menu and game attempts, menu-failure classification, degraded fallback projection, retry correlation and one terminal `ShellBootstrapResult`. Core Startup remains the factual authority for game readiness and first-frame admission.

## Critical finding

```txt
iframe has no src
  -> menu module must import
  -> menu renderer must initialize
  -> menu scene and pipeline must prepare
  -> only then startPreload is scheduled
  -> only then game Core Startup can begin
```

## Do not claim

Do not claim graceful menu degradation, independent game startup, retry isolation, direct fallback entry, first fallback-game-frame proof or deployed parity until executable fixtures pass on `main`.
