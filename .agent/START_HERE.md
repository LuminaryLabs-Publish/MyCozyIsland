# START HERE: MyCozyIsland live motion preference projection

**Last updated:** `2026-07-16T13-01-43-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `ba23c6462e120fd0673347e8a039f10941cf6fb7`  
**Status:** `motion-preference-live-animation-projection-authority-audited`

**Retained statuses:** `save-world-content-compatibility-admission-authority-audited`, `renderer-device-context-loss-recovery-authority-audited`, `accessible-hud-progress-interaction-projection-authority-audited`, `save-writer-lease-revision-admission-authority-audited`, `game-audio-event-projection-authority-audited`, `host-clock-fixed-step-simulation-authority-audited`, `device-control-surface-action-coverage-authority-audited`, `embed-context-route-admission-authority-audited`, `preload-suspension-lease-resume-frame-authority-audited`, `menu-postcard-atlas-frame-admission-audited`, `menu-failure-game-bootstrap-fallback-authority-audited`, `dual-surface-gpu-handoff-retirement-authority-audited`, `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

The menu samples `prefers-reduced-motion` once when its module loads. That frozen boolean attenuates palm motion and shortens the entry delay, while the menu water continues to animate from shader time. The game route has no JavaScript motion-preference observer and continuously advances its aerial camera, ocean waves, foam pulses and environmental rendering. Live operating-system changes, an optional product override, one shared policy revision and a first reduced-motion frame acknowledgement are absent.

## Plan ledger

**Goal:** preserve authoritative simulation and direct player control while making optional menu, transition, camera and environment motion consume one live, revision-bound motion policy.

- [x] Compare all 11 Publish repositories against ten eligible central ledgers and root `.agent` states.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repositories.
- [x] Select only MyCozyIsland by the oldest synchronized timestamp.
- [x] Inspect menu CSS, menu JavaScript, game host, camera, ocean, foam and frame projection.
- [x] Preserve all 70 implemented kit and adapter surfaces and their services.
- [x] Define one parent motion-preference authority and 20 coordinating surfaces.
- [x] Add the `2026-07-16T13-01-43-04-00` audit family.
- [ ] Implement live preference adoption, product override, motion classification and executable browser fixtures.

## Interaction loop

```txt
menu route loads
  -> sample prefers-reduced-motion once
  -> construct WebGPU/WebGL2 postcard
  -> animate fronds, trunk and water
  -> preload game in a hidden same-origin frame
  -> Play starts a timed crossfade and retires the menu renderer

game route starts
  -> construct the current island and adventure domains
  -> automatically advance the aerial camera rail
  -> tick authoritative gameplay
  -> animate ocean, foam, world and atmosphere presentation
  -> render the frame
  -> publish no motion-policy result or reduced-motion frame receipt
```

## Active domains

```txt
routes, iframe preload and focus handoff
browser media-query capability and product preferences
Core Startup, Object and Transaction Ledger
seeded world, input, Inventory, Agriculture and Foraging
player, scenario, interaction and camera
save and renderer-neutral snapshots
menu and game WebGPU/WebGL2 presentation
camera, ocean, foam, cloud, fog, wind and transitions
motion classification, policy settlement and frame convergence
validation, Pages and central governance
```

## Census

```txt
engine-installed kits: 14
cataloged world/render/host kits: 50
composition kits: 1
browser/product adapters: 5
total implemented surfaces: 70
planned motion-preference surfaces: 20
```

## Active authority

```txt
cozy-island-motion-preference-live-animation-projection-authority-domain
```

```txt
MotionPreferenceAdmissionCommand
  -> bind document, route, preference, override, policy and frame revisions
  -> observe operating-system capability and live changes
  -> resolve system, normal or reduced product policy
  -> classify essential simulation separately from optional presentation
  -> adapt menu wind/water, entry transition, aerial camera,
     ocean, foam, cloud, fog and world-wind projection
  -> preserve input, movement, farming, foraging and scenario truth
  -> reject stale route and policy work
  -> publish MotionProjectionResult
  -> publish FirstReducedMotionMenuFrameAck
  -> publish FirstReducedMotionGameplayFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-16T13-01-43-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-16T13-01-43-04-00-motion-preference-live-projection-dsk-map.md`
4. `motion-preference-audit/2026-07-16T13-01-43-04-00-system-override-animation-policy-contract.md`
5. `render-audit/2026-07-16T13-01-43-04-00-frozen-preference-continuous-motion-frame-gap.md`
6. `gameplay-audit/2026-07-16T13-01-43-04-00-reduced-motion-essential-simulation-loop.md`
7. `interaction-audit/2026-07-16T13-01-43-04-00-motion-preference-command-result-map.md`
8. `deploy-audit/2026-07-16T13-01-43-04-00-motion-preference-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Do not claim

Do not claim live reduced-motion adoption, product override correctness, vestibular safety, simulation parity, animation classification, reduced-motion frame convergence, artifact parity, Pages parity or production readiness until executable fixtures pass on `main`.
