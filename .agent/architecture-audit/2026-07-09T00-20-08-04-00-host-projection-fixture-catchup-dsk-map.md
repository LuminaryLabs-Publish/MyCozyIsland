# Architecture Audit: Host Projection Fixture Catch-up DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T00-20-08-04-00`

## Summary

`MyCozyIsland` already has a useful local DSK surface. The source-domain kits produce island, ocean, foliage, grass, wind, clearing, campfire, smoke, and cloud descriptors, but `src/main-cloudform.js` consumes them immediately into Three.js objects and browser globals.

The next architecture cut should add a host-proof layer beside the current route, not replace the route.

## Current composition

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> local source-domain kits
  -> inline Three.js consumer adapters
  -> input handlers
  -> frame loop
  -> globalThis.CozyIsland
```

## Implemented explicit DSKs

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

## Runtime-implied kits

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
cozy-smoke-runtime-kit
cozy-grass-instancing-kit
cozy-hero-cloud-point-render-kit
cozy-hero-cloud-cache-kit
cozy-hero-cloud-drift-kit
cozy-scroll-camera-rail-kit
cozy-pointer-look-kit
cozy-keyboard-movement-kit
cozy-clearing-boundary-policy-kit
cozy-campfire-keepout-policy-kit
cozy-legacy-global-host-kit
```

## Needed host-proof kits

```txt
cozy-route-version-result-kit
cozy-source-profile-kit
cozy-source-fingerprint-kit
cozy-scene-source-snapshot-kit
cozy-browser-input-action-frame-kit
cozy-action-result-kit
cozy-input-journal-kit
cozy-movement-policy-result-kit
cozy-camera-rail-snapshot-kit
cozy-grass-instance-snapshot-kit
cozy-hero-cloud-descriptor-snapshot-kit
cozy-hero-cloud-cache-snapshot-kit
cozy-cloud-drift-result-kit
cozy-render-host-snapshot-kit
cozy-island-host-state-kit
cozy-browser-consumer-fixture-kit
```

## Domain split

```txt
source domains:
  route version, island landform, ocean floor, foliage, path network, grass placement, grass wind, fenced clearing, campfire, smoke particle, mattatz cloud, hero cloud form

consumer domains:
  terrain mesh, floor mesh, water mesh, foam mesh, path mesh, foliage mesh, fence mesh, fire mesh, smoke points, grass instanced mesh, hero cloud point cloud

input domains:
  wheel progress, pointer look, keyboard movement, first-person unlock threshold

policy domains:
  clearing boundary, campfire keepout, movement accept/reject

projection domains:
  route result, source profile, source fingerprint, source snapshot, action result, movement result, rail snapshot, grass snapshot, cloud snapshot, render snapshot, host state snapshot
```

## Architectural finding

The next implementation should add pure `src/host-proof/` modules first, prove them with a DOM-free fixture, then splice records into `src/main-cloudform.js` additively.

Do not extract the renderer or promote shared kits until host-proof rows pass.