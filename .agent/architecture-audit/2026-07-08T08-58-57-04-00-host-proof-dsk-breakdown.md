# Host Proof DSK Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Created:** `2026-07-08T08:58:57-04:00`

## Interaction loop

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-3
  -> canvas#game + loader + error panel
  -> Three.js CDN import
  -> local DSK imports
  -> source descriptor construction
  -> inline Three.js adapter construction
  -> scroll camera rail
  -> pointer look
  -> keyboard movement after first-person threshold
  -> movement policy accepts/rejects clearing/campfire movement
  -> campfire, smoke, hero-cloud drift, camera, and movement animate per frame
  -> globalThis.CozyIsland exposes compatibility diagnostics
  -> target globalThis.CozyIslandHost exposes proof diagnostics
```

## Domain breakdown

```txt
my-cozy-island
├─ route-domain
│  ├─ static HTML route
│  ├─ module script token
│  ├─ route version id: hero-cloud-3
│  └─ missing typed route result
├─ source-domain
│  ├─ island landform source
│  ├─ ocean floor source
│  ├─ foliage graph source
│  ├─ grass placement source
│  ├─ grass wind source
│  ├─ fenced clearing source
│  ├─ campfire graph source
│  ├─ smoke descriptor source
│  ├─ Mattatz cloud source
│  └─ hero-cloud form source
├─ render-domain
│  ├─ terrain mesh adapter
│  ├─ ocean floor mesh adapter
│  ├─ water plane adapter
│  ├─ foam/path/foliage/fence/campfire adapters
│  ├─ smoke point runtime
│  ├─ grass instancing adapter
│  └─ hero-cloud point renderer/cache
├─ interaction-domain
│  ├─ scroll rail state
│  ├─ pointer yaw/look state
│  ├─ keyboard movement state
│  └─ missing action result layer
├─ movement-domain
│  ├─ first-person threshold gate
│  ├─ clearing boundary policy
│  ├─ campfire keepout policy
│  └─ missing movement policy result records
├─ cloud-domain
│  ├─ descriptor source
│  ├─ point-cloud geometry cache
│  ├─ drift runtime
│  └─ missing descriptor/cache/drift snapshots
└─ diagnostics-domain
   ├─ legacy globalThis.CozyIsland
   ├─ missing additive globalThis.CozyIslandHost
   └─ missing DOM-free fixture replay
```

## Services currently offered

```txt
ocean-island-landform-domain
  createOceanIslandLandformState
  sampleIslandHeight
  sampleIslandMasks
  createOceanIslandLandformRenderContract

island-foliage-domain
  createIslandPathNetwork
  createDenseCozyIslandObjectGraph
  createDenseCozyIslandRenderContract

ocean-floor-domain
  createOceanFloorState
  createOceanFloorRenderContract

grass-object-domain
  createGrassPatchPlacementContract
  createGrassPatchBatchDescriptors

grass-wind-domain
  createGrassWindDescriptor

campfire-object-domain
  createCampfireObjectGraph

smoke-particle-domain
  createSmokeParticleDescriptor

fenced-clearing-domain
  createFencedClearingGraph

mattatz-clouds-domain
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit
  creates readable hero-cloud form descriptors
  emits point-cloud/lobe/placement intent for the renderer
```

## Services needed next

```txt
cozy-route-version-result service
cozy-source-profile service
cozy-source-fingerprint service
cozy-scene-source-snapshot service
cozy-action-frame service
cozy-action-result service
cozy-movement-policy-result service
cozy-camera-rail-snapshot service
cozy-hero-cloud-descriptor-snapshot service
cozy-hero-cloud-cache-snapshot service
cozy-cloud-drift-result service
cozy-host-snapshot service
cozy-action-journal service
cozy-input-journal service
cozy-dom-free-fixture-runner service
```

## Kits identified

Implemented explicit kits:

```txt
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
```

Runtime-implied kits:

```txt
cozy-static-shell-kit
cozy-cloud-loader-kit
cozy-error-panel-kit
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
```

Next-cut proof kits:

```txt
cozy-active-route-version-kit
cozy-route-script-token-kit
cozy-route-version-result-kit
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-host-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-action-rejection-reason-kit
cozy-movement-policy-result-kit
cozy-clearing-boundary-result-kit
cozy-campfire-keepout-result-kit
cozy-camera-rail-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-action-journal-kit
cozy-input-journal-kit
cozy-gamehost-diagnostics-kit
cozy-dom-free-fixture-runner-kit
cozy-replay-parity-smoke-kit
```

## Architecture decision

The next pass should add proof helpers as local pure modules first.

Only after fixture proof exists should any helper be promoted to a shared engine or ProtoKit repo.
