# Current Audit: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Audit timestamp:** `2026-07-09T17-48-20-04-00`

## Summary

`MyCozyIsland` is a standalone static Three.js scene whose source-domain descriptors are more modular than its browser consumer.

The active route already separates island landform, ocean floor, foliage, grass, clearing, campfire, smoke, and cloud source contracts. The main architectural gap is that `src/main-cloudform.js` directly owns all renderer adapters, browser input mutation, camera policy, movement acceptance, frame animation, and host diagnostics without normalized result or parity records.

## Selection result

```txt
No eligible non-Cavalry Publish repo was new, ledger-absent, missing root .agent state, recently added but undocumented, or otherwise undocumented.
MyCozyIsland had the oldest eligible central ledger timestamp and repo-local audit state newer than central tracking.
TheCavalryOfRome remains excluded.
```

## Current interaction loop

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> import Nine source-domain kits plus Three.js CDN
  -> create source states, object graphs, and render contracts
  -> adapt contracts into terrain, floor, water, shoreline, path, foliage, fence, campfire, smoke, grass, and cloud Three.js objects
  -> install resize, keyboard, wheel, pointer-down/up/move handlers
  -> wheel changes progress
  -> pointer changes yaw/pitch according to progress thresholds
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
route-script-token
loader-progress-projection
error-projection
three-module-import
three-render-host
scene-composition
resize-consumer
render-frame
legacy-host-diagnostics
```

### World source domains

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

### Proof and ledger domains

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
ocean-island-landform-domain:
  create normalized island state
  sample deterministic height
  sample water/beach/grass/rock/cliff/foam masks
  create heightfield and shoreline render contract

island-foliage-domain:
  create deterministic path network
  create dense procedural object graph
  create render contract for objects and paths

ocean-floor-domain:
  create ocean-floor state
  sample deterministic floor height
  create heightfield
  create reef/coral/rock/boulder placements
  create render contract and water material descriptor

grass-object-domain:
  create path/exclusion-aware patch placements
  create static batch descriptors

grass-wind-domain:
  normalize wind direction and emit sway/gust descriptor

fenced-clearing-domain:
  create fence posts, player anchor, collision boundary, clearance zones, and object-exclusion zones

campfire-object-domain:
  create campfire graph, child objects, collision, flame/smoke/light descriptors, and root object projection

smoke-particle-domain:
  create normalized smoke emitter descriptor with wind response

cozy-hero-cloud-form-kit:
  create hero cloud form, layer, and render contracts

mattatz-clouds-domain:
  create cloud state and wrap the hero cloud contract as the active cloud render contract

main-cloudform runtime:
  adapt source descriptors into Three.js objects
  own browser input, camera, movement, animation, render submission, and legacy diagnostics
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

## Main finding

The next cut should be an additive proof layer, not a visual rewrite. Source fingerprints, input/movement result rows, deterministic camera samples, grass/cloud parity snapshots, render-consumption records, and a serializable `globalThis.CozyIslandHost.getState()` surface should be fixture-proven while preserving `globalThis.CozyIsland` compatibility.