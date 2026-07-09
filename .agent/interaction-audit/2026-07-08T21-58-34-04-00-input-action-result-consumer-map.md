# Interaction Audit: Input Action Result Consumer Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T21-58-34-04-00`

## Current input ownership

`src/main-cloudform.js` owns browser input handlers inline.

```txt
keydown -> keys.add(e.code)
keyup -> keys.delete(e.code)
wheel -> progress = clamp01(progress + e.deltaY * -0.0014)
pointerdown -> drag start
pointerup -> drag clear
pointermove -> yaw or yaw/pitch mutation based on progress
```

## Current movement ownership

```txt
frame(now)
  -> if progress >= 0.985, call fp(dt)
  -> fp(dt) reads keys Set
  -> fp(dt) computes forward/right movement vector
  -> next position = player.position + normalized input * 2.6 * dt
  -> n.y = sample island height
  -> valid(n) returns boolean
  -> accepted movement mutates player.position
  -> rejected movement is silent
```

## Current policy boundary

```txt
valid(next):
  max = clearing.byId["central-clearing:campfire:collision-boundary"].state.radiusMeters
  accept if distance from origin <= max and distance from origin >= 2.35
```

The same predicate is doing two jobs:

```txt
clearing outer boundary
campfire inner keepout
```

The boolean return hides which rule accepted or rejected movement.

## Target input/action records

```txt
BrowserInputActionFrame:
  id
  type
  timestamp
  source
  routeToken
  progressBefore
  playerBefore
  payload

ActionResult:
  actionId
  status: accepted | rejected | unchanged
  reason
  progressBefore
  progressAfter
  playerBefore
  playerAfter
  sideEffects
```

## Target movement records

```txt
MovementPolicyResult:
  status: accepted | rejected | unchanged
  reason:
    first_person_locked
    no_movement_input
    accepted_inside_bounds
    rejected_outside_clearing
    rejected_inside_campfire_keepout
  candidatePosition
  acceptedPosition
  clearingRadius
  campfireKeepoutRadius
  distanceFromCenter
```

## Consumer splice points

```txt
wheel handler:
  create BrowserInputActionFrame
  create ActionResult with clamped progress delta
  append input journal

pointermove handler:
  create BrowserInputActionFrame
  create ActionResult for pre-first-person yaw or first-person yaw/pitch
  append input journal

fp(dt):
  create movement candidate
  create MovementPolicyResult
  mutate player only when result.status === accepted
  append movement result to host snapshot

frame(now):
  expose latest input/action/movement rows through CozyIslandHost snapshot
```

## Fixture rows

```txt
wheel_negative_delta_increases_progress_and_clamps
wheel_positive_delta_decreases_progress_and_clamps
pointer_move_before_fp_changes_yaw_only
pointer_move_after_fp_changes_yaw_and_pitch
keyboard_before_threshold_rejects_with_first_person_locked
keyboard_inside_clearing_accepts
keyboard_outside_clearing_rejects
keyboard_inside_campfire_keepout_rejects
no_keys_returns_unchanged
legacy_player_position_mutation_matches_accepted_result
```

## Handoff

Do not rewrite controls. Wrap the current controls with deterministic action/result records and keep the current feel unchanged.
