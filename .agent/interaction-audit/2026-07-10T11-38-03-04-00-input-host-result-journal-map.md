# Interaction audit: input host result journal map

Timestamp: `2026-07-10T11-38-03-04-00`

## Current interaction inputs

```txt
wheel
pointerdown
pointermove while dragging
pointerup
pointercancel
keydown
keyup
blur
resize
```

## Current path

```txt
wheel -> input.wheel(event.deltaY)
pointer drag -> input.drag(dx, dy)
keydown -> debugOverlay.toggle() when KeyH, then input.key(code, true)
keyup -> input.key(code, false)
blur -> input.clear()
resize -> renderer.setSize + camera.aspect update
```

## Current gap

Input mutates live camera/scenario state directly. There are no fixture-safe rows for accepted, rejected, clamped, no-change, duplicate, disabled, blur-clear, debug-toggle, or resize decisions.

## Needed rows

```txt
InputActionFrame
InputSource
InputResult
InputReasonCode
InputResultJournal
ResizeResult
DebugToggleResult
BlurClearResult
```

## Required reason vocabulary

```txt
accepted
rejected_no_active_renderer
rejected_invalid_payload
no_change_duplicate_input
no_change_disabled
clamped_scroll
clamped_pitch
accepted_resize
accepted_debug_toggle
accepted_blur_clear
```

## Safe next target

Wrap inputs with additive journal rows while preserving the current `input.wheel`, `input.drag`, `input.key`, and `input.clear` behavior.
