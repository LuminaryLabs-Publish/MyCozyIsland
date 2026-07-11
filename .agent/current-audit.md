# Current Audit: MyCozyIsland Core World Focus Transaction Authority

Last updated: `2026-07-11T08-41-02-04-00`

## Summary

The Core World wrapper is deterministic on the normal path, but focus movement is not one transaction. Wrapper bookkeeping changes before the pinned runtime finishes, `setFocus()` and `updateWorld()` are separate production commits, provider stores mutate during the update, results collapse to Boolean, and current tests exercise only a materially simpler fake runtime.

## Plan ledger

**Goal:** define a retriable focus transaction whose accepted result correlates wrapper state, production Core World state, provider-store state and the world revision available to rendering.

- [x] Reconcile the full Publish inventory with central tracking.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` after avoiding active writes on the nominal oldest target.
- [x] Trace route startup and the per-frame camera-to-focus path.
- [x] Read the pinned production Core World builder at commit `38229f59c22cb40024ffd13a9f48040de759f5d7`.
- [x] Compare production selection, provider and rollback behavior with the local fake runtime.
- [x] Identify every active domain, service group and kit.
- [x] Define command, result, revision, checkpoint, rollback and fixture boundaries.
- [x] Change no runtime behavior.

## Runtime identity

```txt
route:               src/main-cloudform.js?v=core-world-1
Three.js:            0.185.0
NexusEngine commit:  38229f59c22cb40024ffd13a9f48040de759f5d7
world mode:          core by default
rollback mode:       ?world=legacy
world id:            world:cozy-island-webgpu-v3
world seed:          cozy-island-webgpu-v2
partition:           48 m uniform grid, radius 3
initial cells:       49
provider count:      7
local kit count:     50
```

## Interaction loop

```txt
route boot
  -> resolve pinned modules
  -> validate kit catalog
  -> initialize renderer/backend
  -> createCozyIslandWorldRuntime()
  -> prepare()
       prepared = true
       commitFocus(origin)
  -> create startup compatibility snapshot
  -> build static whole-island render graph
  -> register input and animation loop
  -> frame:
       scenario.tick(dt)
       read camera render snapshot
       apply camera transform
       updateWorldFocus(camera.position, camera.mode, dt)
       update world/foam time uniforms
       sample quality
       render post pipeline
       project diagnostics
```

Player interaction remains scroll-to-descend, pointer drag, WASD movement inside the clearing, H diagnostics, blur key clearing and viewport resize.

## Focus path

```txt
updateWorldFocus(position, mode, dt)
  -> accumulate elapsed focus time
  -> choose camera position only in first-person mode
  -> locate target cell
  -> compare target cell, elapsed interval and movement threshold
  -> commitFocus(target)
       wrapper lastFocus = target
       engine.n.coreWorld.setFocus(worldId, target)
       engine.n.coreWorld.updateWorld(worldId)
       wrapper worldSnapshot = returned snapshot
       wrapper lastCellKey = target cell
       wrapper focusAccumulator = 0
  -> return true
```

The normal path gives a stable 49-cell active set. The failure path is not represented.

## Production Core World contract

The pinned Core World domain owns world identity, partitions, cells, surfaces, effect descriptors, provider contracts, composition and snapshots. Its builder:

- validates world and provider definitions;
- commits `setFocus()` independently as `focusChanged`;
- derives `required`, `updated`, `retained` and `released` cells;
- releases providers in reverse order;
- prepares and updates providers in phase order;
- validates capabilities and records diagnostics;
- rolls back providers prepared for a failed new cell;
- marks cells `active` or `failed`;
- commits cell state separately as `cellsChanged`;
- rejects async provider methods.

It does not expose an atomic `setFocusAndUpdateWorld()` operation.

## Fake runtime contract

The local fake:

- stores focus by direct assignment;
- returns a flat cell array from partition selection;
- infers prepare/update/release itself;
- invokes every provider without `matches()` or capability admission;
- has no failed-cell state, diagnostic model or production rollback result;
- does not model separate `focusChanged` and `cellsChanged` commits;
- cannot inject an update failure after focus commit with production-equivalent readback.

Current `core-world-runtime.mjs` and `world-cell-lifecycle.mjs` inject this fake and prove only the normal path.

## Main failure states

### Initial prepare poisoning

```txt
prepare()
  -> prepared = true
  -> commitFocus(origin) throws
  -> prepared remains true
  -> worldSnapshot remains null or stale
  -> second prepare() returns worldSnapshot without retry
```

### Focus/world split

```txt
commitFocus(target)
  -> wrapper lastFocus becomes target
  -> production setFocus commits target
  -> updateWorld throws during selection/provider work
  -> Core World focus remains target
  -> wrapper snapshot/cell key remain previous
  -> provider stores may reflect release/prepare side effects
  -> visible renderer remains startup snapshot
```

### Observation collapse

`updateWorldFocus()` returns only `false` or `true`. It cannot represent:

```txt
unchanged
committed-complete
committed-degraded
rejected-stale
rejected-invalid
failed-before-focus
failed-after-focus
failed-provider-rolled-back
failed-provider-partial
```

## Domain map

### Platform and route host

Pinned module admission, kit-catalog validation, renderer/backend startup, loader/error projection, callback registration, animation-loop hosting and global diagnostic exposure.

### NexusEngine Core World

World registration, uniform-grid partitioning, focus state, cell selection, provider phase/capability admission, lifecycle transitions, diagnostics, snapshots, provider rollback/release and reset.

Imported services:

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
createTerrainProviderAdapter
defineWorldEffectProvider
```

### Product world wrapper

Composition creation, pinned runtime resolution, seven-provider registration, initial prepare, focus throttling, wrapper snapshot/query/state, compatibility bridge and reset/dispose.

### Provider domains

```txt
FOUNDATION
  cozy-island-terrain-provider

CLASSIFICATION
  biome-classification-provider
  shoreline-classification-provider

POPULATION
  vegetation-provider
  rock-provider
  prop-provider

PRESENTATION
  cell-presentation-provider
```

### Scenario and gameplay

Camera rail reveal, first-person clearing movement, deterministic environment clock and camera-driven Core World focus selection.

### Semantic world domains

Terrain surface, clearing plateau, biome, shoreline, LOD, ground contact, paths, vegetation, rocks, props, campfire, ocean, foam, wind, weather, illumination, clouds, fog and aerial perspective.

### Rendering

WebGPU/WebGL2 host, static whole-island graph, layered grass, ocean, foam, generated atmosphere volumes, volumetric clouds, rolling fog, post processing, adaptive performance and debug projection.

### Validation and deployment

Static/catalog checks, deterministic domain tests, fake Core World normal-path tests, parity fixtures, isolated renderer cache/disposal tests and static GitHub Pages deployment.

## Services offered by the 50 local kits

```txt
determinism and time:
  stable seed, scoped RNG, hash/noise and deterministic environment clock

terrain and world:
  height, normal, slope, fields, biome, shoreline, LOD, ground contact,
  path, vegetation, rocks, props and campfire descriptors

ocean and atmosphere:
  floor, waves, optics, underwater, caustics, glitter, foam, wind,
  weather, illumination, clouds, fog and aerial perspective

render descriptors:
  quality, materials, archetypes, immutable compatibility snapshots and fallback policy

render adapters:
  world, grass, ocean, foam, atmosphere volume, cloud, fog, post,
  performance and debug projection

scenario:
  camera rail, first-person movement, input state, tick, reset and snapshot
```

## Complete local kit inventory

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

## Required focus authority

```txt
FocusCommand
FocusAdmissionResult
FocusCheckpoint
ProviderStoreCheckpoint
FocusTransactionPlan
FocusTransactionResult
WorldRevision
ProviderRevisionSet
FocusRollbackResult
FocusJournalEntry
FocusObservation
```

An accepted result must correlate:

```txt
sessionId
sessionEpoch
commandId
previousWorldRevision
worldRevision
previousFocus
focus
previousCellKey
cellKey
selection counts
provider result rows
Core World state sequence
wrapper snapshot fingerprint
provider-store fingerprint
completion policy
result fingerprint
```

## Next safe ledge

```txt
MyCozyIsland Pinned Core World Focus Transaction Authority
+ Production/Fake Contract Parity and Failure Fixture Gate
```

The transaction should be implemented in the product wrapper first unless the required atomic primitive is generalized and accepted into the existing NexusEngine Core World domain. Do not create a parallel world framework.
