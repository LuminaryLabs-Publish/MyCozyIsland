# Current Audit: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Audit timestamp:** `2026-07-08T17-00-36-04-00`

## Summary

`MyCozyIsland` is a stable static Three.js publish route that composes local source-domain kits into a cozy island scene.

The visual scene is already coherent enough for the current slice. The blocker is proofability: route, source, interaction, movement, camera rail, grass, hero-cloud cache/drift, render readback, and host diagnostics are still mostly inline browser facts inside `src/main-cloudform.js` rather than pure, fixture-readable result records.

## Repo selection result

```txt
Checked accessible Publish list:
  HorrorCorridor
  AetherVale
  TheOpenAbove
  TheCavalryOfRome
  PhantomCommand
  PrehistoricRush
  ZombieOrchard
  IntoTheMeadow
  MyCozyIsland
  TheUnmappedHouse

Excluded:
  TheCavalryOfRome

Central/root-agent comparison:
  No checked non-Cavalry repo was fully new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root .agent/START_HERE.md.

Selected:
  LuminaryLabs-Publish/MyCozyIsland

Reason:
  MyCozyIsland was the oldest eligible central-ledger fallback in the current readback and still needs a concrete host-proof source-file manifest plus browser consumer fixture gate.
```

## Current route

```txt
index.html
  -> canvas#game
  -> cloud loader
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
  -> wheel changes scroll progress
  -> rail() samples position/look along sky-to-eye camera curve
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing radius and campfire keepout
  -> updateSmoke, flame animation, sea bob, cloud drift, camera, and renderer run every frame
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
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
source-profile-authority-next
source-fingerprint-authority-next
scene-source-snapshot-next
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

## Services currently offered by kits and host adapters

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
  createGrassPatchBatchDescriptors

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
cozy-route-script-token-kit
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
cozy-grass-instance-snapshot-kit
cozy-grass-source-readback-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-render-host-snapshot-kit
cozy-host-state-contract-kit
cozy-host-snapshot-kit
cozy-gamehost-diagnostics-kit
cozy-dom-free-fixture-runner-kit
cozy-replay-parity-smoke-kit
```

## Current high-value gap

```txt
route token is visible in index.html but not a RouteVersionResult
source descriptors are created but not summarized as SourceProfile / SourceFingerprint / SceneSourceSnapshot
input actions mutate local state but are not captured as ActionFrame / ActionResult
movement rejection is silent and lacks MovementPolicyResult reasons
rail samples are not fixture-readable as CameraRailSnapshot records
grass instance count and placement contract are not summarized as GrassInstanceSnapshot
hero-cloud geometry cache is not summarized as HeroCloudCacheSnapshot
cloud drift mutates objects but is not represented as CloudDriftResult
render host state is not summarized as RenderHostSnapshot
legacy globalThis.CozyIsland exists but no additive globalThis.CozyIslandHost proof surface exists
```

## New audit artifacts

```txt
.agent/architecture-audit/2026-07-08T17-00-36-04-00-host-proof-source-manifest-dsk-breakdown.md
.agent/render-audit/2026-07-08T17-00-36-04-00-render-snapshot-source-readback.md
.agent/interaction-audit/2026-07-08T17-00-36-04-00-action-movement-result-rows.md
.agent/cloud-system-audit/2026-07-08T17-00-36-04-00-cloud-cache-drift-source-readback.md
.agent/grass-system-audit/2026-07-08T17-00-36-04-00-grass-instance-source-readback.md
.agent/host-proof-audit/2026-07-08T17-00-36-04-00-source-file-manifest-browser-splice.md
```

## Next safe ledge

```txt
MyCozyIsland Host Proof Source Manifest + Browser Consumer Fixture Gate
```