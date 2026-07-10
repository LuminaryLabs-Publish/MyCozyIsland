# Grass system audit: placement batch consumption

**Timestamp:** `2026-07-10T02-31-58-04-00`

## Current grass source

`createGrassPatchPlacementContract()` emits:

```txt
requestedCount
patchCount
patches[]
patch.id
patch.transform
patch.state.bladeCount
patch.state.patchRadius
patch.render.batchKey
patch.render.geometryTemplateKey
```

`createGrassPatchBatchDescriptors()` can summarize static batch descriptors by `batchKey`.

## Current browser consumer

`grassMesh(placement)` creates:

```txt
THREE.InstancedMesh(
  new THREE.ConeGeometry(0.08, 0.5, 4),
  material,
  placement.patches.length
)
```

Each patch becomes one cone instance. The batch descriptor data is not consumed.

## Gaps

```txt
no requested/placed/instanced parity row
no batch descriptor parity row
no skip reason row
no source exclusion readback
no bladeCount to render strategy readback
no static batch consumption proof
```

## Required rows

```txt
GrassPlacementSnapshot
GrassBatchDescriptorSnapshot
GrassInstanceSnapshot
GrassConsumptionRow
GrassSkipReason
```

## Next safe cut

Add proof around the current visible cone-instanced behavior first. Do not change grass visuals until the source patch contract, batch descriptors, and active renderer consumption are reconciled in fixture rows.
