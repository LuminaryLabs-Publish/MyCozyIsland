# Architecture Audit: Foam Depth Proxy Authority DSK Map

Timestamp: `2026-07-12T00-20-01-04-00`

## Finding

The physical renderer now inserts `foam-occlusion-depth`, but the logical six-pass graph does not declare that pass, its proxy resources, or its lifecycle. `createFoamDepthScene()` snapshots `foamRenderer.meshes` at construction and returns shared-geometry proxy meshes plus one owned `MeshDepthMaterial`. Only transforms are synchronized during rendering.

## Parent domain

```txt
cozy-island-foam-depth-proxy-authority-domain
```

## Candidate DSK map

```txt
foam-depth-proxy-plan-kit
  -> source mesh identity enumeration
  -> proxy topology derivation
  -> geometry sharing policy

foam-depth-proxy-identity-kit
  -> proxy scene, mesh, material and pass IDs

foam-depth-proxy-membership-kit
  -> source/proxy membership map
  -> added, retained and removed identities

foam-depth-proxy-topology-revision-kit
  -> monotonic topology revision
  -> stale-plan rejection

foam-depth-proxy-transform-sync-kit
  -> frame-correlated world/local transform synchronization

foam-depth-proxy-resource-lease-kit
  -> material, scene, mesh and pass ownership
  -> shared versus owned resource classification

foam-depth-proxy-disposal-kit
  -> reverse-order retirement
  -> idempotent disposal result

foam-depth-binding-result-kit
  -> current opaque-depth producer and consumer binding

logical-physical-pass-adapter-kit
  -> maps logical foam depth policy to the physical depth pass

foam-depth-pass-observation-kit
  -> detached pass and resource receipt

foam-occlusion-frame-receipt-kit
  -> graph, topology, resource, backend and frame correlation

foam-proxy-topology-fixture-kit
foam-proxy-disposal-fixture-kit
webgpu-webgl2-foam-depth-parity-fixture-kit
```

## Required invariants

```txt
one current foam topology revision owns one proxy topology revision
source/proxy membership is exact, not construction-time ambient state
shared geometry is never double-disposed
owned proxy material and pass resources are retired exactly once
transform synchronization cites one simulation/render frame
opaque-depth binding identifies the exact producer attachment
logical and physical pass readback derives from an admitted plan
visible output acknowledges graph, topology, resource and backend revisions
```

## Dependency order

```txt
render-layer graph admission
  -> foam proxy plan and topology
  -> resource leases and binding
  -> per-frame transform sync
  -> pass execution and visible-frame receipt
  -> topology reconciliation
  -> disposal
```
