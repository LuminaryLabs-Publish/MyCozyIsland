# MyCozyIsland Project Breakdown

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-11-08-04-00`

## Selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry repo was new, absent from the central ledger, undocumented, recently added but undocumented, missing sampled root `.agent/START_HERE.md` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the oldest eligible fallback pointer among the current checked central ledger set. The repo already has root `.agent` state, but the useful next work is still unresolved: add fixture-readable host-state proof around the current route rather than changing the visual scene.

## Publish repositories checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T09-50-00-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T10-10-32-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T08-50-00-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T10-40-00-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T10-50-00-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / tracked / root .agent present / oldest eligible fallback pointer
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T09-36-24-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T10-29-02-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T09-10-50-04-00
```

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island route.

It loads `./src/main-cloudform.js?v=hero-cloud-4` from `index.html`, imports Three.js from CDN, and composes local source-domain kits under `src/kits/` into a browser scene.

The implementation still keeps route source construction, render adapters, input state, camera rail, movement policy, grass instancing, cloud geometry caching, cloud drift, and legacy diagnostics inline in `src/main-cloudform.js`.

## Interaction loop

```txt
index.html
  -> canvas#game, #cloud-loader, and #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN import
  -> local domain-kit imports
  -> construct island, ocean floor, foliage, clearing, campfire, smoke, grass, wind, and cloud descriptors
  -> create renderer, scene, camera, lights, fog, water, terrain, floor, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud clouds
  -> install resize, keyboard, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates scroll progress directly
  -> rail camera runs while progress < 0.985
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing boundary and campfire keepout
  -> frame updates sea bob, first-person movement or rail camera, smoke, flame, cloud drift, flame scale, and renderer
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

## Services offered by current and target kits

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
planned source profile and fingerprint readback
planned scene source snapshot
planned input action frame and journal
planned movement policy result
planned rail camera snapshot
planned grass placement and instance snapshots
planned hero-cloud descriptor/cache snapshots
planned cloud drift result
planned render host snapshot
planned additive CozyIslandHost.getState()
planned DOM-free browser consumer fixture
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

`MyCozyIsland` should not get a visual rewrite next.

The durable gap is host proof: the live browser route has descriptor contracts and visible systems, but no fixture-readable source profile, no stable source fingerprint, no route token readback, no movement/action result rows, no grass/cloud/render readback snapshots, and no additive `globalThis.CozyIslandHost.getState()`.

## Next safe ledge

```txt
MyCozyIsland Host Proof Ledger Parity + Browser Consumer Fixture Gate
```

## Validation

```txt
runtime source changed: no
repo-local .agent docs updated: yes
new tracker entry added: yes
new turn-ledger entry added: yes
architecture audit added: yes
render audit added: yes
interaction audit added: yes
cloud-system audit added: yes
grass-system audit added: yes
host-proof audit added: yes
deploy audit added: yes
central ledger update required: yes
central change log required: yes
branch created: no
pull request created: no
pushed to main: yes
```