# Render Audit: Layered Grass Substitution and Lifecycle Gap

Timestamp: 2026-07-10T17-38-35-04-00

## Active render path

```txt
main-cloudform.js
  -> createStylizedWorldRenderer(snapshot)
  -> renderers.js facade
  -> renderer-world-layered-grass.js
     -> base renderer with grass rows removed
     -> layered grass renderer from original grass rows
  -> baseRenderer.group.add(grassRenderer.group)
  -> scene.add(worldRenderer.group)
```

## Grass draw construction

```txt
source rows: snapshot.vegetation.byType["grass-patch"]
geometry: one BufferGeometry containing three crossed quads
material: one MeshBasicNodeMaterial
texture: one procedurally generated CanvasTexture atlas
mesh: one InstancedMesh
instances: one matrix and optional color per source row
```

## Material policy

```txt
lighting: unlit
side: double-sided
transparent: false
alphaTest: 0.52
alphaToCoverage: true
depthTest: true
depthWrite: true
toneMapped: false
fog: true
castShadow: false
receiveShadow: false
```

## Confirmed strengths

- The wrapper prevents the old grass path from drawing the same source rows.
- A single instanced mesh keeps draw-call overhead compact.
- Three crossed planes provide view-angle coverage without a dense blade mesh.
- Alpha testing avoids sorted transparent blending.
- Depth writing preserves grass-to-world occlusion.
- The atlas and geometry are deterministic because they use fixed constants and local hashing.
- The base renderer remains reusable and unchanged.

## Confirmed gaps

### Hidden substitution

The facade preserves the old function name, so render-host code and diagnostics cannot tell that a different adapter is active.

### No consumption proof

The snapshot is shallow-copied and its grass list is emptied for the base renderer. There is no typed result proving:

```txt
source rows
accepted rows
rejected rows
legacy rows suppressed
instances emitted
```

### Resource lifecycle

The adapter creates a CanvasTexture, BufferGeometry, MeshBasicNodeMaterial, InstancedMesh, and Group but returns no `dispose()` method. No owner is assigned for texture/material/geometry cleanup.

### No render readback

The material policy is stored only in `mesh.userData`. The wrapper does not expose the mesh, policy, atlas identity, geometry identity, counts, or resource state to the host.

### No update contract

`grassRenderer.update()` is empty. The wrapper calls it each frame, but there is no explicit `static` update mode or reason why vegetation wind is not consumed.

### No quality/LOD contract

The adapter receives the complete snapshot but does not read `snapshot.quality` or `snapshot.vegetationLod`. Every startup row becomes an instance. Frustum culling exists; distance or quality reduction does not.

### Browser-only construction

Atlas creation requires `document.createElement("canvas")`. Pure atlas intent and pixel-generation parameters cannot be imported by the Node tests.

## Safe render boundary

Preserve the current implementation while changing the public return contract to:

```txt
{
  group,
  update,
  getState,
  dispose,
  grass: {
    policy,
    consumptionResult
  }
}
```

The live mesh may remain private. `getState()` should return plain data only.

## Required render fixture

A browser smoke should create a minimal snapshot with known grass rows and prove:

```txt
base renderer receives zero grass rows
one grass group is attached
one InstancedMesh is created
geometry contains three layers
atlas dimensions are 192 x 128
material alphaTest is 0.52
instance count matches accepted rows
policy readback is JSON-safe
dispose releases every owned resource
```

## Main finding

The renderer is a reasonable performant visual implementation, but it is not yet a complete render service. Lifecycle and readback are the missing safety boundary, not another shader or geometry pass.
