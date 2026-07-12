# Project Breakdown: MyCozyIsland World Lifecycle Contract

Timestamp: `2026-07-11T20-51-14-04-00`

## Summary

`MyCozyIsland` was selected as the oldest stable eligible Publish repository after the full organization inventory was compared with central tracking. `PrehistoricRush` was nominally older but had active runtime commits during selection, so it was skipped to avoid concurrent edits.

The audit found that the `legacy` and `core` world runtimes expose the same `prepare()`, `reset()`, `dispose()`, query and state surface while providing materially different lifecycle semantics. Legacy disposal is reversible; Core disposal clears the registered world definition and Core World domain but leaves the wrapper callable with no terminal state or use-after-dispose rejection.

## Plan ledger

**Goal:** define one explicit world-runtime lifecycle contract whose phase, generation, method admission, read-model leases and results remain truthful across legacy and Core modes.

- [x] Compare all 10 accessible Publish repositories with central ledger coverage.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Skip actively changing `PrehistoricRush`.
- [x] Select only `MyCozyIsland` as the oldest stable eligible entry.
- [x] Trace `main-cloudform.js`, `world-runtime.js`, lifecycle methods, global readback and tests.
- [x] Identify the interaction loop, domains, all 50 local kits, imported services and seven providers.
- [x] Document legacy/Core semantic divergence and terminal use-after-dispose risk.
- [x] Define lifecycle phases, generations, command admission, results, leases and parity fixtures.
- [x] Change documentation only.
- [ ] Implement and execute lifecycle parity fixtures.

## Interaction loop

```txt
startup
  -> choose world mode from URL
  -> create one structurally compatible world wrapper
  -> prepare
  -> build render graph
  -> expose wrapper and query through globalThis.CozyIsland

legacy mode
  -> prepare toggles prepared=true
  -> reset toggles prepared=false
  -> dispose toggles prepared=false
  -> prepare can be called again

core mode
  -> prepare focuses and updates 49 cells
  -> reset calls resetWorlds(), clearing definitions and provider state
  -> dispose calls reset(), then resets the Core World domain
  -> wrapper, engine, providers and query remain callable
  -> no disposed phase rejects later commands
```

## Domains in use

```txt
browser startup and DOM projection
world-mode selection and compatibility API
runtime lifecycle phase and generation
Core World definition, focus, providers and cells
legacy composition and immutable snapshot
world query and active-cell projection
lazy materialization and provider stores
camera/scenario/environment clock
terrain, biome, shoreline and population
ocean, foam, cloud, fog and post rendering
adaptive quality and diagnostics
browser callbacks, global readback and page lifecycle
validation and Pages deployment
```

## Kit and service inventory

The repository still declares 50 local kits, six imported NexusEngine construction services and seven ordered Core World providers. Services cover startup diagnostics, renderer backends, world and atmosphere rendering, performance adaptation, camera/scenario control, deterministic terrain/environment composition, Core World registration/focus/materialization/query, browser hosting, tests and deployment.

## Main finding

```txt
same public method name
  != same lifecycle meaning

legacy dispose
  -> reversible boolean reset

core dispose
  -> terminal domain teardown without terminal API state
```

The wrapper exposes only `prepared`, not a lifecycle phase, generation, capability set or typed operation result. After Core reset/dispose, stale queries and raw engine/provider references remain reachable while re-prepare cannot reliably restore the cleared definition.

## Required parent domain

```txt
cozy-island-world-lifecycle-contract-authority-domain
```

## Required proof

```txt
legacy/core lifecycle result-schema parity
repeated prepare idempotency
reusable reset followed by successful prepare
terminal dispose followed by deterministic rejection
query/read-model lease revocation
stale generation rejection
provider/materializer retirement receipts
pagehide global-readback revocation
```
