# MyCozyIsland Action + Movement Browser Consumer Map

**Timestamp:** `2026-07-08T19-40-00-04-00`

## Current interaction loop

```txt
wheel
  -> progress = clamp01(progress + deltaY * -0.0014)

pointerdown
  -> drag starts

pointermove while dragging
  -> if first-person: yaw/pitch mutate
  -> else if early rail: yaw mutates

keydown/keyup
  -> keys Set changes

frame
  -> if progress >= 0.985: fp(dt)
  -> fp(dt) builds intended motion
  -> valid(next) returns boolean
  -> accepted movement copies next into player.position
  -> rejected movement is silent
```

## Current movement policy

```txt
valid(next):
  max = clearing.byId["central-clearing:campfire:collision-boundary"].state.radiusMeters
  accept when distance from origin <= max and distance from origin >= 2.35
```

## Missing records

```txt
ActionFrame
ActionResult
InputJournal
MovementIntent
MovementPolicyResult
ClearingBoundaryResult
CampfireKeepoutResult
CameraRailSnapshot
FirstPersonGateResult
```

## Required result reasons

```txt
accepted_scroll_progress
accepted_pointer_yaw
accepted_pointer_look
accepted_keyboard_move
rejected_not_first_person_yet
rejected_outside_clearing_boundary
rejected_inside_campfire_keepout
noop_no_input
```

## Fixture rows

```txt
01_wheel_delta_updates_scroll_action_result
02_pointer_drag_before_first_person_updates_yaw_only
03_pointer_drag_after_first_person_updates_yaw_and_pitch
04_keyboard_move_before_threshold_is_rejected_not_first_person_yet
05_keyboard_move_inside_boundary_is_accepted
06_keyboard_move_outside_clearing_is_rejected
07_keyboard_move_inside_campfire_keepout_is_rejected
08_action_journal_preserves_recent_inputs
09_legacy_movement_behavior_is_unchanged
```

## Implementation boundary

Add pure result creation beside the current handlers. Do not change the input handlers, movement speed, first-person threshold, or valid movement policy during the proof pass.
