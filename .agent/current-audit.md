# Current audit: menu preload-to-ready presentation handoff

**Timestamp:** `2026-07-17T01-39-36-04-00`  
**Status:** `menu-preload-ready-presentation-handoff-authority-audited`

## Summary

MyCozyIsland is six runtime commits ahead of its previous documentation head. The current menu replaces the former bloom/shadow-heavy renderer with a direct particle-first path, explicit preload/idle/interactive frame targets, preload DPR reduction, one frond batch and one combined atmosphere particle batch.

## Source-backed behavior

```txt
createMenuThreeRenderer
  -> initialize WebGPURenderer and backend
  -> choose one startup quality tier
  -> disable dynamic shadows
  -> build direct scene resources
  -> set preloading=true
  -> use DPR <= 1 and 24 FPS target

cozy-game-ready
  -> game bridge has already frozen game simulation and presentation
  -> menu host calls markReady
  -> markReady calls setPreloading(false)
  -> setPreloading(false) clears lastFrame and calls resize
  -> resize restores the selected quality DPR cap
  -> markReady enables Play immediately
  -> a later animation-loop callback renders the ready frame

interaction
  -> pointer or Play focus wakes a 60 FPS target for 900 ms

entry
  -> post cozy-game-enter
  -> game resumes
  -> game is revealed and focused
  -> menu renderer is disposed
```

## Main gap

The factual game-ready result, menu DPR/frame-mode transition, first visible ready frame, Play enablement and game-entry retirement are not bound by one session and presentation generation.

No `FirstReadyMenuFrameAck` is required before Play becomes actionable. No typed ready-admission, presentation-transition, Play-admission or entry-handoff result exists.

This is an ownership and visible-frame convergence gap, not proof of a user-visible failure on a particular device.

## Required authority

`cozy-island-menu-preload-ready-presentation-handoff-authority-domain`

Required results:

- `GamePreloadReadyAdmissionResult`
- `MenuPresentationBudgetTransitionResult`
- `MenuRenderCommitResult`
- `FirstReadyMenuFrameAck`
- `PlayGateAdmissionResult`
- `EntryHandoffResult`

## Domains and services

The current composition contains 14 engine-installed core/adventure kits, 50 cataloged world/render/host kits, one additional composition kit, 16 explicit menu domain/kit surfaces and four other browser/product adapters. Complete IDs, interaction loops and services are in the timestamped tracker and `.agent/kit-registry.json`.

## Validation boundary

Documentation only. No runtime JavaScript, HTML, CSS, recipe, renderer, test, workflow or deployment behavior was changed by this audit.