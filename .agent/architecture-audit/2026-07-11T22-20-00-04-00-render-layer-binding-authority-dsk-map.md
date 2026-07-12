# Architecture Audit: Render Layer Binding Authority DSK Map

Timestamp: `2026-07-11T22-20-00-04-00`

## Summary

The repository has a logical render graph and a physical renderer, but no composed domain owns the translation between them. The logical graph can validate while the physical pipeline omits declared inputs, uses different pass fusion, and reports manually maintained order strings.

## Goal

Define one composed DSK/domain that admits the graph revision, compiles it into backend-specific physical passes, binds every named resource, executes the plan, and publishes typed results and visible-frame proof.

## Current architecture

```txt
src/kits/catalog.js
  -> 50 DomainKit descriptors
  -> validateKitCatalog()

src/kits/cozy-ocean-composition-kit.js
  -> extra runtime kit outside catalog
  -> six logical passes
  -> descriptor-only validation

src/kits/renderer-post.js
  -> manual fused base scene
  -> manual atmosphere pass
  -> manual foam-only scene/pass
  -> hard-coded order readback

src/main-cloudform.js
  -> validates catalog
  -> constructs composition kit separately
  -> constructs physical pipeline separately
  -> exposes both through CozyIsland
```

## Required parent domain

```txt
cozy-island-render-layer-binding-authority-domain
```

## Proposed child kits

### Catalog and admission

```txt
kit-catalog-completeness-kit
  enumerate all active source-backed kit IDs
  classify cataloged, imported, provider, helper, or intentionally external surfaces
  reject duplicate or missing classification

render-composition-admission-kit
  validate graph ID, version, revision, backend policy, and required pass families
  return admitted or rejected composition result
```

### Pass identity and compilation

```txt
logical-pass-identity-kit
  stable logical pass IDs and revisions

physical-pass-identity-kit
  stable backend pass IDs and revisions

fused-pass-plan-kit
  map multiple logical passes into one physical submission without losing dependencies

render-graph-compile-result-kit
  publish graph, fusion, order, resources, bindings, warnings, and errors
```

### Resource authority

```txt
render-resource-identity-kit
  stable resource IDs, formats, dimensions, and revisions

render-resource-production-kit
  declare producer pass and output attachment

render-resource-binding-kit
  bind one consumer read to one producer or admitted external input

pass-admission-result-kit
  reject missing, stale, cyclic, unsupported, or ambiguous bindings
```

### Depth, water, fog, and foam

```txt
depth-provenance-kit
  identify the exact depth attachment used by every depth test/sample

water-mask-provenance-kit
  define whether water coverage is physical, derived, or not required

fog-transmittance-provenance-kit
  define the rolling-fog contribution consumed by later scene content

foam-occlusion-policy-kit
  define opaque occlusion, water admission, fog integration, depth writes, and final-pass rules
```

### Observation and proof

```txt
logical-physical-parity-result-kit
  compare graph declarations with compiled physical bindings

render-pass-observation-kit
  detached pass start/end/result receipts

first-layered-frame-receipt-kit
  graph, plan, backend, world, resource, and visible-output identity

browser-foam-occlusion-fixture-kit
  capture and compare shoreline foam behind representative occluders

webgpu-webgl2-layer-parity-fixture-kit
  enforce shared logical result schemas and backend-specific physical evidence
```

## Required compile flow

```txt
CatalogSnapshot
  + RenderCompositionGraph
  + BackendCapabilities
  + SurfaceRevision
  + WorldRevision

  -> composition admission
  -> dependency order
  -> fusion planning
  -> physical pass allocation
  -> resource production plan
  -> resource binding resolution
  -> backend support validation
  -> CompiledRenderPlan
```

## Required execution flow

```txt
CompiledRenderPlan
  -> acquire current attachments
  -> execute physical pass 1..N
  -> emit pass receipts
  -> resolve final output resource
  -> submit renderer work
  -> acknowledge visible frame
  -> publish detached observation
```

## Minimum state

```txt
RenderLayerAuthorityState {
  graphId
  graphVersion
  graphRevision
  compileRevision
  backend
  surfaceRevision
  worldRevision
  logicalPassCount
  physicalPassCount
  fusionGroups
  resources
  bindings
  lastCompileResult
  lastExecutionResult
  lastVisibleFrameReceipt
}
```

## Current-to-required mapping

| Current surface | Current owner | Required owner |
|---|---|---|
| `kitCatalog` | local array | catalog completeness authority |
| `oceanComposition.graph` | composition kit | admitted graph revision |
| `validation` | descriptor validator | admission + compile result |
| `scenePass` | renderer-post | compiled physical pass |
| `sceneDepth` | local node | named depth resource with producer/bindings |
| `volumetricPass` | renderer-post | compiled atmosphere pass |
| `foamPass` | renderer-post | compiled final scene-content pass |
| pass-order arrays | hard-coded getters | derived execution plan and receipts |
| `CozyIsland.getState()` | raw projection | detached current-plan/frame observation |

## Dependency rule

The parent domain belongs between render descriptors and backend adapters:

```txt
semantic world/render descriptors
  -> render-layer binding authority
  -> Three.js WebGPU/WebGL2 adapter
  -> visible frame acknowledgement
```

The semantic graph must not store Three.js objects. The backend adapter must not invent undeclared dependencies without reporting them through the compile result.

## Acceptance gate

```txt
all active kit surfaces classified exactly once
one graph revision compiles into one physical plan revision
all logical reads resolve explicitly
all depth tests cite one current depth attachment
foam occlusion and fog integration are physically proven
hard-coded pass order is removed or derived
backend parity uses shared typed results
visible frame cites graph, plan, resources, world, and backend
```
