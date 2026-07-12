# Render Audit: Manual Depth Proxy Resource Gap

Timestamp: `2026-07-12T00-20-01-04-00`

## Resolved since the prior audit

```txt
final foam now samples a foam-depth texture
final foam compares against the fused scene depth
final foam color and alpha are masked by that comparison
physical pass order reports foam-occlusion-depth
```

## Remaining split

```txt
logical graph: background, opaque, water, atmosphere, foam, output
physical graph: fused base, atmosphere, foam-depth proxy, foam color, output
```

The extra physical pass is hand-authored. It is not represented by a logical pass ID, resource descriptor, compile result, binding table, or execution receipt.

## Resource gap

```txt
source foam meshes captured once at pipeline construction
proxy meshes share source geometries
one new MeshDepthMaterial is owned by the proxy path
proxy transforms copied every frame
proxy membership never reconciled
postPipeline exposes no dispose()
pagehide calls only domains.dispose()
```

## Still-unbound logical inputs

```txt
water-mask
water-surface-depth
fog-transmittance
```

The opaque-depth visibility mask is therefore a partial physical implementation of the logical foam contract, not full graph parity.

## Required proof

```txt
exact source/proxy membership before and after topology change
exact resource ownership and disposal receipt
exact opaque-depth producer attachment
WebGPU and WebGL2 pass/resource parity
pixel proof behind terrain, rocks, props and vegetation
fog and water-region admission proof
first visible frame cites graph, proxy topology and resource revisions
```
