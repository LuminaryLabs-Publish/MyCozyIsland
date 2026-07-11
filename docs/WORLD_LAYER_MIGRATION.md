# Core World Layer Migration

## Status

Implemented as the production coordination path with a temporary `?world=legacy` rollback mode.

## Pinned dependency

```txt
LuminaryLabs-Dev/NexusEngine
commit 38229f59c22cb40024ffd13a9f48040de759f5d7
```

The page imports only the pinned browser-safe `src/engine.js` and `src/core-domains/core-world-domain/index.js` entry points. The broad root index is intentionally avoided because it also exports Node-only headless-editor modules. Moving `main` is never used at runtime.

## Ownership

```txt
core-world-domain
  world identity
  uniform-grid partition
  active cell lifecycle
  focus
  provider ordering
  lightweight effect descriptors
  portable snapshots

MyCozyIsland providers
  terrain arrays
  biome arrays
  shoreline arrays
  vegetation instances
  rock instances
  props and campfire
  renderer handles and caches

WebGPU host
  Three.js objects
  textures
  Storage3DTexture resources
  GPU buffers
  render passes
```

## World configuration

```txt
world id: world:cozy-island-webgpu-v3
seed: cozy-island-webgpu-v2
partition: uniform grid
cell size: 48 m
active radius: 3
active cells: 49
surface: flat
terrain patch resolution: 49 x 49
```

The requested five-by-five grid was corrected to seven-by-seven. A zero-anchored 48 m grid with radius 2 does not cover the complete `-108..108` island; radius 3 preserves complete island ownership without changing world coordinates.

## Provider order

```txt
FOUNDATION
1. cozy-island-terrain-provider

CLASSIFICATION
2. biome-classification-provider
3. shoreline-classification-provider

POPULATION
4. vegetation-provider
5. rock-provider
6. prop-provider

PRESENTATION
7. cell-presentation-provider
```

## Compatibility strategy

The current terrain, shoreline, biome, vegetation, rock, prop, ocean, atmosphere, camera, and renderer algorithms remain unchanged. Existing global population graphs are generated once and partitioned into provider-owned cell records. `legacy-render-snapshot-bridge.js` flattens active cell records back into the existing render snapshot shape, preserving object IDs, order, transforms, and visual output.

## Shared query

`createCozyWorldQuery()` exposes `heightAt`, `normalAt`, `slopeAt`, `fieldsAt`, `biomeAt`, `shorelineAt`, `materialAt`, `surfaceAt`, `waterDepthAt`, `groundContactAt`, and `cellAt`. Legacy sample aliases remain available during migration.

## Runtime lifecycle

During the aerial rail, focus remains at island center. After first-person landing, focus follows the player at 10 Hz or immediately after crossing a cell boundary. Providers prepare new cells, update retained cells, and release inactive cells. Heavy arrays stay in provider runtime stores and never enter Core World descriptors.

## Renderer migration boundary

The current whole-island renderer remains active through the compatibility bridge. `renderer-cell-cache.js`, `renderer-disposal.js`, and `renderer-world-cells.js` establish deterministic prepare/update/release and disposal contracts for the subsequent visual cutover without changing the current scene prematurely.

## Release gates

```txt
Domain parity: terrain, biome, shoreline, population, and clearing stay deterministic
Host parity: Core World drives lifecycle while current renderers continue to work
Snapshot portability: no Three.js, Maps, Sets, typed arrays, functions, or GPU handles in descriptors
Lifecycle proof: focus movement retains overlap, prepares new cells, and releases old cells
Renderer resource proof: cell-only resources dispose while shared resources survive
```
