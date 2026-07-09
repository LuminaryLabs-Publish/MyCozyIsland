# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-26-56-04-00`

## Selection result

`MyCozyIsland` was selected after comparing the accessible `LuminaryLabs-Publish` repo list against `LuminaryLabs-Dev/LuminaryLabs` tracking and sampled root `.agent` state.

No checked non-Cavalry repo was new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md`.

`TheCavalryOfRome` remains excluded.

`MyCozyIsland` was the oldest eligible documented fallback and central-ledger catch-up target because central tracking still pointed at `2026-07-09T11-39-50-04-00`, while repo-local `.agent` state had already advanced to `2026-07-09T14-20-00-04-00`.

## Full Publish repo list observed

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-01-54-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T13-38-15-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / root .agent present / central latest 2026-07-09T11-39-50-04-00 / repo-local latest 2026-07-09T14-20-00-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

## Current interaction loop

```txt
index.html
  -> canvas#game + cloud loader + error panel
  -> script ./src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN
  -> import local descriptor/domain kits
  -> create source descriptors for island, ocean floor, clearing, foliage, grass, wind, campfire, smoke, and clouds
  -> build Three.js renderer, scene, camera, lights, fog, terrain, floor, ocean, foam, path, foliage, fence, fire, smoke, grass, and cloud point geometry
  -> install resize, key, wheel, pointerdown, pointerup, and pointermove listeners
  -> wheel mutates scroll progress directly
  -> pointer drag mutates yaw before first-person and yaw/pitch in first-person
  -> camera rail samples progress while progress < 0.985
  -> first-person movement and clearing/campfire validity run when progress >= 0.985
  -> animation frame updates sea bob, smoke, flame, cloud drift, camera, and renderer
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
island source-state creation
island render-contract creation
island height/mask sampling
ocean floor source-state creation
ocean floor render-contract creation
foliage object graph creation
fenced clearing graph creation
campfire graph creation
smoke particle descriptor creation
grass wind descriptor creation
grass patch placement contract creation
mattatz cloud source-state creation
mattatz cloud render-contract creation
terrain mesh projection
floor mesh projection
water plane projection
shoreline foam projection
path mesh projection
foliage mesh projection
fence mesh projection
campfire mesh/light projection
smoke point update
grass InstancedMesh projection
hero-cloud point geometry cache
cloud shader material creation
cloud drift frame update
resize handling
keyboard capture
wheel progress mutation
pointer yaw/pitch mutation
camera rail sampling
first-person movement integration
movement validity check
render frame submission
legacy host diagnostic exposure
planned source/host proof readback
planned DOM-free fixture validation
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

The route is visually stable enough for the next source pass. The blocking work is not renderer replacement, cloud replacement, or grass replacement. The blocker is that browser behavior is not fixture-readable: route token, source descriptor inventory, action results, movement decisions, rail snapshots, grass instances, cloud cache, cloud drift, and render host state need additive source-owned records exposed through `CozyIslandHost.getState()`.

## Next safe ledge

```txt
MyCozyIsland Host Readback Central Sync + Browser Consumer Fixture Gate
```

## Validation status

```txt
runtime source changed: no
local checkout: no
npm install: no
npm start: no
npm run check: no, no check script exists yet
browser smoke: no
fixture run: no, fixture does not exist yet
branch created: no
pull request created: no
pushed to main: yes
```
