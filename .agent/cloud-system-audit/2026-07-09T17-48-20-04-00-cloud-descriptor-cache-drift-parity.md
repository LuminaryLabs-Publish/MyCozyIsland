# Cloud Descriptor, Cache, and Drift Parity Audit

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T17-48-20-04-00`

## Current cloud route

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(state)
  -> createCozyHeroCloudRenderContract(...)
  -> one hero cloud descriptor
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache keyed by cloud.id
  -> THREE.Points + shader material
  -> per-frame x/z drift and y bob
```

## Source kit ownership

### `cozy-hero-cloud-form-kit`

```txt
form version
silhouette profile
lobe count
compactness
base flattening
crown lift
point count
point size range
opacity
softness
placement band, position, and scale
lighting and underside color
silver lining
drift vector
drift speed
renderer boundary
```

### `mattatz-clouds-domain`

```txt
weather state
cloud count
hero-cloud focus
active cloud render contract
source kit identity
```

## Consumer ownership

`src/main-cloudform.js` owns:

```txt
seeded point generation by cloud.id
point position, size, alpha, and tint buffers
BufferGeometry creation
shader material creation
THREE.Points creation
geometry cache
live cloud drift
vertical bob
legacy exposure of cached BufferGeometry objects
```

## Cache risk

The cache key is only `cloud.id`.

```txt
cloudCache.get("cozy-hero-cloud-main")
```

If point count, lobe count, scale, point size, or other geometry-affecting descriptor fields change while the id remains stable, the old geometry is reused. There is no descriptor fingerprint, stale-entry decision, or cache invalidation record.

## Drift risk

The frame loop mutates cloud positions incrementally:

```txt
x += drift.x * driftSpeed * dt * 18
z += drift.z * driftSpeed * dt * 18
y = baseY + sin(now * 0.00035) * 3.5
```

There is no source position snapshot, elapsed-time accumulator, wrap policy, deterministic replay row, or restart state. Re-running the same fixed sequence cannot currently be compared without browser object inspection.

## Required snapshots

### Descriptor snapshot

```txt
id
version
sourceKit
silhouette
pointCloud
placement
lighting
drift
driftSpeed
rendererBoundary
fingerprint
```

### Cache result

```txt
cloudId
descriptorFingerprint
cacheKey
status: hit | miss | stale-replaced
pointCount
geometryAttributeCounts
```

### Drift result

```txt
cloudId
beforePosition
dt
absoluteTimeMode
configuredDrift
configuredSpeed
afterPosition
status
```

## Required fixture rows

```txt
stable descriptor fingerprint
first request cache miss
same descriptor cache hit
same id with geometry-affecting change stale-replaced
point count equals descriptor pointCount
position/size/alpha/tint attribute counts reconcile
fixed-dt x/z drift result
fixed-time y bob result
restart restores source placement
legacy cloudContract parity
serializable host snapshot excludes live BufferGeometry objects
```

## Compatibility boundary

Keep `globalThis.CozyIsland.cloudContract` and `getScrollProgress()` intact. A new serializable host snapshot may report geometry counts and fingerprints, but it should not require consumers to traverse live Three.js geometry.

## Next safe ledge

```txt
Cloud Descriptor Fingerprint + Cache/Drift Result Fixture
```