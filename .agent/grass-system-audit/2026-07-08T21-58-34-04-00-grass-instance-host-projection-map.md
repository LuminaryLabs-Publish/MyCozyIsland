# Grass System Audit: Grass Instance Host Projection Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T21-58-34-04-00`

## Current grass source

`src/kits/grass-object-domain/index.js` owns deterministic grass placement.

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
```

The kit clamps count to a max of 220, rejects water/beach/wetSand/rock/cliff masks, rejects exclusion zones, rejects close path positions, and returns:

```txt
id
 type
 requestedCount
 patchCount
 patches[]
```

Each patch includes:

```txt
id
 type
 parentId
 transform.position
 transform.rotation
 transform.scale
 state.bladeCount
 state.patchRadius
 render.meshType
 render.batchKey
 render.geometryTemplateKey
```

## Current grass render consumer

`src/main-cloudform.js` converts grass placement into a Three.js `InstancedMesh`.

```txt
grassMesh(placement)
  -> new THREE.InstancedMesh(ConeGeometry, MeshStandardMaterial, placement.patches.length)
  -> compose transform matrix for each patch
  -> setMatrixAt(i, matrix)
  -> mark instanceMatrix.needsUpdate
```

## Current gaps

```txt
GrassInstanceSnapshot does not exist.
placement.requestedCount and placement.patchCount are not projected.
InstancedMesh.count is not projected.
patch batch keys are not summarized.
exclusion, path clearance, and mask rejection are not fixture-proven.
legacy host has no grass readback surface.
```

## Target GrassInstanceSnapshot

```txt
GrassInstanceSnapshot:
  placementId
  requestedCount
  patchCount
  instanceCount
  batchKeys
  geometryTemplateKeys
  bladeCountTotal
  exclusionZoneCount
  pathSegmentCount
  deterministicSeed
  samplePatchIds
  status: accepted | mismatch
  reason
```

## Browser splice points

```txt
after grass placement creation:
  create source grass snapshot

after grassMesh(grass):
  compare placement.patchCount to grassObj.count
  project GrassInstanceSnapshot

inside CozyIslandHost.getState():
  expose grass.instanceSnapshot
```

## Fixture rows

```txt
grass_placement_requested_count_is_140
grass_placement_patch_count_is_within_requested_limit
grass_instance_count_matches_patch_count
grass_batch_keys_are_non_empty
grass_exclusion_zone_count_matches_clearing_clearance_zones
grass_path_segment_count_matches_graph_path_network
grass_snapshot_status_is_accepted_when_counts_match
grass_snapshot_status_is_mismatch_when_instance_count_differs
```

## Handoff

Do not replace the grass renderer yet. Make the existing placement and instancing behavior visible through `GrassInstanceSnapshot`, then validate it in a DOM-free fixture.
