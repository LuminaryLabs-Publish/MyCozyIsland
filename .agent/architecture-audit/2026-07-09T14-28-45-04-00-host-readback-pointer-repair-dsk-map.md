# Architecture Audit — Host Readback Pointer Repair DSK Map

**Timestamp:** `2026-07-09T14-28-45-04-00`

## Current architecture

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> local source-domain kits under src/kits/
  -> inline browser adapters in src/main-cloudform.js
  -> legacy globalThis.CozyIsland diagnostics
```

## Explicit DSK/source domains

```txt
ocean-island-landform-domain:
  services: createOceanIslandLandformState, createOceanIslandLandformRenderContract, sampleIslandHeight, sampleIslandMasks
  role: island heightfield/mask source authority

island-foliage-domain:
  services: createDenseCozyIslandObjectGraph
  role: object graph, path network, foliage placement descriptors

ocean-floor-domain:
  services: createOceanFloorState, createOceanFloorRenderContract
  role: ocean floor and water material source authority

grass-object-domain:
  services: createGrassPatchPlacementContract
  role: grass placement descriptor producer

grass-wind-domain:
  services: createGrassWindDescriptor
  role: wind descriptor producer

campfire-object-domain:
  services: createCampfireObjectGraph
  role: campfire graph source authority

smoke-particle-domain:
  services: createSmokeParticleDescriptor
  role: smoke source descriptor producer

fenced-clearing-domain:
  services: createFencedClearingGraph
  role: clearing, player anchor, collision boundary, and exclusion zones

mattatz-clouds-domain:
  services: createMattatzCloudsState, createMattatzCloudRenderContract
  role: cloud source descriptor producer

cozy-hero-cloud-form-kit:
  services: planned/read path only in current docs
  role: named hero cloud source surface for next proof layer
```

## Inline consumer domains

```txt
mesh adapters:
  terrainMesh, floorMesh, waterMesh, foamMesh, pathMesh, objGroup, fenceGroup, campfireMesh, smokeMesh, grassMesh, heroCloudGroup

browser input:
  key Set, wheel progress mutation, pointer drag yaw/pitch mutation

movement/camera:
  valid(next), fp(dt), rail()

frame consumers:
  updateSmoke, flame scale, cloud drift mutation, renderer.render(scene, camera)

legacy diagnostics:
  globalThis.CozyIsland = { cloudContract, cloudPointCache, getScrollProgress }
```

## Architectural gap

The source-domain kits already produce valuable descriptors, but the browser consumes them directly without source-owned readback rows. The next implementation should not extract the renderer or change visuals. It should add a proof layer that makes descriptor consumption observable.

## Next DSK map

```txt
route-token-readback-kit
  -> proves index.html script token and active route version

source-profile-kit
  -> records current product/source shape

source-fingerprint-kit
  -> stable hash over route, descriptor counts, grass, cloud, movement, and render constants

scene-source-snapshot-kit
  -> reports island/floor/clearing/grass/smoke/cloud descriptor summaries

browser-input-action-frame-kit
  -> captures wheel/pointer/keyboard intent without DOM dependency

action-result-kit
  -> normalizes accepted/rejected/noop browser input and movement outcomes

movement-policy-result-kit
  -> explains clearing-boundary and campfire-keepout decisions

camera-rail-snapshot-kit
  -> reports progress/eased progress/mode/camera/look target rows

grass-placement-snapshot-kit
  -> summarizes requested/accepted/excluded grass patches

grass-instance-snapshot-kit
  -> summarizes InstancedMesh instance count and draw group state

hero-cloud-descriptor-snapshot-kit
  -> summarizes mattatz cloud descriptor counts and point settings

hero-cloud-cache-snapshot-kit
  -> summarizes cached geometries and point counts

cloud-drift-result-kit
  -> reports drift deltas as a result row instead of only mutating points

render-host-snapshot-kit
  -> reports renderer/camera/scene/object/descriptor consumption state

cozy-island-host-snapshot-kit
  -> additive globalThis.CozyIslandHost.getState() surface

browser-consumer-fixture-kit
  -> DOM-free fixture rows for route/source/input/movement/rail/grass/cloud/render proof

central-ledger-readback-kit
  -> keeps repo-local kit registry and LuminaryLabs central ledger aligned
```

## Deferral list

```txt
visual rewrite: defer
cloud renderer replacement: defer
grass renderer replacement: defer
full renderer extraction: defer
camera rail retune: defer
legacy globalThis.CozyIsland removal: defer
```
