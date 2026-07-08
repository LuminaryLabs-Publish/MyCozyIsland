# MyCozyIsland Hero Cloud Cache + Drift Consumer Map

**Timestamp:** `2026-07-08T19-40-00-04-00`

## Current cloud system

```txt
createMattatzCloudsState
  -> createMattatzCloudRenderContract
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache Map keyed by cloud.id
  -> Points objects with baseY, drift, speed, pointCount
  -> savedPointClouds array on group.userData
  -> frame drift mutates position x/z/y
  -> globalThis.CozyIsland.cloudContract and cloudPointCache expose legacy diagnostics
```

## Current service boundaries

```txt
rand(seed)
cloudMaterial(opacity)
heroCloudGeometry(cloud)
heroCloudGroup(contract)
frame cloud drift loop
legacy global cloudContract/cloudPointCache projection
```

## Missing records

```txt
HeroCloudDescriptorSnapshot
HeroCloudCacheSnapshot
CloudPointCloudSnapshot
CloudDriftResult
CloudConsumerSnapshot
```

## Required next records

```txt
HeroCloudCacheSnapshot {
  cloudCount,
  cachedGeometryCount,
  savedPointCloudCount,
  pointCounts,
  cacheKeys,
  placementBounds,
  opacityRange
}

CloudDriftResult {
  frameAt,
  dt,
  cloudId,
  driftVector,
  speed,
  deltaX,
  deltaY,
  deltaZ,
  baseY,
  pointCount
}
```

## Fixture rows

```txt
01_cloud_contract_projects_descriptor_snapshot
02_hero_cloud_geometry_reuses_same_cache_key
03_cloud_cache_snapshot_reports_cached_geometry_count
04_cloud_cache_snapshot_reports_saved_point_cloud_count
05_cloud_drift_result_records_xz_drift_delta
06_cloud_drift_result_records_y_bob_without_requiring_renderer
07_legacy_cozy_island_cloud_contract_stays_compatible
08_legacy_cozy_island_cloud_point_cache_stays_compatible
```

## Stop condition

The cloud system is ready for implementation when the host proof snapshot can report cloud cache and drift facts without changing point-cloud geometry, material, placement, or frame drift behavior.
