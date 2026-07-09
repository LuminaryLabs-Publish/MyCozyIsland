# Grass System Audit: Placement / Instance Readback Gate

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-38-20-04-00`

## Current grass system

`grass-object-domain` creates a source placement contract.

`src/main-cloudform.js` adapts that contract into one `THREE.InstancedMesh` using cone geometry.

```txt
createGrassPatchPlacementContract({
  seed: "cozy-island-grass",
  count: 140,
  radiusMeters: 100,
  sampleHeight,
  sampleMasks,
  pathNetwork,
  exclusionZones
})
  -> grass.patches
  -> grassMesh(grass)
  -> THREE.InstancedMesh(..., placement.patches.length)
```

## Grass domains

```txt
grass-placement-domain
grass-mask-filter-domain
grass-path-clearance-domain
grass-exclusion-zone-domain
grass-static-batch-domain
grass-instanced-render-domain
grass-readback-domain
planned-grass-placement-snapshot-domain
planned-grass-instance-snapshot-domain
planned-grass-fixture-domain
```

## Grass services

```txt
make seeded placement random
sample island masks
reject water/beach/wetSand/rock/cliff patches
reject clearing exclusion zones
reject path-near patches
create patch transforms
assign batch keys and geometry templates
summarize static batch descriptors
adapt patches into InstancedMesh matrices
```

## Current gaps

```txt
The source placement contract reports requestedCount and patchCount, but the browser host does not expose those values.
The InstancedMesh adapter consumes placement.patches.length, but no host snapshot records instance count.
Batch descriptor summaries are available from the source kit but are not part of current host diagnostics.
No fixture row proves requested patch count, accepted patch count, batch counts, and render instance count align.
```

## Required next files

```txt
src/host-proof/grass-placement-snapshot.js
src/host-proof/grass-instance-snapshot.js
```

## Acceptance rows

```txt
grass placement snapshot reports seed, requestedCount, patchCount, first/last patch IDs, terrain mask rejection summary, path clearance rule, and exclusion-zone rule.
grass instance snapshot reports mesh type, instance count, geometry template summary, and matrix source count.
DOM-free fixture proves requested 140 patches and matching render instance count for the current route profile.
```
