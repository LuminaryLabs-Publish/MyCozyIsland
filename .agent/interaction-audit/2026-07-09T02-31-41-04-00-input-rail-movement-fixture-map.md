# Interaction Audit: Input / Rail / Movement Fixture Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T02-31-41-04-00`

## Current interaction loop

```txt
wheel
  -> progress = clamp01(progress + deltaY * -0.0014)

pointerdown
  -> drag start

pointermove while dragging
  -> if progress >= 0.985, mutate yaw and pitch
  -> else if progress < 0.85, mutate yaw only
  -> else, no pointer look mutation

keyboard
  -> maintain Set of pressed codes

frame
  -> if progress >= 0.985, run fp(dt)
  -> else, run rail() and camera.lookAt()

fp(dt)
  -> derive forward/right movement vector
  -> calculate next position
  -> sample terrain height
  -> valid(next)
  -> accept or reject position
```

## Current implicit policies

```txt
first-person unlock threshold: progress >= 0.985
pre-first-person pointer yaw range: progress < 0.85
transition dead zone: 0.85 <= progress < 0.985
movement speed: 2.6 meters/second
clearing maximum radius: central-clearing:campfire:collision-boundary.state.radiusMeters
campfire keepout radius: 2.35 meters from center
```

## Missing proof records

```txt
BrowserInputActionFrame:
  missing wheel rows
  missing pointer rows
  missing keyboard rows
  missing no-op transition-zone pointer rows

ActionResult:
  missing accepted/rejected effect records
  missing old/new progress rows
  missing old/new yaw/pitch rows
  missing movement command rows

MovementPolicyResult:
  missing accepted position record
  missing rejected_outside_clearing reason
  missing rejected_inside_campfire_keepout reason
  missing rejected_before_first_person reason

CameraRailSnapshot:
  missing control point readback
  missing progress sample rows
  missing handoff row
```

## Required fixture rows

```txt
input_01_wheel_positive_scroll_clamps_to_0
input_02_wheel_negative_scroll_clamps_to_1
input_03_pointer_pre_first_person_changes_yaw_only
input_04_pointer_transition_zone_noops
input_05_pointer_first_person_changes_yaw_and_pitch
input_06_keyboard_before_threshold_rejects_movement
input_07_keyboard_after_threshold_attempts_movement
movement_01_accepts_inside_clearing_outside_campfire
movement_02_rejects_outside_clearing
movement_03_rejects_inside_campfire_keepout
rail_01_progress_0_sky_view
rail_02_progress_0_5_mid_view
rail_03_progress_0_985_handoff_view
rail_04_progress_1_eye_view
```

## Next source shape

```txt
src/host-proof/browser-input-action-frame.js
src/host-proof/action-result.js
src/host-proof/input-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
```

## Stop line

Do not change the live input thresholds, movement speed, rail control points, or `valid(next)` behavior in the first implementation. Convert them to recorded decisions first.
