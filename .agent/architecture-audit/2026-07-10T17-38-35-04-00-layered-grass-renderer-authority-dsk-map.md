# Architecture Audit: Layered Grass Renderer Authority DSK Map

Timestamp: 2026-07-10T17-38-35-04-00

## Current composition

```txt
vegetation-placement-domain-kit
  -> vegetation:placement-graph
  -> vegetation.byType["grass-patch"]

render-snapshot-domain-kit
  -> immutable snapshot with grass rows

webgpu-stylized-material-renderer-kit
  -> createStylizedWorldRenderer(snapshot)

renderers.js facade
  -> renderer-world-layered-grass.js
     -> createSnapshotWithoutLegacyGrass(snapshot)
     -> renderer-world.js(baseSnapshot)
     -> createLayeredGrassRenderer(originalSnapshot)
     -> attach grass group to base group
```

## Current authority split

### Semantic source authority

`vegetation-placement-domain-kit` owns where grass exists and supplies position, rotation, scale, phase, and tint values.

### Base world authority

`renderer-world.js` owns the general stylized world group and still contains a legacy grass implementation, but the wrapper prevents it from receiving grass rows.

### Layered grass adapter authority

`renderer-world-layered-grass.js` currently owns all of the following in one module:

```txt
source-row selection
legacy-consumer suppression
atlas pixel generation
atlas texture creation
layer geometry definition
BufferGeometry creation
material policy
material creation
instance transform projection
instance color projection
mesh/group creation
composition with the base world
```

### Host authority

`src/main-cloudform.js` sees only the generic `createStylizedWorldRenderer()` contract and receives only `{ group, update }`. It cannot identify which grass adapter is active or dispose/query it.

## Declared versus implemented map

```txt
Declared catalog capability:
  render:webgpu-stylized-world

Implemented hidden sub-capabilities:
  render:layered-alpha-grass
  render:grass-alpha-atlas
  render:grass-source-substitution
  render:grass-instance-projection
```

The hidden sub-capabilities are real source responsibilities but do not exist in the 50-kit dependency graph.

## Recommended DSK boundary

Do not add several unrelated kits merely to increase kit count. Use one explicit provider boundary with small pure helpers.

```txt
layered-grass-renderer-kit
  requires:
    vegetation:placement-graph
    render:snapshot
    render:quality
  provides:
    render:layered-alpha-grass
    render:grass-consumption-result
    render:grass-resource-snapshot

pure helpers owned by that kit:
  layered-grass-render-policy
  layered-grass-atlas-descriptor
  layered-grass-geometry-descriptor
  layered-grass-consumption-result

browser adapter resources:
  CanvasTexture
  BufferGeometry
  MeshBasicNodeMaterial
  InstancedMesh
  Group
```

Alternatively, if the exact 50-kit constraint must remain absolute, extend `webgpu-stylized-material-renderer-kit` with the three explicit grass capabilities and document the adapter as an internal scoped domain. The current implicit state is the unsafe option.

## Required service contract

```txt
create(snapshot, options)
  -> validates grass source rows
  -> builds deterministic policy descriptors
  -> creates resources
  -> returns:
       group
       update(elapsedSeconds)
       getState()
       dispose()
       consumptionResult
```

`getState()` must be JSON-safe and include:

```txt
adapterId
policyVersion
sourceCount
acceptedCount
rejectedCount
suppressedLegacyCount
renderedInstanceCount
layerCount
atlasDimensions
alphaClip
lightingMode
windMode
lodMode
resourceState
disposed
```

## Ownership rules

```txt
placement kit owns semantic grass rows
render snapshot owns immutable source reference
layered grass adapter owns resources it creates
base renderer must not dispose wrapper-owned resources
host owns calling adapter dispose during teardown/recreate
readback never exposes live Three.js objects
```

## Dependency-order gate

```txt
explicit capability identity
  -> pure policy descriptors
  -> typed source validation/result
  -> browser resource owner
  -> JSON-safe readback
  -> DOM-free fixture
  -> browser lifecycle smoke
  -> optional wind/LOD work
```

## Main finding

The existing module is already a coherent candidate scoped domain, but the public contract erases that identity. The next change should expose and prove the boundary rather than rewrite the visual implementation.
