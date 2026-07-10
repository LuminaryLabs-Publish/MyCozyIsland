# Render Audit: WebGPU Render Consumption Fixture Gap

Timestamp: 2026-07-10T10-19-39-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Render surface

The repo has a visual/render surface through `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2`.

## Current render path

```txt
DomainServiceKit descriptors
  -> deterministic domain snapshot
  -> render snapshot
  -> Three/WebGPU scene
  -> WebGPURenderer
  -> stylized world
  -> WebGPU ocean
  -> WebGPU foam
  -> atmosphere volume textures
  -> volumetric clouds
  -> rolling fog
  -> WebGPU post pipeline
  -> canvas frame
```

## Gap

Render systems consume many source rows, but there is no stable render-consumption ledger that says which source family was consumed, ignored, fallback-rendered, quality-degraded, or recovered.

`globalThis.CozyIsland.getState()` is useful for debugging, but it is not a fixture-proof render readback surface because it exposes aggregate runtime state and live objects rather than normalized proof rows.

## Required next proof rows

```txt
route token row
source fingerprint row
kit catalog status row
render snapshot normalized row
world render consumption row
ocean render consumption row
foam render consumption row
atmosphere volume texture row
cloud volume texture row
fog volume texture row
post pipeline consumption row
performance degrade/recover row
frame summary row
```

## Not next

- renderer replacement
- visual polish
- cloud rewrite
- ocean rewrite
- fog rewrite
- screenshot automation

## Next render-safe ledge

```txt
WebGPU render consumption ledger + JSON-safe host readback fixture
```
