# MyCozyIsland Grass System Audit

**Generated:** `2026-07-09T08-29-38-04-00`

## Current grass path

```txt
createGrassWindDescriptor({ id: "central-grove-soft-wind" })
  -> createGrassPatchPlacementContract({ seed: "cozy-island-grass", count: 140, radiusMeters: 100, sampleHeight, sampleMasks, pathNetwork, exclusionZones })
  -> grassMesh(placement)
  -> one THREE.InstancedMesh using cone geometry
  -> setMatrixAt for each accepted patch
  -> scene.add(grassObj)
```

## Grass domains

```txt
grass-placement-domain
grass-wind-domain
grass-render-instance-domain
terrain-sampling-domain
path-avoidance-domain
clearing-exclusion-domain
planned-grass-readback-domain
```

## Grass services

```txt
create wind descriptor
sample terrain height/masks
place grass patches by seed and count
avoid path network and clearing exclusions through placement contract
project each patch into instanced mesh matrix
submit one static instanced grass object to scene
```

## Gaps

```txt
No GrassPlacementSnapshot exists.
No GrassInstanceSnapshot exists.
No stable accepted patch count is exposed.
No stable rejected patch count/reason summary is exposed.
No render host snapshot proves placement.patches.length equals InstancedMesh count.
No fixture proves the 140 requested patch route contract.
```

## Required next records

```txt
GrassPlacementSnapshot:
  seed
  requestedCount
  acceptedPatchCount
  radiusMeters
  terrainMaskPolicy
  pathAvoidanceSummary
  exclusionZoneSummary

GrassInstanceSnapshot:
  geometryType
  materialType
  instanceCount
  matrixCount
  firstPatchPosition
  lastPatchPosition
```

## Freeze rule

Do not replace the current cone-instanced grass in the next pass. Prove it first through additive readback and a DOM-free fixture.
