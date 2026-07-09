# Grass Placement and Instance Parity Audit

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T17-48-20-04-00`

## Current grass route

```txt
createGrassWindDescriptor({ id: "central-grove-soft-wind" })
  -> createGrassPatchPlacementContract({
       seed: "cozy-island-grass",
       count: 140,
       radiusMeters: 100,
       sampleHeight,
       sampleMasks,
       pathNetwork,
       exclusionZones
     })
  -> grassMesh(placement)
  -> one THREE.InstancedMesh
  -> one cone geometry per accepted patch
```

## Source contract behavior

`grass-object-domain`:

```txt
caps requested count at 220
samples deterministic radial positions
rejects water, beach, wet sand, rock, and cliff masks
rejects clearing exclusion zones
rejects positions too close to paths
samples terrain height
rotates and scales each patch
assigns dense-a, dense-b, or dense-c batch keys
records bladeCount and patchRadius metadata
can aggregate patches into static batch descriptors
```

`grass-wind-domain`:

```txt
normalizes direction
records base sway
gust strength
gust frequency
phase seed
```

## Consumer behavior

The active renderer:

```txt
creates ConeGeometry(0.08, 0.5, 4)
creates one MeshStandardMaterial
creates one InstancedMesh sized to placement.patches.length
writes one transform matrix per patch
marks instanceMatrix.needsUpdate
```

The source `bladeCount`, `patchRadius`, `batchKey`, `geometryTemplateKey`, and wind descriptor are not consumed by the active grass renderer.

## Current structural gap

The source describes a grass patch system, but the consumer treats every patch as one cone. This is both a fidelity issue and a contract mismatch.

The next pass should not immediately replace the visual. It should first prove the current mismatch with source/consumer rows.

## Required parity snapshot

```txt
{
  sourceId: "cozy-grass-placement",
  seed: "cozy-island-grass",
  requestedCount: 140,
  placedCount,
  rejectedAttemptCount,
  rejectionReasons,
  sourceBatchCounts,
  sourceBladeCountTotal,
  consumerInstanceCount,
  consumerGeometryType,
  consumerMaterialCount,
  consumedFields,
  ignoredFields,
  status
}
```

## Required fixture assertions

```txt
same seed and inputs produce the same patch ids/transforms
all patches are outside forbidden terrain masks
all patches are outside clearing exclusion zones
all patches meet path-clearance policy
placement.patchCount equals patches.length
InstancedMesh.count equals patches.length
instance matrices match patch transforms
source batch descriptor totals equal patch count
ignored source fields are explicitly reported
wind descriptor is either consumed or explicitly reported as unconsumed
```

## Later implementation direction

After parity proof exists, the visual cutover can replace the one-cone adapter with a static-batched patch adapter:

```txt
one reusable dense patch geometry
  -> 50-100 crossed/curved blade planes per patch object
  -> batch by geometry template and material
  -> instance patch objects across source placements
  -> wind descriptor consumed by shader or CPU deformation policy
```

That visual work is deferred until the current placement and consumer contract is fixture-readable.

## Next safe ledge

```txt
Grass Source Snapshot + Placement/Instance Parity Fixture
```