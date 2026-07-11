# Lazy Core World Materialization

The compatibility island renders first. Core World terrain, biome, shoreline, and presentation cell data materialize afterward in deterministic priority order under a bounded per-frame budget.

## Startup

```txt
build the existing global island once
register lightweight Core World descriptors
construct and render the compatibility scene
```

No terrain patch rows, biome arrays, or shoreline arrays are generated while Core World registers the initial 49 cells.

## After the first frame

```txt
prioritize active cells by LOD, distance to focus, then stable cell ID
advance at most one cell job per frame
sample one terrain row per terrain step
classify four biome rows per biome step
classify four shoreline rows per shoreline step
refresh the presentation descriptor after completion
```

## Data reuse

Biome materialization reads the completed terrain provider arrays instead of calling the full terrain sampler again. Shoreline materialization reuses terrain shore-distance values and only derives breaker, wetness, and planar shoreline normal data.

## Budgets

```txt
maxCellsPerFrame: 1
terrainRowsPerStep: 1
classificationRowsPerStep: 4
```

These values are declared in `src/world/world-config.js` and can be tuned without changing provider contracts.

## Ownership

Core World descriptors remain portable and lightweight. Typed arrays remain in provider runtime stores. The existing global world snapshot remains the visible source until cell-aware rendering is promoted.

## Diagnostics

`CozyIsland.worldRuntime.getMaterializationState()` reports queue size, active cell, stage counts, completed cells, and progress. The work does not begin until `startLazyMaterialization()` is called by the host after its first rendered callback.
