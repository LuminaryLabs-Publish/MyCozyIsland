# Deploy Audit: Node WebGPU Readback Fixture Gate

Timestamp: `2026-07-10T13-08-51-04-00`

## Current package gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

## Current proof

The existing tests prove static route expectations, WebGPU import token, kit catalog shape/count, deterministic domain composition, selected terrain/vegetation/foam/cloud/fog rows, and one scenario tick.

## Missing deploy proof

```txt
node scripts/cozy-island-webgpu-readback-fixture.mjs
```

This fixture does not exist yet.

## Required fixture checks

- Route/source profile exists.
- Source fingerprint is stable.
- Kit catalog readback is JSON-safe.
- Input rows include accepted, rejected, no-change, and clamped examples.
- Scenario tick rows are deterministic.
- Camera frame rows are deterministic.
- Volume texture rows expose backend/source/fallback fields.
- Performance rows expose degrade/recover decisions or deterministic stubs.
- Render-consumption ledger maps source families to consumers.
- `CozyIslandHost.getState()` is JSON-safe.

## Validation this pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
browser smoke: not run
WebGPU/GPU validation: not run
DOM-free WebGPU consumer fixture: not run because proof files do not exist yet
pushed to main: yes
```
