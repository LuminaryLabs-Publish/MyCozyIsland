# Architecture Audit: Host Readback Parity DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-39-50-04-00`

## Current architecture

```txt
index.html
  -> src/main-cloudform.js
  -> local source-domain descriptor kits
  -> inline Three.js render adapters
  -> inline input/movement/camera loop
  -> inline grass/cloud/smoke/fire frame updates
  -> legacy globalThis.CozyIsland diagnostics
```

## Domain map

```txt
route shell:
  static-browser-route-domain
  route-token-domain
  loading-status-domain
  error-panel-domain

source descriptors:
  island-landform-domain
  ocean-floor-domain
  foliage-object-graph-domain
  fenced-clearing-domain
  campfire-object-domain
  smoke-particle-domain
  grass-placement-domain
  grass-wind-domain
  hero-cloud-source-domain

render consumption:
  three-render-host-domain
  scene-composition-domain
  terrain-render-domain
  ocean-floor-render-domain
  water-plane-domain
  shoreline-foam-domain
  path-render-domain
  foliage-render-domain
  fence-render-domain
  campfire-render-domain
  smoke-render-domain
  grass-instance-render-domain
  hero-cloud-point-render-domain

interaction/gameplay:
  input-state-domain
  scroll-progress-domain
  pointer-look-domain
  camera-rail-domain
  first-person-movement-domain
  movement-validity-domain
  render-frame-domain

proof next:
  route-token-readback-domain
  source-profile-domain
  source-fingerprint-domain
  scene-source-snapshot-domain
  browser-input-action-frame-domain
  action-result-domain
  input-journal-domain
  movement-policy-result-domain
  camera-rail-snapshot-domain
  grass-readback-domain
  cloud-readback-domain
  render-host-snapshot-domain
  cozy-island-host-state-domain
  browser-consumer-fixture-domain
```

## Service map

```txt
implemented:
  route HTML shell
  Three.js CDN import
  source descriptor construction
  mesh/material adapter creation
  event handler installation
  rail camera sampling
  first-person movement integration
  movement validity check
  sea/smoke/flame/cloud frame updates
  renderer render submission
  legacy CozyIsland diagnostic exposure

missing proof services:
  readRouteToken()
  createSourceProfile()
  createSourceFingerprint()
  createSceneSourceSnapshot()
  createBrowserInputActionFrame()
  createActionResult()
  appendInputJournalEntry()
  createMovementPolicyResult()
  createCameraRailSnapshot()
  createGrassPlacementSnapshot()
  createGrassInstanceSnapshot()
  createHeroCloudDescriptorSnapshot()
  createHeroCloudCacheSnapshot()
  createCloudDriftResult()
  createRenderHostSnapshot()
  createCozyIslandHostSnapshot()
  runBrowserConsumerFixture()
```

## Kit map

```txt
explicit source kits:
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

runtime adapter kits:
  cozy-cloudform-entry-kit
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
  cozy-render-frame-loop-kit

proof kits to add:
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

The live route has enough source descriptors and render adapter seams to prove consumption without rewriting visuals. The next implementation should add pure proof modules and an additive host snapshot while keeping `globalThis.CozyIsland` intact.
