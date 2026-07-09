# Grass System Audit: Placement Instance Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T19-09-44-04-00`

## Current grass loop

```txt
createGrassWindDescriptor({ id: central-grove-soft-wind })
  -> createGrassPatchPlacementContract({ seed: cozy-island-grass, count: 140, radiusMeters: 100, pathNetwork, exclusionZones })
  -> grassMesh(placement)
  -> InstancedMesh ConeGeometry one instance per patch
  -> setMatrixAt for every patch transform
  -> scene.add(grassObj)
```

## Current services

```txt
grass-object-domain: placement contract, path/exclusion aware patches, static batch descriptors
grass-wind-domain: normalized wind/sway/gust descriptor
main-cloudform grassMesh: one cone per placement patch, transform matrix only
```

## Gaps

```txt
No requested/placed/instanced parity row exists.
No stable grass placement snapshot exists.
No grass batch descriptor readback exists.
Wind descriptor is created but not connected to visible grass animation.
Instance transforms are not exposed through serializable host readback.
No fixture proves patch exclusions survive renderer adaptation.
```

## Next ledge

```txt
Add grass-placement-snapshot-kit.
Add grass-instance-snapshot-kit.
Add grass requested count, placed count, instanced count, skipped count, and reason rows.
Add batch descriptor parity rows.
Expose grass rows through CozyIslandHost.getState().grass.
Validate in DOM-free browser consumer fixture.
```