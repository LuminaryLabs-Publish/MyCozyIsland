# Validation: MyCozyIsland device-control action coverage

**Timestamp:** `2026-07-15T01-04-57-04-00`

## Scope

Documentation-only inspection of responsive game markup, browser keyboard/pointer adapters, normalized input-frame construction, player/camera/interaction consumption and existing Node smoke coverage. No runtime behavior was modified or executed.

## Plan ledger

**Goal:** distinguish confirmed keyboard and pointer behavior from unproved touch action coverage and visible action-effect evidence.

- [x] Compare the full Publish inventory and central ledgers.
- [x] Compare every eligible current head with its documented head.
- [x] Select MyCozyIsland by the oldest synchronized timestamp.
- [x] Inspect `game.html`, `src/main-adventure.js` and `src/adventure/runtime-domains.js`.
- [x] Preserve the 65-kit, one-composition-kit and five-adapter inventory.
- [ ] Run `npm test` independently.
- [ ] Execute device-control browser fixtures.
- [ ] Execute built-output and Pages fixtures.

## Confirmed observations

```txt
reviewed runtime revision: 6c5e465b7b431ff6758f78e7ceb25d0f763f658f
reviewed pre-audit head: eac42511d9c462fb2e68604288810687d12f9bbf
narrow written controls: hidden below 760px
hotbar pointer policy: pointer-events:none
seed controls: div elements
pointer command meaning: camera look only
movement source: keyboard codes only
sprint source: Shift only
interaction source: KeyE only
seed source: KeyQ and Digit1-Digit4 only
intro-skip source: Space or Enter only
DeviceControlAdmissionResult: absent
FirstDeviceControlSurfaceFrameAck: absent
FirstDeviceActionEffectFrameAck: absent
```

## Existing executable coverage

`npm test` invokes three Node smoke scripts. These inspect source/domain behavior but do not instantiate phone or tablet browser contexts, synthesize multi-touch input, inspect semantic controls or capture matching touch action-effect frames.

## Required fixtures

```txt
desktop keyboard/mouse baseline
phone portrait touch
phone landscape touch
tablet touch
hybrid touch/keyboard
multi-touch movement and look
interact while moving
sprint hold, cancel and blur cleanup
seed cycle and direct selection
intro skip
orientation and safe-area changes
source/build/Pages parity
```

## Validation result

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
input behavior changed: no
gameplay changed: no
render behavior changed: no
dependencies or package scripts changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

source inspection: completed
repository comparison: completed
npm test: not run
device browser fixtures: unavailable
built-output smoke: not run
Pages smoke: not run
```

No mobile or touch playability, semantic control coverage, gesture safety, first-action frame convergence, artifact parity or production readiness is claimed.