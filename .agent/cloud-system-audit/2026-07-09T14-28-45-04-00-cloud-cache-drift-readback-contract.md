# Cloud System Audit — Cache / Drift Readback Contract

**Timestamp:** `2026-07-09T14-28-45-04-00`

## Current cloud system

```txt
createMattatzCloudsState({ seed: cozy-island-clouds })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache Map keyed by cloud.id
  -> THREE.Points per cloud
  -> group.userData.savedPointClouds
  -> frame loop mutates x/z/y per cloud using drift vector, speed, dt, and bob sine
  -> globalThis.CozyIsland.cloudContract and cloudPointCache
```

## Existing strengths

```txt
source descriptor exists
cloud cache exists
point-cloud render path exists
legacy global exposes descriptor and geometry cache enough for manual inspection
```

## Current gaps

```txt
No HeroCloudDescriptorSnapshot.
No HeroCloudCacheSnapshot.
No CloudDriftResult.
No stable count of clouds, lobes, points, cache keys, or drift rows.
No DOM-free fixture can prove cloud descriptors were consumed by the browser renderer.
```

## Required readback records

```txt
HeroCloudDescriptorSnapshot:
  routeToken
  seed
  cloudCount
  cloudIds
  pointCountByCloud
  pointSizeRangeByCloud
  opacityByCloud
  driftSpeedByCloud

HeroCloudCacheSnapshot:
  cacheKeyCount
  cachedCloudIds
  totalCachedPointCount
  savedPointCloudCount
  geometryReuseStatus

CloudDriftResult:
  frameDt
  driftedCloudCount
  rows:
    cloudId
    beforePosition
    afterPosition
    delta
    bobY
```

## Next implementation note

Cloud visuals should remain as-is. The cut should only add source and consumption readback around the current `heroCloudGroup`, `heroCloudGeometry`, `cloudCache`, and frame drift behavior.
