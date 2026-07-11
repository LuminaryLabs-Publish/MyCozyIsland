# Deploy Audit: Lazy Materialization Fixture Gate

Timestamp: `2026-07-11T08-58-02-04-00`

## Summary

The new Node fixture proves the scheduler in isolation, but deployment readiness requires the browser host to start it after the first committed frame and keep failures from terminating rendering.

## Existing gate

```txt
npm test includes tests/lazy-world-materialization.mjs
```

It proves lightweight registration, deterministic priority, row limits, eventual completion, terrain-array reuse, presentation refresh, and scheduler removal of released cells.

## Missing deploy proof

```txt
route invokes materialization
first-frame ordering
session/world/cell epoch admission
elapsed-time budget
focus and release concurrency
provider exception containment
retry and terminal failure
clone-safe browser diagnostics
cell readiness revision
render handoff
WebGPU/WebGL2 parity
Pages execution
```

## Required gate sequence

```txt
static and catalog checks
  -> isolated scheduler fixture
  -> exact world-wrapper fixture
  -> focus/release/reset concurrency fixture
  -> provider failure/retry fixture
  -> host first-frame integration fixture
  -> WebGPU browser smoke
  -> WebGL2 browser smoke
  -> Pages smoke
```

## Browser assertions

```txt
compatibility frame appears before heavy work
materialization frames become greater than zero
pending cells decrease
stale released cells never become ready
provider failure does not stop rendering
ready cells cite provider versions and world revision
legacy mode remains explicit and idle
```

## Deployment status

```txt
runtime changed by this audit: no
workflow changed: no
npm test run: no
browser smoke run: no
Pages smoke run: no
branch created: no
pull request created: no
```
