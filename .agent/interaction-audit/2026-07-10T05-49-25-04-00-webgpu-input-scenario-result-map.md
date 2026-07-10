# Interaction Audit: WebGPU Input Scenario Result Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-10T05-49-25-04-00`

## Current interaction loop

```txt
wheel event
  -> preventDefault
  -> cameraSequence.input.wheel(deltaY)

pointerdown
  -> set drag origin
  -> setPointerCapture

pointermove while dragging
  -> cameraSequence.input.drag(dx, dy)
  -> update drag origin

pointerup / pointercancel
  -> clear drag

keydown
  -> KeyH toggles debug overlay
  -> cameraSequence.input.key(code, true)

keyup
  -> cameraSequence.input.key(code, false)

blur
  -> cameraSequence.input.clear()

animation frame
  -> domains.scenario.tick(dt)
  -> scenario.getRenderSnapshot()
  -> copy renderState.camera to Three camera
```

## Current proof gap

All input paths call mutable scenario/camera-sequence consumers directly. The runtime does not expose accepted/rejected/no-change result rows for wheel, pointer, key, blur, scenario tick, camera copy, or debug toggle.

## Result vocabulary needed

```txt
status: accepted | rejected | no-change
reason:
  wheel-progress-updated
  wheel-progress-clamped
  pointer-drag-started
  pointer-drag-updated
  pointer-not-dragging
  pointer-drag-ended
  pointer-cancelled
  key-state-updated
  key-debug-toggle
  key-unhandled
  input-cleared-on-blur
  scenario-ticked
  scenario-tick-clamped-dt
  camera-frame-copied
```

## Next fixture rows

```txt
fixed wheel delta sequence
pointer drag with and without active drag
KeyH debug toggle
WASD key down/up rows
blur clear row
fixed dt scenario ticks
camera readback after tick
JSON-safe input journal snapshot
```

## Recommendation

Add an input action frame and result journal around the existing camera-sequence input adapter. Keep the current input behavior unchanged until the result rows and fixture pass.
