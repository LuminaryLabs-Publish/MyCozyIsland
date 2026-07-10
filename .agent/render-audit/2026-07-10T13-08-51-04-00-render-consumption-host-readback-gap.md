# Render Audit: Render Consumption Host Readback Gap

Timestamp: `2026-07-10T13-08-51-04-00`

## Render surface exists

`index.html` mounts `canvas#game` and `src/main-cloudform.js` creates a Three/WebGPU renderer, scene, camera, WebGPU ocean, foam, atmosphere volume textures, volumetric cloud renderer, rolling fog renderer, and post pipeline.

## Render consumer path

```txt
createRenderSnapshot(...)
  -> createStylizedWorldRenderer(snapshot)
  -> createWebGPUOceanRenderer(...)
  -> createWebGPUFoamRenderer(snapshot.foam)
  -> createAtmosphereVolumeTextures(...)
  -> createVolumetricCloudRenderer(...)
  -> createRollingFogRenderer(...)
  -> createWebGPUPostPipeline(...)
  -> postPipeline.render()
```

## Gap

The render path is descriptor-driven, but there is no host ledger that records source-row consumption.

Missing rows:

```txt
render_consumer_started
render_consumer_source_family
render_consumer_used_row_count
render_consumer_ignored_row_count
render_consumer_fallback_reason
render_consumer_volume_texture_source
render_consumer_quality_tier
render_consumer_frame_id
render_consumer_performance_level
```

## Why this blocks visual work

Without source-backed render-consumption rows, visual changes can regress the WebGPU route without any DOM-free proof that cloud, fog, ocean, foam, vegetation, lighting, camera, and post consumers used the intended domain rows.

## Next proof

Add `render-consumption-ledger-kit` and expose it through an additive JSON-safe `CozyIslandHost` surface before changing the visuals.
