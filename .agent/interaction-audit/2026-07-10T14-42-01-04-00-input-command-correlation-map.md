# Interaction Audit: Input Command Correlation Map

Timestamp: 2026-07-10T14-42-01-04-00

## Current inputs

```txt
wheel -> cameraSequence.input.wheel(deltaY)
pointerdown/move/up/cancel -> drag state and input.drag(dx, dy)
keydown/keyup -> input.key(code, pressed)
KeyH -> debug overlay toggle
blur -> input.clear()
resize -> renderer size and camera projection update
```

## Current problem

Handlers mutate local/input/camera state directly and return no stable result. The next animation frame may reflect the mutation, but there is no shared correlation identity proving that relationship.

## Required command/result flow

```txt
browser event
  -> normalize command
  -> allocate correlationId
  -> validate payload and active host
  -> apply or reject
  -> append input-result record
  -> next host frame references pending correlationIds
  -> camera-projection and render-submit records preserve linkage
```

## Required outcomes

```txt
accepted
rejected_invalid_payload
rejected_no_active_host
no_change_duplicate_input
no_change_disabled
clamped_scroll
clamped_pitch
accepted_debug_toggle
accepted_blur_clear
accepted_resize
```

## Required payload discipline

Records should retain normalized deltas/codes/dimensions and result metadata only. Raw DOM events, element references, renderer instances, and pointer-capture objects must never enter the JSON-safe journal.

## Decision

Add interaction command/result records before retuning camera behavior. This will make future camera changes measurable and replayable.