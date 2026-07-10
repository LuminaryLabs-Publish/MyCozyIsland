# Cloud System Audit: Cache Drift Readback

**Timestamp:** `2026-07-10T01-11-51-04-00`

## Current source

`mattatz-clouds-domain` and `cozy-hero-cloud-form-kit` create a hero cloud render contract.

Current point count is `420` unless overridden by the contract.

## Current consumer

```txt
heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cache key is cloud.id
  -> create Points object with shader material
  -> frame loop drifts position by cloud drift and driftSpeed
```

## Gaps

```txt
No descriptor fingerprint exists.
Cache hit/miss/stale state is not recorded.
Changed descriptors can reuse geometry when id is unchanged.
Point count parity is not recorded.
Fixed-dt drift result is not recorded.
Legacy diagnostics expose live BufferGeometry objects, not serializable proof rows.
```

## Required readback

```txt
cloud id
descriptor fingerprint
point count requested
point count generated
cache status: hit | miss | stale
base position
drift vector
drift speed
fixed dt result
serializable bounds
```

## Cloud finding

Do not rebuild cloud visuals yet. First prove descriptor, cache, and drift parity through serializable rows.
