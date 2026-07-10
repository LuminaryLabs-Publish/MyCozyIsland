# Architecture audit: source consumer host readback DSK map

Timestamp: `2026-07-10T01-04-36-04-00`

## Current route map

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> source-domain kits
  -> Three.js render host
  -> globalThis.CozyIsland legacy diagnostics
```

## DSK/domain breakdown

```txt
static-route-shell
  owns: canvas#game, cloud-loader, error panel, route script token
  consumers: browser runtime

source-descriptor-composition
  owns: deterministic source states and render contracts
  consumers: main-cloudform adapters

landform-domain
  owns: island height, masks, heightfield, shoreline
  consumers: terrainMesh, foamMesh, pathMesh, object placement

ocean-floor-domain
  owns: floor heightfield, placements, water material
  consumers: floorMesh, waterMesh

foliage-domain
  owns: path network and object graph
  consumers: objGroup, pathMesh

clearing/campfire/smoke-domain
  owns: player anchor, clearing boundary, campfire keepout, campfire graph, smoke descriptor
  consumers: fenceGroup, campfireMesh, smokeMesh, valid(next), player initialization

grass-domain
  owns: patch placement and batch descriptors
  consumers: grassMesh one-cone instancing

cloud-domain
  owns: hero cloud contract and point count/drift settings
  consumers: heroCloudGeometry, heroCloudGroup, frame drift

input/camera/movement-domain
  owns: wheel progress, pointer yaw/pitch, key set, camera rail, first-person movement, movement validity
  consumers: renderer frame and legacy diagnostics

render-consumer-domain
  owns: descriptor adapters, scene graph, frame loop, renderer submission
  consumers: browser visual route

host-readback-domain-next
  missing: source profile, source fingerprint, input result journal, movement result rows, render consumption rows, serializable host state
```

## Current architecture risk

`src/main-cloudform.js` is still the consumer boundary for almost everything.

It imports useful source kits, but it also owns:

```txt
Three.js adapter construction
wheel/pointer/keyboard mutation
camera rail and first-person camera
movement validity checks
smoke simulation
cloud cache and drift
render loop
legacy diagnostics
```

## Boundary to add next

Add source-to-consumer proof without changing visible scene behavior.

```txt
source-profile-kit
source-fingerprint-kit
scene-source-snapshot-kit
input-result-kit
movement-policy-result-kit
camera-rail-snapshot-kit
grass-parity-kit
cloud-parity-kit
render-consumption-ledger-kit
cozy-island-host-snapshot-kit
browser-consumer-fixture-kit
```

## Main finding

The current DSK source layer is useful. The missing architecture layer is not another visual system. It is a small proof/runtime readback layer that shows exactly what the browser consumer accepted, rejected, cached, drifted, instantiated, rendered, and exposed.
