# Deploy Audit: Runtime Lifecycle and Restart Fixture Gate

Timestamp: `2026-07-11T07-01-49-04-00`

## Plan ledger

**Goal:** prevent Pages deployment from claiming a restart-safe Core World/WebGPU route until startup rollback, callback fencing and complete resource teardown are executable and browser-proven.

- [x] Identify current validation surface.
- [x] Identify route-level lifecycle proof missing from isolated utilities.
- [x] Define deterministic fixture and browser smoke gates.
- [x] Keep deployment configuration unchanged during documentation.

## Current gate

`npm test` covers source/catalog checks, deterministic semantics, normal-path Core World/provider behavior, portable snapshots, basic cell lifecycle and isolated renderer cache/disposal utilities.

It does not construct and terminalize the complete route session.

## Required additional fixtures

```txt
node tests/runtime-session-state.mjs
node tests/runtime-startup-rollback.mjs
node tests/runtime-callback-leases.mjs
node tests/runtime-stop-dispose.mjs
node tests/runtime-restart-epoch.mjs
node tests/runtime-stale-work-rejection.mjs
node tests/runtime-resource-residuals.mjs
node tests/runtime-global-host-lease.mjs
```

## Failure-injection matrix

```txt
renderer construction
renderer initialization
Core World construction
initial world prepare
world renderer creation
ocean creation
foam creation
atmosphere texture creation
cloud creation
fog creation
post creation
listener registration
timer registration
animation-loop registration
global-host publication
```

## Acceptance matrix

```txt
one typed terminal result per start/stop/dispose/restart command
partial startup runs reverse cleanup
repeat disposal is unchanged and idempotent
animation loop is inactive after stop
all listeners and timers have release results
old callbacks are rejected by epoch
Core World has no unexplained old-session state
render/GPU residuals are zero or explicitly named
global host is retired or restored
restart uses a newer epoch and fresh objects
```

## Browser smoke matrix

```txt
WebGPU core start -> stop -> restart
WebGL2 core start -> stop -> restart
legacy start -> stop -> restart
startup failure -> rollback -> retry
pagehide during startup
pagehide during frame
pagehide after explicit stop
old frame callback after restart
old focus result after restart
H/input/resize listener uniqueness after restart
```

## Deployment blockers

```txt
startup error leaves active animation or listeners
pagehide resets world but leaves render session live
renderer/backend has no terminal release result
old callback can mutate a newer session
globalThis.CozyIsland points at a stopped session
restart duplicates input or frame work
resource residuals are unbounded or unobservable
lifecycle fixture is not run by npm test/predeploy
```

## Ordered gate

```txt
runtime lifecycle Node fixtures
  -> pinned Core World parity fixtures
  -> provider/render shadow fixtures
  -> WebGPU/WebGL2 browser restart smoke
  -> Pages deployment
```

## Current validation status

```txt
new lifecycle fixtures implemented: no
new lifecycle fixtures run: no
browser restart smoke run: no
runtime source changed by audit: no
deployment workflow changed by audit: no
```
