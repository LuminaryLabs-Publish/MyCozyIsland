# My Cozy Island

A standalone **WebGPU-first NexusEngine experiment** focused on a stylized island, separated island and sea-floor terrain, transparent anime water, volumetric clouds, rolling fog, and depth-correct final-pass shoreline foam.

The live app is a static site. Open `index.html` through GitHub Pages or any local HTTP server.

## Runtime architecture

```txt
NexusEngine Core World
→ deterministic 48 m cells and ordered semantic providers
→ independent island and sea-floor terrain state
→ validated Core Graphics-inspired render-layer graph
→ Three.js WebGPU renderer adapter
→ background + opaque world + transparent anime water
→ rolling-fog composite
→ foam occlusion depth pass
→ final authored foam color composite
→ technical output transform
```

The application contains **50 focused local domain, sequence, host, and renderer kits** under `src/kits/`, coordinated by a pinned NexusEngine runtime. Semantic generation stays deterministic and renderer-independent; Three.js and WebGPU remain in host/renderer adapters.

## Major visual systems

- Independent island and sea-floor Core World providers.
- Coast-clipped island geometry with a six-meter submerged shelf instead of a square sea-level plane.
- Opaque toon-shaded sea-floor terrain with separate material classification.
- One physical transparent ocean mesh with transmission, IOR, clearcoat, Fresnel-compatible reflection, procedural waves, and sun highlights.
- A validated logical pass graph: background, opaque world, water, atmosphere, foam, output.
- Shoreline foam as the final authored scene-content layer.
- A dedicated foam depth prepass compared against opaque scene depth, preventing foam from showing through terrain, fences, rocks, vegetation, and props.
- WebGPU compute-generated 3D density textures for cloud and fog volumes.
- Bounded volumetric clouds and reduced-resolution depth-aware rolling fog.
- Deterministic suitability-based vegetation and rock placement with instancing.
- Unlit three-layer alpha-cutout grass with depth writing.
- Automatic `ultra`, `high`, `medium`, and `low` quality profiles.
- WebGL2 fallback through Three.js `WebGPURenderer` with deterministic CPU volume textures.

## Controls and camera contract

```txt
Mouse wheel / trackpad   descend from the aerial reveal
Drag                     orbit during reveal; look in first person
W A S D                  move inside the central clearing after landing
H                        toggle renderer diagnostics

Rail start FOV           55 degrees
First-person FOV         80 degrees
Player eye height        2.0 m above sampled terrain
```

Late rail positions and look targets are terrain-relative. Every interpolated rail sample is clamped above the procedural surface so the final descent cannot enter the clearing mound.

Force a quality tier with `?quality=ultra`, `?quality=high`, `?quality=medium`, or `?quality=low`. The default world path is `?world=core`; use `?world=legacy` for the temporary rollback path.

## Local development

```bash
npm install
npm test
python3 -m http.server 8080
```

Then open `http://localhost:8080/`.

## Documentation

- `docs/WEBGPU_ATMOSPHERE_ARCHITECTURE.md` — atmospheric rendering boundaries.
- `docs/KIT_CATALOG.md` — all 50 local kits and dependencies.
- `docs/WORLD_LAYER_MIGRATION.md` — Core World provider ownership and lifecycle.
- `docs/LAZY_WORLD_MATERIALIZATION.md` — bounded post-first-frame cell work.
- `docs/RENDER_LAYER_GRAPH.md` — terrain, water, fog, foam depth admission, camera projection, and output ordering.

## Debug surface

```js
CozyIsland.getState()
CozyIsland.camera.fov
CozyIsland.worldRuntime.getState()
CozyIsland.worldQuery.islandSurfaceAt(0, 0)
CozyIsland.worldQuery.seaFloorSurfaceAt(120, 0)
CozyIsland.renderLayerGraph
CozyIsland.renderPassOrder
CozyIsland.physicalRenderPassOrder
```

## Deployment

The project is static and requires no build step. GitHub Pages serves `index.html` and ES modules directly. Three.js `0.185.0` and NexusEngine commit `481cbf6df742e81279bd42245c4238c6a1fc69f2` are pinned through narrow browser-safe import-map entry points.
