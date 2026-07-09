# Architecture Audit: Host Proof Ledger Refresh DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-21-06-04-00`

## Goal

Document the active DSK/domain shape for the current static Three.js route and identify the smallest next architecture cut: source/host proof records plus a DOM-free fixture.

## Active composition

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local source-domain kits under src/kits/
  -> inline browser adapters for renderer/input/camera/movement/cloud drift
  -> legacy globalThis.CozyIsland diagnostics
```

## Domain breakdown

```txt
route shell:
  static-browser-route-domain
  route-token-domain
  loading-status-domain
  error-panel-domain

source descriptor domains:
  island-landform-domain
  ocean-floor-domain
  foliage-object-graph-domain
  fenced-clearing-domain
  campfire-object-domain
  smoke-particle-domain
  grass-placement-domain
  grass-wind-domain
  mattatz-clouds-domain
  hero-cloud-source-domain

render consumer domains:
  three-render-host-domain
  terrain-render-domain
  ocean-floor-render-domain
  water-plane-domain
  shoreline-foam-domain
  path-render-domain
  foliage-render-domain
  fence-render-domain
  campfire-render-domain
  smoke-render-domain
  grass-instanced-render-domain
  hero-cloud-point-render-domain

interaction/movement domains:
  keyboard-input-domain
  wheel-progress-domain
  pointer-look-domain
  camera-rail-domain
  first-person-movement-domain
  movement-validity-domain

proof domains to add:
  route-token-readback-domain
  source-profile-domain
  source-fingerprint-domain
  scene-source-snapshot-domain
  browser-input-action-frame-domain
  action-result-domain
  movement-policy-result-domain
  camera-rail-snapshot-domain
  grass-placement-snapshot-domain
  grass-instance-snapshot-domain
  hero-cloud-descriptor-snapshot-domain
  hero-cloud-cache-snapshot-domain
  cloud-drift-result-domain
  render-host-snapshot-domain
  cozy-island-host-snapshot-domain
  browser-consumer-fixture-domain
```

## Services that kits offer

```txt
source services:
  createOceanIslandLandformState
  createOceanIslandLandformRenderContract
  sampleIslandHeight
  sampleIslandMasks
  createDenseCozyIslandObjectGraph
  createOceanFloorState
  createOceanFloorRenderContract
  createGrassPatchPlacementContract
  createGrassWindDescriptor
  createCampfireObjectGraph
  createSmokeParticleDescriptor
  createFencedClearingGraph
  createMattatzCloudsState
  createMattatzCloudRenderContract

runtime services:
  meshGrid
  terrainMesh
  floorMesh
  waterMesh
  foamMesh
  pathMesh
  objGroup
  fenceGroup
  campfireMesh
  smokeMesh
  updateSmoke
  grassMesh
  heroCloudGeometry
  heroCloudGroup
  rail
  valid
  fp
  frame
  globalThis.CozyIsland.getScrollProgress
```

## Kits

```txt
implemented explicit:
  ocean-island-landform-domain
  island-foliage-domain
  ocean-floor-domain
  grass-object-domain
  grass-wind-domain
  campfire-object-domain
  smoke-particle-domain
  fenced-clearing-domain
  mattatz-clouds-domain
  cozy-hero-cloud-form-kit

runtime-implied:
  cozy-static-shell-kit
  cozy-cloud-loader-kit
  cozy-error-panel-kit
  cozy-cloudform-entry-kit
  cozy-three-render-host-kit
  cozy-scene-composition-kit
  cozy-grass-instanced-render-kit
  cozy-hero-cloud-point-cache-kit
  cozy-cloud-drift-frame-kit
  cozy-wheel-progress-kit
  cozy-pointer-look-kit
  cozy-camera-rail-kit
  cozy-first-person-movement-kit
  cozy-movement-validity-kit
  cozy-render-frame-loop-kit
  cozy-legacy-host-diagnostics-kit

next-cut:
  route-token-readback-kit
  source-profile-kit
  source-fingerprint-kit
  scene-source-snapshot-kit
  browser-input-action-frame-kit
  action-result-kit
  input-journal-kit
  movement-policy-result-kit
  camera-rail-snapshot-kit
  grass-placement-snapshot-kit
  grass-instance-snapshot-kit
  hero-cloud-descriptor-snapshot-kit
  hero-cloud-cache-snapshot-kit
  cloud-drift-result-kit
  render-host-snapshot-kit
  cozy-island-host-snapshot-kit
  browser-consumer-fixture-kit
```

## Main architecture finding

The visible route has enough local DSK structure. The architecture problem is that browser adapters mutate and consume the descriptors without producing stable proof records.

Do not split the renderer yet. First add additive source/host proof modules and make the browser route expose `globalThis.CozyIslandHost.getState()` without breaking `globalThis.CozyIsland`.
