# Cloud system audit: volume texture cloud/fog journal

Timestamp: `2026-07-10T11-38-03-04-00`

## Current cloud/fog path

```txt
createCloudWeatherState
  -> createCloudDensityRecipe
  -> createCloudLightingProfile
  -> createCloudLodPolicy
  -> createCloudShadowDescriptor
  -> createCloudHorizonBandDescriptor
  -> createFogDensityRecipe
  -> createFogAdvectionDescriptor
  -> createFogVolumePlacement
  -> createAtmosphereVolumeTextures
  -> createVolumetricCloudRenderer
  -> createRollingFogRenderer
  -> createWebGPUPostPipeline
```

## Current strengths

- Cloud and fog have source descriptors.
- Volume texture creation supports WebGPU compute and fallback source labels.
- Cloud/fog step scales are performance-adjustable.
- Debug overlay reports cloud/fog step counts.

## Current gaps

- No `VolumeTextureResult` row records source, size, backend, recipe ids, or fallback path.
- No journal ties cloud/fog recipes to renderer consumers.
- No performance row explains step-scale changes.
- No JSON-safe cloud/fog state block exists outside aggregate `CozyIsland.getState()`.

## Needed rows

```txt
CloudDensityReadback
FogDensityReadback
VolumeTextureResult
CloudRendererConsumption
FogRendererConsumption
FogPostPipelineConsumption
PerformanceScaleResult
```

## Safe next target

Add journal/readback rows for cloud and fog volume texture creation before any visual cloud/fog rewrite.
