# Grass System Audit: Placement / Instance Fixture Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-30-27-04-00`

## Current grass source

```txt
wind = createGrassWindDescriptor({ id: "central-grove-soft-wind" })
grass = createGrassPatchPlacementContract({
  seed: "cozy-island-grass",
  count: 140,
  radiusMeters: 100,
  sampleHeight: h,
  sampleMasks: masks,
  pathNetwork: graph.pathNetwork,
  exclusionZones: clearing.clearanceZones
})
```

## Current grass render adapter

```txt
grassMesh(placement)
  -> THREE.InstancedMesh(ConeGeometry(0.08, 0.5, 4), MeshStandardMaterial, placement.patches.length)
  -> for each patch:
       position = patch.transform.position + y 0.25
       rotation = patch.transform.rotation.y
       scale = patch.transform.scale.x || 1
       setMatrixAt(i, matrix)
  -> instanceMatrix.needsUpdate = true
```

## Current limitations

```txt
grass has source placement but no host readback
render instance count is implicit in InstancedMesh constructor
accepted/rejected placement summary is not exposed
wind descriptor is not connected to a grass animation result
fixture cannot prove renderer consumed the source placement contract
```

## Required grass snapshots

```txt
GrassPlacementSnapshot:
  sourceSeed: cozy-island-grass
  requestedCount: 140
  patchCount
  radiusMeters: 100
  exclusionZoneCount
  pathNetworkSegmentCount
  bounds
  maskSummary

GrassInstanceSnapshot:
  renderedInstanceCount
  geometry: ConeGeometry
  material: MeshStandardMaterial
  matrixCount
  firstPatchSample
  lastPatchSample

GrassParityResult:
  placementPatchCount
  renderedInstanceCount
  parity: pass | fail
  reason: all-placement-patches-instanced | missing-render-instances | extra-render-instances
```

## Fixture rows

```txt
grass-placement-source:
  source seed equals cozy-island-grass
  requestedCount equals 140
  patchCount is fixture-readable

grass-render-instance:
  renderedInstanceCount equals placement.patches.length
  instance matrix count equals placement.patches.length

grass-exclusion-summary:
  clearing exclusion zones are present
  path network is present
  no browser DOM required
```

## Acceptance

```txt
Do not change grass visuals.
Do not change the 140 requested patch count unless a future implementation explicitly does so.
Do not replace InstancedMesh in the proof pass.
Expose descriptor/instance summaries through CozyIslandHost.getState().grass.
```
