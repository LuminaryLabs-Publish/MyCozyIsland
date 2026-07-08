# Architecture Audit: Domain Service Breakdown

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T02:09:17-04:00`

## Current architecture

```txt
MyCozyIsland
├─ app shell
│  ├─ index.html
│  ├─ canvas#game
│  ├─ cloud-loader
│  └─ error-panel
├─ module entry
│  └─ src/main-cloudform.js?v=hero-cloud-3
├─ local source kits
│  ├─ ocean-island-landform-domain
│  ├─ island-foliage-domain
│  ├─ ocean-floor-domain
│  ├─ grass-object-domain
│  ├─ grass-wind-domain
│  ├─ campfire-object-domain
│  ├─ smoke-particle-domain
│  ├─ fenced-clearing-domain
│  ├─ mattatz-clouds-domain
│  └─ cozy-hero-cloud-form-kit
├─ inline render adapters
│  ├─ terrainMesh
│  ├─ floorMesh
│  ├─ waterMesh
│  ├─ foamMesh
│  ├─ pathMesh
│  ├─ objGroup
│  ├─ fenceGroup
│  ├─ campfireMesh
│  ├─ smokeMesh
│  ├─ updateSmoke
│  ├─ grassMesh
│  ├─ heroCloudGeometry
│  └─ heroCloudGroup
├─ inline interaction runtime
│  ├─ scroll-progress
│  ├─ pointer-look
│  ├─ keyboard-movement
│  ├─ first-person-threshold
│  ├─ clearing-boundary
│  └─ campfire-keepout
└─ inline diagnostics
   └─ globalThis.CozyIsland
```

## Domain map

```txt
static-browser-shell
module-entry-route
active-route-version-authority
three-cdn-runtime
renderer-host
scene-source-authority
island-landform-source
heightfield-sampling
mask-sampling
shoreline-contract
terrain-render-adapter
ocean-floor-source
ocean-floor-heightfield
ocean-floor-render-adapter
water-plane-render-adapter
shoreline-foam-render-adapter
path-network-source
path-segment-render-adapter
foliage-object-graph
object-exclusion-policy
grass-placement-contract
grass-static-batch-descriptor
grass-wind-descriptor
grass-instancing-adapter
fenced-clearing-source
player-avatar-anchor
clearing-collision-boundary
clearing-boundary-policy
campfire-keepout-policy
campfire-object-graph
campfire-render-graph
smoke-particle-descriptor
smoke-particle-runtime
mattatz-cloud-source-contract
cozy-hero-cloud-form-source
cozy-hero-cloud-layer-source
cozy-hero-cloud-render-contract
hero-cloud-point-cache
hero-cloud-cache-snapshot
hero-cloud-drift-runtime
scroll-progress-state
camera-rail-sample-curve
camera-rail-snapshot
pointer-look-state
keyboard-input-state
first-person-threshold-gate
legacy-global-cozy-island
host-state-contract
diagnostics-snapshot
action-frame-contract
action-result-contract
action-journal
input-journal
fixture-script
replay-parity-smoke
```

## Service ownership read

```txt
source services:
  belong in local domain kits or promoted reusable kits

render adapter services:
  can remain local until the app stabilizes, but should be named and isolated before more visual complexity lands

interaction services:
  should split into action/result policies so rejection reasons are testable

cloud services:
  should split descriptor, geometry cache, render object, and drift update results

diagnostics services:
  should become additive global host snapshots, not hidden side effects
```

## Correct decomposition direction

```txt
cozy-island-game-host
├─ source-authority
│  ├─ source-profile
│  ├─ source-fingerprint
│  └─ source-snapshot
├─ route-authority
│  ├─ route-version
│  └─ query-token
├─ interaction-authority
│  ├─ action-frame
│  ├─ action-result
│  ├─ movement-policy
│  ├─ clearing-boundary
│  └─ campfire-keepout
├─ rail-authority
│  ├─ rail-state
│  └─ rail-snapshot
├─ cloud-authority
│  ├─ cloud-descriptor-snapshot
│  ├─ cloud-cache-snapshot
│  └─ cloud-drift-result
├─ render-handoff
│  ├─ descriptor-to-three-adapters
│  └─ no new source rules
└─ proof-authority
   ├─ fixture-script
   ├─ replay-parity-smoke
   └─ host-diagnostics
```

## Architecture rule

The publish repo should keep app-specific composition and proof.

Reusable cloud, terrain, grass, and host systems should be promoted only when the local API shape is small, deterministic, and proven by fixtures.
