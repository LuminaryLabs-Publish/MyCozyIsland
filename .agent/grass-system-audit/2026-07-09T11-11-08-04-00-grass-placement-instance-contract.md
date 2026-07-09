# Grass System Audit: Placement / Instance Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-11-08-04-00`

## Summary

Grass placement is descriptor-driven but rendered through an inline `InstancedMesh` adapter without source-to-render parity proof.

The next pass should add grass placement and instance snapshots before any grass visual rewrite.

## Current grass loop

```txt
createGrassWindDescriptor({ id: central-grove-soft-wind })
  -> createGrassPatchPlacementContract({ seed: cozy-island-grass, count: 140, radiusMeters: 100, sampleHeight, sampleMasks, pathNetwork, exclusionZones })
  -> grassMesh(placement)
  -> new THREE.InstancedMesh(new THREE.ConeGeometry(...), material, placement.patches.length)
  -> compose one matrix per patch
  -> mesh.instanceMatrix.needsUpdate = true
  -> scene.add(grassObj)
```

## Current services

```txt
grass wind descriptor creation
grass patch placement descriptor creation
path and exclusion filtering through source kit
grass patch transform projection
instanced matrix composition
single InstancedMesh creation
scene insertion
```

## Missing proof records

```txt
GrassPlacementSnapshot
GrassInstanceSnapshot
GrassFixtureRow
requested patch count readback
accepted patch count readback
instance count parity
placement seed readback
path/exclusion rule summary
sample patch transform summary
render consumer readback
```

## Snapshot contract

```txt
GrassPlacementSnapshot:
  seed
  requestedCount
  acceptedPatchCount
  radiusMeters
  exclusionZoneCount
  pathNetworkSegmentCount
  samplePatchIds
  sampleTransforms

GrassInstanceSnapshot:
  geometryKind
  materialKind
  instanceCount
  matrixCount
  parityWithPlacement
  firstMatrixSummary
  renderObjectPresent
```

## Fixture rows

```txt
grass-source-row:
  assert seed is cozy-island-grass
  assert requested count is 140
  assert accepted patch count is available

grass-instance-row:
  assert InstancedMesh instance count equals placement.patches.length
  assert instance matrices were marked for update

grass-exclusion-row:
  assert clearing exclusion zones are represented in source summary

grass-render-row:
  assert render host snapshot includes grass consumer facts
```

## Do not do next

```txt
do not replace grass geometry
do not change placement count
do not replace the grass source kit
do not introduce visual batching changes before parity proof
do not tune wind until grass readback exists
```

## Next safe ledge

```txt
MyCozyIsland Host Proof Ledger Parity + Browser Consumer Fixture Gate
```