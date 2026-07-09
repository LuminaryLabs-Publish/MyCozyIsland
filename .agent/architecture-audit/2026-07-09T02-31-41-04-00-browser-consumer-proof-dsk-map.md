# Architecture Audit: Browser Consumer Proof DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T02-31-41-04-00`

## Selection result

`MyCozyIsland` was selected after comparing the accessible `LuminaryLabs-Publish` repo list against the central ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent` state. No checked non-Cavalry repo was fully new, ledger-absent, undocumented, or missing root `.agent` state.

## Current architecture

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local source-domain kits
  -> inline source composition
  -> inline render adapters
  -> inline input/movement/camera policies
  -> inline frame loop
  -> globalThis.CozyIsland legacy diagnostics
```

## Current interaction loop

```txt
static browser route
  -> import local DSK descriptors
  -> create deterministic island/floor/foliage/clearing/fire/smoke/grass/cloud source contracts
  -> consume source contracts into Three.js geometry/material/object adapters
  -> wheel adjusts scroll progress
  -> pointer adjusts yaw or yaw/pitch based on progress threshold
  -> keyboard movement activates only after progress >= 0.985
  -> valid(next) allows movement by clearing boundary and campfire keepout
  -> frame updates water, movement, camera, smoke, flame, cloud drift, and renderer
  -> legacy global exposes cloud contract, cached point clouds, and scroll progress
```

## Domains in use

```txt
route shell:
  static-browser-shell
  route-version-token
  cloud-loader-ui
  error-panel-ui

source domains:
  island-landform-source
  ocean-floor-source
  foliage-source
  path-network-source
  grass-placement-source
  grass-wind-source
  fenced-clearing-source
  campfire-source
  smoke-particle-source
  mattatz-cloud-source
  cozy-hero-cloud-source

consumer domains:
  three-render-host
  terrain-render-consumer
  ocean-floor-render-consumer
  water-render-consumer
  shoreline-foam-render-consumer
  path-render-consumer
  foliage-render-consumer
  fence-render-consumer
  campfire-render-consumer
  smoke-runtime-consumer
  grass-instancing-consumer
  hero-cloud-point-render-consumer

interaction domains:
  scroll-camera-rail
  pointer-look-input
  keyboard-first-person-input
  movement-policy
  clearing-boundary-policy
  campfire-keepout-policy

proof domains needed:
  route-token-readback
  source-profile
  source-fingerprint
  scene-source-snapshot
  browser-input-action-frame
  action-result
  movement-policy-result
  camera-rail-snapshot
  grass-placement-snapshot
  grass-instance-snapshot
  hero-cloud-descriptor-snapshot
  hero-cloud-cache-snapshot
  cloud-drift-result
  render-host-snapshot
  cozy-island-host-snapshot
  browser-consumer-fixture
```

## Services that current kits offer

```txt
ocean-island-landform-domain:
  createOceanIslandLandformState
  createOceanIslandLandformRenderContract
  sampleIslandHeight
  sampleIslandMasks

island-foliage-domain:
  createDenseCozyIslandObjectGraph

ocean-floor-domain:
  createOceanFloorState
  createOceanFloorRenderContract

grass-object-domain:
  createGrassPatchPlacementContract
  createGrassPatchBatchDescriptors

grass-wind-domain:
  createGrassWindDescriptor

fenced-clearing-domain:
  createFencedClearingGraph

campfire-object-domain:
  createCampfireObjectGraph

smoke-particle-domain:
  createSmokeParticleDescriptor

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit:
  createCozyHeroCloudFormDescriptor
  createCozyHeroCloudLayerDescriptor
  createCozyHeroCloudRenderContract
```

## Kits

```txt
implemented explicit kits:
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

inline runtime kits:
  cozy-static-shell-kit
  cozy-cloud-loader-kit
  cozy-error-panel-kit
  cozy-cloudform-entry-kit
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
  cozy-smoke-runtime-kit
  cozy-grass-instancing-kit
  cozy-hero-cloud-point-render-kit
  cozy-hero-cloud-cache-kit
  cozy-hero-cloud-drift-kit
  cozy-scroll-camera-rail-kit
  cozy-pointer-look-kit
  cozy-keyboard-movement-kit
  cozy-clearing-boundary-policy-kit
  cozy-campfire-keepout-policy-kit
  cozy-legacy-global-host-kit

next-cut proof kits:
  cozy-route-token-readback-kit
  cozy-source-profile-kit
  cozy-source-fingerprint-kit
  cozy-scene-source-snapshot-kit
  cozy-browser-input-action-frame-kit
  cozy-action-result-kit
  cozy-input-journal-kit
  cozy-movement-policy-result-kit
  cozy-camera-rail-snapshot-kit
  cozy-grass-placement-snapshot-kit
  cozy-grass-instance-snapshot-kit
  cozy-hero-cloud-descriptor-snapshot-kit
  cozy-hero-cloud-cache-snapshot-kit
  cozy-cloud-drift-result-kit
  cozy-render-host-snapshot-kit
  cozy-island-host-state-kit
  cozy-browser-consumer-fixture-kit
```

## DSK breakdown target

```txt
cozy-browser-consumer-proof-domain
├─ route-source-proof-subdomain
│  ├─ route-token-readback-kit
│  ├─ source-profile-kit
│  ├─ source-fingerprint-kit
│  └─ scene-source-snapshot-kit
├─ interaction-proof-subdomain
│  ├─ browser-input-action-frame-kit
│  ├─ action-result-kit
│  ├─ input-journal-kit
│  └─ movement-policy-result-kit
├─ camera-proof-subdomain
│  └─ camera-rail-snapshot-kit
├─ grass-proof-subdomain
│  ├─ grass-placement-snapshot-kit
│  └─ grass-instance-snapshot-kit
├─ cloud-proof-subdomain
│  ├─ hero-cloud-descriptor-snapshot-kit
│  ├─ hero-cloud-cache-snapshot-kit
│  └─ cloud-drift-result-kit
├─ render-proof-subdomain
│  └─ render-host-snapshot-kit
└─ host-proof-subdomain
   ├─ cozy-island-host-state-kit
   └─ browser-consumer-fixture-kit
```

## Main finding

The architectural next step is not extraction or visual improvement. It is to make existing browser consumers observable as deterministic records. Once those records are stable, renderer extraction, shared-kit promotion, and cloud/grass performance work become lower-risk.
