# Central sync audit: menu/game shell runtime reconciliation

**Timestamp:** `2026-07-13T12-38-45-04-00`

## Summary

Central tracking previously ended at the Core Startup integration head. Current MyCozyIsland `main` added a dedicated menu route, living Canvas2D scene, hidden game preload, Core Startup progress bridge, Play handoff, game route, test coverage, deployment copy, failure projection, and documentation.

## Plan ledger

**Goal:** reconcile the ten newer runtime/test/docs commits into the repo-local audit and central ledger without changing runtime behavior.

- [x] Compare prior documentation head `74ca9b222da21cfec3a474472c93e66c74e267f6` with runtime head `a696b1b67f2c3bd783c0ebabe8aa5623a6206763`.
- [x] Review all nine changed files.
- [x] Add the timestamped tracker and audit family.
- [x] Refresh root `.agent` routing, status, gaps, next steps, validation, and registry.
- [ ] Update `LuminaryLabs-Dev/LuminaryLabs` repo ledger and internal change log.

## Reconciled files

```txt
.github/workflows/pages.yml
README.md
game.html
index.html
menu.html
package.json
src/game-preload-bridge.js
src/menu.js
tests/menu-game-shell-smoke.mjs
```

## Reconciled architecture

```txt
root redirect
  -> menu Canvas2D scene
  -> hidden full game preload
  -> Core Startup factual readiness
  -> simulation freeze
  -> Play command
  -> simulation resume and authored intro state
  -> iframe reveal, history replacement, focus transfer
```

## Reconciled census

```txt
source-backed DSK/kit surfaces: 65
browser/product adapters before shell: 2
new menu/preload adapters: 3
browser/product adapters now: 5
total documented kit and adapter surfaces: 70
```

## Main finding

The shell has no parent authority over the menu RAF, hidden game animation loop, quiescence, cross-window message generations, fallback reveal, or the first visible post-resume game frame.

## Central update target

```txt
repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
internal-change-log/2026-07-13T12-38-45-04-00-my-cozy-island-menu-game-preload-handoff.md
```

## Validation

Documentation only. No runtime, dependencies, package scripts, workflow, or deployment behavior changed.