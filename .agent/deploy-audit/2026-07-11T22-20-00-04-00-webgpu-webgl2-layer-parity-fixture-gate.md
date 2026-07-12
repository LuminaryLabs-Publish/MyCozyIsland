# Deploy Audit: WebGPU/WebGL2 Layer Parity Fixture Gate

Timestamp: `2026-07-11T22-20-00-04-00`

## Summary

The static Pages route has Node tests for logical graph order and source-level terrain separation, but no browser/GPU gate proving physical attachment bindings, shoreline-foam occlusion, rolling-fog integration, or WebGPU/WebGL2 result parity.

## Current deployment surface

```txt
static GitHub Pages route
index.html + ES modules
Three.js 0.185.0 pinned through import map
NexusEngine commit 481cbf6df742e81279bd42245c4238c6a1fc69f2
active module query: render-layer-graph-2
no production build step
```

## Current test chain

```txt
static-check
domain-smoke
world-baseline
core-world-runtime
world-provider-order
world-query-parity
world-population-parity
world-snapshot-portability
world-cell-lifecycle
lazy-world-materialization
render-layer-graph
terrain-layer-separation
renderer-cell-cache
renderer-resource-disposal
```

## Existing gate limitations

```txt
logical pass descriptors: tested
terrain/provider source separation: tested
expected source tokens: tested
actual GPU attachments: not tested
actual pass submission order: not tested
foam depth occlusion: not tested
water-mask binding: not tested
rolling-fog transmittance binding: not tested
backend parity: not tested
visible-frame provenance: not tested
```

## Required static gates

```txt
catalog completeness
  every active source-backed kit classified exactly once

render-plan compile
  six logical passes compile into an admitted physical plan

resource resolution
  every read resolves to producer/external source

binding failure
  missing depth, mask, or transmittance produces typed rejection

order derivation
  public order equals compiled execution order
```

## Required browser matrix

```txt
backend
  WebGPU
  WebGL2 fallback

quality
  ultra
  high
  medium
  low

surface
  initial viewport
  wide resize
  tall resize
  DPR/resource-scale transition

camera
  aerial reveal
  low rail
  first-person clearing

fog
  low density
  medium density
  high density
```

## Required visual fixtures

```txt
far-side shoreline foam behind island silhouette
foam behind rock
foam behind fence/prop
foam behind vegetation
foam at water/shore contact
foam through rolling fog
final output before/after resize
WebGPU/WebGL2 comparison for each representative scene
```

## Required machine readback

```txt
graph ID/version/revision
compile revision
backend and quality revision
surface/resource revisions
logical and physical pass IDs
binding table
pass execution receipts
final output resource ID
visible-frame receipt
```

## Pages smoke

```txt
load deployed index route
confirm pinned imports resolve
confirm renderer backend result
confirm admitted graph/plan readback
wait for first layered-frame receipt
capture representative frame
assert no startup or pass rejection
assert pass/resource revisions remain coherent after resize
```

## Deployment policy

The Pages workflow should fail when:

```txt
active runtime kit is unclassified
logical graph cannot compile
required resource binding is missing
backend result schema diverges
foam occlusion fixture fails
first layered-frame receipt is absent
live route imports a different engine/Three.js revision than documented
```

## Validation boundary for this run

```txt
workflow changed: no
runtime changed: no
package test chain changed: no
browser fixtures added: no
Pages smoke run: no
```

## Acceptance gate

```txt
Node tests prove graph/catalog/resource contracts
browser tests prove physical passes and attachments
captures prove foam occlusion and fog treatment
WebGPU/WebGL2 publish equivalent logical results
Pages route publishes one correlated visible-frame receipt
```
