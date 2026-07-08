# Cloud-System Audit — Cloud Cache / Drift Consumer Map

**Timestamp:** `2026-07-08T14-58-49-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Current cloud system

The route creates a Mattatz-style cloud render contract, converts each cloud into point geometry, caches geometries by cloud id, and drifts the resulting Three.js point groups every frame.

```txt
createMattatzCloudsState
  -> createMattatzCloudRenderContract
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache Map keyed by cloud.id
  -> group.userData.savedPointClouds
  -> frame(now) mutates cloud point positions by drift/speed/dt
  -> globalThis.CozyIsland.cloudContract
  -> globalThis.CozyIsland.cloudPointCache
```

## Current gap

The cloud system is visible and stable, but proof records are missing.

```txt
No HeroCloudDescriptorSnapshot exists.
No HeroCloudCacheSnapshot exists.
No CloudDriftResult exists.
The cache is a private Map inside src/main-cloudform.js.
globalThis.CozyIsland.cloudPointCache is a list of geometry references, not a stable summary.
Fixture rows cannot prove cache reuse, point counts, descriptor identity, or drift determinism.
```

## Required snapshot records

```js
HeroCloudDescriptorSnapshot = {
  routeVersion,
  cloudCount,
  cloudIds,
  totalPointIntent,
  placementBounds,
  driftVectors,
  opacityRange
}

HeroCloudCacheSnapshot = {
  cacheSize,
  entries: [
    {
      cloudId,
      pointCount,
      hasPositionAttribute,
      hasSizeAttribute,
      hasAlphaAttribute,
      hasTintAttribute,
      reusedFromCache
    }
  ]
}

CloudDriftResult = {
  cloudId,
  dt,
  before,
  after,
  drift,
  speed,
  changedFields
}
```

## Consumer splice order

```txt
1. Add pure hero-cloud snapshot helpers that consume plain cloud descriptor data.
2. Add cache snapshot helpers that can summarize a plain cache-like input in fixtures.
3. Add cloud drift result helper that computes before/after from plain numbers.
4. Add fixture rows for descriptor, cache creation, cache reuse, and drift.
5. In src/main-cloudform.js, call snapshot helpers after heroCloudGroup(contract).
6. In frame(now), project drift result records without changing cloud movement.
7. Expose summaries through globalThis.CozyIslandHost.cloud while preserving globalThis.CozyIsland.cloudPointCache.
```

## Fixture rows

```txt
cozy-cloud-descriptor-001
cozy-cloud-cache-001
cozy-cloud-cache-reuse-001
cozy-cloud-drift-001
```

## Stop line

Do not change the visual cloud material, point shader, point count generation, drift multiplier, baseY sine bob, cache key, or legacy `globalThis.CozyIsland.cloudPointCache` surface during the proof splice.

## Next implementation target

```txt
src/host-proof/hero-cloud-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/host-snapshot.js
src/host-proof/fixture-cases.mjs
```