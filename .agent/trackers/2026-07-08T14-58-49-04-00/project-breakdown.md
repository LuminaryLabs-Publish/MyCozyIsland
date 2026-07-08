# Project Breakdown — MyCozyIsland

**Timestamp:** `2026-07-08T14-58-49-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Branch:** `main`

## Selection result

The full accessible `LuminaryLabs-Publish` repo list was checked through the GitHub App installation and compared against `LuminaryLabs-Dev/LuminaryLabs` central repo-ledger state.

```txt
LuminaryLabs-Publish/AetherVale          tracked / root .agent observed / central last updated 2026-07-08T13-39-15-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent observed / central latest reviewed 2026-07-08T13:59:50-04:00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent observed / central last updated 2026-07-08T13-50-37-04-00
LuminaryLabs-Publish/MyCozyIsland        selected / root .agent observed 2026-07-08T14-39-38-04-00 / central ledger still pointed at 2026-07-08T13-11-07-04-00 before this run
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent observed / central last updated 2026-07-08T14-08-24-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent observed / central last updated 2026-07-08T13:18:13-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by standing rule
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent observed / central last updated 2026-07-08T13-31-29-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent observed / central latest reviewed 2026-07-08T14-31-06-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent observed / central last updated 2026-07-08T14-18-45-04-00
```

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected because it had a repo-local `14:39` host-proof handoff while the central ledger was still stale at `13:11`, and because the next source seam is now concrete: wiring pure host-proof records into `src/main-cloudform.js` without changing the visual route.

## Current interaction loop

```txt
index.html
  -> canvas#game, cloud loader, and error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> imports Three.js CDN and local descriptor kits
  -> builds island landform, ocean floor, foliage, grass, wind, clearing, campfire, smoke, and cloud descriptors
  -> inline Three.js adapters turn descriptors into terrain, floor, water, foam, path, objects, fence, campfire, smoke, grass, and hero-cloud points
  -> resize / key / wheel / pointer handlers mutate local runtime state
  -> wheel mutates scroll progress
  -> pointer drag mutates yaw and pitch depending on progress
  -> keyboard movement unlocks only at progress >= 0.985
  -> valid(next) silently accepts or rejects movement by clearing radius and campfire keepout
  -> rail() computes camera position/look for sky-to-clearing approach
  -> fp(dt) computes first-person movement and camera view
  -> frame(now) animates sea, smoke, fire, cloud drift, camera, and renderer
  -> globalThis.CozyIsland exposes compatibility-only cloudContract, cloudPointCache, and getScrollProgress
```

## Target host-proof loop

```txt
route script token
  -> RouteVersionResult
  -> SourceProfile
  -> SourceFingerprint
  -> SceneSourceSnapshot
  -> ActionFrame
  -> ActionResult
  -> MovementPolicyResult
  -> CameraRailSnapshot
  -> HeroCloudDescriptorSnapshot
  -> HeroCloudCacheSnapshot
  -> CloudDriftResult
  -> RenderHostSnapshot
  -> CozyIslandHostSnapshot
  -> globalThis.CozyIslandHost additive diagnostics
  -> DOM-free fixture rows
```

## Domains in use

```txt
static-browser-shell
cloud-loader-ui
error-panel-ui
route-script-token
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
legacy-global-diagnostics
host-proof-authority-next
fixture-replay-authority-next
central-ledger-sync
```

## Services offered by current kits

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
  exclusion-zone support

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
  player anchor
  collision boundary
  clearance zones
  object exclusion zones

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit:
  hero cloud form descriptor
  cloud placement intent
  point-cloud drift intent

inline host services:
  route load
  loader progress
  meshGrid
  terrain/floor/water/foam/path/object/fence/campfire/smoke/grass/cloud adapters
  rail camera sample
  first-person movement
  movement validity check
  smoke update
  cloud geometry cache
  cloud drift
  legacy CozyIsland global projection
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
cozy-route-version-result-kit
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-action-rejection-reason-kit
cozy-movement-policy-result-kit
cozy-camera-rail-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-render-host-snapshot-kit
cozy-host-state-contract-kit
cozy-gamehost-diagnostics-kit
cozy-dom-free-fixture-runner-kit
cozy-replay-parity-smoke-kit
```

## Main finding

The route is visually stable and the domain descriptor kits are useful. The next pass should not retune art, movement, clouds, rail points, or grass.

The highest-value next implementation is a consumer-splice pass: add pure `src/host-proof/` records first, prove them with DOM-free fixtures, then consume those records additively inside `src/main-cloudform.js` by exposing `globalThis.CozyIslandHost` while preserving `globalThis.CozyIsland`.

## Next safe ledge

```txt
MyCozyIsland Host Proof Consumer Splice Map + Central Ledger Catch-up
```

Stop when central tracking points at the current repo-local `.agent` state and the next implementation has an exact pure-module-to-browser-consumer splice order.