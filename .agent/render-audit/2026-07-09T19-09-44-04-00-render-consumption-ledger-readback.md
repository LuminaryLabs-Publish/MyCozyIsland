# Render Audit: Render Consumption Ledger Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T19-09-44-04-00`

## Render surface

The repo has a visual/render surface. `src/main-cloudform.js` creates a Three.js renderer, scene, fog, lights, camera, mesh adapters, instanced grass, point-cloud clouds, and a requestAnimationFrame loop.

## Current render loop

```txt
source descriptors
  -> floorMesh, terrainMesh, waterMesh, foamMesh, pathMesh
  -> objGroup, fenceGroup, campfireMesh, smokeMesh, grassMesh, heroCloudGroup
  -> scene.add(...)
  -> frame(now)
  -> update sea, smoke, flame, cloud drift, camera
  -> renderer.render(scene, camera)
```

## Render gaps

```txt
No render-consumption ledger exists.
No source family records requested, consumed, skipped, or fallback-rendered rows.
Ocean-floor object placements are produced by the source kit but not consumed by the active scene.
Non-tree foliage falls through to a generic rock adapter.
Grass patch metadata and batch descriptors are not reconciled with one-cone-per-patch instancing.
Cloud point geometry cache uses cloud id without descriptor fingerprint readback.
Renderer, scene, and camera snapshots are not normalized or JSON-serializable.
Legacy host exposes live cached BufferGeometry objects.
```

## Next render ledge

```txt
Add render-consumption rows for terrain, floor, water, shoreline, path, foliage, fence, campfire, smoke, grass, and clouds.
Add renderer/scene/camera snapshot records.
Add source count, consumed count, skipped count, fallback count, and reason fields.
Expose records through additive CozyIslandHost readback.
Validate records in a DOM-free browser consumer fixture.
```

## Preserve

```txt
visible scene composition
Three.js 0.160.0 CDN import
route token hero-cloud-4
legacy globalThis.CozyIsland diagnostics
current grass and cloud visible behavior
```