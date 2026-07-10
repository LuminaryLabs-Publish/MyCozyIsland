# Grass and Vegetation Audit: Runtime Quality Consumption Gap

Timestamp: 2026-07-10T16-08-56-04-00

## Current source path

```txt
startup quality.vegetationScale
  -> createVegetationPlacementGraph(... qualityTier)
  -> deterministic vegetation instances
  -> createRenderSnapshot()
  -> createStylizedWorldRenderer(snapshot)
  -> fixed runtime world consumer
```

## Current quality behavior

Vegetation density and render topology are selected at startup. Runtime adaptive levels only change cloud steps, fog steps, fog resolution, and DPR.

Therefore:

```txt
performance level 0, 1, or 2
  does not represent a complete scene quality level
  does not alter vegetation instance population
  does not alter vegetation LOD policy
  does not alter terrain resolution
  does not rebuild the world renderer
```

This is acceptable for the next narrow pass, but it must be explicit in the quality-state descriptor.

## Proof gaps

- No runtime quality state marks vegetation as unchanged.
- No source snapshot identity links vegetation placement to render submission.
- No current instance/LOD summary is exposed through JSON-safe host readback.
- No fixture proves adaptive transitions avoid rebuilding deterministic vegetation.

## Required contract

Each runtime quality state should include an `unchangedStartupResources` section:

```txt
vegetationGraphId
vegetationInstanceCount
vegetationLodPolicyId
terrainResolution
oceanSegments
shadowMapSize
volumeTextureDimensions
```

The adaptive fixture should assert that quality transitions do not mutate or recreate these resources unless a future dedicated rebuild policy explicitly permits it.

## Decision

Do not add runtime grass-density reduction or vegetation rebuilds in the next slice. First make the existing partial quality policy accurate, reversible, and self-describing.