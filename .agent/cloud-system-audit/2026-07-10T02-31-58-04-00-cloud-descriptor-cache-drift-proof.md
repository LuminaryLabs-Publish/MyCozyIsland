# Cloud system audit: descriptor cache drift proof

**Timestamp:** `2026-07-10T02-31-58-04-00`

## Current cloud source

`mattatz-clouds-domain` creates one active cloud render contract using `cozy-hero-cloud-form-kit`.

The active descriptor includes:

```txt
id: cozy-hero-cloud-main
version: 0.1.0
silhouette profile and lobeCount
pointCloud pointCount, point size range, opacity, softness
placement position and scale
lighting colors
drift vector
driftSpeed
rendererBoundary preferredAdapter
```

## Current browser consumer

`heroCloudGeometry(cloud)` uses:

```txt
const key = cloud.id;
if (cloudCache.has(key)) return cloudCache.get(key);
```

The generated `BufferGeometry` is cached by id only. It does not check a descriptor fingerprint.

## Current drift

Each frame mutates point-cloud positions by:

```txt
x += drift.x * driftSpeed * dt * 18
z += drift.z * driftSpeed * dt * 18
y = baseY + sin(now * 0.00035) * 3.5
```

## Gaps

```txt
no descriptor fingerprint
no cache hit/miss/stale row
no descriptor-to-point-count parity
no fixed-dt cloud drift result
legacy diagnostics expose live BufferGeometry objects
no serializable cloud host snapshot
```

## Required rows

```txt
HeroCloudDescriptorSnapshot
HeroCloudCacheSnapshot
HeroCloudCacheResult
CloudDriftResult
CloudRenderConsumptionRow
```

## Next safe cut

Add proof rows while preserving the current cached point-cloud look. Do not redesign clouds before the descriptor/cache/drift boundary is serializable and fixture-proven.
