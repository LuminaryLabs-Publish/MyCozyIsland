# Validation: MyCozyIsland

Last updated: `2026-07-12T00-20-01-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest eligible central entry with a newer foam-depth and camera runtime series
runtime source changed by this pass: no
render output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment changed by this pass: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
```

## Plan ledger

**Goal:** distinguish source-backed improvements from executable proof and define the exact graph, topology, binding, lifecycle, backend, and visible-frame gate.

- [x] Inspect the active route and package version.
- [x] Inspect the full test chain.
- [x] Inspect logical graph construction and validation.
- [x] Inspect the source foam renderer interface used by the post pipeline.
- [x] Inspect physical proxy scene, proxy meshes, depth material, depth comparison, and pass-order readback.
- [x] Inspect browser animation, pagehide, public host, and readback paths.
- [x] Confirm the previous unconditional foam composition was removed.
- [x] Confirm physical opaque-depth comparison exists.
- [x] Confirm the physical depth pass is absent from the logical graph.
- [x] Confirm proxy membership is captured once and only transforms are synchronized.
- [x] Confirm proxy resources have no dedicated disposal path.
- [x] Confirm remaining logical foam inputs are unbound.
- [x] Document topology, lifecycle, parity, and browser fixture contracts.
- [x] Change documentation only.
- [ ] Implement and run the new executable fixtures.

## Source-backed checks

```txt
package version: 0.4.1
route cache key: foam-depth-camera-1
logical graph pass count: 6
physical readback includes foam-occlusion-depth: yes
foam proxy scene exists: yes
proxy MeshDepthMaterial exists: yes
proxy meshes share source geometry: yes
proxy membership captured from foamRenderer.meshes at construction: yes
proxy transforms synchronized every frame: yes
foam depth sampled against scene depth: yes
unmasked old composition expression removed: yes
logical graph declares foam-occlusion-depth: no
logical/physical compile result exists: no
source/proxy topology revision exists: no
proxy disposal method/result exists: no
water-mask physical binding exists: no
water-surface-depth physical binding exists: no
fog-transmittance physical binding exists: no
visible-frame receipt exists: no
```

## Existing test surface

```txt
npm test chain: present
static architecture checks: present
domain and Core World tests: present
camera ground-clearance test: present
camera first-person contract test: present
foam-depth-occlusion source-token test: present
renderer cell-cache/disposal tests: present
```

## Current foam test proves

```txt
renderer-post.js contains the expected depth-scene and comparison tokens
old unmasked final composition string is absent
logical source-order strings remain water -> atmosphere -> foam -> output
```

## Current foam test does not prove

```txt
that Three.js accepted and executed the intended GPU passes
which physical attachment produced scene depth
that source/proxy mesh membership is exact
that topology changes reconcile
that proxy resources dispose
that opaque terrain/props actually hide foam pixels
that water-mask and fog semantics match the graph
that WebGPU and WebGL2 produce equivalent results
which graph, topology and resource revisions produced a visible frame
```

## Required fixture matrix

```txt
1. graph/plan adapter
   logical foam depth policy maps to one physical depth pass

2. topology prepare
   exact source/proxy membership with stable identities

3. topology mutation
   added and removed foam meshes reconcile atomically

4. transform sync
   source and proxy world transforms match under one frame revision

5. resource ownership
   shared geometry survives; proxy material/pass retire exactly once

6. binding
   exact current opaque-depth producer is identified and admitted

7. visible occlusion
   terrain, rocks, props and vegetation hide foam pixels

8. water/fog semantics
   remaining declared inputs are bound or removed explicitly

9. backend parity
   WebGPU and WebGL2 publish the same result schema

10. frame proof
    capture cites graph, plan, topology, resource, backend and frame revisions
```

## Commands not run

```txt
npm test
browser WebGPU smoke
browser WebGL2 smoke
proxy topology mutation fixture
proxy disposal fixture
foam pixel capture
water/fog integration capture
Pages live smoke
```

## Acceptance gate

```txt
one admitted graph revision owns one physical plan revision
one source topology revision owns one proxy topology revision
all source/proxy membership is exact
no shared geometry is double-disposed
all owned proxy resources retire exactly once
all declared foam inputs are bound or removed
physical order comes from execution receipts
both backends pass visible occlusion and lifecycle fixtures
first visible foam frame identifies graph, topology, binding and resources
```
