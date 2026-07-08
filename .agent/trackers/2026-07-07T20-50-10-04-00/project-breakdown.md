# MyCozyIsland project breakdown

**Run timestamp:** `2026-07-07T20:50:10-04:00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Selected next slice:** `MyCozyIsland CozyIslandHost Smoke Fixture + Rail Cloud Replay Lock`

## Selection reason

`LuminaryLabs-Publish/MyCozyIsland` was selected because the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger showed it as the oldest eligible tracked `LuminaryLabs-Publish` repo by latest review timestamp.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible timestamps checked:

```txt
MyCozyIsland     2026-07-07T19:29:28-04:00
IntoTheMeadow    2026-07-07T19:42:05-04:00
ZombieOrchard    2026-07-07T19:51:43-04:00
HorrorCorridor   2026-07-07T20:00:46-04:00
TheOpenAbove     2026-07-07T20:10:49-04:00
AetherVale       2026-07-07T20:21:40-04:00
PhantomCommand   2026-07-07T20:31:21-04:00
PrehistoricRush  2026-07-07T20:38:27-04:00
```

## Current read

`MyCozyIsland` is a public standalone static Cozy Island scene. It serves `index.html`, owns a fixed full-window `canvas#game`, shows the `Cozy Cloud Loading` overlay, exposes an error panel, and loads `./src/main.js?v=standalone-1`.

The active module imports Three.js `0.160.0` from jsDelivr and vendors the domain kit factories below:

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

The live runtime already builds a complete cozy island scene:

```txt
island landform and heightfield
ocean floor and ocean-floor objects
water plane
shoreline foam
path strips
dense island object graph
fenced clearing
central campfire and light
smoke points
grass instancing
low/high point-cloud clouds
scroll-driven sky-to-eye camera rail
pointer-look behavior
first-person movement once scrollProgress >= 0.985
```

The blocker is still runtime authority. `src/main.js` owns source state, renderer state, DOM input mutation, cloud cache creation, rail sampling, first-person movement validation, movement rejection behavior, cloud drift, smoke/fire animation, frame state, and `globalThis.CozyIsland` projection inline.

## Current interaction loop

```txt
index.html
  -> fixed canvas#game
  -> Cozy Cloud Loading overlay
  -> error panel
  -> ./src/main.js?v=standalone-1
  -> import Three.js from jsDelivr
  -> import vendored domain kit factories from src/kits
  -> create island, clearing, foliage, ocean floor, grass, campfire, smoke, and cloud source records
  -> create WebGL renderer, scene, camera, lights, fog, water, terrain, path, foliage, fence, fire, smoke, grass, and clouds
  -> install resize, keydown, keyup, blur, wheel, pointerdown, pointerup, and pointermove listeners
  -> mutate Set(keys), drag state, player yaw/pitch, and scrollProgress directly from DOM events
  -> requestAnimationFrame(frame)
  -> update water, smoke, flames, fire light, cloud drift, camera rail or first-person camera
  -> renderer.render(scene, camera)
  -> expose globalThis.CozyIsland with source objects and getScrollProgress()
```

## Target authority loop

```txt
build source profile from current literal scene constants
  -> serialize source fingerprint with ids, seeds, counts, thresholds, cloud layout, movement gates, and rail control points
  -> serialize source snapshot for island, ocean floor, clearing, grass, campfire, smoke, cloud, anchor, and render summaries
  -> create additive CozyIslandHost state without removing globalThis.CozyIsland
  -> normalize DOM wheel / pointer / keyboard events and fixture commands into ActionFrame records
  -> validate ActionFrame shape and scene gate
  -> reduce scroll, pointer, key, rail, and movement actions into ActionResult records
  -> split movement legality into ClearingBoundaryResult and CampfireKeepoutResult
  -> append ActionResult and input journal records
  -> sample camera rail through RailSnapshot records
  -> describe cloud geometry cache through CloudCacheDescriptor, CloudCacheFingerprint, and CloudCacheSnapshot records
  -> publish stable diagnostics through CozyIslandHost
  -> run DOM-free fixture scripts against the same reducer and snapshot surfaces
  -> prove source fingerprint stability, cloud cache stability, movement gate legality, and action journal replay parity
```

## Domains identified

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
cloud-cache-descriptor
cloud-cache-fingerprint
cloud-cache-snapshot
cloud-point-rendering
cloud-drift-runtime
runtime-frame-loop
ambient-animation-loop
cozy-host-compatibility
cozy-host-state-contract
cozy-host-snapshot
cozy-host-diagnostics
cozy-action-frame
cozy-action-batch
cozy-action-result
cozy-action-rejection-reason
cozy-action-result-journal
cozy-input-journal
cozy-fixture-script
cozy-fixture-smoke
cozy-replay-parity
```

## Services identified

Current product-side services:

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

Vendored kit services in use:

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

Needed next services:

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
sourceProfile.createSourceProfile
sourceFingerprint.createSourceFingerprint
sourceSnapshot.serializeSourceSnapshot
hostState.createInitialHostState
actionFrame.normalizeDomEvent
actionFrame.normalizeFixtureCommand
actionBatch.normalizeFixtureScript
actionResult.accept
actionResult.reject
actionResult.unchanged
actionResultJournal.append
actionJournal.append
scrollReducer.applyWheelDelta
pointerReducer.applyPointerDelta
keyboardReducer.applyKeyEvent
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
cozy-action-batch-contract-kit
cozy-action-result-contract-kit
cozy-action-rejection-reason-kit
cozy-action-result-journal-kit
cozy-input-journal-kit
cozy-scroll-action-reducer-kit
cozy-pointer-look-result-kit
cozy-keyboard-state-result-kit
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
cloudBands = low, low, high, high
cloudLowBaseY = 92, 108
cloudHighBaseY = 255, 285
firstPersonThreshold = 0.985
movementSpeedMetersPerSecond = 2.6
railCameraDistances = 520, 260, 95, 12, 3.2, eye
railCameraHeights = 155, 105, 42, 7, 2.2, eyeHeight
pointerYawFirstPersonScale = 0.0025
pointerYawRailScale = 0.0045
wheelScrollScale = -0.0014
```

## Active blockers

```txt
DOM input mutates scrollProgress, drag state, and keys directly.
firstPerson(dt) mutates player pose and silently ignores rejected movement.
valid(next) returns boolean only and collapses outside-clearing and campfire-keepout reasons.
railPose() does not expose phase, control-point, or look-target snapshots.
cloudGeometry() caches generated BufferGeometry but does not expose stable descriptor, bounds, or fingerprint facts.
globalThis.CozyIsland exposes source objects but not a stable host state, diagnostics surface, action journal, fixture runner, or replay surface.
```

## Recommended next slice

```txt
MyCozyIsland CozyIslandHost Smoke Fixture + Rail Cloud Replay Lock
```

Build order:

```txt
preserve index.html, current visuals, and globalThis.CozyIsland compatibility
add additive globalThis.CozyIslandHost without removing globalThis.CozyIsland
add source profile, source fingerprint, and source snapshot helpers
add host state with scrollProgress, player pose, pointer state, key state, latest result, frame, rail phase, and cloud summaries
normalize wheel, pointer, key, and fixture commands into ActionFrame records
add ActionResult records for accepted, rejected, and unchanged outcomes
split valid(next) into ClearingBoundaryResult and CampfireKeepoutResult records
add explicit rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
move railPose logic behind railState.sampleRailPose and emit rail phase snapshots
describe cloud cache entries with key, source id, index, point count, bounds, band, speed, drift, and fingerprint
expose host methods for state, diagnostics, source snapshot, source fingerprint, action journal, rail snapshot, cloud cache snapshot, host smoke state, runSmoke, applyActionFrame, and applyFixtureScript
add DOM-free fixtures for source fingerprint stability, source snapshot shape, scroll acceptance, pointer gating, rail phase sampling, first-person gate rejection, clearing rejection, campfire keepout rejection, movement acceptance, cloud cache fingerprint stability, and replay parity
defer renderer extraction, pointer lock, touch controls, save/load, ocean shader upgrades, and grass fidelity rebuilds until host contract and replay parity are stable
```

## Acceptance checks for next code pass

```txt
The visible island scene still loads from index.html.
globalThis.CozyIsland remains available.
globalThis.CozyIslandHost is additive and stable.
CozyIslandHost.getSourceFingerprint() is deterministic across reloads.
CozyIslandHost.getSourceSnapshot() includes island, ocean floor, clearing, grass, campfire, smoke, cloud, anchor, and rail summary facts.
Wheel input emits accepted scroll ActionResult records.
Pointer input before first-person emits rail yaw results, not first-person look results.
Movement before scrollProgress >= 0.985 rejects with not_first_person_yet.
Movement outside the clearing rejects with outside_clearing.
Movement inside the campfire keepout rejects with campfire_keepout.
Valid movement emits accepted movement result and pose delta.
CozyIslandHost.getRailSnapshot() exposes phase, camera position, look target, and rail control summary.
CozyIslandHost.getCloudCacheSnapshot() exposes point counts, bands, drift, bounds, and fingerprints.
CozyIslandHost.runSmoke("replay-parity") replays a fixture script to the same public host snapshot.
```

## Verification

No runtime source code changed in this documentation pass.

No local build was run.

No local smoke test was run.
