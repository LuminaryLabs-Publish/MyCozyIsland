# Gameplay Audit: Scenario, Camera, and Performance Loop

Timestamp: 2026-07-10T16-08-56-04-00

## Current playable loop

```txt
scroll through authored aerial rail
  -> approach island and clearing
  -> rail reaches first-person threshold
  -> WASD movement activates
  -> Shift changes movement speed
  -> drag changes first-person yaw/pitch
  -> movement stays inside clearing annulus
  -> terrain height seats the player
  -> environment clock continues
  -> scenario returns camera and world snapshot
```

## Scenario authority

`createCozyIslandScenario()` is intentionally thin:

```txt
tick(dt)
  -> clock.tick(dt)
  -> cameraSequence.tick(dt)

getRenderSnapshot()
  -> immutable startup snapshot
  -> current clock state
  -> current camera descriptor
```

The scenario does not own adaptive quality. That separation is correct.

## Current coupling

The animation host performs scenario tick, camera projection, performance sampling, quality mutation, and render submission in one callback without producing an ordered frame record.

This prevents proof of:

- which scenario snapshot was active when a transition occurred
- whether a rail-to-first-person change coincided with a load spike
- whether movement or camera state changed before the sampled interval
- which quality state rendered the frame

## Required frame row

```txt
ScenarioFrame
  frameId
  deltaSeconds
  clockBefore
  clockAfter
  cameraBefore
  cameraAfter
  consumedInputIds
  performanceSampleId
  transitionId
  renderSubmitId
```

## Gameplay preservation rule

The adaptive-quality pass must not alter:

- rail control curve
- rail threshold
- first-person movement speed
- clearing bounds
- eye height
- terrain sampling
- camera yaw/pitch behavior
- environment clock progression

## Safe next action

Wrap the existing scenario loop with frame identity and performance transition references. Do not move gameplay rules into the performance domain.