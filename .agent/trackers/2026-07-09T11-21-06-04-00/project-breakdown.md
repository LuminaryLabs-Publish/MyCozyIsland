# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-21-06-04-00`

## Selection

The accessible `LuminaryLabs-Publish` repo list was compared against the central tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled repo-local root `.agent` state.

No checked non-Cavalry Publish repo was new, absent from the central ledger, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

`MyCozyIsland` was selected as the eligible fallback because repo-local `.agent` state had advanced ahead of the central ledger and the live route still lacks fixture-readable source/host proof.

## Publish repositories observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present
LuminaryLabs-Publish/AetherVale           tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland         selected / root .agent present / host-proof ledger refresh
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present
```

## Source read

`MyCozyIsland` is a standalone static Three.js cozy island route.

The live route boots through `index.html`, mounts `canvas#game`, shows a `#cloud-loader`, has an `#error` panel, and loads `./src/main-cloudform.js?v=hero-cloud-4`.

`package.json` exposes only `npm run start` as `python3 -m http.server 8080`.

`src/main-cloudform.js` imports Three.js from CDN and imports local source kits for island landform, foliage, ocean floor, grass placement, grass wind, campfire, smoke, fenced clearing, and mattatz clouds.

## Interaction loop

```txt
index.html
  -> canvas#game + cloud loader + error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN import
  -> local source-domain kit imports
  -> source descriptors: island, ocean floor, foliage graph, clearing graph, grass placement, grass wind, campfire, smoke, clouds
  -> renderer/scene/camera/light/fog setup
  -> mesh adapters: terrain, floor, water, foam, path, foliage, fence, campfire, smoke, grass, point clouds
  -> resize/keyboard/wheel/pointer events mutate inline state
  -> rail camera runs while progress < 0.985
  -> first-person movement unlocks when progress >= 0.985
  -> valid(next) enforces clearing radius and campfire keepout only
  -> frame updates sea, camera, smoke, flame, cloud drift, and renderer
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Domains in use

```txt
static-browser-route-domain
route-token-domain
loading-status-domain
error-panel-domain
three-render-host-domain
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
first-person-movement-domain
movement-validity-domain
camera-rail-domain
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
error display projection
Three.js module import
island heightfield and mask sampling
ocean floor heightfield construction
shoreline contract creation
path network mesh projection
foliage object graph projection
fenced clearing object/collision zone construction
campfire graph projection
smoke particle descriptor creation and animation
grass wind descriptor creation
grass patch placement creation
grass instanced mesh projection
hero cloud descriptor creation
hero cloud point geometry caching
cloud shader material creation
cloud drift frame update
resize handling
keyboard capture
wheel-to-scroll-progress mutation
pointer yaw/pitch mutation
rail camera sampling
first-person movement integration
movement validity check
sea bob update
flame scale update
frame render submission
legacy host diagnostic exposure
planned route token readback
planned source profile/fingerprint
planned scene source snapshot
planned browser input action frame
planned action result rows
planned movement policy rows
planned camera rail snapshot rows
planned grass placement/instance rows
planned hero-cloud descriptor/cache/drift rows
planned render host snapshot
planned additive CozyIslandHost.getState()
planned DOM-free browser consumer fixture
central ledger readback refresh
```

## Kits

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

`MyCozyIsland` should not be visually rewritten yet.

The route already has a coherent source-descriptor stack and visible scene. The blocker is that source construction, browser consumption, input/movement decisions, camera rail snapshots, grass instance counts, cloud cache/drift records, and render host state are not exposed as stable records.

## Next safe ledge

```txt
MyCozyIsland Host Proof Ledger Refresh + Browser Consumer Fixture Gate
```

## Required next files

```txt
src/host-proof/route-token-readback.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/browser-input-action-frame.js
src/host-proof/action-result.js
src/host-proof/input-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-placement-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/hero-cloud-descriptor-snapshot.js
src/host-proof/hero-cloud-cache-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/render-host-snapshot.js
src/host-proof/cozy-island-host-snapshot.js
src/host-proof/browser-consumer-fixture.js
scripts/my-cozy-island-browser-consumer-fixture.mjs
```

## Validation

```txt
runtime source changed: no
local checkout: no
npm install: no
npm start: no
npm run check: no, no check script exists
browser smoke: no
GitHub Pages smoke: no
branch created: no
pull request created: no
pushed to main: yes
```
