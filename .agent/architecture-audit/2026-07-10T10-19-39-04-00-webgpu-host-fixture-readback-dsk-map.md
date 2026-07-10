# Architecture Audit: WebGPU Host Fixture Readback DSK Map

Timestamp: 2026-07-10T10-19-39-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Architecture read

The live route is now a WebGPU volumetric island route, not the older Three `0.160.0` / `hero-cloud-4` route. The source and render descriptor catalog is substantial, but the host proof layer is still mostly aggregate and live-object based.

## Current interaction loop

```txt
index.html
  -> importmap three / three-webgpu / three-tsl at 0.185.0
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validateKitCatalog(kitCatalog)
  -> deterministic domain snapshot
  -> render snapshot + camera rail sequence + cozy island scenario
  -> WebGPU renderer and render consumers
  -> browser input consumers mutate runtime state
  -> animation loop ticks scenario and renderers
  -> globalThis.CozyIsland exposes aggregate state and live objects
```

## DSK source families

```txt
core/domain-kit
kits/catalog
kits/determinism
kits/environment
kits/terrain
kits/ocean
kits/vegetation
kits/atmosphere
kits/render-descriptors
kits/sequences
kits/renderers
```

## Runtime consumer families

```txt
static route shell
WebGPU importmap
route token
WebGPU renderer host
quality selection
scene composition
sky and lighting
stylized world consumer
WebGPU ocean consumer
WebGPU foam consumer
atmosphere volume texture consumer
volumetric cloud consumer
rolling fog consumer
post pipeline consumer
performance budget consumer
wheel input consumer
pointer input consumer
keyboard input consumer
resize consumer
animation loop
legacy CozyIsland diagnostics
```

## Proof gap

The source families are rich enough to support fixture proof, but the route does not yet emit a JSON-safe host readback ledger. The next cut should add additive host proof rows instead of replacing visual systems.

## Required next DSK/proof services

```txt
webgpu-route-profile-kit
webgpu-source-fingerprint-kit
kit-catalog-readback-kit
render-snapshot-normalizer-kit
input-action-frame-kit
input-result-kit
input-result-journal-kit
scenario-tick-result-kit
camera-frame-readback-kit
volume-texture-result-kit
performance-level-result-kit
render-consumption-ledger-kit
cozy-island-host-readback-kit
node-webgpu-consumer-fixture-kit
```

## Boundary rule

Do not move renderer, ocean, cloud, fog, camera, or route content work ahead of host fixture readback proof.
