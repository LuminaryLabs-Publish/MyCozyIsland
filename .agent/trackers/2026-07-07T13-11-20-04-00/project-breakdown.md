# MyCozyIsland breakdown

**Run timestamp:** `2026-07-07T13:11:20-04:00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Selected because:** this Publish repo exists in the org scan and had no central `LuminaryLabs-Dev/LuminaryLabs` repo-ledger entry. It was therefore the oldest eligible undocumented Publish repo found for this run. `LuminaryLabs-Publish/TheCavalryOfRome` stayed excluded.

## Summary

`MyCozyIsland` is a standalone static Nexus-style Cozy Island app. It loads `index.html`, imports `src/main.js`, vendors its local domain kits under `src/kits/`, and renders a scroll-driven sky-to-first-person cozy island scene with terrain, ocean floor, foliage, grass, campfire, smoke, fence clearing, high-level point-cloud clouds, and first-person movement inside the fenced clearing.

The project is playable enough to present the scene, but most runtime authority is still inline in `src/main.js`. The next safe slice should not be visual expansion first. It should introduce a stable host snapshot, camera rail state contract, cloud cache descriptor contract, and fixture smoke so later work can safely extract render, movement, cloud, and scene domains.

## Source files reviewed

```txt
README.md
package.json
index.html
src/main.js
src/kits/ocean-island-landform-domain/index.js
src/kits/island-foliage-domain/index.js
src/kits/grass-object-domain/index.js
src/kits/fenced-clearing-domain/index.js
src/kits/mattatz-clouds-domain/index.js
```

## Current interaction loop

```txt
load index.html
-> display canvas and Cozy Cloud Loading bar
-> import src/main.js
-> import Three.js from jsDelivr
-> import local vendored domain kits from src/kits
-> create island landform state and render contract
-> create fenced clearing and invisible player anchor
-> create dense island object graph and path network
-> create ocean floor state and render contract
-> create grass wind descriptor
-> create campfire graph and smoke particle descriptor
-> create grass placement contract
-> create mattatz cloud render contract
-> create Three.js renderer, scene, camera, lights, fog, water, terrain, ocean floor, paths, objects, fence, campfire, smoke, grass, and point-cloud clouds
-> hide loader when construction reaches 100 percent
-> bind keyboard, wheel, pointer, resize, and blur handlers
-> wheel changes scrollProgress from sky approach toward first-person mode
-> pointer drag orbits/yaws while on rail and controls yaw/pitch near first-person completion
-> railPose interpolates camera points and look points along scrollProgress
-> when scrollProgress >= 0.985, firstPerson(dt) handles WASD movement inside the clearing boundary
-> frame loop updates water bob, camera, smoke, fire flame scale, fire light, cloud drift, cloud bob, and renderer.render
-> expose globalThis.CozyIsland with source contracts and getScrollProgress
```

## Intended player loop

```txt
arrive above a cozy island
-> scroll down through cinematic sky-to-island camera rail
-> approach the fenced campfire clearing
-> pass into an invisible first-person player anchor
-> look around by dragging
-> walk inside the fenced clearing using WASD
-> observe campfire, smoke, grass, trees, shore, ocean floor, water, and drifting cloud layers
```

## Recommended service loop

```txt
load static shell
-> load domain-kit source contracts
-> build deterministic scene source state
-> publish a HostSnapshot with scene, rail, player, cloud, and kit status slices
-> normalize wheel/pointer/keyboard input into ActionFrame records
-> route rail input through camera-rail-state reducer
-> route first-person movement through clearing-movement reducer
-> route cloud generation through cloud-point-cache descriptor service
-> journal accepted/rejected actions
-> expose GameHost diagnostics and replayable fixtures
-> render from snapshot-derived projection data
```

## Domains identified

```txt
static-browser-shell
cloud-loading-ui
module-runtime-entry
cdn-three-runtime
local-domain-kit-loading
scene-source-state
three-render-host
lighting-and-fog
water-plane-rendering
shoreline-foam-rendering
ocean-island-landform
ocean-floor-heightfield
ocean-floor-object-placement
island-foliage-placement
island-path-network
path-rendering
fenced-clearing-boundary
invisible-player-anchor
first-person-input
first-person-movement-policy
camera-rail-scroll-control
camera-rail-pose-interpolation
pointer-look-control
terrain-height-sampling
terrain-mask-sampling
grass-placement-contract
grass-static-instancing
grass-wind-descriptor
campfire-object-graph
campfire-light-animation
smoke-particle-descriptor
smoke-particle-runtime
mattatz-cloud-source-contract
cloud-point-cache
cloud-layer-layout
cloud-drift-runtime
cloud-bob-runtime
water-bob-runtime
runtime-diagnostics
host-snapshot-contract
action-frame-contract
fixture-smoke-runtime
```

## Kits identified

### Explicit vendored kits

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

### Runtime kits implied by `src/main.js`

```txt
cozy-island-static-shell-kit
cozy-cloud-loading-ui-kit
cozy-island-runtime-entry-kit
cozy-three-render-host-kit
cozy-scene-lighting-kit
cozy-water-plane-kit
cozy-shoreline-foam-kit
cozy-ocean-floor-render-kit
cozy-terrain-render-kit
cozy-path-render-kit
cozy-island-object-render-kit
cozy-fence-render-kit
cozy-campfire-render-kit
cozy-smoke-render-kit
cozy-grass-instancing-kit
cozy-cloud-point-render-kit
cozy-camera-rail-kit
cozy-scroll-progress-kit
cozy-pointer-look-kit
cozy-first-person-anchor-kit
cozy-clearing-movement-kit
cozy-clearing-boundary-policy-kit
cozy-runtime-frame-kit
cozy-diagnostics-host-kit
```

### Missing next-cut kits

```txt
cozy-host-snapshot-contract-kit
cozy-gamehost-diagnostics-kit
cozy-action-frame-contract-kit
cozy-input-journal-kit
cozy-camera-rail-state-kit
cozy-camera-rail-snapshot-kit
cozy-camera-rail-fixture-kit
cozy-first-person-movement-result-kit
cozy-clearing-boundary-result-kit
cozy-cloud-cache-descriptor-kit
cozy-cloud-cache-snapshot-kit
cozy-cloud-fixture-smoke-kit
cozy-scene-source-snapshot-kit
cozy-kit-status-report-kit
cozy-replay-parity-smoke-kit
```

## Services identified

```txt
staticShell.mountCanvas
staticShell.mountCloudLoader
staticShell.mountErrorPanel
runtimeEntry.importThree
runtimeEntry.importVendoredKits
landform.createState
landform.sampleHeight
landform.sampleMasks
landform.createRenderContract
foliage.createObjectGraph
foliage.createPathNetwork
oceanFloor.createState
oceanFloor.createRenderContract
grassWind.createDescriptor
grassPlacement.createContract
grassPlacement.createBatchDescriptors
campfire.createObjectGraph
smoke.createParticleDescriptor
fencedClearing.createGraph
fencedClearing.createPlayerAnchor
fencedClearing.createCollisionBoundary
clouds.createState
clouds.createRenderContract
renderer.createIndexedMesh
renderer.createTerrainMesh
renderer.createOceanFloorMesh
renderer.createWaterMesh
renderer.createFoamMesh
renderer.createPathMesh
renderer.createIslandObjects
renderer.createSeaObjects
renderer.createFence
renderer.createCampfire
renderer.createSmoke
renderer.createGrassInstances
renderer.createCloudPoints
cloudCache.getOrCreateGeometry
cloudCache.savePointCloudGeometry
cloudRuntime.updateDrift
cloudRuntime.updateBob
smokeRuntime.updateParticles
fireRuntime.updateFlames
fireRuntime.updateLight
input.bindKeyboard
input.bindWheel
input.bindPointer
input.bindResize
rail.updateScrollProgress
rail.computeRailPose
rail.interpolateCameraPosition
rail.interpolateLookTarget
player.computeForward
player.computeEye
player.computeLookVector
movement.validateClearingPosition
movement.applyFirstPersonStep
host.exposeCozyIsland
host.getScrollProgress
```

## Blockers and risks

```txt
src/main.js owns source state, render creation, input, movement, camera rail, clouds, smoke, fire, water, and host exposure inline.
globalThis.CozyIsland is useful but not a stable GameHost contract.
There is no action-frame journal for wheel, pointer, or keyboard input.
There is no accepted/rejected movement result for clearing boundary checks.
There is no route/rail fixture proving sky-to-eye camera continuity.
Cloud point-cloud geometry is cached in memory but not described through a serializable cache descriptor.
The cloud layout in src/main.js duplicates source data already represented by mattatz-clouds-domain.
There is no DOM-free smoke fixture for landform, clearing, rail, movement, cloud descriptors, or host snapshots.
No runtime test/build script exists beyond serving the static app.
```

## Next implementation slice

```txt
MyCozyIsland Host Snapshot + Camera Rail / Cloud Cache Fixture Cutover
```

Build order:

```txt
preserve current index.html and visual behavior
-> keep README standalone app language intact
-> add cozy-host-snapshot-contract-kit
-> expose globalThis.CozyIslandHost beside current globalThis.CozyIsland for compatibility
-> snapshot sceneSource, rail, player, clearing, cloudCache, kitStatus, and diagnostics
-> add cozy-action-frame-contract-kit for wheel, pointer, keydown, keyup, blur, resize, and fixture commands
-> add cozy-input-journal-kit with accepted and rejected action records
-> add cozy-camera-rail-state-kit
-> move scrollProgress, railPose points, look points, and first-person threshold into a serializable rail state
-> add cozy-camera-rail-snapshot-kit with camera position, look target, progress, phase, and firstPersonReady
-> add cozy-first-person-movement-result-kit
-> return accepted=false for blocked campfire radius, fence radius, invalid mode, or non-finite position
-> add cozy-cloud-cache-descriptor-kit
-> serialize each saved point cloud with id, band, pointCount, bounds, scale, drift, speed, baseY, and cacheKey
-> make the runtime render clouds from descriptors so regenerated clouds can be proven stable
-> add cozy-cloud-cache-snapshot-kit
-> add DOM-free fixture script for landform, clearing, rail progress samples, movement acceptance/rejection, and cloud descriptor stability
-> add cozy-kit-status-report-kit
-> defer render extraction, high-fidelity grass mesh upgrades, and pointer-lock movement until snapshot/fixture parity exists
```

## Acceptance targets

```txt
globalThis.CozyIsland remains available.
globalThis.CozyIslandHost.getSnapshot() exists.
snapshot.sceneSource reports landform, foliage, oceanFloor, grassPlacement, clearing, campfire, smoke, and cloud contract ids.
snapshot.rail reports progress, phase, position, look target, firstPersonReady, and threshold.
snapshot.player reports position, yaw, pitch, eyeHeight, canMove, and boundary status.
snapshot.cloudCache reports four clouds, low/high bands, point counts, drift values, and stable cache keys.
movement into campfire exclusion returns accepted=false with reason=campfire_exclusion.
movement beyond fenced radius returns accepted=false with reason=fence_boundary.
wheel fixture advances rail deterministically.
cloud fixture regenerates identical descriptor metadata for the same seed.
render output remains visually equivalent.
```

## Validation

```txt
Documentation only.
No runtime source code changed.
No local build or smoke test was run.
```
