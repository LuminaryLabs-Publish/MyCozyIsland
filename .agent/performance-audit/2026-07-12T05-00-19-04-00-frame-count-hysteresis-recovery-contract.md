# Performance Audit: Frame-Count Hysteresis and Recovery Contract

Timestamp: `2026-07-12T05-00-19-04-00`

## Current thresholds

```txt
moving average = previous * 0.93 + sample * 0.07

degrade:
  movingAverage > target * 1.26
  90 qualifying frames
  maximum level 2

recover:
  movingAverage < target * 0.86
  360 qualifying frames
  minimum level 0
```

## Cadence dependence

Frame-count dwell changes wall-clock behavior:

```txt
90 frames
  30 Hz: 3.0 s
  60 Hz: 1.5 s
 120 Hz: 0.75 s

360 frames
  30 Hz: 12 s
  60 Hz: 6 s
 120 Hz: 3 s
```

The exponential moving average adds transition latency, but it does not remove the refresh-rate dependency.

## Sample-source problem

The measured value is RAF callback spacing, not an authoritative renderer cost. It can include:

```txt
browser scheduling delay
tab throttling
OS stalls
main-thread work outside rendering
first-frame discontinuity
page resume discontinuity
CPU simulation and materialization
GPU/presentation latency only indirectly
```

`trackTimestamp: true` is enabled on the renderer, but the budget does not consume a GPU timing result.

## Required observation contract

```txt
FrameCostSample {
  source
  cpuMs
  gpuMs
  presentationMs
  callbackDeltaMs
  visibilityState
  runtimeGeneration
  valid
}
```

A policy may choose one or a combination of sources, but it must name the source and reject invalid observations.

## Required hysteresis contract

```txt
over-budget dwell: elapsed milliseconds
under-budget dwell: elapsed milliseconds
deadband: explicit
cooldown after transition: explicit
maximum transition rate: explicit
observation reset after resize/resume: explicit
```

## Recovery contract

Recovery must be the exact inverse of degradation for every mutable consumer:

```txt
DPR target
cloud step scale
fog step scale
fog resolution scale
diagnostic active descriptor
```

Startup-only resources must be marked immutable rather than silently omitted.

## Required fixtures

```txt
cadence parity at 30/60/120 Hz
same timing trace under WebGPU/WebGL2 policy
hidden-tab and resume discontinuity
short spike does not transition
sustained load degrades once
sustained recovery restores exact base state
transition cooldown prevents oscillation
bounded journal and counter state
```