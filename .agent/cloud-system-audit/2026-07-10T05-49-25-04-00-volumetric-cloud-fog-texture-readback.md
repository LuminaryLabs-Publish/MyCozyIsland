# Cloud System Audit: Volumetric Cloud/Fog Texture Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-10T05-49-25-04-00`

## Current cloud/fog surface

```txt
createCloudWeatherState(weather, windField)
createCloudDensityRecipe(cloudWeather, quality)
createCloudLightingProfile(illuminationService)
createCloudLodPolicy(quality)
createCloudShadowDescriptor(cloudWeather, cloudLod)
createCloudHorizonBandDescriptor(cloudWeather)
createFogDensityRecipe(weather, quality)
createFogAdvectionDescriptor(windField)
createFogVolumePlacement(fogDensity)
createAtmosphereVolumeTextures({ renderer, cloudRecipe, fogRecipe, backend })
createVolumetricCloudRenderer(...)
createRollingFogRenderer(...)
performance level changes call cloudRenderer.setStepScale and fogRenderer.setStepScale
```

## Existing proof

`tests/domain-smoke.mjs` asserts cloud and fog texture sizes in low-quality deterministic composition. `tests/static-check.mjs` asserts WebGPU renderer source tokens.

## Gaps

```txt
No browser-time volume texture creation result.
No cloud/fog recipe fingerprint row.
No backend/source row for GPU vs fallback texture generation.
No cloud/fog step-scale result row.
No performance degradation causal row.
No cloud/fog render consumer ledger row.
No serializable cloud/fog host readback beyond aggregate steps.
```

## Next fixture rows

```txt
cloud recipe fingerprint
fog recipe fingerprint
backend -> texture source result
cloud texture size / fog texture size
cloudRenderer steps before/after performance level
fogRenderer steps before/after performance level
cloud/fog render consumption row
JSON-safe host readback row
```

## Recommendation

Keep volumetric cloud and fog visuals unchanged. Add texture/readback/result rows first, then wire them into `CozyIslandHost` and the Node fixture.
