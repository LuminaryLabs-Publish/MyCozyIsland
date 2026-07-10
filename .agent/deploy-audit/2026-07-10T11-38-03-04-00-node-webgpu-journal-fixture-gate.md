# Deploy audit: Node WebGPU journal fixture gate

Timestamp: `2026-07-10T11-38-03-04-00`

## Current package gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

## What current tests prove

```txt
50 kit catalog is valid
kit ids are unique and suffixed
source files avoid unseeded randomness outside the route shell
WebGPU importmap and route token exist
deterministic terrain, shoreline, vegetation, rocks, foam, cloud, and fog source descriptors compose
scenario tick returns a render snapshot
```

## What current tests do not prove

```txt
browser WebGPU render consumption
input accepted/rejected/no-change/clamped rows
scenario tick journal rows
camera frame readback rows
volume texture result rows
performance degrade/recover rows
JSON-safe CozyIslandHost state
render-consumption ledger parity
```

## Required next gate

```txt
node scripts/cozy-island-webgpu-journal-fixture.mjs
npm test
```

The fixture should not require browser GPU, screenshots, or WebGPU capture.

## Validation this pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
browser smoke: not run
WebGPU/GPU validation: not run
DOM-free WebGPU consumer fixture: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: pending in this run
```
