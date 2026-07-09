# Interaction Audit: Input / Rail / Action Result Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-26-56-04-00`

## Current interaction loop

```txt
keydown / keyup
  -> mutate raw Set keys

wheel
  -> preventDefault
  -> progress = clamp01(progress + deltaY * -0.0014)

pointerdown
  -> store drag start

pointermove while dragging
  -> if progress >= 0.985: mutate player yaw and pitch
  -> else if progress < 0.85: mutate player yaw
  -> update drag point

frame
  -> if progress >= 0.985: first-person movement
  -> else: rail camera sampling
```

## Movement policy

```txt
valid(next)
  -> clearing collision boundary max radius
  -> campfire keepout radius >= 2.35
  -> accepted movement mutates player.position
  -> rejected movement silently does nothing
```

## Current gaps

```txt
no BrowserInputActionFrame
no ActionResult
no InputJournal
no MovementPolicyResult
no rejection reason catalog
no CameraRailSnapshot
wheel/pointer/keyboard changes cannot be fixture-read without browser mutation
```

## Required result rows

```txt
wheel-progress-accepted:
  action: wheel
  result: accepted
  effect: progress changed and clamped

pointer-rail-yaw-accepted:
  action: pointer-drag
  mode: rail
  result: accepted
  effect: yaw changed only when progress < 0.85

pointer-first-person-look-accepted:
  action: pointer-drag
  mode: first-person
  result: accepted
  effect: yaw/pitch changed and pitch clamped

move-accepted:
  action: keyboard-move
  result: accepted
  effect: player position changed

move-rejected-outside-clearing:
  action: keyboard-move
  result: rejected
  reason: outside-clearing-radius

move-rejected-campfire-keepout:
  action: keyboard-move
  result: rejected
  reason: campfire-keepout

rail-snapshot:
  progress: start/mid/near-handoff
  result: camera position/look snapshot
```

## Next implementation target

Create pure host-proof helpers first, then route `src/main-cloudform.js` input consumers through them while preserving visible behavior.
