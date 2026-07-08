# Interaction Audit: Action + Movement Fixture Sync

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-09-48-04-00`

## Current interaction surface

```txt
wheel
  -> progress = clamp01(progress + deltaY * -0.0014)

pointerdown
  -> drag = { x, y }

pointermove while dragging
  -> if progress >= 0.985, mutate player yaw and pitch
  -> else if progress < 0.85, mutate orbit yaw

keyboard
  -> keydown adds e.code
  -> keyup removes e.code
  -> fp(dt) reads KeyW / KeyS / KeyA / KeyD only when progress >= 0.985

movement
  -> next position built from player.forward/right vectors
  -> valid(next) checks clearing radius and campfire keepout
  -> accepted movement mutates player.position
  -> rejected movement silently drops the update
```

## Gap

Input and movement are playable, but no deterministic result records exist.

The browser host should produce additive proof records without changing the current player-visible loop.

## Required ActionFrame shape

```txt
ActionFrame
  id
  type
  timestampMode
  before
  input
  routeVersion
  progress
  firstPersonUnlocked
```

## Required ActionResult shape

```txt
ActionResult
  id
  actionId
  status: accepted | rejected | noop
  reason
  changedFields[]
  before
  after
```

## Required movement reasons

```txt
locked-before-first-person
no-movement-input
movement-accepted
clearing-boundary-rejected
campfire-keepout-rejected
```

## Required source files

```txt
src/host-proof/action-frame.js
src/host-proof/action-result.js
src/host-proof/movement-policy-result.js
src/host-proof/fixture-cases.mjs
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

## Browser splice points

```txt
canvas wheel handler
canvas pointerdown handler
canvas pointerup handler
canvas pointermove handler
keydown/keyup key-state handling
fp(dt)
valid(next)
globalThis.CozyIslandHost action journal projection
```

## Guardrail

Do not tune speed, input sensitivity, scroll sensitivity, progress threshold, clearing radius, campfire keepout, or camera math in this implementation slice.
