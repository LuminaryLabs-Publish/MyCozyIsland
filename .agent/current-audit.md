# Current Audit: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Audit timestamp:** `2026-07-08T21-58-34-04-00`

## Summary

`MyCozyIsland` is a stable static Three.js publish route that composes local source-domain kits into a cozy island scene.

The current blocker is still proofability, not visual quality. `src/main-cloudform.js` owns source construction, render consumption, input mutation, movement policy, camera rail sampling, grass instancing, cloud cache generation, cloud drift, and legacy globals inline. The next implementation should make those facts fixture-readable before any visual rewrite or shared-kit extraction.

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
  MyCozyIsland was the oldest eligible fallback by current central alignment and still needs browser-consumer proof for route/source/action/movement/rail/grass/cloud/render/host records.
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
  -> create island, floor, foliage, grass, wind, clearing, campfire, smoke, and cloud descriptors
  -> create Three.js scene, renderer, camera, meshes, points, lights, fog, water, foam, path, grass, cloud geometry cache
  -> install resize, keyboard, wheel, pointerdown, pointerup, pointermove handlers
  -> wheel changes scroll progress directly
  -> rail() samples position/look along sky-to-eye camera curve
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
  createGrassWindDescriptor
  createCampfireObjectGraph
  createSmokeParticleDescriptor
  createFencedClearingGraph
  createMattatzCloudsState
  createMattatzCloudRenderContract
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
  heroCloudGeometry
  heroCloudGroup
  resize
  rail
  valid
  fp
  frame
  globalThis.CozyIsland

needed proof services:
  createRouteVersionResult
  createSourceProfile
  createSourceFingerprint
  createSceneSourceSnapshot
  createBrowserInputActionFrame
  createActionResult
  appendInputJournalEntry
  createMovementPolicyResult
  createCameraRailSnapshot
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
  cozy-route-version-result-kit
  cozy-source-profile-kit
  cozy-source-fingerprint-kit
  cozy-scene-source-snapshot-kit
  cozy-browser-input-action-frame-kit
  cozy-action-result-kit
  cozy-input-journal-kit
  cozy-movement-policy-result-kit
  cozy-camera-rail-snapshot-kit
  cozy-grass-instance-snapshot-kit
  cozy-hero-cloud-descriptor-snapshot-kit
  cozy-hero-cloud-cache-snapshot-kit
  cozy-cloud-drift-result-kit
  cozy-render-host-snapshot-kit
  cozy-island-host-state-kit
  cozy-browser-consumer-fixture-kit
```

## Main finding

The source has enough domain kits to describe the island, but the browser runtime consumes those descriptors immediately and loses audit-grade proof of what was accepted, rejected, rendered, cached, drifted, or projected.

The next pass should add pure `src/host-proof/` modules first, then splice them into `src/main-cloudform.js` additively. Preserve `globalThis.CozyIsland`, and expose a new `globalThis.CozyIslandHost.getState()` projection only after fixture rows prove the source records without WebGL.
