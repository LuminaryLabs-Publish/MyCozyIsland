# Project Breakdown: MyCozyIsland

**Timestamp:** `2026-07-08T19-40-00-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Branch target:** `main`

**Runtime/source files changed:** no

## Plan ledger

**Goal:** Compare the current `LuminaryLabs-Publish` repo list against central tracking, select one eligible repo, refresh repo-local `.agent` docs, identify the loop/domains/services/kits, and log the change in `LuminaryLabs-Dev/LuminaryLabs`.

**Checklist**

- [x] Listed accessible `LuminaryLabs-Publish` repositories.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compared central ledger state in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Sampled root `.agent/START_HERE.md` state for current non-excluded repo set.
- [x] Selected one repo only: `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Read repo-local `.agent` docs.
- [x] Read `index.html`.
- [x] Read `package.json`.
- [x] Read `src/main-cloudform.js` route, imports, descriptor creation, render adapters, input, movement, rail, grass, cloud, frame, and legacy host anchors.
- [x] Identified interaction loop.
- [x] Identified all active domains.
- [x] Identified kit services.
- [x] Identified implemented, runtime-implied, and next-cut kits.
- [x] Updated required root `.agent` docs.
- [x] Added timestamped tracker and turn-ledger entry.
- [x] Added architecture audit.
- [x] Added render audit.
- [x] Added interaction audit.
- [x] Added cloud-system audit.
- [x] Added grass-system audit.
- [x] Added host-proof audit.
- [x] Added deploy audit.
- [x] Updated central repo ledger.
- [x] Added central internal change-log entry.
- [x] Pushed only to `main`.

## Repo selection

The accessible Publish repo list was:

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

No checked non-Cavalry repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`TheCavalryOfRome` remained excluded.

`MyCozyIsland` was selected as the oldest eligible fallback by sampled root-agent alignment.

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> create island, floor, foliage, grass, wind, clearing, campfire, smoke, and cloud descriptors
  -> create Three.js scene, renderer, camera, meshes, points, lights, fog, water, foam, path, grass, cloud geometry cache
  -> install resize, keyboard, wheel, pointerdown, pointerup, pointermove handlers
  -> wheel changes scroll progress
  -> rail() samples position/look along sky-to-eye camera curve
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing radius and campfire keepout
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
grass-instance-readback
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
render-host-snapshot
legacy-global-diagnostics
cozy-island-host-proof
browser-consumer-fixture-authority
central-ledger-sync
```

## Services that kits offer

```txt
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
```

Inline host services that need proof wrappers:

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
globalThis.CozyIsland
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
cozy-grass-instance-snapshot-kit
cozy-grass-source-readback-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-render-host-snapshot-kit
cozy-host-state-contract-kit
cozy-host-snapshot-kit
cozy-gamehost-diagnostics-kit
cozy-browser-consumer-fixture-kit
cozy-dom-free-fixture-runner-kit
cozy-replay-parity-smoke-kit
cozy-central-ledger-sync-kit
```

## Files changed in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-08T19-40-00-04-00-host-proof-browser-consumer-dsk-map.md
.agent/render-audit/2026-07-08T19-40-00-04-00-render-host-consumer-readback.md
.agent/interaction-audit/2026-07-08T19-40-00-04-00-action-movement-browser-consumer-map.md
.agent/cloud-system-audit/2026-07-08T19-40-00-04-00-hero-cloud-cache-drift-consumer-map.md
.agent/grass-system-audit/2026-07-08T19-40-00-04-00-grass-instance-host-readback-map.md
.agent/host-proof-audit/2026-07-08T19-40-00-04-00-browser-consumer-fixture-manifest.md
.agent/deploy-audit/2026-07-08T19-40-00-04-00-static-route-validation-map.md
.agent/trackers/2026-07-08T19-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T19-40-00-04-00.md
```

## Validation

```txt
runtime source changed: no
local checkout: no
npm install: no
npm run start: no
browser route check: no
fixture run: no, fixture files do not exist yet
branch created: no
pull request created: no
pushed to main: yes
```

## Next safe ledge

```txt
MyCozyIsland Browser Consumer Fixture Gate + Host Proof Snapshot
```

Start with pure `src/host-proof/*` modules and `scripts/my-cozy-island-browser-consumer-fixture.mjs`. Do not change visuals, route token, or legacy `globalThis.CozyIsland` compatibility during that proof pass.
