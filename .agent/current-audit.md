# Current Audit: MyCozyIsland Core World Reset / Re-prepare Authority

Last updated: `2026-07-11T11-10-29-04-00`

## Summary

The product wrapper registers `world:cozy-island-webgpu-v3` once during construction. Its public `reset()` calls the pinned Core World `resetWorlds()` operation, which releases active cells, resets providers, clears runtime world definitions, and replaces coordination state. The wrapper then marks itself unprepared. A subsequent `prepare()` calls `setFocus()` and `updateWorld()` without registering the world again, so reset is not actually recoverable.

## Plan ledger

**Goal:** define a reusable reset and terminal disposal boundary that keeps Core World definitions, provider stores, lazy materialization, snapshots, and renderer admission coherent across a fresh world generation.

- [x] Reconcile all accessible Publish repositories with central tracking.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` under the oldest eligible fallback rule.
- [x] Read the product wrapper, pinned Core World domain, world-builder reset implementation, provider stores, materializer, host route, and tests.
- [x] Identify the interaction loop, domains, kits, and services.
- [x] Verify reset clears Core World runtime definitions.
- [x] Verify product prepare does not re-register after reset.
- [x] Verify tests cover prepare/dispose and cell turnover, not reset/re-prepare parity.
- [x] Define reset command, policy, generation, release result, re-registration, recovery result, and fixture boundaries.
- [x] Change no runtime behavior.

## Runtime identity

```txt
route:               src/main-cloudform.js?v=core-world-1
Three.js:            0.185.0
NexusEngine commit:  38229f59c22cb40024ffd13a9f48040de759f5d7
world id:            world:cozy-island-webgpu-v3
world seed:          cozy-island-webgpu-v2
partition:           48 m uniform grid, radius 3
initial active cells:49
provider count:      7
local kit count:     50
package version:     0.3.1
```

## Interaction loop

```txt
construction
  -> create deterministic legacy composition
  -> create terrain, biome, shoreline, vegetation, rock, prop, presentation providers
  -> create partition, surface, engine, and Core World domain
  -> register world definition once
  -> create query, bridge, and lazy materializer

prepare
  -> if already prepared return cached world snapshot
  -> mark prepared true
  -> commitFocus(origin)
       setFocus(worldId)
       updateWorld(worldId)
       materializer.sync()

runtime
  -> update focus at 10 Hz or cell crossing
  -> process one bounded materialization candidate after render
  -> expose coordination and provider counts

reset
  -> coreWorld.resetWorlds()
  -> materializer.reset()
  -> prepared false
  -> worldSnapshot null
  -> focus fields cleared

dispose
  -> reset()
  -> coreWorld.reset()
```

## Main finding

### Product contract mismatch

`reset()` is public on the reusable world-runtime object and leaves `prepare()` available, which implies the same wrapper can be prepared again. The implementation does not satisfy that contract.

### Pinned Core World behavior

The pinned `resetWorlds()` implementation:

```txt
disposeRuntime(clearDefinitions: true)
  -> release every active cell
  -> call provider.reset for every provider
  -> clear runtimeWorlds
createInitialWorldState()
commit reset state
```

After that operation, `setFocus(worldId)` cannot resolve a registered runtime definition.

### Provider and materializer split

Core World performs provider release/reset during `resetWorlds()`. The product wrapper then separately calls `materializer.reset()`. There is no combined result proving:

```txt
all provider releases completed
all provider stores are empty
materializer jobs were cancelled
world definition was retained or re-registered
new generation differs from the old one
fresh prepare recreated the expected 49 cells
```

### Failure and rollback gap

Provider reset failures are swallowed by the pinned runtime. The product wrapper receives no release diagnostics or rollback information. If a provider partially fails to reset, the wrapper still clears its own references and reports no failure.

### Snapshot and recovery gap

Core World supports portable coordination and provider snapshots, but the product wrapper exposes only the current world snapshot and compatibility render snapshot. It does not expose a versioned product checkpoint joining:

```txt
world definition identity
Core World coordination state
provider snapshots or provider-store fingerprints
materializer stage state
focus accumulator and cell key
scenario/environment state
renderer compatibility revision
```

## Domain map

### Platform and route host

Pinned module admission, catalog validation, loader/error projection, WebGPU/WebGL2 setup, browser input, resize, animation loop, pagehide disposal, adaptive performance, and global diagnostics.

### Core World coordination

World definition registration, partition, surface, focus, active-cell selection, ordered provider lifecycle, effect descriptors, snapshots, diagnostics, reset, and domain disposal.

### Product world wrapper

Legacy composition, provider construction, one-time registration, prepare, focus throttling, lazy materialization, query facade, compatibility snapshot bridge, reset, dispose, and state projection.

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

### Semantic world and gameplay

Deterministic seed/time, terrain, clearing, biome, shoreline, ground contact, paths, vegetation, rocks, props, campfire, camera rail, first-person movement, ocean, foam, wind, weather, illumination, clouds, fog, and aerial perspective.

### Rendering

Compatibility render snapshot, whole-island stylized renderer, layered grass, ocean, foam, cloud/fog volumes, post-processing, quality adaptation, cell-cache utilities, disposal helpers, and disconnected cell-aware renderer controller.

### Validation and deployment

Static catalog checks, deterministic domain smoke, Core World runtime/provider/query/population/snapshot/cell tests, lazy materialization, renderer cache/disposal tests, and GitHub Pages deployment.

## Services offered by the local kits

```txt
determinism and time
  stable seeds, scoped RNG, identities, deterministic environment clock

terrain and population
  height/normal/slope/curvature/moisture/exposure fields
  plateau, biome, shoreline, LOD, ground contact, paths
  vegetation, rock, prop, campfire placement

ocean and atmosphere
  floor, waves, optics, underwater, caustics, glitter, foam
  wind, weather, illumination, clouds, fog, aerial perspective

render descriptors and adapters
  quality, materials, archetypes, immutable snapshots
  WebGPU/WebGL2 world, ocean, foam, atmosphere, cloud, fog, post
  performance budgeting and debug projection

scenario
  camera rail, first-person movement, scenario tick/reset/snapshot

Core World integration
  grid focus, provider order, cell lifecycle, portable coordination snapshots
  lazy row materialization, query facade, compatibility bridge
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

## Required parent domain

```txt
cozy-island-world-recovery-domain
```

Candidate kits:

```txt
world-reset-command-kit
world-reset-admission-kit
world-reset-policy-kit
world-generation-kit
world-definition-checkpoint-kit
provider-release-result-kit
provider-store-reset-kit
materializer-cancellation-kit
world-reregistration-kit
world-reprepare-kit
world-recovery-result-kit
world-recovery-fingerprint-kit
world-recovery-journal-kit
world-terminal-disposal-kit
reset-reprepare-fixture-kit
browser-world-restart-smoke-kit
```

## Acceptance boundary

A reusable reset is complete only when a new generation is prepared with the same admitted definition/provider order, 49 active cells, empty old materializer jobs, fresh provider rows, and no stale callback or renderer revision from the preceding generation. A terminal dispose is complete only when future prepare/focus/materialization commands are explicitly rejected.
