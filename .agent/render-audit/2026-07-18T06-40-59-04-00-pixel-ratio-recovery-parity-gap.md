# Render audit: pixel-ratio recovery parity gap

**Timestamp:** `2026-07-18T06-40-59-04-00`

## Source-backed path

`src/main-adventure.js` installs a gameplay `createPerformanceBudget()` callback pair.

```txt
onDegrade(level)
  cloud step scale     -> applied
  fog step scale       -> applied
  fog resolution scale -> applied
  renderer pixel ratio -> applied

onRecover(level)
  cloud step scale     -> applied
  fog step scale       -> applied
  fog resolution scale -> applied
  renderer pixel ratio -> absent
```

The level scale table is:

```txt
level 0 -> 1.00
level 1 -> 0.78 for cloud/fog; 0.88 for renderer DPR
level 2 -> 0.62 for cloud/fog; 0.76 for renderer DPR
```

A renderer degraded to level 2 can later report level 0 while still using the level-2 DPR multiplier. `resize()` changes dimensions and camera projection, but does not reapply the accepted quality level.

## Render risk

- Budget state and physical drawing-buffer state can diverge.
- Cloud and fog cost can recover while base scene resolution remains degraded.
- Diagnostics show budget level and FPS but not requested or applied DPR.
- A resize, lifecycle resume or renderer replacement has no quality-generation reconciliation result.
- No visible-frame digest proves that the presented frame uses all accepted effects from one level.

## Required render contract — proposed

```txt
QualityEffectPlanResult
  level
  cloudStepScale
  fogStepScale
  fogResolutionScale
  rendererPixelRatio
  viewportWidth
  viewportHeight
  rendererGeneration

QualityEffectReadbackResult
  requested values
  applied values
  mismatches
  drawingBufferWidth
  drawingBufferHeight

FirstAdaptiveQualityBoundFrameAck
  qualityGeneration
  rendererGeneration
  frameId
  appliedEffectDigest
```

## Validation needed

1. Force degrade from level 0 to 1 and 2.
2. Read renderer DPR and drawing-buffer dimensions.
3. Force recovery from 2 to 1 and 0.
4. Verify every effect returns to its target value.
5. Resize at every level and verify reconciliation.
6. Capture matching browser frames and artifact/Pages-origin evidence.

No visual defect or performance regression was reproduced in this documentation run.