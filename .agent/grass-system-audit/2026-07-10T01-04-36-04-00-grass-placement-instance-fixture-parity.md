# Grass system audit: placement instance fixture parity

Timestamp: `2026-07-10T01-04-36-04-00`

## Current grass source

`createGrassPatchPlacementContract()` generates path/exclusion-aware grass patches.

Source facts:

```txt
seed: cozy-island-grass
requested count: 140 in main-cloudform
hard cap: 220
placement tries: count * 80 + 500
avoid water, beach, wet sand, rock, cliff
avoid clearing exclusion zones
avoid path within pathClearance default 3.6
templates: dense-a, dense-b, dense-c
per patch state: bladeCount 220, patchRadius 1.2 to 2.8
render meshType: procedural-grass-patch
batchKey: dense-cozy-grass-<template>
```

## Current grass consumer

`grassMesh(placement)` currently renders the placement as one `THREE.InstancedMesh` using `ConeGeometry(0.08, 0.5, 4)` with one instance per patch.

## Proof gaps

- No row records requested count vs placed count vs instanced count.
- No row records skipped placements and reasons.
- No row proves path/clearing exclusions survived into the render consumer.
- Static batch descriptors are available from the source kit but are not consumed by the renderer.
- `bladeCount`, `patchRadius`, and `geometryTemplateKey` are not represented in the render consumer.
- No grass parity appears in legacy diagnostics.

## Required next rows

```txt
GrassPlacementSourceSnapshot
GrassPlacementSkipReasonRow
GrassBatchDescriptorRow
GrassInstanceReadbackRow
GrassPlacementInstanceParityRow
GrassExclusionParityRow
```

## Main finding

The next grass work should not be a visual rewrite. First prove the current source-to-instance parity, then use the proof rows to upgrade from one cone per patch to proper reusable grass patch batches.
