# MyCozyIsland Project Breakdown

**Run timestamp:** `2026-07-07T16:49:08-04:00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Default branch:** `main`

**Selected next slice:** `MyCozyIsland Reducer Gate + Cloud Snapshot Fixture Cutover`

## Selection reason

`LuminaryLabs-Publish/MyCozyIsland` was selected because the central repo ledger showed it as the oldest eligible non-Cavalry Publish repo by latest review timestamp.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

Latest eligible ledger timestamps checked:

```txt
MyCozyIsland     2026-07-07T15:40:06-04:00
IntoTheMeadow    2026-07-07T15:49:14-04:00
ZombieOrchard    2026-07-07T15:59:24-04:00
HorrorCorridor   2026-07-07T16:09:54-04:00
TheOpenAbove     2026-07-07T16:21:09-04:00
AetherVale       2026-07-07T16:29:18-04:00
PhantomCommand   2026-07-07T16:30:00-04:00
PrehistoricRush  2026-07-07T16:40:29-04:00
```

## Current product read

`MyCozyIsland` is a public standalone static Cozy Island scene. It serves one HTML entry, imports `src/main.js?v=standalone-1`, uses Three.js from jsDelivr, and vendors its active domain kit modules under `src/kits/`.

The product already reads as a complete cozy island proof: island landform, ocean floor, shoreline foam, water plane, paths, foliage, sea objects, grass placement, fenced clearing, invisible first-person anchor, campfire, smoke, point-cloud cloud banks, scroll rail, pointer look, and keyboard movement are all active.

The next implementation bottleneck is not visual density. The bottleneck is runtime authority. `src/main.js` still owns source-state composition, object construction, cloud geometry cache, scroll state, pointer state, keyboard state, first-person movement, movement validation, camera rail sampling, ambient animation, and host projection inline. Because no reducer/result boundary exists yet, silent no-ops are hard to inspect and DOM-free replay is not possible.

## Current interaction loop

```txt
index.html
-> canvas#game, cloud-loader, and error pre
-> script module ./src/main.js?v=standalone-1
-> import Three.js from jsDelivr
-> import vendored source kits from src/kits
-> create landform state and render contract
-> create height and mask samplers
-> create fenced clearing and player anchor
-> create dense island object graph and path network
-> create ocean floor state and render contract
-> create grass wind descriptor
-> create campfire object graph
-> create smoke particle descriptor
-> create grass placement contract
-> create Mattatz cloud render contract
-> create WebGL renderer, scene, camera, fog, hemisphere light, and sun
-> create water, ocean floor, terrain, foam, paths, island objects, fence, fire, smoke, grass, and clouds
-> register resize, keydown, keyup, blur, wheel, pointerdown, pointerup, and pointermove handlers
-> requestAnimationFrame(frame)
-> clamp dt
-> animate water height
-> if scrollProgress >= 0.985, run firstPerson(dt)
-> else sample railPose() and camera.lookAt()
-> update smoke, flame scale, fire light, and cloud drift
-> renderer.render(scene, camera)
-> expose globalThis.CozyIsland
```

## Target interaction loop

```txt
index.html
-> src/main.js preserves current visual behavior
-> create SourceProfile once from all vendored source kit outputs
-> serialize SourceSnapshot for source contracts and counts
-> create HostState with scroll, pointer, player, rail, cloud cache, action journal, and diagnostics state
-> normalize DOM events and fixture commands into ActionFrame records
-> route scroll, pointer, and movement through result-returning reducers
-> append ActionResult records for accepted, rejected, and unchanged outcomes
-> derive RailSnapshot every frame from serialized rail state
-> derive CloudCacheSnapshot from deterministic cloud cache descriptors
-> project diagnostics through globalThis.CozyIslandHost without breaking globalThis.CozyIsland
-> run DOM-free fixture scripts for source shape, reducer behavior, rail phase, movement acceptance, movement rejection, cloud cache stability, and replay parity
```

## Domains in use

```txt
static-browser-shell
single-html-app-entry
cloud-loading-ui
error-panel-diagnostics
module-runtime-entry
three-cdn-runtime
vendored-domain-kit-runtime
scene-source-state
source-state-composition
source-state-snapshot
height-sampling
mask-sampling
shoreline-contract
terrain-heightfield-render
terrain-material-palette
shoreline-foam-render
water-plane-render
ocean-floor-source-state
ocean-floor-heightfield
ocean-floor-object-placement
island-landform-source-state
path-network-source
path-segment-rendering
foliage-placement
island-object-graph
object-exclusion-policy
grass-placement-contract
grass-static-batch-descriptor
grass-instanced-rendering
grass-wind-descriptor
fenced-clearing-object-graph
clearing-collision-boundary
campfire-object-graph
campfire-render-graph
campfire-lighting
smoke-particle-descriptor
smoke-particle-runtime
mattatz-cloud-source-contract
cloud-point-cache
cloud-point-cache-descriptor
cloud-point-rendering
cloud-drift-runtime
camera-rail-scroll-control
camera-rail-sample-curve
camera-rail-phase-projection
camera-rail-snapshot
pointer-look-input
pointer-look-reducer
keyboard-movement-input
first-person-anchor
first-person-movement-policy
first-person-movement-result
clearing-boundary-policy
campfire-keepout-policy
runtime-frame-loop
ambient-animation-loop
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

### Runtime-implied kits

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

### Next-cut kits

```txt
cozy-source-state-profile-kit
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
cozy-cloud-cache-snapshot-kit
cozy-cloud-fixture-smoke-kit
cozy-kit-status-report-kit
cozy-source-fixture-smoke-kit
cozy-action-journal-fixture-kit
cozy-replay-parity-smoke-kit
```

## Services identified

### Current inline services

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
```

### Target host and reducer services

```txt
CozyIslandHost.getState
CozyIslandHost.getDiagnostics
CozyIslandHost.getActionJournal
CozyIslandHost.getRailSnapshot
CozyIslandHost.getCloudCacheSnapshot
CozyIslandHost.getSourceSnapshot
CozyIslandHost.runSmoke
CozyIslandHost.applyActionFrame
CozyIslandHost.applyFixtureScript
sourceProfile.createSourceProfile
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
railState.sampleRailPose
railSnapshot.serializeRailPose
cloudCache.describeGeometry
cloudCache.serializeSnapshot
replayFixture.runActionJournalParity
```

## Source facts to preserve

```txt
entry script: ./src/main.js?v=standalone-1
island id: cozy-island-001
island seed: cozy-island-standalone
island radius: 100
landform maxHeight: 18
beachWidth: 10
shelfWidth: 36
heightfield resolution: 129
shoreline segments: 128
clearing fence radius: 12
campfire radius: 2.25
ocean floor size: 3600
ocean floor resolution: 53
ocean baseDepth: -128
ocean shelfDepth: -16
grass seed: cozy-island-grass
grass patch count: 140
cloud seed: cozy-island-clouds
cloud weather: sunrise-haze
cloud count: 4
cloud point count per cloud: 520
first-person threshold: scrollProgress >= 0.985
movement speed: 2.6 meters/sec
campfire keepout radius: 2.35
camera rail phases needed: sky_approach, island_approach, clearing_approach, shoulder, near_head, first_person
```

## Main blockers

```txt
scrollProgress is a bare mutable number
pointer drag state is DOM-owned and not journaled
keyboard state is a Set with no normalized action records
firstPerson(dt) mutates player position directly
valid(next) only returns boolean, so rejection reasons are lost
railPose() returns transient Vector3 values and no named phase
cloudCache stores BufferGeometry without serializable descriptors
cloud drift mutates cloud positions in the frame loop
CozyIsland exposes raw source objects but not structured diagnostics
no source snapshot validates source kit output shape
no DOM-free fixture can prove movement, rail, cloud, or replay parity
```

## Recommended next slice

```txt
MyCozyIsland Reducer Gate + Cloud Snapshot Fixture Cutover
```

Build order:

```txt
preserve current index.html, src/main.js render output, and globalThis.CozyIsland compatibility
-> add globalThis.CozyIslandHost as an additive diagnostics host
-> create cozy-source-state-profile-kit to group all vendored kit source outputs
-> serialize SourceSnapshot with ids, seeds, counts, bounds, anchor, clearing, and object summaries
-> create HostState with scrollProgress, player pose, pointer state, input journal, rail phase, cloud summaries, and latest result
-> normalize wheel, pointer, keyboard, and fixture commands into ActionFrame records
-> add ActionResult records with status, reason, before, after, payload, frame, elapsed, and source
-> add stable rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> move scroll wheel changes behind scrollReducer.applyWheelDelta
-> move pointer delta updates behind pointerReducer.applyPointerDelta
-> move WASD movement behind movementReducer.applyMoveVector
-> make valid(next) return a ClearingBoundaryResult instead of boolean only
-> make campfire keepout return a named CampfireKeepoutResult
-> move railPose() into railState.sampleRailPose and emit named rail phases
-> describe cloud geometry cache with key, source id, index, point count, bounds, band, speed, and drift
-> expose getState, getDiagnostics, getActionJournal, getRailSnapshot, getCloudCacheSnapshot, getSourceSnapshot, runSmoke, applyActionFrame, and applyFixtureScript
-> add DOM-free smokes for source snapshot shape, scroll action acceptance, pointer gating, rail phase sampling, first-person movement rejection, first-person movement acceptance, cloud snapshot stability, and replay parity
-> defer pointer lock, touch controls, render extraction, ocean shader upgrades, save/load, and grass patch fidelity rebuild until reducer and fixture parity exist
```

## Validation note

No runtime source code changed in this pass.

No local build or smoke test was run because this was a connector-only internal documentation update.
