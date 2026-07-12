# Lazy Core World Materialization

## Goal

Render the compatibility island immediately, then materialize independent island-terrain, sea-floor, classification, and presentation cell data incrementally without blocking startup.

## Startup path

```txt
create deterministic global world once
register lightweight Core World provider descriptors
build the compatibility render snapshot
create the WebGPU scene
submit the first rendered frame
```

No island-terrain, sea-floor, biome, shoreline, or sea-floor-material arrays are generated during `prepare()`.

## Background path

Beginning with the second animation callback:

```txt
select the highest-priority active cell
materialize bounded island-terrain rows
materialize bounded sea-floor rows
reuse island arrays to classify biome weights
reuse island shore-distance for shoreline classification
reuse sea-floor depth and normals for sea-floor material weights
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
island terrain rows per step: 1
sea-floor rows per step: 2
classification rows per step: 4
```

These values live in `COZY_WORLD_CONFIG.materialization`.

## Data reuse

The island provider owns height, normal, slope, curvature, moisture, exposure, rock exposure, shore distance, and clearing arrays. The island biome provider reads them directly rather than invoking the procedural sampler again.

The shoreline provider reuses island shore distance and computes only coast normal, breaker, and wetness data.

The sea-floor provider owns independent height, normal, and depth arrays. The sea-floor material provider reads those arrays to classify shallow sand, submerged rock, silt, and deep seabed. It never reads island biome weights.

## Renderer boundary

The current compatibility renderer immediately draws coast-clipped island geometry and an independent toon sea floor. Lazy cell arrays prepare the later cell-renderer cutover without delaying the current visual experience.
