# MyCozyIsland Movement Policy Result Matrix

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T11-40-00-04-00`

## Scope

This audit narrows the interaction seam to proofable action and movement records.

No runtime movement code changed.

## Current input model

```txt
wheel:
  changes scroll rail progress inline

pointerdown / pointermove / pointerup:
  stores drag state
  changes yaw before first-person mode
  changes yaw and pitch in first-person mode

keydown / keyup:
  updates a Set of active key codes
  W/S/A/D are sampled by fp(dt)
```

## Current movement model

```txt
first-person gate:
  progress >= 0.985

movement vector:
  W adds forward
  S subtracts forward
  D adds right
  A subtracts right

candidate position:
  current position + normalized movement * 2.6 * dt
  candidate.y = sampleIslandHeight(candidate)

valid(next):
  inside clearing collision radius
  outside campfire keepout radius

accepted:
  player.position.copy(candidate)

rejected:
  no mutation
  no explicit reason record
```

## Missing record contract

```txt
ActionFrame
  id
  type
  tick
  dt
  input
  before
  intendedDelta

ActionResult
  actionId
  accepted
  reason
  changed
  before
  after

MovementPolicyResult
  actionId
  accepted
  reason
  positionBefore
  candidatePosition
  positionAfter
  activePolicies

ClearingBoundaryResult
  insideBoundary
  distanceFromCenter
  maxRadius

CampfireKeepoutResult
  outsideKeepout
  distanceFromCenter
  minRadius
```

## Required rejection reasons

```txt
locked-before-first-person
no-movement-input
clearing-boundary
campfire-keepout
accepted
```

## Fixture matrix

```txt
cozy-keyboard-before-fp-001:
  progress: 0.50
  keys: [KeyW]
  expected: rejected locked-before-first-person

cozy-keyboard-no-input-001:
  progress: 1.00
  keys: []
  expected: no-op no-movement-input

cozy-keyboard-clearing-001:
  progress: 1.00
  keys: [KeyW]
  candidate: inside clearing and outside campfire
  expected: accepted

cozy-keyboard-boundary-001:
  progress: 1.00
  candidate: outside clearing radius
  expected: rejected clearing-boundary

cozy-keyboard-campfire-001:
  progress: 1.00
  candidate: inside campfire keepout radius
  expected: rejected campfire-keepout

cozy-pointer-yaw-001:
  progress: 0.40
  pointer delta x/y
  expected: yaw changes, pitch unchanged

cozy-pointer-look-001:
  progress: 1.00
  pointer delta x/y
  expected: yaw and pitch change with pitch clamp

cozy-wheel-rail-001:
  wheel delta
  expected: scroll progress clamps between 0 and 1
```

## Integration rule

The first implementation should create pure helpers that can be fixture-tested without DOM, canvas, Three.js, or a browser.

`src/main-cloudform.js` should call those helpers only after they pass.

## Stop condition

Stop when `MovementPolicyResult` and `ActionResult` can explain every accepted, rejected, and no-op movement action while the public movement feel remains unchanged.
