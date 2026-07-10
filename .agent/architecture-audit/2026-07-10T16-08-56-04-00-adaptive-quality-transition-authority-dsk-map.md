# Architecture Audit: Adaptive Quality Transition Authority DSK Map

Timestamp: 2026-07-10T16-08-56-04-00

## Current ownership map

```txt
render-quality-domain-kit
  chooses startup tier and immutable startup configuration

webgpu-performance-budget-kit
  owns target frame interval
  owns exponential moving average
  owns estimated FPS
  owns over-budget and under-budget counters
  owns level 0..2
  decides degrade/recover transitions
  invokes callbacks

src/main-cloudform.js host adapter
  computes callback interval
  calls performanceBudget.sample(frameMs)
  owns applyPerformanceLevel()
  mutates cloud step scale
  mutates fog step scale
  mutates fog render resolution
  conditionally mutates renderer DPR

cloud/fog/post/renderer consumers
  accept isolated mutation calls
  expose partial current values

legacy CozyIsland diagnostics
  returns aggregate performance and volumetric state
```

## Boundary problem

The current `webgpu-performance-budget-kit` decides a semantic transition but does not own the complete target state or its application result. The host adapter performs side effects without returning a transaction record.

This creates four authority splits:

```txt
metric semantics
  animation host computes an unnamed callback interval

policy
  performance budget decides level transitions

actuation
  main-cloudform mutates selected consumers inline

proof
  aggregate diagnostics expose only current values
```

## Recommended DSK decomposition

### Small domains

```txt
frame-cost-sampler-kit
  input: timestamp/cpu/gpu samples
  output: normalized metric record with explicit source

quality-state-descriptor-kit
  input: startup quality and adaptive level
  output: complete immutable target settings

quality-transition-result-kit
  input: previous state, requested state, apply result
  output: typed accepted/no-change/rejected transition row
```

### Mid domains

```txt
adaptive-quality-policy-kit
  owns moving average, thresholds, counters, level decisions, reset

quality-state-applier-kit
  owns absolute application to cloud, fog, post, and DPR adapters
  returns per-consumer apply outcomes

performance-transition-journal-kit
  owns bounded ordered transition history
```

### Adapter domains

```txt
gpu-timestamp-readback-kit
  converts supported renderer timing into optional normalized samples

render-submit-correlation-kit
  links applied quality state to the frame submission that consumed it

cozy-island-performance-host-kit
  exposes JSON-safe state, counters, last transition, and bounded history
```

### Fixture domain

```txt
node-adaptive-quality-fixture-kit
  supplies deterministic sample streams and fake consumer adapters
  proves transition order, application, recovery, reset, and serialization
```

## Required service contracts

```txt
FrameCostSample
  sequence
  frameId
  source
  valueMs
  status
  reason

QualityState
  level
  cloudStepScale
  fogStepScale
  fogResolutionScale
  pixelRatio
  unchangedStartupResources

QualityTransitionResult
  sequence
  frameId
  previousLevel
  requestedLevel
  appliedLevel
  status
  reason
  metric
  thresholds
  consumerResults
  appliedState

PerformanceReadback
  currentState
  movingAverage
  counters
  lastSample
  lastTransition
  boundedTransitions
```

## Invariants

- Domain policy never mutates Three/WebGPU objects directly.
- Adapter application never decides whether a transition is warranted.
- Every level maps to a complete absolute state.
- Level `0` explicitly restores startup DPR and volumetric values.
- A same-level request produces a typed no-change result.
- Unsupported GPU timing uses an explicit fallback record.
- All proof surfaces are JSON-safe.
- Legacy `globalThis.CozyIsland` remains available.

## DSK decision

Update the existing performance-budget domain first, but split metric normalization and quality application into focused kits because those responsibilities are outside pure hysteresis policy. Do not create a new large visual domain.