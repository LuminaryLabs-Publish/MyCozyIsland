# Project Breakdown — MyCozyIsland

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T13-11-07-04-00`

## Plan ledger

**Goal:** Refresh the root `.agent` operating docs for one eligible `LuminaryLabs-Publish` repo by comparing the current Publish repo list against central tracking, selecting the oldest eligible non-Cavalry follow-up, and recording the current interaction loop, domains, services, kits, gaps, validation state, and next implementation ledge.

**Checklist**

- [x] Listed accessible `LuminaryLabs-Publish` repos from the GitHub App installation.
- [x] Compared checked repos against `LuminaryLabs-Dev/LuminaryLabs` central ledger state.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome` by standing rule.
- [x] Selected `LuminaryLabs-Publish/MyCozyIsland` as the oldest observed eligible fallback.
- [x] Re-read repo-local source and `.agent` state.
- [x] Identified current interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by current kits and host adapters.
- [x] Identified implemented, runtime-implied, and next-cut kits.
- [x] Added timestamped tracker and turn-ledger entries.
- [x] Added architecture, render, interaction, cloud-system, and host-proof audit entries.
- [x] Updated root `.agent` operating docs and kit registry.
- [x] Logged the pass in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Pushed directly to `main` without creating a branch.

## Publish repo comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / latest sampled alignment 2026-07-08T12-29-17-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / latest sampled alignment 2026-07-08T12-01-23-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / latest sampled alignment 2026-07-08T11-49-04-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / latest sampled alignment 2026-07-08T12-41-31-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / latest sampled alignment 2026-07-08T12-09-27-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / latest sampled alignment 2026-07-08T12-51-50-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / latest sampled alignment 2026-07-08T12-21-20-04-00
LuminaryLabs-Publish/MyCozyIsland        selected fallback / latest sampled alignment 2026-07-08T11-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / latest sampled alignment 2026-07-08T12-59-11-04-00
```

No checked non-Cavalry Publish repo was fully new, absent from central tracking, undocumented, or missing sampled root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected because it had the oldest observed eligible sampled alignment and still has a high-value fixture boundary around route/source/host proof.

## Current route

```txt
index.html
  -> canvas#game
  -> cloud loader / error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local domain-kit descriptor imports
  -> inline render adapters and frame loop
```

## Current interaction loop

```txt
open route
  -> cloud loader progresses
  -> source descriptors are created for island, floor, foliage, grass, wind, campfire, smoke, clearing, and clouds
  -> Three.js scene adapters create terrain, water, foam, paths, foliage, fence, campfire, smoke, grass, and hero-cloud point geometry
  -> wheel input advances scroll progress along the sky-to-clearing camera rail
  -> pointer drag updates rail yaw or first-person look depending on progress
  -> keyboard movement unlocks near first-person threshold
  -> movement is accepted or rejected by clearing radius and campfire keepout policy
  -> sea, fire, smoke, and hero clouds animate every frame
  -> renderer draws the frame
  -> `globalThis.CozyIsland` exposes compatibility state only
```

## Domains in use

```txt
static-browser-shell
cloud-loader-ui
error-panel-ui
route-version-authority
source-profile-authority
scene-source-snapshot
three-cdn-runtime
renderer-host
island-landform-source
ocean-floor-source
foliage-object-graph
grass-placement-contract
grass-wind-descriptor
fenced-clearing-source
campfire-object-graph
smoke-particle-source
mattatz-cloud-source
hero-cloud-form-source
hero-cloud-cache-runtime
hero-cloud-drift-runtime
water-render-adapter
terrain-render-adapter
path-render-adapter
foliage-render-adapter
fence-render-adapter
campfire-render-adapter
smoke-runtime-adapter
grass-instancing-adapter
scroll-camera-rail
pointer-look-state
keyboard-input-state
first-person-threshold-gate
movement-policy
clearing-boundary-policy
campfire-keepout-policy
legacy-global-diagnostics
host-proof-diagnostics
fixture-replay-authority
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
  path network and object graph generation
  foliage/path exclusion intent

ocean-floor-domain:
  createOceanFloorState
  createOceanFloorRenderContract

grass-object-domain:
  createGrassPatchPlacementContract
  exclusion-aware patch placement

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
  object exclusion zones

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit:
  readable hero cloud descriptor
  point-cloud placement/drift intent

inline host adapters:
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
  rail
  valid
  fp
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
cozy-host-state-contract-kit
cozy-host-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-action-rejection-reason-kit
cozy-action-journal-kit
cozy-input-journal-kit
cozy-movement-policy-result-kit
cozy-clearing-boundary-result-kit
cozy-campfire-keepout-result-kit
cozy-camera-rail-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-gamehost-diagnostics-kit
cozy-dom-free-fixture-runner-kit
cozy-replay-parity-smoke-kit
```

## Main finding

The scene route is stable and should not be visually expanded yet.

The highest-value next implementation is a DOM-free **Host Proof Fixture Row Contract** that makes route version, source profile, scene source, action frames, movement decisions, rail samples, hero-cloud cache state, cloud drift, and additive host snapshots stable as data before changing rendering.

## Next safe ledge

```txt
MyCozyIsland Host Proof Fixture Row Contract + CozyIslandHost Snapshot Gate
```

Stop the next implementation when pure host-proof modules can run without DOM, canvas, Three.js, browser, or static server, and when `src/main-cloudform.js` exposes `globalThis.CozyIslandHost` additively without removing or changing `globalThis.CozyIsland`.

## Validation

No runtime source files changed in this documentation pass.

No local build, static server, browser route check, Playwright run, GitHub Pages check, or DOM-free fixture was run.
