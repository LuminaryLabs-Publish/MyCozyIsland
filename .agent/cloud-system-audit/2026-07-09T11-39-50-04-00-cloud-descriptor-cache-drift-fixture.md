# Cloud System Audit: Descriptor / Cache / Drift Fixture

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-39-50-04-00`

## Current cloud loop

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cache BufferGeometry by cloud.id
  -> create THREE.Points per cloud
  -> save generated geometries in clouds.userData.savedPointClouds
  -> frame() applies cloud drift directly to Points positions
  -> globalThis.CozyIsland.cloudPointCache exposes geometry references only
```

## Current cloud gaps

```txt
cloud descriptors are not summarized into a host snapshot
cache keys are not exposed as data
cache reuse is not proven
point counts are not normalized into fixture rows
drift mutation is not emitted as CloudDriftResult
legacy cloudPointCache exposes object references, not stable records
```

## Fixture rows needed

```txt
HeroCloudDescriptorSnapshot:
  routeToken
  cloudCount
  ids
  pointCountById
  opacityById
  driftById
  placementSummary

HeroCloudCacheSnapshot:
  cacheKeyCount
  geometryCount
  totalPointCount
  reusedKeys
  generatedKeys

CloudDriftResult:
  cloudId
  beforePosition
  drift
  speed
  dt
  afterPosition
  yBob
  accepted
```

## Main cloud finding

The cloud system already has a clear descriptor, cache, and drift path. The next cut should expose those as immutable readback records before changing the cloud shader, point placement, cache behavior, or visual style.
