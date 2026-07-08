# Cloud System Audit: Cloud Cache + Drift Fixture Sync

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-09-48-04-00`

## Current cloud system

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache Map keyed by cloud.id
  -> THREE.Points per cloud
  -> per-frame drift mutates x/z/y directly
  -> globalThis.CozyIsland.cloudPointCache exposes saved geometries
```

## Current services

```txt
createMattatzCloudsState
createMattatzCloudRenderContract
rand
cloudMaterial
heroCloudGeometry
heroCloudGroup
frame(now) cloud drift loop
globalThis.CozyIsland cloud compatibility projection
```

## Gap

The cloud system is visually present and route-critical, but the browser host does not emit stable cloud proof records.

The private `cloudCache` Map and per-frame drift logic need deterministic, serializable summaries before future changes to cloud visuals.

## Required cloud records

```txt
HeroCloudDescriptorSnapshot
  routeVersion
  cloudCount
  ids[]
  placementSummary[]
  driftSummary[]
  pointCloudSummary[]

HeroCloudCacheSnapshot
  cacheKeyCount
  keys[]
  totalPointCount
  reusedKeys[]
  createdKeys[]

CloudDriftResult
  frameId
  dt
  before[]
  after[]
  changedFields[]
```

## Source files

```txt
src/host-proof/hero-cloud-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/fixture-cases.mjs
```

## Fixture rows

```txt
cozy-cloud-descriptor-001
cozy-cloud-cache-001
cozy-cloud-cache-reuse-001
cozy-cloud-drift-001
cozy-host-legacy-compatibility-001
```

## Browser splice points

```txt
const cloudCache = new Map()
heroCloudGeometry(cloud)
heroCloudGroup(contract)
clouds.children.forEach drift loop in frame(now)
globalThis.CozyIsland.cloudPointCache
globalThis.CozyIslandHost.getState().clouds
```

## Guardrail

Do not change the hero-cloud placement, point count, point material, drift speed, opacity, or cached geometry shape while adding proof records.
