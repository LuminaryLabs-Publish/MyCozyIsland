# Deploy Audit: Reset / Re-prepare Fixture Gate

Timestamp: `2026-07-11T11-10-29-04-00`

## Summary

GitHub Pages should not advertise restart, reload, or reusable world reset until the same wrapper can reset and prepare a fresh Core World generation under both the fake test runtime and the pinned production runtime contract.

## Plan ledger

**Goal:** define the minimum deterministic and browser gates for shipping reusable reset/restart behavior.

- [x] Review current package test chain.
- [x] Confirm reset/re-prepare is not covered.
- [x] Define Node, contract-parity, browser, and Pages gates.

## Required Node fixture

```txt
create wrapper with fake runtime
prepare -> 49 cells
advance focus/materialization
reset(recreate)
assert old stores/jobs retired
prepare same wrapper
assert 49 cells and seven provider counts
assert new generation
assert old commands rejected
terminal dispose twice
assert idempotent result
assert prepare rejected after terminal dispose
```

## Required pinned-contract fixture

The fake runtime must match the pinned NexusEngine semantics for:

```txt
resetWorlds clears definitions
provider release/reset order
reset diagnostics behavior
registerWorld duplicate/attach rules
setFocus unknown-world failure
updateWorld lifecycle
```

## Required browser smoke

```txt
boot core mode
capture session/world/renderer generations
advance materialization
request reusable reset
observe frozen input/world updates
observe fresh prepare
observe one animation loop and listener set
observe first visible frame for new generation
request terminal dispose
observe renderer/world closure and stale-command rejection
```

## Pages acceptance

```txt
WebGPU and WebGL2 paths pass
legacy rollback path remains explicit
no uncaught reset/reprepare error
no duplicate world registration
no old-generation materialization progress
no double provider/resource release
no duplicate global host or animation loop
```

## Current status

```txt
runtime source changed: no
npm test run: no
browser smoke run: no
reset/reprepare fixture exists: no
pinned contract parity fixture exists: no
Pages restart proof exists: no
```
