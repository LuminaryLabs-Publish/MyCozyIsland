# Next steps: MyCozyIsland accessible HUD, progress and interaction projection

**Timestamp:** `2026-07-15T19-58-42-04-00`  
**Status:** `accessible-hud-progress-interaction-projection-authority-audited`

## Summary

Add one renderer-neutral semantic snapshot and a thin DOM projection adapter. Keep visual animation frequent, but update assistive semantics only when accepted meaning changes.

## Plan ledger

**Goal:** provide complete low-noise startup and gameplay semantics with deterministic focus handoff.

- [ ] Add `AccessibleHudSnapshot` to the render-snapshot domain.
- [ ] Give each semantic snapshot a stable revision and source frame revision.
- [ ] Separate menu preload status from the Play button.
- [ ] Add determinate startup progress semantics.
- [ ] Add stamina `progressbar` semantics and current value.
- [ ] Represent seed selection as a labeled set with selected state.
- [ ] Expose resource counts through stable labels.
- [ ] Publish interaction prompt/result transitions through a polite status region.
- [ ] Publish failures and blocked actions through an assertive alert only when authored.
- [ ] Gate objective, prompt, save and resource announcements by semantic change.
- [ ] Add duplicate suppression and minimum announcement intervals.
- [ ] Add `DocumentFocusId` and `FocusAdmissionResult` for menu-to-game entry.
- [ ] Remove hidden/inert state before focus and verify the accepted canvas target.
- [ ] Publish `FirstAccessibleMenuFrameAck` and `FirstAccessibleGameplayFrameAck`.
- [ ] Add accessibility-tree, keyboard, focus and screen-reader fixtures.
- [ ] Run source/build/Pages parity.

## Minimal implementation order

```txt
1. semantic snapshot descriptor
2. semantic revision and change classification
3. separate menu status/action elements
4. startup and stamina progressbars
5. resource and seed-selection semantics
6. interaction/save announcement policy
7. focus-admission result
8. accessible-frame acknowledgements
9. browser fixture matrix
10. build and Pages parity
```

## Target files

```txt
menu.html
game.html
src/menu.js
src/main-adventure.js
src/adventure/persistence-render-domains.js
src/adventure/startup-host.js
src/game-preload-bridge.js
tests/menu-game-shell-smoke.mjs
tests/accessibility-projection.fixture.mjs
package.json
.github/workflows/pages.yml
```
