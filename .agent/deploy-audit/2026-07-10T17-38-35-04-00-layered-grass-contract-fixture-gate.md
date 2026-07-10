# Deploy Audit: Layered Grass Contract Fixture Gate

Timestamp: 2026-07-10T17-38-35-04-00

## Current route gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

The route is a static site. `index.html` loads Three/WebGPU from the import map and starts `src/main-cloudform.js` directly.

## Existing coverage

`static-check.mjs` validates:

```txt
exactly 50 kit manifests
unique kit IDs
DomainServiceKit metadata
minimum source-module count
no Math.random or Date.now in non-host source
presence of selected renderer tokens
Three/WebGPU version token
main route token
alert role
```

`domain-smoke.mjs` validates deterministic source-domain composition without importing browser renderer modules.

## Coverage gap introduced by the new renderer

The current suite does not prove:

```txt
renderers.js selects renderer-world-layered-grass.js
base renderer grass rows are suppressed
original snapshot remains unchanged
layer policy is deterministic
source counts reconcile
one mesh and one atlas are created
material policy matches intent
resources are disposed
readback is JSON-safe
```

## Required gate split

### Gate 1: DOM-free contract smoke

```txt
node tests/layered-grass-contract-smoke.mjs
```

Move policy, atlas descriptors, geometry descriptors, and source-consumption accounting into pure modules. This gate should need no Three.js package, DOM, browser, GPU, or screenshot.

### Gate 2: browser lifecycle smoke

```txt
browser integration: tests/layered-grass-browser-smoke.mjs
```

This gate may use the actual route/import map and should validate resource creation, active facade selection, exact instance count, and disposal in WebGPU and available fallback mode.

### Gate 3: existing regression suite

```txt
npm test
```

Add Gate 1 to `npm test` only after it is stable. Keep Gate 2 as an integration gate if browser provisioning is not deterministic in normal CI.

## Static assertions to add

```txt
renderers.js references renderer-world-layered-grass.js
wrapper exports group, update, getState, and dispose
wrapper does not mutate original snapshot
wrapper reports an explicit adapter ID
catalog or internal capability map names layered alpha grass
```

## Deployment safety

No Pages workflow or route change is required for the documentation pass. Runtime implementation should preserve:

```txt
index.html entry point
main-cloudform.js route token
Three/WebGPU 0.185.0 import map
current visual grass output
WebGL2 fallback behavior
```

## Current validation status

```txt
runtime source changed by this pass: no
package scripts changed: no
deploy configuration changed: no
npm test: not run
browser smoke: not run
WebGPU validation: not run
branch created: no
pull request created: no
```
