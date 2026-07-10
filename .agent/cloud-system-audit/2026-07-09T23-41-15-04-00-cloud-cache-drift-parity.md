# Cloud system audit: cache drift parity

Timestamp: `2026-07-09T23-41-15-04-00`

## Current cloud path

```txt
mattatz-clouds-domain
  -> createMattatzCloudsState({ seed })
  -> createMattatzCloudRenderContract(state)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cache by cloud.id
  -> create Points object
  -> frame drift mutates position x/z/y
  -> legacy diagnostics expose cloudContract and live geometries
```

## Current service

The source kits define cloud contract, silhouette, point-cloud settings, placement, drift, and opacity. The browser host generates and caches point geometry, then mutates cloud positions each frame.

## Gaps

- Cache key uses only `cloud.id`.
- No descriptor fingerprint is checked before reusing geometry.
- No cache hit/miss/stale result exists.
- No descriptor point-count to geometry point-count parity row exists.
- No fixed-dt drift result exists.
- Live `BufferGeometry` objects are exposed instead of serializable snapshots.

## Required next rows

```txt
cloud_id
source_fingerprint
cache_status: hit | miss | stale
source_point_count
geometry_point_count
base_position
drift_vector
drift_speed
dt
next_position
serializable: true
```

## Recommendation

Do not replace the cloud visuals yet. Add descriptor/cache/drift readback and a serializable host snapshot first.
