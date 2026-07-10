# Gameplay Audit: Scenario and Camera Frame Correlation

Timestamp: 2026-07-10T14-42-01-04-00

## Current gameplay loop

The experience is a deterministic scenic camera-rail exploration loop. User input adjusts the camera sequence; each animation frame advances the scenario clock, obtains a render snapshot, projects camera position/look-at, updates visual consumers, and renders.

## Missing gameplay proof

- `scenario.tick(dt)` has no result record.
- `getRenderSnapshot()` is consumed immediately without retained identity.
- Camera values are copied into Three objects without a projection record.
- Autonomous frames and input-affected frames are indistinguishable in diagnostics.
- No row proves the scenario state and camera state used by one submitted frame.

## Required frame chain

```txt
host frame allocated
  -> scenario-step record
  -> scenario render-snapshot identity
  -> camera-projection record
  -> world/foam update records or consumer status
  -> performance transition if any
  -> render-submit record
```

## Suggested scenario record

```txt
kind: scenario-step
frameId
sequence
dt
elapsedBefore
elapsedAfter
cameraRailState
pendingCorrelationIds[]
status
reason
```

## Suggested camera record

```txt
kind: camera-projection
frameId
sequence
scenarioSequence
position
lookAt
fov
aspect
near
far
status
```

## Decision

The gameplay architecture does not need more mechanics next. It needs one deterministic proof chain showing what the scenic interaction loop did per frame.