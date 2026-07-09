# Grass System Audit: Instance Readback Fixture

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-20-00-04-00`

## Current grass path

```txt
createGrassWindDescriptor({ id: central-grove-soft-wind })
  -> createGrassPatchPlacementContract({ seed: cozy-island-grass, count: 140, radiusMeters: 100, sampleHeight, sampleMasks, pathNetwork, exclusionZones })
  -> grassMesh(placement)
  -> one THREE.InstancedMesh
  -> cone blade geometry
  -> placement.patches.length controls instance count
  -> no host readback beyond visual mesh
```

## Current services

```txt
grass wind descriptor creation
grass patch placement creation
path/exclusion aware placement
patch transform projection
InstancedMesh creation
matrix composition per patch
instanceMatrix update
```

## Missing readback

```txt
GrassPlacementSnapshot
GrassInstanceSnapshot
MovementPolicyResult tie-in for clearing/campfire exclusion
fixture row proving requested count and accepted render instance count
host-state projection for grass summaries
```

## Required fixture rows

```txt
grass-placement-source:
  seed: cozy-island-grass
  requestedCount: 140
  radiusMeters: 100
  exclusionZones: clearing.clearanceZones

grass-instance-consumer:
  geometry: ConeGeometry
  material: MeshStandardMaterial
  instanceCount: placement.patches.length
  matrixWritten: true
```

## Main grass finding

Grass is already source generated and statically batched as an instanced object. The blocker is not generation; it is readback and fixture proof that the browser consumed the generated patch contract correctly.
