# Interaction Audit: Input Action Movement Rail Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T08-20-00-04-00`

## Current interaction loop

```txt
resize event
  -> renderer/camera mutation

keydown/keyup
  -> raw Set mutation

wheel
  -> progress += deltaY * -0.0014

pointerdown/up/move
  -> drag state mutation
  -> yaw mutation before first-person
  -> yaw/pitch mutation after first-person

frame
  -> if progress >= 0.985 use first-person movement
  -> else sample rail camera
```

## Current movement policy

```txt
valid(next):
  accepted when distance from campfire center <= clearing collision boundary
  accepted when distance from campfire center >= 2.35
  rejected otherwise
```

## Missing action contract

```txt
BrowserInputActionFrame
ActionResult
InputJournalEntry
MovementPolicyResult
CameraRailSnapshot
```

## Required reason codes

```txt
accepted-wheel-progress
accepted-pointer-yaw
accepted-pointer-yaw-pitch
accepted-keyboard-move
rejected-not-first-person
rejected-outside-clearing
rejected-campfire-keepout
skipped-no-input
```

## Fixture rows needed

```txt
rail-start-progress-0
rail-mid-progress-0.5
rail-near-progress-0.95
first-person-threshold-0.985
keyboard-forward-accepted
keyboard-forward-rejected-campfire
keyboard-forward-rejected-boundary
pointer-yaw-before-first-person
pointer-yaw-pitch-after-first-person
wheel-progress-clamped
```

## Implementation note

Do not change movement feel first. Wrap the existing input/movement decisions with source-owned records, then assert those records in a DOM-free fixture.
