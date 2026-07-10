# Current Audit: MyCozyIsland Layered Grass Renderer Authority

Last updated: 2026-07-10T17-38-35-04-00

## Current runtime identity

`MyCozyIsland` is a static WebGPU-first volumetric island route driven by `index.html` and `src/main-cloudform.js?v=webgpu-volumetric-2` with Three/WebGPU `0.185.0`.

The route validates exactly 50 declared DomainServiceKit manifests, composes deterministic terrain/ocean/vegetation/atmosphere descriptors, builds WebGPU/WebGL2 consumers, runs a camera-rail-to-first-person scenario, applies a frame-interval quality policy, and exposes aggregate live diagnostics through `globalThis.CozyIsland`.

The latest runtime change replaced the world-renderer export with a wrapper that removes legacy grass from the base renderer and injects a three-layer unlit alpha-cutout instanced grass renderer.

## Interaction loop

```txt
route shell and import map
  -> validate 50-kit catalog
  -> initialize WebGPURenderer and startup quality
  -> compose deterministic source snapshot
  -> create camera rail and scenario
  -> createStylizedWorldRenderer(snapshot)
     -> clone snapshot with vegetation.byType["grass-patch"] emptied
     -> create legacy base world renderer
     -> consume original grass-patch rows
     -> generate alpha atlas with a DOM canvas
     -> create three crossed plane layers
     -> create one InstancedMesh for all grass rows
     -> attach grass group to base world group
  -> create ocean/foam/volume/cloud/fog/post consumers
  -> consume wheel/pointer/keyboard/blur/resize input
  -> scenario.tick(dt)
  -> project camera from scenario snapshot
  -> update base world and foam
  -> grass update executes as a no-op
  -> sample performance budget
  -> submit post pipeline
  -> expose aggregate host state
```

## Domains in use

```txt
static route shell, import map, route token, loader, error, hint, and debug surfaces
DomainServiceKit manifest and capability validation
deterministic seed, identity, noise, and environment clock
wind, weather, illumination, and aerial perspective
terrain surface, fields, biome, shoreline, LOD, ground contact, and paths
ocean floor, waves, optics, foam, underwater atmosphere, caustics, and glitter
vegetation archetypes, deterministic placement, wind descriptors, LOD, rocks, props, and campfire
grass-patch descriptor production and source grouping
legacy stylized world rendering
layered grass substitution and source suppression
procedural alpha-atlas generation
three-plane grass geometry construction
unlit alpha-cutout material policy
instanced grass transform/color projection
cloud weather, density, lighting, LOD, shadow, and horizon
fog density, advection, and volume placement
material, render archetype, quality, fallback, and immutable snapshot descriptors
camera rail, first-person clearing movement, and scenario state
WebGPU host and scene composition
ocean, foam, cloud, fog, volume-texture, and post consumers
frame interval sampling and adaptive quality mutation
wheel, pointer, keyboard, blur, debug-toggle, resize, and animation-loop input
legacy live diagnostics
Node static and deterministic domain smoke validation
planned grass policy, consumption result, resource lifecycle, readback, and fixture domains
```

## Services offered by the kits

- Catalog services: kit identity, domain ownership, capability provision, dependency closure, metadata, and exact-count validation.
- Determinism services: scoped seeds, stable hashes, seeded random streams, value noise, and FBM.
- Environment services: clock, wind, weather, illumination, aerial perspective, and vegetation-wind descriptors.
- Terrain services: surface/height/field sampling, biome weights, shoreline fields, LOD, ground contact, and paths.
- Ocean services: floor profile, wave spectrum, optics, foam contours, underwater state, caustics, and sun glitter.
- Vegetation services: archetypes, placement graph, per-type grouping, instance transforms, phase/tint values, LOD, rocks, props, and campfire descriptors.
- Atmosphere services: cloud/fog recipes, lighting, shadows, horizon bands, advection, bounded placement, and volume textures.
- Render-description services: materials, render archetypes, startup quality, fallback policy, and immutable source snapshot.
- Sequence/gameplay services: camera input, rail reveal, first-person movement, scenario tick/reset, and render snapshots.
- Base-world render services: terrain, seabed, vegetation, rocks, props, paths, fire, shared groups, and time updates.
- Layered-grass services: legacy grass suppression, deterministic atlas drawing, three crossed alpha-cutout planes, instance matrix/color projection, depth-writing unlit material, and base-group composition.
- Other render services: ocean, foam, volumetric clouds, rolling fog, post processing, debug overlay, and renderer fallback.
- Performance services: smoothed frame interval, hysteresis, degrade/recover callbacks, and aggregate state.
- Validation services: static route/catalog/source assertions and deterministic domain composition smoke tests.

## Implemented kits

The authoritative declared list remains the 50 entries in `src/kits/catalog.js` and `.agent/kit-registry.json`.

The route also has runtime-implied adapter responsibilities. The recent renderer adds three previously undocumented implied kits:

```txt
layered-alpha-grass-render-consumer-kit
grass-alpha-atlas-generator-kit
grass-render-substitution-adapter-kit
```

They are implemented as functions inside `src/kits/renderer-world-layered-grass.js`, not as declared DomainServiceKit manifests.

## Layered grass authority finding

The active export chain is:

```txt
src/kits/index.js
  -> src/kits/renderers.js
  -> renderer-world-layered-grass.js
  -> renderer-world.js
```

`renderers.js` exports the wrapper under the same `createStylizedWorldRenderer` name that previously identified the base renderer. This preserves call sites but hides the new adapter boundary from the catalog and host.

Verified source behavior:

- `createSnapshotWithoutLegacyGrass()` shallow-copies the source snapshot and replaces only `vegetation.byType["grass-patch"]` with an empty array.
- The base renderer consumes the modified snapshot; the wrapper consumes the original grass rows.
- The alpha atlas is generated with `document.createElement("canvas")`, making resource construction browser-only.
- Three quad layers at fixed angles are merged into one geometry and one instanced draw.
- The material is `MeshBasicNodeMaterial`, unlit, double-sided, alpha-tested, alpha-to-coverage enabled, depth-writing, non-tone-mapped, and fog-enabled.
- Placement phase currently affects only static height variation; no wind or per-frame grass state is applied.
- `mesh.userData.grassRenderPolicy` contains a local policy object, but the wrapper does not expose it.
- No `dispose()` method releases the generated texture, geometry, material, or mesh resources.
- No result records source row count, suppressed legacy count, rendered instance count, atlas identity, geometry identity, or resource state.
- The 50-kit catalog still describes one generic stylized-world adapter and does not declare the layered grass capability.

## Missing next kits

```txt
layered-grass-render-policy-kit
layered-grass-source-consumption-result-kit
layered-grass-atlas-descriptor-kit
layered-grass-geometry-descriptor-kit
layered-grass-resource-owner-kit
layered-grass-readback-kit
layered-grass-catalog-contract-kit
node-layered-grass-fixture-kit
browser-layered-grass-lifecycle-smoke-kit
```

## Main finding

The visual change is active, but the renderer has no explicit domain identity, lifecycle contract, or proof boundary. Additional grass tuning would compound a hidden adapter that cannot prove one-and-only-one consumption, deterministic policy, resource disposal, or host-visible state.

## Next safe ledge

```txt
MyCozyIsland Layered Grass Renderer Authority + Lifecycle Fixture Gate
```

Preserve the current three-layer unlit alpha-cutout appearance while making the grass source, policy, resource ownership, and validation surface explicit.