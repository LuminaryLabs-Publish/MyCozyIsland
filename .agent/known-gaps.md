# Known Gaps: MyCozyIsland

Last updated: `2026-07-12T00-20-01-04-00`

## Summary

The runtime now includes an opaque-depth foam visibility mask, but the new physical depth proxy is still manual, construction-time, unversioned, and undisposed. The logical graph and public readback do not own that pass, and three declared foam inputs remain unbound.

## Resolved since the prior audit

```txt
final foam has a physical depth texture
final foam compares against fused scene depth
opaque geometry can mask foam color and alpha
physical pass order includes foam-occlusion-depth
```

## Remaining graph gaps

```txt
composition kit in canonical catalog: no
logical graph declares foam-occlusion-depth: no
compiled physical plan: no
logical/physical pass identity map: no
resource producer/consumer binding table: no
execution receipts: no
first visible layered-frame receipt: no
pass-order readback derived from receipts: no
```

## Proxy topology gaps

```txt
source mesh identity contract: absent
source topology revision: absent
proxy topology revision: absent
membership prepare result: absent
added/removed mesh reconciliation: absent
stale source rejection: absent
frame-correlated transform sync result: absent
```

## Proxy lifecycle gaps

```txt
proxy scene lease: absent
proxy mesh lease: absent
proxy material lease: absent
postPipeline.dispose(): absent
idempotent proxy disposal result: absent
shared geometry ownership classification: absent
pagehide stops animation loop/listeners: no
pagehide retires renderer/post/proxy resources: no
```

## Remaining binding gaps

```txt
opaque depth physical sample: present
opaque depth typed binding identity: absent
water-mask physical binding: absent
water-surface-depth physical binding: absent
fog-transmittance physical binding: absent
backend support result: absent
```

## Validation gaps

```txt
foam-depth source-token test: present
actual GPU attachment inspection: absent
proxy topology mutation fixture: absent
proxy disposal fixture: absent
browser pixel occlusion fixture: absent
water-region admission fixture: absent
rolling-fog/foam fixture: absent
WebGPU/WebGL2 parity fixture: absent
visible-frame revision fixture: absent
```

## Public readback gaps

```txt
graph revision: absent
physical plan revision: absent
proxy topology revision: absent
proxy membership result: absent
depth attachment identity: absent
pass success/failure result: absent
resource disposal state: absent
visible output identity: absent
raw renderer, scene, camera, world and postPipeline exposed: yes
```

## Retained higher-level gaps

```txt
browser startup transaction and rollback
runtime session ownership and callback leases
legacy/Core world lifecycle parity
Core World reset/reprepare
focus transaction authority
materialization generation/readiness
renderer cell commit/disposal
camera baseline and committed-frame correlation
dynamic environment frame coherence
adaptive quality transaction
```

## Risk ranking

```txt
P0 startup/session teardown does not own the complete render graph
P0 logical graph can validate without physical resource parity
P1 foam proxy topology is fixed at construction with no revision
P1 proxy material/pass resources have no disposal result
P1 water-mask, water-depth and fog-transmittance remain unbound
P1 pass readback remains hand-authored
P1 no browser/GPU proof exists for either backend
P2 diagnostics cannot identify the resources that produced a frame
```

## Non-goals of this documentation run

```txt
no runtime code changed
no shaders, materials or pass construction changed
no package scripts or dependencies changed
no deployment configuration changed
no browser visual-correctness claim made
```
