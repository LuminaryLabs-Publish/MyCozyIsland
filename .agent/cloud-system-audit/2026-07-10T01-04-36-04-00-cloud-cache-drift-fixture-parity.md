# Cloud system audit: cache drift fixture parity

Timestamp: `2026-07-10T01-04-36-04-00`

## Current cloud source

`mattatz-clouds-domain` creates a single hero cloud contract through `cozy-hero-cloud-form-kit`.

Source facts:

```txt
weather: sunrise-haze
cloudCount: 1
sourceKit: cozy-hero-cloud-form-kit
cloud id: cozy-hero-cloud-main
layer id: cozy-hero-cloud-layer
pointCount: 420
lobeCount: 7
position: { x: 0, y: 132, z: -26 }
scale: { x: 360, y: 118, z: 260 }
drift: { x: 0.32, z: 0.05 }
driftSpeed: 0.012
```

## Current cloud consumer

```txt
heroCloudGeometry(cloud)
  -> cache key is cloud.id
  -> creates BufferGeometry with position, size, alpha, tint attributes
  -> stores live geometry in cloudCache

heroCloudGroup(contract)
  -> creates Points per cloud
  -> stores live geometries in group.userData.savedPointClouds
  -> exposes those through globalThis.CozyIsland.cloudPointCache

frame(now)
  -> moves cloud x/z by drift * driftSpeed * dt * 18
  -> moves cloud y by baseY + sin(now * 0.00035) * 3.5
```

## Proof gaps

- Cache key uses only `cloud.id`, not a descriptor fingerprint.
- No cache hit/miss/stale result exists.
- No descriptor-to-point-count parity row exists.
- No fixed-dt drift row exists.
- No serializable cloud cache snapshot exists.
- Legacy diagnostics expose live `BufferGeometry` objects.

## Required next rows

```txt
CloudDescriptorSnapshot
CloudDescriptorFingerprint
CloudCacheResult
CloudGeometryPointParity
CloudDriftResult
CloudHostReadback
LegacyCloudCompatibilityRow
```

## Main finding

Cloud fidelity should wait until cache and drift proof exists. The immediate risk is stale geometry and non-serializable host diagnostics, not the visual shape itself.
