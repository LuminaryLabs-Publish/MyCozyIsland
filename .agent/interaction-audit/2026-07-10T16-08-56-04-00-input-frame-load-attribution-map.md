# Interaction Audit: Input to Frame-Load Attribution

Timestamp: 2026-07-10T16-08-56-04-00

## Current inputs

```txt
wheel
  mutates rail progress

pointerdown / pointermove / pointerup / pointercancel
  mutates yaw, pitch, drag state, and early rail positions

keydown / keyup
  mutates pressed-key set
  KeyH toggles debug overlay

blur
  clears pressed keys

resize
  mutates renderer size, camera aspect, and projection matrix
```

## Current interaction authority

Input handlers call the camera-sequence adapter directly. They return no accepted, rejected, clamped, or no-change result and they allocate no command or correlation identity.

## Performance attribution gap

A frame interval spike can follow:

- a resize and render-target reallocation
- rapid drag-driven camera movement
- first-person movement entering a more expensive view
- debug overlay activation
- browser scheduling or unrelated work
- actual GPU rendering pressure

The current performance policy cannot distinguish any of these causes. It only receives one unlabeled `frameMs` value.

## Required interaction records

```txt
InputCommand
  sequence
  commandId
  kind
  payload
  source

InputResult
  commandId
  status
  reason
  before
  after
  clamped

FrameLoadContext
  frameId
  consumedCommandIds
  viewportChanged
  cameraChanged
  debugChanged
  movementChanged
```

These records should not make input responsible for performance policy. They provide optional causal context for diagnostics and fixture assertions.

## Special cases

- `wheel` should report clamped progress when input attempts to move beyond `[0, 1]`.
- drag should report pitch clamping and whether early rail positions were mutated.
- key repeats should be no-change when the pressed set already contains the code.
- blur should report the number of released keys.
- resize should record previous and next viewport dimensions and DPR.
- `KeyH` should separate debug-toggle result from camera-key handling.

## Next boundary

Correlate input results with the next scenario/camera frame and any subsequent adaptive-quality transition, but do not make visual retuning part of this pass.