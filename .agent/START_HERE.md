# START HERE: MyCozyIsland

Last aligned: `2026-07-11T22-20-00-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: make the logical ocean render graph, the physical Three.js/WebGPU pass graph, the kit catalog, and visible-frame evidence describe the same admitted resources and ordering.

## Summary

`MyCozyIsland` now has independent island and sea-floor providers, a validated logical ocean composition graph, fused physical rendering for sky/opaque/water, a rolling-fog pass, and a final foam pass. The new composition source is not registered in the 50-kit catalog, and the physical pipeline is hard-coded rather than compiled from the graph.

The strongest contract split is the final foam pass. The logical graph declares opaque-depth, water-mask, water-surface-depth, shoreline-distance, foam-state, and fog-transmittance reads. The physical foam pass renders a separate scene with `depthBuffer: false` and does not bind those declared resources. The foam materials request depth testing, but there is no shared opaque depth attachment in that pass.

## Plan ledger

**Goal:** document one authoritative path from catalog admission and logical pass declarations through physical resource binding, pass execution, visible-frame acknowledgement, and WebGPU/WebGL2 parity.

- [x] Compare all 10 accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` because it was the oldest eligible central entry and a new layered-render runtime series postdated its audit.
- [x] Trace startup, world preparation, scene construction, logical graph validation, physical pass construction, per-frame rendering, readback, and tests.
- [x] Identify the complete interaction loop, active domains, 50 cataloged kits, one additional runtime composition kit, nine providers, and five imported NexusEngine services.
- [x] Document the logical/physical pass-resource mismatch and catalog omission.
- [x] Add architecture, render, gameplay, interaction, render-graph, and deployment audits.
- [x] Refresh all required root `.agent` files and machine registry.
- [x] Push documentation directly to `main`; create no branch or pull request.
- [ ] Implement graph compilation, physical binding receipts, depth-correct foam, and browser parity fixtures.

## Runtime identity

```txt
route:               index.html -> src/main-cloudform.js?v=render-layer-graph-2
package:             0.4.0
Three.js:            0.185.0
NexusEngine commit:  481cbf6df742e81279bd42245c4238c6a1fc69f2
world id:            world:cozy-island-webgpu-v4
cataloged kits:      50
extra runtime kits:  1 (cozy-ocean-composition-kit)
providers:           9
default world mode:  core
fallback mode:       legacy
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T22-20-00-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-11T22-20-00-04-00-render-layer-binding-authority-dsk-map.md
.agent/render-audit/2026-07-11T22-20-00-04-00-logical-physical-pass-resource-gap.md
.agent/render-graph-audit/2026-07-11T22-20-00-04-00-pass-binding-depth-provenance-contract.md
.agent/gameplay-audit/2026-07-11T22-20-00-04-00-final-foam-occlusion-loop.md
.agent/interaction-audit/2026-07-11T22-20-00-04-00-render-readback-admission-map.md
.agent/deploy-audit/2026-07-11T22-20-00-04-00-webgpu-webgl2-layer-parity-fixture-gate.md
.agent/turn-ledger/2026-07-11T22-20-00-04-00.md
```

## Interaction loop

```txt
startup
  -> validate the 50-entry catalog
  -> independently create cozy-ocean-composition-kit
  -> initialize WebGPU/WebGL2 renderer
  -> create and prepare the selected world runtime
  -> bridge one compatibility render snapshot
  -> construct island, sea floor, water, clouds, fog, and foam
  -> construct a hard-coded physical post pipeline
  -> expose CozyIsland readback

per frame
  -> tick scenario and camera
  -> update Core World focus
  -> animate world and foam
  -> sample adaptive performance
  -> render fused base scene
  -> render rolling fog
  -> render separate final foam scene
  -> apply output transform
  -> process one bounded materialization slice
  -> periodically project diagnostics
```

## Current render split

```txt
logical graph
  background
  opaque-world
  water-composite
  atmosphere-composite
  foam-overlay
  output-transform

physical graph
  base-scene-fused: background + opaque-world + water-composite
  atmosphere-composite
  foam-overlay
  output-transform
```

The logical graph is validated as data. The physical graph is manually authored and returns hard-coded order strings. There is no compile result, resource-binding table, pass receipt, attachment identity, or visible-frame acknowledgement proving that the declared reads and writes were physically honored.

## Implemented kit accounting

```txt
50 catalog-admitted DomainKit entries
1 source-backed runtime composition kit outside the catalog
9 ordered Core World providers
5 imported NexusEngine services used by the active Core path
```

The unregistered runtime kit is:

```txt
cozy-ocean-composition-kit
  logical render-layer graph
  contract validation
  terrain handoff metadata
  per-layer depth/blend policy
```

## Main finding

```txt
foam logical contract
  reads opaque depth, water mask, water surface depth,
  shoreline distance, foam state, and fog transmittance

foam physical pass
  separate THREE.Scene
  depthBuffer: false
  no shared scene-depth binding
  no water-mask binding
  no rolling-fog transmittance binding
  material.depthTest: true
```

The current source can therefore report a valid logical graph while the physical pass lacks the resources that graph says it consumes. At minimum, shoreline foam occlusion and fog integration are not proven by the current tests or readback.

## Required parent domain

```txt
cozy-island-render-layer-binding-authority-domain
```

Candidate kits:

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

## Validation boundary

```txt
runtime source changed by this pass: no
render output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment changed by this pass: no
branch created: no
pull request created: no
npm test: not run
browser WebGPU/WebGL2 smoke: not run
physical resource-binding fixture: unavailable
foam occlusion fixture: unavailable
first layered-frame receipt: unavailable
```
