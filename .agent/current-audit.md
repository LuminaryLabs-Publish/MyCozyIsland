# Current Audit: MyCozyIsland Grass Consumer and Resource Ownership

Last updated: `2026-07-10T19-11-19-04-00`

## Current runtime identity

`MyCozyIsland` is a static WebGPU-first scenic exploration route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

The route validates exactly 50 declared DomainServiceKit manifests, creates deterministic terrain/ocean/vegetation/atmosphere descriptors, constructs browser render consumers, runs a camera-rail-to-first-person scenario, applies a frame-interval quality policy, and exposes aggregate live state through `globalThis.CozyIsland`.

The active world-render facade now points to `renderer-world-layered-grass.js`. That wrapper suppresses legacy grass in the base renderer and injects a three-layer unlit alpha-cutout instanced grass renderer.

## Interaction loop

```txt
route shell and import map
  -> validate the 50-kit catalog
  -> initialize WebGPURenderer and startup quality
  -> compose deterministic source snapshot
  -> create camera rail and scenario
  -> createStylizedWorldRenderer(snapshot)
     -> shallow-copy snapshot with grass-patch rows emptied
     -> create base world renderer from the filtered snapshot
     -> read original grass-patch rows
     -> create procedural CanvasTexture atlas
     -> create three crossed quad layers in one BufferGeometry
     -> create one unlit alpha-tested material
     -> project source rows into one InstancedMesh
     -> attach grass group to base world group
     -> discard grass renderer handles outside the wrapper
  -> create ocean, foam, volume texture, cloud, fog, and post consumers
  -> consume wheel, pointer, keyboard, blur, debug-toggle, and resize input
  -> scenario.tick(dt)
  -> project camera state
  -> update base world and foam
  -> execute no-op grass update
  -> sample frame interval
  -> submit post pipeline
  -> expose aggregate host state
```

## Domains in use

```txt
route shell, loader, error, hint, debug, import-map, and route-token domains
DomainServiceKit manifest, capability, dependency, and exact-count validation
seed identity, scoped random, stable hash, noise, FBM, and environment clock
wind field, weather state, illumination, and aerial perspective
terrain surface, terrain fields, biome weighting, shoreline, terrain LOD, ground contact, and paths
ocean floor, waves, optics, foam, underwater atmosphere, caustics, and sun glitter
vegetation archetypes, deterministic placement, per-type grouping, wind descriptors, and vegetation LOD
rock placement, prop placement, campfire atmosphere, and ground contact
grass-patch source production and source grouping
legacy stylized world rendering
layered grass facade substitution and legacy source suppression
procedural grass atlas generation
three-layer grass geometry generation
unlit alpha-cutout material policy
grass instance transform and tint projection
cloud weather, density, lighting, LOD, shadow, and horizon
fog density, advection, and bounded volume placement
material descriptors, render archetypes, render quality, fallback, and immutable render snapshot
camera rail, first-person clearing movement, and scenario state
WebGPU host, scene, sky, lighting, and renderer composition
ocean, foam, atmosphere volume, cloud, fog, and post consumers
performance sampling, degrade/recover callbacks, and quality mutation
browser input, resize, animation-loop, and debug-overlay domains
legacy aggregate diagnostics
Node static checks and deterministic domain smoke validation
planned grass source ledger, resource owner, disposal, readback, and fixture domains
```

## Services offered by the kits

- **Catalog:** kit identity, owned domain, capability provision, dependency closure, metadata, and exact-count validation.
- **Determinism:** stable seed derivation, scoped random streams, hashes, value noise, and FBM.
- **Environment:** environment clock, wind field, weather, illumination, aerial perspective, and vegetation-wind descriptors.
- **Terrain:** height/surface sampling, biome weights, shoreline fields, LOD, ground contact, and path descriptors.
- **Ocean:** floor profile, wave state, optics, foam contours, underwater state, caustics, and sun glitter.
- **Vegetation:** archetype catalog, placement graph, source grouping, transforms, phase/tint rows, LOD, rocks, props, and campfire descriptors.
- **Atmosphere:** cloud/fog recipes, lighting, shadows, horizon bands, advection, bounded placement, and volume textures.
- **Render description:** material catalog, render archetypes, startup quality, fallback policy, and immutable render snapshot.
- **Scenario:** camera input, rail reveal, first-person movement, scenario tick/reset, and render snapshots.
- **Base world rendering:** terrain, seabed, paths, vegetation, rocks, props, campfire, grouping, and time updates.
- **Layered grass rendering:** source suppression, atlas drawing, three crossed planes, alpha-test material, instance matrices/colors, and group composition.
- **Other rendering:** ocean, foam, volumetric cloud, rolling fog, post-processing, WebGL2 fallback, and debug overlay.
- **Performance:** smoothed frame interval, hysteresis, degrade/recover callbacks, and aggregate budget state.
- **Validation:** route/catalog/source assertions and deterministic domain composition checks.

## Declared source kits

The authoritative declared catalog contains these 50 kits:

```txt
debug-overlay-host-kit
webgl2-fallback-renderer-kit
webgpu-compute-atmosphere-renderer-kit
webgpu-foam-renderer-kit
webgpu-ocean-renderer-kit
webgpu-performance-budget-kit
webgpu-post-processing-renderer-kit
webgpu-rolling-fog-renderer-kit
webgpu-stylized-material-renderer-kit
webgpu-volumetric-cloud-renderer-kit
camera-rail-sequence-kit
cozy-island-scenario-kit
terrain-surface-domain-kit
vegetation-placement-domain-kit
aerial-perspective-domain-kit
campfire-atmosphere-domain-kit
cloud-density-field-domain-kit
cloud-horizon-band-domain-kit
cloud-lighting-domain-kit
cloud-lod-domain-kit
cloud-shadow-domain-kit
cloud-weather-domain-kit
fog-advection-domain-kit
fog-field-domain-kit
fog-volume-placement-domain-kit
ground-contact-domain-kit
illumination-domain-kit
ocean-caustics-domain-kit
ocean-floor-profile-domain-kit
ocean-optics-domain-kit
ocean-wave-domain-kit
prop-archetype-domain-kit
render-archetype-domain-kit
render-quality-domain-kit
render-snapshot-domain-kit
rock-archetype-domain-kit
shoreline-field-domain-kit
shoreline-foam-domain-kit
stylized-material-descriptor-domain-kit
sun-glitter-domain-kit
terrain-biome-field-domain-kit
terrain-lod-domain-kit
underwater-atmosphere-domain-kit
vegetation-archetype-domain-kit
vegetation-lod-domain-kit
vegetation-wind-domain-kit
weather-state-domain-kit
wind-field-domain-kit
deterministic-seed-domain-kit
environment-clock-domain-kit
```

## Runtime-implied kits

```txt
webgpu-static-shell-kit
webgpu-importmap-kit
webgpu-route-token-kit
webgpu-render-host-kit
webgpu-quality-selection-kit
webgpu-scene-composition-kit
sky-gradient-kit
lighting-composition-kit
world-render-consumer-kit
layered-alpha-grass-render-consumer-kit
grass-alpha-atlas-generator-kit
grass-render-substitution-adapter-kit
ocean-render-consumer-kit
foam-render-consumer-kit
atmosphere-texture-compute-kit
volumetric-cloud-consumer-kit
rolling-fog-consumer-kit
post-pipeline-consumer-kit
performance-budget-consumer-kit
input-consumer-kit
resize-consumer-kit
animation-loop-kit
legacy-CozyIsland-diagnostics-kit
node-static-check-kit
node-domain-smoke-kit
```

## Source-backed grass ownership finding

The export chain is:

```txt
src/kits/index.js
  -> src/kits/renderers.js
  -> renderer-world-layered-grass.js
  -> renderer-world.js
```

Verified behavior:

- `renderers.js` aliases the wrapper as the public `createStylizedWorldRenderer()` implementation.
- `createSnapshotWithoutLegacyGrass()` creates a shallow filtered snapshot and sets only `vegetation.byType["grass-patch"]` to an empty array.
- The base renderer therefore receives zero grass rows while the wrapper reads the original rows.
- `createGrassAlphaAtlas()` creates a DOM canvas and returns a `THREE.CanvasTexture`.
- `createUnlitGrassMaterial()` calls `createGrassAlphaAtlas()` inline, so no dedicated resource owner retains the texture handle.
- `createLayeredGrassGeometry()` allocates one `BufferGeometry` containing three quad layers.
- `createLayeredGrassRenderer()` allocates one `InstancedMesh` when source rows exist; its zero-row path returns only a group and no-op update.
- The inner grass renderer can return `mesh`, but the outer world renderer returns only `group` and `update()`.
- Neither layer exposes `getState()`, source reconciliation, resource counts, ownership identity, or `dispose()`.
- The base world renderer also returns only `group` and `update()`.
- Grass `update()` is a no-op. Placement phase influences startup height only.
- `globalThis.CozyIsland.getState()` does not expose grass policy, source count, rendered count, resource state, or disposal state.

## Missing next kits

```txt
layered-grass-render-policy-kit
layered-grass-source-validator-kit
layered-grass-source-consumption-ledger-kit
layered-grass-atlas-descriptor-kit
layered-grass-geometry-descriptor-kit
layered-grass-resource-owner-kit
layered-grass-disposal-result-kit
layered-grass-readback-kit
layered-grass-catalog-contract-kit
node-layered-grass-consumer-fixture-kit
browser-layered-grass-lifecycle-smoke-kit
```

## Main finding

The visual renderer is active, but the source and GPU-resource lifecycle remain implicit. The next safe change is not more grass fidelity. It is to establish a single authoritative grass consumer, retain every owned resource handle, expose immutable JSON-safe state, and prove complete idempotent disposal while preserving the current rendering output.

## Next safe ledge

```txt
MyCozyIsland Layered Grass Consumer Ledger + Resource Ownership Fixture Gate
```