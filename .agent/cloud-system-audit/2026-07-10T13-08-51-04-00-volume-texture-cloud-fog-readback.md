# Cloud System Audit: Volume Texture Cloud/Fog Readback

Timestamp: `2026-07-10T13-08-51-04-00`

## Current cloud/fog source path

```txt
createCloudWeatherState(weather, windField)
  -> createCloudDensityRecipe(cloudWeather, quality)
  -> createCloudLightingProfile(illuminationService)
  -> createCloudLodPolicy(quality)
  -> createCloudShadowDescriptor(cloudWeather, cloudLod)
  -> createCloudHorizonBandDescriptor(cloudWeather)
  -> createFogDensityRecipe(weather, quality)
  -> createFogAdvectionDescriptor(windField)
  -> createFogVolumePlacement(fogDensity)
  -> createAtmosphereVolumeTextures({ renderer, cloudRecipe, fogRecipe, backend })
  -> createVolumetricCloudRenderer(...)
  -> createRollingFogRenderer(...)
```

## What is good

The route has volumetric cloud and rolling fog consumers, GPU/fallback source selection, and quality-linked cloud/fog step scaling.

## Gap

The route does not expose JSON-safe volume texture result rows.

Missing rows:

```txt
volume_texture_result_id
volume_texture_backend
cloud_recipe_fingerprint
fog_recipe_fingerprint
cloud_texture_size
fog_texture_size
cloud_steps
fog_steps
cloud_lod_tier
fog_resolution_scale
fallback_reason
```

## Why this matters

Cloud/fog quality is a major product goal, but changing it without readback rows risks invisible regressions in source recipes, backend selection, fallback behavior, and performance decisions.

## Next proof

Add `volume-texture-result-kit` and verify deterministic cloud/fog rows in the Node consumer fixture before more cloud or fog work.
