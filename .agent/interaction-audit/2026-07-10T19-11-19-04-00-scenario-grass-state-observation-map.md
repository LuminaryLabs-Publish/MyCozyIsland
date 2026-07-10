# Interaction Audit: Scenario and Grass State Observation Map

Timestamp: `2026-07-10T19-11-19-04-00`

## Input loop

```txt
wheel
pointer drag
keyboard
blur
resize
debug toggle
  -> cameraSequence.input
  -> scenario.tick(dt)
  -> scenario render snapshot
  -> camera projection
```

Grass is not directly interactive. Its relevant interaction boundary is observation: camera movement changes what is visible, while host diagnostics should be able to explain what grass source and render state exists.

## Current observation surface

`globalThis.CozyIsland.getState()` reports:

```txt
backend
quality
camera
clock
performance
volumetric step counts
kit count
```

It does not report:

```txt
grass adapter identity
grass source fingerprint
source/accepted/rejected counts
suppressed legacy count
rendered instance count
resource counts
static update policy
disposed state
```

## Required additive observation

```txt
CozyIsland.getState().grass = {
  adapterId,
  policyId,
  sourceFingerprint,
  sourceCount,
  acceptedCount,
  rejectedCount,
  suppressedLegacyCount,
  renderedInstanceCount,
  updateMode,
  resources,
  lifecycle
}
```

The projection must contain no live Three.js objects and must remain stable across camera movement.

## Interaction invariant

Camera input may change view state but must not mutate the grass source ledger, policy ID, or ownership state. Only explicit construction and disposal events may change lifecycle state.