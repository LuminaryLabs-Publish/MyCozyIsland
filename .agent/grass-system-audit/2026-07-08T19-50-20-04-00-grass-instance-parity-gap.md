# MyCozyIsland Grass Instance Parity Gap

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T19-50-20-04-00`

## Current grass surface

```txt
createGrassPatchPlacementContract
  -> placement.patches
  -> grassMesh(placement)
  -> InstancedMesh ConeGeometry
  -> instance matrices from patch transforms
  -> scene.add(grassObj)
```

## Current gap

The grass placement contract is source-backed, but the render host does not summarize expected patch count, actual instanced mesh count, wind descriptor identity, or exclusion coverage.

## Required record

```txt
GrassInstanceSnapshot:
  placementId
  seed
  expectedPatchCount
  renderedInstanceCount
  geometryType
  materialType
  windDescriptorId
  exclusionZoneCount
  parityStatus
```

## Fixture rows

```txt
grass_instance_snapshot_matches_placement_count_and_instanced_mesh_count
grass_source_readback_includes_wind_descriptor
grass_source_readback_includes_clearing_exclusions
```

## Non-goals

```txt
do not replace cone grass in the proof pass
do not alter placement count first
do not change exclusion policy first
do not promote grass system before host proof exists
```
