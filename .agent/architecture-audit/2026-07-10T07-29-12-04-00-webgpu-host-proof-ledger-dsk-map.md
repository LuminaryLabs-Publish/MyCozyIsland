# Architecture Audit: WebGPU Host Proof Ledger DSK Map

Timestamp: 2026-07-10T07-29-12-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Current DSK shape

`src/main-cloudform.js` validates the DomainServiceKit catalog, composes deterministic domain snapshots, creates WebGPU render consumers, and owns the browser frame loop.

```txt
source descriptors
  -> deterministic seed / environment / terrain / ocean / vegetation / atmosphere / render / sequences
  -> render snapshot and camera sequence
  -> WebGPU runtime consumers
  -> live frame loop
  -> legacy globalThis.CozyIsland diagnostics
```

## Source domains

- Determinism: seed, random stream, and repeatable descriptor generation.
- Environment: clock, wind, weather, and illumination.
- Terrain: surface, biome, shoreline, LOD, and ocean floor profile.
- Ocean: waves, optics, underwater atmosphere, caustics, glitter, and foam.
- Vegetation: archetypes, placement, ground contact, wind, LOD, rocks, props, and campfire atmosphere.
- Atmosphere: cloud weather, cloud density, cloud lighting, LOD, shadow, horizon, fog density, fog advection, fog volumes, and aerial perspective.
- Render descriptors: material catalog, render archetypes, fallback policy, and render snapshot.
- Sequences: camera rail and cozy island scenario.

## Consumer domains

- WebGPU renderer and quality selection.
- Scene composition, sky, lighting, and fog.
- Stylized world renderer.
- WebGPU ocean renderer.
- WebGPU foam renderer.
- Atmosphere volume texture compute.
- Volumetric cloud renderer.
- Rolling fog renderer.
- WebGPU post pipeline.
- Wheel, pointer, keyboard, blur, and resize consumers.
- Animation loop and performance budget sampler.
- Legacy debug and error DOM projection.

## Architecture gap

The DSK source side is well represented, but the host proof seam is thin. The runtime can validate kit manifests and can smoke-compose deterministic domains, yet the browser loop has no stable ledger that maps source rows to consumed render, input, scenario, camera, volume, and performance rows.

## Required next boundary

Add an additive host-proof boundary without replacing renderers:

```txt
source profile
  -> stable source fingerprints
  -> kit catalog readback
  -> normalized render snapshot
  -> input/scenario/camera result rows
  -> volume/performance result rows
  -> render-consumption ledger
  -> JSON-safe CozyIslandHost.getState()
  -> Node fixture assertions
```

## Do not start next with

- visual rewrite
- cloud rewrite
- ocean rewrite
- fog rewrite
- camera retune
- renderer replacement
- route-token churn
- new route content

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Proof Ledger Refresh + Node Consumer Fixture Gate
```
