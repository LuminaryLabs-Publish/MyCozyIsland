# Render audit: render consumption host proof ledger

Timestamp: `2026-07-10T01-04-36-04-00`

## Current render surface

`MyCozyIsland` renders through `src/main-cloudform.js` with Three.js `0.160.0`.

## Current render construction

```txt
create WebGLRenderer({ canvas, antialias, high-performance })
  -> set pixel ratio, output color, tone mapping
  -> create scene background/fog
  -> create PerspectiveCamera
  -> add hemisphere light and directional sun
  -> build sea, fire, smoke, grass, clouds
  -> add floorMesh, terrainMesh, water, foam, path, objGroup, fence, fire, smoke, grass, clouds
  -> frame loop updates dynamic objects and calls renderer.render(scene, camera)
```

## Descriptor consumers

```txt
terrainMesh consumes landform.heightfield
floorMesh consumes floor.heightfield
waterMesh consumes floor.waterMaterial
foamMesh consumes landform.shoreline
pathMesh consumes graph.pathNetwork and sampleHeight
objGroup consumes graph.objects with clearing exclusions
fenceGroup consumes clearing.objects
campfireMesh consumes fireGraph
smokeMesh/updateSmoke consumes smoke descriptor
grassMesh consumes grass.patches as one ConeGeometry InstancedMesh
heroCloudGroup consumes cloud contract and cached point geometries
```

## Render proof gaps

- No render consumption ledger records which source family was consumed.
- No source count to render count parity exists.
- Grass patch descriptors include bladeCount, patchRadius, batchKey, and template, but the renderer currently places one cone instance per patch.
- Ocean-floor placements exist in the source contract but are not rendered as distinct reef/coral/rock/boulder adapters.
- Several foliage source types still fall into a generic rock fallback.
- No renderer/scene/camera snapshot is exposed in serializable form.
- `globalThis.CozyIsland.cloudPointCache` exposes live `BufferGeometry` objects rather than JSON-safe proof state.

## Required next readback rows

```txt
RenderSourceFamilyRow
RenderDescriptorCountRow
RenderAdapterCountRow
RenderSkippedDescriptorRow
GrassPlacementInstanceParityRow
CloudDescriptorGeometryParityRow
CameraSnapshotRow
RendererSnapshotRow
SceneObjectCountRow
LegacyCompatibilityRow
```

## Main finding

The render should not be rewritten next. The next cut should wrap the existing render consumption with a serializable ledger and fixture rows, then use that ledger to guide any later fidelity upgrade.
