# Grass System Audit: Placement Instance Fixture

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-39-07-04-00`

## Current grass system

```txt
createGrassWindDescriptor({ id: "central-grove-soft-wind" })
  -> createGrassPatchPlacementContract({ seed: "cozy-island-grass", count: 140, radiusMeters: 100, ... })
  -> grassMesh(placement)
  -> THREE.InstancedMesh(ConeGeometry, MeshStandardMaterial, placement.patches.length)
  -> setMatrixAt for each patch transform
  -> scene.add(grassObj)
```

## Grass domains

```txt
grass-wind-source-domain
grass-placement-source-domain
grass-exclusion-domain
grass-instance-render-domain
grass-placement-snapshot-domain-next
grass-instance-snapshot-domain-next
grass-fixture-readback-domain-next
```

## Gap

The source contract requests 140 patches and the render path instantiates one cone per patch, but there is no fixture-readable parity row proving that the accepted patches match the rendered instance matrix count or that exclusions/path masks were preserved.

## Next proof

Add readback rows for:

```txt
seed
requested patch count
accepted patch count
instance count
sample accepted patch ids/positions
exclusion zone count
path network reference
wind descriptor id
render geometry type
```

Do not change grass geometry, count, color, material, or placement until the readback fixture is in place.
