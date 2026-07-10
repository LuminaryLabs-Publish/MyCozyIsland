# Current Audit: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Audit timestamp:** `2026-07-09T23-41-15-04-00`

## Summary

`MyCozyIsland` is a standalone static Three.js scene with modular source-domain descriptors and a monolithic browser consumer.

The active route separates island landform, ocean floor, foliage, grass, clearing, campfire, smoke, and cloud source contracts. The current gap is that `src/main-cloudform.js` directly owns renderer adapters, browser input mutation, camera policy, movement acceptance, frame animation, render submission, and host diagnostics without normalized result or parity records.

## Current interaction loop

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> import nine source-domain kits plus Three.js CDN
  -> create source states, object graphs, and render contracts
  -> adapt contracts into terrain, floor, water, shoreline, path, foliage, fence, campfire, smoke, grass, and cloud Three.js objects
  -> install resize, keyboard, wheel, pointer-down/up/move handlers
  -> wheel changes progress
  -> pointer changes yaw while progress < 0.85
  -> pointer has no explicit result in the transition band before first person
  -> pointer changes yaw/pitch when progress >= 0.985
  -> camera rail runs below progress 0.985
  -> WASD first-person movement runs at or above progress 0.985
  -> clearing radius and campfire keepout silently accept/reject movement
  -> frame updates sea, smoke, flame, cloud drift, camera, and renderer
  -> globalThis.CozyIsland exposes limited legacy diagnostics
```

## Domains in use

### Route and host domains

```txt
static-route-shell
canvas-route-host
cloud-loader-projection
error-projection
route-script-token
three-module-import
three-render-host
scene-composition
resize-consumer
render-frame-loop
legacy-host-diagnostics
```

### Source domains

```txt
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
hero-cloud-layer-descriptor
hero-cloud-render-contract
```

### Runtime consumer domains

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

### Proof domains

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

```txt
ocean-island-landform-domain: island state, height sampling, masks, heightfield and shoreline render contracts
island-foliage-domain: path network, dense object graph, render contract
ocean-floor-domain: floor state, height sampling, heightfield, reef/coral/rock/boulder placements, render contract, water material
grass-object-domain: path/exclusion-aware patch placements and static batch descriptors
grass-wind-domain: normalized wind/sway/gust descriptor
fenced-clearing-domain: fence posts, player anchor, collision boundary, clearance zones, object exclusions
campfire-object-domain: campfire graph, collision, flame, smoke anchor, light descriptors
smoke-particle-domain: normalized smoke emitter descriptor with wind response
cozy-hero-cloud-form-kit: cloud form, layer, and render contracts
mattatz-clouds-domain: cloud state and active hero-cloud render contract
main-cloudform runtime: descriptor adaptation, browser input, camera, movement, animation, render submission, legacy diagnostics
```

## Kit inventory

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

## Current finding

The next useful step is host/source proof, not a scene rewrite. Add fixture-readable records around the existing descriptors and consumers before changing visuals, cloud generation, grass rendering, or camera tuning.
