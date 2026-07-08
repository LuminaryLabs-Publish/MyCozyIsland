# Grass System Audit: Grass Instance Source Readback

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-00-36-04-00`

## Current grass surface

The grass system currently flows through:

```txt
createGrassWindDescriptor({ id: "central-grove-soft-wind" })
createGrassPatchPlacementContract({
  seed: "cozy-island-grass",
  count: 140,
  radiusMeters: 100,
  sampleHeight,
  sampleMasks,
  pathNetwork,
  exclusionZones: clearing.clearanceZones
})
grassMesh(grass)
scene.add(grassObj)
```

## Current gap

The route renders grass as an `InstancedMesh`, but the host state does not expose stable grass facts.

Missing readback:

```txt
grass seed
grass requested count
grass accepted patch count
grass exclusion-zone policy
grass render geometry/material intent
grass instance count
grass placement bounds
grass height sample source
grass wind descriptor id
```

## GrassInstanceSnapshot target

```txt
GrassInstanceSnapshot = {
  schema: "cozy.grassInstanceSnapshot.v1",
  seed,
  requestedCount,
  acceptedPatchCount,
  radiusMeters,
  windDescriptorId,
  exclusionZoneCount,
  pathSegmentCount,
  placementBounds,
  render: {
    adapter: "grassMesh",
    primitive: "InstancedMesh",
    geometry: "ConeGeometry(0.08,0.5,4)",
    material: "MeshStandardMaterial",
    instanceCount
  }
}
```

## Fixture rows

```txt
cozy-grass-placement-source-001
  proves placement contract source facts are serializable

cozy-grass-instance-snapshot-001
  proves accepted patch count and render instance count align
```

## Browser splice point

```txt
const grass = createGrassPatchPlacementContract(...)
const grassObj = grassMesh(grass)
projectGrassInstanceSnapshot({ grass, grassObj, wind, graph, clearing })
```

## Guardrail

Do not change the grass visual implementation in this pass.

The next implementation should only summarize what the route already builds.