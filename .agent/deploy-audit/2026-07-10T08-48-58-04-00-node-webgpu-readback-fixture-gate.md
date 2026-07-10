# Deploy audit: Node WebGPU readback fixture gate

Timestamp: `2026-07-10T08-48-58-04-00`

## Current package gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

## Current coverage

```txt
static route expectations
Three/WebGPU 0.185.0 importmap
route token for src/main-cloudform.js
50 kit catalog count
kit metadata shape
seeded deterministic source rows
terrain/shoreline/vegetation/rock/foam/cloud/fog smoke rows
scenario tick enters rail mode
```

## Missing deploy proof

```txt
route/source fingerprint fixture
kit catalog readback fixture
input result fixture
scenario/camera readback fixture
volume texture result fixture
performance degrade/recover fixture
render-consumption ledger fixture
JSON-safe CozyIslandHost fixture
```

## Required next script

```txt
node scripts/cozy-island-webgpu-readback-fixture.mjs
```

After proof helpers exist, wire this script into `npm test`.

## Fixture constraints

- Must not require browser WebGPU.
- Must not require screenshot capture.
- Must not instantiate a real renderer.
- Must assert serializable rows only.
- Must preserve existing `tests/static-check.mjs` and `tests/domain-smoke.mjs` coverage.

## Validation for this pass

Docs-only. Runtime source, package scripts, branches, PRs, browser state, and GPU state were not changed.
