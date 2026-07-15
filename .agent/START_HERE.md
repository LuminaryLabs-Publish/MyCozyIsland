# START HERE: MyCozyIsland device-control action coverage

**Last updated:** `2026-07-15T01-04-57-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `eac42511d9c462fb2e68604288810687d12f9bbf`  
**Status:** `device-control-surface-action-coverage-authority-audited`

**Retained statuses:** `embed-context-route-admission-authority-audited`, `preload-suspension-lease-resume-frame-authority-audited`, `menu-postcard-atlas-frame-admission-audited`, `menu-failure-game-bootstrap-fallback-authority-audited`, `dual-surface-gpu-handoff-retirement-authority-audited`, `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

The active game accepts keyboard commands for movement, sprint, interaction, seed control and intro skipping. Touch pointers produce camera-look deltas only. On narrow screens the written controls are hidden, the hotbar remains pointer-inert, and no touch gameplay controls replace them.

## Plan ledger

**Goal:** make every admitted device class capable of completing the same normalized walk, farm, forage and save loop.

- [x] Compare all 11 Publish repositories and ten eligible ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only MyCozyIsland through the oldest synchronized timestamp rule.
- [x] Inspect game markup, responsive CSS, browser listeners and normalized input consumption.
- [x] Preserve all 65 source-backed kit surfaces, one composition kit and five adapters.
- [x] Add the `2026-07-15T01-04-57-04-00` audit family.
- [ ] Implement semantic touch controls and executable device-parity fixtures.

## Interaction loop

```txt
menu -> game entry -> normalized browser input
  -> player, camera and interaction domains
  -> walk, farm, forage and save
```

Touch currently diverges:

```txt
touch drag -> camera look only
no touch move/sprint/interact/seed/skip producer
intro completes with time -> first-person player remains immobile
```

## Domains

```txt
device and viewport capability
control-surface identity and responsive layout
semantic action controls
gesture arbitration and pointer capture
normalized input queue and frame admission
player, camera and interaction
Inventory, Agriculture and Foraging
HUD and first matching frame evidence
WebGPU/WebGL2 presentation
save, validation, Pages and central tracking
```

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
planned device-control surfaces: 21
```

## Active authority

```txt
cozy-island-device-control-surface-action-coverage-authority-domain
```

It must admit a complete action map for the active device, route all controls through `cozyInput`, bind gestures to one control generation, and publish `FirstDeviceControlSurfaceFrameAck` plus `FirstDeviceActionEffectFrameAck`.

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-15T01-04-57-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-15T01-04-57-04-00-device-control-surface-action-coverage-dsk-map.md`
4. `device-control-audit/2026-07-15T01-04-57-04-00-touch-action-layout-gesture-contract.md`
5. `render-audit/2026-07-15T01-04-57-04-00-touch-controls-visible-frame-gap.md`
6. `gameplay-audit/2026-07-15T01-04-57-04-00-touch-player-immobility-loop.md`
7. `interaction-audit/2026-07-15T01-04-57-04-00-device-control-command-result-map.md`
8. `deploy-audit/2026-07-15T01-04-57-04-00-device-control-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Do not claim

Do not claim mobile or touch playability, complete action coverage, semantic touch controls, first-action frame convergence, artifact parity or production readiness until executable fixtures pass on `main`.