# Project Breakdown: MyCozyIsland Lazy Cell Materialization

Timestamp: `2026-07-11T08-58-02-04-00`

## Summary

Core World registration is now lightweight and heavy terrain/classification work is deterministic and row-bounded. The live animation loop does not invoke the new scheduler, so provider records remain queued and the compatibility island remains the only visible source.

## Plan ledger

**Goal:** document every interaction, domain, kit, and service involved in moving a Core World cell from active descriptor to render-eligible readiness.

- [x] Compare the accessible Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `MyCozyIsland` because new runtime commits postdate the previous audit.
- [x] Trace route, wrapper, scheduler, providers, presentation, tests, and rendering.
- [x] Catalogue all local and runtime-implied kits.
- [x] Document integration, readiness, failure, release, and proof gaps.

## Interaction loop

```txt
boot
  -> register 49 lightweight Core World descriptors
  -> build compatibility snapshot and whole-island renderer
  -> start animation loop

animation loop
  -> tick scenario
  -> project camera
  -> update focus
  -> update compatibility resources
  -> render
  -> no materialization frame call

isolated fixture
  -> directly step scheduler
  -> terrain rows
  -> biome rows
  -> shoreline rows
  -> presentation ready
```

## Domains

```txt
browser/module host
kit/dependency admission
runtime lifecycle and animation scheduling
Core World identity, partition, focus, cells, providers, effects, snapshots
product world wrapper and compatibility bridge
lazy active-cell sync and priority
terrain, biome, shoreline, population, and presentation providers
world query and diagnostics
camera rail and first-person movement
semantic terrain, contact, population, ocean, and atmosphere
WebGPU/WebGL2 rendering, post, performance, cache, and disposal
fixtures and Pages deployment
```

## Kits and services

The repository retains 50 source-backed local kits. Their canonical list is in `.agent/current-audit.md` and `.agent/kit-registry.json`.

Imported NexusEngine services:

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
createTerrainProviderAdapter
defineWorldEffectProvider
```

Runtime-implied kits:

```txt
core-world-runtime-adapter
cozy-world-configuration
island-terrain-provider
biome-classification-provider
shoreline-classification-provider
vegetation-provider
rock-provider
prop-provider
cell-presentation-provider
lazy-cell-materializer
cozy-world-query
legacy-render-snapshot-bridge
renderer-cell-cache
renderer-resource-disposal
cell-aware-world-renderer-controller
browser-input-adapter
loader-and-error-projection
animation-loop-host
global-diagnostic-host
```

Lazy services:

```txt
lightweight descriptor registration
provider runtime stores
active-cell synchronization
deterministic LOD/distance/ID priority
bounded row work
terrain array publication
biome classification from terrain arrays
shoreline classification from terrain fields
presentation refresh
progress and stage readback
reset
```

## Exact finding

`createCozyIslandWorldRuntime()` exposes `processMaterializationFrame()`. `src/main-cloudform.js` never calls it. The isolated fixture calls the scheduler directly and therefore cannot detect the missing browser integration.

## Required boundary

```txt
cozy-island-lazy-materialization-authority-domain
  -> command and admission
  -> priority and row/time budgets
  -> session, world, and cell epochs
  -> provider-stage plans and results
  -> failure, retry, and stale-work rejection
  -> readiness revisions and provider readiness sets
  -> presentation commit and render handoff
  -> observations, journal, fixtures, browser smoke
```

## Validation

```txt
runtime changed by this pass: no
npm test run: no
browser smoke: no
branch created: no
pull request created: no
```
