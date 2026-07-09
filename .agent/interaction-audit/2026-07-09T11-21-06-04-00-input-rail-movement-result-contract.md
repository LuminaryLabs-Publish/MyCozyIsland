# Interaction Audit: Input Rail Movement Result Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-21-06-04-00`

## Current interaction loop

```txt
resize event
  -> renderer/camera resize

keydown/keyup
  -> raw Set of KeyboardEvent.code values

wheel on canvas
  -> progress += deltaY * -0.0014
  -> clamp01(progress)

pointerdown/pointerup/pointermove
  -> drag state
  -> yaw mutates before first-person while progress < 0.85
  -> yaw/pitch mutate after first-person unlock while progress >= 0.985

frame
  -> if progress >= 0.985 call fp(dt)
  -> else call rail()
```

## Movement rule today

```txt
valid(next):
  max = central-clearing:campfire:collision-boundary.state.radiusMeters
  accepted when distance from origin <= max
  accepted when distance from origin >= 2.35
```

## Missing interaction contracts

```txt
BrowserInputActionFrame:
  not present

ActionResult:
  not present

InputJournal:
  not present

MovementPolicyResult:
  not present

CameraRailSnapshot:
  not present
```

## Required result cases

```txt
wheel-progress-accepted
pointer-yaw-accepted
pointer-look-accepted
keyboard-movement-skipped-before-first-person
movement-accepted
movement-rejected-outside-clearing
movement-rejected-campfire-keepout
rail-camera-active
first-person-camera-active
```

## Fixture rows needed

```txt
start rail frame at progress 0
mid rail frame at progress 0.5
near handoff frame at progress 0.98
first-person frame at progress 0.985
accepted forward movement inside clearing
rejected movement outside clearing
rejected movement into campfire keepout
```

## Main finding

The interaction loop is playable, but it is not explainable to a fixture. The next work should turn every input/movement/camera decision into a small record before any new controls are added.
