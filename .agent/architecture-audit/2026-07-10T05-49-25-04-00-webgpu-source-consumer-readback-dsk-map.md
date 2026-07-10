# Architecture Audit: WebGPU Source Consumer Readback DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-10T05-49-25-04-00`

## Route authority

```txt
index.html
  -> importmap: three / three-webgpu / three-tsl at 0.185.0
  -> ./src/main-cloudform.js?v=webgpu-volumetric-2
  -> src/core/domain-kit.js validates catalog
  -> src/kits/index.js exports DSK services
  -> src/kits/catalog.js supplies 50 DomainServiceKit manifests
  -> tests/static-check.mjs enforces catalog and WebGPU renderer tokens
  -> tests/domain-smoke.mjs proves deterministic domain composition for selected source rows
```

## DSK/domain breakdown

```txt
Core kit domain:
  defineDomainKit
  validateKitCatalog
  kitCatalog

Source composition domains:
  deterministic-seed-service
  environment-clock
  wind-field
  weather-state
  illumination-state
  terrain-surface
  biome-field
  shoreline-field
  ocean-floor-profile
  ocean-wave-state
  ocean-optics
  underwater-atmosphere
  caustics
  sun-glitter
  shoreline-foam
  vegetation-archetypes
  ground-contact
  vegetation-placement
  rocks
  props
  campfire-atmosphere
  cloud-weather
  cloud-density
  cloud-lighting
  cloud-lod
  cloud-shadow
  cloud-horizon
  fog-density
  fog-advection
  fog-placement
  materials
  render-archetypes
  fallback-policy

Runtime consumer domains:
  WebGPURenderer init
  quality selection
  scene/fog/camera/light composition
  stylized world renderer
  WebGPU ocean renderer
  WebGPU foam renderer
  atmosphere volume texture creation
  volumetric cloud renderer
  rolling fog renderer
  WebGPU post pipeline
  performance budget degrade/recover
  wheel/pointer/key input
  resize handling
  scenario tick
  debug overlay
  legacy CozyIsland object

Proof domains needed next:
  route token readback
  source profile
  source fingerprint
  normalized source snapshot
  kit catalog readback
  input action frame
  input result
  scenario tick result
  camera result snapshot
  volume texture creation result
  performance level result
  render consumer ledger
  serializable CozyIslandHost
  Node WebGPU consumer fixture
```

## Main architecture finding

The architecture has strong source-domain decomposition, but the browser adapter is still one large authority surface. `src/main-cloudform.js` composes source data, creates WebGPU renderer objects, handles input, drives animation, manages performance degradation, and exports live runtime objects.

The next pass should not split rendering first. It should add a proof layer that records what source rows were consumed, what input/scenario/performance transitions occurred, and what JSON-safe state the host exposes.
