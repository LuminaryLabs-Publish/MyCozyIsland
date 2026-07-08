# MyCozyIsland Grass Instance Host Readback Map

**Timestamp:** `2026-07-08T19-40-00-04-00`

## Current grass system

```txt
createGrassWindDescriptor
  -> createGrassPatchPlacementContract
  -> grassMesh(placement)
  -> THREE.InstancedMesh(ConeGeometry, MeshStandardMaterial, placement.patches.length)
  -> matrix per patch
  -> mesh.instanceMatrix.needsUpdate = true
  -> scene.add(grassObj)
```

## Current facts to preserve

```txt
grass seed: cozy-island-grass
placement count: 140 requested
source radius: 100m
path network: graph.pathNetwork
exclusions: clearing.clearanceZones
wind id: central-grove-soft-wind
render adapter: grassMesh
```

## Missing records

```txt
GrassSourceReadback
GrassInstanceSnapshot
GrassWindSnapshot
GrassRenderConsumerSnapshot
```

## Required host snapshot

```txt
GrassInstanceSnapshot {
  seed,
  requestedCount,
  acceptedPatchCount,
  instancedMeshCount,
  radiusMeters,
  usesPathNetwork,
  exclusionZoneCount,
  windDescriptorId,
  materialKind,
  geometryKind,
  instanceMatrixUpdated
}
```

## Fixture rows

```txt
01_grass_source_readback_reports_seed_count_radius
02_grass_snapshot_reports_exclusion_zone_count
03_grass_snapshot_reports_instanced_mesh_count
04_grass_snapshot_matches_placement_patch_count
05_grass_snapshot_reports_wind_descriptor_id
06_grass_render_consumer_does_not_change_visual_instances
```

## Stop condition

The grass proof is ready when `CozyIslandHost.getState().grass` can compare placement facts to render facts without changing `grassMesh(placement)` output.
