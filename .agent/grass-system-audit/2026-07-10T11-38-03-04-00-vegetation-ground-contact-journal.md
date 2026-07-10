# Grass/vegetation audit: ground contact journal

Timestamp: `2026-07-10T11-38-03-04-00`

## Current vegetation path

```txt
createTerrainSurface
  -> createTerrainBiomeField
  -> createGroundContactService
  -> createVegetationArchetypeCatalog
  -> createVegetationPlacementGraph
  -> createVegetationWindDescriptor
  -> createVegetationLodPolicy
  -> createRenderSnapshot
  -> createStylizedWorldRenderer
```

## Current strengths

- Vegetation placement is deterministic.
- Ground contact service exists.
- Domain smoke checks deterministic vegetation and rock instances.
- Vegetation LOD and wind descriptors are already separate source rows.

## Current gaps

- No host journal proves which vegetation/ground-contact rows were consumed by the renderer.
- No row maps source placement id to rendered instance/group.
- No JSON-safe sample of vegetation contact parity exists in `CozyIsland.getState()`.
- Node fixture cannot assert renderer-side vegetation consumption yet.

## Needed rows

```txt
VegetationPlacementReadback
GroundContactReadback
VegetationInstanceConsumption
VegetationWindConsumption
VegetationLodConsumption
```

## Safe next target

Add vegetation/ground-contact rows into the broader render-consumption ledger instead of rewriting grass or foliage visuals.
