# Cloud System Audit: Hero Cloud Cache and Drift

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T02:09:17-04:00`

## Current cloud intent

`MyCozyIsland` uses the cloud stack as the signature visual idea for the scene.

The current target is not a full procedural weather system. It is a readable hero-cloud form over/near the cozy island that loads reliably, stays out of the camera corridor, and can later become a reusable cloud primitive.

## Current cloud kits and docs

```txt
mattatz-clouds-domain
  main cloud suite / composite domain

mattatz-cloud-core-kit
  single cloud primitive descriptor

mattatz-cloud-layer-kit
  low / mid / high cloud layer composition

mattatz-cloud-weather-kit
  presets like clear, scattered, overcast, storm-front, sunrise-haze

mattatz-cumulonimbus-kit
  storm tower / anvil / rain shaft descriptors

mattatz-cloud-lighting-kit
  rim light, silver lining, underside darkness

mattatz-cloud-lod-kit
  near / mid / far cloud LOD policy

mattatz-cloud-render-contract
  renderer handoff for cloud descriptors

mattatz-cloud-horizon-band
  far horizon cloud band descriptor

cozy-hero-cloud-form-kit
  creates one simple readable puff cloud over the island
  keeps cloud out of the camera corridor
  gives renderer a cached point-cloud puff descriptor
```

## Current cloud runtime read

```txt
cloud descriptor
  -> heroCloudGeometry(cloud)
  -> cached BufferGeometry by cloud.id
  -> point attributes: position, size, alpha, tint
  -> ShaderMaterial point sprites
  -> heroCloudGroup(contract)
  -> per-frame drift using placement + drift metadata
```

## Gaps

```txt
- Cloud descriptor snapshots are missing.
- Cloud cache snapshots are missing.
- Cloud drift results are not first-class action/tick outputs.
- Cache size and point counts are visible only through runtime objects.
- The cloud system is not fixture-tested without DOM/WebGL.
- The hero cloud cache is useful but still embedded in src/main-cloudform.js.
```

## Next safe ledge

Add additive cloud proof APIs without changing the visual:

```txt
createHeroCloudDescriptorSnapshot(contract)
createHeroCloudCacheSnapshot(cacheOrGeometryList)
createCloudDriftResult({ cloudId, basePlacement, drift, elapsedMs })
```

Expected fixture checks:

```txt
- stable cloud ids
- stable point counts
- stable descriptor bounds
- cache reports geometry count
- cache reports total points
- drift result changes position but preserves descriptor identity
- fixed elapsedMs returns deterministic drift output
```

## Promotion rule

Only promote cloud logic to a shared repo once the single hero cloud descriptor, cache snapshot, and drift result are deterministic and small enough to reuse outside this app.
