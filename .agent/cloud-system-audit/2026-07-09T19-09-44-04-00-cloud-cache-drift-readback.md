# Cloud System Audit: Cache Drift Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T19-09-44-04-00`

## Current cloud loop

```txt
createMattatzCloudsState({ seed: cozy-island-clouds })
  -> createMattatzCloudRenderContract(...)
  -> heroCloudGroup(contract)
  -> heroCloudGeometry(cloud)
  -> cloudCache keyed by cloud.id
  -> Points geometry and shader material
  -> frame drift mutates x, y, z positions
  -> globalThis.CozyIsland exposes cloudContract and live cloudPointCache
```

## Current services

```txt
mattatz-clouds-domain: cloud state and active render contract
cozy-hero-cloud-form-kit: form, layer, render contract
main-cloudform cloudMaterial: point shader
main-cloudform heroCloudGeometry: seeded point generation and cache
main-cloudform frame: cloud drift update
```

## Gaps

```txt
Cache key is cloud.id only, not a descriptor fingerprint.
No cache hit, miss, or stale-entry result exists.
No descriptor-to-point-count parity row exists.
No fixed-dt cloud drift result exists.
Legacy diagnostics expose live BufferGeometry objects.
No serializable cloud readback exists.
```

## Next ledge

```txt
Add cloud descriptor snapshots.
Add cloud cache snapshots with descriptor fingerprints.
Add hit, miss, stale, and regenerated result rows.
Add fixed-dt drift records.
Expose serializable cloud state through CozyIslandHost.getState().clouds.
Keep globalThis.CozyIsland compatibility unchanged.
```