# START HERE: MyCozyIsland accessible HUD, progress and interaction projection

**Last updated:** `2026-07-15T19-58-42-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `dc3ef1a0c638fcef11123e4819af53f71f8aeb5e`  
**Status:** `accessible-hud-progress-interaction-projection-authority-audited`

**Retained statuses:** `save-writer-lease-revision-admission-authority-audited`, `game-audio-event-projection-authority-audited`, `host-clock-fixed-step-simulation-authority-audited`, `device-control-surface-action-coverage-authority-audited`, `embed-context-route-admission-authority-audited`, `preload-suspension-lease-resume-frame-authority-audited`, `menu-postcard-atlas-frame-admission-audited`, `menu-failure-game-bootstrap-fallback-authority-audited`, `dual-surface-gpu-handoff-retirement-authority-audited`, `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

MyCozyIsland renders useful loading, objective, resource, stamina, seed, save and interaction state, but most changing state is visual-only or rewritten every animation frame without stable semantic revisions. The menu also uses one disabled/live Play button as both progress readout and action gate.

## Plan ledger

**Goal:** project accepted startup and gameplay state through stable, low-noise semantic DOM and focus results without moving simulation authority into the browser host.

- [x] Compare the full 11-repository Publish inventory with ten eligible ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Select only MyCozyIsland by the oldest synchronized timestamp.
- [x] Inspect menu progress, iframe entry, loader, HUD, stamina, hotbar, interaction prompt and canvas focus paths.
- [x] Preserve all 70 implemented surfaces.
- [x] Add the `2026-07-15T19-58-42-04-00` audit family.
- [ ] Implement semantic projection and browser accessibility fixtures.

## Interaction loop

```txt
menu startup
  -> hidden game preload publishes progress
  -> one disabled Play button changes text for every percentage
  -> the same element later becomes the enabled Play action

game startup
  -> Core Startup updates loader copy and visual fill
  -> the track remains aria-hidden and has no progressbar value
  -> entry moves focus into the game canvas

adventure frame
  -> accepted engine frame publishes objective, prompt, resources, stamina, seed and save state
  -> updateHud rewrites DOM every RAF callback
  -> stamina remains a visual width
  -> seed selection remains class-only
  -> prompt and save transitions have no state-bound announcement result
```

## Active domains

```txt
static menu and game routes
same-origin preload, cross-window entry and focus handoff
Core Startup, Object and Transaction Ledger
seeded world, input, Inventory, Agriculture and Foraging
player, scenario, interaction, camera, save and render snapshots
startup progress and playable-entry semantics
objective, resource, stamina, seed-selection, interaction and save-status semantics
focus adoption and gameplay-canvas alternative
WebGPU/WebGL2 world presentation and DOM HUD
validation, build, Pages and central governance
```

## Census

```txt
engine-installed kits: 14
cataloged world/render/host kits: 50
composition kits: 1
browser/product adapters: 5
total implemented surfaces: 70
planned accessibility surfaces: 21
```

## Active authority

```txt
cozy-island-accessible-hud-progress-focus-authority-domain
```

```txt
AccessibleProjectionCommand
  -> bind document, startup, frame, HUD, interaction and focus revisions
  -> derive one semantic snapshot from accepted engine state
  -> update progress, objective, resources, stamina and seed selection
  -> announce only authored state transitions
  -> keep progress reporting separate from the Play action
  -> adopt and restore focus through menu-to-game entry
  -> publish AccessibleProjectionResult
  -> publish FirstAccessibleMenuFrameAck
  -> publish FirstAccessibleGameplayFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-15T19-58-42-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-15T19-58-42-04-00-accessible-hud-progress-projection-dsk-map.md`
4. `accessibility-audit/2026-07-15T19-58-42-04-00-semantic-hud-progress-focus-contract.md`
5. `gameplay-audit/2026-07-15T19-58-42-04-00-visual-only-status-interaction-loop.md`
6. `interaction-audit/2026-07-15T19-58-42-04-00-accessible-projection-command-result-map.md`
7. `render-audit/2026-07-15T19-58-42-04-00-semantic-visible-frame-convergence-gap.md`
8. `deploy-audit/2026-07-15T19-58-42-04-00-accessibility-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Do not claim

Do not claim assistive-technology compatibility, progressbar correctness, announcement quality, semantic stamina or seed selection, focus convergence, artifact parity or production readiness until executable fixtures pass on `main`.
