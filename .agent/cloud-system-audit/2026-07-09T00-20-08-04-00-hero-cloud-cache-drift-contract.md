# Cloud System Audit: Hero Cloud Cache + Drift Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T00-20-08-04-00`

## Current cloud source

`mattatz-clouds-domain` delegates to `cozy-hero-cloud-form-kit` and returns one hero cloud render contract.

Current source values:

```txt
weather: sunrise-haze
cloudCount: 1
sourceKit: cozy-hero-cloud-form-kit
hero id: cozy-hero-cloud-main
layer: cozy-hero-cloud-layer
pointCount: 420
lobeCount: 7
position: { x: 0, y: 132, z: -26 }
scale: { x: 360, y: 118, z: 260 }
drift: { x: 0.32, z: 0.05 }
driftSpeed: 0.012
preferred renderer adapter: cached-point-cloud-puff
```

## Current cloud render consumer

```txt
cloudCache: Map keyed by cloud id
heroCloudGeometry(cloud): creates or reuses BufferGeometry
heroCloudGroup(contract): creates Points for each cloud
savedPointClouds: stores generated geometries on group.userData
frame(): mutates cloud x, z, and y bob each frame
```

## Missing proof

```txt
HeroCloudDescriptorSnapshot does not exist.
HeroCloudCacheSnapshot does not exist.
CloudDriftResult does not exist.
No fixture row proves cache hit behavior.
No fixture row proves point counts and savedPointClouds length.
No fixture row records per-frame drift delta without WebGL.
```

## Needed contract

```txt
HeroCloudDescriptorSnapshot:
  contract id
  sourceKit
  cloud count
  layer ids
  point count
  lobe count
  placement
  scale
  drift
  drift speed
  renderer boundary

HeroCloudCacheSnapshot:
  cache key
  point count
  savedPointClouds count
  cache hit/miss
  geometry attribute names

CloudDriftResult:
  cloud id
  dt
  before position
  after position
  drift vector
  y bob value
```

## Finding

The current hero cloud is intentionally simple and performant. Do not restyle it yet. Add descriptor/cache/drift snapshots first so the visual route can be protected while future cloud improvements land.