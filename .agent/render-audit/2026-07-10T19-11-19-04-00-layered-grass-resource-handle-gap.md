# Render Audit: Layered Grass Resource Handle Gap

Timestamp: `2026-07-10T19-11-19-04-00`

## Active render path

```txt
renderers.js
  -> renderer-world-layered-grass.js
     -> renderer-world.js with grass-patch rows removed
     -> layered grass consumer with original rows
```

## Current visual contract

```txt
three crossed quad layers
one procedural CanvasTexture atlas
one MeshBasicNodeMaterial
unlit
vertex colors
DoubleSide
alphaTest = 0.52
alphaToCoverage = true
depthTest = true
depthWrite = true
toneMapped = false
fog = true
castShadow = false
receiveShadow = false
one InstancedMesh for all accepted rows
```

## Handle graph

```txt
CanvasTexture
  -> material.map

BufferGeometry + MeshBasicNodeMaterial
  -> InstancedMesh

InstancedMesh
  -> grass Group

grass Group
  -> base world Group

base world Group
  -> scene
```

The graph is reachable, but reachability is not ownership. No object is responsible for retaining all handles, reporting them, or disposing them.

## Concrete gaps

- The atlas is created inline in `createUnlitGrassMaterial()`.
- The texture is not returned separately from the material.
- The inner grass renderer is discarded after its group is attached.
- The outer world renderer returns only `group` and `update()`.
- The base renderer returns only `group` and `update()`.
- No `dispose()` traverses texture, geometry, material, mesh, or group resources.
- No readback distinguishes zero-source, live, disposed, and repeated-dispose states.
- No source ledger proves the mesh instance count matches accepted rows.

## Required render result

```txt
{
  adapterId,
  group,
  update,
  getState,
  dispose
}
```

`getState()` must be JSON-safe and report policy identity, accepted source count, rendered instance count, resource counts, and disposed state. `dispose()` must be idempotent.

## Preserve

Do not change atlas art, layer geometry, alpha threshold, material type, transforms, density, or current scene composition during the ownership pass.