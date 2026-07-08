# Grass System Audit: Grass Snapshot Fixture Sync

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-09-48-04-00`

## Current grass system

```txt
createGrassWindDescriptor({ id: "central-grove-soft-wind" })
  -> createGrassPatchPlacementContract({ seed: "cozy-island-grass", count: 140, radiusMeters: 100, ... })
  -> grassMesh(grass)
  -> THREE.InstancedMesh using cone blade geometry
  -> one matrix per patch
  -> scene.add(grassObj)
```

## Current services

```txt
createGrassWindDescriptor
createGrassPatchPlacementContract
grassMesh
```

## Gap

Grass placement is source-driven, but the renderer does not expose a stable `GrassInstanceSnapshot`.

The next implementation must prove the source seed, requested count, accepted patch count, exclusion policy, and rendered instance count without opening the browser.

## Required GrassInstanceSnapshot shape

```txt
GrassInstanceSnapshot
  routeVersion
  seed
  requestedCount
  radiusMeters
  patchCount
  exclusionZoneCount
  pathNetworkPresent
  windDescriptorId
  instanceMeshCount
  samplePatchTransforms[]
```

## Source files

```txt
src/host-proof/grass-instance-snapshot.js
src/host-proof/fixture-cases.mjs
```

## Fixture rows

```txt
cozy-grass-placement-source-001
cozy-grass-instance-snapshot-001
cozy-render-grass-instance-count-001
```

## Browser splice points

```txt
const wind = createGrassWindDescriptor(...)
const grass = createGrassPatchPlacementContract(...)
const grassObj = grassMesh(grass)
scene.add(grassObj)
globalThis.CozyIslandHost.getState().grass
```

## Guardrail

Do not change grass count, seed, placement radius, cone geometry, material color, exclusion zones, or instance transform math in the proof pass.
