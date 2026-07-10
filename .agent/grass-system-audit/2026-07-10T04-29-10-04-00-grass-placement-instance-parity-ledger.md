# Grass System Audit: Placement Instance Parity Ledger

**Timestamp:** `2026-07-10T04-29-10-04-00`

## Source path

```txt
createGrassWindDescriptor({ id: "central-grove-soft-wind" })
createGrassPatchPlacementContract({ seed: "cozy-island-grass", count: 140, radiusMeters: 100, sampleHeight, sampleMasks, pathNetwork, exclusionZones })
grassMesh(grass)
```

## Current consumer

`grassMesh()` creates one `THREE.InstancedMesh` cone per placed patch and uses patch transform position, rotation, and scale. It does not expose a requested/placed/instanced parity ledger, skip reasons, or batch descriptor consumption.

## Known grass gaps

```txt
configured request count is not reconciled with placed count and instance count
batchKey is not surfaced in host readback
bladeCount and patchRadius are not reconciled with renderer output
static batch descriptors are not consumed by the active renderer
exclusion/skip reasons are not exposed as rows
```

## Next grass proof

Add a serializable grass placement snapshot and grass instance snapshot. The fixture should assert configured count, generated patch count, instance count, representative transform rows, batch descriptor presence, and exclusion-zone handling without changing visible grass.
