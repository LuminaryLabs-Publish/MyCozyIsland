# Render Audit: WebGPU Render Consumption Host Proof Gap

Timestamp: 2026-07-10T07-29-12-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Render surface

The route has a visual/render surface through `index.html`, `src/main-cloudform.js`, Three/WebGPU 0.185.0, WebGPU world/ocean/foam renderers, atmosphere volume textures, volumetric clouds, rolling fog, and the post pipeline.

## Current render loop

```txt
create WebGPURenderer
  -> choose backend/quality
  -> compose deterministic domain snapshot
  -> create render snapshot
  -> create scene/fog/sky/lights/camera
  -> create stylized world renderer
  -> create WebGPU ocean renderer
  -> create WebGPU foam renderer
  -> create atmosphere volume textures
  -> create volumetric cloud renderer
  -> create rolling fog renderer
  -> create post pipeline
  -> animation loop updates scenario, world, foam, performance, debug, and post render
```

## Existing proof

- `npm test` statically checks WebGPU route tokens and kit catalog shape.
- Domain smoke checks deterministic source composition.
- The runtime exposes legacy `globalThis.CozyIsland` diagnostics.

## Missing render proof rows

- Render source family consumed by each renderer.
- Render snapshot fingerprint.
- Render archetype consumption rows.
- Ocean source-to-render row.
- Foam source-to-render row.
- Atmosphere volume texture creation result row.
- Cloud volume texture source/size row.
- Fog volume texture source/size row.
- Performance budget sample, degrade, and recover rows.
- WebGPU post pipeline input/output row.
- JSON-safe host render ledger.

## Required render ledger shape

```txt
renderFrameId
sourceFingerprint
kitCatalogRevision
consumerId
consumerKind
sourceFamilies[]
accepted
reason
counts
quality
textureSizes
performanceLevel
warnings[]
```

## Main finding

The renderer should stay stable next. The useful step is an additive ledger that proves what the current WebGPU consumers consumed and why, then exposes it through `globalThis.CozyIslandHost` for a Node fixture.

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Proof Ledger Refresh + Node Consumer Fixture Gate
```
