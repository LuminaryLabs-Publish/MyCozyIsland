# Deploy Audit: Provider to Render Fixture Gate

Timestamp: `2026-07-11T05-10-36-04-00`

## Current deployment identity

```txt
static GitHub Pages route
index.html
src/main-cloudform.js?v=core-world-1
Three.js 0.185.0 pinned through import map
NexusEngine 38229f59c22cb40024ffd13a9f48040de759f5d7 pinned through import map
world mode: core by default
rollback mode: ?world=legacy
```

## Current Node gate

`npm test` now includes:

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

This is a meaningful semantic and utility-level expansion. It does not execute the production browser host or prove that Core World revisions are consumed by visible Three/WebGPU resources.

## Missing release gate

Add a DOM-free `provider-render-commit` fixture that proves:

```txt
initial world revision commits exactly once
provider order is retained in presentation output
same revision is unchanged
stale revision is rejected
focus movement prepares, updates, retains, and releases the expected cells
render consumer receives the exact active presentation set
compatibility fallback is explicit
resource deltas equal the cell delta
shared resources remain while referenced
released cell-only resources dispose exactly once
world and render fingerprints correlate
bounded readback structured-clones successfully
```

Add a browser smoke that proves under both WebGPU and WebGL2 fallback:

```txt
core mode boots
legacy mode boots
shadow cell consumer reaches parity without changing visible output
focus movement advances world and render revision together
released cell groups leave the scene
no duplicate groups appear
pagehide/stop clears the animation loop and disposes cell resources
no console, validation, or unhandled rejection errors occur
```

## Required script shape

```txt
npm test
  -> existing semantic and utility fixtures
  -> provider-render-commit fixture
  -> runtime-lifecycle fixture

browser validation
  -> core/legacy boot matrix
  -> focus movement matrix
  -> repeated start/stop/restart matrix
  -> WebGPU/WebGL2 matrix
```

## Deployment rule

Do not remove `?world=legacy`, change the default active radius, expand movement beyond the central clearing, or make the cell-aware renderer visible by default until both semantic parity and browser resource-lifecycle gates pass.