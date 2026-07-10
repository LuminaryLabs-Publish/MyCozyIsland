# Deploy Audit: Grass Consumer and Resource Owner Fixture Gate

Timestamp: `2026-07-10T19-11-19-04-00`

## Current gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

The repository is a static browser route. No deploy or route change is required for this documentation pass.

## Gate gap

The current suite does not prove:

```txt
active facade selection
source validation
source fingerprint
accepted/rejected reconciliation
legacy suppression parity
exact instance count
resource handle retention
JSON-safe readback
complete disposal
idempotent disposal
empty-source behavior
```

## Required gate 1: DOM-free consumer fixture

```txt
node tests/layered-grass-consumer-smoke.mjs
```

This fixture should import only pure policy, source-validation, descriptor, ledger, and readback modules.

Required assertions:

```txt
stable policy ID
stable source fingerprint
three stable layer descriptors
stable atlas descriptor
sourceCount = acceptedCount + rejectedCount
suppressedLegacyCount = acceptedCount
renderedInstanceCount = acceptedCount
invalid rows have typed reasons
empty input returns a valid empty ledger
JSON serialization is stable
```

## Required gate 2: browser lifecycle smoke

```txt
tests/layered-grass-browser-lifecycle-smoke.mjs
```

Required assertions:

```txt
layered facade is active
base renderer receives zero accepted grass rows
one texture, geometry, material, mesh, and group are created for non-empty input
instance count equals accepted count
resource owner reports live state
dispose releases every owned resource
second dispose returns dispose-noop
outer world renderer composes inner disposal
```

## Deployment invariants

```txt
index.html remains the entry point
src/main-cloudform.js route token remains unchanged
Three/WebGPU 0.185.0 import map remains unchanged
current three-layer grass output remains unchanged
WebGL2 fallback remains available
no screenshot gate is required for the ownership pass
```

## Current status

```txt
runtime source changed: no
package scripts changed: no
deploy workflow changed: no
npm test: not run
browser smoke: not run
WebGPU validation: not run
branch created: no
pull request created: no
```