# Grass System Audit: Grass Placement Instance Consumer Freeze

**Timestamp:** `2026-07-09T08-11-12-04-00`

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Current grass system

Grass is source-owned by `createGrassPatchPlacementContract(...)` and rendered as a single `THREE.InstancedMesh` in `grassMesh(placement)`.

## Current grass loop

```txt
createGrassWindDescriptor({ id: "central-grove-soft-wind" })
  -> createGrassPatchPlacementContract({ seed, count: 140, radiusMeters, sampleHeight, sampleMasks, pathNetwork, exclusionZones })
  -> grassMesh(placement)
  -> THREE.InstancedMesh(ConeGeometry, MeshStandardMaterial, placement.patches.length)
  -> for each patch:
       copy patch transform position
       apply rotation.y
       apply scale.x
       write instance matrix
  -> scene.add(grassObj)
```

## Current strengths

```txt
grass has a source descriptor
placement is seeded
grass count target is explicit: 140
grass consumes terrain height and masks
grass consumes path network
grass consumes clearing exclusion zones
grass render path is batched into one InstancedMesh
```

## Missing readback

```txt
no GrassPlacementSnapshot
no GrassInstanceSnapshot
no source-to-render count comparison
no accepted patch sample rows
no exclusion-zone summary
no path-network avoidance summary
no grass wind readback result
no DOM-free fixture for placement/instance count
no CozyIslandHost grass diagnostics
```

## Next-cut contract

```txt
GrassPlacementSnapshot:
  routeToken
  seed
  requestedCount
  acceptedPatchCount
  radiusMeters
  exclusionZoneCount
  pathSegmentCount
  samplePatchRows
  rejectedReasonSummary when available

GrassInstanceSnapshot:
  routeToken
  sourcePatchCount
  instanceMeshCount
  geometryType
  materialType
  matrixWrittenCount
  sampleMatrices

GrassWindSnapshot:
  id
  direction
  speed
  sway
  response
```

## Fixture rows

```txt
grass-source-requests-140-patches
grass-placement-has-accepted-patches
grass-instance-count-equals-accepted-patches
grass-exclusion-zones-present
grass-path-network-present
grass-wind-descriptor-present
grass-render-readback-visible-through-CozyIslandHost
```

## Main finding

The grass should not be visually replaced next. It needs source-to-render proof first, especially accepted placement count, instance matrix count, exclusion summary, and host readback.
