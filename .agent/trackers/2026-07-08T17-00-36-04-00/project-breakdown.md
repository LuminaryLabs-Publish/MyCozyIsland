# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-00-36-04-00`

## Plan ledger

**Goal:** Refresh one eligible Publish repo's internal `.agent` docs, verify the current Publish-org versus central-ledger state, and narrow the next implementation handoff into a precise host-proof source manifest and browser consumer fixture gate.

**Checklist:**

- [x] Listed the accessible `LuminaryLabs-Publish` repository set.
- [x] Compared the set against `LuminaryLabs-Dev/LuminaryLabs` central repo-ledger files.
- [x] Excluded `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Selected one repo only: `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Read route/source excerpts from `index.html`, `package.json`, and `src/main-cloudform.js`.
- [x] Identified the interaction loop.
- [x] Identified domains in use.
- [x] Identified services offered by current kits and inline host adapters.
- [x] Identified implemented, runtime-implied, and next-cut kits.
- [x] Added timestamped architecture, render, interaction, grass, cloud, host-proof, tracker, and turn-ledger docs.
- [x] Updated root `.agent` operating docs and kit registry.
- [x] Updated central repo ledger and internal change log.
- [ ] Runtime source edit.
- [ ] Local static-server validation.
- [ ] Browser validation.
- [ ] DOM-free fixture run.

## Publish org comparison

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent observed / last central review 2026-07-08T15:39:43-04:00
LuminaryLabs-Publish/AetherVale          tracked / root .agent observed / last central update 2026-07-08T15-20-41-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent observed / last central update 2026-07-08T15-11-18-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent observed / last central update 2026-07-08T15-58-59-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent observed / last central update 2026-07-08T16-40-56-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent observed / last central update 2026-07-08T16-20-00-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent observed / last central update 2026-07-08T15-28-13-04-00
LuminaryLabs-Publish/MyCozyIsland        selected fallback / last central update 2026-07-08T14-58-49-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent observed / last central review 2026-07-08T16-19-57-04-00
```

## Selection reason

No checked non-Cavalry repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected as the oldest eligible fallback in the current central readback and because the previous handoff still stopped at planning instead of a source-file manifest and browser fixture gate.

## Current route read

```txt
index.html
  -> canvas#game
  -> #cloud-loader
  -> #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

`package.json` only exposes:

```txt
npm run start -> python3 -m http.server 8080
```

## Interaction loop

```txt
open index.html
  -> canvas, loader, and error panel are mounted
  -> src/main-cloudform.js?v=hero-cloud-4 imports Three.js CDN and local descriptor kits
  -> island, floor, foliage, grass, wind, clearing, campfire, smoke, and cloud descriptors are created
  -> renderer, scene, camera, lights, fog, terrain, ocean, foam, path, foliage, fence, campfire, smoke, grass, and cloud point objects are built inline
  -> wheel event mutates scroll progress
  -> pointerdown/up/move mutates drag, yaw, and pitch
  -> keyboard set stores W/A/S/D intent
  -> rail() computes camera path before first-person threshold
  -> fp(dt) computes first-person movement after progress >= 0.985
  -> valid(next) silently accepts or rejects by clearing radius and campfire keepout
  -> frame(now) updates sea, movement/rail camera, smoke, fire, cloud drift, and renderer
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Domains in use

```txt
static-browser-shell
route-token-authority-next
cloud-loader-ui
error-panel-ui
three-cdn-runtime
local-source-domain-runtime
island-landform-source
heightfield-sampler
mask-sampler
shoreline-contract
ocean-floor-source
foliage-object-graph
path-network-source
grass-placement-contract
grass-wind-descriptor
grass-instancing-renderer
grass-source-readback-next
fenced-clearing-source
player-anchor-source
clearing-boundary-policy
campfire-keepout-policy
campfire-object-graph
smoke-particle-descriptor
mattatz-cloud-source
hero-cloud-form-source
hero-cloud-cache-runtime
hero-cloud-drift-runtime
renderer-host
terrain-render-adapter
ocean-render-adapter
path-render-adapter
foliage-render-adapter
fence-render-adapter
campfire-render-adapter
smoke-render-adapter
cloud-point-render-adapter
camera-rail-authority
pointer-look-state
keyboard-input-state
movement-policy-authority
legacy-global-diagnostics
host-proof-authority-next
fixture-replay-authority-next
```

## Services the kits offer

```txt
ocean-island-landform-domain:
  createOceanIslandLandformState
  createOceanIslandLandformRenderContract
  sampleIslandHeight
  sampleIslandMasks

island-foliage-domain:
  createDenseCozyIslandObjectGraph
  path network generation
  object graph generation
  exclusion support

ocean-floor-domain:
  createOceanFloorState
  createOceanFloorRenderContract

grass-object-domain:
  createGrassPatchPlacementContract
  createGrassPatchBatchDescriptors

grass-wind-domain:
  createGrassWindDescriptor

fenced-clearing-domain:
  createFencedClearingGraph
  player anchor
  collision boundary
  clearance zones
  object exclusion zones

campfire-object-domain:
  createCampfireObjectGraph

smoke-particle-domain:
  createSmokeParticleDescriptor

mattatz-clouds-domain:
  createMattatzCloudsState
  createMattatzCloudRenderContract

cozy-hero-cloud-form-kit:
  hero cloud shape intent
  point-cloud puff layout intent
  cloud placement/drift descriptor intent

inline host adapters:
  terrainMesh
  floorMesh
  waterMesh
  foamMesh
  pathMesh
  objGroup
  fenceGroup
  campfireMesh
  smokeMesh/updateSmoke
  grassMesh
  heroCloudGeometry/heroCloudGroup
  rail
  valid
  fp
  frame
  globalThis.CozyIsland
```

## Kits identified

Implemented local kits:

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
cozy-grass-instancing-kit
cozy-hero-cloud-cache-kit
cozy-hero-cloud-drift-kit
cozy-scroll-camera-rail-kit
cozy-pointer-look-kit
cozy-keyboard-movement-kit
cozy-clearing-boundary-policy-kit
cozy-campfire-keepout-policy-kit
cozy-legacy-global-host-kit
```

Next-cut kits:

```txt
cozy-route-version-result-kit
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-movement-policy-result-kit
cozy-camera-rail-snapshot-kit
cozy-grass-source-readback-kit
cozy-grass-instance-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-render-host-snapshot-kit
cozy-host-snapshot-kit
cozy-gamehost-diagnostics-kit
cozy-dom-free-fixture-runner-kit
```

## Main finding

The game does not need a visual rewrite next.

It needs a host-proof layer that extracts browser facts into deterministic source records before `src/main-cloudform.js` starts exporting richer diagnostics.

## Next safe ledge

```txt
MyCozyIsland Host Proof Source Manifest + Browser Consumer Fixture Gate
```

## Source-file manifest for next implementation

```txt
src/host-proof/route-version.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/action-frame.js
src/host-proof/action-result.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/hero-cloud-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/host-snapshot.js
src/host-proof/fixture-cases.mjs
```

## Browser consumer splice points

```txt
src/main-cloudform.js imports
route token read from index.html script URL
source descriptor construction block
grass placement and grassMesh(grass)
wheel handler
pointer handlers
keyboard movement / fp(dt)
valid(next)
rail()
heroCloudGeometry/cloudCache
heroCloudGroup(contract)
frame(now) cloud drift
renderer/camera/scene projection
globalThis.CozyIslandHost additive export
```

## Validation status

No runtime code changed.

No local checkout, static server, browser route, Playwright, GitHub Pages, or DOM-free fixture validation was run in this pass.