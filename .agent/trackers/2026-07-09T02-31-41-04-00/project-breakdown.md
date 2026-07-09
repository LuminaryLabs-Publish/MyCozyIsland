# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T02-31-41-04-00`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repo list against central tracking, choose one eligible repo, update repo-local `.agent` docs, and log the change centrally.

**Checklist:**

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Compared checked repos against central ledger/root `.agent` state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo: `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified kit services.
- [x] Identified implemented, runtime-implied, and next-cut kits.
- [x] Updated root `.agent` docs.
- [x] Added architecture, render, interaction, cloud-system, grass-system, host-proof, deploy, tracker, and turn-ledger docs.
- [x] Updated `.agent/kit-registry.json`.
- [x] Updated central ledger in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Added central internal change-log entry.
- [ ] Runtime source files were not changed.
- [ ] Local/browser/fixture validation was not run.

## Repository comparison

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present
LuminaryLabs-Publish/AetherVale           tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland         selected / oldest eligible sampled fallback
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
```

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> construct island, ocean floor, foliage, clearing, fire, smoke, grass, wind, cloud, and hero-cloud descriptors
  -> create Three.js renderer, scene, camera, lights, fog, water, terrain, floor, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud clouds
  -> install resize, keyboard, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates scroll progress directly
  -> rail() samples the sky-to-eye camera curve while progress < 0.985
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing boundary and campfire keepout only
  -> frame updates sea bob, first-person movement or rail camera, smoke, flame, cloud drift, and renderer
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Domains in use

```txt
static-browser-shell
cloud-loader-ui
error-panel-ui
module-entry-route
route-version-token
three-cdn-runtime
local-source-domain-runtime
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
inline-three-render-host
terrain-render-consumer
floor-render-consumer
water-render-consumer
shoreline-foam-render-consumer
path-render-consumer
foliage-render-consumer
fence-render-consumer
campfire-render-consumer
smoke-runtime-consumer
grass-instancing-consumer
grass-static-batch-readiness
hero-cloud-point-render-consumer
hero-cloud-geometry-cache
hero-cloud-drift-runtime
scroll-camera-rail
pointer-look-input
keyboard-first-person-input
movement-policy
clearing-boundary-policy
campfire-keepout-policy
frame-loop-runtime
legacy-global-diagnostics
host-proof-source-records
host-state-projection
fixture-replay-contract
central-ledger-readback
```

## Services that kits offer

```txt
source descriptor services:
  createOceanIslandLandformState
  createOceanIslandLandformRenderContract
  sampleIslandHeight
  sampleIslandMasks
  createDenseCozyIslandObjectGraph
  createOceanFloorState
  createOceanFloorRenderContract
  createGrassPatchPlacementContract
  createGrassPatchBatchDescriptors
  createGrassWindDescriptor
  createCampfireObjectGraph
  createSmokeParticleDescriptor
  createFencedClearingGraph
  createMattatzCloudsState
  createMattatzCloudRenderContract
  createCozyHeroCloudFormDescriptor
  createCozyHeroCloudLayerDescriptor
  createCozyHeroCloudRenderContract

inline render/interaction services:
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
  cloudMaterial
  heroCloudGeometry
  heroCloudGroup
  resize
  rail
  valid
  fp
  frame
  globalThis.CozyIsland
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

runtime-implied kits:
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
  cozy-grass-static-batch-readiness-kit
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

## Main finding

The current island is visually stable enough to preserve. The highest-value next work is fixture-readable host proof: route token readback, source profile/fingerprint, input/action/movement results, camera rail snapshots, grass placement/instance parity, cloud descriptor/cache/drift readback, render host snapshots, and additive `globalThis.CozyIslandHost.getState()`.

## Next safe ledge

```txt
MyCozyIsland Browser Consumer Proof Split + Cloud/Grass Readback Fixture Gate
```
