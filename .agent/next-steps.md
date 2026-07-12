# Next Steps: MyCozyIsland

Last updated: `2026-07-12T03-39-52-04-00`

## Summary

Replace mixed scenario, renderer-global, and startup-snapshot time with one immutable `EnvironmentFrameSnapshot`. Every dynamic environment consumer should use the same canonical time and revision, and reset should restart every CPU and GPU phase under one new reset generation.

## Plan ledger

**Goal:** make wind, illumination, ocean, foam, clouds, fog, vegetation, campfire, sky, diagnostics, reset, and visible-frame acknowledgement deterministic and coherent.

- [ ] Assign a stable environment clock source ID.
- [ ] Add monotonic clock and environment frame revisions.
- [ ] Add a reset generation shared by scenario and rendering.
- [ ] Evaluate wind and illumination once per admitted environment frame.
- [ ] Regenerate or update cloud, fog, campfire, and vegetation descriptors from that frame.
- [ ] Replace direct TSL global `time` use with a canonical render-time uniform.
- [ ] Bind ocean, cloud, and fog shaders to the same time used by world and foam updates.
- [ ] Update sky, scene fog, exposure, hemisphere light, and sun from the committed frame.
- [ ] Collect typed receipts from every environment render consumer.
- [ ] Reject stale or partial environment consumer generations.
- [ ] Publish one environment frame revision through diagnostics and public readback.
- [ ] Acknowledge the first visible frame after reset.
- [ ] Add clock-divergence, reset-parity, backend-parity, consumer-receipt, and visible-frame fixtures.
- [ ] Keep startup, lifecycle, world, render graph, foam proxy, materialization, camera, and adaptive-quality gaps visible.

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

## Candidate kits

```txt
environment-frame-command-kit
environment-frame-id-kit
environment-frame-revision-kit
environment-clock-source-kit
environment-clock-revision-kit
environment-reset-generation-kit
environment-frame-snapshot-kit
dynamic-wind-evaluation-kit
dynamic-illumination-evaluation-kit
dynamic-atmosphere-evaluation-kit
dynamic-campfire-environment-kit
canonical-render-time-uniform-kit
environment-render-plan-kit
environment-consumer-receipt-kit
environment-frame-commit-kit
stale-environment-frame-rejection-kit
environment-frame-observation-kit
environment-frame-journal-kit
environment-clock-source-divergence-fixture-kit
environment-reset-phase-parity-fixture-kit
environment-visible-frame-parity-smoke-kit
```

## Required data contracts

```txt
EnvironmentFrameCommand {
  commandId
  sessionId
  runtimeGeneration
  resetGeneration
  expectedEnvironmentRevision
  deltaSeconds
  source
}

EnvironmentFrameSnapshot {
  environmentFrameId
  environmentRevision
  clockSourceId
  clockRevision
  resetGeneration
  elapsedSeconds
  wind
  illumination
  cloud
  fog
  ocean
  vegetation
  campfire
  fingerprint
}

EnvironmentConsumerReceipt {
  consumerId
  environmentFrameId
  environmentRevision
  resetGeneration
  canonicalTime
  resourceGeneration
  accepted
  classification
}

VisibleEnvironmentFrameAck {
  frameId
  environmentFrameId
  environmentRevision
  resetGeneration
  canonicalTime
  consumerReceipts[]
  visibleOutputId
}
```

## Minimum fixture matrix

```txt
clock source
  -> all CPU and GPU consumers receive the same canonical time

normal frame
  -> wind, illumination, foam, ocean, cloud, fog, vegetation and campfire cite one revision

reset
  -> all phases restart under one new reset generation

stale render callback
  -> old environment revisions cannot update current uniforms or objects

static descriptor migration
  -> startup descriptors become dynamic evaluations or explicit immutable policy

backend parity
  -> WebGPU and WebGL2 consume equivalent EnvironmentFrameSnapshot values

visible frame
  -> first frame after reset cites the committed environment revision and every required receipt
```

## Acceptance conditions

```txt
one canonical clock owns every dynamic environment consumer
scenario reset restarts CPU and GPU phases together
no renderer-global ambient time bypasses the environment frame
wind and illumination are evaluated from the committed clock revision
all required consumers publish receipts for one revision
stale generations cannot mutate current environment state
public readback exposes environment frame provenance
first visible reset frame cites the new reset generation
```