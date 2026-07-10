# Deploy Audit: Node Performance Transition Fixture Gate

Timestamp: 2026-07-10T16-08-56-04-00

## Current package gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

The current gate validates route/source tokens, the exact 50-kit catalog, capability closure, and deterministic domain composition. It does not execute adaptive-quality transitions.

## Required fixture

```txt
scripts/cozy-island-adaptive-quality-fixture.mjs
```

The fixture should import only pure performance and proof modules and use fake consumer adapters.

## Required assertions

- production threshold and hold defaults are present
- deterministic sample streams produce deterministic transitions
- level `0` startup state is captured once
- `0 -> 1 -> 2 -> 1 -> 0` applies exact absolute settings
- DPR returns to the startup value at level `0`
- cloud/fog/post adapters receive the expected values
- same-level requests are idempotent
- invalid metrics return typed status or explicit fallback
- transition rows contain metric source and frame identity
- bounded journal eviction is deterministic
- reset restores policy, counters, history, and startup settings
- full host state is JSON serializable

## Gate order

```txt
node scripts/cozy-island-adaptive-quality-fixture.mjs
node tests/static-check.mjs
node tests/domain-smoke.mjs
```

After the fixture is stable:

```json
{
  "scripts": {
    "test": "node scripts/cozy-island-adaptive-quality-fixture.mjs && node tests/static-check.mjs && node tests/domain-smoke.mjs"
  }
}
```

## Deployment constraint

The implementation must remain static-host compatible. Browser code must not import Node APIs. GPU timestamp integration must degrade to an explicit callback-interval metric when unavailable.

No Pages, workflow, route, CDN, or build changes are required for this documentation pass.

## Validation status

Fixture absent and not run. Existing tests were not run because runtime source did not change.