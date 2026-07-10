# Render audit: WebGPU render consumption journal gap

Timestamp: `2026-07-10T11-38-03-04-00`

## Render surface exists

`MyCozyIsland` has a WebGPU/Three render surface.

## Current render consumers

```txt
WebGPURenderer
stylized world renderer
WebGPU ocean renderer
WebGPU foam renderer
atmosphere volume texture generator
volumetric cloud renderer
rolling fog renderer
WebGPU post pipeline
performance budget consumer
debug overlay consumer
```

## Current render loop

```txt
renderer.setAnimationLoop(now)
  -> compute frameMs / dt
  -> domains.scenario.tick(dt)
  -> renderState = domains.scenario.getRenderSnapshot()
  -> copy camera position/lookAt from renderState
  -> worldRenderer.update(elapsedSeconds)
  -> foamRenderer.update(elapsedSeconds)
  -> performanceBudget.sample(frameMs)
  -> postPipeline.render()
  -> every 12 frames draw debug overlay
```

## Render proof gaps

- No render-consumption ledger maps source descriptor families to the consumers that used them.
- No fixture-safe row proves which render snapshot reached world/ocean/foam/cloud/fog/post.
- No normalized render snapshot exists for stable Node assertions.
- Volume texture results expose live texture objects through `volumeTextures`, not JSON-safe rows.
- Performance degrade/recover mutates scale and pixel ratio but has no reason/result journal.
- Legacy `CozyIsland.getState()` is aggregate and does not expose per-consumer proof.

## Do not do next

```txt
renderer replacement
cloud rewrite
ocean rewrite
fog rewrite
camera retune
visual polish
```

## Do next

```txt
render-snapshot-normalizer-kit
volume-texture-result-kit
performance-level-result-kit
render-consumption-ledger-kit
cozy-island-host-readback-kit
node-webgpu-consumer-fixture-kit
```
