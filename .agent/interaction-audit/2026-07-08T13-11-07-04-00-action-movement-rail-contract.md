# Interaction Audit — Action Movement Rail Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T13-11-07-04-00`

## Current interaction loop

```txt
wheel input
  -> mutates scroll progress
  -> rail() samples camera position/look
  -> camera moves from sky/island view into clearing

pointer input
  -> mutates yaw before first-person threshold
  -> mutates yaw/pitch after first-person threshold

keyboard input
  -> ignored until progress >= 0.985
  -> movement vector is built from WASD
  -> movement candidate is checked by valid(next)
  -> accepted movement mutates player.position
  -> rejected movement is silent
```

## Current problem

Input decisions are currently behavior, not data.

The route needs stable records for fixture replay and debugging:

```txt
ActionFrame
ActionResult
MovementPolicyResult
CameraRailSnapshot
InputJournal
ActionJournal
```

## Required action frame shape

```txt
ActionFrame
  id
  frame
  elapsed
  source
  type
  payload
  before
```

Examples:

```txt
wheel-progress
pointer-drag-yaw
pointer-drag-look
keyboard-move
frame-tick
```

## Required action result shape

```txt
ActionResult
  id
  frame
  type
  accepted
  noOp
  reason
  changedFields
  after
```

## Movement policy reason catalog

```txt
accepted
no-movement-input
locked-before-first-person
clearing-boundary
campfire-keepout
invalid-input
```

## Camera rail fixture rows

```txt
cozy-camera-rail-progress-000
cozy-camera-rail-progress-025
cozy-camera-rail-progress-050
cozy-camera-rail-progress-085
cozy-camera-rail-progress-0985
cozy-camera-rail-progress-100
```

Each row should return:

```txt
CameraRailSnapshot
  progress
  easedProgress
  position
  look
  mode
  firstPersonUnlocked
```

## Integration order

```txt
1. Add pure ActionFrame and ActionResult helpers.
2. Add pure MovementPolicyResult helper.
3. Add pure CameraRailSnapshot helper.
4. Add DOM-free fixture rows.
5. Wire browser events to helper records additively.
6. Store last results and journals in globalThis.CozyIslandHost.
7. Preserve globalThis.CozyIsland unchanged.
```

## Guardrail

Do not change movement speed, rail control points, yaw speed, pitch clamp, progress threshold, clearing radius, or campfire keepout radius during this proof pass.
