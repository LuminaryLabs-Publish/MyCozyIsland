# Grass System Audit: Static Batch Readback Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T02-31-41-04-00`

## Current grass chain

```txt
createGrassWindDescriptor({ id: "central-grove-soft-wind" })
  -> createGrassPatchPlacementContract({ seed, count, radius, sampleHeight, sampleMasks, pathNetwork, exclusionZones })
  -> grassPlacement.patches
  -> grassMesh(grassPlacement)
  -> THREE.InstancedMesh(new ConeGeometry(...), material, placement.patches.length)
```

## Existing static-batch seam

`grass-object-domain` also exposes `createGrassPatchBatchDescriptors(patches)`, which groups patch count by `render.batchKey`.

That seam is not yet consumed by the live route or exposed through host proof.

## Current source facts

```txt
seed: cozy-island-grass
requested count: 140
max accepted count clamp: 220
radius: 100
patch type: grass-patch
render meshType: procedural-grass-patch
batch keys:
  dense-cozy-grass-dense-a
  dense-cozy-grass-dense-b
  dense-cozy-grass-dense-c
path clearance default: 3.6
surface exclusions:
  water
  beach
  wetSand
  rock
  cliff
clearing exclusions:
  options.exclusionZones
```

## Gaps

```txt
placement.patchCount is not recorded in host state
requestedCount is not compared to patchCount
exclusion rejections are not counted
path clearance behavior is not fixture-proven
batch descriptor counts are not compared to patch count
WebGL InstancedMesh count is not compared to patch count
```

## Required records

```txt
GrassPlacementSnapshot:
  id
  requestedCount
  patchCount
  seed
  radiusMeters
  pathClearance
  exclusionZoneCount
  batchKeyCounts
  deterministicReplayFingerprint

GrassInstanceSnapshot:
  placementPatchCount
  instancedMeshCount
  instanceMatrixReady
  geometryType
  materialType
  batchDescriptorTotal
  batchDescriptorCounts
  parityStatus
```

## Fixture rows

```txt
grass_01_placement_snapshot_reports_requested_and_patch_count
grass_02_placement_snapshot_reports_batch_key_distribution
grass_03_batch_descriptor_total_equals_patch_count
grass_04_instance_snapshot_reports_instanced_mesh_count
grass_05_instance_count_equals_patch_count
grass_06_deterministic_seed_replay_keeps_patch_ids_stable
```

## Stop line

Do not replace the cone placeholder or promote static batching yet. First prove the current patch placement, batch descriptor, and instance count records.
