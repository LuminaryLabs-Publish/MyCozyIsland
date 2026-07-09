# Architecture Audit: Host Proof Ledger Parity DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-11-08-04-00`

## Summary

`MyCozyIsland` is already composed from local descriptor kits, but the browser route still lacks a source-owned readback layer.

The next architecture pass should add small host-proof modules and fixture rows, not rewrite `src/main-cloudform.js` wholesale.

## Source read

```txt
index.html
  owns canvas, cloud loader, error panel, and route script token ./src/main-cloudform.js?v=hero-cloud-4

src/main-cloudform.js
  imports Three.js from CDN
  imports local source-domain kits
  builds descriptors for landform, ocean floor, foliage, clearing, grass, wind, campfire, smoke, and clouds
  projects descriptors into Three.js meshes and point clouds
  owns input state, camera rail, first-person handoff, movement validity, animation frame updates, and legacy diagnostics
```

## Domain map

```txt
route/source layer:
  static-browser-route-domain
  route-token-domain
  loading-status-domain
  error-panel-domain
  source-profile-domain target
  source-fingerprint-domain target
  scene-source-snapshot-domain target

world descriptor layer:
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

render consumption layer:
  three-render-host-domain
  scene-composition-domain
  terrain-render-domain
  ocean-floor-render-domain
  water-plane-domain
  shoreline-foam-render-domain
  path-render-domain
  foliage-render-domain
  fence-render-domain
  campfire-render-domain
  smoke-render-domain
  grass-instanced-render-domain
  hero-cloud-point-render-domain
  render-host-snapshot-domain target

interaction/movement layer:
  input-state-domain
  scroll-progress-domain
  pointer-look-domain
  browser-input-action-frame-domain target
  action-result-domain target
  input-journal-domain target
  first-person-movement-domain
  movement-validity-domain
  movement-policy-result-domain target
  camera-rail-domain
  camera-rail-snapshot-domain target

cloud/grass proof layer:
  hero-cloud-geometry-cache-domain
  cloud-drift-domain
  hero-cloud-descriptor-snapshot-domain target
  hero-cloud-cache-snapshot-domain target
  cloud-drift-result-domain target
  grass-placement-snapshot-domain target
  grass-instance-snapshot-domain target

host/fixture layer:
  legacy-host-diagnostics-domain
  cozy-island-host-state-domain target
  browser-consumer-fixture-domain target
  central-ledger-sync-domain
```

## Current kits

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

## Next-cut DSKs

```txt
route-token-readback-kit:
  read index route token and expose hero-cloud-4 as a stable fact

source-profile-kit:
  record route, source file, CDN dependency, local kit list, and descriptor IDs

source-fingerprint-kit:
  produce deterministic source facts without browser globals

scene-source-snapshot-kit:
  summarize island/floor/clearing/grass/smoke/cloud descriptor counts

browser-input-action-frame-kit:
  normalize wheel, pointer, keydown, keyup, and frame actions

action-result-kit:
  classify accepted/rejected/skipped input effects

input-journal-kit:
  keep a bounded fixture-readable event list

movement-policy-result-kit:
  expose accepted, outside-clearing rejection, and campfire-keepout rejection

camera-rail-snapshot-kit:
  expose rail mode, progress, eased progress, eye, look, and handoff state

grass-placement-snapshot-kit:
  expose requested patch count, accepted patch count, seed, and exclusion summary

grass-instance-snapshot-kit:
  expose InstancedMesh instance count and placement parity

hero-cloud-descriptor-snapshot-kit:
  expose descriptor count, point counts, opacity, scale, and drift facts

hero-cloud-cache-snapshot-kit:
  expose cloud cache keys and geometry point counts

cloud-drift-result-kit:
  expose frame drift deltas without relying only on mutated Three.js objects

render-host-snapshot-kit:
  expose renderer/camera/scene/material/count facts

cozy-island-host-snapshot-kit:
  attach additive globalThis.CozyIslandHost.getState()

browser-consumer-fixture-kit:
  run DOM-free proof rows for route, source, movement, rail, grass, cloud, and render snapshots

central-ledger-readback-kit:
  keep repo-local tracker and LuminaryLabs central ledger pointers synchronized
```

## Do not extract yet

```txt
whole renderer
full scene composer
cloud renderer replacement
grass renderer replacement
new island art pass
camera rail retune
legacy CozyIsland removal
```

## Next safe ledge

```txt
MyCozyIsland Host Proof Ledger Parity + Browser Consumer Fixture Gate
```