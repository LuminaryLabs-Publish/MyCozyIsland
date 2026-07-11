# Deploy Audit: Startup Failure Injection Fixture Gate

Timestamp: `2026-07-11T19-20-22-04-00`

## Summary

The existing test command covers static architecture, semantic domains, Core World behavior, provider ordering, snapshot portability, materialization, renderer cache and disposal utilities. It does not execute the production browser startup route or inject failures into its acquisition phases.

## Existing command surface

```txt
npm test
  -> static-check
  -> domain-smoke
  -> world-baseline
  -> core-world-runtime
  -> world-provider-order
  -> world-query-parity
  -> world-population-parity
  -> world-snapshot-portability
  -> world-cell-lifecycle
  -> lazy-world-materialization
  -> renderer-cell-cache
  -> renderer-resource-disposal
```

## Missing production proof

```txt
module/startup command result
renderer.init failure handling
Core World prepare failure handling
partial scene/GPU rollback
listener/timer/loop rollback
first render failure handling
clean retry without page reload
WebGPU/WebGL2 startup parity
Pages error-path smoke
```

## Required headless fixture

Use injected factories and retained capability counters:

```txt
createStartupHarness({ failAt })
  -> execute production startup orchestration
  -> record acquisition ledger
  -> inject failure at named phase
  -> execute rollback
  -> assert result schema and baseline
```

Required phases:

```txt
catalog
renderer-constructor
renderer-init
world-runtime
world-prepare
scene
world-renderer
ocean-foam
volume-textures
cloud-renderer
fog-renderer
post-pipeline
callbacks
animation-loop
first-frame
```

## Browser smoke matrix

```txt
WebGPU successful cold start
WebGL2 successful cold start
forced volume failure
forced post failure
forced first-frame failure
error panel matches typed failure
zero active callback leases after rollback
zero mandatory GPU/resource leases after rollback
Retry succeeds under a new transaction
first committed frame carries the retry transaction/session/generation
```

## CI/Pages evidence packet

```txt
commit SHA
browser/backend/version
startup transaction ID
injected phase
failure classification
acquisition counts
retirement counts
unresolved capability count
console errors
first committed frame ID after retry
screenshots for error and recovered frame
```

## Acceptance gate

```txt
all named phases have deterministic failure injection
rollback completes or reports exact unresolved capabilities
prepare failure restores an unprepared retryable baseline
no duplicate renderer/world/loop survives retry
successful startup is not reported before first frame
Pages smoke proves both an error path and clean recovery path
```

## Validation status

```txt
npm test: not run
browser smoke: not run
Pages smoke: not run
failure harness: absent
CI workflow change: none
deployment change: none
```
