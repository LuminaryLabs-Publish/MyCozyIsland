# Render audit: WebGPU render consumption readback gap

Timestamp: `2026-07-10T08-48-58-04-00`

## Visual/render surface

The current route has a full visual surface:

```txt
WebGPURenderer
THREE.Scene
PerspectiveCamera
pastel sunrise sky
HemisphereLight
DirectionalLight shadows
stylized world renderer
WebGPU ocean renderer
WebGPU foam renderer
atmosphere volume textures
volumetric cloud renderer
rolling fog renderer
WebGPU post pipeline
performance budget scaler
```

## Source-to-consumer path

```txt
createDomainSnapshot(...)
  -> createRenderSnapshot(...)
  -> createStylizedWorldRenderer(snapshot)
  -> createWebGPUOceanRenderer(...)
  -> createWebGPUFoamRenderer(snapshot.foam)
  -> createAtmosphereVolumeTextures(...)
  -> createVolumetricCloudRenderer(...)
  -> createRollingFogRenderer(...)
  -> createWebGPUPostPipeline(...)
```

## Current readback

`globalThis.CozyIsland.getState()` returns aggregate state:

```txt
backend
quality
camera descriptor
clock state
performance state
volumetrics cloud/fog steps and activeScale
kitCount
```

It does not return source-backed render-consumption rows.

## Missing rows

```txt
RenderSnapshotFingerprint
RenderConsumerLedgerRow
WorldConsumerReadback
OceanConsumerReadback
FoamConsumerReadback
AtmosphereTextureReadback
CloudConsumerReadback
FogConsumerReadback
PostPipelineReadback
PerformanceBudgetDecisionRow
```

## Risk

Without render-consumption rows, future cloud, fog, ocean, or visual changes can appear correct in browser screenshots while silently drifting from source descriptors.

## Next proof gate

Add a Node-safe render consumption ledger that can assert:

```txt
route token is webgpu-volumetric-2
kit catalog has 50 valid kits
source fingerprint is stable
render snapshot families are present
consumer families are mapped
volume texture results are serializable or deterministic stubs
performance degrade/recover decisions use stable reason codes
CozyIslandHost.getState() is JSON-safe
```
