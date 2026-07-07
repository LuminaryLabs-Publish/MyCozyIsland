# MyCozyIsland Project Breakdown

**Run timestamp:** `2026-07-07T14:21:20-04:00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Selected next slice:** `MyCozyIsland Source State Authority + Rail Action Result Fixture Cutover`

## Selection reason

`LuminaryLabs-Publish/MyCozyIsland` was selected as the oldest eligible non-Cavalry Publish repo by latest central ledger timestamp. The previous ledger entry for this repo was `2026-07-07T13:11:20-04:00`, which was older than the latest central ledger timestamps for `IntoTheMeadow`, `ZombieOrchard`, `HorrorCorridor`, `TheOpenAbove`, `PhantomCommand`, `PrehistoricRush`, and `AetherVale`.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Source files reviewed

```txt
README.md
package.json
index.html
src/main.js
src/kits/ocean-island-landform-domain/index.js
src/kits/island-foliage-domain/index.js
src/kits/ocean-floor-domain/index.js
src/kits/grass-object-domain/index.js
src/kits/fenced-clearing-domain/index.js
src/kits/campfire-object-domain/index.js
src/kits/smoke-particle-domain/index.js
src/kits/mattatz-clouds-domain/index.js
.agent/README.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/MyCozyIsland.md
```

## Current status

`MyCozyIsland` is a standalone static Nexus-style Cozy Island app. It loads a single canvas and cloud loading panel from `index.html`, imports `src/main.js`, vendors all required domain kits under `src/kits/`, and depends on Three.js from jsDelivr at runtime.

The live scene already produces a complete cozy island composition:

```txt
cozy island landform
shoreline foam
water plane
ocean floor
reef / coral / rock objects
path network
foliage and understory objects
grass patches
fenced campfire clearing
invisible player anchor
campfire object graph
smoke particle emitter
low / high point-cloud cloud layers
scroll-driven sky-to-eye camera rail
first-person movement inside the clearing
```

The repo is visually coherent, but the runtime authority boundary is still too implicit. `src/main.js` currently owns source-state composition, render object creation, input listeners, scroll progress, camera rail math, movement policy, cloud geometry cache creation, animation updates, smoke updates, water updates, campfire flicker, cloud drift, and host exposure inline.

The current public host is `globalThis.CozyIsland`. It exposes raw source objects and `getScrollProgress()`, but it is not yet a stable diagnostics, action, snapshot, fixture, or replay contract.

## Current interaction loop

```txt
index.html
-> canvas#game
-> cloud-loader UI
-> script type=module ./src/main.js?v=standalone-1
-> import Three.js from jsDelivr
-> import vendored domain kits from src/kits
-> create landform state and render contract
-> create height / mask samplers
-> create fenced clearing and player anchor
-> create dense island object graph and path network
-> create ocean floor state and render contract
-> create grass wind descriptor
-> create campfire object graph
-> create smoke particle descriptor
-> create grass placement contract
-> create Mattatz cloud render contract
-> create WebGL renderer / scene / camera / lights / fog
-> create meshes and point-cloud objects
-> add DOM input listeners
-> requestAnimationFrame(frame)
-> update water, smoke, campfire flame, cloud drift, camera rail or first-person camera
-> renderer.render(scene, camera)
-> expose globalThis.CozyIsland
```

## Intended player loop

```txt
open island page
-> watch cloud loader complete
-> scroll upward/downward through sky-to-island camera rail
-> rotate view while still on rail
-> reach first-person threshold near scrollProgress 0.985
-> use WASD inside fenced clearing
-> pointer-drag to look around
-> remain constrained outside campfire center and inside clearing boundary
-> observe fire, smoke, water, foliage, grass, and clouds as ambient scene systems
```

## Target service loop

```txt
load scene source profile
-> produce deterministic source-state snapshot
-> install source-backed domain contracts
-> create render host from snapshot
-> normalize browser and fixture input into ActionFrame records
-> apply scroll / pointer / movement actions through result-returning reducers
-> update rail state and first-person state
-> update ambient animation descriptors
-> project cloud cache descriptors and bounds
-> publish CozyIslandHost snapshot
-> append accepted / rejected action result journal
-> run DOM-free fixtures against source state, rail samples, movement rejection, cloud cache stability, and snapshot shape
```

## Domains in use

```txt
static-browser-shell
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
water-plane-render
ocean-floor-heightfield
ocean-floor-object-placement
ocean-floor-water-material
island-landform-heightfield
island-terrain-material
shoreline-foam-render
path-network-source
path-rendering
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
pointer-look-input
keyboard-movement-input
first-person-anchor
first-person-movement-policy
clearing-boundary-policy
runtime-frame-loop
ambient-animation-loop
cozy-host-snapshot
cozy-action-frame
cozy-action-result
cozy-input-journal
cozy-diagnostics
cozy-fixture-smoke
```

## Explicit vendored kits

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

## Runtime-implied kits

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

## Kit services identified

### `ocean-island-landform-domain`

```txt
createOceanIslandLandformState(options)
sampleIslandHeight(state, point)
sampleIslandMasks(state, point)
createOceanIslandLandformRenderContract(state, options)
create deterministic landform heightfield samples
create shoreline samples
emit terrain masks for water, wetSand, beach, grass, rock, cliff, and foam
```

### `island-foliage-domain`

```txt
createIslandPathNetwork(options)
createDenseCozyIslandObjectGraph(options)
createDenseCozyIslandRenderContract(options)
create path segments from beach to grove and grove loop
place broadleaf trees, young trees, palm trees, bushes, ferns, fallen logs, rocks, driftwood, and reefs
return root id, object array, byId map, and path network
```

### `ocean-floor-domain`

```txt
createOceanFloorState(options)
sampleOceanFloorHeight(state, point)
createOceanFloorHeightfield(state, options)
createOceanFloorObjectPlacements(state, options)
createOceanFloorRenderContract(state, options)
produce shelf / reef / deep-floor masks
place reef clusters, coral clusters, sea-floor rocks, and sea-floor boulders
return water material descriptor
```

### `grass-object-domain`

```txt
createGrassPatchPlacementContract(options)
createGrassPatchBatchDescriptors(patches)
respect land masks, path clearance, object clearance, and exclusion zones
emit patch transforms, blade counts, patch radii, batch keys, and geometry template keys
```

### `fenced-clearing-domain`

```txt
createFencedClearingGraph(options)
create 24 fence-post objects
create invisible player-avatar anchor
create collision-boundary data object
create clearance zones and object exclusion zones
```

### `campfire-object-domain`

```txt
createCampfireObjectGraph(options)
createCampfireObject(options)
create root campfire object
create firewood-ring, ember-bed, flame-emitter, smoke-emitter-anchor, and warm-light children
attach blocking collision descriptor to campfire root
```

### `smoke-particle-domain`

```txt
createSmokeParticleDescriptor(options)
normalize wind direction
emit particleCount, spawnRadius, lifespanSeconds, riseSpeed, turbulence, wind response, and render material descriptor
```

### `mattatz-clouds-domain`

```txt
createMattatzCloudsState(options)
createMattatzCloudRenderContract(state)
emit four low/high cloud descriptors with position, scale, drift, and speed
```

### `src/main.js` inline runtime services

```txt
indexedMesh(samples, resolution, colorFor, material)
makeTerrain(heightfield)
makeOceanFloor(heightfield)
makeWater(config)
makeFoam(shoreline)
makePath(pathNetwork, sampleHeightFor)
insideZone(position, zones, margin)
makeIslandObjects(graph, exclusionZones)
makeSeaObjects(objects)
makeFence(clearing)
makeCampfire(graph)
makeSmoke(descriptor)
updateSmoke(points, dt, now)
makeGrass(placement)
cloudRandom(seedText)
cloudMaterial()
cloudGeometry(descriptor, index)
makeClouds(contract)
railPose()
valid(next)
firstPerson(dt)
frame(now)
```

## Current blocker

The repo has good deterministic descriptors, but there is no authoritative application state contract above the render loop. That blocks safe iteration on pointer-lock movement, saved scenes, mobile controls, high-fidelity grass, render extraction, or ambient system tuning because there is no fixture surface proving that the island source, rail state, movement constraints, cloud cache, and host snapshot are stable.

## Recommended next cutover

```txt
MyCozyIsland Source State Authority + Rail Action Result Fixture Cutover
```

## Next build order

```txt
preserve current index.html, src/main.js visual behavior, and globalThis.CozyIsland compatibility
-> create cozy-source-state-profile-kit as the source-owned scene composition boundary
-> serialize islandState, landform summary, clearing summary, graph summary, grass summary, smoke summary, cloud summary, and campfire summary
-> expose globalThis.CozyIslandHost beside globalThis.CozyIsland
-> add getState(), getDiagnostics(), getActionJournal(), getCloudCacheSnapshot(), getRailSnapshot(), and runSmoke() host helpers
-> normalize wheel, pointerdown, pointerup, pointermove, keydown, keyup, blur, resize, frame, and fixture commands into ActionFrame records
-> add ActionResult records with accepted, reason, before, after, frame, elapsed, and source
-> move scrollProgress mutation behind cozy-scroll-action-reducer-kit
-> move drag / pointer look mutation behind cozy-pointer-look-result-kit
-> move WASD movement into cozy-first-person-movement-result-kit
-> return rejected movement results for outside clearing, inside campfire keepout, not-first-person-yet, and no-move-vector
-> move railPose into cozy-camera-rail-state-kit and cozy-camera-rail-snapshot-kit
-> snapshot rail phase, progress, eased progress, position, look target, firstPersonReady, and player yaw/pitch
-> create cozy-clearing-boundary-result-kit for min/max radius policy
-> create cozy-cloud-cache-descriptor-kit with cacheKey, source id, pointCount, attribute names, boundingSphere radius, band, baseY, drift, speed, and material id
-> expose cloud cache snapshot without leaking raw BufferGeometry as the only state surface
-> add cozy-scene-source-snapshot-kit for deterministic descriptor summaries
-> add cozy-kit-status-report-kit for vendored kit availability and created contract counts
-> add DOM-free fixture smoke for source state, rail samples, scroll action, movement rejection, movement acceptance, cloud descriptor stability, and snapshot shape
-> defer render extraction, pointer lock, mobile touch controls, save adapter, and high-fidelity grass patch rebuild until host snapshot and fixture parity pass
```

## Acceptance targets

```txt
window.CozyIsland remains available with existing fields
window.CozyIslandHost.getState() returns stable serializable source, rail, player, clearing, cloudCache, kitStatus, and diagnostics slices
rail fixture can sample scroll progress 0, 0.5, 0.985, and 1 without DOM or WebGL
movement fixture rejects not-first-person movement
movement fixture rejects outside clearing boundary
movement fixture rejects campfire keepout movement
movement fixture accepts legal first-person clearing movement
cloud cache fixture proves stable descriptor keys and point counts
snapshot fixture is JSON-serializable
runSmoke() returns pass/fail details, not only console output
no render extraction happens before source/rail/cloud snapshots exist
```

## New / updated kit targets

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
cozy-cloud-cache-descriptor-kit
cozy-cloud-cache-snapshot-kit
cozy-cloud-fixture-smoke-kit
cozy-kit-status-report-kit
cozy-replay-parity-smoke-kit
```

## Deferred work

```txt
render-module extraction
new grass mesh patch generator
pointer-lock movement
mobile touch controls
save/load adapter
asset pipeline
shader quality pass
new island biomes
multiplayer or shared state
```

## Validation note

No runtime source code changed in this pass. No local build or smoke test was executed.