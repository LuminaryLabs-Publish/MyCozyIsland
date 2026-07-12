# Render Proxy Audit: Topology, Lifecycle, and Frame Contract

Timestamp: `2026-07-12T00-20-01-04-00`

## Authority contract

```txt
PrepareFoamDepthProxyCommand
  -> admit session, runtime generation, graph revision and source topology revision
  -> enumerate current foam mesh identities
  -> classify shared geometry and owned proxy resources
  -> create an exact source/proxy membership plan
  -> atomically commit one proxy topology revision
  -> publish FoamDepthProxyPrepareResult

SyncFoamDepthProxyCommand
  -> admit current frame and topology revisions
  -> copy current world transforms
  -> reject stale or missing source identities
  -> publish FoamDepthProxySyncResult

RenderFoamCommand
  -> bind the current opaque-depth producer
  -> execute depth and color passes
  -> publish pass results and one visible-frame receipt

ReconcileFoamTopologyCommand
  -> derive added, retained and removed identities
  -> commit the new membership atomically
  -> retire removed owned resources

DisposeFoamDepthProxyCommand
  -> stop further sync/render admission
  -> retire pass resources, proxy meshes and owned material
  -> preserve shared source geometry ownership
  -> publish an idempotent disposal result
```

## Required failure results

```txt
STALE_RUNTIME_GENERATION
STALE_GRAPH_REVISION
STALE_SOURCE_TOPOLOGY
MISSING_SOURCE_MESH
DUPLICATE_SOURCE_IDENTITY
MISSING_OPAQUE_DEPTH_BINDING
UNSUPPORTED_BACKEND
PROXY_CREATE_FAILED
PROXY_SYNC_FAILED
PROXY_RENDER_FAILED
PROXY_DISPOSAL_INCOMPLETE
```

## Acceptance conditions

```txt
exact membership under add/remove/rebuild
no double disposal of shared geometry
one retirement of the proxy material
no frame uses mixed source/proxy revisions
physical pass identity is represented in the admitted plan
readback comes from execution receipts, not hand-maintained strings
WebGPU and WebGL2 return the same result schema
browser captures prove visible occlusion
```
