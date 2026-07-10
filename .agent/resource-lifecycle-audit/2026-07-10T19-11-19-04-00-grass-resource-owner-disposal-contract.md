# Resource Lifecycle Audit: Grass Resource Owner and Disposal Contract

Timestamp: `2026-07-10T19-11-19-04-00`

## Current allocations

```txt
CanvasTexture atlas
BufferGeometry
MeshBasicNodeMaterial
InstancedMesh
Group
Object3D transform helper
```

The transform helper is temporary CPU state. Texture, geometry, material, mesh, and group are long-lived render resources.

## Current owner

```txt
none explicitly declared
```

The atlas is hidden behind `material.map`; geometry and material are hidden behind the mesh; the mesh is hidden behind the inner renderer; the inner renderer is discarded by the outer wrapper.

## Target owner surface

```txt
createLayeredGrassResourceOwner({ policy, descriptors, acceptedRows })
  -> group
  -> update(elapsedSeconds)
  -> getState()
  -> dispose()
```

## Required state

```txt
adapterId
policyId
sourceFingerprint
textureCount
geometryCount
materialCount
meshCount
groupCount
instanceCount
lifecycle: created | live | disposed
disposeCount
lastDisposeResult
```

## Disposal order

```txt
remove mesh/group from parent when owned by the adapter
dispose atlas texture
dispose geometry
dispose material
clear mesh references
mark owner disposed
return grass_resource_disposed
```

A second call must not dispose again and must return `grass_dispose_noop`.

## Edge cases

```txt
zero accepted rows
partial construction failure
material creation failure
mesh creation failure
outer world disposal after inner disposal
inner disposal after outer world disposal
repeated scene construction
```

## Composition requirement

The outer world renderer must retain the grass resource owner and compose its `getState()` and `dispose()` methods. Attaching only the group is insufficient.

## Deferred decision

A broader generic Three.js scene disposal traversal may be useful later, but this slice should first establish explicit ownership for the newly introduced grass resources.