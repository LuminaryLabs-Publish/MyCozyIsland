# Deploy Audit: Session and Resource Fixture Gate

Timestamp: `2026-07-10T20-48-55-04-00`

## Current declared gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

The current gate proves catalog/static domain properties. It does not prove browser lifecycle or GPU resource release.

## Required gate 1: DOM-free lifecycle policy

```txt
node tests/runtime-session-lifecycle-smoke.mjs
```

Required assertions:

```txt
stable state transition table
stable session IDs
stop and dispose result reasons
idempotent disposal
reverse-order rollback
listener and resource count reconciliation
bounded JSON-safe journal
```

## Required gate 2: browser lifecycle smoke

```txt
tests/webgpu-session-resource-browser-smoke.mjs
```

Required assertions:

```txt
one route start creates one animation loop
expected listener count is registered
CozyIslandHost reports running
stop halts committed frames
restart does not create duplicate loops/listeners
dispose removes every listener
dispose releases sky/world/grass/ocean/foam/volume/cloud/fog/post/renderer resources
live counts return to baseline
second dispose is a no-op
partial-start failure rolls back prior allocations
```

Run the browser gate for WebGPU when available and preserve a WebGL2 fallback case. GPU resource-count instrumentation may be host-owned and additive; it must not alter visual output.

## Deployment invariants

```txt
index.html remains the entry point
src/main-cloudform.js?v=webgpu-volumetric-2 remains the route
Three/WebGPU 0.185.0 remains pinned
exactly 50 implemented catalog kits remain valid
current camera and movement behavior remains unchanged
current visuals remain unchanged
no branch or pull request
```

## Current status

```txt
runtime source changed: no
package scripts changed: no
deploy workflow changed: no
npm test: not run
browser smoke: not run
WebGPU validation: not run
lifecycle fixture: not run because it does not exist yet
```
