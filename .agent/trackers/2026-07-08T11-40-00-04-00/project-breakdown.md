# Project Breakdown Tracker: MyCozyIsland

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T11-40-00-04-00`

## Goal

Refresh the repo-local `.agent` docs after comparing `LuminaryLabs-Publish` against the central `LuminaryLabs-Dev/LuminaryLabs` ledger, then narrow the next implementation ledge to host snapshot proof around route/source/action/movement/rail/cloud state.

## Checklist

- [x] Read current Publish repo list.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compared checked repos against central tracking.
- [x] Selected one repo only.
- [x] Read repo-local `.agent` docs.
- [x] Read README, package, index route, and runtime source excerpts.
- [x] Identified interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by kits.
- [x] Identified implemented, runtime-implied, and next-cut kits.
- [x] Added architecture audit.
- [x] Added render audit.
- [x] Added interaction audit.
- [x] Added cloud-system audit.
- [x] Added host-proof audit.
- [x] Updated root `.agent` docs.
- [x] Added timestamped turn-ledger entry.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed to `main` only.

## Repo selection

```txt
Selected: LuminaryLabs-Publish/MyCozyIsland
Excluded: LuminaryLabs-Publish/TheCavalryOfRome
Branch: main
Runtime/source implementation changed: no
```

## Selection reason

The accessible `LuminaryLabs-Publish` repo list currently includes:

```txt
LuminaryLabs-Publish/IntoTheMeadow
LuminaryLabs-Publish/HorrorCorridor
LuminaryLabs-Publish/AetherVale
LuminaryLabs-Publish/ZombieOrchard
LuminaryLabs-Publish/TheUnmappedHouse
LuminaryLabs-Publish/MyCozyIsland
LuminaryLabs-Publish/TheOpenAbove
LuminaryLabs-Publish/PhantomCommand
LuminaryLabs-Publish/TheCavalryOfRome
LuminaryLabs-Publish/PrehistoricRush
```

No checked non-Cavalry repo was found that was fully new, central-ledger absent, undocumented, or missing root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected as a fallback follow-up because it has a stable route, a complete local kit list, and the clearest remaining docs-to-implementation bridge: route/source/action/movement/camera rail/hero-cloud state still needs a fixture-readable host snapshot boundary.

## Interaction loop

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN and local kit imports
  -> construct source descriptors
  -> construct renderer and scene inline
  -> scroll wheel changes rail progress
  -> pointer drag changes yaw/look
  -> keyboard movement unlocks after progress threshold
  -> movement policy accepts or rejects position inline
  -> frame loop animates sea, smoke, fire, camera, and hero clouds
  -> renderer.render(scene, camera)
  -> legacy globalThis.CozyIsland exposes compatibility diagnostics
```

## Domains identified

```txt
static-browser-shell
route-authority
script-token-authority
source-authority
source-profile-authority
source-fingerprint-authority
scene-source-snapshot-authority
island-landform-source
heightfield-sampling
mask-sampling
shoreline-contract
terrain-render-adapter
ocean-floor-source
ocean-floor-heightfield
ocean-floor-object-placement
water-plane-render
shoreline-foam-render
path-network-source
foliage-object-graph
object-exclusion-policy
grass-placement-contract
grass-static-batch-descriptor
grass-wind-descriptor
fenced-clearing-source
player-avatar-anchor
clearing-collision-boundary
clearing-boundary-policy
campfire-keepout-policy
campfire-object-graph
smoke-particle-descriptor
smoke-particle-runtime
mattatz-cloud-source-contract
cozy-hero-cloud-form-source
hero-cloud-point-cache
hero-cloud-drift-runtime
scroll-progress-state
camera-rail-sample-curve
pointer-look-state
keyboard-input-state
first-person-threshold-gate
first-person-movement-policy
legacy-global-cozy-island
cozy-island-host-next
diagnostics-snapshot
action-frame-contract
action-result-contract
movement-policy-result-contract
cloud-drift-result-contract
fixture-script
replay-parity-smoke
```

## Kit services identified

```txt
ocean-island-landform-domain:
  createOceanIslandLandformState
  sampleIslandHeight
  sampleIslandMasks
  createOceanIslandLandformRenderContract

island-foliage-domain:
  createDenseCozyIslandObjectGraph
  createDenseCozyIslandRenderContract
  path network and object graph construction

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
  player anchor, collision boundary, clearance zones, exclusion zones

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit:
  readable hero-cloud descriptor contract
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
cozy-host-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-movement-policy-result-kit
cozy-camera-rail-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-dom-free-fixture-runner-kit
cozy-replay-parity-smoke-kit
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T11-40-00-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T11-40-00-04-00-render-host-readback.md
.agent/interaction-audit/2026-07-08T11-40-00-04-00-movement-policy-result-matrix.md
.agent/cloud-system-audit/2026-07-08T11-40-00-04-00-hero-cloud-cache-drift-matrix.md
.agent/host-proof-audit/2026-07-08T11-40-00-04-00-host-snapshot-acceptance-matrix.md
.agent/trackers/2026-07-08T11-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T11-40-00-04-00.md
```

## Main finding

The active route is aligned on `hero-cloud-4`, and the visible scene is stable enough to leave alone.

The next real implementation should not begin with better trees, grass, water, or a renderer rewrite.

It should add a pure `src/host-proof/` layer that emits `RouteVersionResult`, `SourceProfile`, `SourceFingerprint`, `SceneSourceSnapshot`, `ActionFrame`, `ActionResult`, `MovementPolicyResult`, `CameraRailSnapshot`, `HeroCloudDescriptorSnapshot`, `HeroCloudCacheSnapshot`, `CloudDriftResult`, and `CozyIslandHostSnapshot`.

## Next safe ledge

```txt
MyCozyIsland Host Snapshot Acceptance Matrix + Rail/Cloud Fixture Gate
```

## Validation

Performed:

```txt
repo-list comparison
central ledger comparison
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
npm install
npm run start
browser route check
GitHub Pages check
Playwright check
DOM-free fixture run
runtime source edit
```
