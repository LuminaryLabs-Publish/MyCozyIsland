# Cloud system audit: volume texture cloud/fog readback

Timestamp: `2026-07-10T08-48-58-04-00`

## Current atmosphere source path

```txt
weather + wind
  -> createCloudWeatherState(...)
  -> createCloudDensityRecipe(...)
  -> createCloudLightingProfile(...)
  -> createCloudLodPolicy(...)
  -> createCloudShadowDescriptor(...)
  -> createCloudHorizonBandDescriptor(...)
  -> createFogDensityRecipe(...)
  -> createFogAdvectionDescriptor(...)
  -> createFogVolumePlacement(...)
  -> createAtmosphereVolumeTextures(...)
  -> createVolumetricCloudRenderer(...)
  -> createRollingFogRenderer(...)
```

## Current strengths

The route already has volumetric cloud and rolling fog consumers, and `tests/domain-smoke.mjs` asserts cloud/fog texture sizes for a low-quality deterministic composition.

## Gap

The live host does not expose serializable texture or consumer result rows.

Missing rows:

```txt
CloudDensityFingerprint
CloudLightingReadback
CloudLodReadback
FogDensityFingerprint
FogAdvectionReadback
FogVolumePlacementReadback
AtmosphereVolumeTextureResult
CloudConsumerReadback
FogConsumerReadback
PerformanceStepScaleResult
```

## Risk

Cloud/fog rewrites could improve screenshots but break source-consumer determinism, texture sizing, LOD policy, or performance degrade/recover behavior.

## Next safe cut

Add JSON-safe cloud/fog volume texture and consumer readback rows before changing cloud appearance, fog behavior, or WebGPU compute strategy.
