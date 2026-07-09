# Cloud System Audit: Hero Cloud Cache Drift Consumer Freeze

**Timestamp:** `2026-07-09T08-11-12-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Current cloud system

The route builds cloud descriptors with `createMattatzCloudsState()` and `createMattatzCloudRenderContract()`. `heroCloudGroup(contract)` converts each cloud descriptor into a `THREE.Points` object backed by a cached point geometry.

## Current cloud loop

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(state)
  -> heroCloudGroup(contract)
  -> for each cloud:
       heroCloudGeometry(cloud)
       cloudMaterial(opacity)
       THREE.Points(geometry, material)
       placement position copied to object
       userData stores baseY, drift, speed, and pointCount
       geometry saved into group.userData.savedPointClouds
  -> frame(now):
       cloud.position.x += drift.x * speed * dt * 18
       cloud.position.z += drift.z * speed * dt * 18
       cloud.position.y = baseY + sin(now * 0.00035) * 3.5
  -> globalThis.CozyIsland.cloudContract
  -> globalThis.CozyIsland.cloudPointCache
```

## Existing useful seams

```txt
cloudContract already contains descriptor authority
cloudCache is keyed by cloud id
savedPointClouds exposes cached geometry objects
cloud userData includes baseY, drift, speed, pointCount
frame loop has a single cloud drift mutation site
```

## Missing proof records

```txt
HeroCloudDescriptorSnapshot
HeroCloudCacheSnapshot
CloudDriftResult
cloud descriptor count
cloud id list
per-cloud point count
cache key count
cache hit/miss summary
per-frame drift delta
vertical bob value
CozyIslandHost cloud diagnostics
DOM-free cloud fixture rows
```

## Next-cut contract

```txt
HeroCloudDescriptorSnapshot:
  routeToken
  cloudCount
  clouds:
    id
    lobeCount
    pointCount
    opacity
    placement
    drift
    driftSpeed

HeroCloudCacheSnapshot:
  routeToken
  cacheKeys
  geometryCount
  totalPointCount
  savedPointCloudCount
  perGeometryPointCounts

CloudDriftResult:
  frameId
  dt
  now
  cloudId
  previousPosition
  driftVector
  speed
  delta
  verticalBob
  nextPosition
```

## Acceptance rows

```txt
cloud-descriptors-present
cloud-cache-reuses-id-key
cloud-cache-point-counts-match-descriptors
cloud-drift-xz-delta-matches-descriptor
cloud-bob-does-not-change-baseY
legacy-CozyIsland-cloudPointCache-preserved
CozyIslandHost-cloud-readback-added
```

## Main finding

The cloud look should stay untouched. The missing work is only consumer proof: make descriptor/cache/drift records visible to fixture code and additive host diagnostics.
