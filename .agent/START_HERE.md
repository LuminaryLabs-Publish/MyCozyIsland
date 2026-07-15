# START HERE: MyCozyIsland host-clock fixed-step simulation

**Last updated:** `2026-07-15T05-00-28-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `a8733b506ecbd43190a280942790cdaa0bd1b983`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`

**Retained statuses:** `device-control-surface-action-coverage-authority-audited`, `embed-context-route-admission-authority-audited`, `preload-suspension-lease-resume-frame-authority-audited`, `menu-postcard-atlas-frame-admission-audited`, `menu-failure-game-bootstrap-fallback-authority-audited`, `dual-surface-gpu-handoff-retirement-authority-audited`, `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

The RAF host admits at most one 50 ms simulation step per callback and `createCozyAdventure.tick()` applies the same clamp again. Below 20 FPS, excess wall time is discarded, slowing scenario time, movement, stamina, crop growth, forage respawn and autosave cadence without a typed clock or frame receipt.

## Plan ledger

**Goal:** admit elapsed browser time through a revisioned fixed-step authority with bounded catch-up, explicit dropped-time policy and a matching rendered-frame acknowledgement.

- [x] Compare all 11 Publish repositories and ten eligible ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only MyCozyIsland through the oldest synchronized timestamp rule.
- [x] Inspect RAF timing and all source-backed time consumers.
- [x] Preserve all 65 source-backed kits, one composition kit and five adapters.
- [x] Add the `2026-07-15T05-00-28-04-00` audit family.
- [ ] Implement fixed-step admission and executable browser/build/Pages fixtures.

## Interaction loop

```txt
RAF timestamp
  -> clipped variable delta
  -> one NexusEngine tick
  -> scenario, player, Agriculture and Foraging
  -> render snapshot and post pipeline
  -> autosave accumulator
```

Low callback rates currently discard elapsed time rather than execute bounded catch-up steps.

## Active domains

```txt
host clock and RAF lifecycle
fixed-step admission and overload policy
Core Startup, Object and Transaction Ledger
world, input, Inventory, Agriculture and Foraging
player, scenario, interaction, camera and save
render snapshots, WebGPU/WebGL2 and post processing
menu, preload, HUD, diagnostics, validation and Pages
```

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
planned host-clock authority surfaces: 20
```

## Active authority

```txt
cozy-island-host-clock-fixed-step-simulation-authority-domain
```

It must classify elapsed time, accumulate it, execute bounded deterministic steps, publish residual and discarded-time receipts, bind every time consumer and publish `FirstClockAlignedFrameAck`.

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-15T05-00-28-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-15T05-00-28-04-00-host-clock-fixed-step-simulation-dsk-map.md`
4. `simulation-clock-audit/2026-07-15T05-00-28-04-00-raf-delta-accumulator-contract.md`
5. `render-audit/2026-07-15T05-00-28-04-00-clock-aligned-render-frame-gap.md`
6. `gameplay-audit/2026-07-15T05-00-28-04-00-low-fps-slow-simulation-loop.md`
7. `interaction-audit/2026-07-15T05-00-28-04-00-host-clock-command-result-map.md`
8. `deploy-audit/2026-07-15T05-00-28-04-00-host-clock-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Do not claim

Do not claim fixed-step correctness, wall-time pacing, bounded overload recovery, interpolation, clock-aligned frame convergence, artifact parity or production readiness until executable fixtures pass on `main`.