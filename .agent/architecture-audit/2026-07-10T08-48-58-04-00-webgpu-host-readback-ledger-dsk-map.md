# Architecture audit: WebGPU host readback ledger DSK map

Timestamp: `2026-07-10T08-48-58-04-00`

## Current route architecture

```txt
index.html
  -> importmap Three/WebGPU 0.185.0
  -> canvas#game route host
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validateKitCatalog(kitCatalog)
  -> createDomainSnapshot(...)
  -> create WebGPU renderer consumers
  -> animation loop
  -> globalThis.CozyIsland legacy live-object diagnostics
```

## DSK grouping

```txt
platform-route
  static-route-shell
  webgpu-importmap
  route-token
  loader/error/debug DOM

catalog-validation
  DomainServiceKit metadata
  kit capability graph
  50-kit count contract

source-generation
  deterministic seed
  environment clock
  wind/weather/illumination
  terrain/shoreline/biome/LOD
  ocean floor/wave/foam/optics
  vegetation/archetype/placement/ground contact
  cloud/fog/atmosphere recipes
  material/render snapshot
  camera rail/scenario

render-consumption
  WebGPURenderer
  stylized world consumer
  ocean consumer
  foam consumer
  atmosphere volume texture consumer
  cloud consumer
  fog consumer
  post pipeline consumer
  performance budget consumer

interaction-consumption
  wheel input
  pointer drag input
  keyboard input
  blur clear
  resize
  animation loop tick

host-proof-next
  route profile
  source fingerprint
  kit catalog readback
  input result journal
  scenario tick result
  camera frame readback
  volume texture result
  performance result
  render-consumption ledger
  JSON-safe CozyIslandHost
```

## Implemented kit families

```txt
DomainServiceKit catalog validation
determinism
environment
terrain
ocean
vegetation
atmosphere
render descriptors
sequences
WebGPU renderer adapters
node static/domain checks
```

## Architecture gap

Source rows are mostly deterministic and Node-testable. Host consumers are not.

`src/main-cloudform.js` still directly wires:

```txt
input event -> mutable input object
animation frame -> scenario tick -> camera copy -> renderer update -> debug projection
performance sample -> renderer degrade/recover side effect
volume texture creation -> live object exposure
render consumers -> no source-consumption rows
```

## Target architecture

```txt
source descriptors
  -> normalized source fingerprint
  -> render snapshot normalizer
  -> input action frame
  -> input result journal
  -> scenario tick result
  -> camera frame readback
  -> volume texture result
  -> performance decision result
  -> render-consumption ledger
  -> CozyIslandHost JSON-safe readback
```

## Safe implementation rule

Keep existing visuals and renderer consumers stable. Add proof rows around them before any cloud, ocean, fog, camera, or route-content change.
