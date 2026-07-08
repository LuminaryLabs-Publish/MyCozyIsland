# Interaction Audit — Action / Movement Consumer Splice Map

**Timestamp:** `2026-07-08T14-58-49-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Current interaction surface

`src/main-cloudform.js` owns all interaction state inline.

```txt
keys: Set<string>
progress: number
drag: { x, y } | null
player.position
player.yaw
player.pitch
wheel handler mutates progress
pointer handlers mutate drag/yaw/pitch
keydown/keyup mutate keys
fp(dt) reads keys and mutates player position
valid(next) returns boolean only
```

## Current behavior to preserve

```txt
wheel advances or reverses the scroll rail
pointer drag rotates the sky/camera before first-person mode
pointer drag controls yaw/pitch in first-person mode
keyboard movement is ignored until progress >= 0.985
movement speed remains 2.6 * dt
movement must stay inside the clearing radius
movement must stay outside campfire keepout radius 2.35
camera is written directly in fp(dt) after accepted movement
```

## Missing proof records

```txt
ActionFrame is missing.
ActionResult is missing.
Action rejection reasons are missing.
Input journal is missing.
MovementPolicyResult is missing.
ClearingBoundaryResult is missing.
CampfireKeepoutResult is missing.
CameraRailSnapshot is missing.
CozyIslandHost action/movement diagnostics are missing.
```

## Consumer splice target

Keep the current imperative behavior, but wrap it with readback records.

```txt
wheel event
  -> ActionFrame(type: wheel-progress)
  -> ActionResult(accepted, changedFields: [progress])
  -> existing progress mutation remains

pointermove before first-person
  -> ActionFrame(type: pointer-yaw-preview)
  -> ActionResult(accepted or no-op)
  -> existing yaw mutation remains

pointermove after first-person
  -> ActionFrame(type: pointer-look)
  -> ActionResult(accepted or no-op)
  -> existing yaw/pitch mutation remains

fp(dt)
  -> ActionFrame(type: keyboard-move)
  -> MovementPolicyResult
  -> ActionResult(accepted / no-op / rejected)
  -> existing player mutation only when valid

rail()
  -> CameraRailSnapshot
  -> existing camera position/look write remains
```

## Reason catalog

```txt
accepted-progress
accepted-pointer-yaw
accepted-pointer-look
accepted-movement
no-op-no-drag
no-op-no-keyboard-input
rejected-locked-before-first-person
rejected-clearing-boundary
rejected-campfire-keepout
rejected-invalid-route-progress
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
cozy-camera-rail-samples-001
```

## Stop line

Do not replace the current event handlers yet. First add the pure action/movement helpers and prove them in fixture rows, then splice the helpers beside the existing mutations.

## Next implementation target

```txt
src/host-proof/action-frame.js
src/host-proof/action-result.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/fixture-cases.mjs
```