# Current Audit: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Audit timestamp:** `2026-07-09T05-38-20-04-00`

## Summary

`MyCozyIsland` is a stable static Three.js publish route that composes local source-domain kits into a cozy island scene. The current gap is not visual quality; it is proofability and host-state authority.

`src/main-cloudform.js` still owns source descriptor construction, render adapter consumption, input mutation, movement policy, camera rail sampling, grass instancing, hero-cloud geometry caching, cloud drift, frame rendering, and the legacy `globalThis.CozyIsland` diagnostic surface inline.

## Repo selection result

```txt
Checked accessible Publish list:
  IntoTheMeadow
  HorrorCorridor
  AetherVale
  ZombieOrchard
  TheUnmappedHouse
  MyCozyIsland
  TheOpenAbove
  PhantomCommand
  TheCavalryOfRome
  PrehistoricRush

Excluded:
  TheCavalryOfRome

Central/root-agent comparison:
  No checked non-Cavalry repo was fully new, absent from central tracking, undocumented, recently added but undocumented, or missing sampled root .agent/START_HERE.md.

Selected:
  LuminaryLabs-Publish/MyCozyIsland

Reason:
  MyCozyIsland had the oldest central ledger alignment among checked eligible fallback repos and still needs browser-consumer proof for route/source/action/movement/rail/grass/cloud/render/host records.
```

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
planned-host-state-readback-domain
planned-browser-consumer-fixture-domain
central-ledger-sync-domain
```

## Services in use

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

The next cut should not touch the look of the island. It should only add readback and fixture authority around what already exists: route token, source descriptor summaries, input action frames, movement policy decisions, rail camera state, grass placement/instance summaries, cloud descriptor/cache/drift summaries, and render host state.

## Current next safe ledge

```txt
MyCozyIsland Host State Readback Consumer Freeze + Cloud/Grass Fixture Gate
```
