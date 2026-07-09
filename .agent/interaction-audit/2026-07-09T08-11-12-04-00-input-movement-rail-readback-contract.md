# Interaction Audit: Input Movement Rail Readback Contract

**Timestamp:** `2026-07-09T08-11-12-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Current interaction surface

`MyCozyIsland` is not a menu-heavy route. Its interaction is camera travel plus limited first-person movement inside the fenced clearing.

## Current input loop

```txt
resize event
  -> renderer size and camera aspect update

keydown / keyup
  -> raw Set of active key codes

wheel on canvas
  -> preventDefault
  -> progress = clamp01(progress + deltaY * -0.0014)

pointerdown on canvas
  -> drag start point stored

pointermove on canvas while dragging
  -> before first person and progress < 0.85: yaw changes faster
  -> after progress >= 0.985: yaw and pitch change
  -> drag point updates

pointerup on canvas
  -> drag cleared
```

## Current movement loop

```txt
frame(now)
  -> if progress >= 0.985, call fp(dt)
  -> fp(dt) derives forward/right vectors
  -> WASD creates movement vector
  -> normalized movement moves at 2.6 * dt
  -> next.y samples island height
  -> valid(next) checks clearing boundary and campfire keepout
  -> accepted movement copies next into player.position
  -> camera position uses player.eye()
  -> camera looks toward player.look()
```

## Current rail loop

```txt
progress < 0.985
  -> rail()
  -> compute camera position control points behind/above player
  -> compute look control points from campfire/anchor/eye
  -> sample CatmullRom curves by ease(progress)
  -> copy sampled position to camera
  -> lookAt(sampled look target)
```

## Gaps

```txt
no BrowserInputActionFrame
no ActionResult for wheel/pointer/key frames
no InputJournal
no MovementPolicyResult
no accepted movement record
no rejected movement record
no rejected reason split between outside-clearing and campfire-keepout
no CameraRailSnapshot
no first-person handoff record
no fixture rows for rail start/mid/near-handoff/first-person
```

## Required contract

```txt
BrowserInputActionFrame:
  frameId
  inputType: wheel | pointer | keyboard | synthetic
  rawDelta
  previousState
  proposedState
  accepted
  reason

MovementPolicyResult:
  frameId
  requestedDelta
  candidatePosition
  accepted
  reason: accepted | outside_clearing | campfire_keepout | no_movement | locked_until_first_person
  previousPosition
  nextPosition

CameraRailSnapshot:
  frameId
  mode: rail | first-person
  progress
  easedProgress
  cameraPosition
  lookTarget
  playerAnchor
  handoffReady
```

## Fixture rows to add

```txt
wheel-progress-increases
pointer-yaw-before-first-person
pointer-yaw-pitch-after-first-person
movement-locked-before-0-985
movement-accepted-inside-clearing
movement-rejected-outside-clearing
movement-rejected-campfire-keepout
rail-snapshot-start
rail-snapshot-mid
rail-snapshot-near-handoff
first-person-camera-snapshot
```

## Main finding

The input and movement loop is simple enough to freeze with pure helper modules. Do that before touching camera feel, movement speed, visual objects, or renderer extraction.
