# Cloud System Audit: Hero Cloud Cache / Drift Fixture Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-30-27-04-00`

## Current cloud source

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(...)
  -> cloudContract
  -> heroCloudGroup(cloudContract)
```

## Current cloud render adapter

```txt
for each cloud in cloudContract.clouds:
  heroCloudGeometry(cloud)
    -> cloudCache by cloud.id
    -> deterministic rand(cloud.id)
    -> point positions/sizes/alphas/tints
  cloudMaterial(opacity)
  THREE.Points(geometry, material)
  point cloud position = cloud.placement.position
  userData = baseY, drift, speed, pointCount
  group.userData.savedPointClouds.push(geometry)
```

## Current drift update

```txt
for each cloud point object per frame:
  c.position.x += drift.x * speed * dt * 18
  c.position.z += drift.z * speed * dt * 18
  c.position.y = baseY + sin(now * 0.00035) * 3.5
```

## Current exposed diagnostics

```txt
globalThis.CozyIsland.cloudContract
globalThis.CozyIsland.cloudPointCache
globalThis.CozyIsland.getScrollProgress()
```

## Missing proof records

```txt
no HeroCloudDescriptorSnapshot
no HeroCloudCacheSnapshot
no CloudDriftResult
no stable total point count summary
no cache hit/miss summary
no fixture row proving cloud descriptor -> geometry cache -> frame drift
```

## Required snapshots

```txt
HeroCloudDescriptorSnapshot:
  seed
  cloudCount
  cloudIds
  placementBounds
  pointCountByCloud
  opacityRange
  driftVectorSummary

HeroCloudCacheSnapshot:
  cacheKeyCount
  savedPointCloudCount
  totalPointCount
  geometryAttributeNames
  boundingSpherePresent

CloudDriftResult:
  dt
  now
  cloudId
  previousPosition
  nextPosition
  reason: cloud-drift-applied | cloud-drift-missing-vector
```

## Fixture rows

```txt
cloud-source-build:
  source seed cozy-island-clouds
  descriptor cloud count > 0

cloud-cache-build:
  each descriptor cloud has cached geometry
  total point count equals sum of geometry attribute counts

cloud-cache-stability:
  repeated geometry lookup for same cloud id returns same cached geometry key

cloud-drift-step:
  applying dt changes x/z according to drift and speed
  y bob derives from baseY and now
```

## Acceptance

```txt
Do not change the cloud visual style.
Do not replace shader material.
Do not change point count generation.
Do not remove globalThis.CozyIsland.cloudPointCache.
Add CozyIslandHost.getState().clouds as an additive normalized readback.
```
