# Cloud and Fog Audit: Volumetric Step Recovery Contract

Timestamp: 2026-07-10T16-08-56-04-00

## Current setup

```txt
cloud density recipe + fog density recipe + startup quality
  -> createAtmosphereVolumeTextures()
  -> WebGPU compute storage textures or deterministic CPU fallback
  -> volumetric cloud renderer
  -> rolling fog renderer
  -> post pipeline
```

Volume textures are built once. Runtime adaptive quality changes sampling and post-resolution settings rather than rebuilding density fields.

## Current adaptive mutations

```txt
cloudRenderer.setStepScale(activeScale)
fogRenderer.setStepScale(activeScale)
postPipeline.setFogResolutionScale(...)
renderer.setPixelRatio(...) when level > 0
```

## Contract gaps

- No absolute readback reports effective cloud steps after scaling.
- No absolute readback reports effective fog steps after scaling.
- No transition result reports requested and applied fog resolution scale.
- Volume texture dimensions and source are omitted from quality transitions.
- No consumer apply result proves cloud, fog, and post accepted the same target level.
- No fixture proves exact restore values after `2 -> 1 -> 0`.
- No render record identifies the volumetric settings consumed by a frame.

## Required quality state

```txt
VolumetricQualityState
  level
  cloudStepScale
  effectiveCloudSteps
  fogStepScale
  effectiveFogSteps
  fogResolutionScale
  cloudTextureSize
  fogTextureSize
  volumeSource
  rebuildRequired: false
```

## Recovery rule

Recovery must apply the complete level target, not reverse prior deltas. Level `0` must explicitly set:

```txt
cloudStepScale = 1
fogStepScale = 1
fogResolutionScale = startup quality.fogResolutionScale
pixelRatio = min(device DPR, startup quality.pixelRatioCap)
```

## Decision

Do not retune cloud shape, density, erosion, lighting, fog placement, or ray-step budgets. First prove that the existing values transition and recover exactly.