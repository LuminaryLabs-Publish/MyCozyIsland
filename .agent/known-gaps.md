# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T20-51-14-04-00`

## Summary

The public world wrapper has no canonical lifecycle phase or generation. Legacy and Core modes expose the same methods but provide incompatible reset/dispose semantics, and neither mode returns typed lifecycle results or rejects use after terminal disposal.

## Concrete contract mismatch

```txt
legacy dispose
  -> prepared=false
  -> later prepare succeeds

core dispose
  -> resetWorlds clears definitions/provider coordination
  -> Core World domain reset
  -> wrapper remains callable
  -> later prepare has no valid registered-definition guarantee
```

## Lifecycle authority gaps

```txt
world lifecycle phase: absent
world generation: absent
mode-neutral contract: absent
prepare result: untyped snapshot
reset result: undefined
dispose result: undefined
reusable reset policy: implicit
terminal disposal policy: absent
idempotent duplicate results: absent
stale-generation rejection: absent
```

## Read-model gaps

```txt
query lease identity: absent
diagnostics lease identity: absent
snapshot revision lease: absent
post-reset stale read rejection: absent
post-dispose read rejection: absent
raw engine/provider exposure quarantine: absent
global readback revocation: absent
```

## Core recovery gaps

```txt
world-definition retention/re-registration policy: absent
provider retirement receipts: absent
materializer cancellation receipt: absent
active-cell/provider parity verification: absent
reset rollback: absent
reprepare generation commit: absent
first READY frame acknowledgement: absent
```

## Render correlation gaps

```txt
world phase in render plan: absent
world generation in frame identity: absent
stale-generation frame rejection: absent
terminal blank/stop result: absent
first replacement-frame receipt: absent
compatibility snapshot lifecycle binding: absent
```

## Existing test gaps

```txt
legacy/Core result-shape parity
prepare twice
reset then prepare
dispose twice
prepare/update/materialize after dispose
stale query lease rejection
provider/materializer exact retirement counts
first frame after reusable reset
pagehide global readback revocation
```

## Retained higher-level gaps

```txt
browser startup transaction and rollback
runtime session ownership and callback leases
Core World focus transaction
materialization generation/readiness
renderer cell commit and disposal
camera baseline
dynamic environment frame coherence
adaptive quality transaction
```

## Risk ranking

```txt
P0 same public API has incompatible mode semantics
P0 Core wrapper remains callable after terminal teardown
P0 reset/reprepare cannot be relied on for restart or recovery
P1 stale queries and callbacks can outlive a world generation
P1 rendering can continue without lifecycle/frame provenance
P1 duplicate lifecycle operations have no idempotent result
P2 diagnostics cannot report lifecycle truth
```

## Ordered gaps

```txt
P0 browser startup admission and rollback
P0 runtime session lifecycle
P0 world lifecycle contract and mode parity
P1 Core World reset/reprepare
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
no rendering behavior changed
no package scripts changed
no dependencies changed
no deployment configuration changed
no lifecycle correctness claim made
```
