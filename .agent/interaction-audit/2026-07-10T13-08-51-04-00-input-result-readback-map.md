# Interaction Audit: Input Result Readback Map

Timestamp: `2026-07-10T13-08-51-04-00`

## Current input loop

```txt
wheel
  -> preventDefault
  -> input.wheel(deltaY)

pointerdown
  -> create drag anchor
  -> optional setPointerCapture

pointermove while drag exists
  -> input.drag(dx, dy)
  -> update drag anchor

pointerup / pointercancel
  -> clear drag anchor

keydown
  -> KeyH toggles debug overlay
  -> input.key(code, true)

keyup
  -> input.key(code, false)

blur
  -> input.clear()

resize
  -> renderer.setSize
  -> camera.aspect update
```

## Gap

These input consumers mutate camera/input state directly. They do not emit stable result rows.

Missing result vocabulary:

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

## Needed kit split

```txt
input-action-frame-kit
input-result-kit
input-readback-ledger-kit
```

## Fixture requirement

A Node fixture should be able to submit representative wheel, pointer, key, blur, debug, and resize actions and assert accepted, rejected, clamped, and no-change rows without a browser GPU.
