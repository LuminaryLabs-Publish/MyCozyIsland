# Deploy Audit: World Lifecycle Mode-Parity Fixture Gate

Timestamp: `2026-07-11T20-51-14-04-00`

## Summary

The current test chain proves initial Core World preparation and one disposal call, but it does not exercise post-reset preparation, terminal use-after-dispose, legacy/Core result parity or browser frame behavior after lifecycle changes.

## Plan ledger

**Goal:** define the minimum executable gate required before restart, recovery or page-lifecycle code depends on the public world wrapper.

- [x] Inspect package test chain.
- [x] Inspect `tests/core-world-runtime.mjs`.
- [x] Identify missing lifecycle sequences.
- [x] Define Node and browser fixture matrix.

## Existing proof

```txt
core startup reaches 49 active cells
terrain and presentation stores reach 49 entries
snapshot is JSON serializable
dispose does not throw
```

## Missing proof

```txt
legacy/core lifecycle result parity
prepare called twice
reset followed by prepare
dispose called twice
prepare/update/materialize/query after dispose
world generation advancement
stale query rejection
provider/materializer retirement counts
first frame after reusable reset
pagehide global readback revocation
```

## Required fixture matrix

```txt
Node
  legacy prepare/reset/prepare
  core prepare/reset/re-register/prepare
  duplicate prepare and duplicate dispose
  post-dispose mutation rejection
  stale generation and query lease rejection
  provider/materializer exact retirement counts
  fake/pinned runtime parity

Browser
  Core and legacy first READY frame
  reusable reset first replacement frame
  pagehide terminal disposal
  no animation or global readback after disposal
  WebGPU/WebGL2 result-schema parity
```

## Acceptance gate

```txt
all lifecycle operations return typed results
RESET is reusable in both modes
DISPOSED is terminal in both modes
no stale generation reaches focus, materialization or rendering
no raw query survives lease revocation
first replacement frame identifies the new generation
```
