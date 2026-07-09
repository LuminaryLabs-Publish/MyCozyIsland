# Cloud System Audit: Cache / Drift Readback Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T02-31-41-04-00`

## Current cloud chain

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(state)
  -> createCozyHeroCloudRenderContract(...)
  -> cloudContract.clouds
  -> heroCloudGroup(cloudContract)
  -> heroCloudGeometry(cloud)
  -> cloudCache Map keyed by cloud.id
  -> THREE.Points per cloud
  -> clouds.userData.savedPointClouds
  -> frame drift update
```

## Current source facts

```txt
cloudCount: 1
cloud id: cozy-hero-cloud-main
layer id: cozy-hero-cloud-layer
sourceKit: cozy-hero-cloud-form-kit
pointCount: 420
lobeCount: 7
position: { x: 0, y: 132, z: -26 }
scale: { x: 360, y: 118, z: 260 }
drift: { x: 0.32, z: 0.05 }
driftSpeed: 0.012
```

## Gaps

```txt
cloud descriptors are consumed directly by Three.js Points
cloudCache Map state is not exposed as a stable host record
savedPointClouds count is not compared to cloud descriptor count
point count is not projected through host state
per-frame drift delta is not recorded without WebGL
cloud geometry cache hit/miss behavior has no fixture row
```

## Required records

```txt
HeroCloudDescriptorSnapshot:
  cloudCount
  layerCount
  cloudIds
  pointCounts
  lobeCounts
  placement
  scale
  drift
  driftSpeed
  sourceKit

HeroCloudCacheSnapshot:
  cacheKeys
  cacheSize
  savedPointCloudCount
  renderedPointCloudCount
  pointCountByCloudId
  cacheHitByCloudId

CloudDriftResult:
  cloudId
  dt
  driftX
  driftYBob
  driftZ
  nextPosition
```

## Fixture rows

```txt
cloud_01_descriptor_snapshot_reads_single_hero_cloud
cloud_02_cache_snapshot_reports_cloud_id_and_point_count
cloud_03_cache_snapshot_reports_saved_point_clouds_count
cloud_04_drift_result_matches_x_z_speed_and_y_bob_without_webgl
cloud_05_legacy_CozyIsland_cloudContract_shape_remains_compatible
```

## Stop line

Do not change the cloud look, point count, shader material, opacity, drift speed, or cache key in the first implementation. Add readback first.
