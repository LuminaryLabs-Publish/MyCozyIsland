# Validation: MyCozyIsland

Last updated: `2026-07-11T22-20-00-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest eligible central entry with a new layered-world/render commit series after its prior audit
runtime source changed by this pass: no
rendering output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment configuration changed by this pass: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
```

## Plan ledger

**Goal:** separate source-backed render-binding findings from executable proof and define the exact catalog, compile, resource, occlusion, backend, and visible-frame gate.

- [x] Inspect the active route, import map, package test chain, and current runtime identity.
- [x] Inspect catalog declaration and validation.
- [x] Inspect logical ocean graph construction and validation.
- [x] Inspect render-layer masks and assignment.
- [x] Inspect ocean and foam material/pass construction.
- [x] Inspect the physical post pipeline and public readback.
- [x] Inspect current render-layer and terrain-separation tests.
- [x] Confirm the composition kit is active but omitted from the catalog.
- [x] Confirm the foam logical reads are not represented as physical bindings.
- [x] Confirm the physical foam pass disables its depth buffer while materials request depth testing.
- [x] Document compile, binding, result, and fixture contracts.
- [x] Change documentation only.
- [ ] Implement and run physical resource-binding fixtures.
- [ ] Run WebGPU/WebGL2 browser parity and capture fixtures.

## Source-backed checks

```txt
catalog validates 50 entries: yes
cozy-ocean-composition-kit instantiated by host: yes
cozy-ocean-composition-kit in kitCatalog: no
logical graph has six ordered passes: yes
logical foam depth source is opaque-depth: yes
logical foam reads water-mask: yes
logical foam reads water-surface-depth: yes
logical foam reads fog-transmittance: yes
physical foam pass uses separate scene: yes
physical foam pass depthBuffer is false: yes
foam material depthTest is true: yes
shared opaque depth is bound to foam pass: no
water mask is bound to foam pass: no
rolling-fog transmittance is bound to foam pass: no
physical pipeline is compiled from graph: no
pass-order readback is derived from execution receipts: no
```

## Existing validation surface

```txt
npm test chain: present
static architecture checks: present
semantic domain tests: present
Core World provider/order/lifecycle tests: present
lazy island and sea-floor materialization tests: present
logical render-layer graph test: present
terrain/provider separation token test: present
renderer cache/disposal tests: present
physical attachment test: absent
logical-to-physical binding parity test: absent
browser foam occlusion test: absent
rolling-fog/foam integration test: absent
WebGPU/WebGL2 layered-frame parity: absent
first layered-frame receipt: absent
```

## Current tests prove

```txt
logical pass order is background -> opaque -> water -> atmosphere -> foam -> output
foam is declared final scene content
water and foam are declared depthWrite=false
terrain handoff metadata has an admitted vertical gap
source contains a separate final foam scene
source contains the expected alpha composition expression
foam is not added to the main scene
```

## Current tests do not prove

```txt
which physical attachment satisfies opaque-depth
whether depth-tested foam receives the base scene depth
whether foam is occluded by island, rocks, props, or vegetation
whether water-mask and water-surface-depth exist physically
whether rolling fog exports transmittance to foam
whether hard-coded pass-order strings match submitted GPU work
whether WebGPU and WebGL2 bind equivalent resources
whether resize/quality changes retire stale bindings
which graph/resource revisions produced the visible frame
```

## Required fixture matrix

```txt
1. catalog completeness
   enumerate active source-backed kit IDs and compare with catalog classifications

2. graph compile
   compile six logical passes into the admitted fused physical plan

3. resource resolution
   resolve every read to one producer or external input

4. missing binding
   remove opaque depth or water mask and require deterministic rejection

5. foam occlusion
   place shoreline foam behind island, prop, rock, and vegetation occluders

6. fog integration
   compare foam through zero, medium, and dense rolling fog

7. backend parity
   WebGPU and WebGL2 publish the same logical plan/result schema

8. resize and quality
   attachment revisions advance and stale bindings reject

9. execution readback
   pass receipts match the compiled order and final output identity

10. visible frame
    first layered frame cites graph, physical plan, resource, world, and backend revisions
```

## Commands not run

```txt
npm test
browser WebGPU layered-render smoke
browser WebGL2 layered-render smoke
foam occlusion capture
fog/foam capture
resize/quality resource-revision fixture
physical pass instrumentation
Pages live smoke
```

## Reason executable validation was not claimed

This run used source inspection and GitHub documentation writes. The runtime does not expose a compiled physical plan, named attachment bindings, pass execution receipts, or first-layered-frame acknowledgement. The existing Node tests inspect logical descriptors and source tokens rather than submitted browser/GPU resources.

## Acceptance gate

```txt
all active runtime kits are cataloged or explicitly classified
one admitted graph revision produces one physical plan revision
every logical read resolves to one current resource binding
depth-tested foam uses the current opaque depth attachment
foam/water/fog semantics match the declared contract
reported order derives from the compiled and executed plan
WebGPU/WebGL2 use the same result schema
stale bindings reject after resize or quality changes
first layered frame identifies its graph, plan, resources, world, and backend
```
