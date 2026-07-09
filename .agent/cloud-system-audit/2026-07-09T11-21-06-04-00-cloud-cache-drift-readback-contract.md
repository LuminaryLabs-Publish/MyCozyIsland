# Cloud System Audit: Cache + Drift Readback Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-21-06-04-00`

## Current cloud system

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache keyed by cloud.id
  -> THREE.Points per cloud
  -> clouds.userData.savedPointClouds
  -> globalThis.CozyIsland.cloudContract
  -> globalThis.CozyIsland.cloudPointCache
```

## Current drift system

```txt
frame(dt):
  for each cloud Points:
    x += drift.x * speed * dt * 18
    z += drift.z * speed * dt * 18
    y = baseY + sin(now * 0.00035) * 3.5
```

## Missing proof records

```txt
HeroCloudDescriptorSnapshot:
  cloud ids
  cloud count
  point-count budget
  placement bounds
  opacity values
  lobe count summary

HeroCloudCacheSnapshot:
  cache keys
  saved point-cloud count
  cached geometry point counts
  cache hit/miss result

CloudDriftResult:
  cloud id
  dt
  prior position
  next position
  drift vector
  speed
  y bob
```

## Main finding

The cloud visual is strong enough to preserve. The next cut should make cloud descriptor creation, cache reuse, and drift mutation fixture-readable without changing the shader or point-cloud look.
