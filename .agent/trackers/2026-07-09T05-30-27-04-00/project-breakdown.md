# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-30-27-04-00`

## Selection summary

The full accessible `LuminaryLabs-Publish` repo list was compared against central tracking in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry repo was new, ledger-absent, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`TheCavalryOfRome` was excluded by rule.

`MyCozyIsland` was selected as the oldest eligible central fallback.

## Repos observed

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T04-30-54-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T02-50-39-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T03-29-29-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T04-50-00-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T03-10-05-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T05-11-22-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T03-50-12-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / oldest eligible central fallback / previous central latest 2026-07-09T02-31-41-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T05-20-42-04-00
```

## Interaction loop

```txt
static browser route
  -> load ./src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN
  -> import local source-domain kits
  -> create island/floor/clearing/foliage/fire/smoke/grass/cloud descriptors
  -> create renderer, scene, camera, lights, terrain, floor, sea, foam, path, foliage, fence, campfire, smoke, grass, clouds
  -> install resize, keyboard, wheel, pointer input
  -> wheel mutates progress
  -> pointer mutates yaw/pitch based on progress window
  -> rail camera runs before first-person threshold
  -> WASD movement runs after progress >= 0.985
  -> movement validity checks clearing radius and campfire keepout
  -> frame mutates sea, smoke, flame, clouds, camera, player state
  -> renderer renders scene
  -> legacy globalThis.CozyIsland exposes cloud diagnostics
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
planned-host-proof-domain
planned-browser-consumer-fixture-domain
```

## Services that kits offer

```txt
island source construction
island height sampling
island mask sampling
heightfield render contract generation
ocean floor source and render contract generation
foliage object graph generation
path network generation
fenced clearing graph generation
player anchor extraction
collision boundary and exclusion zone publication
campfire graph generation
smoke particle descriptor generation
grass wind descriptor generation
grass patch placement contract generation
grass instanced render projection
mattatz cloud source state generation
cloud render contract generation
hero cloud geometry cache generation
cloud shader material projection
cloud drift frame update
keyboard/wheel/pointer input consumption
camera rail sampling
first-person movement integration
movement validity check
render frame submission
legacy host diagnostic exposure
planned host snapshot and fixture validation
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
```

## Main finding

The current route is visually stable and already composed from local source-domain kits, but the browser consumer remains unproven. The next implementation should add an additive host-proof layer rather than rewriting visuals.

## Next safe ledge

```txt
MyCozyIsland Host Proof Consumer Freeze + Cloud/Grass Fixture Readback Gate
```

## Required files next

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

## Validation status

```txt
runtime source changed: no
local validation run: no
branch created: no
pull request created: no
pushed to main: yes
```
