# Interaction audit: input movement result readback

**Timestamp:** `2026-07-10T02-31-58-04-00`

## Current inputs

```txt
resize
keydown
keyup
wheel
pointerdown
pointerup
pointermove
```

## Current behavior

```txt
wheel -> progress = clamp01(progress + delta)
pointerdown -> drag starts
pointerup -> drag clears
pointermove while not dragging -> implicit no-op
pointermove while progress < 0.85 -> yaw changes
pointermove while 0.85 <= progress < 0.985 -> implicit no-op
pointermove while progress >= 0.985 -> yaw and pitch change
WASD at progress >= 0.985 -> attempt movement
valid(next) accepts or rejects by clearing radius and campfire keepout
```

## Missing result vocabulary

```txt
accepted / progress-updated
accepted / progress-clamped-min
accepted / progress-clamped-max
accepted / pointer-yaw-rail
accepted / pointer-look-first-person
no-change / pointer-not-dragging
no-change / pointer-inactive-transition-band
accepted / movement-accepted
rejected / movement-rejected-clearing-boundary
rejected / movement-rejected-campfire-keepout
no-change / movement-no-input
```

## Required proof artifacts

```txt
BrowserInputActionFrame
InputResult
InputResultJournal
MovementPolicyResult
CameraRailSnapshot
FirstPersonPoseSnapshot
```

## Fixture cases

```txt
wheel normal update
wheel min clamp
wheel max clamp
pointer not dragging
pointer rail yaw
pointer inactive transition band
pointer first-person yaw/pitch
movement accepted
movement rejected by clearing boundary
movement rejected by campfire keepout
movement no input
```

## Browser splice rule

Add source-owned result functions first. Then adapt existing handlers to call them while preserving visible behavior and thresholds `0.85` and `0.985`.
