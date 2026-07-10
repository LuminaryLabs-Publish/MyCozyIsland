# Interaction audit: input movement result readback

Timestamp: `2026-07-09T23-41-15-04-00`

## Current inputs

```txt
resize -> renderer/camera dimensions
keydown -> add key code to Set
keyup -> remove key code from Set
wheel -> mutate progress with clamp01
pointerdown -> start drag record
pointerup -> clear drag record
pointermove -> if dragging, mutate yaw or yaw/pitch depending on progress
WASD -> movement vector when progress >= 0.985
```

## Current movement policy

```txt
valid(next)
  -> accepts if distance from origin <= clearing collision radius
  -> accepts only if distance from origin >= 2.35 campfire keepout
  -> rejects silently by not copying next position
```

## Result gaps

- Wheel clamp is not recorded.
- Pointer no-drag is not recorded.
- Pointer transition band `0.85 <= progress < 0.985` is implicit no-op.
- Movement rejection does not expose clearing or campfire reason.
- No input journal exists.
- No fixed camera rail sample result exists.

## Required result vocabulary

```txt
accepted
rejected
no-change

progress-updated
progress-clamped-min
progress-clamped-max
pointer-look-first-person
pointer-yaw-rail
pointer-inactive-transition-band
pointer-not-dragging
movement-accepted
movement-rejected-clearing-boundary
movement-rejected-campfire-keepout
movement-no-input
```

## Next proof target

Create `InputActionFrame` and `InputResult` records, then replay representative wheel, pointer, and movement rows in a DOM-free fixture.
