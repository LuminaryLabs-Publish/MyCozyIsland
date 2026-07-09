# Grass System Audit: Placement + Instance Readback Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-21-06-04-00`

## Current grass system

```txt
createGrassWindDescriptor({ id: "central-grove-soft-wind" })
  -> createGrassPatchPlacementContract({
       seed: "cozy-island-grass",
       count: 140,
       radiusMeters: 100,
       sampleHeight,
       sampleMasks,
       pathNetwork,
       exclusionZones: clearing.clearanceZones
     })
  -> grassMesh(placement)
  -> THREE.InstancedMesh(ConeGeometry, MeshStandardMaterial, placement.patches.length)
  -> instance matrices composed from patch transform
```

## Current blind spots

```txt
requested patch count is not exposed through host state
accepted patch count is not exposed through host state
exclusion zone count is not exposed through host state
path avoidance result is not exposed through host state
wind descriptor is not tied to grass instance readback
instance matrix update is not recorded
```

## Required records

```txt
GrassPlacementSnapshot:
  seed
  requestedPatchCount
  acceptedPatchCount
  radiusMeters
  pathNetworkPresent
  exclusionZoneCount
  sampleMaskSummary

GrassInstanceSnapshot:
  instanceCount
  geometryType
  materialType
  matrixUpdated
  scaleRange
  yOffset

GrassWindSnapshot:
  windId
  response
  direction
```

## Acceptance rule

A DOM-free fixture should be able to reconstruct the placement contract and prove that the browser route would create the same grass instance count.

## Main finding

Do not replace grass yet. First make the current source placement and render instance consumption measurable.
