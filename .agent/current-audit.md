# Current Audit: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Audit timestamp:** `2026-07-09T02-31-41-04-00`

## Summary

`MyCozyIsland` is a stable static Three.js publish route that composes local source-domain kits into a cozy island scene. The current gap is still proofability, but this pass narrows it: the next source cut should split browser consumer proof into route/source, input/movement/rail, cloud, grass, render, and host projection records.

`src/main-cloudform.js` owns source descriptor construction, render adapter consumption, input mutation, movement policy, camera rail sampling, grass instancing, hero-cloud geometry caching, cloud drift, frame rendering, and the legacy `globalThis.CozyIsland` diagnostic surface inline. That is usable today, but not fixture-readable enough for durable DSK promotion.

## Repo selection result

```txt
Checked accessible Publish list:
  IntoTheMeadow
  HorrorCorridor
  AetherVale
  ZombieOrchard
  TheUnmappedHouse
  MyCozyIsland
  TheOpenAbove
  PhantomCommand
  TheCavalryOfRome
  PrehistoricRush

Excluded:
  TheCavalryOfRome

Central/root-agent comparison:
  No checked non-Cavalry repo was fully new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root .agent/START_HERE.md.

Selected:
  LuminaryLabs-Publish/MyCozyIsland

Reason:
  MyCozyIsland was the oldest eligible sampled fallback in this pass. It still needs browser-consumer proof for route/source/action/movement/rail/grass/cloud/render/host records.
```

## Current route

```txt
index.html
  -> canvas#game
  -> cloud-loader
  -> error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN
  -> import local domain descriptor kits
  -> create island, floor, foliage, grass, wind, clearing, campfire, smoke, cloud, and hero-cloud descriptors
  -> create Three.js scene, renderer, camera, meshes, points, lights, fog, water, foam, path, grass, cloud geometry cache
  -> install resize, keyboard, wheel, pointerdown, pointerup, pointermove handlers
  -> wheel changes scroll progress directly
  -> rail() samples position/look along a sky-to-eye camera curve
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing radius and campfire keepout
  -> frame updates sea bob, movement, rail/camera, smoke, flame, cloud drift, renderer
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

## Services in use

```txt
implemented descriptor services:
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

implemented inline host services:
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

needed proof services:
  createRouteTokenReadback
  createSourceProfile
  createSourceFingerprint
  createSceneSourceSnapshot
  createBrowserInputActionFrame
  createActionResult
  appendInputJournalEntry
  createMovementPolicyResult
  ️createCameraRailSnapshot
  createGrassPlacementSnapshot
  createGrassInstanceSnapshot
  createHeroCloudDescriptorSnapshot
  createHeroCloudCacheSnapshot
  createCloudDriftResult
  createRenderHostSnapshot
  createCozyIslandHostSnapshot
  runBrowserConsumerFixtureRows
```

## Kits identified

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
  cozy-dom-free-fixture-runner-kit
  cozy-replay-parity-smoke-kit
  cozy-central-ledger-sync-kit
```

## Main finding

The scene already has enough source-domain kits. The weak point is that browser runtime consumption is still invisible to fixtures: accepted/rejected input effects, movement rejection reasons, rail samples, grass placement and instance parity, static-batch readiness, hero-cloud cache readback, drift deltas, render consumers, and host state projections are not stable records.

The next pass should add pure `src/host-proof/` modules first, then splice them into `src/main-cloudform.js` additively. Preserve `globalThis.CozyIsland`; expose `globalThis.CozyIslandHost.getState()` only after fixture rows prove route/source/action/movement/rail/grass/cloud/render records without WebGL.
