# Render Audit: Quality Consumer and Frame Correlation Gap

Timestamp: `2026-07-11T12-50-35-04-00`

## Current mutation path

```txt
performance level
  -> cloudRenderer.setStepScale
  -> fogRenderer.setStepScale
  -> postPipeline.setFogResolutionScale
  -> renderer.setPixelRatio when level > 0
  -> postPipeline.render
```

## Findings

- The consumer sequence is not staged or atomic.
- Cloud and fog expose only current step counts.
- The post pipeline exposes no getter for its effective fog resolution scale.
- The renderer pixel ratio is not included in the effective adaptive state.
- Returning to level 0 skips `renderer.setPixelRatio`, leaving the degraded value active.
- The debug overlay reports the budget level and selected step counts, not a consumer-complete quality revision.
- No render frame carries `qualityRevision` or `qualityFingerprint`.
- No consumer acknowledges which revision it consumed.
- No frame proves that all quality consumers changed together.

## Required committed frame

```txt
QualityFrameReceipt {
  frameId
  sessionId
  sessionGeneration
  rendererGeneration
  qualityRevision
  qualityFingerprint
  cloudSteps
  fogSteps
  fogResolutionScale
  pixelRatio
  consumerAcks[]
  status
}
```

## Render acceptance

A transition is visible only when one frame reports the committed values for every adaptive consumer. A budget level alone is not sufficient evidence.
