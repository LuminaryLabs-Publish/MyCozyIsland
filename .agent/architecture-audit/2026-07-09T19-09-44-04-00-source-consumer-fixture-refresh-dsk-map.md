# Architecture Audit: Source Consumer Fixture Refresh DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T19-09-44-04-00`

## DSK read

`MyCozyIsland` has a useful descriptor layer, but the browser entry file is still the authority for source consumption, input, camera, movement, animation, and diagnostics.

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> source-domain descriptors
  -> Three.js adapters
  -> browser input/camera/movement/frame loop
  -> globalThis.CozyIsland legacy readback
```

## Domains

```txt
route shell: index.html, canvas, loader, error panel, route token
source descriptors: island, floor, foliage, clearing, campfire, smoke, grass, cloud
render consumers: terrain, floor, sea, foam, path, foliage, fence, campfire, smoke, grass, clouds
interaction consumers: keyboard, wheel, pointer, player pose, movement validity
camera consumers: rail curve, first-person eye/look vectors, progress thresholds
animation consumers: sea bob, smoke particles, flame scale, cloud drift
host diagnostics: legacy CozyIsland object
proof next: source profile, fingerprints, snapshots, result rows, render-consumption ledger, host snapshot, fixture
```

## Services

```txt
source kits emit deterministic descriptors and graphs
main-cloudform adapts descriptors into Three.js objects
browser handlers mutate runtime state directly
valid(next) applies clearing boundary and campfire keepout without result records
heroCloudGeometry caches geometry by cloud id only
frame loop submits renderer output without source-consumption rows
legacy diagnostics expose live cloud geometry rather than serializable proof state
```

## Current kits

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
cozy-three-render-host-kit
cozy-camera-rail-kit
cozy-first-person-movement-kit
cozy-render-frame-loop-kit
cozy-legacy-host-diagnostics-kit
```

## Required next kits

```txt
source-profile-kit
source-fingerprint-kit
scene-source-snapshot-kit
browser-input-action-frame-kit
input-result-kit
movement-policy-result-kit
camera-rail-snapshot-kit
grass-placement-snapshot-kit
grass-instance-snapshot-kit
hero-cloud-cache-snapshot-kit
cloud-drift-result-kit
render-consumption-ledger-kit
cozy-island-host-snapshot-kit
browser-consumer-fixture-kit
```

## Conclusion

Keep the route and visuals stable. The next architecture ledge is to source-own proof records around the existing consumer behavior, then expose serializable additive host readback.