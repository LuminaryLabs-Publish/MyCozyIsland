# Project Breakdown: MyCozyIsland

**Timestamp:** `2026-07-10T01-11-51-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Selected ledge:** `MyCozyIsland Source Consumer Host Readback Catch-up + Input Fixture Gate`

## Selection

The current public `LuminaryLabs-Publish` repository list was checked against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state.

No checked non-Cavalry repo was new, missing from the central ledger, missing root `.agent`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` stayed excluded.

`MyCozyIsland` was selected because it was the oldest eligible documented fallback in the central ledger and had repo-local `.agent` state ahead of central tracking.

## Current public Publish repo set

```txt
PrehistoricRush
TheOpenAbove
MyCozyIsland
TheUnmappedHouse
ZombieOrchard
IntoTheMeadow
PhantomCommand
HorrorCorridor
TheCavalryOfRome  excluded by rule
```

## Current interaction loop

```txt
index.html
  -> canvas#game, #cloud-loader, and #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js 0.160.0 CDN import
  -> local source-domain kit imports
  -> create island, ocean floor, foliage, clearing, campfire, smoke, grass, wind, and cloud descriptors
  -> adapt descriptors into Three.js terrain, floor, water, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud clouds
  -> install resize, keydown, keyup, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates normalized progress directly
  -> pointer mutates yaw while progress < 0.85
  -> pointer is an implicit no-op while 0.85 <= progress < 0.985
  -> pointer mutates yaw/pitch while progress >= 0.985
  -> rail camera samples sky-to-eye CatmullRom curves while progress < 0.985
  -> WASD first-person movement unlocks while progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing radius and 2.35 campfire keepout
  -> frame updates sea bob, smoke, flame, cloud drift, camera, and renderer
  -> globalThis.CozyIsland exposes cloudContract, live cloud geometry cache, and getScrollProgress
```

## Domains in use

```txt
static-route-shell
canvas-route-host
cloud-loader-projection
error-projection
route-script-token
three-cdn-import
three-render-host
scene-composition
source-descriptor-composition
island-landform-state
island-height-sampling
island-mask-sampling
island-heightfield-contract
shoreline-contract
ocean-floor-state
ocean-floor-height-sampling
ocean-floor-heightfield
ocean-floor-object-placement
ocean-water-material
island-path-network
foliage-object-graph
fenced-clearing-object-graph
clearing-collision-boundary
campfire-object-graph
smoke-particle-descriptor
grass-wind-descriptor
grass-placement-contract
grass-batch-descriptor
mattatz-cloud-state
hero-cloud-form-descriptor
hero-cloud-render-contract
terrain-mesh-adapter
ocean-floor-mesh-adapter
water-plane-adapter
shoreline-foam-adapter
path-mesh-adapter
foliage-mesh-adapter
fence-mesh-adapter
campfire-mesh-adapter
smoke-particle-adapter
smoke-frame-simulation
grass-instanced-mesh-adapter
hero-cloud-point-generation
hero-cloud-geometry-cache
cloud-shader-material
cloud-drift-frame
keyboard-input
wheel-progress-input
pointer-drag-input
player-pose
camera-rail
first-person-movement
movement-validity
render-frame-loop
legacy-host-diagnostics
route-token-readback-next
source-profile-next
source-fingerprint-next
scene-source-snapshot-next
input-result-next
movement-policy-result-next
camera-rail-snapshot-next
grass-placement-snapshot-next
grass-instance-snapshot-next
cloud-descriptor-snapshot-next
cloud-cache-snapshot-next
cloud-drift-result-next
render-consumption-ledger-next
cozy-island-host-snapshot-next
browser-consumer-fixture-next
central-ledger-sync
```

## Kit services

```txt
ocean-island-landform-domain: island state, height sampling, masks, heightfield contract, shoreline contract
island-foliage-domain: path network, dense object graph, render contract
ocean-floor-domain: floor state, height sampling, heightfield, object placement, water material
grass-object-domain: path and exclusion-aware patch placements plus static batch descriptors
grass-wind-domain: wind, sway, gust descriptor
fenced-clearing-domain: fence posts, player anchor, collision boundary, clearance zones, exclusions
campfire-object-domain: campfire graph, collision, flame, smoke anchor, light descriptors
smoke-particle-domain: smoke emitter, particle count, lifespan, rise, turbulence, wind response
mattatz-clouds-domain: cloud state and hero-cloud render contract
cozy-hero-cloud-form-kit: cloud form, layer, silhouette, point-cloud, placement, drift contract
main-cloudform runtime: descriptor adaptation, browser input, camera, movement, animation, render submission, legacy diagnostics
planned proof services: route token readback, source fingerprints, input/movement result rows, grass/cloud parity, render ledger, serializable CozyIslandHost, DOM-free fixture, central ledger readback
```

## Kits

Current explicit kits:

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
cozy-hero-cloud-form-kit
```

Runtime-implied kits:

```txt
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
```

Next-cut proof kits:

```txt
route-token-readback-kit
source-profile-kit
source-fingerprint-kit
scene-source-snapshot-kit
browser-input-action-frame-kit
input-result-kit
input-result-journal-kit
movement-policy-result-kit
camera-rail-snapshot-kit
grass-placement-snapshot-kit
grass-instance-snapshot-kit
hero-cloud-descriptor-snapshot-kit
hero-cloud-cache-snapshot-kit
cloud-drift-result-kit
render-consumption-ledger-kit
render-host-snapshot-kit
cozy-island-host-snapshot-kit
browser-consumer-fixture-kit
central-ledger-readback-kit
```

## Main finding

`MyCozyIsland` should not get a visual rewrite next.

The route already has useful source-domain kits. The blocker is proof: `src/main-cloudform.js` still owns render adapters, browser input mutation, camera rail, movement validity, grass instancing, cloud cache/drift, frame rendering, and legacy diagnostics inline.

The next cut should create source fingerprints, input and movement result rows, camera rail snapshots, grass placement-to-instance parity, cloud descriptor/cache/drift parity, render consumption rows, and a serializable additive `CozyIslandHost` readback surface.

## Next safe ledge

```txt
MyCozyIsland Source Consumer Host Readback Catch-up + Input Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm install: not run
npm start: not run
npm run check: unavailable
browser smoke: not run
DOM-free source/consumer fixture: not run because proof files do not exist yet
pushed to main: yes, documentation only
```
