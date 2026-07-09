# MyCozyIsland Route Action Movement Result Gap

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T19-50-20-04-00`

## Current interaction surface

```txt
wheel input
  -> mutates scroll progress

pointer drag
  -> mutates yaw before first-person threshold
  -> mutates yaw/pitch after first-person threshold

keyboard input
  -> active after progress >= 0.985
  -> attempts movement with W/A/S/D
  -> valid(next) accepts/rejects by clearing radius and campfire keepout
```

## Current action gap

Inputs directly mutate runtime state. There is no `ActionFrame`, `ActionResult`, `InputJournal`, or `MovementPolicyResult` to explain whether a movement attempt was accepted or rejected.

## Required action records

```txt
ActionFrame:
  id
  type
  source
  timestamp
  inputDelta
  before
  after

ActionResult:
  id
  status
  reason
  changed
  before
  after
  diagnostics

MovementPolicyResult:
  status
  reason
  clearingDistance
  clearingRadius
  campfireDistance
  campfireKeepoutRadius
```

## Required reasons

```txt
accepted:scroll-progress-changed
accepted:pointer-look-changed
accepted:movement-inside-clearing
rejected:movement-before-first-person-threshold
rejected:outside-clearing-radius
rejected:inside-campfire-keepout
unchanged:no-input-delta
```

## Fixture rows

```txt
wheel_action_frame_changes_scroll_progress
pointer_action_frame_changes_yaw_or_look
keyboard_action_frame_unlocks_only_after_first_person_threshold
movement_policy_result_accepts_inside_clearing_and_outside_campfire_keepout
movement_policy_result_rejects_outside_clearing_or_inside_campfire_keepout
```

## Next cut

Add these records beside the current input handlers and `valid(next)` check. Do not change the visible input behavior until the fixture proves parity.
