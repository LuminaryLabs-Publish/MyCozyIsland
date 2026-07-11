# Deploy Audit: Pinned Runtime Failure-Parity Fixture Gate

Timestamp: `2026-07-11T06-50-30-04-00`

## Plan ledger

**Goal:** prevent deployment from claiming Core World provider authority when tests exercise only the simplified local fake or when failure/recovery behavior differs from the pinned browser runtime.

- [x] Identify current `npm test` surface.
- [x] Identify the browser runtime identity.
- [x] Identify missing parity and failure rows.
- [x] Define the required predeploy gate.

## Current gate

`npm test` runs normal-path source, semantic, provider-order, query, population, portability, lifecycle and isolated renderer utility checks.

World tests inject `tests/helpers/fake-nexus-world.mjs`; they do not load the exact modules pinned in the browser import map.

## Required additional scripts

```txt
node tests/core-world-pinned-runtime-contract.mjs
node tests/core-world-fake-contract-parity.mjs
node tests/core-world-provider-failure.mjs
node tests/world-prepare-retry.mjs
node tests/world-focus-transaction.mjs
node tests/world-provider-store-rollback.mjs
```

## Gate identity

Every fixture report must record:

```txt
repository: LuminaryLabs-Dev/NexusEngine
commit: 38229f59c22cb40024ffd13a9f48040de759f5d7
module: nexusengine/engine
module: nexusengine/core-world
contractVersion
worldId
worldSeed
```

## Acceptance matrix

```txt
production runtime loads in Node
fake adapter runs the same contract matrix
initial 49-cell active set matches
cross-cell selection deltas match
provider phase/action traces match
capability-blocking outcomes match
critical failure outcomes match
rollback and release traces match
failed cell retry behavior matches
snapshots remain portable
wrapper prepare remains retriable after failure
focus result is typed and bounded
rejected transition preserves prior accepted state
```

## Browser smoke matrix

```txt
WebGPU + core mode
WebGL2 fallback + core mode
legacy rollback mode
pinned module resolution failure
injected provider failure
successful recovery/retry
pagehide/stop during pending focus work
```

## Deployment-blocking failures

```txt
browser and Node runtime commits differ
fake and production contract observations differ
provider failure becomes Boolean true
initial failure poisons prepare retry
critical failure commits without explicit degraded/partial result
rejected focus mutates prior accepted provider stores
result contains non-portable values
old-session focus work survives stop/restart
```

## Required order

```txt
runtime lifecycle fixture
  -> pinned-runtime parity fixture
  -> focus transaction fixture
  -> shadow provider-to-render fixture
  -> real browser WebGPU/WebGL2 smoke
  -> visible cell-render cutover
```

## Current validation status

```txt
new fixtures implemented: no
new fixtures run: no
browser smoke run: no
runtime source changed by audit: no
deployment workflow changed by audit: no
```

The existing static Pages deployment can remain unchanged until implementation. The fixture matrix should be added to `npm test` before Core World cell rendering or expanded streaming is shipped.
