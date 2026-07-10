# Validation: MyCozyIsland

Last updated: 2026-07-10T17-38-35-04-00

## This pass

```txt
runtime source changed by this pass: no
recent runtime source change detected before this pass: yes
recent runtime commits: 3d3a9b0, 0fd5a50
branch created: no
pull request created: no
npm test: not run
browser smoke: not run
WebGPU/GPU validation: not run
layered-grass contract fixture: not run because it does not exist yet
layered-grass lifecycle smoke: not run because it does not exist yet
repo-local documentation pushed to main: yes
central ledger update required: yes
```

## Current available gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

## Current tests prove

- the route references Three/WebGPU `0.185.0` and `src/main-cloudform.js`
- exactly 50 valid DomainServiceKit manifests exist
- kit IDs, capability graph, and dependency closure satisfy the static contract
- source modules avoid unseeded `Math.random()` and wall-clock `Date.now()` outside the route host
- selected renderer source tokens exist somewhere in the renderer module set
- deterministic terrain, shoreline, vegetation, rock, foam, cloud, fog, camera, and scenario composition
- repeated domain composition produces stable selected descriptor rows

## Current tests do not prove

- that `renderers.js` exports `renderer-world-layered-grass.js` as the active world renderer
- that the base renderer receives zero legacy `grass-patch` rows
- that every source grass row is consumed exactly once
- required grass-row field validation
- deterministic atlas and geometry policy independent of DOM/Three.js resources
- exact three-layer geometry, angles, dimensions, or alpha threshold
- one atlas texture and one instanced mesh are created
- rendered instance count equals accepted source count
- the unlit/depth/fog/shadow/tone-mapping policy is host-readable
- wind/LOD/adaptive-quality support or explicit non-support
- complete resource disposal
- idempotent repeated disposal
- JSON-safe grass readback
- browser WebGPU/WebGL2 compatibility for alpha-to-coverage and the node material

## Next required gates

```txt
node tests/layered-grass-contract-smoke.mjs
browser integration: tests/layered-grass-browser-smoke.mjs
npm test
```

The DOM-free contract fixture should assert:

```txt
stable policy identity
three deterministic layer descriptors
stable atlas panel/blade descriptors
source count equals accepted plus rejected
suppressed legacy count equals accepted count
rendered instance count equals accepted count
invalid rows produce typed rejection results
policy and readback serialize to JSON
same input produces identical descriptor output
```

The browser lifecycle smoke should assert:

```txt
one grass group
one instanced mesh
three geometry layers
one atlas texture
exact instance count
expected material policy
base renderer receives no legacy grass rows
resource snapshot reports live state
dispose releases texture, geometry, material, and mesh ownership
second dispose is a no-op
```

A visual screenshot is not required for the first gate. The first objective is contract and lifecycle proof while preserving the current output.