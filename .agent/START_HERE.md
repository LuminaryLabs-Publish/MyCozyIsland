# START HERE: MyCozyIsland

Last aligned: `2026-07-12T00-20-01-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: preserve the new opaque-depth foam mask while making the foam-depth proxy an admitted, topology-aware, disposable, frame-correlated render capability.

## Summary

The post-audit runtime series fixed the clearest visible issue from the prior render-layer audit. Final shoreline foam now receives a manually constructed depth proxy, samples its depth against the fused scene depth, and masks foam color behind opaque world geometry.

The fix remains outside the logical six-pass graph and outside a complete resource lifecycle. The proxy pair list is captured once from `foamRenderer.meshes`, only transforms are synchronized per frame, the new proxy material and pass have no disposal result, pass readback is still hand-authored, and the test checks source tokens rather than GPU attachments or pixels. Water-mask, water-surface-depth, and fog-transmittance remain declared logical inputs without physical bindings.

## Plan ledger

**Goal:** align graph, proxy topology, physical resources, lifecycle, backend execution, diagnostics, and visible-frame evidence without regressing depth-correct foam.

- [x] Compare all 10 accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` because its central audit was oldest and a newer foam/camera runtime series postdated it.
- [x] Trace startup, world preparation, logical graph creation, proxy construction, per-frame sync, post rendering, readback, page exit, and tests.
- [x] Identify the interaction loop, all domains, all 50 cataloged kits, the extra composition kit, nine providers, and five imported NexusEngine services.
- [x] Record closed, partially closed, and retained render-binding findings.
- [x] Define the foam-depth proxy authority DSK and fixture gate.
- [x] Add timestamped tracker, turn ledger, architecture, render, gameplay, interaction, render-proxy, and deploy audits.
- [x] Refresh required root `.agent` files and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable browser/GPU fixtures remain future work.

## Runtime identity

```txt
route:               index.html -> src/main-cloudform.js?v=foam-depth-camera-1
package:             0.4.1
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
.agent/trackers/2026-07-12T00-20-01-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-12T00-20-01-04-00-foam-depth-proxy-authority-dsk-map.md
.agent/render-audit/2026-07-12T00-20-01-04-00-manual-depth-proxy-resource-gap.md
.agent/render-proxy-audit/2026-07-12T00-20-01-04-00-topology-lifecycle-frame-contract.md
.agent/gameplay-audit/2026-07-12T00-20-01-04-00-foam-topology-frame-loop.md
.agent/interaction-audit/2026-07-12T00-20-01-04-00-render-proxy-readback-admission-map.md
.agent/deploy-audit/2026-07-12T00-20-01-04-00-foam-proxy-browser-fixture-gate.md
.agent/turn-ledger/2026-07-12T00-20-01-04-00.md
```

## Interaction loop

```txt
startup
  -> validate catalog and create logical composition graph
  -> initialize renderer and world runtime
  -> create source foam meshes
  -> snapshot source mesh membership into a foam-depth proxy scene
  -> install input, resize, timers and animation loop

frame
  -> tick scenario and camera
  -> update source foam
  -> copy source transforms into fixed proxy pairs
  -> render fused base depth and fog
  -> render foam proxy depth
  -> compare proxy depth against scene depth
  -> mask and composite foam color
  -> materialize cells and project diagnostics

page exit
  -> dispose world domains only
```

## Current render state

```txt
logical graph
  background
  opaque-world
  water-composite
  atmosphere-composite
  foam-overlay
  output-transform

physical graph
  base-scene-fused
  atmosphere-composite
  foam-occlusion-depth
  foam-overlay
  output-transform
```

The opaque-depth visual mask is now present. The physical depth pass is still manually inserted rather than compiled from the graph, and the proxy has no topology revision, resource lease, disposal contract, pass receipt, or visible-frame acknowledgement.

## Implemented surface

```txt
50 catalog-admitted DomainKit entries
1 source-backed composition kit outside the catalog
9 ordered Core World providers
5 imported NexusEngine services
```

The complete per-kit service map is in `.agent/current-audit.md`, `.agent/kit-registry.json`, and the current tracker.

## Required parent domain

```txt
cozy-island-foam-depth-proxy-authority-domain
```

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Render Layer Graph Admission and Physical Resource Binding Authority
4a. Foam Depth Proxy Topology and Lifecycle Authority
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
proxy topology fixture: unavailable
proxy disposal fixture: unavailable
first visible foam-frame receipt: unavailable
```
