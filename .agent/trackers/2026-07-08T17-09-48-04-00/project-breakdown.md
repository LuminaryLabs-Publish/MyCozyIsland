# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-09-48-04-00`

## Selection result

The accessible `LuminaryLabs-Publish` repository list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state.

```txt
checked:
  LuminaryLabs-Publish/HorrorCorridor
  LuminaryLabs-Publish/AetherVale
  LuminaryLabs-Publish/TheOpenAbove
  LuminaryLabs-Publish/TheCavalryOfRome
  LuminaryLabs-Publish/PhantomCommand
  LuminaryLabs-Publish/PrehistoricRush
  LuminaryLabs-Publish/ZombieOrchard
  LuminaryLabs-Publish/IntoTheMeadow
  LuminaryLabs-Publish/MyCozyIsland
  LuminaryLabs-Publish/TheUnmappedHouse

excluded:
  LuminaryLabs-Publish/TheCavalryOfRome

selected:
  LuminaryLabs-Publish/MyCozyIsland
```

`MyCozyIsland` was selected because repo-local `.agent/START_HERE.md` had advanced to `2026-07-08T17-00-36-04-00`, while the central ledger still pointed at `2026-07-08T14-58-49-04-00`. That makes this pass a required repo-local refresh plus central ledger catch-up, not a visual implementation pass.

## Product read

`MyCozyIsland` is a standalone static Three.js cozy island route.

The route composes local source-domain kits for island landform, ocean floor, foliage, grass placement, grass wind, fenced clearing, campfire, smoke particles, Mattatz-style clouds, and hero-cloud form intent.

The implementation is visually coherent enough for the current stage. The blocker is still proofability: route/source/interaction/movement/rail/grass/cloud/render/host facts need pure source files, fixture rows, and additive browser readback before more art or shared-kit promotion.

## Current route

```txt
index.html
  -> canvas#game
  -> #cloud-loader
  -> #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

## Interaction loop

```txt
open static route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN
  -> import local source-domain kits
  -> create island, ocean floor, foliage, grass, wind, clearing, campfire, smoke, and cloud descriptors
  -> inline Three.js adapters create renderer, scene, camera, terrain, ocean, foam, path, foliage, fence, fire, smoke, grass, and cloud point groups
  -> wheel input mutates scroll progress
  -> pointer drag mutates orbit yaw or first-person yaw/pitch depending on progress
  -> keyboard movement unlocks only when progress >= 0.985
  -> valid(next) accepts or silently rejects movement by clearing boundary and campfire keepout
  -> frame loop updates sea bob, smoke, flame pulse, cloud drift, camera, and renderer
  -> globalThis.CozyIsland exposes compatibility diagnostics
```

## Domains in use

```txt
static-browser-shell
cloud-loader-ui
error-panel-ui
module-entry-route
active-route-token-authority
three-cdn-runtime
local-source-domain-runtime
island-landform-source
heightfield-sampling
mask-sampling
shoreline-contract
ocean-floor-source
ocean-floor-heightfield
foliage-object-graph
object-exclusion-policy
path-network-source
grass-placement-contract
grass-wind-descriptor
grass-instance-readback-next
fenced-clearing-source
player-anchor-source
clearing-collision-boundary
campfire-keepout-policy
campfire-object-graph
smoke-particle-descriptor
mattatz-cloud-source
hero-cloud-form-source
hero-cloud-cache-runtime
hero-cloud-drift-runtime
renderer-host
terrain-render-adapter
ocean-floor-render-adapter
water-plane-render-adapter
shoreline-foam-render-adapter
path-render-adapter
foliage-render-adapter
fence-render-adapter
campfire-render-adapter
smoke-runtime-adapter
grass-instancing-adapter
hero-cloud-point-render-adapter
scroll-progress-state
camera-rail-authority
pointer-look-state
keyboard-input-state
first-person-threshold-gate
movement-policy-authority
render-host-snapshot-next
legacy-global-diagnostics
cozy-island-host-next
fixture-replay-authority-next
central-ledger-sync
```

## Services offered by kits and host adapters

```txt
ocean-island-landform-domain:
  createOceanIslandLandformState
  createOceanIslandLandformRenderContract
  sampleIslandHeight
  sampleIslandMasks

island-foliage-domain:
  createDenseCozyIslandObjectGraph
  object graph generation
  path network generation
  object exclusion support

ocean-floor-domain:
  createOceanFloorState
  createOceanFloorRenderContract

grass-object-domain:
  createGrassPatchPlacementContract
  createGrassPatchBatchDescriptors target remains unused by host

grass-wind-domain:
  createGrassWindDescriptor

campfire-object-domain:
  createCampfireObjectGraph

smoke-particle-domain:
  createSmokeParticleDescriptor

fenced-clearing-domain:
  createFencedClearingGraph
  player avatar anchor
  collision boundary
  clearance zones
  object exclusion zones

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit:
  readable hero cloud form descriptor
  cloud placement intent
  point-cloud drift intent

inline host/render services:
  fail
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
  rand
  cloudMaterial
  heroCloudGeometry
  heroCloudGroup
  rail
  valid
  fp
  frame
  globalThis.CozyIsland compatibility projection
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
```

Next-cut proof kits:

```txt
cozy-active-route-version-kit
cozy-route-version-result-kit
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-action-rejection-reason-kit
cozy-action-journal-kit
cozy-input-journal-kit
cozy-movement-policy-result-kit
cozy-clearing-boundary-result-kit
cozy-campfire-keepout-result-kit
cozy-rail-state-kit
cozy-camera-rail-snapshot-kit
cozy-grass-source-readback-kit
cozy-grass-instance-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-render-host-snapshot-kit
cozy-host-state-contract-kit
cozy-host-snapshot-kit
cozy-gamehost-diagnostics-kit
cozy-dom-free-fixture-runner-kit
cozy-replay-parity-smoke-kit
cozy-central-ledger-sync-kit
```

## Main finding

The repo-local docs had already advanced beyond the central ledger. The next valuable slice is a source-manifest and consumer-splice implementation gate that also keeps the central ledger synchronized.

Do not do more visual work first.

## Next safe ledge

```txt
MyCozyIsland Host Proof Source Manifest + Browser Consumer Fixture Gate + Central Ledger Sync
```

## Validation note

This was a documentation and tracking pass. No runtime source code changed, no browser route check was run, and no DOM-free fixture was run because the host-proof source files do not exist yet.
