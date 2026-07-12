# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T22-20-00-04-00`

## Summary

The repository now exposes a valid logical ocean render graph but does not prove that the physical WebGPU/WebGL2 pipeline binds the resources declared by that graph. The new `cozy-ocean-composition-kit` is also outside the canonical 50-kit catalog, so runtime, documentation, and diagnostics disagree about the complete kit surface.

## Catalog gaps

```txt
cataloged DomainKit entries: 50
active source-backed composition kits: 51
cozy-ocean-composition-kit in catalog: no
public KIT_CATALOG entry: no
catalog capability for render graph compilation/binding: no
diagnostic kitCount includes composition kit: no
```

## Logical/physical graph gaps

```txt
logical graph revision admission: absent
compiled physical plan: absent
logical-to-physical pass identity map: absent
fused-pass result: hard-coded
resource producer identity: absent
resource consumer binding identity: absent
attachment format/size revision: absent
backend support result: absent
pass execution receipt: absent
visible-frame graph acknowledgement: absent
```

## Foam binding gaps

```txt
logical opaque-depth read: declared
physical shared depth binding: absent
physical foam pass depthBuffer: false
foam material depthTest: true

logical water-mask read: declared
physical water-mask binding: absent

logical water-surface-depth read: declared
physical water-surface-depth binding: absent

logical fog-transmittance read: declared
physical rolling-fog transmittance binding: absent
```

## Validation gaps

```txt
descriptor pass-order validation: present
transparent depth-write validation: present
terrain handoff metadata validation: present
source-token post-pipeline checks: present
physical pass inspection: absent
physical attachment inspection: absent
logical resource binding parity: absent
browser foam occlusion fixture: absent
rolling-fog/foam fixture: absent
WebGPU/WebGL2 layered parity fixture: absent
first layered-frame receipt: absent
```

## Readback gaps

```txt
renderPassOrder: manually returned strings
physicalRenderPassOrder: manually returned strings
graph revision in readback: absent
compiled plan revision: absent
resource binding table: absent
pass success/failure results: absent
last executed physical pass: absent
visible output resource identity: absent
frame-to-world/materialization revision: absent
```

## Potential visual consequences

```txt
foam can lack opaque-scene occlusion proof
foam can lack water-region admission proof
foam can lack rolling-fog transmittance proof
logical graph can report valid while physical resources are missing
backend implementations can diverge without typed parity evidence
resize or quality changes can replace attachments without binding revisions
```

These are contract and proof gaps. This documentation pass did not execute browser captures and does not claim a specific visible artifact was reproduced.

## Retained higher-level gaps

```txt
browser startup transaction and rollback
runtime session ownership and callback leases
legacy/Core world lifecycle parity
Core World reset/reprepare
focus transaction authority
materialization generation/readiness
renderer cell commit and disposal
camera baseline
dynamic environment frame coherence
adaptive quality transaction
```

## Risk ranking

```txt
P0 logical graph can validate without physical resource parity
P0 depth-tested foam has no declared shared depth attachment in its physical pass
P1 runtime composition kit is omitted from the canonical catalog
P1 manual logical and physical order strings can drift from execution
P1 backend and resize resource changes have no binding revision
P1 no first layered-frame proof exists
P2 diagnostics cannot identify the actual resource graph used for a frame
```

## Ordered gaps

```txt
P0 browser startup admission and rollback
P0 runtime session lifecycle
P0 world lifecycle contract and mode parity
P0 render-layer graph admission and physical resource binding
P1 Core World reset/reprepare
P1 focus transaction authority
P1 materialization generation/readiness
P1 renderer cell commit/disposal
P1 camera baseline authority
P1 dynamic environment frame authority
P1 adaptive quality transaction authority
```

## Non-goals of this documentation run

```txt
no runtime code changed
no shaders or materials changed
no pass construction changed
no package scripts changed
no dependencies changed
no deployment configuration changed
no browser visual-correctness claim made
```
