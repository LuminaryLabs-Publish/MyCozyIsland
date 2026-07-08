# Render Host Proof Readback: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Created:** `2026-07-08T08:58:57-04:00`

## Current visual surface

The active visual route is still:

```txt
index.html -> ./src/main-cloudform.js?v=hero-cloud-3
```

`src/main-cloudform.js` imports Three.js from the CDN and builds the scene inline from local source descriptors.

## Render adapters currently visible in the source

```txt
terrainMesh
floorMesh
waterMesh
foamMesh
pathMesh
objGroup
fenceGroup
campfireMesh
smokeMesh
updateSmoke
grassMesh
heroCloudGeometry
heroCloudGroup
```

## Render domains

```txt
terrain render:
  heightfield samples -> vertex-colored mesh

ocean floor render:
  ocean floor heightfield -> vertex-colored mesh

water render:
  large physical water plane

shoreline render:
  tube geometry foam ring

path render:
  path segment quads

foliage render:
  simplified primitive object graph adapter

fence render:
  fence-post geometry only

campfire render:
  logs, flame cone, and point light

smoke render:
  point cloud with inline age/seed update

grass render:
  instanced cone grass patches

hero cloud render:
  cached point-cloud BufferGeometry with shader point material
```

## Host-proof relationship

The next render-related task is not visual improvement.

The render layer needs readback records that can be generated without WebGL:

```txt
SceneSourceSnapshot
  proves descriptor source facts before mesh creation

CameraRailSnapshot
  proves camera rail values without a THREE.Camera

HeroCloudDescriptorSnapshot
  proves cloud descriptor/lobe/placement/opacity facts

HeroCloudCacheSnapshot
  proves geometry count, saved point-cloud count, total point count, and cache keys

CloudDriftResult
  proves drift outputs for fixed dt/time inputs
```

## Current render gaps

```txt
- Render adapters are inline functions in src/main-cloudform.js.
- Mesh construction and source facts are not separated enough for fixture replay.
- Cloud cache facts live in browser/WebGL runtime state.
- Smoke update facts are animated in runtime but not exposed as deterministic reducer output.
- Grass placement descriptors exist, but renderer proof is still only visible through InstancedMesh output.
```

## Do not fix yet

```txt
- tree/fractal foliage redesign
- textured grass clump batching
- water shader overhaul
- foam breakup pass
- smoke material redesign
- cloud art redesign
```

These are valid future render upgrades, but the next safe ledge is proof readback first.

## Next render-proof stop line

Stop when a fixture can prove:

```txt
- SceneSourceSnapshot includes every source descriptor family.
- CameraRailSnapshot is deterministic for progress 0, 0.5, and 1.
- HeroCloudDescriptorSnapshot reports stable cloud ids, point counts, lobe counts, placements, opacity, and drift settings.
- HeroCloudCacheSnapshot reports deterministic geometry/cache counts.
- CloudDriftResult is deterministic for fixed dt/time samples.
```
