# Render Audit: Quality Recovery Pixel-Ratio Commit Gap

Timestamp: `2026-07-10T22-29-21-04-00`

## Startup render state

```txt
renderer.setPixelRatio(min(devicePixelRatio, quality.pixelRatioCap))
renderer.setSize(innerWidth, innerHeight, false)
```

## Dynamic transition table

```txt
level 0:
  activeScale 1.00
  fog resolution 1.00 x startup scale
  pixel ratio target 1.00 x startup cap, but no setPixelRatio call

level 1:
  activeScale 0.78
  fog resolution 0.82 x startup scale
  pixel ratio 0.88 x startup cap

level 2:
  activeScale 0.62
  fog resolution 0.68 x startup scale
  pixel ratio 0.76 x startup cap
```

## Failure sequence

```txt
startup level 0
  -> degrade to level 1
  -> renderer pixel ratio becomes 0.88 x cap
  -> recover to level 0
  -> cloud/fog/post controls restore
  -> renderer pixel ratio remains 0.88 x cap
  -> performance budget reports level 0
```

## Render consequences

- render resolution can remain lower than the declared recovered level
- static `quality.tier` does not reveal the discrepancy
- H diagnostics omit actual pixel ratio and fog resolution
- aggregate host state omits the full applied control vector
- screenshots or visual inspection may attribute softness to the wrong system
- repeated transitions can produce state that cannot be reconstructed from host readback

## Required render proof row

```txt
qualityTransitionId
requestedLevel
admittedLevel
previousAppliedLevel
targetPixelRatio
observedPixelRatio
targetCloudSteps
observedCloudSteps
targetFogSteps
observedFogSteps
targetFogResolutionScale
observedFogResolutionScale
result
reason
```

## Decision

Do not retune any visual system until full recovery is proven to restore every control to its startup target.
