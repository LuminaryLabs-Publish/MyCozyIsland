# Grass System Audit: Placement / Instance Fixture

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-39-50-04-00`

## Current grass loop

```txt
createGrassWindDescriptor({ id: "central-grove-soft-wind" })
  -> createGrassPatchPlacementContract({ seed: "cozy-island-grass", count: 140, radiusMeters: 100, ... })
  -> grassMesh(grass)
  -> create one THREE.InstancedMesh
  -> write one matrix per accepted patch
  -> add grassObj to scene
```

## Current grass gaps

```txt
requested count is not compared against accepted patch count
instance count is not exposed in host diagnostics
exclusion zone effects are not summarized
grass wind descriptor is not included in readback
generator seed and route token are not connected to a stable fixture row
```

## Fixture rows needed

```txt
GrassPlacementSnapshot:
  routeToken
  seed
  requestedCount
  radiusMeters
  exclusionZoneCount
  pathNetworkSummary
  acceptedPatchCount
  rejectedPatchCount
  firstPatchTransform

GrassInstanceSnapshot:
  routeToken
  geometry: ConeGeometry
  instanceCapacity
  matrixWrittenCount
  materialSummary
  sceneAttached
  windDescriptorId
```

## Main grass finding

Grass does not need a visual replacement. The next work should prove the source placement contract is consumed by the InstancedMesh and surfaced through the additive host snapshot.
