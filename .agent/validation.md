# Validation: MyCozyIsland

Last updated: 2026-07-10T14-42-01-04-00

## This pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
browser smoke: not run
WebGPU/GPU validation: not run
Node frame-correlation fixture: not run because it does not exist yet
repo-local documentation pushed to main: yes
central ledger update required: yes
```

## Current available gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

## Current tests prove

- static route and WebGPU token expectations
- kit catalog shape/count
- deterministic domain composition for selected descriptors

## Current tests do not prove

- ordered input command/result records
- frame and correlation identity
- scenario-step to camera-projection linkage
- atmosphere build source attribution
- performance transition ordering
- render submission attribution
- bounded journal retention/reset behavior
- JSON-safe `CozyIslandHost` serialization

## Next required gate

```txt
node scripts/cozy-island-frame-correlation-fixture.mjs
npm test
```

The fixture must run without a DOM, real GPU, screenshot, or WebGPU capture and must assert strict sequence ordering, correlation completeness, deterministic eviction, reset behavior, and JSON serialization.