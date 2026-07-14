# START HERE: MyCozyIsland preload suspension lease and resumed-frame authority

**Last updated:** `2026-07-14T15-01-54-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `fc5a119eefc7aad5e062b15df6325e2dc28a421a`  
**Status:** `preload-suspension-lease-resume-frame-authority-audited`

**Retained statuses:** `menu-postcard-atlas-frame-admission-audited`, `menu-failure-game-bootstrap-fallback-authority-audited`, `dual-surface-gpu-handoff-retirement-authority-audited`, `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

The hidden game is intentionally put to sleep after Core Startup reports it playable. The bridge currently does this by replacing `engine.tick` and `engine.step`, capturing the renderer animation callback, and setting the animation loop to `null`. Entry then restores those references and immediately posts `cozy-game-entered`, before any resumed simulation step or visible game frame is proven. The parent also reveals the iframe after 900 ms even when that acknowledgement never arrives.

This is a useful performance optimization, but it has no application-owned suspension lease, participant revision, restoration result, stale-object rejection, rollback, or `FirstResumedGameFrameAck`.

## Plan ledger

**Goal:** preserve the sleeping-preload optimization while turning freeze, resume, fallback reveal, and first visible game presentation into one revisioned transaction.

- [x] Compare all 11 accessible Publish repositories with the ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing, or runtime-ahead.
- [x] Select only MyCozyIsland through the oldest synchronized documentation timestamp.
- [x] Inspect the parent shell, preload bridge, Core Startup evidence path, source smoke, and retained audit state.
- [x] Identify the complete interaction loop, domains, kits, adapters, and offered services.
- [x] Preserve 65 source-backed kit surfaces and five browser/product adapters.
- [x] Add the `2026-07-14T15-01-54-04-00` audit family.
- [ ] Implement suspension leases, participant receipts, restoration rollback, and first resumed-frame evidence.
- [ ] Execute real-browser, built-output, and Pages fixtures.

## Interaction loop

```txt
index redirects to menu
  -> menu initializes postcard renderer
  -> menu starts hidden game iframe
  -> Core Startup prepares engine, world, save, input and first game frame
  -> bridge observes descriptor.playable
  -> bridge replaces engine.tick and engine.step
  -> bridge captures renderer animation loop and sets it to null
  -> bridge posts ready
  -> Play posts cozy-game-enter
  -> bridge restores methods and renderer callback
  -> bridge resets intro/player focus
  -> bridge posts cozy-game-entered immediately
  -> parent reveals on acknowledgement or after 900 ms
  -> menu retires after the crossfade
  -> adventure gameplay continues
```

## Domains

```txt
routing, history, focus and browser lifecycle
menu shell and optional postcard presentation
same-origin iframe preload and cross-window messaging
Core Startup readiness and continuation selection
engine tick and step ownership
renderer animation-loop ownership
hidden-preload suspension and resume
player intro preparation and input clearing
entry acknowledgement and fallback reveal
first resumed simulation and visible-frame evidence
resource restoration, rollback and stale-attempt rejection
adventure world, Inventory, Agriculture, Foraging and saves
WebGPU/WebGL2 presentation and adaptive quality
validation, build, Pages and central tracking
```

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
planned preload-suspension authority surfaces: 24
```

## Active authority

```txt
cozy-island-preload-suspension-lease-resume-frame-authority-domain
```

It must admit one suspension candidate, bind the exact engine, scheduler, renderer, animation callback, player state and startup revision, publish a typed suspension result, restore or roll back every participant atomically, reject stale entry commands, and publish the first resumed game frame before the parent commits reveal.

## Read this run first

1. `current-audit.md`
2. `known-gaps.md`
3. `trackers/2026-07-14T15-01-54-04-00/project-breakdown.md`
4. `architecture-audit/2026-07-14T15-01-54-04-00-preload-suspension-lease-dsk-map.md`
5. `render-audit/2026-07-14T15-01-54-04-00-resume-before-visible-frame-gap.md`
6. `preload-suspension-audit/2026-07-14T15-01-54-04-00-engine-renderer-lease-restoration-contract.md`
7. `gameplay-audit/2026-07-14T15-01-54-04-00-frozen-preload-entry-loop.md`
8. `interaction-audit/2026-07-14T15-01-54-04-00-preload-suspend-resume-command-result-map.md`
9. `deploy-audit/2026-07-14T15-01-54-04-00-preload-suspension-browser-fixture-gate.md`
10. `next-steps.md`
11. `validation.md`

## Do not claim

Do not claim atomic suspension, exact participant restoration, fallback safety, first resumed-frame convergence, browser parity, or production readiness until the matching executable fixtures pass on `main`.
