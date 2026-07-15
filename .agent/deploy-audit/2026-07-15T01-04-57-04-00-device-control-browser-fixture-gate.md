# Deploy audit: device-control browser fixture gate

**Timestamp:** `2026-07-15T01-04-57-04-00`  
**Status:** `device-control-surface-action-coverage-authority-audited`

## Summary

Current tests are Node source/domain smokes. They do not launch a touch-capable browser, exercise responsive controls, inspect semantic action surfaces or prove that touch actions affect authoritative gameplay and the next frame.

## Plan ledger

**Goal:** prevent source, built output or Pages deployment from claiming touch playability without executable device-parity evidence.

- [x] Inspect package test scripts.
- [x] Identify absent mobile browser coverage.
- [x] Define the fixture matrix.
- [ ] Implement source browser fixtures.
- [ ] Repeat against built output.
- [ ] Repeat against GitHub Pages.

## Required matrix

```txt
keyboard + mouse desktop
coarse-pointer touch phone portrait
coarse-pointer touch phone landscape
touch tablet
hybrid touch + keyboard
safe-area insets
viewport resize and orientation change
multi-touch movement + look
interact while moving
sprint hold and cancellation
seed cycle and direct selection
intro skip
blur, hidden and suspension cleanup
source/build/Pages parity
```

## Required assertions

```txt
complete action map admitted
semantic controls connected and visible
no overlapping control regions
one pointer owner per gesture
all actions enter cozyInput
held actions clear on cancellation
matching authoritative state revision
matching HUD/world frame
no console or startup errors
```

## Gate

Do not claim mobile or touch support until the full matrix produces `DeviceControlAdmissionResult`, `FirstDeviceControlSurfaceFrameAck` and `FirstDeviceActionEffectFrameAck` artifacts on `main`.