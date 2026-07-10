# Interaction audit: input movement fixture readback

Timestamp: `2026-07-10T01-04-36-04-00`

## Current interaction channels

```txt
wheel
  -> progress = clamp01(progress + deltaY * -0.0014)

pointerdown
  -> drag = { x, y }

pointerup
  -> drag = null

pointermove while dragging
  -> progress >= 0.985: mutate player.yaw and player.pitch
  -> progress < 0.85: mutate player.yaw
  -> 0.85 <= progress < 0.985: implicit no-op

keydown / keyup
  -> mutate keys Set

frame while progress >= 0.985
  -> fp(dt)
  -> read W/A/S/D
  -> propose next player position
  -> valid(next)
  -> accept by copying player.position or silently reject
```

## Current result gaps

```txt
wheel clamp has no accepted/clamped row
pointer not dragging has no no-change row
pointer transition band has no no-change reason
pitch clamp has no readback row
movement with no keys has no no-change row
movement rejected by clearing boundary has no row
movement rejected by campfire keepout has no row
camera rail samples have no deterministic snapshot rows
first-person threshold transition has no fixture row
```

## Required result vocabulary

```txt
accepted.progress-updated
accepted.pointer-yaw-rail
accepted.pointer-look-first-person
accepted.movement-accepted
rejected.movement-clearing-boundary
rejected.movement-campfire-keepout
no_change.progress-clamped-min
no_change.progress-clamped-max
no_change.pointer-not-dragging
no_change.pointer-inactive-transition-band
no_change.movement-no-input
```

## Fixture rows to add

```txt
WheelInputFrame
PointerInputFrame
KeyboardInputFrame
MovementProposalFrame
InputResult
InputResultJournal
MovementPolicyResult
CameraRailSnapshot
FirstPersonCameraSnapshot
```

## Main finding

The controls are simple enough to fixture completely. The next implementation should make input and movement results explicit before changing camera feel, terrain, clouds, or grass visuals.
