# Interaction audit: quality transition command/result map

**Timestamp:** `2026-07-18T06-40-59-04-00`

## Current implicit interaction

```txt
requestAnimationFrame
  -> performanceBudget.sample(frameMs)
  -> internal moving average and counters
  -> callback(level)
  -> direct host mutations
```

The transition is callback-driven and has no durable identity, command result, effect plan, readback or matching-frame acknowledgement.

## Proposed command/result interaction

```txt
AdaptiveQualitySampleCommand
  sampleId
  rendererGeneration
  frameMs
  currentLevel

AdaptiveQualitySampleResult
  movingAverage
  targetFrameMs
  evidenceClass
  proposedLevel

QualityTransitionAdmissionCommand
  sampleId
  currentLevel
  proposedLevel
  rendererGeneration

QualityTransitionAdmissionResult
  transitionId
  qualityGeneration
  acceptedLevel
  reason

QualityEffectPlanCommand
  transitionId
  acceptedLevel
  staticQualityTier
  devicePixelRatio

QualityEffectPlanResult
  cloudStepScale
  fogStepScale
  fogResolutionScale
  rendererPixelRatio

QualityTransitionSettlementCommand
  transitionId
  requestedEffects
  appliedEffects

QualityTransitionSettlementResult
  status: degraded | recovered | retained | rejected-stale | failed
  mismatchList
  effectDigest

QualityProjectionCommitCommand
  qualityGeneration
  effectDigest
  frameId

FirstAdaptiveQualityBoundFrameAck
  qualityGeneration
  rendererGeneration
  frameId
```

## Interaction rules

- Degrade and recover must use the same effect resolver.
- Repeating the same transition must be idempotent.
- Older renderer or lifecycle generations must be rejected.
- Resize must reapply the accepted effect plan.
- Diagnostics must distinguish requested level from applied state.
- A quality level is not settled until all effects are read back.

This map is proposed documentation only.