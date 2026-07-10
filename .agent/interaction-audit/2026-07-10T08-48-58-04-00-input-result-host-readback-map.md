# Interaction audit: input result host readback map

Timestamp: `2026-07-10T08-48-58-04-00`

## Current input consumers

```txt
wheel
  -> preventDefault()
  -> input.wheel(event.deltaY)

pointerdown
  -> drag = { x, y }
  -> setPointerCapture(pointerId)

pointermove while dragging
  -> input.drag(deltaX, deltaY)
  -> update drag anchor

pointerup / pointercancel
  -> clear drag

keydown
  -> KeyH toggles debug overlay
  -> input.key(event.code, true)

keyup
  -> input.key(event.code, false)

blur
  -> input.clear()

resize
  -> renderer.setSize(...)
  -> camera.aspect update
```

## Current issue

Inputs mutate the camera sequence/scenario directly. There are no accepted, rejected, clamped, or no-change rows.

## Required interaction records

```txt
InputActionFrame
InputResult
InputReasonCode
InputResultJournal
ScenarioTickResult
CameraFrameReadback
ResizeResult
DebugToggleResult
```

## Required reason vocabulary

```txt
accepted_wheel
accepted_drag
accepted_key_down
accepted_key_up
accepted_blur_clear
accepted_resize
accepted_debug_toggle
clamped_scroll
clamped_pitch
no_change_duplicate_key
no_change_no_drag_anchor
rejected_invalid_payload
rejected_no_active_renderer
```

## Host proof requirement

`globalThis.CozyIslandHost` should expose only JSON-safe snapshots:

```txt
getInputJournal()
getScenarioJournal()
getCameraJournal()
restartProofState()
```

## Finding

Do not retune controls first. Add input result rows first, then make camera/interaction changes against a stable readback contract.
