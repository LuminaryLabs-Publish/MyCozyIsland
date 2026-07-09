# Architecture Audit: Host State Ledger Refresh DSK Map

**Timestamp:** `2026-07-09T08-11-12-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Architecture summary

`MyCozyIsland` is already composed from small local source-domain kits, but the browser runtime still collapses source construction, renderer adapter consumption, input mutation, movement validation, camera rail, cloud drift, frame rendering, and host diagnostics into `src/main-cloudform.js`.

The next architecture improvement should not split the renderer first. It should add a stable readback layer that proves what the current route is already doing.

## Current loop

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN import
  -> local source-domain kit imports
  -> source descriptors built inline
  -> Three.js scene and render adapters built inline
  -> browser input mutates inline state
  -> camera rail or first-person mode updates camera
  -> grass/smoke/clouds update by object mutation
  -> renderer.render(scene, camera)
  -> globalThis.CozyIsland legacy diagnostics
```

## Domain map

```txt
route
  static-browser-route-domain
  route-token-domain
  loading-status-domain
  error-panel-domain

source descriptors
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

runtime adapters
  three-render-host-domain
  scene-composition-domain
  terrain-adapter-domain
  floor-adapter-domain
  water-adapter-domain
  foam-adapter-domain
  path-adapter-domain
  foliage-adapter-domain
  fence-adapter-domain
  fire-adapter-domain
  smoke-adapter-domain
  grass-instance-adapter-domain
  point-cloud-adapter-domain

input and camera
  input-state-domain
  scroll-progress-domain
  pointer-look-domain
  camera-rail-domain
  first-person-movement-domain
  movement-validity-domain

frame state
  cloud-drift-domain
  smoke-frame-domain
  flame-frame-domain
  render-frame-domain

host proof next
  route-token-readback-domain
  source-profile-domain
  source-fingerprint-domain
  scene-source-snapshot-domain
  browser-input-action-frame-domain
  action-result-domain
  movement-policy-result-domain
  camera-rail-snapshot-domain
  grass-readback-domain
  cloud-readback-domain
  render-host-snapshot-domain
  cozy-island-host-snapshot-domain
  browser-consumer-fixture-domain
  central-ledger-readback-domain
```

## DSK / kit map

```txt
implemented explicit kits:
  ocean-island-landform-domain
  ocean-floor-domain
  island-foliage-domain
  grass-object-domain
  grass-wind-domain
  fenced-clearing-domain
  campfire-object-domain
  smoke-particle-domain
  mattatz-clouds-domain
  cozy-hero-cloud-form-kit

runtime-implied kits:
  cozy-static-shell-kit
  cozy-route-script-token-kit
  cozy-cloudform-entry-kit
  cozy-three-render-host-kit
  cozy-source-descriptor-composition-kit
  cozy-terrain-render-kit
  cozy-water-render-kit
  cozy-object-graph-render-kit
  cozy-grass-instanced-render-kit
  cozy-cloud-point-cache-kit
  cozy-input-consumer-kit
  cozy-camera-rail-kit
  cozy-first-person-movement-kit
  cozy-frame-loop-kit
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

## Services to preserve

```txt
route loads hero-cloud-4 script token
local source descriptors create island/floor/foliage/grass/wind/clearing/fire/smoke/clouds
renderer consumes descriptors into Three.js objects
wheel controls scroll progress
pointer controls yaw/pitch by current mode
first-person movement unlocks at progress >= 0.985
movement validity checks clearing boundary and campfire keepout
frame loop animates sea, smoke, flame, clouds, and renderer
legacy globalThis.CozyIsland remains present
```

## Services to add next

```txt
route token readback
source profile and fingerprint
scene source snapshot
browser input action frame
accepted/rejected/skipped action result
bounded input journal
movement policy result
camera rail snapshot
first-person handoff snapshot
grass placement and instance summary
hero cloud descriptor/cache summary
cloud drift result
render host snapshot
additive globalThis.CozyIslandHost.getState()
DOM-free fixture rows
central ledger readback row
```

## Main finding

The current architecture is source-kit rich but host-proof poor. The next implementation should stabilize proof boundaries around existing descriptors and frame results before extracting render code or modifying scene fidelity.
