# MyCozyIsland project breakdown

**Run timestamp:** `2026-07-07T15:40:06-04:00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Selected next slice:** `MyCozyIsland Host Diagnostics + Source Snapshot ActionJournal Fixture Cutover`

## Selection reason

`LuminaryLabs-Publish/MyCozyIsland` was selected as the oldest eligible non-Cavalry Publish repo by latest central ledger timestamp.

`LuminaryLabs-Publish/TheCavalryOfRome` remained excluded by standing rule.

Latest eligible timestamps checked:

```txt
MyCozyIsland     2026-07-07T14:21:20-04:00
IntoTheMeadow    2026-07-07T14:28:17-04:00
ZombieOrchard    2026-07-07T14:40:17-04:00
HorrorCorridor   2026-07-07T14:51:44-04:00
TheOpenAbove     2026-07-07T15:11:23-04:00
PhantomCommand   2026-07-07T15:19:05-04:00
PrehistoricRush  2026-07-07T15:29:27-04:00
AetherVale       2026-07-07T16-29-18-04-00
```

## Source files reviewed

```txt
README.md
index.html
src/main.js
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/AetherVale.md
```

## Current status

`MyCozyIsland` is a standalone static Nexus-style Cozy Island app. It serves `index.html`, loads `src/main.js?v=standalone-1`, imports Three.js from jsDelivr, and vendors all active domain kits under `src/kits/`.

The proof already has island landform, ocean floor, shoreline foam, water, foliage, paths, grass placement, fenced clearing, invisible player anchor, campfire, smoke particles, cloud loading UI, point-cloud clouds, scroll-driven sky-to-eye camera rail, pointer look, keyboard movement, and a minimal `globalThis.CozyIsland` host.

The main gap is runtime authority. `src/main.js` still owns source composition, Three.js object construction, DOM input, scroll progress, pointer look, movement policy, rail sampling, cloud cache generation, animation, and host projection inline. This makes rail state, movement acceptance, cloud cache stability, replay, and source parity hard to verify without a browser render pass.

## Interaction loop

```txt
index.html
-> canvas#game, cloud-loader, and error panel
-> src/main.js imports Three.js and vendored kits
-> creates landform, clearing, foliage graph, ocean floor, grass, campfire, smoke, and cloud source contracts
-> creates WebGL renderer / scene / camera / lights / fog
-> creates terrain, ocean floor, water, foam, paths, objects, fence, campfire, smoke, grass, and clouds
-> registers resize, keyboard, wheel, blur, and pointer listeners
-> requestAnimationFrame(frame)
-> updates water, rail or first-person camera, smoke, fire, and cloud drift
-> renderer.render(scene, camera)
-> exposes globalThis.CozyIsland
```

Target service loop:

```txt
source profile builds all non-render descriptors
-> source snapshot serializes landform, floor, graph, clearing, grass, campfire, smoke, cloud, and player anchor summaries
-> host ingests DOM or fixture commands as ActionFrame records
-> reducers return ActionResult records instead of silent mutation
-> rail snapshot serializes progress, phase, camera position, look target, and firstPersonReady
-> movement results explicitly accept or reject against first-person readiness and clearing policy
-> cloud snapshot serializes cache keys, source ids, point counts, bounds, drift, speed, and band
-> diagnostics expose latest frame, latest action result, cache summaries, kit status, and smoke reports
-> DOM-free fixtures prove source, rail, movement, cloud, and snapshot stability
```

## Domains identified

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
cloud-point-rendering
cloud-drift-runtime
camera-rail-scroll-control
camera-rail-sample-curve
camera-rail-phase-projection
pointer-look-input
keyboard-movement-input
first-person-anchor
first-person-movement-policy
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
cozy-cloud-cache-snapshot
cozy-rail-snapshot
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
cozy-runtime-frame-kit
cozy-diagnostics-host-kit
```

Next-cut kits:

```txt
cozy-source-state-profile-kit
cozy-scene-source-snapshot-kit
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

Target services:

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
actionFrame.normalizeDomEvent
actionFrame.normalizeFixtureCommand
actionResult.accept
actionResult.reject
actionJournal.append
scrollReducer.applyWheelDelta
pointerReducer.applyPointerDelta
movementReducer.applyMoveVector
railState.sampleRailPose
cloudCache.describeGeometry
replayFixture.runActionJournalParity
```

## Recommended next implementation slice

```txt
MyCozyIsland Host Diagnostics + Source Snapshot ActionJournal Fixture Cutover
```

Build order:

```txt
preserve current index.html, src/main.js visual behavior, and globalThis.CozyIsland compatibility
-> expose globalThis.CozyIslandHost beside globalThis.CozyIsland
-> create cozy-source-state-profile-kit as the source-owned composition boundary
-> serialize source summaries for islandState, landform, oceanFloor, graph, clearing, grassPlacement, grassWind, campfireGraph, smokeDescriptor, cloudContract, and player anchor
-> add cozy-scene-source-snapshot-kit with validation and comparison helpers
-> add cozy-action-frame-contract-kit for DOM and fixture input
-> add cozy-action-result-contract-kit with accepted, rejected, unchanged, reason, before, after, frame, elapsed, source, and payload fields
-> add rejection reasons: not_first_person_yet, outside_clearing, campfire_keepout, no_move_vector, invalid_payload, unsupported_action, duplicate_frame
-> move scrollProgress, pointer look, and WASD movement behind result-returning reducers
-> return explicit movement results instead of silent no-ops
-> move railPose sampling into serializable rail state and snapshot kits
-> expose rail phases: sky_approach, island_approach, clearing_approach, shoulder, near_head, first_person
-> expose cloud cache descriptors instead of only saved BufferGeometry references
-> add host helpers for state, diagnostics, action journal, source snapshot, rail snapshot, cloud snapshot, runSmoke, and fixture scripts
-> add DOM-free smoke for source snapshot shape, scroll action, rail stability, movement rejection, movement acceptance, cloud descriptor stability, and action journal replay parity
-> defer render extraction, pointer lock, mobile touch controls, save/load, ocean shader expansion, and high-fidelity grass patch rebuild
```

## Validation status

No runtime source code changed.

No local build or smoke test was run during this connector-only documentation update.
