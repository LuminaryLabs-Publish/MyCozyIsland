# Host Proof Audit: Performance Transition Journal Contract

Timestamp: 2026-07-10T16-08-56-04-00

## Current public surface

`globalThis.CozyIsland` exposes renderer, scene, camera, descriptors, consumers, performance budget, and aggregate `getState()` output.

This is useful for live debugging but unsuitable as deterministic proof because it contains mutable Three/WebGPU objects and no ordered transition history.

## Required additive surface

```txt
globalThis.CozyIslandPerformanceHost
  getState()
  getLastSample()
  getLastTransition()
  getTransitions({ limit })
  getFrame(frameId)
  resetProof()
```

Do not remove or repurpose `globalThis.CozyIsland`.

## JSON-safe state contract

```txt
{
  sourceRevision,
  routeProfile,
  startupQuality,
  currentQuality,
  metricSource,
  movingAverage,
  target,
  overBudgetFrames,
  underBudgetFrames,
  lastSample,
  lastTransition,
  transitionCount,
  droppedTransitionCount,
  transitions
}
```

## Transition row

```txt
{
  sequence,
  frameId,
  transitionId,
  previousLevel,
  requestedLevel,
  appliedLevel,
  status,
  reason,
  metric: { source, valueMs, movingAverageMs, targetMs },
  appliedState,
  consumerResults,
  renderSubmitId
}
```

## Journal policy

- Fixed capacity set at host creation.
- Strictly increasing sequence.
- Oldest-first deterministic eviction.
- Explicit dropped-record count.
- Reset clears counters and records and restores startup quality through the same applier.
- Returned values are copies or frozen JSON-safe rows.

## Required fixture proof

- A deterministic sample stream produces the same transitions every run.
- Every transition applies one complete target state.
- Consumer failures are retained as typed results.
- Recovery to level `0` restores startup DPR.
- Journal overflow is deterministic.
- `JSON.stringify(host.getState())` succeeds.
- No DOM, Three.js, renderer, or GPU object is required.