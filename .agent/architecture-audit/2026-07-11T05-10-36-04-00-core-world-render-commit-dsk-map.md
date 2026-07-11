# Architecture Audit: Core World Render Commit DSK Map

Timestamp: `2026-07-11T05-10-36-04-00`

## Goal

Define the ownership line between the pinned NexusEngine Core World domain, MyCozyIsland provider stores, the compatibility snapshot bridge, and the Three/WebGPU render resource graph.

## Active composition

```txt
NexusEngine pinned runtime
  createEngine
  createCoreWorldDomain
  createUniformGridPartition
  createFlatWorldSurface
  createTerrainProviderAdapter
  defineWorldEffectProvider

MyCozyIsland semantic composition
  deterministic seed
  terrain / biome / shoreline
  vegetation / rocks / props / campfire
  ocean / atmosphere / materials / quality
  camera sequence / scenario

Core World provider graph
  FOUNDATION
    cozy-island-terrain-provider
  CLASSIFICATION
    biome-classification-provider
    shoreline-classification-provider
  POPULATION
    vegetation-provider
    rock-provider
    prop-provider
  PRESENTATION
    cell-presentation-provider

Compatibility and render
  legacy-render-snapshot-bridge
    -> render-snapshot-domain-kit
    -> webgpu-stylized-material-renderer-kit
    -> ocean / foam / cloud / fog / post adapters
```

## Current ownership

### NexusEngine Core World

Owns:

- world identity and seed
- uniform-grid partition and flat surface
- focus state
- active-cell calculation
- provider phase ordering
- provider prepare/update/release invocation
- portable world snapshots
- Core World diagnostics and reset

### MyCozyIsland provider modules

Own:

- terrain cell arrays and runtime store
- biome classification cell records
- shoreline classification cell records
- vegetation instance partitioning
- rock instance partitioning
- prop and campfire partitioning
- presentation descriptors
- shared world query facade

### Compatibility bridge

Owns:

- reading the current active-cell IDs
- flattening provider rows into legacy instance lists
- preserving current whole-island renderer descriptor shapes
- falling back to global composition graphs when active rows do not equal the full graph

### Browser/WebGPU host

Owns:

- one startup render snapshot
- scene, camera, sky, lights and shadows
- whole-island geometry/material/instancing graph
- ocean, foam, cloud, fog and post resources
- input listeners, loader timers and animation loop
- global host projection

## Authority gap

The semantic authority graph advances after focus commits, but the render graph has no corresponding commit transaction.

```txt
worldRevision N
  -> provider prepare/update/release
  -> presentation descriptor revision N
  -X-> no render command/result
  -X-> no resource prepare/update/release transaction
  -X-> no renderRevision N acknowledgement
```

`worldRuntime.getState()` exposes active cells and provider counts, but the renderer cannot report:

```txt
consumedWorldRevision
consumedPresentationRevision
acceptedCellIds
preparedCellIds
updatedCellIds
releasedCellIds
resourceCountsByCell
sharedResourceCounts
lastRenderCommitResult
render/source fingerprint parity
```

## DSK boundary to add

```txt
cozy-world-render-consumer-domain
  world-render-command-kit
  world-revision-admission-kit
  presentation-descriptor-snapshot-kit
  cell-render-resource-owner-kit
  cell-render-prepare-kit
  cell-render-update-kit
  cell-render-release-kit
  shared-render-resource-registry-kit
  render-commit-result-kit
  world-render-correlation-kit
  compatibility-render-policy-kit
  world-render-observation-kit
  provider-render-fixture-kit
  browser-cell-lifecycle-smoke-kit
```

## Command contract

```txt
commitWorldPresentation({
  worldId,
  worldRevision,
  activeCellIds,
  descriptors,
  sourceFingerprint
})
```

Result:

```txt
status: accepted | unchanged | rejected | failed
reason
worldRevision
previousRenderRevision
renderRevision
preparedCellIds
updatedCellIds
releasedCellIds
retainedCellIds
resourceDelta
sourceFingerprint
renderFingerprint
```

## Required ordering

Runtime-session lifecycle and exact disposal should remain the first infrastructure gate. The cell render consumer should then reuse that resource registry instead of creating a second ownership mechanism.

```txt
session/resource authority
  -> world revision contract
  -> presentation snapshot
  -> cell resource commit
  -> compatibility bridge policy
  -> correlated diagnostics
  -> Node fixture
  -> browser/GPU smoke
```

## Deferred

- changing terrain, biome, placement or visual algorithms
- adding world content
- changing island coordinates or active radius
- removing the legacy rollback path before parity proof
- public promotion of the provider/render composition before browser lifecycle proof