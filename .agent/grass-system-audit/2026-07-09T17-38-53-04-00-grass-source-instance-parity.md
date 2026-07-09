# My Cozy Island Grass Source/Instance Parity Audit

**Timestamp:** `2026-07-09T17-38-53-04-00`

## Current source

`createGrassPatchPlacementContract()` is called with:

```txt
seed: cozy-island-grass
count: 140
radiusMeters: 100
sampleHeight: island height sampler
sampleMasks: island mask sampler
pathNetwork: foliage graph path network
exclusionZones: clearing clearance zones
```

## Current consumer

`grassMesh(placement)` creates one `THREE.InstancedMesh` using:

```txt
geometry: ConeGeometry(0.08, 0.5, 4)
material: MeshStandardMaterial
instance capacity: placement.patches.length
position: patch position + 0.25 Y
rotation: patch transform rotation.y
scale: patch transform scale.x
```

## Current gap

The source placement contract is not compared against the generated instance buffer. The runtime does not expose:

```txt
requested patch count
produced patch count
instance capacity
written matrix count
missing/invalid transforms
source seed or fingerprint
path/exclusion rejection counts
terrain/mask rejection counts
```

## Required parity row

```js
{
  source: {
    seed,
    requestedCount,
    producedCount,
    radiusMeters,
    pathSegmentCount,
    exclusionZoneCount,
    fingerprint
  },
  consumer: {
    instanceCapacity,
    matricesWritten,
    geometryType,
    materialType
  },
  parity: {
    matched,
    missingTransforms,
    extraInstances
  }
}
```

## Fixture expectations

```txt
same seed produces stable source fingerprint
produced patch count equals instance capacity
all produced patches write one matrix
no instance exists without a source patch
source ids remain traceable to instance indexes
invalid transform row is rejected explicitly
```

## Recommended kits

```txt
grass-placement-snapshot-kit
grass-instance-snapshot-kit
render-consumption-ledger-kit
browser-consumer-fixture-kit
```

Do not change grass density, geometry, material, placement rules, or visuals during this proof cut.
