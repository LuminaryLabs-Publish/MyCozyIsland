# START HERE: MyCozyIsland pointer-look gesture ownership

**Last updated:** `2026-07-16T18-41-23-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed pre-audit documentation head:** `02ef4b2ab98a36a7e744ff8dce36e796ed15f1ec`  
**Status:** `pointer-look-gesture-ownership-authority-audited`

**Retained statuses:** `motion-preference-live-animation-projection-authority-audited`, `save-world-content-compatibility-admission-authority-audited`, `renderer-device-context-loss-recovery-authority-audited`, `accessible-hud-progress-interaction-projection-authority-audited`, `save-writer-lease-revision-admission-authority-audited`, `game-audio-event-projection-authority-audited`, `host-clock-fixed-step-simulation-authority-audited`, `device-control-surface-action-coverage-authority-audited`, `embed-context-route-admission-authority-audited`, `preload-suspension-lease-resume-frame-authority-audited`, `menu-postcard-atlas-frame-admission-audited`, `menu-failure-game-bootstrap-fallback-authority-audited`, `dual-surface-gpu-handoff-retirement-authority-audited`, `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

The game canvas stores a pointer ID when a drag begins, but later move, up and cancel handlers only test whether a shared drag record exists. A secondary pointer can overwrite the active coordinates, contribute look deltas or terminate the owner gesture. The input DSK then queues anonymous pointer deltas with no pointer ID, gesture revision, capture lease or terminal result. No `lostpointercapture` settlement or matching camera-frame acknowledgement exists.

## Plan ledger

**Goal:** ensure every pointer-look delta belongs to one admitted owner gesture and settles exactly once before it can affect player orientation, movement direction or the rendered camera frame.

- [x] Compare all 11 Publish repositories against ten eligible central ledgers and root `.agent` states.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repositories.
- [x] Select only MyCozyIsland by the oldest synchronized timestamp.
- [x] Inspect the browser pointer adapter, normalized input DSK, player look path and camera projection.
- [x] Preserve all 70 implemented kit and adapter surfaces and their services.
- [x] Define one parent pointer-gesture authority and 18 coordinating surfaces.
- [x] Add the `2026-07-16T18-41-23-04-00` audit family.
- [ ] Implement pointer ownership, capture settlement and executable browser fixtures.

## Interaction loop

```txt
menu
  -> prepare and reveal the full game

game
  -> pointerdown stores one shared drag record
  -> pointermove emits look delta whenever any drag exists
  -> pointerup or pointercancel clears the shared record
  -> cozy-input accumulates anonymous look deltas
  -> cozy-player changes yaw and pitch
  -> cozy-camera publishes the view
  -> renderer presents the frame
```

## Active domains

```txt
routes, preload and focus handoff
browser pointer and capture lifecycle
Core Startup, Object and Transaction Ledger
world, input, Inventory, Agriculture and Foraging
player, scenario, interaction and camera
save and renderer-neutral snapshots
menu and game WebGPU/WebGL2 presentation
environment rendering and adaptive quality
pointer gesture ownership, settlement and frame proof
validation, Pages and central governance
```

## Census

```txt
engine-installed kits: 14
cataloged world/render/host kits: 50
composition kits: 1
browser/product adapters: 5
total implemented surfaces: 70
planned pointer-gesture surfaces: 18
```

## Active authority

```txt
cozy-island-pointer-look-gesture-ownership-authority-domain
```

```txt
PointerGestureAdmissionCommand
  -> bind document, route, canvas and pointer revisions
  -> allocate one gesture and capture lease
  -> accept one owner and classify secondary pointers
  -> publish PointerGestureAdmissionResult

PointerGestureDeltaCommand
  -> require the accepted pointer and gesture revisions
  -> reject mismatched, stale or uncaptured events
  -> publish an identity-bound look delta and result

PointerGestureSettlementCommand
  -> settle up, cancel, lost capture and lifecycle retirement exactly once
  -> release only the matching owner lease
  -> publish PointerGestureSettlementResult
  -> publish FirstPointerLookFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-16T18-41-23-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-16T18-41-23-04-00-pointer-look-gesture-ownership-dsk-map.md`
4. `pointer-gesture-audit/2026-07-16T18-41-23-04-00-pointer-owner-capture-settlement-contract.md`
5. `render-audit/2026-07-16T18-41-23-04-00-mixed-pointer-camera-frame-gap.md`
6. `gameplay-audit/2026-07-16T18-41-23-04-00-multi-pointer-look-traversal-loop.md`
7. `interaction-audit/2026-07-16T18-41-23-04-00-pointer-gesture-command-result-map.md`
8. `deploy-audit/2026-07-16T18-41-23-04-00-pointer-gesture-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Do not claim

Do not claim owner-only pointer input, multi-touch correctness, capture-loss recovery, stale-event rejection, camera-frame convergence, artifact parity, Pages parity or production readiness until executable fixtures pass on `main`.