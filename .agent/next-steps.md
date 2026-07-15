# Next steps: MyCozyIsland device-control action coverage

**Timestamp:** `2026-07-15T01-04-57-04-00`  
**Status:** `device-control-surface-action-coverage-authority-audited`

## Summary

Add a semantic touch-control layer that emits the same normalized action meanings as keyboard input. Do not add a second gameplay path or mutate player state directly from DOM events.

## Plan ledger

**Goal:** deliver complete keyboard, mouse and touch action coverage through one `cozyInput` authority.

- [ ] Add a device-capability and viewport-control manifest.
- [ ] Define the required action map: move, look, sprint, interact, cycle/select seed and skip intro.
- [ ] Add a left movement stick and a separate right look region.
- [ ] Add semantic interact, sprint and intro-skip buttons.
- [ ] Convert seed slots into actionable, labelled controls.
- [ ] Bind every control to a `ControlSurfaceGeneration`.
- [ ] Arbitrate multi-touch pointer ownership without look/movement crossover.
- [ ] Route all accepted actions through `cozyInput`.
- [ ] Clear held touch actions on pointer cancel, blur, hidden, suspension and surface retirement.
- [ ] Publish `DeviceControlAdmissionResult`.
- [ ] Publish `FirstDeviceControlSurfaceFrameAck`.
- [ ] Publish `FirstDeviceActionEffectFrameAck`.
- [ ] Preserve keyboard and mouse behavior.
- [ ] Add source, built-output and Pages browser fixtures.

## Minimal implementation order

```txt
1. action-map descriptor
2. device and viewport classifier
3. semantic touch-control DOM
4. pointer-region ownership
5. normalized axis, held and edge commands
6. responsive safe-area layout
7. control-surface admission result
8. first control and action-effect frame acknowledgements
9. browser device matrix
10. source/build/Pages parity
```

## Target files

```txt
game.html
src/main-adventure.js
src/adventure/runtime-domains.js
src/adventure/persistence-render-domains.js
tests/device-controls-browser.fixture.mjs
tests/adventure-domains-smoke.mjs
package.json
.github/workflows/pages.yml
```

## Acceptance matrix

```txt
desktop keyboard + mouse
phone portrait touch
phone landscape touch
tablet touch
hybrid touch + keyboard
multi-touch move + look
interact while moving
sprint hold/cancel
seed cycle/direct selection
intro skip
orientation change
safe-area insets
blur/hidden/suspend cleanup
source/build/Pages parity
```

## Ownership constraints

The browser adapter owns event capture and semantic control projection. `cozyInput` owns normalized ordering and frame admission. Player, camera, Inventory, Agriculture, Foraging and interaction domains retain gameplay truth. Renderer and HUD surfaces only project accepted revisions.