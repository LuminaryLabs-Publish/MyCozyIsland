# Next Steps: MyCozyIsland

Last updated: `2026-07-11T22-20-00-04-00`

## Summary

The layered ocean pipeline needs one authority between the logical graph and the physical renderer. The next implementation slice should register the composition kit, compile one physical execution plan, bind each declared resource explicitly, and prove foam occlusion and backend parity in a browser.

## Plan ledger

**Goal:** make the logical render graph executable and observable instead of maintaining a valid descriptor beside a separately hard-coded pipeline.

- [ ] Add `cozy-ocean-composition-kit` to the canonical kit catalog or explicitly classify it outside the catalog.
- [ ] Update catalog count, capabilities, public kit catalog, and diagnostics from one source.
- [ ] Assign stable logical pass, physical pass, graph revision, and resource IDs.
- [ ] Compile fused physical passes from the admitted logical graph.
- [ ] Resolve every declared read against one producer or admitted external input.
- [ ] Add typed missing-binding, stale-binding, unsupported-backend, and cycle results.
- [ ] Bind the final foam pass to the exact opaque depth attachment it tests against.
- [ ] Either bind water-mask/water-surface-depth/fog-transmittance or revise the logical foam contract to match the physical algorithm.
- [ ] Derive reported logical and physical pass order from the compiled plan.
- [ ] Publish pass execution receipts and one first-layered-frame acknowledgement.
- [ ] Add WebGPU and WebGL2 physical resource-binding parity fixtures.
- [ ] Add browser captures proving foam does not render through island, sea floor, props, or vegetation.
- [ ] Add rolling-fog/foam integration fixtures at near, mid, and far camera positions.
- [ ] Keep all prior startup, session, lifecycle, focus, materialization, and disposal gaps visible.

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Render Layer Graph Admission and Physical Resource Binding Authority
5. Core World Reset / Re-prepare Authority
6. Pinned Core World Focus Transaction Authority
7. Live Materialization Readiness Commit Authority
8. Core World Render Commit Authority
9. Camera Rail Baseline Authority
10. Dynamic Environment Frame Authority
11. Adaptive Quality Transaction Authority
```

## Candidate render-binding kits

```txt
kit-catalog-completeness-kit
render-composition-admission-kit
logical-pass-identity-kit
physical-pass-identity-kit
render-resource-identity-kit
render-resource-production-kit
render-resource-binding-kit
fused-pass-plan-kit
pass-admission-result-kit
depth-provenance-kit
water-mask-provenance-kit
fog-transmittance-provenance-kit
foam-occlusion-policy-kit
render-graph-compile-result-kit
logical-physical-parity-result-kit
render-pass-observation-kit
first-layered-frame-receipt-kit
browser-foam-occlusion-fixture-kit
webgpu-webgl2-layer-parity-fixture-kit
```

## Required compiled plan

```txt
CompiledRenderPlan {
  graphId
  graphRevision
  backend
  logicalPasses[]
  physicalPasses[]
  fusionGroups[]
  resources[]
  bindings[]
  externalInputs[]
  outputResourceId
  validation
}
```

## Required resource binding

```txt
RenderResourceBinding {
  bindingId
  resourceId
  producerPassId
  consumerPassId
  attachmentKind
  backendHandleClass
  format
  sizeRevision
  worldRevision
  frameId
  accepted
  rejectionReason
}
```

## Required foam contract

```txt
foam pass
  receives one current scene color input
  receives one current opaque depth input when depth testing is declared
  receives or explicitly does not require water mask and water-surface depth
  receives or explicitly does not require rolling-fog transmittance
  cannot write depth
  cannot mutate terrain, physics, or fog state
  remains the final authored scene-content pass
```

## Minimum fixture matrix

```txt
catalog completeness
  all source-backed kit IDs accounted for exactly once

logical/physical compile
  six logical passes -> admitted fused physical plan

missing resource
  declared read without producer -> deterministic rejection

foam depth
  opaque island and prop occlude shoreline foam

foam/water
  foam appears only on admitted shoreline/water regions

foam/fog
  rolling fog and distance treatment match the declared contract

backend parity
  WebGPU and WebGL2 expose the same plan/result schema

resize/quality
  resource revisions advance and stale bindings reject

visible frame
  first layered frame cites graph, plan, resource, world, and backend revisions
```

## Acceptance conditions

```txt
catalog and runtime kit counts agree
physical passes are derived from one admitted graph revision
every logical read has one explicit binding or admitted external source
depth-tested foam identifies and samples the current opaque depth attachment
hard-coded pass-order strings are removed or derived
WebGPU/WebGL2 return the same compile and execution result classes
browser evidence proves opaque occlusion and final-pass ordering
public readback cites the current graph and physical plan revisions
```

## Next safe ledge

```txt
MyCozyIsland Render Layer Graph Admission and Physical Resource Binding Authority
+ Catalog Completeness / Foam Depth / Fog Integration / Backend Parity / First-Layered-Frame Fixture Gate
```
