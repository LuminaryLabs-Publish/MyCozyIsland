# Deploy Audit: Node Frame Correlation Fixture Gate

Timestamp: 2026-07-10T14-42-01-04-00

## Current package gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

The current gate validates static route expectations and deterministic source-domain composition. It does not execute browser WebGPU consumption.

## Required fixture

```txt
scripts/cozy-island-frame-correlation-fixture.mjs
```

The fixture should instantiate pure host-proof modules with deterministic stubs and prove:

- stable source and catalog fingerprints
- strict record sequence ordering
- frame allocation and one scenario-step per frame
- input command/result correlation
- camera-to-scenario linkage
- setup record attribution for compute and fallback paths
- performance degrade/recover transition ordering
- render-submit dependency references
- bounded retention and deterministic eviction
- restart/reset behavior
- full JSON serialization

## Gate order

```txt
node scripts/cozy-island-frame-correlation-fixture.mjs
node tests/static-check.mjs
node tests/domain-smoke.mjs
```

After the fixture is stable, add it to `npm test` before deployment.

## Deployment constraint

No Pages, workflow, route, CDN, or build configuration changes are needed for the documentation pass. The future proof modules must remain static-host compatible and must not require Node APIs in browser code.

## Validation status

Fixture absent and not run. Existing npm tests were not run because runtime source did not change.