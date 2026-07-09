# Interaction Audit: Input / Movement / Rail Fixture Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-38-20-04-00`

## Current interaction model

The route is not a menu-driven app. It is a camera-transition island route with a first-person unlock.

```txt
wheel
  -> progress = clamp01(progress + deltaY * -0.0014)

pointer drag before first-person
  -> yaw mutates when progress < 0.85

pointer drag after first-person
  -> yaw and pitch mutate when progress >= 0.985

keyboard movement
  -> only active when progress >= 0.985
  -> WASD builds a movement vector
  -> valid(next) decides whether to copy next into player.position
```

## Interaction domains

```txt
input-state-domain
wheel-progress-domain
pointer-look-domain
keyboard-movement-domain
scroll-progress-domain
first-person-unlock-domain
movement-validity-domain
camera-rail-domain
input-journal-domain
planned-action-result-domain
planned-fixture-replay-domain
```

## Services in use

```txt
keyboard Set capture
wheel progress mutation
pointer drag state capture
pointer yaw mutation before first-person
pointer yaw/pitch mutation after first-person
first-person movement vector integration
movement validity check using clearing radius and campfire keepout
rail camera sampling while progress < 0.985
```

## Gaps

```txt
No BrowserInputActionFrame exists.
No ActionResult records whether input was applied, skipped, or rejected.
No movement result records accepted/rejected-outside-clearing/rejected-campfire-keepout.
No bounded input journal exists.
No fixture row proves start/mid/near/first-person rail states.
```

## Required contract

```txt
BrowserInputActionFrame:
  inputType
  timestamp
  progressBefore
  progressAfter
  playerBefore
  playerAfter
  cameraMode

ActionResult:
  status: accepted | rejected | skipped | unchanged
  reason
  changed
  publishable

MovementPolicyResult:
  accepted
  reason
  nextPosition
  playerPositionAfter

CameraRailSnapshot:
  progress
  easedProgress
  mode: rail | first-person
  cameraPosition
  lookTarget
  playerAnchor
```

## Stop condition for next ledge

```txt
DOM-free fixture proves:
  wheel progress accepted
  wheel clamped at 0..1
  pointer ignored without drag
  pointer yaw before first-person
  pointer yaw/pitch after first-person
  keyboard skipped before progress >= 0.985
  movement accepted inside clearing
  movement rejected outside clearing
  movement rejected near campfire
  rail snapshots at start/mid/near/first-person handoff
```
