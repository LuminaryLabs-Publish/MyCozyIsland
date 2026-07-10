# Validation: MyCozyIsland

Last updated: `2026-07-10T19-11-19-04-00`

## This pass

```txt
runtime source changed by this pass: no
package scripts changed: no
dependencies changed: no
route token changed: no
deploy configuration changed: no
branch created: no
pull request created: no
npm test: not run
browser smoke: not run
WebGPU/GPU validation: not run
layered-grass consumer fixture: not run because it does not exist yet
layered-grass lifecycle smoke: not run because it does not exist yet
repo-local documentation pushed to main: yes
central ledger update required: yes
```

## Source inspection performed

```txt
src/main-cloudform.js
src/kits/renderers.js
src/kits/renderer-world-layered-grass.js
src/kits/renderer-world.js
package.json
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
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
- source modules avoid unseeded `Math.random()` and wall-clock `Date.now()` outside the host boundary
- deterministic terrain, shoreline, vegetation, rock, foam, cloud, fog, camera, and scenario composition
- repeated domain composition produces stable selected descriptor rows

## Current tests do not prove

- that the public renderer facade resolves to `renderer-world-layered-grass.js`
- that the original source snapshot is unchanged
- that the base renderer receives zero accepted grass rows
- that each accepted source row has exactly one renderer owner
- source validation and typed rejection behavior
- source fingerprint determinism
- deterministic atlas and geometry descriptors independent of DOM and Three.js
- exact resource creation counts
- stable empty-source behavior
- direct ownership of texture, geometry, material, mesh, and group
- complete and idempotent disposal
- JSON-safe grass policy, source ledger, and resource readback
- explicit static update/wind/LOD/quality policy
- browser WebGPU and fallback behavior for alpha-to-coverage

## Next required gates

```txt
node tests/layered-grass-consumer-smoke.mjs
browser integration: tests/layered-grass-browser-lifecycle-smoke.mjs
npm test
```

The DOM-free consumer fixture should assert:

```txt
stable policy ID and source fingerprint
three deterministic layer descriptors
stable atlas-panel and blade descriptors
sourceCount = acceptedCount + rejectedCount
suppressedLegacyCount = acceptedCount
renderedInstanceCount = acceptedCount
zero-row input returns a valid empty ledger
invalid rows return typed rejections
original snapshot remains unchanged
policy, ledger, and readback serialize to JSON
same input produces byte-stable descriptor output
```

The browser lifecycle smoke should assert:

```txt
one grass group
zero or one instanced mesh according to accepted source count
three geometry layers when mesh exists
one atlas texture when mesh exists
exact rendered instance count
expected unlit alpha/depth/fog/shadow/tone-mapping policy
base renderer receives no accepted grass rows
resource snapshot reports created and live state
dispose releases texture, geometry, material, mesh, and group ownership
second dispose returns dispose-noop
outer world renderer composes grass disposal
```

A screenshot is not required for the first gate. The first objective is source and lifecycle proof while preserving the current output.