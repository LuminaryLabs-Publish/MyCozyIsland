# MyCozyIsland Hero Cloud Cache + Drift Matrix

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T11-40-00-04-00`

## Scope

This audit documents the hero-cloud runtime seam.

No cloud rendering code changed.

## Current cloud loop

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> for each cloud descriptor:
       heroCloudGeometry(cloud)
       cloudMaterial(cloud.pointCloud.opacity)
       THREE.Points
       userData: baseY, drift, speed, pointCount
       savedPointClouds.push(geometry)
  -> frame drift:
       position.x += drift.x * speed * dt * 18
       position.z += drift.z * speed * dt * 18
       position.y = baseY + sin(now * 0.00035) * 3.5
  -> globalThis.CozyIsland.cloudContract
  -> globalThis.CozyIsland.cloudPointCache
```

## Current cache model

```txt
cache key:
  cloud.id

cached value:
  THREE.BufferGeometry

geometry attributes:
  position
  size
  alpha
  tint

random source:
  deterministic rand(seed) helper seeded from cloud.id for hero cloud geometry

problem:
  cache facts are not summarized into a stable JSON snapshot
```

## Missing cloud proof records

```txt
HeroCloudDescriptorSnapshot
  routeVersion
  cloudIds
  lobeCount
  pointCount
  placement
  drift
  driftSpeed
  opacity
  materialProfile

HeroCloudCacheSnapshot
  cacheKeys
  geometryCount
  totalPointCount
  attributesPerGeometry
  boundingSpherePresence
  savedPointCloudCount

CloudDriftResult
  tick
  dt
  now
  before
  after
  delta
  accepted
  reason
```

## Fixture matrix

```txt
cozy-cloud-descriptor-001:
  input: cloud render contract
  expected: stable descriptor summary with routeVersion hero-cloud-4

cozy-cloud-cache-001:
  input: saved point cloud geometries after heroCloudGroup
  expected: stable point counts and cache keys

cozy-cloud-drift-001:
  input: fixed cloud state, fixed dt, fixed now
  expected: deterministic x/z/y updates

cozy-cloud-drift-zero-dt-001:
  input: fixed cloud state, dt 0
  expected: no x/z drift, y recomputed from now

cozy-cloud-cache-repeat-001:
  input: same cloud id twice
  expected: cache hit and no duplicated geometry contract
```

## Guardrails

```txt
- Do not change cloud art direction in the proof pass.
- Do not remove the point-cloud hero cloud route.
- Do not replace the cloud cache with an async asset system before fixture snapshots exist.
- Do not require WebGL for descriptor/cache/drift fixture rows.
- Keep `globalThis.CozyIsland.cloudContract` and `cloudPointCache` compatibility stable.
```

## Next cloud ledge

```txt
HeroCloudDescriptorSnapshot + HeroCloudCacheSnapshot + CloudDriftResult
```

These records should feed the additive `globalThis.CozyIslandHost` surface and a DOM-free fixture runner.
