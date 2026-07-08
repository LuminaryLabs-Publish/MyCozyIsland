# Cloud System Audit: Cloud Cache and Drift Source Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-00-36-04-00`

## Current cloud surface

The cloud system is built from:

```txt
createMattatzCloudsState({ seed: "cozy-island-clouds" })
createMattatzCloudRenderContract(...)
heroCloudGeometry(cloud)
heroCloudGroup(contract)
cloudCache Map
frame(now) drift mutation
```

`globalThis.CozyIsland` currently exposes:

```txt
cloudContract
cloudPointCache
getScrollProgress
```

## Current gap

The current cloud runtime exposes geometry references and mutates point objects directly.

It does not provide stable records for:

```txt
cloud descriptor shape
cloud point count
cloud drift intent
cached geometry reuse
per-frame drift result
host-safe cloud summary
```

## Target snapshots

```txt
HeroCloudDescriptorSnapshot = {
  schema: "cozy.heroCloudDescriptorSnapshot.v1",
  cloudCount,
  totalPointCount,
  clouds: [
    {
      id,
      lobeCount,
      pointCount,
      placement,
      drift,
      driftSpeed,
      opacity
    }
  ]
}
```

```txt
HeroCloudCacheSnapshot = {
  schema: "cozy.heroCloudCacheSnapshot.v1",
  cacheSize,
  cachedIds,
  savedPointCloudCount,
  totalCachedPoints
}
```

```txt
CloudDriftResult = {
  schema: "cozy.cloudDriftResult.v1",
  cloudId,
  dt,
  before,
  after,
  driftVector,
  speed,
  verticalBob
}
```

## Fixture rows

```txt
cozy-cloud-descriptor-001
  proves cloud descriptor summary from cloudContract

cozy-cloud-cache-001
  proves geometry cache can be summarized after heroCloudGroup(contract)

cozy-cloud-cache-reuse-001
  proves same cloud id reuses cache instead of creating unstable geometry counts

cozy-cloud-drift-001
  proves deterministic drift projection from before + dt + drift + speed
```

## Browser splice point

```txt
const cloudContract = createMattatzCloudRenderContract(...)
const clouds = heroCloudGroup(cloudContract)
frame(now) -> clouds.children.forEach(...)
globalThis.CozyIslandHost.getState().clouds
```

## Guardrail

Keep `globalThis.CozyIsland.cloudPointCache` for compatibility.

Add stable summaries beside it; do not replace it in the first host-proof pass.