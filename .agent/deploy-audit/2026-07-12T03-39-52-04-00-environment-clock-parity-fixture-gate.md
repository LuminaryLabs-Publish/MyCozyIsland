# Deploy Audit: Environment Clock Parity Fixture Gate

Timestamp: `2026-07-12T03-39-52-04-00`

## Summary

The current `npm test` chain does not execute browser shader time, scenario reset against live renderer time, WebGPU/WebGL2 environment parity, or deployed Pages reset behavior. Deployment success cannot prove environment-frame coherence.

## Existing validation surface

```txt
static source checks
domain smoke
world baseline and Core World runtime
provider order, query, population and snapshot parity
cell lifecycle and lazy materialization
render layer graph and terrain separation
camera rail and first-person contracts
foam depth occlusion
renderer cell cache and resource disposal
```

## Missing executable gates

```txt
environment-clock-source-divergence.mjs
environment-reset-phase-parity.mjs
environment-dynamic-descriptor-revision.mjs
environment-consumer-receipt.mjs
environment-stale-generation.mjs
environment-webgpu-webgl2-parity.mjs
environment-visible-frame-ack.mjs
browser-environment-reset-smoke
pages-environment-reset-smoke
```

## Required Node fixture behavior

A headless environment-frame fixture should inject explicit clock and renderer-time adapters rather than relying on real wall time.

```txt
advance canonical clock by known deltas
inspect every derived descriptor
inspect every planned consumer input
reset under a new generation
verify exact phase restart
reject stale predecessor revisions
```

## Required browser smoke

```txt
launch active route
capture initial environment observation
advance several frames
invoke admitted reset
capture first visible reset frame
verify ocean, foam, clouds, fog, vegetation and campfire cite one time
repeat in WebGPU and forced WebGL2 fallback
```

## Required Pages smoke

```txt
load deployed route with cache key
verify module and shader assets resolve
verify clock source and environment revision are observable
perform reset
verify first visible frame carries the new reset generation
verify no old renderer callback updates later frames
```

## CI acceptance gate

```txt
npm test includes deterministic environment-frame fixtures
WebGPU browser smoke passes when supported
WebGL2 fallback smoke passes
all required consumer receipts are present
reset phase parity passes
public observation matches visible frame
Pages route passes the same reset contract
```

## Current result

```txt
runtime source changed: no
workflow changed: no
package scripts changed: no
npm test run: no
browser smoke run: no
Pages smoke run: no
environment fixture files present: no
deployment readiness claimed: no
```