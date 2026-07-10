# MyCozyIsland project breakdown

Timestamp: `2026-07-09T23-41-15-04-00`
Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Selection

The current public `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` ledger. `TheCavalryOfRome` was excluded. No checked non-Cavalry repo was new, central-ledger absent, missing root `.agent` state, recently added but undocumented, or otherwise undocumented. `MyCozyIsland` was selected as the oldest eligible documented fallback by central ledger recency.

## Current route

```txt
index.html
  -> canvas#game, #cloud-loader, #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js 0.160.0 CDN
  -> local source-domain descriptor kits
  -> inline Three.js render adapters
  -> inline browser input, camera rail, movement, animation, and diagnostics
```

## Interaction loop

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js and source-domain kits
  -> create island, ocean floor, foliage, clearing, campfire, smoke, grass, wind, and cloud descriptors
  -> adapt descriptors into terrain, floor, water, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud objects
  -> install resize, keydown, keyup, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates normalized progress directly
  -> pointer mutates yaw while progress < 0.85
  -> pointer does nothing in the transition band 0.85 <= progress < 0.985
  -> pointer mutates yaw/pitch while progress >= 0.985
  -> rail camera samples sky-to-eye CatmullRom curves while progress < 0.985
  -> WASD first-person movement unlocks while progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing radius and 2.35 campfire keepout
  -> frame updates sea bob, smoke, flame, cloud drift, camera, and renderer
  -> globalThis.CozyIsland exposes cloudContract, live cloud geometry cache, and getScrollProgress
```

## Domains in use

### Route and host

```txt
static-route-shell
canvas-route-host
cloud-loader-projection
error-projection
route-script-token
three-cdn-import
three-render-host
scene-composition
resize-consumer
render-frame-loop
legacy-host-diagnostics
```

### Source descriptors

```txt
ocean-island-landform-state
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
```

### Runtime consumers

```txt
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
```

### Proof domains needed next

```txt
route-token-readback
source-profile
source-fingerprint
scene-source-snapshot
browser-input-action-frame
input-result
input-result-journal
movement-policy-result
camera-rail-snapshot
grass-placement-snapshot
grass-instance-snapshot
cloud-descriptor-snapshot
cloud-cache-snapshot
cloud-drift-result
render-consumption-ledger
render-host-snapshot
cozy-island-host-snapshot
browser-consumer-fixture
central-ledger-sync
```

## Kit services

### Current source kit services

```txt
ocean-island-landform-domain: island state, height sampling, mask sampling, heightfield contract, shoreline contract
island-foliage-domain: path network, dense object graph, render contract
ocean-floor-domain: floor state, height sampling, heightfield, reef/coral/rock/boulder placements, water material
grass-object-domain: patch placements, path avoidance, exclusion zones, static batch descriptors
grass-wind-domain: wind, sway, gust descriptor
fenced-clearing-domain: fence posts, player anchor, collision radius, campfire radius, clearance and exclusion zones
campfire-object-domain: campfire graph, collision, flame, smoke anchor, light descriptors
smoke-particle-domain: smoke emitter, particle count, lifespan, rise, turbulence, wind response
mattatz-clouds-domain: cloud state and hero-cloud render contract
cozy-hero-cloud-form-kit: cloud form, layer, silhouette, point-cloud, placement, and drift contract
```

### Current runtime services

```txt
main-cloudform route host
Three.js renderer and scene setup
terrain/floor/water/foam/path/foliage/fence/campfire/smoke/grass/cloud adapters
cloud geometry cache keyed by cloud.id
browser input capture
scroll progress mutation
camera rail sampling
first-person movement integration
movement validity check
frame animation and render submission
legacy globalThis.CozyIsland diagnostics
```

### Needed proof services

```txt
source profile and fingerprint
route token readback
input action frame normalization
accepted/rejected/no-change input result rows
movement policy result rows
camera rail sample rows
grass placement-to-instance parity rows
cloud descriptor/cache/drift result rows
render consumption ledger rows
serializable CozyIslandHost snapshot
DOM-free browser consumer fixture
central ledger readback
```

## All kits

### Explicit source kits

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

### Runtime-implied kits

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

### Next-cut proof kits

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

`MyCozyIsland` does not need a visual rewrite next. It needs source/consumer proof. The active scene already composes meaningful source descriptors, but the browser route still mutates input, movement, camera, render, grass, clouds, and diagnostics inline without stable accepted/rejected/no-change rows or source-to-render parity records.

## Next safe ledge

```txt
MyCozyIsland Host Proof Catch-up + Source/Consumer Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: unavailable
browser smoke: not run
DOM-free fixture: not run because proof files do not exist yet
pushed to main: pending at file creation time
```
