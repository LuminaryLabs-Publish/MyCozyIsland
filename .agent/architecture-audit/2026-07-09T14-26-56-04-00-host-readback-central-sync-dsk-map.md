# Architecture Audit: Host Readback Central Sync DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-26-56-04-00`

## Current architecture

`MyCozyIsland` is a static browser route with source-domain kits imported directly from `src/kits/` and consumed by `src/main-cloudform.js`.

The route already has meaningful DSK-like source descriptors, but the browser adapter owns too many result boundaries inline.

## Current route graph

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> ocean-island-landform-domain
  -> island-foliage-domain
  -> ocean-floor-domain
  -> grass-object-domain
  -> grass-wind-domain
  -> campfire-object-domain
  -> smoke-particle-domain
  -> fenced-clearing-domain
  -> mattatz-clouds-domain
  -> cozy-hero-cloud-form-kit
  -> inline browser consumers and render loop
  -> globalThis.CozyIsland
```

## Implemented DSK/domain services

```txt
ocean-island-landform-domain:
  - createOceanIslandLandformState
  - createOceanIslandLandformRenderContract
  - sampleIslandHeight
  - sampleIslandMasks

island-foliage-domain:
  - createDenseCozyIslandObjectGraph
  - path network and object graph descriptors

ocean-floor-domain:
  - createOceanFloorState
  - createOceanFloorRenderContract

grass-object-domain:
  - createGrassPatchPlacementContract
  - grass patch placement descriptors

grass-wind-domain:
  - createGrassWindDescriptor

fenced-clearing-domain:
  - createFencedClearingGraph
  - player anchor, fence posts, collision boundary, exclusion zones

campfire-object-domain:
  - createCampfireObjectGraph

smoke-particle-domain:
  - createSmokeParticleDescriptor

mattatz-clouds-domain:
  - createMattatzCloudsState
  - createMattatzCloudRenderContract

cozy-hero-cloud-form-kit:
  - hero cloud descriptor semantics consumed by the route
```

## Runtime-implied kits

```txt
cozy-static-shell-kit
cozy-cloud-loader-kit
cozy-error-panel-kit
cozy-route-script-token-kit
cozy-three-render-host-kit
cozy-scene-composition-kit
cozy-terrain-render-kit
cozy-ocean-floor-render-kit
cozy-water-plane-kit
cozy-shoreline-foam-kit
cozy-path-render-kit
cozy-foliage-render-kit
cozy-fence-render-kit
cozy-campfire-render-kit
cozy-smoke-render-kit
cozy-grass-instanced-render-kit
cozy-hero-cloud-point-cache-kit
cozy-cloud-drift-frame-kit
cozy-keyboard-input-kit
cozy-wheel-progress-kit
cozy-pointer-look-kit
cozy-camera-rail-kit
cozy-first-person-movement-kit
cozy-movement-validity-kit
cozy-render-frame-loop-kit
cozy-legacy-host-diagnostics-kit
```

## Next-cut proof kits

```txt
route-token-readback-kit:
  owns hero-cloud-4 route token readback

source-profile-kit:
  owns active route/source/kits/version inventory

source-fingerprint-kit:
  owns stable descriptor fingerprint

scene-source-snapshot-kit:
  owns source descriptor counts and seed summaries

browser-input-action-frame-kit:
  owns wheel/pointer/key input records

action-result-kit:
  owns accepted/rejected/skipped action results

input-journal-kit:
  owns bounded input/action history

movement-policy-result-kit:
  owns clearing/campfire acceptance and rejection reasons

camera-rail-snapshot-kit:
  owns rail/first-person handoff snapshots

grass-placement-snapshot-kit:
  owns requested/accepted grass placement readback

grass-instance-snapshot-kit:
  owns rendered InstancedMesh counts and exemplar transforms

hero-cloud-descriptor-snapshot-kit:
  owns cloud descriptor source readback

hero-cloud-cache-snapshot-kit:
  owns cached point geometry counts and keys

cloud-drift-result-kit:
  owns per-frame drift result summaries

render-host-snapshot-kit:
  owns renderer/camera/scene consumer summary

cozy-island-host-snapshot-kit:
  owns additive globalThis.CozyIslandHost.getState()

browser-consumer-fixture-kit:
  owns DOM-free fixture row generation

central-ledger-readback-kit:
  owns central LuminaryLabs ledger pointer sync
```

## Main architectural finding

Do not start by extracting the whole renderer. Start by adding source-owned proof records and a DOM-free fixture layer around the existing route so later renderer, grass, cloud, and shared-kit promotion work has stable readback.
