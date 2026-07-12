# Next Steps: MyCozyIsland

Last updated: `2026-07-12T00-20-01-04-00`

## Summary

Keep the new depth-aware foam mask, then replace its construction-time proxy snapshot with an admitted proxy topology and resource lifecycle. The next safe implementation must also finish the broader render-graph binding work so the physical depth pass, remaining foam inputs, backend execution, diagnostics, and visible-frame evidence come from one authority.

## Plan ledger

**Goal:** make foam depth proxy membership, resources, opaque-depth binding, frame synchronization, topology replacement, and disposal deterministic and observable.

- [ ] Add `cozy-ocean-composition-kit` to the canonical kit catalog or explicitly classify it.
- [ ] Represent `foam-occlusion-depth` in the admitted physical plan.
- [ ] Assign stable source mesh, proxy mesh, proxy scene, material, pass, graph and topology IDs.
- [ ] Build source/proxy membership from canonical mesh identities.
- [ ] Publish a monotonic source and proxy topology revision.
- [ ] Reconcile added, retained and removed foam meshes atomically.
- [ ] Classify source geometry as shared and the proxy material/pass as owned.
- [ ] Add an idempotent `postPipeline.dispose()` and integrate it with session teardown.
- [ ] Stop the animation loop and callbacks before proxy/resource disposal.
- [ ] Bind the exact current opaque-depth producer through a typed result.
- [ ] Bind water-mask, water-surface-depth and fog-transmittance or revise the logical contract.
- [ ] Derive logical and physical pass readback from the admitted plan and execution receipts.
- [ ] Add topology mutation, disposal, WebGPU/WebGL2 parity, and visible-pixel fixtures.
- [ ] Keep startup, session, world lifecycle, reset, focus, materialization, camera and adaptive-quality gaps visible.

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

## Candidate kits

```txt
foam-depth-proxy-plan-kit
foam-depth-proxy-identity-kit
foam-depth-proxy-membership-kit
foam-depth-proxy-topology-revision-kit
foam-depth-proxy-transform-sync-kit
foam-depth-proxy-resource-lease-kit
foam-depth-proxy-disposal-kit
foam-depth-binding-result-kit
logical-physical-pass-adapter-kit
foam-depth-pass-observation-kit
foam-occlusion-frame-receipt-kit
foam-proxy-topology-fixture-kit
foam-proxy-disposal-fixture-kit
webgpu-webgl2-foam-depth-parity-fixture-kit
```

## Required data contracts

```txt
FoamDepthProxyPlan {
  sessionId
  runtimeGeneration
  graphRevision
  sourceTopologyRevision
  proxyTopologyRevision
  sourceMeshIds[]
  proxyMeshIds[]
  sharedGeometryIds[]
  ownedResourceIds[]
  membership[]
}

FoamDepthBindingResult {
  frameId
  producerPassId
  producerAttachmentId
  consumerPassId
  proxyTopologyRevision
  backend
  accepted
  rejectionReason
}

FoamOcclusionFrameReceipt {
  frameId
  graphRevision
  physicalPlanRevision
  sourceTopologyRevision
  proxyTopologyRevision
  resourceRevision
  bindingResult
  passResults[]
  visibleOutputId
}
```

## Minimum fixture matrix

```txt
static graph
  -> logical/physical adapter includes the depth pass

topology add/remove
  -> exact proxy membership after rebuild

transform sync
  -> source and proxy world transforms match for one frame

resource ownership
  -> shared geometry survives proxy disposal
  -> proxy material and pass retire exactly once

opaque occlusion
  -> terrain, rock, prop and vegetation hide foam correctly

water/fog contract
  -> remaining logical inputs are bound or removed explicitly

backend parity
  -> WebGPU and WebGL2 expose the same result schema

visible frame
  -> capture cites graph, plan, topology, binding, backend and frame revisions
```

## Acceptance conditions

```txt
no construction-time ambient proxy membership
no mixed source/proxy topology in a frame
no leaked proxy material, scene or pass
no double disposal of shared geometry
physical pass identity comes from the admitted plan
all declared foam inputs are bound or removed
public readback derives from execution receipts
browser evidence proves depth-aware foam on both backends
```
