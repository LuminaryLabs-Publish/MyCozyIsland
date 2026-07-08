# MyCozyIsland project breakdown

**Run timestamp:** `2026-07-07T22:11:41-04:00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Default branch:** `main`

**Visibility:** public

**Selected next slice:** `MyCozyIsland Host Action Result Contract + Replay Diagnostics Gate`

## Selection reason

`LuminaryLabs-Publish/MyCozyIsland` was selected as the oldest eligible non-Cavalry Publish repo by latest central ledger timestamp.

`LuminaryLabs-Publish/TheCavalryOfRome` was explicitly checked and excluded by standing rule.

Accessible Publish repos checked:

```txt
LuminaryLabs-Publish/MyCozyIsland      public   main  selected
LuminaryLabs-Publish/IntoTheMeadow     public   main
LuminaryLabs-Publish/ZombieOrchard     public   main
LuminaryLabs-Publish/HorrorCorridor    public   main
LuminaryLabs-Publish/TheOpenAbove      public   main
LuminaryLabs-Publish/AetherVale        private  main
LuminaryLabs-Publish/PhantomCommand    public   main
LuminaryLabs-Publish/PrehistoricRush   public   main
LuminaryLabs-Publish/TheCavalryOfRome  public   main  excluded
```

Latest eligible central ledger timestamps checked:

```txt
MyCozyIsland     2026-07-07T20:50:10-04:00  selected
IntoTheMeadow    2026-07-07T20:59:30-04:00
ZombieOrchard    2026-07-07T21:09:57-04:00
HorrorCorridor   2026-07-07T21:18:45-04:00
TheOpenAbove     2026-07-07T21:29:47-04:00
AetherVale       2026-07-07T21:39:36-04:00
PhantomCommand   2026-07-07T21:50:56-04:00
PrehistoricRush  2026-07-07T21:59:06-04:00
```

## Current status

`MyCozyIsland` is a public standalone static Three.js cozy island scene. `index.html` owns the browser shell, full-canvas render target, Cozy Cloud Loading bar, error panel, and active module entry `./src/main.js?v=standalone-1`.

`src/main.js` imports Three.js `0.160.0` from jsDelivr and composes the vendored domain kit factories for island landform, foliage, ocean floor, grass placement, grass wind, campfire, smoke, fenced clearing, and Mattatz-style clouds.

The current runtime already renders the full scene: island landform, ocean floor, water, shoreline foam, paths, foliage, sea-floor objects, fence, campfire, smoke, instanced grass, and low/high point-cloud cloud layers.

The main blocker is still host authority. DOM events mutate `scrollProgress`, pointer drag, key state, and player movement directly; `valid(next)` collapses movement rejection into a boolean; `railPose()` is not snapshot-owned; cloud cache facts are not serializable; `globalThis.CozyIsland` exposes content objects but not a reducer host, result journal, diagnostics surface, or replay fixture API.

## Interaction loop

Current player/runtime loop:

```txt
index.html
-> canvas#game, Cozy Cloud Loading bar, error panel
-> src/main.js?v=standalone-1
-> Three.js CDN runtime
-> vendored domain kit state factories
-> source state for island, floor, graph, clearing, grass, campfire, smoke, clouds
-> renderer state for terrain, water, foam, paths, objects, fence, campfire, smoke, grass, clouds
-> DOM resize, key, wheel, and pointer listeners mutate local variables
-> requestAnimationFrame(frame)
-> frame updates water, rail/first-person camera, smoke, flame scale, fire light, cloud drift
-> renderer.render(scene, camera)
-> globalThis.CozyIsland exposes source objects and getScrollProgress
```

Target host-authority loop:

```txt
source profile creates stable source descriptors
-> source fingerprint records ids, seeds, counts, thresholds, bands, cache facts, rail controls
-> source snapshot serializes island, floor, graph, clearing, grass, campfire, smoke, cloud, anchor, and rail summaries
-> CozyIslandHost owns scroll progress, pointer state, key state, player pose, rail phase, cloud summaries, latest result, input journal, and action-result journal
-> DOM events and fixture scripts normalize into ActionFrame records
-> reducers return ActionResult records for scroll, pointer, keyboard, rail sample, and movement actions
-> clearing boundary and campfire keepout produce explicit policy results
-> rail sampler emits RailSnapshot records
-> cloud cache emits descriptor, bounds, fingerprint, and snapshot records
-> diagnostics exposes source, host, rail, cloud, movement policy, and replay health
-> DOM-free fixture scripts prove reducer legality and replay parity
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

## Kits identified

Explicit vendored kits currently imported:

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

Current inline services:

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
railCameraDistances = 520, 260, 95, 12, 3.2, eye
railCameraHeights = 155, 105, 42, 7, 2.2, eyeHeight
pointerYawFirstPersonScale = 0.0025
pointerYawRailScale = 0.0045
wheelScrollScale = -0.0014
```

## Active blockers

```txt
DOM input mutates scrollProgress, drag state, and key state directly.
firstPerson(dt) mutates player pose and silently ignores rejected movement.
valid(next) returns boolean only and collapses outside-clearing and campfire-keepout reasons.
railPose() does not expose phase, control-point, or look-target snapshots.
cloudGeometry() caches generated BufferGeometry but does not expose stable descriptor, bounds, or fingerprint facts.
cloud drift mutates object positions in frame() without a host-owned cloud summary.
globalThis.CozyIsland exposes source objects but not a stable host state, diagnostics surface, action journal, fixture runner, or replay surface.
```

## Fixture matrix

```txt
source-fingerprint-stability
source-snapshot-shape
scroll-action-acceptance
scroll-action-bounds-clamp
pointer-action-rail-yaw
pointer-action-first-person-yaw-pitch
pointer-action-not-dragging-unchanged
keyboard-action-down-up
first-person-gate-rejection
movement-no-vector-unchanged
movement-clearing-boundary-rejection
movement-campfire-keepout-rejection
movement-accepted-updates-player-pose
rail-snapshot-phase-sampling
cloud-cache-fingerprint-stability
cloud-cache-snapshot-shape
action-journal-append-order
accepted-replay-parity
rejected-replay-no-mutation
host-smoke-state-shape
```

## Next implementation slice

```txt
MyCozyIsland Host Action Result Contract + Replay Diagnostics Gate
```

Build order:

```txt
preserve index.html, current visuals, current render loop, and globalThis.CozyIsland
-> add additive globalThis.CozyIslandHost
-> add source profile, source fingerprint, and source snapshot helpers
-> add HostState with scrollProgress, player pose, pointer state, key state, latestResult, frame, rail phase, cloud summaries, and journals
-> normalize DOM and fixture inputs into ActionFrame records
-> add ActionResult records for accepted, rejected, and unchanged outcomes
-> split movement legality into ClearingBoundaryResult and CampfireKeepoutResult
-> add stable rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> move railPose sampling behind a serializable railState/railSnapshot service
-> describe cloud cache entries with key, source id, index, point count, bounds, band, speed, drift, and fingerprint
-> expose host methods for state, diagnostics, source snapshot, source fingerprint, action journal, rail snapshot, cloud cache snapshot, host smoke state, runSmoke, applyActionFrame, and applyFixtureScript
-> add DOM-free fixtures for source fingerprint stability, scroll acceptance, pointer gating, rail phase sampling, movement rejection, movement acceptance, cloud cache fingerprint stability, and replay parity
-> defer renderer extraction, pointer lock, touch controls, save/load, ocean shader upgrades, and grass fidelity until the host contract is stable
```

## Validation note

This pass updated documentation only. No runtime source files were changed and no local build or smoke test was run.
