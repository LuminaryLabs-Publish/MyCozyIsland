# Grass System Audit: Grass Instance Readback Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-26-56-04-00`

## Current grass path

```txt
createGrassWindDescriptor({ id: "central-grove-soft-wind" })
  -> createGrassPatchPlacementContract({ seed: "cozy-island-grass", count: 140, radiusMeters: 100, sampleHeight, sampleMasks, pathNetwork, exclusionZones })
  -> grassMesh(placement)
  -> one THREE.InstancedMesh
  -> cone blade geometry
  -> matrix per patch
```

## Existing services

```txt
grass wind descriptor creation
grass placement generation
path/exclusion-zone-aware patch placement
sample-height placement
grass InstancedMesh projection
instance matrix write
```

## Gaps

```txt
no GrassPlacementSnapshot
no GrassInstanceSnapshot
no accepted/rejected patch summary
no source-to-render instance parity row
no host-state grass readback
no DOM-free fixture for grass counts
```

## Required fixture rows

```txt
grass-placement-snapshot:
  - seed
  - requested count: 140
  - accepted patch count
  - exclusion zone count
  - sample mask summary
  - radiusMeters

grass-instance-snapshot:
  - instanced mesh count
  - geometry type
  - material category
  - first/last exemplar transforms
  - parity with placement snapshot
```

## Main finding

The grass does not need a visual rewrite in this ledge. It needs source/readback parity so future grass patch/batch upgrades can be tested without relying on screenshots only.
