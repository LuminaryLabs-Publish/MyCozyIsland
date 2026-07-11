# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T19-20-22-04-00`

## Summary

Browser startup has no transaction, acquisition ledger or rollback authority. Errors are presented in the DOM while partial semantic, browser and GPU ownership can remain alive. Core World preparation can also become poisoned by committing `prepared = true` before the initial world snapshot succeeds.

## Concrete startup defect

```txt
main acquires renderer/world/resources
  -> later phase throws
  -> fail(error) updates error text only
  -> acquired capabilities are not inventoried or retired
  -> retry baseline is unknown
```

## Poisoned prepare defect

```txt
prepare sets prepared=true
  -> commitFocus/provider update throws
  -> worldSnapshot remains null
  -> retry sees prepared=true
  -> retry returns null without re-running preparation
```

## Startup authority gaps

```txt
startup transaction ID: absent
startup phase/state machine: absent
catalog/config/import admission result: absent
backend initialization result: absent
acquisition ledger: absent
capability dependency graph: absent
startup commit result: absent
startup failure result: absent
rollback plan: absent
rollback receipts: absent
retry classification: absent
first-frame commit result: absent
```

## World prepare gaps

```txt
candidate snapshot: absent
atomic prepared/snapshot commit: absent
provider readiness result: absent
materializer readiness result: absent
prepare rollback: absent
prepare attempt identity: absent
clean retry fixture: absent
prepared=true/null-snapshot invariant check: absent
```

## Partial render-resource gaps

```txt
resource IDs during startup: absent
render factory capability descriptors: absent
partial scene inventory: absent
volume texture rollback: absent
post pipeline rollback: absent
renderer/backend rollback: absent
shared-resource exactly-once retirement: absent
first render result: absent
```

## Browser callback gaps

```txt
startup listener leases: absent
startup timer leases: absent
animation-loop startup lease: absent
callback installation rollback: absent
stale startup callback fencing: absent
duplicate Start/Retry exclusion: absent
```

## Public observation gaps

```txt
current startup phase: unavailable
active startup transaction: unavailable
acquired capability counts: unavailable
rollback pending count: unavailable
retry eligibility: unavailable
first committed frame ID: unavailable
partial raw ownership recovery: unavailable
```

## Retained runtime lifecycle gaps

```txt
runtime session ID and generation: absent
explicit animation-loop stop: absent
pagehide/pageshow policy: absent
complete final disposal: absent
runtime restart transaction: absent
global readback revocation: absent
```

## Missing fixtures

```txt
failure injection at every startup phase
acquisition-ledger count parity
reverse dependency rollback order
exactly-once retirement
automatic callback/loop rollback
prepare failure and clean retry
no global host before commit
first-frame startup parity
WebGPU/WebGL2 result parity
Pages startup error/recovery smoke
```

## Risk ranking

```txt
P0  partial startup can leak renderer/world/browser/GPU ownership
P0  failed prepare can poison the world runtime and block clean retry
P0  running has no atomic first-frame commit boundary
P0  runtime lifecycle has no authoritative committed startup input
P1  duplicate attempts can overlap if retry is later added naively
P1  error UI cannot report rollback or unresolved capabilities
P1  bfcache and final disposal remain undefined
P2  diagnostics do not expose startup transaction truth
```

## Ordered gaps

```txt
P0 browser startup admission and rollback
P0 runtime session lifecycle
P1 Core World reset/re-prepare
P1 focus transaction authority
P1 materialization generation/readiness
P1 renderer cell commit/disposal
P1 camera baseline authority
P1 dynamic environment frame authority
P1 adaptive quality transaction authority
```

## Non-goals of this documentation run

```txt
no runtime code changed
no renderer behavior changed
no package scripts changed
no dependencies changed
no workflow or deployment changed
no startup correctness claim made
```
