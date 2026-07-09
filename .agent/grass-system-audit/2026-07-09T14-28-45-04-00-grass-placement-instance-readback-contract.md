# Grass System Audit — Placement / Instance Readback Contract

**Timestamp:** `2026-07-09T14-28-45-04-00`

## Current grass path

```txt
createGrassWindDescriptor({ id: central-grove-soft-wind })
  -> createGrassPatchPlacementContract({ seed: cozy-island-grass, count: 140, radiusMeters: 100, sampleHeight, sampleMasks, pathNetwork, exclusionZones })
  -> grassMesh(placement)
  -> THREE.InstancedMesh(ConeGeometry, MeshStandardMaterial, placement.patches.length)
  -> setMatrixAt for every accepted patch
  -> scene.add(grassObj)
```

## Existing strengths

```txt
Grass is already descriptor-driven.
Placement is seeded.
Placement respects island masks, path network, and clearing exclusion zones through the source kit.
Rendering batches all accepted patches into one InstancedMesh.
```

## Current gaps

```txt
The route does not expose requested patch count.
The route does not expose accepted patch count.
The route does not expose excluded/skipped patch reasons.
The route does not expose InstancedMesh count as a host proof row.
The route does not bind grass wind descriptor to grass render readback.
No DOM-free fixture can prove grass placement/instance parity.
```

## Required records

```txt
GrassPlacementSnapshot:
  seed
  requestedCount
  acceptedPatchCount
  radiusMeters
  exclusionZoneCount
  pathNetworkSegmentCount
  maskPolicy
  sampleHeightSource
  sampleMasksSource

GrassInstanceSnapshot:
  geometryType
  materialType
  instanceCount
  matrixWrittenCount
  windDescriptorId
  sceneAdded
  descriptorParityStatus
```

## Acceptance rows

```txt
grass_requested_count_is_140
grass_accepted_count_matches_instance_count
grass_uses_clearing_exclusion_zones
grass_uses_path_network_context
grass_wind_descriptor_is_present
grass_render_consumption_is_fixture_readable
```

## Do not change yet

```txt
Do not replace grass geometry.
Do not change patch count.
Do not retune placement radius.
Do not add new grass visuals before readback exists.
```
