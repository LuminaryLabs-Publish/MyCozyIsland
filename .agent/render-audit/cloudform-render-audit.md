# Render Audit: Cloudform Scene

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-08T02:09:17-04:00`

## Current render stack

```txt
index.html
  -> canvas#game
  -> src/main-cloudform.js
  -> Three.js CDN
  -> local source descriptors
  -> inline render adapter functions
  -> frame loop updates smoke, campfire, cloud drift, camera, and movement
```

## Render surfaces found

```txt
terrainMesh
  heightfield samples -> BufferGeometry -> vertex-color MeshStandardMaterial

floorMesh
  ocean floor samples -> BufferGeometry -> vertex-color MeshStandardMaterial

waterMesh
  large plane -> MeshPhysicalMaterial

foamMesh
  shoreline samples -> TubeGeometry -> transparent MeshBasicMaterial

pathMesh
  path segments -> quad strips -> MeshStandardMaterial

objGroup
  procedural foliage/object graph -> simplified primitive meshes

fenceGroup
  fence object records -> cylinder posts

campfireMesh
  logs, cone flame, point light

smokeMesh / updateSmoke
  smoke descriptor -> THREE.Points -> per-frame position mutation

grassMesh
  grass patch placement -> InstancedMesh cone geometry

heroCloudGeometry / heroCloudGroup
  cloud render contract -> cached point cloud geometry -> ShaderMaterial points
```

## Good current properties

```txt
- The app uses local source descriptors before rendering.
- Grass is already batched with InstancedMesh, even though the primitive is simple.
- Hero clouds use cached point-cloud geometry instead of recreating geometry every frame.
- The route is static and simple enough for GitHub Pages.
- The render path has clear adapter seams even though they are still inline functions.
```

## Render gaps

```txt
- Renderer adapters are inline in src/main-cloudform.js.
- Trees/foliage read as placeholder primitives.
- Grass is cone geometry, not textured plane clumps.
- Smoke particle update is host-owned and not replayable as a descriptor result.
- Cloud point cache is useful but not snapshotted for parity testing.
- Water/foam are simple materials without deeper island/ocean shader treatment.
- Render contracts are not validated before adapter consumption.
```

## Render next step

Do not start by replacing every visual.

First split proof and handoff:

```txt
source descriptor
  -> render contract validation
  -> named render adapter handoff
  -> render object construction
  -> render snapshot metadata
  -> fixture-readable counts and cache state
```

Then upgrade visual fidelity only where the descriptor boundary is stable:

```txt
1. grass clumps as varied static batches
2. tree/palm/bush typed geometry or billboards
3. smoke particle descriptor runtime
4. richer shoreline foam breakup
5. cloud cache and drift result snapshots
```

## Renderer ownership rule

Renderer code can remain local while the app is a publish proof.

Reusable renderer behavior should only be promoted out of the repo after the source contract, result contract, and replay fixtures are stable.
