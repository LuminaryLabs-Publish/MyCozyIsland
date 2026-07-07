# MyCozyIsland project breakdown

**Run timestamp:** `2026-07-07T18:10:03-04:00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Default branch:** `main`

**Selected next slice:** `MyCozyIsland Host Smoke State + Source Fingerprint Replay Gate`

## Selection reason

`LuminaryLabs-Publish/MyCozyIsland` was selected because the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed it as the oldest eligible non-Cavalry repo at the start of this pass.

`LuminaryLabs-Publish/TheCavalryOfRome` remained excluded by standing rule.

Latest eligible timestamps checked:

```txt
MyCozyIsland     2026-07-07T16:49:08-04:00
IntoTheMeadow    2026-07-07T16:58:09-04:00
ZombieOrchard    2026-07-07T17:10:21-04:00
HorrorCorridor   2026-07-07T17:20:57-04:00
TheOpenAbove     2026-07-07T17:29:51-04:00
AetherVale       2026-07-07T17:38:46-04:00
PhantomCommand   2026-07-07T17:49:34-04:00
PrehistoricRush  2026-07-07T18:00:19-04:00
```

## Current product status

`MyCozyIsland` is a public standalone static Cozy Island app. It serves `index.html`, presents a full-canvas `canvas#game`, shows a cloud-loading overlay, keeps an error panel, and loads `./src/main.js?v=standalone-1` as the active module entry.

The live runtime already creates a complete cozy island scene: island landform, ocean floor, water plane, shoreline foam, path network, dense foliage graph, fenced clearing, central campfire, smoke particles, grass instances, Mattatz-style point-cloud clouds, scroll-driven sky-to-eye camera rail, pointer look, and first-person WASD movement inside the clearing.

The main blocker is not visual content. The blocker is runtime authority and fixture access. `src/main.js` still owns DOM capture, source-state construction, renderer construction, cloud cache generation, rail sampling, movement policy, rejection behavior, animation, and host projection inline.

This pass narrows the next cutover into a host smoke state and source fingerprint replay gate. The next implementation should add a diagnostic host and serializable fixture path first, so later renderer extraction, input polish, pointer lock, touch controls, save/load, cloud upscaling, and grass upgrades do not break the current scene.

## Interaction loop identified

Current loop:

```txt
index.html
-> canvas#game, cloud-loader, cloud-loader-fill, and pre#error
-> src/main.js imports Three.js from jsDelivr
-> src/main.js imports vendored domain kits from src/kits
-> create island landform state and render contract
-> create fenced clearing and player anchor
-> create dense island object graph and path network
-> create ocean floor source/render contract
-> create grass wind, campfire graph, smoke descriptor, grass placement, and cloud contract
-> create WebGLRenderer, Scene, Camera, fog, hemisphere light, directional light
-> build terrain, ocean floor, sea objects, water, foam, path strips, island objects, fence, campfire, smoke, grass, and clouds
-> register resize, keyboard, blur, wheel, pointerdown, pointerup, and pointermove handlers
-> requestAnimationFrame(frame)
-> update water bob, rail camera or first-person camera, smoke particles, flame scale, fire light, cloud drift, and render
-> expose globalThis.CozyIsland with source objects and getScrollProgress
```

Target authority loop:

```txt
source profile builds stable non-render descriptors
-> source fingerprint serializes ids, seeds, counts, bounds, thresholds, and exclusion policies
-> host state owns scroll progress, pointer deltas, player pose, cloud summaries, rail phase, last frame, and action journal
-> DOM events and fixture commands normalize into ActionFrame records
-> reducers return ActionResult records with status, reason, before, after, and payload
-> rail sampler returns RailSnapshot records with phase names and first-person readiness
-> movement policy returns ClearingBoundaryResult and CampfireKeepoutResult records
-> cloud cache exposes CloudCacheSnapshot records with keys, source ids, bands, point counts, drift, and bounds
-> CozyIslandHost exposes state, diagnostics, source snapshot, cloud snapshot, rail snapshot, action journal, runSmoke, and fixture script entrypoints
-> DOM-free smoke scripts prove source fingerprint stability, scroll/pointer gating, movement rejection/acceptance, cloud snapshot stability, and replay parity
```

## Domains in use

```txt
static-browser-shell
single-html-app-entry
canvas-render-surface
cloud-loading-overlay
error-panel-diagnostics
module-runtime-entry
three-cdn-runtime
vendored-domain-kit-runtime
scene-source-authority
source-profile-authority
source-fingerprint-authority
source-snapshot-authority
island-landform-source
heightfield-sampling
mask-sampling
shoreline-contract
ocean-floor-source
ocean-floor-render-contract
ocean-floor-object-placement
terrain-heightfield-render
terrain-material-palette
shoreline-foam-render
water-plane-render
path-network-source
path-segment-rendering
foliage-object-graph
island-object-rendering
object-exclusion-policy
fenced-clearing-source
clearing-collision-boundary
first-person-anchor
keyboard-input-state
pointer-drag-input
scroll-rail-input
scroll-progress-state
camera-rail-sample-curve
camera-rail-phase-projection
camera-rail-snapshot
first-person-camera-state
first-person-movement-policy
movement-result-authority
clearing-boundary-policy
campfire-keepout-policy
campfire-object-graph
campfire-render-graph
campfire-lighting
smoke-particle-descriptor
smoke-particle-runtime
grass-placement-contract
grass-static-batch-descriptor
grass-instanced-rendering
grass-wind-descriptor
mattatz-cloud-source-contract
cloud-point-cache
cloud-cache-fingerprint
cloud-point-rendering
cloud-drift-runtime
runtime-frame-loop
ambient-animation-loop
cozy-host-compatibility
cozy-host-snapshot
cozy-host-diagnostics
cozy-action-frame
cozy-action-result
cozy-action-rejection-reason
cozy-input-journal
cozy-fixture-smoke
cozy-replay-parity
```

## Kits identified

Explicit vendored kits:

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

Runtime-implied kits:

```txt
cozy-island-static-shell-kit
cozy-cloud-loading-ui-kit
cozy-error-panel-kit
cozy-island-runtime-entry-kit
cozy-three-render-host-kit
cozy-scene-source-composition-kit
cozy-scene-lighting-kit
cozy-water-plane-kit
cozy-shoreline-foam-kit
cozy-ocean-floor-render-kit
cozy-terrain-render-kit
cozy-path-render-kit
cozy-island-object-render-kit
cozy-fence-render-kit
cozy-campfire-render-kit
cozy-fire-animation-kit
cozy-smoke-render-kit
cozy-smoke-runtime-kit
cozy-grass-instancing-kit
cozy-cloud-point-render-kit
cozy-cloud-drift-kit
cozy-camera-rail-kit
cozy-scroll-progress-kit
cozy-pointer-look-kit
cozy-first-person-anchor-kit
cozy-clearing-movement-kit
cozy-clearing-boundary-policy-kit
cozy-campfire-keepout-policy-kit
cozy-runtime-frame-kit
cozy-diagnostics-host-kit
```

Next-cut kits:

```txt
cozy-source-state-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-host-state-contract-kit
cozy-host-snapshot-contract-kit
cozy-gamehost-diagnostics-kit
cozy-action-frame-contract-kit
cozy-action-result-contract-kit
cozy-action-rejection-reason-kit
cozy-input-journal-kit
cozy-scroll-action-reducer-kit
cozy-pointer-look-result-kit
cozy-camera-rail-state-kit
cozy-camera-rail-snapshot-kit
cozy-camera-rail-fixture-kit
cozy-first-person-movement-result-kit
cozy-clearing-boundary-result-kit
cozy-campfire-keepout-result-kit
cozy-cloud-cache-descriptor-kit
cozy-cloud-cache-fingerprint-kit
cozy-cloud-cache-snapshot-kit
cozy-cloud-fixture-smoke-kit
cozy-kit-status-report-kit
cozy-source-fixture-smoke-kit
cozy-host-smoke-state-kit
cozy-fixture-script-runner-kit
cozy-action-journal-fixture-kit
cozy-replay-parity-smoke-kit
```

Deferred kits:

```txt
cozy-pointer-lock-kit
cozy-touch-controls-kit
cozy-render-extraction-kit
cozy-ocean-shader-upgrade-kit
cozy-grass-patch-fidelity-kit
cozy-save-load-kit
cozy-performance-budget-kit
cozy-live-publish-health-kit
```

## Services identified

Current runtime services:

```txt
main.fail
main.indexedMesh
main.makeTerrain
main.makeOceanFloor
main.makeWater
main.makeFoam
main.makePath
main.insideZone
main.makeIslandObjects
main.makeSeaObjects
main.makeFence
main.makeCampfire
main.makeSmoke
main.updateSmoke
main.makeGrass
main.cloudRandom
main.cloudMaterial
main.cloudGeometry
main.makeClouds
main.main
main.resize
main.railPose
main.valid
main.firstPerson
main.frame
globalThis.CozyIsland.getScrollProgress
```

Vendored kit services used:

```txt
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
```

Target host services:

```txt
CozyIslandHost.getState
CozyIslandHost.getDiagnostics
CozyIslandHost.getActionJournal
CozyIslandHost.getRailSnapshot
CozyIslandHost.getCloudCacheSnapshot
CozyIslandHost.getSourceSnapshot
CozyIslandHost.getSourceFingerprint
CozyIslandHost.getHostSmokeState
CozyIslandHost.runSmoke
CozyIslandHost.applyActionFrame
CozyIslandHost.applyFixtureScript
```

Target reducer and fixture services:

```txt
sourceProfile.createSourceProfile
sourceFingerprint.createSourceFingerprint
sourceSnapshot.serializeSourceSnapshot
hostState.createInitialHostState
actionFrame.normalizeDomEvent
actionFrame.normalizeFixtureCommand
actionResult.accept
actionResult.reject
actionResult.unchanged
actionJournal.append
scrollReducer.applyWheelDelta
pointerReducer.applyPointerDelta
movementReducer.applyMoveVector
clearingBoundary.evaluateMove
campfireKeepout.evaluateMove
railState.sampleRailPose
railSnapshot.serializeRailPose
cloudCache.describeGeometry
cloudCache.createFingerprint
cloudCache.serializeSnapshot
hostSmokeState.serialize
fixtureScript.run
replayFixture.runActionJournalParity
```

## Source facts to preserve

```txt
entryScript = ./src/main.js?v=standalone-1
threeVersion = 0.160.0
islandId = cozy-island-001
islandSeed = cozy-island-standalone
islandRadius = 100
maxHeight = 18
beachWidth = 10
shelfWidth = 36
heightfieldResolution = 129
shorelineSegments = 128
clearingFenceRadiusMeters = 12
campfireGraphRadiusMeters = 1.45
clearingCampfireRadiusMeters = 2.25
campfireKeepoutRadiusMeters = 2.35
oceanFloorSize = 3600
oceanFloorResolution = 53
oceanBaseDepth = -128
oceanShelfDepth = -16
grassSeed = cozy-island-grass
grassPatchCount = 140
cloudSeed = cozy-island-clouds
cloudWeather = sunrise-haze
cloudCount = 4
cloudPointCountPerCloud = 520
firstPersonThreshold = 0.985
movementSpeedMetersPerSecond = 2.6
cloudBands = low, low, high, high
cloudLowBaseY = 92, 108
cloudHighBaseY = 255, 285
```

## Recommended next slice

```txt
MyCozyIsland Host Smoke State + Source Fingerprint Replay Gate
```

Build order:

```txt
preserve current index.html, src/main.js render output, and globalThis.CozyIsland compatibility
-> add globalThis.CozyIslandHost as an additive host without removing globalThis.CozyIsland
-> group all vendored source outputs inside cozy-source-state-profile-kit
-> create SourceFingerprint from stable ids, seeds, counts, bounds, thresholds, and source kit versions
-> expose getSourceFingerprint and assert it from runSmoke
-> serialize SourceSnapshot with island, floor, graph, clearing, grass, campfire, smoke, cloud, and anchor summaries
-> create HostState with scrollProgress, player pose, pointer state, input journal, rail phase, cloud summaries, last frame, latest result, and smoke status
-> normalize wheel, pointer, keyboard, and fixture commands into ActionFrame records
-> return ActionResult records from scroll, pointer, and movement reducers
-> use stable rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> make valid(next) return ClearingBoundaryResult and CampfireKeepoutResult records rather than boolean-only control flow
-> move railPose() into railState.sampleRailPose and emit named rail phases
-> describe cloud cache entries with key, source id, index, point count, bounds, band, speed, drift, and fingerprint
-> expose getState, getDiagnostics, getActionJournal, getRailSnapshot, getCloudCacheSnapshot, getSourceSnapshot, getSourceFingerprint, getHostSmokeState, runSmoke, applyActionFrame, and applyFixtureScript
-> add DOM-free smokes for source fingerprint stability, source snapshot shape, scroll action acceptance, pointer gating, rail phase sampling, movement rejection before threshold, clearing rejection, campfire keepout rejection, movement acceptance, cloud cache fingerprint stability, and action journal replay parity
-> defer pointer lock, touch controls, renderer extraction, ocean shader upgrades, save/load, and grass patch rebuild until host smoke state and replay parity are stable
```

## Validation note

No runtime source code changed.

No local build or smoke test was run during this connector-only documentation update.
