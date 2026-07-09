# Interaction Audit: Input / Rail / Movement Action Result

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-39-50-04-00`

## Current interaction surface

```txt
keydown -> keys.add(code)
keyup -> keys.delete(code)
wheel -> progress = clamp01(progress + deltaY * -0.0014)
pointerdown -> drag start
pointerup -> drag clear
pointermove -> yaw before first-person; yaw/pitch after first-person
frame -> rail camera when progress < 0.985
frame -> first-person movement when progress >= 0.985
valid(next) -> clearing radius and campfire keepout check
```

## Current gaps

```txt
input events have no source-owned action frame
progress mutation has no accepted/skipped result
pointer yaw/pitch mutation has no action result
movement accepted/rejected state is not recorded
valid(next) returns boolean only
camera rail states are not snapshotted
input history is not bounded or fixture-readable
```

## Action result rows needed

```txt
wheel-progress:
  actionId
  beforeProgress
  delta
  afterProgress
  accepted
  reason

pointer-look:
  actionId
  mode
  beforeYaw
  beforePitch
  dx
  dy
  afterYaw
  afterPitch
  accepted
  reason

movement-step:
  actionId
  inputVector
  beforePosition
  proposedPosition
  afterPosition
  accepted
  reason: accepted | rejected-outside-clearing | rejected-campfire-keepout | skipped-no-input
```

## Camera rail rows needed

```txt
start:
  progress: 0
  mode: rail

mid:
  progress: 0.5
  mode: rail

near-handoff:
  progress: 0.984
  mode: rail

first-person:
  progress: 0.985
  mode: first-person
```

## Main interaction finding

The existing input loop is small enough to wrap without changing feel. Add action/result records and rail snapshots before changing thresholds, movement rules, camera motion, or pointer behavior.
