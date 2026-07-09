# MyCozyIsland Project Breakdown

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-39-50-04-00`

**Branch target:** `main`

## Selection result

The accessible `LuminaryLabs-Publish` repository list was compared against central tracking in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, missing sampled root `.agent/START_HERE.md`, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the eligible fallback because central tracking and repo-local pointers were not in full parity and the live route still lacks additive source/host readback plus DOM-free browser consumer fixture proof.

## Publish repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present
LuminaryLabs-Publish/AetherVale           tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland         selected / root .agent present / host readback parity fallback
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
```

## Current route

```txt
index.html
  -> canvas#game
  -> #cloud-loader
  -> #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local source-domain kit imports
  -> inline browser scene, renderer, input, camera, grass, cloud, smoke, flame, and legacy diagnostics
```

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local kits
  -> construct island, ocean floor, foliage, clearing, campfire, smoke, grass, wind, cloud, and hero-cloud descriptors
  -> create Three.js renderer, scene, camera, lights, fog, water, terrain, floor, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud clouds
  -> install resize, keyboard, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel input mutates scroll progress directly
  -> pointer drag mutates yaw before first-person and yaw/pitch after first-person
  -> rail camera samples sky-to-eye spline while progress < 0.985
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts movement only inside clearing radius and outside campfire keepout
  -> frame updates sea bob, rail or first-person camera, smoke, flame, cloud drift, flame scale, and renderer
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Domains in use

```txt
static-browser-route-domain
route-token-domain
loading-status-domain
error-panel-domain
three-cdn-import-domain
local-source-kit-import-domain
scene-composition-domain
island-landform-domain
ocean-floor-domain
shoreline-foam-domain
path-network-domain
foliage-object-graph-domain
fenced-clearing-domain
campfire-object-domain
smoke-particle-domain
grass-placement-domain
grass-wind-domain
hero-cloud-source-domain
hero-cloud-geometry-cache-domain
cloud-drift-domain
input-state-domain
scroll-progress-domain
pointer-look-domain
camera-rail-domain
first-person-movement-domain
movement-validity-domain
render-frame-domain
legacy-host-diagnostics-domain
planned-route-token-readback-domain
planned-source-profile-domain
planned-source-fingerprint-domain
planned-scene-source-snapshot-domain
planned-browser-input-action-frame-domain
planned-action-result-domain
planned-input-journal-domain
planned-movement-policy-result-domain
planned-camera-rail-snapshot-domain
planned-grass-placement-readback-domain
planned-grass-instance-readback-domain
planned-hero-cloud-descriptor-readback-domain
planned-hero-cloud-cache-readback-domain
planned-cloud-drift-result-domain
planned-render-host-snapshot-domain
planned-cozy-island-host-state-domain
planned-browser-consumer-fixture-domain
central-ledger-sync-domain
```

## Services that kits offer

```txt
route HTML shell
route token/version selection
cloud loader progress projection
error panel projection
Three.js module import
island heightfield creation
island mask sampling
ocean floor heightfield construction
shoreline contract creation
path mesh projection
foliage graph projection
fenced clearing graph and collision zone construction
campfire object graph projection
smoke descriptor creation
smoke particle frame update
grass wind descriptor creation
grass patch placement creation
grass InstancedMesh projection
hero cloud descriptor creation
hero cloud point geometry generation
hero cloud point geometry caching
cloud shader material creation
cloud drift frame update
resize handling
keyboard capture
wheel-to-progress mutation
pointer yaw/pitch mutation
rail camera sampling
first-person movement integration
movement validity check
sea bob update
flame scale update
frame render submission
legacy globalThis.CozyIsland diagnostics
planned route token readback
planned source profile and fingerprint
planned scene source snapshot
planned browser input action frame
planned action result records
planned movement policy result records
planned camera rail snapshot rows
planned grass placement and instance snapshots
planned hero-cloud descriptor, cache, and drift rows
planned render host snapshot
planned additive CozyIslandHost.getState()
planned DOM-free browser consumer fixture
central ledger readback refresh
```

## Kits identified

```txt
implemented explicit kits:
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

runtime-implied kits:
  cozy-static-shell-kit
  cozy-cloud-loader-kit
  cozy-error-panel-kit
  cozy-cloudform-entry-kit
  cozy-route-script-token-kit
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

next-cut proof kits:
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

The route should not be visually rewritten next. The useful cut is host readback parity: turn the existing route token, source descriptors, input/movement decisions, camera rail, grass instances, cloud cache/drift, and render host state into additive proof records that can be consumed by `globalThis.CozyIslandHost.getState()` and a DOM-free fixture.

## Required next safe ledge

```txt
MyCozyIsland Host Readback Parity Refresh + Browser Consumer Fixture Gate
```

## Stop condition for next ledge

```txt
route token reports hero-cloud-4
source fingerprint is stable
descriptor snapshot reports island, ocean floor, clearing, grass, smoke, and cloud contracts
movement policy rows distinguish accepted, rejected-outside-clearing, and rejected-campfire-keepout
camera rail rows prove start, mid, near-handoff, and first-person states
grass rows prove requested and rendered instance counts
cloud rows prove descriptor count, point cache count, and drift result
render host snapshot reports renderer/camera/scene summary
CozyIslandHost.getState() is additive and legacy globalThis.CozyIsland remains intact
browser consumer fixture runs without DOM, canvas, browser launch, or visual rewrite
```

## Validation status

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
pushed to main: yes after doc writes
```
