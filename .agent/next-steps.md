# Next Steps: MyCozyIsland

Last updated: `2026-07-12T05-00-19-04-00`

## Summary

Replace the ambient level callback with one active-quality transaction. The transaction must use valid time-based measurements, preserve explicit override policy, apply every mutable consumer symmetrically, restore exact base settings, and acknowledge the first visible frame using the committed quality revision.

## Plan ledger

**Goal:** make adaptive quality stable across refresh rates, resize, visibility changes, degradation, recovery, diagnostics, and WebGPU/WebGL2 rendering.

- [ ] Define `QualityPolicyDescriptor` with fixed/adaptive mode and base tier.
- [ ] Identify timing source as CPU, GPU, presentation, or callback spacing.
- [ ] Reject hidden-tab, suspended, invalid, first-frame, and discontinuity samples.
- [ ] Replace frame-count thresholds with elapsed-time dwell windows.
- [ ] Add monotonic quality transition IDs and revisions.
- [ ] Stage a complete mutable-consumer plan before applying changes.
- [ ] Restore exact base DPR when level returns to zero.
- [ ] Make resize either recompute base policy or preserve it explicitly.
- [ ] Classify startup-only resources separately from mutable consumers.
- [ ] Collect receipts from DPR, cloud, fog, post, and diagnostics adapters.
- [ ] Publish one active-quality descriptor through `CozyIsland.getState()`.
- [ ] Update debug projection to show base tier, active level, revision, DPR, and transition reason.
- [ ] Acknowledge the first visible frame after each accepted transition.
- [ ] Add cadence, recovery, override, visibility, resize, backend, and frame-proof fixtures.
- [ ] Keep earlier startup, lifecycle, world, render, camera, and environment authority gaps visible.

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Render Layer Graph Admission and Physical Resource Binding Authority
4a. Foam Depth Proxy Topology and Lifecycle Authority
5. Core World Reset / Re-prepare Authority
6. Pinned Core World Focus Transaction Authority
7. Live Materialization Readiness Commit Authority
8. Core World Render Commit Authority
9. Camera Rail Baseline Authority
10. Dynamic Environment Frame Authority
11. Adaptive Quality Transaction Authority
```

## Required data contracts

```txt
QualityPolicyDescriptor {
  policyId
  mode
  baseTier
  backend
  source
  pixelRatioCap
  targetFrameMs
  mutableConsumers[]
  immutableConsumers[]
}

FrameCostSample {
  sampleId
  source
  startTime
  endTime
  durationMs
  visibilityState
  valid
  rejectionReason
}

QualityTransitionResult {
  transitionId
  previousRevision
  committedRevision
  previousLevel
  committedLevel
  reason
  dwellMs
  receipts[]
  accepted
}

VisibleQualityFrameAck {
  frameId
  qualityRevision
  level
  pixelRatio
  cloudSteps
  fogSteps
  fogResolutionScale
  outputId
}
```

## Minimum fixture matrix

```txt
cadence parity
  -> 30/60/120 Hz accept transitions after equivalent elapsed time

pixel-ratio recovery
  -> level 2 -> 1 -> 0 restores exact base DPR

override policy
  -> forced tier behaves according to explicit fixed/adaptive contract

visibility
  -> hidden-tab and discontinuity samples do not alter quality

resize
  -> viewport/DPR changes commit one coherent policy revision

partial failure
  -> consumer failure prevents quality revision commit

backend parity
  -> WebGPU and WebGL2 expose equivalent transition semantics

visible frame
  -> first rendered frame cites the committed quality revision and all receipts
```

## Acceptance conditions

```txt
no frame-count-dependent dwell
no sticky reduced DPR after recovery
no ambiguous URL override behavior
no partial consumer transition
no stale callback can mutate current quality
base and active quality are separately identified
public readback and diagnostics cite one quality revision
first visible transition frame is acknowledged
```