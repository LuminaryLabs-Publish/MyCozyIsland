# Render Audit: WebGPU Render Consumption Readback Gap

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-10T05-49-25-04-00`

## Current render surface

```txt
THREE.WebGPURenderer
scene background and fog
PerspectiveCamera
CanvasTexture sky sphere
HemisphereLight
DirectionalLight with shadows
createStylizedWorldRenderer(snapshot)
createWebGPUOceanRenderer(...)
createWebGPUFoamRenderer(...)
createAtmosphereVolumeTextures(...)
createVolumetricCloudRenderer(...)
createRollingFogRenderer(...)
createWebGPUPostPipeline(...)
createDebugOverlay(...)
renderer.setAnimationLoop(...)
```

## Existing proof

`tests/static-check.mjs` confirms the renderer source includes WebGPU-oriented tokens such as `Storage3DTexture`, `VolumeNodeMaterial`, `RaymarchingBox`, `RenderPipeline`, and `MeshPhysicalNodeMaterial`.

That is useful static coverage, but it does not prove browser-time source consumption, texture creation results, render ledger rows, performance degradation reasons, or host readback shape.

## Gaps

```txt
No render-consumption ledger maps source families to renderer consumers.
No source fingerprint is attached to renderer state.
No volume texture creation result row exists.
No cloud/fog texture source/size/source-mode result row exists.
No performance budget degradation/recovery event row exists.
No post-pipeline render result exists.
No camera frame row records the copied scenario camera state.
No serializable render host snapshot exists.
legacy globalThis.CozyIsland exposes live renderer, scene, camera, textures, and renderers.
```

## Next proof rows

```txt
sourceFamily -> consumer -> accepted/rejected/no-change -> reason
kitCatalogStatus -> render start record
backend -> quality -> renderer config snapshot
cloudRecipe/fogRecipe -> atmosphere texture result
cloudRenderer/fogRenderer -> step-scale result
performanceBudget -> degrade/recover result
scenario camera -> Three camera frame result
postPipeline -> render submission result
CozyIslandHost.getState() -> JSON-safe render summary
```

## Recommendation

Keep the WebGPU renderer intact. Add additive readback rows around existing render consumers before changing renderer internals, cloud art, fog parameters, ocean styling, or route token.
