# My Cozy Island

A standalone **WebGPU-first NexusEngine experiment** focused on high-performance volumetric atmosphere: a warm hero cloud tower, layered horizon clouds, terrain-following rolling fog, stylized terrain and vegetation, animated shoreline foam, and a TSL-displaced ocean.

The live app is a static site. Open `index.html` through GitHub Pages or any local HTTP server.

## Runtime architecture

```txt
NexusEngine Core World domain
→ deterministic 48 m world cells and ordered providers
→ compatibility render snapshot
→ Three.js WebGPURenderer / TSL
→ GPU-computed 3D cloud and fog density volumes
→ bounded volumetric cloud raymarching
→ depth-aware reduced-resolution fog pass
→ stylized world, ocean, foam, and atmosphere composition
```

The application contains **50 focused local domain, sequence, host, and renderer kits** under `src/kits/`, coordinated by the pinned NexusEngine `core-world-domain`. Semantic generation stays deterministic and renderer-independent; WebGPU and Three.js remain in renderer/host kits.

## Major visual systems

- WebGPU compute-generated 3D density textures for cloud and fog volumes.
- Bounded volumetric hero cloud with self-shadow approximation, warm tops, cool cores, early ray termination, and horizon LOD volumes.
- Rolling fog using a `VolumeNodeMaterial`, wind-advection, Bayer jitter, scene-depth occlusion, reduced-resolution rendering, and Gaussian denoising.
- Domain-warped island terrain with slope, curvature, shore-distance, moisture, and biome fields.
- Core World cell ownership for terrain, biome, shoreline, vegetation, rocks, props, and presentation descriptors.
- Ordered foundation, classification, population, and presentation provider phases.
- Portable world snapshots that exclude Three.js objects, typed arrays, and GPU resources.
- Deterministic suitability-based vegetation and rock placement with instancing and GPU vertex wind.
- TSL ocean wave displacement and normal reconstruction.
- Animated multi-band shoreline foam with no per-frame geometry allocation.
- Toon-shaded terrain, trees, props, and campfire lighting, with unlit three-layer alpha-cutout grass.
- Automatic `ultra`, `high`, `medium`, and `low` quality profiles plus sustained-frame-time degradation and recovery.
- WebGL2 backend fallback through Three.js `WebGPURenderer`; compute volumes fall back to deterministic CPU-baked `Data3DTexture` assets.

## Controls

```txt
Mouse wheel / trackpad   descend from the aerial reveal
Drag                     orbit during reveal; look in first person
W A S D                  move inside the central clearing after landing
H                        toggle renderer diagnostics
```

Force a quality tier with `?quality=ultra`, `?quality=high`, `?quality=medium`, or `?quality=low`. The default world path is `?world=core`; use `?world=legacy` for the temporary rollback path.

## Local development

```bash
npm install
npm test
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Documentation

- `docs/WEBGPU_ATMOSPHERE_ARCHITECTURE.md` — rendering and domain boundaries.
- `docs/KIT_CATALOG.md` — all 50 kits, capabilities, and dependencies.
- `docs/OPEN_SOURCE_REFERENCES.md` — upstream implementations reviewed before the rebuild.
- `docs/WORLD_LAYER_MIGRATION.md` — Core World provider ownership, parity gates, and lifecycle rules.

## Debug surface

After startup:

```js
CozyIsland.getState()
CozyIsland.kitCatalogStatus
CozyIsland.performanceBudget.getState()
CozyIsland.worldRuntime.getState()
CozyIsland.worldQuery.surfaceAt(0, 0)
```

The debug surface reports backend, quality, frame rate, active cloud/fog step counts, local kit count, Core World mode, active cells, and provider cell counts.

## Deployment

The project is static and requires no build step. GitHub Pages serves `index.html`, ES modules, and the domain kits directly. Three.js `0.185.0` and NexusEngine commit `38229f59c22cb40024ffd13a9f48040de759f5d7` are pinned through the import map.
