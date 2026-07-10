# Cloud System Audit: Volume Texture Cloud/Fog Fixture

Timestamp: 2026-07-10T10-19-39-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Current atmosphere domains

```txt
cloud-weather-state
cloud-density-recipe
cloud-lighting-profile
cloud-lod-policy
cloud-shadow
cloud-horizon-band
fog-density-recipe
fog-advection
fog-volume-placement
aerial-perspective
atmosphere-volume-texture-consumer
volumetric-cloud-render-consumer
rolling-fog-render-consumer
```

## Current state

The route composes rich cloud, fog, and atmosphere source rows and consumes them in WebGPU render adapters. The visual path is advanced, but the proof path is still incomplete.

## Gap

The host does not expose deterministic rows proving:

```txt
source recipe selected
volume texture dimensions chosen
cloud/fog density generated
lighting profile consumed
LOD policy applied
shadow/horizon rows consumed
performance degrade/recover reason emitted
renderer consumed or skipped the texture row
```

## Needed next fixture proof

- deterministic volume texture result rows
- cloud/fog source fingerprint rows
- lighting and LOD consumption rows
- performance reason rows
- host JSON-safe readback rows

## Not next

- cloud rewrite
- fog rewrite
- atmosphere visual retune
- GPU capture automation
