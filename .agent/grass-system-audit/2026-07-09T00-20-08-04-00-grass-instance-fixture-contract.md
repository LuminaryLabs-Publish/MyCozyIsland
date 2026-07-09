# Grass System Audit: Instance Fixture Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T00-20-08-04-00`

## Current grass source

`createGrassPatchPlacementContract()` creates deterministic grass patches from seed, radius, masks, path clearance, and exclusion zones.

Current source facts:

```txt
seed default: cozy-island-grass
requested count clamp: 0..220
current route count: 140
minimum radial placement: 12
outer radial placement: radius * 0.78
rejects water/beach/wetSand/rock/cliff masks
rejects exclusion zones
rejects path distance below pathClearance, default 3.6
returns requestedCount, patchCount, patches
```

## Current grass render consumer

`grassMesh(placement)` creates:

```txt
THREE.InstancedMesh(
  new THREE.ConeGeometry(0.08, 0.5, 4),
  new THREE.MeshStandardMaterial(...),
  placement.patches.length
)
```

Each patch writes one transform matrix.

## Missing proof

```txt
GrassInstanceSnapshot does not exist.
No readback proves placement.patchCount equals instanced mesh count.
No fixture proves deterministic seed replay.
No fixture proves path clearance and exclusion zones.
No static-batch descriptor readback is wired into the visible route.
```

## Needed contract

```txt
GrassInstanceSnapshot:
  placementId
  requestedCount
  patchCount
  instanceCount
  batchKeys
  firstPatchIds
  rejectedMasksKnown
  exclusionZonesApplied
  pathClearanceApplied
  deterministicSeed
  status accepted/rejected
```

## Fixture rows

```txt
grass placement returns stable patchCount for same seed
grass placement excludes water/beach/wetSand/rock/cliff masks
grass placement excludes clearing zones
grass placement respects pathClearance
grass instance count equals patchCount
grass batch descriptors can summarize batchKey instance counts
```

## Finding

The grass implementation is adequate for the current route, but its proof surface is missing. Add `GrassInstanceSnapshot` and fixture rows before replacing the visual grass representation.