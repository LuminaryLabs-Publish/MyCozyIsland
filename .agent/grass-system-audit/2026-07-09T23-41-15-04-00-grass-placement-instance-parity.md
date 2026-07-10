# Grass system audit: placement instance parity

Timestamp: `2026-07-09T23-41-15-04-00`

## Current grass path

```txt
grass-object-domain
  -> createGrassPatchPlacementContract({ seed, count: 140, radius, sampleHeight, sampleMasks, pathNetwork, exclusionZones })
  -> placement.patches
  -> grassMesh(placement)
  -> one InstancedMesh cone geometry
  -> one matrix per patch
```

## Current service

The source kit owns placement and static batch descriptors. The browser host only consumes `placement.patches` into cone instances.

## Gaps

- No requested/placed/instanced parity row.
- No proof that exclusion zones survived into placement.
- No batch descriptor readback.
- No per-patch transform fingerprint.
- No render count row linked to the source contract.

## Required next rows

```txt
grass_source_requested_count
grass_source_placed_count
grass_render_instance_count
grass_exclusion_zone_count
grass_patch_transform_hash
grass_batch_descriptor_hash
grass_parity_status
```

## Recommendation

Do not rewrite grass visuals yet. Add source/instance parity proof first, then use that ledger to justify any higher-fidelity grass patch renderer.
