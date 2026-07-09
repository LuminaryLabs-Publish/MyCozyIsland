# Grass System Audit: Grass Placement Instance Fixture

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T08-20-00-04-00`

## Current grass path

```txt
createGrassWindDescriptor(id: central-grove-soft-wind)
  -> createGrassPatchPlacementContract(seed: cozy-island-grass, count: 140, radiusMeters: 100, exclusionZones: clearing.clearanceZones)
  -> grassMesh(placement)
  -> THREE.InstancedMesh(ConeGeometry, patch count)
  -> instanceMatrix set once from patch transforms
  -> no host readback record
```

## Gap

The source placement contract exists and the InstancedMesh exists, but the route does not expose a stable grass placement snapshot or grass instance snapshot. There is no fixture row proving request count, accepted patch count, instance count, exclusion behavior, or wind descriptor linkage.

## Required proof records

```txt
GrassPlacementSnapshot:
  seed
  requestedCount
  acceptedPatchCount
  radiusMeters
  sampleMaskPolicy
  pathNetworkPolicy
  exclusionZoneCount
  windDescriptorId

GrassInstanceSnapshot:
  geometryType
  materialType
  instanceCount
  matrixWritten
  rendered
```

## Fixture rows

```txt
grass-placement-request-140
grass-placement-exclusion-applied
grass-instance-count-matches-accepted-patches
grass-wind-descriptor-linked
grass-host-readback-shape
```

## Implementation rule

Keep the current grass appearance and placement until the source/instance readback fixture proves the browser is consuming the descriptor correctly.
