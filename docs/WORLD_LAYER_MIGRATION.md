# Core World Layer Migration

## Status

Implemented as the production coordination path with a temporary `?world=legacy` rollback mode.

## Pinned dependency

```txt
LuminaryLabs-Dev/NexusEngine
commit 481cbf6df742e81279bd42245c4238c6a1fc69f2
```

The page imports the pinned browser-safe `src/engine.js` and `src/core-domains/core-world-domain/index.js` entry points. The broad root index remains excluded from the browser path.

## Ownership

```txt
core-world-domain
  world identity
  partition and cell lifecycle
  focus
  provider ordering
  lightweight effects and portable snapshots

MyCozyIsland semantic providers
  island terrain arrays
  sea-floor arrays
  island biome arrays
  shoreline arrays
  sea-floor material arrays
  vegetation, rocks, props, and presentation handles

Core Graphics render-layer graph
  pass contracts
  dependency and resource-flow validation
  depth and blend policy
  final scene-content boundary

Three.js WebGPU adapter
  meshes, materials, textures, GPU buffers, and physical pass submission
```

## World configuration

```txt
world id: world:cozy-island-webgpu-v4
seed: cozy-island-webgpu-v2
partition: uniform grid
cell size: 48 m
active radius: 3
active cells: 49
surface: flat
island patch resolution: 49 x 49
sea-floor patch resolution: 33 x 33
```

## Provider order

```txt
FOUNDATION
1. cozy-island-terrain-provider
2. cozy-seafloor-terrain-provider

CLASSIFICATION
3. biome-classification-provider
4. shoreline-classification-provider
5. seafloor-material-provider

POPULATION
6. vegetation-provider
7. rock-provider
8. prop-provider

PRESENTATION
9. cell-presentation-provider
```

## Terrain boundary

The island owns land, beach, clearing, and a six-meter submerged shelf ending near `-5 m`. The independent sea floor remains at least `-7 m` at the handoff and descends toward the deep basin. Island biome weights never classify the sea floor.

## Compatibility and lazy strategy

The global deterministic composition is built once for the immediate first frame. Core World registers lightweight cell descriptors without materializing typed arrays. Beginning after the first frame, the lazy scheduler incrementally materializes island terrain, sea floor, island classification, shoreline classification, sea-floor materials, and presentation handles.

## Shared query

`createCozyWorldQuery()` exposes explicit island, sea-floor, solid-surface, and water-depth queries while retaining legacy island aliases for existing movement and placement consumers.

## Renderer boundary

The compatibility renderer now draws coast-clipped island geometry and a separate opaque toon sea floor. The transparent anime water, fog, and final foam passes consume portable descriptors but remain renderer-owned.

## Release gates

```txt
Domain parity: deterministic island, population, and shoreline behavior
Terrain separation: no flat sea-level island square and no coplanar handoff
Snapshot portability: no Three.js, typed arrays, functions, or GPU handles in Core World descriptors
Layer validation: water and foam never write main depth; foam is final scene content
Lifecycle proof: focus changes retain, prepare, and release both terrain providers
Renderer proof: atmosphere composites before the final foam overlay
```
