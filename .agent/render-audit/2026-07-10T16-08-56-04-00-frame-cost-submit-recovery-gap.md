# Render Audit: Frame Cost, Submit Order, and Recovery Gap

Timestamp: 2026-07-10T16-08-56-04-00

## Current frame order

```txt
animation callback(now)
  -> frameMs = now - last
  -> dt = frameMs / 1000
  -> scenario.tick(dt)
  -> scenario.getRenderSnapshot()
  -> camera projection
  -> worldRenderer.update()
  -> foamRenderer.update()
  -> performanceBudget.sample(frameMs)
  -> possible applyPerformanceLevel(level)
  -> postPipeline.render()
```

## Timing interpretation

The current `frameMs` is the interval between animation callbacks. It is useful as a presentation cadence signal, but it is not a direct measurement of the `postPipeline.render()` call that follows the sample and it is not GPU timestamp duration.

`WebGPURenderer` is created with `trackTimestamp: true`, but the route does not consume a timestamp result. Diagnostics and policy should therefore describe the current metric as RAF interval or callback interval, not GPU frame time.

## Quality actuation

```txt
level 0
  cloud step scale = 1
  fog step scale = 1
  fog resolution scale = quality.fogResolutionScale
  DPR mutation = none

level 1
  cloud/fog step scale = 0.78
  fog resolution multiplier = 0.82
  DPR cap multiplier = 0.88

level 2
  cloud/fog step scale = 0.62
  fog resolution multiplier = 0.68
  DPR cap multiplier = 0.76
```

## Recovery defect

When the policy recovers from level `1` to level `0`, cloud/fog scale and fog resolution are restored, but DPR remains at the level `1` reduced value because `renderer.setPixelRatio()` only runs when `level > 0`.

The system can therefore report level `0` while rendering at a reduced pixel ratio.

## Render-proof gaps

- No render-submission record identifies which quality state was active.
- No per-consumer apply result exists.
- No exact current DPR is included in `getState()`.
- No explicit startup DPR snapshot exists for restoration.
- No timing source label exists.
- No GPU timestamp support/fallback result exists.
- No ordering proof links the transition to the submission that consumed it.

## Required render contract

```txt
before submit
  resolve normalized timing sample
  evaluate policy
  apply complete absolute quality state if required
  record apply results

submit
  record frameId, qualityStateId, camera state, consumer state, and submit status

after submit or asynchronous GPU readback
  attach CPU/GPU timing result to the correct frame without rewriting prior history
```

## Safe next action

Implement a fake-renderer Node fixture first. It should prove exact values sent to cloud, fog, post, and DPR adapters for every transition and full recovery to startup state.