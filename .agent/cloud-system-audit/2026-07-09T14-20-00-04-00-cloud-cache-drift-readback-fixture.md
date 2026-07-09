# Cloud System Audit: Cache / Drift Readback Fixture

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-20-00-04-00`

## Current cloud path

```txt
createMattatzCloudsState({ seed: cozy-island-clouds })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cache geometry by cloud.id
  -> create THREE.Points per cloud
  -> frame mutates x/z drift and y bob
  -> globalThis.CozyIsland.cloudContract + cloudPointCache
```

## Current services

```txt
mattatz cloud state construction
cloud render contract construction
seeded point generation
lobe-based point placement
point size/alpha/tint generation
geometry cache lookup/store
cloud shader material creation
per-frame drift application
legacy cloud cache diagnostics
```

## Missing readback

```txt
HeroCloudDescriptorSnapshot
HeroCloudCacheSnapshot
CloudDriftResult
cloud fixture rows
additive host snapshot projection
```

## Required fixture rows

```txt
cloud-descriptor-snapshot:
  reports cloud count, route token, seed, point count totals, opacity range, and drift descriptors

cloud-cache-snapshot:
  reports cache key count, geometry count, point count by cloud id, and cache reuse

cloud-drift-result:
  reports dt, x/z drift delta, y bob calculation, and skipped/accepted frame status
```

## Main cloud finding

The cloud system is good enough visually. The next improvement is to prove descriptor/cache/drift consumption without requiring callers to inspect Three.js point geometry directly.
