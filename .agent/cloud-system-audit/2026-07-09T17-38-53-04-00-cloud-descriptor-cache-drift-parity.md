# My Cozy Island Cloud Descriptor/Cache/Drift Parity Audit

**Timestamp:** `2026-07-09T17-38-53-04-00`

## Current source and consumer

```txt
createMattatzCloudsState(seed)
  -> createMattatzCloudRenderContract(state)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache keyed by cloud.id
  -> point attributes: position, size, alpha, tint
  -> THREE.Points with custom shader material
  -> per-frame X/Z drift and Y bob
```

## Cache behavior

`heroCloudGeometry()` returns an existing geometry whenever `cloudCache` already contains the cloud id. The cache key does not include a descriptor fingerprint.

That means a changed cloud descriptor with the same id could reuse stale geometry without any readback indicating the mismatch.

## Current gaps

```txt
no descriptor fingerprint
no cache hit/miss journal
no cache entry descriptor fingerprint
no contract cloud count versus group child count row
no descriptor point count versus geometry point count row
no total cached point count row
no per-cloud drift result row
no reset/disposal policy for cached geometry
no additive host snapshot for cloud source and consumer state
```

## Required snapshot

```js
{
  source: {
    seed,
    cloudCount,
    clouds: [{ id, descriptorFingerprint, requestedPointCount, placement, drift, driftSpeed }]
  },
  cache: {
    entryCount,
    entries: [{ id, descriptorFingerprint, pointCount, hitCount, missCount }]
  },
  consumer: {
    groupChildCount,
    totalPointCount,
    driftResults: [{ id, position, baseY, timestamp }]
  },
  parity: {
    descriptorCountMatches,
    pointCountsMatch,
    staleCacheIds
  }
}
```

## Fixture rows

```txt
first geometry request is a cache miss
second identical request is a cache hit
same id plus changed descriptor fingerprint is reported stale
cloud count equals rendered child count
requested point count equals geometry point count
drift update records deterministic delta for fixed dt
Y bob preserves baseY source value
```

## Recommended kits

```txt
hero-cloud-descriptor-snapshot-kit
hero-cloud-cache-snapshot-kit
cloud-drift-result-kit
render-consumption-ledger-kit
cozy-island-host-snapshot-kit
```

Keep current shader, point generation, cloud placement, and visible drift while adding proof metadata.
