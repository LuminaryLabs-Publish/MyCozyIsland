# Grass / Vegetation System Audit: Ground Contact Readback Ledger

Timestamp: `2026-07-10T13-08-51-04-00`

## Current source path

```txt
createTerrainSurface(...)
  -> createTerrainBiomeField(terrain)
  -> createGroundContactService(terrain)
  -> createVegetationArchetypeCatalog()
  -> createVegetationPlacementGraph({ surface, biomeField, archetypes, groundContact, seed, qualityTier })
  -> createVegetationWindDescriptor(windField)
  -> createVegetationLodPolicy(quality)
  -> createRenderSnapshot(... vegetation ...)
  -> createStylizedWorldRenderer(snapshot)
```

## What is good

Vegetation already has source descriptors, seeded placement, ground contact, wind, LOD, and static/domain smoke coverage.

## Gap

The host does not expose rows proving which vegetation descriptors were consumed by renderers.

Missing rows:

```txt
vegetation_source_fingerprint
vegetation_instance_count
vegetation_ground_contact_sample_count
vegetation_lod_tier
vegetation_rendered_family_count
vegetation_fallback_family_count
vegetation_ignored_reason
```

## Next proof

Add vegetation rows to the render-consumption ledger and verify them in the Node WebGPU consumer fixture before adding more grass, trees, or vegetation visual changes.
