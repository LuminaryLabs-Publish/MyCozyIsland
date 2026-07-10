# Gameplay audit: scenario camera host journal loop

Timestamp: `2026-07-10T11-38-03-04-00`

## Current gameplay loop

```txt
scroll to descend camera rail
pointer drag to orbit
WASD after landing through scenario input
animation loop ticks cozy island scenario
scenario returns render snapshot
camera copies scenario camera
render consumers update from snapshot
```

## Gameplay domains

```txt
camera-rail-sequence
cozy-island-scenario
scenario-clock
scenario-input
camera-frame
landing-state
movement-state
render-snapshot
```

## Current gaps

- Scenario ticks are not captured as result rows.
- Camera frames are copied into Three camera but not recorded as readback rows.
- Landing/movement state is not journaled in host-readable form.
- Input state and render snapshot are not tied by frame id.
- Node fixture cannot prove camera/scenario behavior without browser execution.

## Needed rows

```txt
ScenarioTickResult
ScenarioStateSnapshot
CameraFrameReadback
CameraRailFrame
MovementResult
LandingStateReadback
HostFrameId
```

## Safe next target

Add a source-owned scenario/camera journal that can be sampled by `CozyIslandHost` and asserted in Node without changing visible gameplay.
