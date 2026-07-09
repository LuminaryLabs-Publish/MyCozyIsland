# Cloud System Audit: Descriptor Cache Drift Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-39-07-04-00`

## Current cloud system

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache keyed by cloud.id
  -> THREE.Points with shader material
  -> per-frame drift updates x/z/y
  -> globalThis.CozyIsland.cloudContract
  -> globalThis.CozyIsland.cloudPointCache
```

## Cloud domains

```txt
mattatz-cloud-source-domain
cloud-render-contract-domain
hero-cloud-geometry-cache-domain
hero-cloud-shader-domain
cloud-placement-domain
cloud-drift-frame-domain
cloud-cache-readback-domain-next
cloud-drift-result-domain-next
```

## Gap

The route exposes cloud contract and saved point-cloud geometry, but not a normalized fixture-readable row for descriptor count, point count, cache keys, drift deltas, cache reuse, or render-consumer parity.

## Next proof

Add cloud readback records with:

```txt
cloud id
point count
geometry cache hit/miss
placement before frame
placement after frame
drift vector
drift speed
baseY
computed y bob
```

Keep this additive and preserve the existing cloud visual path.
