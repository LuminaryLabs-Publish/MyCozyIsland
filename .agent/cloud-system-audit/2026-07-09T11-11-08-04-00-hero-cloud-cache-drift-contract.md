# Cloud System Audit: Hero Cloud Cache / Drift Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-11-08-04-00`

## Summary

The hero cloud system is already descriptor-driven, cached, and animated, but its proof surface is still legacy-only.

The next pass should expose cloud descriptor, cache, and drift facts through additive host readback without changing cloud visuals.

## Current cloud source path

```txt
createMattatzCloudsState({ seed: cozy-island-clouds })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache keyed by cloud.id
  -> THREE.Points per cloud
  -> group.userData.savedPointClouds
  -> frame loop mutates point-cloud position using cloud drift fields
  -> globalThis.CozyIsland.cloudContract and cloudPointCache expose legacy diagnostics
```

## Current cloud services

```txt
mattatz cloud descriptor creation
point-count selection
seeded point generation per cloud id
point size generation
alpha generation
tint generation
geometry cache by cloud id
shader material creation
point cloud placement
drift metadata assignment
per-frame position drift
legacy diagnostic exposure
```

## Missing proof records

```txt
HeroCloudDescriptorSnapshot
HeroCloudCacheSnapshot
CloudDriftResult
CloudFixtureRow
cache-key count parity
descriptor point-count parity
per-frame drift delta summary
serializable host readback
```

## Snapshot contract

```txt
HeroCloudDescriptorSnapshot:
  cloudCount
  ids
  pointCounts
  opacityRange
  scaleRange
  driftSpeedRange
  totalDeclaredPoints

HeroCloudCacheSnapshot:
  cacheKeyCount
  cacheKeys
  geometryPointCounts
  totalCachedPoints
  descriptorParity

CloudDriftResult:
  frameTime
  cloudId
  beforePosition
  afterPosition
  driftVector
  changed
```

## Fixture rows

```txt
cloud-descriptor-summary:
  assert cloud count > 0
  assert every cloud has id and point count

cloud-cache-parity:
  assert each cloud id has one cached geometry
  assert cached geometry point count equals descriptor point count

cloud-drift-step:
  assert drift result is serializable
  assert drift changes position for clouds with drift enabled

legacy-diagnostics-compatible:
  assert globalThis.CozyIsland cloudContract/cloudPointCache remains available in browser route
```

## Do not do next

```txt
do not change cloud shape
do not change point count
do not change shader opacity
do not replace Mattatz cloud descriptor source
do not remove cloudCache
do not remove legacy CozyIsland.cloudPointCache
```

## Next safe ledge

```txt
MyCozyIsland Host Proof Ledger Parity + Browser Consumer Fixture Gate
```