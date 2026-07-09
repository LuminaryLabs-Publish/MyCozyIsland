# Cloud System Audit: Hero Cloud Cache Drift Fixture

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T08-20-00-04-00`

## Current cloud path

```txt
createMattatzCloudsState(seed: cozy-island-clouds)
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache Map keyed by cloud.id
  -> THREE.Points for each cloud
  -> frame mutates x/z drift and y bob directly
  -> globalThis.CozyIsland.cloudContract
  -> globalThis.CozyIsland.cloudPointCache
```

## Gap

Cloud descriptors and point cache exist, but only the legacy diagnostic object exposes partial references. The route cannot prove cache stability, point counts, cloud count, or drift acceptance through a source-owned result record.

## Required proof records

```txt
HeroCloudDescriptorSnapshot:
  routeToken
  seed
  cloudCount
  cloudIds
  placementSummary
  pointCloudSummary

HeroCloudCacheSnapshot:
  cacheKeyCount
  cacheKeys
  pointCounts
  reusedGeometryCount

CloudDriftResult:
  frame
  dt
  movedCloudCount
  yBobApplied
  totalXZDrift
  accepted
```

## Fixture rows

```txt
cloud-descriptor-stable
cloud-cache-reuse-same-id
cloud-cache-point-counts
cloud-drift-dt-zero
cloud-drift-dt-positive
cloud-host-readback-shape
```

## Implementation rule

Keep the current point-cloud look. Add readback before changing cloud rendering, material, density, or drift behavior.
