# Grass system audit: vegetation ground contact readback ledger

Timestamp: `2026-07-10T08-48-58-04-00`

## Current vegetation source path

```txt
createVegetationArchetypeCatalog()
  -> createGroundContactService(terrain)
  -> createVegetationPlacementGraph({ surface, biomeField, archetypes, groundContact, seed, qualityTier })
  -> createVegetationWindDescriptor(windField)
  -> createVegetationLodPolicy(quality)
  -> createRenderSnapshot(... vegetation ...)
  -> createStylizedWorldRenderer(snapshot)
```

## Current proof

`tests/domain-smoke.mjs` asserts deterministic vegetation instances across two compositions and expects more than 120 vegetation instances.

## Gap

There is no browser-host readback that maps vegetation source rows to render consumers.

Missing rows:

```txt
VegetationSourceFingerprint
GroundContactReadback
VegetationPlacementReadback
VegetationWindReadback
VegetationLodReadback
VegetationRenderConsumerRow
```

## Why this matters

The live route has far more useful source decomposition than the old Three route, but host proof still cannot say which vegetation rows were actually consumed by the rendered world.

## Next safe cut

Add vegetation/ground-contact rows to the render-consumption ledger before grass, tree, foliage, or ground-contact visual changes.
