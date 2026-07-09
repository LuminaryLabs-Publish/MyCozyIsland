# Cloud System Audit: Cloud Drift Cache Result Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T21-58-34-04-00`

## Current cloud source

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> weather sunrise-haze
  -> cloudCount 1
  -> focus cozy-hero-cloud-form-kit

createMattatzCloudRenderContract(...)
  -> createCozyHeroCloudRenderContract
  -> one cloud id cozy-hero-cloud-main
  -> layer id cozy-hero-cloud-layer
  -> pointCount 420
  -> lobeCount 7
  -> position { x: 0, y: 132, z: -26 }
  -> scale { x: 360, y: 118, z: 260 }
  -> drift { x: 0.32, z: 0.05 }
  -> driftSpeed 0.012
```

## Current cloud runtime

```txt
cloudCache = new Map()
heroCloudGeometry(cloud):
  key = cloud.id
  return cached geometry when present
  build point cloud attributes when missing
  cache geometry by key

heroCloudGroup(contract):
  create THREE.Points for each cloud
  set position from cloud placement
  userData = baseY, drift, speed, pointCount
  push geometry into group.userData.savedPointClouds

frame(now):
  c.position.x += drift.x * speed * dt * 18
  c.position.z += drift.z * speed * dt * 18
  c.position.y = baseY + sin(now * 0.00035) * 3.5
```

## Current gaps

```txt
No HeroCloudDescriptorSnapshot exists.
No HeroCloudCacheSnapshot exists.
No CloudDriftResult exists.
cloudCache hits/misses are not counted.
savedPointClouds are exposed only through globalThis.CozyIsland.cloudPointCache.
frame drift is not replayable without a browser.
```

## Target records

```txt
HeroCloudDescriptorSnapshot:
  contractId
  sourceKit
  weather
  cloudCount
  cloudIds
  layerIds
  pointCount
  lobeCount
  placement
  scale
  drift
  driftSpeed

HeroCloudCacheSnapshot:
  cacheKey
  hadCachedGeometry
  savedPointCloudCount
  pointCount
  attributes

CloudDriftResult:
  cloudId
  dt
  now
  before
  after
  drift
  driftSpeed
  xDelta
  zDelta
  yWave
```

## Fixture rows

```txt
hero_cloud_descriptor_snapshot_matches_contract
hero_cloud_cache_snapshot_records_first_build_miss
hero_cloud_cache_snapshot_records_second_build_hit
cloud_drift_result_computes_x_z_delta_from_drift_speed_dt
cloud_drift_result_computes_y_from_baseY_and_now
legacy_CozyIsland_cloudContract_still_available
legacy_CozyIsland_cloudPointCache_still_available
CozyIslandHost_cloud_section_exposes_descriptor_cache_and_drift
```

## Handoff

Keep the hero cloud visual intact. Add cloud proof records around the current contract, cache, and drift math before changing cloud rendering.
