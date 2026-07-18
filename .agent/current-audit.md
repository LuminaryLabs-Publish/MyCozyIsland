# Current audit: gameplay adaptive-quality recovery parity

**Timestamp:** `2026-07-18T06-40-59-04-00`  
**Status:** `gameplay-adaptive-quality-recovery-parity-authority-audited`

## Summary

MyCozyIsland was selected through the oldest synchronized documented-selection rule. The gameplay frame budget degrades and recovers cloud and fog complexity, but renderer pixel ratio is only changed during degradation.

## Source-backed behavior

```txt
src/kits/render-descriptors.js
  -> target frame time comes from static quality tier
  -> moving average uses 0.93 / 0.07 weighting
  -> 90 sustained over-budget samples increment level
  -> 360 sustained under-budget samples decrement level
  -> level is bounded to 0..2

src/main-adventure.js onDegrade
  -> cloud step scale
  -> fog step scale
  -> fog target resolution scale
  -> renderer pixel ratio

src/main-adventure.js onRecover
  -> cloud step scale
  -> fog step scale
  -> fog target resolution scale
  -> renderer pixel ratio restoration is absent

resize
  -> renderer size and camera projection update
  -> accepted quality effect plan is not reapplied or read back
```

## Main gap

A session degraded to level 2 can later recover its budget level to 0 while the renderer remains at the level-2 DPR multiplier. Budget state, cloud/fog cost and physical drawing-buffer resolution can therefore describe different quality levels.

This is a reversible-effect ownership and readback gap, not proof of a measured performance or visual incident.

## Required authority — proposed

`cozy-island-gameplay-adaptive-quality-recovery-parity-authority-domain`

Required results:

- `AdaptiveQualitySampleResult`
- `QualityTransitionAdmissionResult`
- `QualityEffectPlanResult`
- `QualityTransitionSettlementResult`
- `QualityEffectReadbackResult`
- `AdaptiveQualityFrameDigest`
- `FirstAdaptiveQualityBoundFrameAck`

## Domains and services

The composition contains 14 engine-installed core/adventure kits, 50 cataloged world/render/host kits, one additional composition kit, 16 explicit menu domain/kit surfaces and four browser/product adapters. Complete IDs and offered services are recorded in the timestamped tracker and `.agent/kit-registry.json`.

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, simulation, input, save, renderer, tests, workflows, artifacts and deployment were unchanged.