# Interaction Audit: Input / Rail / Action Result Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-20-00-04-00`

## Current input loop

```txt
keyboard:
  keydown -> keys.add(e.code)
  keyup -> keys.delete(e.code)

wheel:
  e.preventDefault()
  progress = clamp01(progress + e.deltaY * -0.0014)

pointer:
  pointerdown stores drag origin
  pointermove mutates yaw before first-person
  pointermove mutates yaw/pitch after first-person
  pointerup clears drag

movement:
  progress >= 0.985 unlocks first-person
  WASD builds movement vector
  valid(next) accepts only inside clearing radius and outside campfire keepout
```

## Current services

```txt
keyboard capture
wheel progress mutation
pointer yaw/pitch mutation
rail camera handoff
first-person movement integration
movement validity check
camera position/look projection
```

## Missing result records

```txt
BrowserInputActionFrame
ActionResult
InputJournalEntry
MovementPolicyResult
CameraRailSnapshot
```

## Required result coverage

```txt
wheel-progress-accepted
wheel-progress-clamped-low
wheel-progress-clamped-high
pointer-yaw-rail
pointer-yaw-pitch-first-person
movement-accepted
movement-rejected-outside-clearing
movement-rejected-campfire-keepout
rail-camera-start
rail-camera-mid
rail-camera-near-eye
first-person-camera-handoff
```

## Main interaction finding

The route has playable input, but actions are mutation-only. The next cut should wrap existing behavior with result records instead of changing control feel.
