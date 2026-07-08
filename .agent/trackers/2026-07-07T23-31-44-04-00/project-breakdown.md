# MyCozyIsland project breakdown

**Timestamp:** `2026-07-07T23:31:44-04:00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Selected next slice:** `MyCozyIsland Cloudform Entry Authority + Hero Cloud Snapshot Replay Gate`

## Selection reason

`LuminaryLabs-Publish/MyCozyIsland` was selected because it had the oldest latest central ledger timestamp among eligible tracked `LuminaryLabs-Publish` repositories.

`LuminaryLabs-Publish/TheCavalryOfRome` stayed excluded by standing rule.

Accessible Publish repositories checked:

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

Latest eligible central ledger timestamps checked before this pass:

```txt
MyCozyIsland     2026-07-07T22:11:41-04:00  selected
IntoTheMeadow    2026-07-07T22:20:00-04:00
ZombieOrchard    2026-07-07T22:31:24-04:00
HorrorCorridor   2026-07-07T22:41:23-04:00
TheOpenAbove     2026-07-07T22:50:39-04:00
AetherVale       2026-07-07T22:59:19-04:00
PhantomCommand   2026-07-07T23:09:45-04:00
PrehistoricRush  2026-07-07T23:21:18-04:00
```

## Source-backed correction from this pass

The active browser entry is not the older standalone script recorded in the previous docs.

Current route:

```txt
index.html
-> canvas#game, Cozy Cloud Loading overlay, hidden error pre
-> <script type="module" src="./src/main-cloudform.js?v=hero-cloud-2">
-> src/main-cloudform.js
```

`src/main.js` still exists and remains useful as a readable legacy/reference runtime, but the active page now loads `src/main-cloudform.js`.

This pass updates `.agent` docs around the live `main-cloudform` route and treats the older `main.js` facts as historical/reference-only unless the entry script is switched back.

## Current status

`MyCozyIsland` is a standalone static Three.js cozy island scene centered on a hero cloud-form presentation.

The current scene builds island terrain, ocean floor, water, shoreline foam, path strips, foliage/object graph, fenced clearing, campfire, smoke, grass, and a single large hero cloud point-cloud layer above the island.

The active runtime is compacted into `src/main-cloudform.js`, where source creation, render adaptation, DOM input, camera rail, first-person movement, cloud generation, cloud drift, smoke/fire animation, and legacy host projection still live together.

## Interaction loop

### Player-facing loop

```txt
page opens
-> Cozy Cloud Loading bar advances
-> hero cloud and island scene render on canvas
-> player wheels/scrolls through a sky-to-island camera rail
-> before first-person threshold, pointer drag yaws the rail view
-> at progress >= 0.985, camera enters first-person clearing mode
-> player drags pointer to yaw/pitch
-> player uses WASD inside the fenced campfire clearing
-> movement is accepted only inside clearing radius and outside campfire keepout radius
-> water bob, smoke, fire pulse, and hero cloud drift continue every frame
```

### Current runtime loop

```txt
index.html
-> src/main-cloudform.js?v=hero-cloud-2
-> import Three.js 0.160.0 from CDN
-> import vendored source/domain kits
-> create island source, clearing, object graph, ocean floor, wind, campfire, smoke, grass, and cloud contract
-> create Three renderer, scene, camera, fog, hemisphere light, directional sun
-> adapt source contracts into terrain/floor/water/foam/path/object/fence/fire/smoke/grass/cloud meshes
-> register resize, keydown, keyup, wheel, pointerdown, pointerup, and pointermove listeners
-> requestAnimationFrame(frame)
-> frame computes dt, water bob, rail-or-first-person camera, smoke, flame, hero cloud drift, render
-> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

### Target authority loop

```txt
route source reads active entry descriptor
-> source profile serializes island, clearing, object, grass, smoke, and hero cloud source facts
-> hero cloud descriptor serializes lobe, point, placement, lighting, drift, cache, and renderer-boundary facts
-> host state owns progress, input state, player pose, camera phase, latest action result, cloud drift summaries, and journals
-> DOM and fixture input normalize into ActionFrame records
-> scroll, pointer, keyboard, movement, rail, and cloud-drift reducers return ActionResult records
-> movement rejection splits outside-clearing and campfire-keepout reasons
-> rail snapshot exposes camera point index, eased progress, camera position, look target, and first-person threshold facts
-> hero cloud snapshot exposes cache key, point count, bounds, lobe count, placement, drift, drift speed, and fingerprint
-> CozyIslandHost exposes diagnostics and DOM-free fixture/replay surfaces while preserving globalThis.CozyIsland
```

## Domains identified

```txt
static-browser-shell
single-html-app-entry
canvas-render-surface
cloud-loading-overlay
error-panel-diagnostics
module-runtime-entry
active-route-authority
cloudform-runtime-entry
legacy-main-runtime-reference
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
terrain-heightfield-render
terrain-material-palette
ocean-floor-source
ocean-floor-render-contract
ocean-floor-object-placement
water-plane-render
shoreline-foam-render
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
cozy-hero-cloud-form-source
cozy-hero-cloud-layer-source
cozy-hero-cloud-render-contract
hero-cloud-point-cache
hero-cloud-cache-descriptor
hero-cloud-cache-fingerprint
hero-cloud-cache-snapshot
hero-cloud-point-rendering
hero-cloud-drift-runtime
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

### Explicit active source kits

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

`cozy-hero-cloud-form-kit` is pulled through `mattatz-clouds-domain` and is now part of the active cloudform route authority.

### Runtime-implied kits

```txt
cozy-island-static-shell-kit
cozy-cloud-loading-ui-kit
cozy-error-panel-kit
cozy-active-route-entry-kit
cozy-cloudform-runtime-entry-kit
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
cozy-hero-cloud-point-render-kit
cozy-hero-cloud-cache-kit
cozy-hero-cloud-drift-kit
cozy-camera-rail-kit
cozy-scroll-progress-kit
cozy-pointer-look-kit
cozy-first-person-anchor-kit
cozy-clearing-movement-kit
cozy-clearing-boundary-policy-kit
cozy-campfire-keepout-policy-kit
cozy-runtime-frame-kit
cozy-legacy-global-host-kit
```

### Next-cut kits

```txt
cozy-active-entry-descriptor-kit
cozy-source-state-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-descriptor-kit
cozy-hero-cloud-cache-fingerprint-kit
cozy-hero-cloud-cache-snapshot-kit
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
cozy-cloud-drift-result-kit
cozy-host-smoke-state-kit
cozy-fixture-script-runner-kit
cozy-action-journal-fixture-kit
cozy-replay-parity-smoke-kit
```

### Deferred kits

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

### Current active route services

```txt
index.html.canvas#game
index.html.cloud-loader
index.html.cloud-loader-fill
index.html.error
index.html.module-src:./src/main-cloudform.js?v=hero-cloud-2
mainCloudform.fail
mainCloudform.meshGrid
mainCloudform.terrainMesh
mainCloudform.floorMesh
mainCloudform.waterMesh
mainCloudform.foamMesh
mainCloudform.pathMesh
mainCloudform.objGroup
mainCloudform.fenceGroup
mainCloudform.campfireMesh
mainCloudform.smokeMesh
mainCloudform.updateSmoke
mainCloudform.grassMesh
mainCloudform.rand
mainCloudform.cloudMaterial
mainCloudform.heroCloudGeometry
mainCloudform.heroCloudGroup
mainCloudform.main
mainCloudform.resize
mainCloudform.rail
mainCloudform.valid
mainCloudform.fp
mainCloudform.frame
globalThis.CozyIsland.getScrollProgress
```

### Vendored kit services used

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
createCozyHeroCloudFormDescriptor
createCozyHeroCloudLayerDescriptor
createCozyHeroCloudRenderContract
```

### Target host services

```txt
CozyIslandHost.getState
CozyIslandHost.getDiagnostics
CozyIslandHost.getActionJournal
CozyIslandHost.getRailSnapshot
CozyIslandHost.getHeroCloudSnapshot
CozyIslandHost.getHeroCloudCacheSnapshot
CozyIslandHost.getSourceSnapshot
CozyIslandHost.getSourceFingerprint
CozyIslandHost.getHostSmokeState
CozyIslandHost.runSmoke
CozyIslandHost.applyActionFrame
CozyIslandHost.applyFixtureScript
sourceProfile.createSourceProfile
sourceFingerprint.createSourceFingerprint
sourceSnapshot.serializeSourceSnapshot
activeEntry.describeRoute
heroCloudSnapshot.serializeDescriptor
heroCloudCache.describeGeometry
heroCloudCache.createFingerprint
heroCloudCache.serializeSnapshot
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
cloudDriftReducer.applyFrameDrift
hostSmokeState.serialize
fixtureScript.run
replayFixture.runActionJournalParity
```

## Source facts to preserve

```txt
activeEntryScript = ./src/main-cloudform.js?v=hero-cloud-2
legacyReferenceScript = ./src/main.js
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
cloudFocus = cozy-hero-cloud-form-kit
cloudCount = 1
heroCloudId = cozy-hero-cloud-main
heroCloudLayerId = cozy-hero-cloud-layer
heroCloudPointCount = 420
heroCloudLobeCount = 7
heroCloudPosition = { x: 0, y: 132, z: -26 }
heroCloudScale = { x: 360, y: 118, z: 260 }
heroCloudDrift = { x: 0.32, z: 0.05 }
heroCloudDriftSpeed = 0.012
firstPersonThreshold = 0.985
movementSpeedMetersPerSecond = 2.6
pointerYawFirstPersonScale = 0.0025
pointerYawRailScale = 0.0045
wheelScrollScale = -0.0014
railCameraDistances = [520, 260, 95, 12, 3.2, eye]
railCameraHeights = [155, 105, 42, 7, 2.2, eyeHeight]
```

## Active blockers

```txt
.active docs previously pointed at ./src/main.js?v=standalone-1 even though index.html loads ./src/main-cloudform.js?v=hero-cloud-2.
main-cloudform.js is compacted heavily, making source seams harder to audit or safely patch.
DOM wheel/pointer/key events mutate local progress, drag, key, yaw, pitch, and movement state directly.
valid(next) returns boolean only and collapses outside-clearing and campfire-keepout reasons.
fp(dt) silently ignores rejected movement and does not emit result records.
rail() returns camera position/look only and does not expose phase, threshold, eased progress, or control-point index.
heroCloudGeometry() caches BufferGeometry by cloud id but does not expose descriptor, bounds, hash, generation stats, or deterministic cache state.
hero cloud drift mutates object positions in frame() without host-owned drift summaries or replayable results.
globalThis.CozyIsland is limited to cloudContract, cloudPointCache, and getScrollProgress.
There is no additive CozyIslandHost, action journal, diagnostics snapshot, fixture script runner, or replay parity surface.
```

## Next implementation slice

```txt
MyCozyIsland Cloudform Entry Authority + Hero Cloud Snapshot Replay Gate
```

### Build order

```txt
preserve index.html, visible scene, hero cloud look, current controls, and globalThis.CozyIsland compatibility
-> make active entry authority explicit in docs/code comments or a small route descriptor module
-> add additive globalThis.CozyIslandHost without removing globalThis.CozyIsland
-> add source profile, source fingerprint, and source snapshot helpers for the live cloudform route
-> add HeroCloudDescriptorSnapshot for id, layer, silhouette, pointCloud, placement, lighting, drift, driftSpeed, and rendererBoundary
-> add HeroCloudCacheSnapshot for cache key, point count, bounding sphere, attribute names, size/alpha/tint ranges, and fingerprint
-> add HostState with progress, player pose, pointer state, key state, latestResult, frame, rail phase, cloud drift summaries, input journal, and result journal
-> normalize wheel, pointer, key, frame, and fixture commands into ActionFrame records
-> add ActionResult records for accepted, rejected, and unchanged outcomes
-> split valid(next) into ClearingBoundaryResult and CampfireKeepoutResult records
-> add explicit rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> move rail() sampling behind railState.sampleRailPose and emit serializable rail phase snapshots
-> wrap hero cloud drift in cloudDriftReducer.applyFrameDrift and journal drift summaries
-> expose host methods for state, diagnostics, source snapshot, source fingerprint, hero cloud snapshot, hero cloud cache snapshot, action journal, rail snapshot, host smoke state, runSmoke, applyActionFrame, and applyFixtureScript
-> add DOM-free fixtures for active route detection, source fingerprint stability, hero cloud descriptor shape, hero cloud cache stability, scroll acceptance, scroll clamp, pointer gating, rail phase sampling, first-person gate rejection, clearing rejection, campfire keepout rejection, movement acceptance, cloud drift replay, and action journal parity
```

## Acceptance checks for the next slice

```txt
index.html still loads and renders the same hero cloud scene.
globalThis.CozyIsland remains backward compatible.
globalThis.CozyIslandHost exists after boot.
CozyIslandHost.getSourceFingerprint() is stable across two fresh boots with the same source profile.
CozyIslandHost.getHeroCloudSnapshot() exposes id, layer, point count, lobe count, placement, scale, drift, and drift speed.
CozyIslandHost.getHeroCloudCacheSnapshot() exposes cache key, point count, bounds/fingerprint, and attribute inventory.
wheel/pointer/key/movement fixture commands return ActionResult records.
invalid movement returns rejected result with outside-clearing or campfire-keepout reason.
rail snapshot reports progress, eased progress, position, look target, and first-person threshold state.
cloud drift replay produces deterministic summarized positions for a fixed dt script.
DOM-free replay fixture accepts and rejects the expected action matrix without relying on browser events.
```

## Validation note

This documentation pass did not change runtime source files and did not run a local build or smoke test.
