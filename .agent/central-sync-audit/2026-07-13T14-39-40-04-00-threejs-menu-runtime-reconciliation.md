# Central sync audit: MyCozyIsland Three.js menu runtime reconciliation

**Timestamp:** `2026-07-13T14-39-40-04-00`

## Summary

Central tracking previously ended at the Canvas2D menu/preload-handoff audit. Four later commits replaced the menu presentation with Three.js, updated the smoke contract and documented a fifteen-level semantic taxonomy.

## Plan ledger

**Goal:** synchronize the central ledger to the current runtime while preserving the existing preload-handoff authority and recording the new menu-presentation lifecycle boundary.

- [x] Compare the full Publish inventory with central entries.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Identify MyCozyIsland as the only runtime-ahead repository.
- [x] Reconcile four commits and four changed files.
- [x] Preserve 65 DSK/kit surfaces and five adapters.
- [x] Record the Three.js menu adapter service change.
- [x] Add repo-local tracker and audit files.
- [ ] Update the central ledger and paired internal change log.

## Reconciled range

```txt
6ea85e2c457315164cf12bdade7dabdca1c5d420..a0077808c0344b52850c2cd4c5c787c521ee61db
4 commits
README.md
menu.html
src/menu.js
tests/menu-game-shell-smoke.mjs
```

## Central status target

```txt
status: threejs-menu-presentation-lifecycle-authority-central-reconciled
technical status: threejs-menu-presentation-lifecycle-authority-audited
retained status: menu-game-preload-handoff-scheduler-authority-central-reconciled
runtime revision reviewed: a0077808c0344b52850c2cd4c5c787c521ee61db
```

## Main central finding

The menu now requires a static remote Three.js import and WebGL scene construction before it schedules the hidden game preload. The menu and hidden game own concurrent GPU renderers. Delayed entry retirement calls `renderer.dispose()` but publishes no scheduler, listener, scene-resource, context or terminal retirement receipt.

## Central files

```txt
repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
internal-change-log/2026-07-13T14-39-40-04-00-my-cozy-island-threejs-menu-lifecycle-reconciliation.md
```

## Validation boundary

Documentation only. No runtime, test, package or workflow behavior changed. No executable browser, build or Pages fixture was run.