# Interaction Audit: Action Result Consumer Wire Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T14-39-38-04-00`

## Current interaction surface

`src/main-cloudform.js` directly installs browser input handlers:

```txt
resize
keydown
keyup
wheel
pointerdown
pointerup
pointermove
```

Current behavior:

```txt
wheel:
  mutates scroll progress

pointer drag before progress 0.85:
  mutates yaw for route orbit

pointer drag after progress 0.985:
  mutates yaw and pitch for first-person look

keyboard movement:
  ignored until progress >= 0.985
  accepted or rejected by valid(next)
```

## Current result gap

The route currently mutates state directly.

There is no stable result contract for:

```txt
wheel progress accepted
wheel clamped at 0 or 1
pointer yaw accepted
pointer look accepted
keyboard ignored before first-person
keyboard no-op because no input
keyboard accepted inside clearing
keyboard rejected by clearing boundary
keyboard rejected by campfire keepout
frame tick accepted
```

## Result contract target

Add `ActionFrame` records:

```txt
{
  id,
  type,
  source,
  timestampMs,
  input,
  before
}
```

Add `ActionResult` records:

```txt
{
  frameId,
  status,
  reason,
  changedFields,
  before,
  after
}
```

Use these statuses:

```txt
accepted
rejected
no-op
```

Use these initial reasons:

```txt
route-progress-updated
route-progress-clamped
pointer-yaw-updated
pointer-look-updated
locked-before-first-person
no-movement-input
clearing-boundary-rejected
campfire-keepout-rejected
movement-updated
frame-tick-updated
```

## Movement policy split

Current `valid(next)` returns one boolean.

Next implementation should split it into:

```txt
createClearingBoundaryResult(next, boundary)
createCampfireKeepoutResult(next, keepout)
createMovementPolicyResult({ progress, input, current, next, boundary, keepout })
```

This allows a fixture to prove the difference between:

```txt
movement locked because the camera rail has not reached first-person
movement no-op because there is no input
movement rejected because it leaves the fenced clearing
movement rejected because it enters the campfire keepout
movement accepted inside the valid ring
```

## Consumer wire target

`src/main-cloudform.js` should eventually become a consumer of result records:

```txt
browser input event
  -> ActionFrame
  -> ActionResult
  -> mutate runtime state only when accepted
  -> append action/result journal
  -> expose latest result through CozyIslandHostSnapshot
```

## Fixture rows

```txt
cozy-wheel-action-progress-001
cozy-pointer-action-yaw-001
cozy-pointer-action-look-001
cozy-keyboard-before-fp-001
cozy-keyboard-no-input-001
cozy-keyboard-clearing-accepted-001
cozy-keyboard-clearing-boundary-rejected-001
cozy-keyboard-campfire-keepout-rejected-001
```

## Guardrail

Do not tune movement speed, rail threshold, yaw sensitivity, pitch clamp, clearing radius, or campfire radius during the proof pass.

The pass should only make the existing rules inspectable.
