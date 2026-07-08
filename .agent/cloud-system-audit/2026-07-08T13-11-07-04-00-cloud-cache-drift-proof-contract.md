# Cloud System Audit — Cache and Drift Proof Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T13-11-07-04-00`

## Current cloud path

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(cloudContract)
  -> heroCloudGeometry(cloud)
  -> cloudCache Map keyed by cloud.id
  -> THREE.Points per cloud
  -> per-frame position drift
  -> globalThis.CozyIsland.cloudPointCache
```

## Current cloud facts

```txt
cloudCache is internal to src/main-cloudform.js.
heroCloudGeometry caches BufferGeometry by cloud.id.
cloud point counts come from cloud.pointCloud.pointCount or fallback 420.
cloud drift mutates child position every frame.
legacy global exposes saved point-cloud geometry references, not stable summaries.
```

## Missing proof objects

```txt
HeroCloudDescriptorSnapshot
HeroCloudCacheSnapshot
CloudDriftFrame
CloudDriftResult
CloudFixtureResult
```

## Required descriptor snapshot

```txt
HeroCloudDescriptorSnapshot
  routeToken
  cloudCount
  cloudIds
  totalRequestedPointCount
  placementBounds
  lobeCountRange
  opacityRange
  driftVectorSummary
```

## Required cache snapshot

```txt
HeroCloudCacheSnapshot
  routeToken
  cacheKeyCount
  keys
  geometryCount
  pointCountByKey
  totalCachedPointCount
  reusedGeometryCount
  missingGeometryKeys
```

## Required drift result

```txt
CloudDriftResult
  frame
  dt
  now
  cloudId
  before
  after
  drift
  speed
  accepted
  reason
```

## Fixture rows

```txt
cozy-cloud-descriptor-001
cozy-cloud-cache-empty-001
cozy-cloud-cache-populated-001
cozy-cloud-cache-reuse-001
cozy-cloud-drift-001
cozy-cloud-drift-zero-dt-001
cozy-cloud-drift-missing-speed-001
```

## Integration guardrail

Do not change cloud shape, cloud shader, cloud placement, point counts, or visual drift during the host-proof pass.

Only add summaries and deterministic reducer rows.
