# Interaction Audit: Action and Movement Result Rows

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-00-36-04-00`

## Current interaction surface

The interaction loop is small and direct:

```txt
wheel -> progress
pointerdown -> drag start
pointerup -> drag clear
pointermove -> yaw/pitch mutation
keydown/keyup -> key set mutation
frame -> movement, rail, smoke, fire, cloud drift, render
```

The current code works visually, but it does not emit result records.

## Main gap

`src/main-cloudform.js` mutates local state directly.

The future host-proof layer needs to distinguish:

```txt
accepted input
rejected input
no-op input
movement locked before first-person
movement rejected by clearing boundary
movement rejected by campfire keepout
movement accepted and applied
frame tick accepted with render/cloud updates
```

## ActionFrame target

```txt
ActionFrame = {
  schema: "cozy.actionFrame.v1",
  id,
  routeVersion,
  type,
  timestampMode,
  input,
  before
}
```

Supported action types:

```txt
wheel-progress
pointer-drag-start
pointer-drag-end
pointer-look
key-down
key-up
movement-step
frame-tick
```

## ActionResult target

```txt
ActionResult = {
  schema: "cozy.actionResult.v1",
  id,
  actionId,
  status: "accepted" | "rejected" | "no-op",
  reason,
  changedFields,
  before,
  after
}
```

## MovementPolicyResult target

```txt
MovementPolicyResult = {
  schema: "cozy.movementPolicyResult.v1",
  status,
  reason,
  progress,
  inputVector,
  proposedPosition,
  acceptedPosition,
  checks: {
    firstPersonUnlocked,
    insideClearingBoundary,
    outsideCampfireKeepout
  }
}
```

## Required fixture rows

```txt
cozy-wheel-action-progress-001
  input: wheel delta
  expected: accepted progress change with clamp

cozy-pointer-action-yaw-001
  input: pointer move before first-person threshold
  expected: accepted yaw-only result

cozy-pointer-action-look-001
  input: pointer move after first-person threshold
  expected: accepted yaw/pitch result

cozy-keyboard-before-fp-001
  input: W key while progress < 0.985
  expected: rejected/locked-before-first-person

cozy-keyboard-no-input-001
  input: no movement keys
  expected: no-op/no-movement-input

cozy-keyboard-clearing-accepted-001
  input: valid movement inside clearing and outside campfire keepout
  expected: accepted movement

cozy-keyboard-clearing-boundary-rejected-001
  input: proposed position beyond clearing radius
  expected: rejected/clearing-boundary

cozy-keyboard-campfire-keepout-rejected-001
  input: proposed position too close to campfire
  expected: rejected/campfire-keepout
```

## Browser splice point

Wrap event handlers and movement logic additively:

```txt
wheel handler -> ActionFrame/ActionResult
pointer handlers -> ActionFrame/ActionResult
fp(dt) -> MovementPolicyResult
valid(next) -> ClearingBoundaryResult + CampfireKeepoutResult
frame(now) -> frame-tick ActionResult
```

## Guardrail

Do not change movement speed, rail threshold, yaw/pitch sensitivity, clearing radius, or campfire keepout in this pass.