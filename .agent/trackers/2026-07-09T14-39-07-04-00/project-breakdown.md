# Project Breakdown: My Cozy Island Host Readback Central Parity

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-39-07-04-00`

**Run type:** documentation-only repo breakdown

## Selection result

The accessible `LuminaryLabs-Publish` repository list was compared against central tracking in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from central tracking, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected because its repo-local `.agent` state had advanced to `2026-07-09T14-28-45-04-00` while the central ledger still pointed at `2026-07-09T11-39-50-04-00`. This pass repairs the central/repo-local pointer parity and keeps the next work focused on host readback proof.

## Publish repositories observed

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-16-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / repo-local .agent latest 2026-07-09T14-28-45-04-00 / central latest 2026-07-09T11-39-50-04-00 before this update
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T13-38-15-04-00
```

## Current interaction loop

```txt
index.html
  -> canvas#game, #cloud-loader, #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local source-domain descriptor kits
  -> create island, ocean floor, foliage graph, clearing graph, grass placement, grass wind, campfire, smoke, cloud, and hero-cloud descriptors
  -> create Three.js renderer, scene, camera, lights, fog, water, terrain, floor, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud clouds
  -> install resize, keyboard, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates scroll progress directly
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> rail() samples the sky-to-eye camera curve while progress < 0.985
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts movement only inside the clearing radius and outside the campfire keepout
  -> frame updates sea bob, first-person movement or rail camera, smoke, flame, cloud drift, flame scale, and renderer
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Domains in use

```txt
static-route-domain
route-token-domain
loader-status-domain
error-panel-domain
three-module-import-domain
source-descriptor-domain
island-landform-domain
ocean-floor-domain
shoreline-domain
foliage-object-graph-domain
fenced-clearing-domain
campfire-object-domain
smoke-particle-domain
grass-placement-domain
grass-wind-domain
mattatz-cloud-domain
hero-cloud-point-cache-domain
three-render-host-domain
scene-composition-domain
resize-consumer-domain
keyboard-input-domain
wheel-progress-domain
pointer-look-domain
camera-rail-domain
first-person-movement-domain
movement-validity-domain
render-frame-domain
legacy-host-diagnostics-domain
host-readback-proof-domain
browser-consumer-fixture-domain
central-ledger-sync-domain
```

## Services the kits offer

```txt
index.html: static canvas, cloud loader, error panel, and versioned module route
main-cloudform.js: live route owner and browser consumer host
createOceanIslandLandformState: source island state
createOceanIslandLandformRenderContract: landform heightfield and shoreline render contract
sampleIslandHeight: height sampling service
sampleIslandMasks: mask sampling service
createDenseCozyIslandObjectGraph: foliage/path object graph source
createOceanFloorState: ocean floor source state
createOceanFloorRenderContract: ocean floor heightfield and material contract
createGrassPatchPlacementContract: grass patch placement contract
createGrassWindDescriptor: grass wind descriptor
createCampfireObjectGraph: campfire graph descriptor
createSmokeParticleDescriptor: smoke particle descriptor
createFencedClearingGraph: clearing, fence, avatar anchor, and collision zones
createMattatzCloudsState: cloud source state
createMattatzCloudRenderContract: hero cloud render contract
meshGrid / terrainMesh / floorMesh: heightfield mesh projection
waterMesh / foamMesh / pathMesh: water, shoreline, and path projection
objGroup / fenceGroup / campfireMesh: object graph mesh projection
smokeMesh / updateSmoke: smoke point cloud projection and animation
grassMesh: instanced grass projection
heroCloudGeometry / heroCloudGroup: cached point-cloud cloud projection
rail: scroll-to-eye camera path sampling
valid: clearing/campfire movement policy
fp: first-person movement and camera update
frame: render loop, cloud drift, flame, smoke, sea bob, and renderer submission
globalThis.CozyIsland: legacy diagnostic surface
```

## Kits

### Explicit implemented kits

```txt
src/kits/ocean-island-landform-domain/index.js
src/kits/island-foliage-domain/index.js
src/kits/ocean-floor-domain/index.js
src/kits/grass-object-domain/index.js
src/kits/grass-wind-domain/index.js
src/kits/campfire-object-domain/index.js
src/kits/smoke-particle-domain/index.js
src/kits/fenced-clearing-domain/index.js
src/kits/mattatz-clouds-domain/index.js
src/kits/cozy-hero-cloud-form-kit/index.js
```

### Runtime-implied kits

```txt
cozy-static-shell-kit
cozy-cloud-loader-kit
cozy-error-panel-kit
cozy-cloudform-entry-kit
cozy-route-token-kit
cozy-three-render-host-kit
cozy-scene-composition-kit
cozy-terrain-render-kit
cozy-ocean-floor-render-kit
cozy-water-plane-kit
cozy-shoreline-foam-kit
cozy-path-render-kit
cozy-foliage-render-kit
cozy-fence-render-kit
cozy-campfire-render-kit
cozy-smoke-render-kit
cozy-grass-instanced-render-kit
cozy-hero-cloud-point-cache-kit
cozy-cloud-drift-frame-kit
cozy-resize-consumer-kit
cozy-keyboard-input-kit
cozy-wheel-progress-kit
cozy-pointer-look-kit
cozy-camera-rail-kit
cozy-first-person-movement-kit
cozy-movement-validity-kit
cozy-render-frame-loop-kit
cozy-legacy-host-diagnostics-kit
```

### Next-cut proof kits

```txt
route-token-readback-kit
source-profile-kit
source-fingerprint-kit
scene-source-snapshot-kit
browser-input-action-frame-kit
action-result-kit
input-journal-kit
movement-policy-result-kit
camera-rail-snapshot-kit
grass-placement-snapshot-kit
grass-instance-snapshot-kit
hero-cloud-descriptor-snapshot-kit
hero-cloud-cache-snapshot-kit
cloud-drift-result-kit
render-host-snapshot-kit
cozy-island-host-snapshot-kit
browser-consumer-fixture-kit
central-ledger-readback-kit
```

## Main finding

`MyCozyIsland` should not be visually rewritten next. The scene already composes a dense descriptor stack and a live Three.js consumer. The missing layer is additive host/readback proof: source fingerprints, input/action frames, movement policy results, camera rail snapshots, grass placement and instance snapshots, hero cloud descriptor/cache/drift snapshots, renderer state, and compatibility-safe `globalThis.CozyIslandHost.getState()`.

## Next safe ledge

```txt
MyCozyIsland Host Readback Central Parity + Browser Consumer Fixture Gate
```

Start with pure `src/host-proof/*` and fixture modules.

Do not change the route token, visual design, rail threshold, movement constraints, grass renderer, cloud renderer, or legacy `globalThis.CozyIsland` surface during that ledge.

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
local checkout performed: no
npm install: not run
npm start: not run
npm run check: not run because no check script exists yet
browser smoke: not run
DOM-free fixture: not run because fixture files do not exist yet
pushed to main: yes
```
