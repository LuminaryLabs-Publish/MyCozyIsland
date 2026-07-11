# Lazy Core World Materialization

## Goal

Render the existing global island immediately, then materialize Core World cell data incrementally without blocking startup.

## Startup path

```txt
create deterministic global world once
register lightweight Core World provider descriptors
build the existing compatibility render snapshot
create the WebGPU scene
submit the first rendered frame
```

No terrain, biome, or shoreline cell arrays are generated during `prepare()`.

## Background path

Beginning with the second animation callback:

```txt
select the highest-priority active cell
materialize a bounded number of terrain rows
reuse the terrain arrays to classify biome weights
materialize shoreline classification rows
refresh the portable presentation descriptor
repeat on later frames
```

## Priority

Cells are ordered by:

1. Core World LOD
2. Distance from the current first-person focus
3. Stable cell ID

During the aerial rail, focus remains at island center.

## Budgets

```txt
cells advanced per frame: 1
terrain rows per step: 1
classification rows per step: 4
```

These values live in `COZY_WORLD_CONFIG.materialization`.

## Data reuse

The terrain provider owns:

```txt
height
normal
slope
curvature
moisture
exposure
rock exposure
shore distance
clearing
```

The biome provider reads those arrays directly. It does not call the expensive terrain sampler a second time.

The shoreline provider reuses the terrain shore-distance array and computes only shoreline-specific normal, breaker, and wetness data.

## Renderer boundary

The existing whole-island renderer remains unchanged and continues to draw the compatibility snapshot. Lazy cell arrays prepare the next cell-renderer cutover without delaying the current visual experience.
