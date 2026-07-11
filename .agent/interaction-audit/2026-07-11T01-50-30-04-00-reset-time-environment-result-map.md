# Interaction Audit: Reset, Time, and Environment Result Map

Timestamp: `2026-07-11T01-50-30-04-00`

## Goal

Define how player input, scenario reset, clock changes, and environment consumer updates should produce observable results.

## Current input map

```txt
wheel
  -> camera progress mutation
  -> no typed result

pointer drag
  -> camera yaw/pitch and rail mutation
  -> no typed result

keyboard
  -> pressed-key mutation
  -> no typed result

blur
  -> pressed-key clear
  -> no typed result

scenario reset
  -> clock reset
  -> camera reset
  -> no environment result
  -> no aggregate receipt
```

## Environment interaction implication

Player input does not directly control weather, but it controls session time exposure and reset. Therefore the aggregate scenario receipt should identify input result, simulation tick, clock before/after, camera before/after, environment frame before/after, consumer application summary, and aggregate fingerprint.

## Proposed reset result

```js
{
  accepted: true,
  command: "scenario.reset",
  sessionId,
  priorTick,
  priorEnvironmentFrameId,
  nextEnvironmentFrameId,
  clockReset: true,
  cameraReset: true,
  environmentReset: true,
  consumersApplied,
  fingerprintBefore,
  fingerprintAfter
}
```

## Rejection cases

- stale session
- reset while startup or disposal is in progress
- malformed numeric input
- environment frame generation failure
- consumer failure requiring rollback
- duplicate reset after the same committed reset receipt

## Observation

Input and reset rows should be bounded and JSON-safe. They must not include DOM events, renderer objects, GPU textures, materials, or mutable service handles.
