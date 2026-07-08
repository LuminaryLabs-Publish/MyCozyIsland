# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T06:01:57-04:00`

**Mode:** publish-repo internal breakdown / follow-up audit

## Selection result

The full accessible `LuminaryLabs-Publish` repo list was checked against central `LuminaryLabs-Dev/LuminaryLabs` tracking.

Checked Publish repos:

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

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule.

No checked non-excluded Publish repo was fully new, central-ledger absent, or missing root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected as a follow-up target because its product route is stable, its source descriptor kits are clear, and the remaining high-value gap is now narrow: route/source/action/rail/cloud proof data must become fixture-readable without changing the visual scene.

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island app.

The active route is:

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-3
```

The README identifies the repo as a standalone Nexus-style cozy island app and states that it vendors the domain kits it needs under `src/kits/` instead of depending on external runtime kit repos at page-load time.

## Current interaction loop

```txt
open static page
  -> index.html mounts canvas#game, cloud loader, and error panel
  -> load ./src/main-cloudform.js?v=hero-cloud-3
  -> import Three.js from CDN
  -> import local domain kits
  -> create island landform, masks, ocean floor, grass, clearing, foliage, campfire, smoke, wind, and hero-cloud descriptors
  -> adapt descriptors into Three.js meshes, points, lights, and instanced objects inline
  -> show cloud loading progress
  -> render sky-to-island camera rail
  -> player scrolls from hero cloud / overview toward clearing
  -> pointer drag adjusts view yaw
  -> keyboard movement becomes relevant after first-person threshold
  -> movement is accepted or rejected by clearing/campfire policy
  -> campfire, smoke, cloud drift, camera rail, and player position update in frame loop
  -> limited compatibility state is exposed through globalThis.CozyIsland
```

## Domains in use

```txt
my-cozy-island
├─ static-shell
│  ├─ html-document
│  ├─ canvas-host
│  ├─ cloud-loader-ui
│  └─ error-panel-ui
├─ route-authority
│  ├─ route-script-token
│  ├─ hero-cloud-3-version-string
│  ├─ missing route-version-result
│  └─ missing source-fingerprint-result
├─ source-descriptor-authority
│  ├─ island-landform-state
│  ├─ island-height-sampling
│  ├─ island-mask-sampling
│  ├─ shoreline-contract
│  ├─ ocean-floor-state
│  ├─ ocean-floor-render-contract
│  ├─ grass-placement-contract
│  ├─ grass-static-batch-descriptor
│  ├─ grass-wind-descriptor
│  ├─ fenced-clearing-graph
│  ├─ player-avatar-anchor
│  ├─ clearing-collision-boundary
│  ├─ foliage-object-graph
│  ├─ campfire-object-graph
│  ├─ smoke-particle-descriptor
│  └─ hero-cloud-render-contract
├─ renderer-handoff
│  ├─ terrain-mesh-adapter
│  ├─ ocean-floor-mesh-adapter
│  ├─ water-plane-adapter
│  ├─ foam-tube-adapter
│  ├─ path-mesh-adapter
│  ├─ foliage-primitive-adapter
│  ├─ fence-post-adapter
│  ├─ campfire-render-adapter
│  ├─ smoke-points-adapter
│  ├─ grass-instanced-cone-adapter
│  └─ hero-cloud-point-renderer
├─ interaction-authority
│  ├─ scroll-progress
│  ├─ camera-rail-progress
│  ├─ pointer-look-yaw
│  ├─ keyboard-motion
│  ├─ first-person-threshold
│  ├─ clearing-boundary-policy
│  └─ campfire-keepout-policy
├─ cloud-runtime
│  ├─ hero-cloud-geometry-cache
│  ├─ point-cloud-size-alpha-tint-generation
│  ├─ cloud-drift-frame-update
│  └─ missing cloud-drift-result records
└─ diagnostics-proof
   ├─ legacy globalThis.CozyIsland
   ├─ missing globalThis.CozyIslandHost
   ├─ missing ActionFrame records
   ├─ missing ActionResult records
   ├─ missing SceneSourceSnapshot
   ├─ missing HostSnapshot
   └─ missing DOM-free fixture replay
```

## Services that the kits offer

```txt
ocean-island-landform-domain
  createOceanIslandLandformState
  createOceanIslandLandformRenderContract
  sampleIslandHeight
  sampleIslandMasks

island-foliage-domain
  createDenseCozyIslandObjectGraph
  path/foliage placement support

ocean-floor-domain
  createOceanFloorState
  createOceanFloorRenderContract

grass-object-domain
  createGrassPatchPlacementContract
  createGrassPatchBatchDescriptors
  excludes grass from water, beach, wet sand, rock, cliffs, paths, and explicit exclusion zones

grass-wind-domain
  createGrassWindDescriptor

campfire-object-domain
  createCampfireObjectGraph

smoke-particle-domain
  createSmokeParticleDescriptor

fenced-clearing-domain
  createFencedClearingGraph
  emits fence posts, player-avatar anchor, collision boundary, clearance zones, and object-exclusion zones

mattatz-clouds-domain
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit
  creates the single readable hero-cloud point-render contract consumed by mattatz-clouds-domain
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
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-host-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-movement-policy-result-kit
cozy-clearing-boundary-result-kit
cozy-campfire-keepout-result-kit
cozy-camera-rail-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-input-journal-kit
cozy-action-journal-kit
cozy-gamehost-diagnostics-kit
cozy-dom-free-fixture-runner-kit
```

## Key finding

The source descriptor side is usable, but the host/result proof layer is still implicit.

`index.html` proves the active route token with `./src/main-cloudform.js?v=hero-cloud-3`, but the runtime does not expose a route-version result.

`src/main-cloudform.js` imports all local source kits and builds the scene, but the composed source state is not snapshotted as a stable data record.

The grass kit already emits patch records and batch descriptors, while the renderer consumes only simple instanced cone geometry. That is acceptable for the current visual pass, but the next implementation should not add more grass visuals until host-source snapshots and movement/result records are fixture-readable.

The hero cloud cache is useful and intentional, but it is browser-host state, not proof state. It needs descriptor snapshots, cache snapshots, and deterministic drift-result records before it becomes a safe source of truth for future cloud/sky polish.

## Next safe ledge

```txt
MyCozyIsland Host Proof Fixture Matrix
```

Implement this as an additive proof layer, not a visual rewrite.

Target path:

```txt
src/host-proof/
├─ route-version.js
├─ source-profile.js
├─ source-fingerprint.js
├─ scene-source-snapshot.js
├─ action-frame.js
├─ action-result.js
├─ movement-policy-result.js
├─ camera-rail-snapshot.js
├─ hero-cloud-snapshot.js
├─ cloud-drift-result.js
└─ fixture-cases.mjs
```

Minimum fixture cases:

```txt
1. route token resolves to hero-cloud-3
2. source profile has stable seed/radius/cloud profile
3. source fingerprint is deterministic
4. scene source snapshot contains landform, floor, grass, clearing, campfire, smoke, wind, and cloud summaries
5. wheel action changes rail progress through an ActionResult
6. pointer drag action changes yaw through an ActionResult
7. keyboard movement inside clearing is accepted
8. keyboard movement outside clearing is rejected with clearing-boundary reason
9. keyboard movement into campfire keepout is rejected with campfire-keepout reason
10. cloud descriptor snapshot reports stable point count/lobe count/placement
11. cloud cache snapshot reports saved geometry count and point count
12. cloud drift result is deterministic for fixed dt/time
```

## Validation result

No runtime source files changed in this pass.

Connector validation only:

```txt
- Read Publish repo list.
- Read MyCozyIsland README, index route, package scripts, main runtime excerpt, grass kit, fenced-clearing kit, cloud kit, and existing .agent docs.
- Created a timestamped tracker.
- Created a timestamped turn-ledger entry.
- Added a host-proof fixture matrix audit.
- Updated root .agent docs and central tracking.
```

Not performed:

```txt
- npm install
- npm run start
- local static-server browser load
- Playwright/browser smoke
- GitHub Pages live route check
- runtime source edit
```
