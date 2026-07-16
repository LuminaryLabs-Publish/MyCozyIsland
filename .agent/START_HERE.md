# START HERE: MyCozyIsland renderer device and context loss recovery

**Last updated:** `2026-07-16T00-59-16-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `6505b5dd0c3ff9b6524e93b1d7bf841a6de4df54`  
**Status:** `renderer-device-context-loss-recovery-authority-audited`

**Retained statuses:** `accessible-hud-progress-interaction-projection-authority-audited`, `save-writer-lease-revision-admission-authority-audited`, `game-audio-event-projection-authority-audited`, `host-clock-fixed-step-simulation-authority-audited`, `device-control-surface-action-coverage-authority-audited`, `embed-context-route-admission-authority-audited`, `preload-suspension-lease-resume-frame-authority-audited`, `menu-postcard-atlas-frame-admission-audited`, `menu-failure-game-bootstrap-fallback-authority-audited`, `dual-surface-gpu-handoff-retirement-authority-audited`, `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

MyCozyIsland has explicit renderer startup, first-frame admission, hidden-preload sleep and menu-to-game handoff, but no product-owned runtime authority for WebGPU device loss or WebGL context loss. A lost renderer generation is not bound to suspension, reconstruction, GPU-resource rehydration, fallback or one accepted recovered frame.

## Plan ledger

**Goal:** make renderer lifetime health explicit so the menu or game either recovers to a revision-bound visible frame or presents a typed actionable fallback.

- [x] Compare the full 11-repository Publish inventory with ten eligible ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Select only MyCozyIsland by the oldest synchronized timestamp.
- [x] Inspect menu and game renderer initialization, animation, preload freeze/resume, startup error handling and page lifecycle.
- [x] Preserve all 70 implemented surfaces.
- [x] Add the `2026-07-16T00-59-16-04-00` renderer-recovery audit family.
- [ ] Implement renderer-loss admission, bounded recovery, fallback and browser fixtures.

## Interaction loop

```txt
menu
  -> initialize WebGPU/WebGL2 renderer
  -> render postcard
  -> start hidden game preload

game preload
  -> initialize second renderer and complete first frame
  -> freeze simulation and presentation
  -> publish ready

entry
  -> resume the same game animation callback
  -> reveal game and retire menu renderer
  -> no fresh renderer-health or frame admission

runtime loss
  -> WebGPU device or WebGL context becomes unavailable
  -> no product loss result
  -> no renderer generation retirement/rebuild
  -> no resource rehydration result
  -> no fallback or first recovered frame acknowledgement
```

## Active domains

```txt
static menu and game routes
same-origin preload, messaging, entry and focus handoff
Core Startup, Object and Transaction Ledger
seeded world, input, Inventory, Agriculture and Foraging
player, scenario, interaction, camera, save and render snapshots
menu and full-game WebGPU/WebGL2 presentation
atmosphere, ocean, foam, cloud, fog and post-processing
renderer capability, generation, loss, recovery and fallback
simulation/input policy during presentation loss
first-recovered-frame convergence
validation, build, Pages and central governance
```

## Census

```txt
engine-installed kits: 14
cataloged world/render/host kits: 50
composition kits: 1
browser/product adapters: 5
total implemented surfaces: 70
planned renderer-recovery surfaces: 20
```

## Active authority

```txt
cozy-island-render-device-context-recovery-authority-domain
```

```txt
RenderRecoveryAdmissionCommand
  -> bind document, route, renderer, backend, device/context and resource generations
  -> observe WebGPU device loss and WebGL context loss/restoration
  -> suspend stale presentation and apply simulation/input policy
  -> create one bounded recovery attempt
  -> reconstruct renderer, post pipeline and registered GPU resources
  -> reject stale generation work
  -> publish RenderRecoveryResult or RenderFallbackResult
  -> present one accepted recovered frame
  -> publish FirstRecoveredFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-16T00-59-16-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-16T00-59-16-04-00-renderer-device-context-loss-recovery-dsk-map.md`
4. `renderer-recovery-audit/2026-07-16T00-59-16-04-00-webgpu-device-webgl-context-loss-contract.md`
5. `gameplay-audit/2026-07-16T00-59-16-04-00-render-loss-noninteractive-loop.md`
6. `interaction-audit/2026-07-16T00-59-16-04-00-render-recovery-command-result-map.md`
7. `render-audit/2026-07-16T00-59-16-04-00-gpu-loss-recovered-frame-gap.md`
8. `deploy-audit/2026-07-16T00-59-16-04-00-renderer-loss-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Do not claim

Do not claim WebGPU device-loss recovery, WebGL context restoration, resource rehydration, hidden-preload recovery, stale-generation safety, fallback correctness, recovered-frame convergence, artifact parity or production readiness until executable fixtures pass on `main`.