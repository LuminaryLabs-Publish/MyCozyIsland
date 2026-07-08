# Cloud System Audit: Hero Cloud Snapshot Wire Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T14-39-38-04-00`

## Current cloud path

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache Map keyed by cloud.id
  -> THREE.Points per cloud
  -> per-frame drift mutation
  -> globalThis.CozyIsland.cloudPointCache references saved geometries
```

## Current gap

The cloud route is visually useful but not fixture-readable.

The host exposes geometry references through `globalThis.CozyIsland.cloudPointCache`, but it does not expose stable summaries for:

```txt
cloud descriptor count
cloud ids
point count per cloud
point size min/max
opacity
placement
scale
drift vector
drift speed
cache hit/reuse behavior
per-frame drift result
cloud point total
```

## Snapshot kits needed

```txt
cozy-hero-cloud-descriptor-snapshot-kit:
  converts cloud render contract into serializable descriptor rows

cozy-hero-cloud-cache-snapshot-kit:
  reports cache keys, geometry point counts, cache hit/miss/reuse state, and saved point-cloud count

cozy-cloud-drift-result-kit:
  computes deterministic before/after cloud placement result for a given dt without mutating Three.js objects
```

## Fixture rows

```txt
cozy-cloud-descriptor-001:
  proves descriptor rows are stable for hero-cloud-4

cozy-cloud-cache-001:
  proves first geometry build creates cache entries

cozy-cloud-cache-reuse-001:
  proves repeated descriptor read reuses existing geometry keys

cozy-cloud-drift-001:
  proves cloud drift result updates x, z, and y bob from source values and dt
```

## Wire target

```txt
cloud render contract
  -> HeroCloudDescriptorSnapshot
  -> heroCloudGeometry cache events
  -> HeroCloudCacheSnapshot
  -> per-frame drift input
  -> CloudDriftResult
  -> RenderHostSnapshot
  -> CozyIslandHostSnapshot
```

## Guardrail

Do not replace `mattatz-clouds-domain` or `cozy-hero-cloud-form-kit` during this pass.

Do not alter the hero-cloud art direction, point counts, drift profile, opacity, shader, camera corridor behavior, or cloud route token.

This audit only defines proof records for the current system.
