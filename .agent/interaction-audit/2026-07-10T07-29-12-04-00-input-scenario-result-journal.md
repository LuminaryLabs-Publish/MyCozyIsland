# Interaction Audit: Input Scenario Result Journal

Timestamp: 2026-07-10T07-29-12-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Current interaction surface

- Wheel input changes scroll/progress style state.
- Pointer input changes yaw/pitch/camera target state.
- Keyboard input affects movement/scenario behavior.
- Blur and resize are browser lifecycle consumers.
- The scenario and camera sequence are updated inside the frame loop.

## Current gap

Input consumers mutate runtime state directly. There is no accepted/rejected/no-change result row, no stable reason vocabulary, and no fixture-readable journal. The route can be visually healthy while still hiding whether an input was clamped, ignored, rejected, or accepted.

## Required result rows

```txt
InputActionFrame
  id
  frame
  source
  action
  payload
  before
  after
  status
  reason
  warnings[]

ScenarioTickResult
  frame
  dt
  before
  after
  status
  reason
  emittedEvents[]

CameraFrameReadback
  frame
  mode
  sourceSequenceId
  accepted
  reason
  position
  target
  yaw
  pitch
```

## Reason vocabulary to start with

- accepted
- rejected_no_active_renderer
- rejected_invalid_payload
- no_change_duplicate_input
- no_change_disabled
- clamped_scroll
- clamped_pitch
- accepted_quality_degraded
- accepted_quality_recovered
- accepted_resize

## Main finding

The next interaction work should not retune camera or controls. It should wrap the existing wheel/pointer/keyboard/blur/resize and scenario/camera updates with additive result rows while preserving current behavior.

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Proof Ledger Refresh + Node Consumer Fixture Gate
```
