# Grass / Vegetation System Audit: Vegetation Ground Contact Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-10T05-49-25-04-00`

## Current vegetation and ground-contact surface

The current route uses:

```txt
createVegetationArchetypeCatalog()
createGroundContactService(terrain)
createVegetationPlacementGraph(...)
createVegetationWindDescriptor(windField)
createVegetationLodPolicy(quality)
createRockGraph(...)
createPropGraph(...)
createStylizedWorldRenderer(snapshot)
```

The older grass-only proof language is stale for the current route. Vegetation, rocks, props, and world rendering are now expressed through the WebGPU volumetric source snapshot and renderer stack.

## Existing proof

`tests/domain-smoke.mjs` verifies deterministic vegetation and rock slices across two compositions and asserts minimum instance counts.

## Gaps

```txt
No vegetation source-to-render consumption ledger.
No ground-contact parity rows.
No vegetation LOD consumer readback.
No rock/prop/campfire consumer rows.
No vegetation wind consumption rows.
No worldRenderer source-family coverage report.
```

## Next rows

```txt
vegetation source count -> world renderer consumed count
rock source count -> world renderer consumed count
prop source count -> world renderer consumed count
ground contact sample -> accepted source height
vegetation LOD policy -> renderer branch
vegetation wind descriptor -> render update branch
```

## Recommendation

Do not tune vegetation visuals next. Add source-family consumption rows that cover vegetation, rocks, props, campfire, and ground-contact before changing world renderer output.
