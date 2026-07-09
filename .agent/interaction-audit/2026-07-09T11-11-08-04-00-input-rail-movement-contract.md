# Interaction Audit: Input / Rail / Movement Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-11-08-04-00`

## Summary

Interaction is simple and readable, but it is not represented as source-owned command/result rows.

The next pass should add action-frame, movement-policy, and camera-rail snapshots around the existing behavior.

## Current interaction loop

```txt
resize event
  -> renderer.setSize
  -> camera.aspect and projection update

keydown / keyup
  -> mutate raw keys Set

wheel
  -> preventDefault
  -> progress = clamp01(progress + deltaY * -0.0014)

pointerdown
  -> capture drag start

pointermove while dragging
  -> before first-person: mutate yaw when progress < 0.85
  -> after first-person: mutate yaw and pitch when progress >= 0.985

frame loop
  -> if progress < 0.985 use rail camera
  -> if progress >= 0.985 use first-person movement
  -> valid(next) accepts/rejects movement by clearing and campfire rules
```

## Current movement policy

```txt
first-person unlock threshold: progress >= 0.985
clearing rule: movement must remain within clearing radius
campfire keepout rule: movement must remain outside campfire keepout
accepted movement: player.position copies next and y is sampled from terrain
rejected movement: player.position remains unchanged without a result record
```

## Missing readback

```txt
no BrowserInputActionFrame
no ActionResult
no InputJournal
no MovementPolicyResult
no CameraRailSnapshot
no fixture row for wheel progress mutation
no fixture row for pointer look mutation
no fixture row for accepted first-person movement
no fixture row for clearing rejection
no fixture row for campfire keepout rejection
no fixture row for rail/start/mid/handoff camera states
```

## Action result reason catalog

```txt
scroll_progress_changed
pointer_yaw_changed
pointer_look_changed
keyboard_state_changed
movement_skipped_until_first_person
movement_accepted
movement_rejected_outside_clearing
movement_rejected_campfire_keepout
rail_camera_sampled
first_person_camera_sampled
no_active_drag
```

## Required fixture rows

```txt
wheel-forward:
  input: deltaY negative
  expect: progress increases and action result accepted

wheel-backward:
  input: deltaY positive
  expect: progress decreases and clamps to [0,1]

pointer-rail-yaw:
  input: drag while progress < 0.85
  expect: yaw changes and pitch remains unchanged

pointer-first-person-look:
  input: drag while progress >= 0.985
  expect: yaw and clamped pitch change

movement-before-unlock:
  input: keys pressed while progress < 0.985
  expect: movement skipped, player position unchanged

movement-accepted:
  input: first-person unlocked and next position inside clearing/outside campfire
  expect: accepted movement record

movement-rejected-clearing:
  input: next position outside clearing
  expect: rejected movement record, position unchanged

movement-rejected-campfire:
  input: next position inside campfire keepout
  expect: rejected movement record, position unchanged

rail-handoff:
  input: progress just below and at 0.985
  expect: rail snapshot then first-person snapshot
```

## Integration rule

Keep the current event handlers and visual behavior.

Add pure helper functions that the browser route can call, then expose a bounded journal through additive `globalThis.CozyIslandHost.getState()`.

## Next safe ledge

```txt
MyCozyIsland Host Proof Ledger Parity + Browser Consumer Fixture Gate
```