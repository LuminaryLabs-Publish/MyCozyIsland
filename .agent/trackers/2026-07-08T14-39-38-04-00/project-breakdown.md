# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T14-39-38-04-00`

**Branch:** `main`

## Plan ledger

**Goal:** Compare the full accessible `LuminaryLabs-Publish` repo list against central `LuminaryLabs-Dev/LuminaryLabs` tracking, select one eligible non-Cavalry repo, refresh its root `.agent/` docs, and record the central ledger update.

**Checklist**

- [x] Listed accessible `LuminaryLabs-Publish` repos.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compared checked repos against central repo-ledger and recent central commit ordering.
- [x] Selected one repo only.
- [x] Read repo-local `.agent` state.
- [x] Read source files for route, descriptors, render adapters, input handlers, movement, camera rail, cloud cache, and global diagnostics.
- [x] Identified interaction loop.
- [x] Identified all domains in use.
- [x] Identified services that the kits offer.
- [x] Identified implemented, runtime-implied, and next-cut kits.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Added architecture, render, interaction, cloud-system, and host-proof audits.
- [x] Updated root `.agent` docs.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed to `main` only.

## Repo selected

```txt
LuminaryLabs-Publish/MyCozyIsland
```

## Selection reason

The accessible `LuminaryLabs-Publish` repo list was checked through the GitHub App installation:

```txt
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
```

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by rule.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected as the oldest eligible fallback from recent central repo-ledger update ordering. Its unresolved seam is still high-value: `src/main-cloudform.js` owns route/source construction, render construction, input mutation, rail sampling, movement policy, cloud cache, cloud drift, frame animation, and legacy diagnostics inline.

## Source readback

Current static route:

```txt
index.html
  -> canvas#game
  -> cloud loader
  -> error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

Current local source-domain imports:

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
```

The README also records `cozy-hero-cloud-form-kit` as an included domain kit.

## Current interaction loop

```txt
open static route
  -> load ./src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> create island landform, floor, clearing, foliage, wind, campfire, smoke, grass, and cloud descriptors
  -> create Three.js renderer, scene, camera, lights, fog, meshes, instancing, point clouds, and cloud cache inline
  -> register resize, keyboard, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates scroll progress
  -> pointer drag mutates yaw before first-person and yaw/pitch after first-person
  -> rail() samples sky-to-eye camera position/look while progress < 0.985
  -> keyboard movement unlocks when progress >= 0.985
  -> valid(next) silently accepts or rejects movement by clearing radius and campfire keepout
  -> frame loop animates sea, smoke, flame, clouds, camera, and player state
  -> renderer.render(scene, camera)
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
shoreline-render-contract
ocean-floor-source
ocean-floor-render-contract
foliage-object-graph
object-exclusion-policy
path-network-source
grass-placement-contract
grass-instancing-runtime
grass-wind-descriptor
fenced-clearing-source
player-avatar-anchor
clearing-collision-boundary
campfire-keepout-policy
campfire-object-graph
smoke-particle-descriptor
smoke-runtime-adapter
mattatz-cloud-source
hero-cloud-form-source
hero-cloud-geometry-cache
hero-cloud-cache-snapshot-next
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
hero-cloud-point-render-adapter
scroll-progress-state
camera-rail-authority
pointer-look-state
keyboard-input-state
first-person-threshold-gate
movement-policy-authority
movement-result-authority-next
action-frame-authority-next
action-result-authority-next
render-host-snapshot-next
legacy-global-diagnostics
cozy-island-host-next
fixture-replay-authority-next
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
  hero-cloud placement intent
  point-cloud drift intent
```

## Inline host/render services

```txt
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
globalThis.CozyIsland compatibility exposure
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
cozy-route-script-token-kit
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

## Main finding

The next implementation should not change the scene first.

The correct next ledge is a proofability cut: pure `src/host-proof/` modules that produce fixture-readable route, source, action, movement, rail, cloud, render, and host snapshots without DOM, canvas, Three.js, browser, or a static server.

Only after those fixtures pass should `src/main-cloudform.js` wire the results into an additive `globalThis.CozyIslandHost` surface.

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T14-39-38-04-00-host-proof-module-boundary.md
.agent/render-audit/2026-07-08T14-39-38-04-00-render-readback-wire-map.md
.agent/interaction-audit/2026-07-08T14-39-38-04-00-action-result-consumer-wire-map.md
.agent/cloud-system-audit/2026-07-08T14-39-38-04-00-hero-cloud-snapshot-wire-map.md
.agent/host-proof-audit/2026-07-08T14-39-38-04-00-cozy-island-host-wire-contract.md
.agent/trackers/2026-07-08T14-39-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T14-39-38-04-00.md
```

## Central files changed

```txt
repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
internal-change-log/2026-07-08T14-39-38-04-00-my-cozy-island-host-wire-contract.md
```

## Validation

Performed:

```txt
GitHub App repo-list readback
central ledger readback
repo-local .agent readback
README readback
package readback
index route readback
src/main-cloudform.js source readback
root .agent documentation update
architecture/render/interaction/cloud/host-proof audit creation
central repo-ledger update
central internal change-log entry
```

Not performed:

```txt
npm run start
browser route check
GitHub Pages check
Playwright check
DOM-free fixture run
runtime source edit
```

## Next safe ledge

```txt
MyCozyIsland Host Proof Module Boundary + CozyIslandHost Wire Contract
```

Stop condition for the next implementation:

```txt
DOM-free fixture rows prove RouteVersionResult, SourceProfile, SourceFingerprint, SceneSourceSnapshot, ActionFrame, ActionResult, MovementPolicyResult, CameraRailSnapshot, HeroCloudDescriptorSnapshot, HeroCloudCacheSnapshot, CloudDriftResult, RenderHostSnapshot, CozyIslandHostSnapshot, legacy global compatibility, and additive host diagnostics.
```
