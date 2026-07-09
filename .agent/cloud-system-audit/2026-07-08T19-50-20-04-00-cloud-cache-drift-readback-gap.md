# MyCozyIsland Cloud Cache Drift Readback Gap

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T19-50-20-04-00`

## Current cloud surface

```txt
createMattatzCloudsState
  -> createMattatzCloudRenderContract
  -> heroCloudGeometry(cloud)
  -> cloudCache Map keyed by cloud.id
  -> heroCloudGroup(contract)
  -> savedPointClouds
  -> frame() drift mutation
```

## Current gap

The hero cloud system is visually present, but its cache and drift behavior are not fixture-readable. `cloudCache`, `savedPointClouds`, point counts, and per-frame drift deltas need stable records.

## Required records

```txt
HeroCloudDescriptorSnapshot:
  cloudCount
  ids
  pointCounts
  placement
  drift
  materialOpacity

HeroCloudCacheSnapshot:
  cacheSize
  geometryIds
  savedPointCloudCount
  totalPointCount
  reusedGeometryCount

CloudDriftResult:
  cloudId
  beforePosition
  afterPosition
  delta
  drift
  speed
  dt
```

## Fixture rows

```txt
hero_cloud_cache_snapshot_matches_saved_point_clouds
cloud_drift_result_records_frame_delta_without_requiring_webgl
host_snapshot_reports_cloud_descriptor_cache_and_drift
```

## Non-goals

```txt
do not redesign cloud shape
do not replace cloud shader
do not change point count policy
do not remove globalThis.CozyIsland.cloudPointCache
```
