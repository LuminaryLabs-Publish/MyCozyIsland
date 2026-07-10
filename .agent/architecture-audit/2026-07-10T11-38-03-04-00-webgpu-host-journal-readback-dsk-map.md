# Architecture audit: WebGPU host journal readback DSK map

Timestamp: `2026-07-10T11-38-03-04-00`

## Current architecture

```txt
index.html
  -> importmap Three/WebGPU 0.185.0
  -> src/main-cloudform.js
    -> validates 50-kit catalog
    -> composes deterministic source snapshot
    -> creates renderer, scene, camera, sky, lights, fog
    -> creates world/ocean/foam/cloud/fog/post consumers
    -> binds wheel, pointer, keyboard, blur, resize input
    -> runs WebGPU animation loop
    -> exposes legacy globalThis.CozyIsland
```

## DSK/domain map

```txt
source-catalog-domain
  owns 50 DomainServiceKit manifests and capability validation

source-descriptor-domain
  owns deterministic seed, environment, terrain, ocean, vegetation, atmosphere, material, render, camera, and scenario descriptors

render-consumer-domain
  owns WebGPU renderer, world, ocean, foam, atmosphere textures, volumetric cloud, rolling fog, and post pipeline adapters

interaction-domain
  owns wheel, pointer drag, keyboard, blur, and resize events, but no result rows yet

scenario-domain
  owns scenario ticks and camera render snapshots, but no host journal rows yet

performance-domain
  owns frame sampling, degrade/recover callbacks, and quality scale changes, but no reason journal yet

host-readback-domain
  currently legacy aggregate CozyIsland.getState()
  should add JSON-safe CozyIslandHost journal APIs

fixture-domain
  currently npm test static/domain smoke only
  should add Node WebGPU consumer fixture without browser GPU capture
```

## Missing proof seams

```txt
route token -> source profile
source profile -> source fingerprint
kitCatalog -> kit catalog readback
input event -> InputActionFrame
InputActionFrame -> InputResult
scenario.tick -> ScenarioTickResult
scenario camera -> CameraFrameReadback
createAtmosphereVolumeTextures -> VolumeTextureResult
performanceBudget.sample -> PerformanceLevelResult
render consumers -> RenderConsumptionLedger
legacy CozyIsland -> JSON-safe CozyIslandHost
Node fixture -> host journal assertions
```

## Safe architecture direction

Keep current WebGPU render consumers stable.

Add additive journal/readback kits around the existing route before changing visuals.
