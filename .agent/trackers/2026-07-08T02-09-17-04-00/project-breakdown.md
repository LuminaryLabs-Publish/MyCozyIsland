# Project Breakdown: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T02:09:17-04:00`

## Selection

Selected because the central `LuminaryLabs-Dev/LuminaryLabs` ledger documented `MyCozyIsland`, but the publish repo itself was missing root `.agent/START_HERE.md` when checked.

This run corrected that repo-local state gap.

## Interaction loop

```txt
index.html
  -> canvas#game
  -> cloud loader and error panel
  -> src/main-cloudform.js?v=hero-cloud-3
  -> Three.js CDN
  -> local source kits
  -> source/render contract construction
  -> inline Three.js render adapters
  -> wheel scroll camera rail
  -> pointer drag look/yaw
  -> keyboard first-person movement after threshold
  -> clearing/campfire movement policy
  -> smoke, campfire, cloud drift, camera, and movement frame loop
  -> globalThis.CozyIsland diagnostics compatibility
```

## Domains identified

```txt
static-browser-shell
module-entry-route
route-version-authority
three-cdn-runtime
renderer-host
scene-source-authority
island-landform-source
heightfield-sampling
mask-sampling
shoreline-contract
terrain-render-adapter
ocean-floor-source
ocean-floor-render-adapter
water-plane-render-adapter
shoreline-foam-render-adapter
path-network-source
path-render-adapter
foliage-object-graph
foliage-render-adapter
grass-placement-contract
grass-wind-descriptor
grass-instancing-adapter
fenced-clearing-source
player-avatar-anchor
clearing-boundary-policy
campfire-keepout-policy
campfire-object-graph
campfire-render-adapter
smoke-particle-descriptor
smoke-particle-runtime
mattatz-cloud-source-contract
cozy-hero-cloud-form-source
hero-cloud-point-cache
hero-cloud-drift-runtime
scroll-progress-state
camera-rail-sampler
pointer-look-state
keyboard-input-state
first-person-threshold-gate
legacy-global-cozy-island
host-action-fixture-gate
```

## Services identified

```txt
create island landform state
sample island heights
sample island masks
create island heightfield render contract
create shoreline render contract
create path network
create dense foliage/object graph
create ocean floor state
create ocean floor render contract
create grass placement contract
create grass wind descriptor
create fenced clearing graph
create campfire object graph
create smoke particle descriptor
create Mattatz cloud state
create Mattatz cloud render contract
create cozy hero cloud form/layer/point descriptor
adapt terrain contract to Three.js mesh
adapt ocean floor contract to Three.js mesh
adapt shoreline contract to foam mesh
adapt path network to mesh strips
adapt object graph to primitive render group
adapt clearing graph to fence render group
adapt campfire graph to render group/light
adapt smoke descriptor to point particle runtime
adapt grass placement to instanced mesh
adapt hero cloud descriptors to cached point cloud geometry
animate smoke
animate cloud drift
animate campfire flame/light
sample scroll camera rail
process pointer look
process keyboard movement
apply clearing/campfire movement policy
expose limited diagnostics on globalThis.CozyIsland
```

## Kits identified

```txt
implemented local kits:
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
  cozy-smoke-runtime-kit
  cozy-grass-instancing-kit
  cozy-hero-cloud-point-render-kit
  cozy-hero-cloud-cache-kit
  cozy-hero-cloud-drift-kit
  cozy-scroll-camera-rail-kit
  cozy-pointer-look-kit
  cozy-keyboard-movement-kit
  cozy-clearing-boundary-kit
  cozy-campfire-keepout-kit
  cozy-legacy-global-host-kit

next-cut kits:
  cozy-active-route-version-kit
  cozy-source-profile-kit
  cozy-source-fingerprint-kit
  cozy-scene-source-snapshot-kit
  cozy-host-state-contract-kit
  cozy-action-frame-contract-kit
  cozy-action-result-contract-kit
  cozy-action-rejection-reason-kit
  cozy-action-journal-kit
  cozy-input-journal-kit
  cozy-rail-state-kit
  cozy-rail-snapshot-kit
  cozy-movement-policy-result-kit
  cozy-clearing-boundary-result-kit
  cozy-campfire-keepout-result-kit
  cozy-hero-cloud-descriptor-snapshot-kit
  cozy-hero-cloud-cache-snapshot-kit
  cozy-cloud-drift-result-kit
  cozy-gamehost-diagnostics-kit
  cozy-fixture-script-runner-kit
  cozy-replay-parity-smoke-kit
```

## Files added in this repo

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/domain-service-breakdown.md
.agent/render-audit/cloudform-render-audit.md
.agent/cloud-system-audit/hero-cloud-cache-and-drift.md
.agent/interaction-audit/host-action-fixture-gate.md
.agent/kit-registry.json
.agent/turn-ledger/2026-07-08T02-09-17-04-00.md
.agent/trackers/2026-07-08T02-09-17-04-00/project-breakdown.md
```

## Validation status

This was an internal documentation and tracking pass.

No runtime code changed.

No browser/build smoke was run.

## Next safe ledge

Add route-version and host-action fixture proof while preserving the current public route and visuals.
