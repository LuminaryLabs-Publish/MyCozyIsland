# Project breakdown: My Cozy Island

Timestamp: `2026-07-10T01-04-36-04-00`

## Selection

Selected repo: `LuminaryLabs-Publish/MyCozyIsland`

Reason: the current public `LuminaryLabs-Publish` page was checked and showed 9 repositories. `TheCavalryOfRome` stayed excluded. No checked public non-Cavalry repository was new, missing from the central ledger, missing root `.agent` state, recently added but undocumented, or otherwise undocumented. `MyCozyIsland` was the oldest eligible documented fallback by central ledger timestamp.

## Current interaction loop

```txt
index.html
  -> canvas#game, #cloud-loader, #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js 0.160.0 from CDN
  -> import ocean island, foliage, ocean floor, grass, wind, campfire, smoke, clearing, and cloud source kits
  -> create deterministic island, ocean floor, foliage graph, clearing graph, campfire graph, smoke descriptor, grass placement, grass wind, and cloud render contract
  -> adapt descriptors into terrain, floor, water, foam, path, foliage, fence, campfire, smoke, grass InstancedMesh, and hero cloud point objects
  -> install resize, keydown, keyup, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates normalized progress directly
  -> pointer mutates yaw while progress < 0.85
  -> pointer is an implicit no-op in 0.85 <= progress < 0.985
  -> pointer mutates yaw/pitch while progress >= 0.985
  -> rail camera samples sky-to-eye curve while progress < 0.985
  -> WASD first-person movement runs while progress >= 0.985
  -> valid(next) silently accepts or rejects movement by clearing radius and 2.35 campfire keepout
  -> frame updates sea bob, smoke, flame, cloud drift, camera, and renderer
  -> globalThis.CozyIsland exposes cloudContract, live cloudPointCache, and getScrollProgress
```

## Domains in use

```txt
static-route-shell
canvas-route-host
cloud-loader-projection
error-projection
route-script-token
three-cdn-runtime
three-render-host
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
source-consumer-proof-next
input-result-fixture-next
render-consumption-ledger-next
cozy-island-host-readback-next
central-ledger-sync
```

## Services that kits offer

```txt
ocean-island-landform-domain: island state, height sampling, mask sampling, heightfield contract, shoreline contract
island-foliage-domain: path network, dense object graph, foliage render contract
ocean-floor-domain: floor state, height sampling, heightfield, reef/coral/rock/boulder placements, water material
grass-object-domain: path/exclusion-aware patch placement and static batch descriptors
grass-wind-domain: normalized wind/sway/gust descriptor
fenced-clearing-domain: fence posts, player anchor, collision radius, campfire radius, clearance and exclusion zones
campfire-object-domain: campfire graph, collision, flame, smoke anchor, light descriptors
smoke-particle-domain: smoke emitter, particle count, lifespan, rise, turbulence, wind response
mattatz-clouds-domain: cloud state and active hero-cloud render contract
cozy-hero-cloud-form-kit: cloud form, layer, silhouette, point-cloud, placement, and drift contract
main-cloudform runtime: descriptor adaptation, browser input, camera rail, movement policy, smoke/cloud animation, render submission, legacy diagnostics
planned proof services: route token readback, source fingerprint, input result rows, movement results, grass/cloud parity, render ledger, serializable CozyIslandHost snapshot, DOM-free fixture
```

## Kits identified

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

Next-cut kits:

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

`MyCozyIsland` should not get a visual rewrite next. The route already has useful source-domain kits, but `src/main-cloudform.js` still owns the renderer adapters, input mutation, rail camera, movement validity, smoke/cloud animation, render loop, and legacy diagnostics inline.

The missing layer is source/consumer proof: route token, source fingerprints, input and movement result rows, camera rail snapshots, grass placement-to-instance parity, cloud descriptor/cache/drift parity, render consumption rows, and a serializable additive `CozyIslandHost` readback surface.

## Next safe ledge

```txt
MyCozyIsland Source Consumer Host Readback Catch-up + Input Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: unavailable
browser smoke: not run
DOM-free source/consumer fixture: not run because proof files do not exist yet
pushed to main: yes, documentation only
```
