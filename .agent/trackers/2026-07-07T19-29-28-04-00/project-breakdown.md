# MyCozyIsland project breakdown

**Run timestamp:** `2026-07-07T19:29:28-04:00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Selected next slice:** `MyCozyIsland Action Reducer Host Contract + Cloud Snapshot Fixture Gate`

## Selection

`LuminaryLabs-Publish/MyCozyIsland` was selected because the central ledger showed it as the oldest eligible tracked non-Cavalry Publish repo.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible ledger timestamps checked:

```txt
MyCozyIsland     2026-07-07T18:10:03-04:00
IntoTheMeadow    2026-07-07T18:19:15-04:00
ZombieOrchard    2026-07-07T18:28:54-04:00
HorrorCorridor   2026-07-07T18:41:07-04:00
TheOpenAbove     2026-07-07T18:49:32-04:00
AetherVale       2026-07-07T19:01:37-04:00
PhantomCommand   2026-07-07T19:08:52-04:00
PrehistoricRush  2026-07-07T19:18:58-04:00
```

## Current status

`MyCozyIsland` is a public standalone static Cozy Island app.

The app serves `index.html`, creates a full-screen `canvas#game`, presents a Cozy Cloud Loading bar, keeps an error panel, and loads `./src/main.js?v=standalone-1` as the active module script.

The runtime vendors domain kits under `src/kits/`. The visible proof already contains island landform, terrain heightfield, ocean floor, water plane, shoreline foam, paths, foliage, sea-floor objects, fenced clearing, central campfire, smoke particles, grass instances, point-cloud clouds, scroll rail, pointer look, and first-person movement.

The active blocker is runtime authority. Host state, reducer results, source fingerprints, cloud-cache descriptors, movement rejection records, and replay fixtures are still implicit inside `src/main.js`.

## Interaction loop

### Current loop

```txt
index.html
-> canvas#game, cloud loader, and error panel
-> ./src/main.js?v=standalone-1
-> Three.js from jsDelivr
-> vendored domain kit factories from src/kits
-> source state is built for island, clearing, foliage, ocean floor, grass, campfire, smoke, and clouds
-> renderer state is built for terrain, water, foam, path, objects, fence, campfire, smoke, grass, and clouds
-> DOM listeners mutate resize, key, wheel, and pointer state
-> requestAnimationFrame(frame)
-> frame updates water, camera, smoke, flames, fire light, clouds, and renderer
-> globalThis.CozyIsland exposes source objects and getScrollProgress
```

### Target loop

```txt
source profile builds stable source descriptors
-> source fingerprint serializes ids, seeds, counts, thresholds, bands, and policies
-> source snapshot serializes island, floor, graph, clearing, grass, campfire, smoke, cloud, and anchor summaries
-> host state owns scroll progress, pointer state, key state, player pose, rail phase, cloud summaries, latest result, and journals
-> DOM input and fixture scripts normalize into ActionFrame records
-> scroll, pointer, keyboard, and movement reducers return ActionResult records
-> movement reducers emit clearing and campfire policy results
-> rail sampling returns RailSnapshot records
-> cloud cache returns descriptor and fingerprint snapshots
-> CozyIslandHost exposes state, diagnostics, snapshots, runSmoke, applyActionFrame, and applyFixtureScript
-> DOM-free fixtures prove source stability, reducer legality, movement gates, cloud-cache stability, and replay parity
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
cozy-host-snapshot
cozy-host-diagnostics
cozy-action-frame
cozy-action-result
cozy-action-rejection-reason
cozy-input-journal
cozy-fixture-script
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

## Services identified

Current services:

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

## Source facts to preserve

```txt
entryScript = ./src/main.js?v=standalone-1
threeVersion = 0.160.0
islandId = cozy-island-001
islandSeed = cozy-island-standalone
islandRadius = 100
maxHeight = 18
heightfieldResolution = 129
shorelineSegments = 128
clearingFenceRadiusMeters = 12
campfireGraphRadiusMeters = 1.45
clearingCampfireRadiusMeters = 2.25
campfireKeepoutRadiusMeters = 2.35
oceanFloorSize = 3600
oceanFloorResolution = 53
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

## Gaps and risks

```txt
1. globalThis.CozyIsland is source-object-oriented, not host/reducer-oriented.
2. globalThis.CozyIslandHost does not exist yet.
3. scrollProgress is mutated directly from wheel events.
4. pointer deltas mutate player yaw and pitch directly.
5. keyboard state is a raw Set, not a normalized input journal.
6. firstPerson(dt) mutates player pose directly and returns no result envelope.
7. valid(next) returns only a boolean and hides rejection cause.
8. campfire keepout and clearing boundary are coupled in one condition.
9. railPose() creates unnamed curves each sample and exposes no stable RailSnapshot.
10. cloud cache has saved geometries but no serializable descriptor/fingerprint API.
11. smoke initialization uses Math.random, so deterministic gameplay fixture checks should isolate smoke visuals.
12. No DOM-free smoke tests exist for source fingerprints, movement gates, or replay parity.
```

## Recommended next slice

```txt
MyCozyIsland Action Reducer Host Contract + Cloud Snapshot Fixture Gate
```

Build order:

```txt
preserve index.html, current visuals, and globalThis.CozyIsland compatibility
-> add additive globalThis.CozyIslandHost without removing globalThis.CozyIsland
-> add source profile, source fingerprint, and source snapshot helpers
-> add host state with scrollProgress, player pose, pointer state, key state, latest result, frame, rail phase, and cloud summaries
-> normalize wheel, pointer, key, and fixture commands into ActionFrame records
-> add ActionResult records for accepted, rejected, and unchanged outcomes
-> split valid(next) into ClearingBoundaryResult and CampfireKeepoutResult records
-> add explicit rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> move railPose logic behind railState.sampleRailPose and emit rail phase snapshots
-> describe cloud cache entries with key, source id, index, point count, bounds, band, speed, drift, and fingerprint
-> expose host methods for state, diagnostics, source snapshot, source fingerprint, action journal, rail snapshot, cloud cache snapshot, host smoke state, runSmoke, applyActionFrame, and applyFixtureScript
-> add DOM-free fixtures for source fingerprint stability, source snapshot shape, scroll acceptance, pointer gating, rail phase sampling, first-person gate rejection, clearing rejection, campfire keepout rejection, movement acceptance, cloud cache fingerprint stability, and replay parity
-> defer renderer extraction, pointer lock, touch controls, save/load, ocean shader upgrades, and grass fidelity rebuilds until host contract and replay parity are stable
```

## Validation note

No runtime source code changed.

No local build or smoke test was run during this connector-only documentation update.
