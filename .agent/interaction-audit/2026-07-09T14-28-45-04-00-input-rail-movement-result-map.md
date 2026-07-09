# Interaction Audit — Input / Rail / Movement Result Map

**Timestamp:** `2026-07-09T14-28-45-04-00`

## Current input path

```txt
keydown -> keys.add(code)
keyup -> keys.delete(code)
wheel -> progress = clamp01(progress + deltaY * -0.0014)
pointerdown -> drag start
pointermove -> yaw mutation before first person, yaw/pitch mutation after first person
pointerup -> drag stop
```

## Current camera path

```txt
progress < 0.985:
  rail()
    -> builds six camera points
    -> builds six look points
    -> samples CatmullRom curves by ease(progress)
    -> camera.position.copy(position)
    -> camera.lookAt(look)

progress >= 0.985:
  fp(dt)
    -> keyboard movement vector
    -> movement validity check
    -> camera.position = player eye
    -> camera.lookAt(player look)
```

## Current movement policy

```txt
valid(next):
  accepted when distance from origin <= clearing collision boundary radius
  accepted when distance from origin >= 2.35 campfire keepout
  otherwise rejected silently
```

## Missing interaction proof

```txt
BrowserInputActionFrame does not exist.
ActionResult does not exist.
InputJournal does not exist.
MovementPolicyResult does not exist.
CameraRailSnapshot does not exist.
No fixture can currently prove accepted/rejected movement, rail handoff, wheel progress, or pointer look changes.
```

## Required next contracts

```txt
BrowserInputActionFrame:
  id
  source
  code/delta/pointerDelta
  before state
  after state
  status
  reason

ActionResult:
  status: accepted | rejected | noop
  reason: progress_changed | yaw_changed | pitch_changed | movement_accepted | rejected_outside_clearing | rejected_campfire_keepout | locked_until_first_person
  before
  after

InputJournal:
  bounded array of recent BrowserInputActionFrame + ActionResult rows

MovementPolicyResult:
  candidatePosition
  clearingRadius
  campfireKeepoutRadius
  status
  reason

CameraRailSnapshot:
  progress
  easedProgress
  mode: rail | first-person
  cameraPosition
  lookTarget
  playerAnchor
```

## Implementation order

```txt
1. Add pure input/movement/rail helper modules under src/host-proof/.
2. Keep current browser behavior unchanged.
3. In src/main-cloudform.js, consume helpers additively to create journal/readback rows.
4. Expose rows through globalThis.CozyIslandHost.getState().
5. Prove helper behavior through scripts/my-cozy-island-browser-consumer-fixture.mjs.
```
