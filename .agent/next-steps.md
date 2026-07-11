# Next Steps: MyCozyIsland

Last updated: `2026-07-11T12-58-06-04-00`

## Summary

Keep Dynamic Environment Frame Authority behind runtime-session, Core World and render-commit ownership. When those exist, replace startup-frozen environment descriptors with one deterministic frame transaction shared by all gameplay and render consumers.

## Plan ledger

**Goal:** implement coherent dynamic environment state without allowing independent consumer clocks or partial visual updates.

- [ ] Complete Runtime Session Lifecycle Authority.
- [ ] Complete Core World Reset / Re-prepare Authority.
- [ ] Complete focus, materialization and render commit authority.
- [ ] Define a versioned `EnvironmentFrame` schema.
- [ ] Add session, generation, simulation tick and monotonic clock admission.
- [ ] Derive wind, weather, illumination, cloud, fog, ocean, vegetation and campfire state from one clock sample.
- [ ] Add immutable frame revision and fingerprint.
- [ ] Add prepare/commit/rollback adapters for every dynamic consumer.
- [ ] Publish canonical effective environment state and consumer receipts.
- [ ] Derive reset from a canonical baseline frame.
- [ ] Correlate one visible render frame with the committed environment revision.
- [ ] Add deterministic replay, reset, stale-frame, failure and WebGPU/WebGL2 fixtures.

## Ordered implementation queue

```txt
1. Runtime Session Lifecycle Authority
2. Core World Reset / Re-prepare Authority
3. Pinned Core World Focus Transaction Authority
4. Live Materialization Readiness Commit Authority
5. Core World Render Commit Authority
6. Camera Rail Baseline Authority
7. Dynamic Environment Frame Authority
8. Adaptive Quality Transaction Authority
```

## Candidate environment-frame kits

```txt
environment-frame-schema-kit
environment-frame-id-kit
environment-clock-sample-kit
environment-frame-admission-kit
wind-frame-kit
weather-frame-kit
illumination-frame-kit
cloud-environment-frame-kit
fog-environment-frame-kit
ocean-environment-frame-kit
vegetation-wind-frame-kit
campfire-smoke-frame-kit
environment-consumer-plan-kit
environment-consumer-prepare-kit
environment-consumer-commit-kit
environment-consumer-rollback-kit
environment-frame-result-kit
environment-frame-fingerprint-kit
environment-frame-ack-kit
environment-reset-baseline-kit
environment-frame-journal-kit
environment-consumer-coherence-fixture-kit
environment-reset-replay-fixture-kit
browser-environment-frame-smoke-kit
```

## Required frame shape

```txt
EnvironmentFrame {
  id
  revision
  sessionId
  sessionGeneration
  simulationTickId
  elapsedSeconds
  weather
  wind
  illumination
  clouds
  fog
  ocean
  vegetationWind
  campfireSmoke
  fingerprint
}
```

## Required transaction

```txt
admit ClockSample
  -> derive candidate EnvironmentFrame
  -> verify expected revision
  -> build exact consumer plan
  -> prepare all consumers
  -> commit all consumers
  -> rollback all on any failure
  -> publish EffectiveEnvironmentState
  -> render one frame
  -> publish EnvironmentFrameReceipt
  -> return detached EnvironmentFrameResult
```

## Consumer set

```txt
sky gradient
hemisphere light
sun transform/color/intensity
renderer exposure
scene fog
cloud lighting/shadow/horizon
fog density/advection/placement
ocean and foam
vegetation sway
campfire smoke
debug and public observations
```

## Fixture matrix

```txt
same seed and tick sequence -> same fingerprints
clock advance -> all consumers share one revision
wind parity across vegetation/campfire/cloud/fog
illumination parity across sky/sun/hemisphere/exposure
reset -> canonical initial frame
stale session/generation/tick/revision rejection
duplicate frame idempotency
consumer prepare rejection
consumer commit failure rollback
WebGPU/WebGL2 consumer parity
first visible frame acknowledgement
```

## Acceptance conditions

```txt
one clock sample produces one environment frame
all consumers share one revision and fingerprint
no partial environment state survives failure
reset reproduces the baseline frame
retired sessions cannot mutate consumers
observations expose every effective environment field
one visible frame acknowledges the committed revision
```
