# Deploy Audit: Focus Transaction Parity Fixture Gate

Timestamp: `2026-07-11T08-41-02-04-00`

## Summary

Current deployment checks prove normal deterministic behavior through a fake Core World runtime. They do not prove the pinned production focus contract, failure rollback or retriable prepare.

## Plan ledger

**Goal:** prevent deployment from treating fake-runtime success as production focus integrity.

- [x] Inventory current `npm test` chain.
- [x] Identify production/fake contract omissions.
- [x] Define Node and browser gates.
- [x] Keep package scripts and Pages configuration unchanged.

## Current gate

```txt
static-check
domain-smoke
world-baseline
core-world-runtime
world-provider-order
world-query-parity
world-population-parity
world-snapshot-portability
world-cell-lifecycle
renderer-cell-cache
renderer-resource-disposal
```

The world runtime and cell lifecycle tests inject `createFakeNexusWorldRuntime()`.

## Required new fixtures

```txt
node tests/core-world-pinned-import.mjs
node tests/core-world-contract-parity.mjs
node tests/focus-initial-prepare-retry.mjs
node tests/focus-transaction-results.mjs
node tests/focus-provider-failure.mjs
node tests/focus-release-failure.mjs
node tests/focus-checkpoint-rollback.mjs
node tests/focus-world-revision.mjs
node tests/focus-stale-admission.mjs
node tests/focus-render-admission.mjs
```

## Production/fake gate

For every scenario, run the same world definition and command sequence against:

```txt
exact pinned NexusEngine runtime
contract-faithful test adapter
```

Compare active cells, provider order/status, diagnostics, snapshots, rollback trace and product focus result.

## Failure gate

Inject failures:

```txt
before setFocus
after focusChanged commit
partition selection
selection validation
provider release
provider update
provider prepare
effect descriptor normalization
Core World state validation
cellsChanged commit
wrapper commit
```

No failure may be reported as a complete commit.

## Retry gate

```txt
failed initial prepare -> second prepare succeeds
failed cell move -> prior revision remains accepted -> retry succeeds
stale command -> rejected without mutation
repeat command ID -> idempotent or explicitly rejected
reset/dispose -> old command rejected
```

## Browser smoke

```txt
WebGPU core cell crossing reports accepted world revision
WebGL2 core cell crossing reports accepted world revision
injected provider failure preserves previous visible revision
failed initial startup world prepare can retry cleanly
old-session focus command is rejected after restart
host readback correlates focus, world and rendered revision
```

## Deployment blockers

```txt
exact pinned modules cannot run in fixture
fake and production terminal classifications differ
prepare remains poisoned after failure
focus and world snapshot disagree after terminal result
provider stores differ from accepted cell policy
partial rollback lacks residual report
render admits an unaccepted world revision
fixture is not part of predeploy/npm test
```

## Ordered gate

```txt
runtime lifecycle fixtures
  -> pinned Core World import and parity
  -> focus transaction failure/retry fixtures
  -> render admission fixture
  -> WebGPU/WebGL2 browser smoke
  -> Pages deployment
```

## Current status

```txt
runtime source changed: no
package scripts changed: no
new fixtures implemented: no
new fixtures run: no
browser smoke run: no
deployment workflow changed: no
```
