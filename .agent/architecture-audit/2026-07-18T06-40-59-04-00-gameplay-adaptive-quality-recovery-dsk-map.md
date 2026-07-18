# Architecture audit: gameplay adaptive-quality recovery DSK map

**Timestamp:** `2026-07-18T06-40-59-04-00`

## Current ownership

```txt
render-quality-domain-kit
  -> selects static quality tier and base caps

webgpu-performance-budget-kit
  -> observes frame time
  -> owns moving average, hysteresis and level 0..2
  -> emits onDegrade/onRecover callbacks

main-adventure host
  -> translates level into effect scales
  -> mutates cloud steps, fog steps, fog resolution and renderer DPR

webgpu-post-processing-renderer-kit
  -> applies fog target resolution scale

WebGPURenderer
  -> owns physical pixel ratio and drawing buffer
```

## Current authority split

The budget owns **when** a level changes, while the host independently owns **what** the level means. The effect plan is duplicated across `onDegrade` and `onRecover`. The two copies are not equivalent: recovery omits renderer pixel-ratio projection.

## Required DSK boundary — proposed

`cozy-island-gameplay-adaptive-quality-recovery-parity-authority-domain`

```txt
n:cozy-quality:policy
  frame target, thresholds, hysteresis, levels and effect table

n:cozy-quality:transition
  admission, generation identity, stale rejection and apply-once settlement

n:cozy-quality:projection
  cloud, fog, target resolution, renderer DPR and size reconciliation

n:cozy-quality:readback
  actual effect state, diagnostics and mismatch reporting

n:cozy-quality:proof
  transition digest and first matching-frame acknowledgement
```

## Required command/result path

```txt
AdaptiveQualitySampleCommand
  -> AdaptiveQualitySampleResult
  -> QualityTransitionAdmissionCommand
  -> QualityTransitionAdmissionResult
  -> QualityEffectPlanCommand
  -> QualityEffectPlanResult
  -> QualityTransitionSettlementCommand
  -> QualityTransitionSettlementResult
  -> AdaptiveQualityFrameDigest
  -> FirstAdaptiveQualityBoundFrameAck
```

## Smallest safe implementation

1. Create one pure `resolveQualityEffects(level, quality)` function.
2. Create one `applyQualityLevel(level)` host function.
3. Use the same function for degradation, recovery and resize reconciliation.
4. Include renderer pixel ratio in both directions.
5. Read back the budget level and applied renderer/fog/cloud state.
6. Reject stale transitions after lifecycle or renderer-generation replacement.
7. Publish one digest before claiming the first matching frame.

## Kit census impact

Implemented surfaces remain **85**. This audit defines **20 proposed surfaces** and changes no runtime kit.