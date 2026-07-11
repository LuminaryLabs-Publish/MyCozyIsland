# Deploy Audit: Startup Failure Fixture Gate

Timestamp: `2026-07-11T14-41-28-04-00`

## Summary

The deployed page pins module URLs and has a visible error panel, but the current test suite does not execute the browser module graph or prove startup rollback, fallback, retry or first-frame readiness. Deployment should remain proof-gated until cold-load and injected-failure fixtures exist.

## Plan ledger

**Goal:** define the minimum executable evidence required for a reliable Pages startup claim.

- [x] Inspect import-map and route pins.
- [x] Inspect static and Node test coverage.
- [x] Identify module, backend, rollback and readiness gaps.
- [x] Define browser and Pages fixture matrix.

## Current proof

```txt
pinned Three.js URL: yes
pinned NexusEngine commit URLs: yes
static regex checks: yes
Node domain/world/provider tests: yes
renderer utility disposal test: yes
browser module-load fixture: no
backend admission fixture: no
partial-startup rollback fixture: no
retry fixture: no
first-frame receipt: no
Pages cold-load smoke: no
```

## Required fixtures

```txt
1. module-source manifest
   verify route revision, exact URLs, versions and required exports

2. pre-main module failure
   block Three.js fetch and verify stable visible error projection

3. NexusEngine dynamic import failure
   verify typed failure and renderer rollback

4. backend admission
   WebGPU admitted, WebGL2 admitted, no-compatible-backend rejected

5. staged failure injection
   fail after renderer, world, texture, cloud/fog and post stages
   verify reverse cleanup receipts and zero live owned resources

6. loader truthfulness
   verify stage projection, failed state and first-frame-gated completion

7. retry
   verify a new generation and stale old-generation rejection

8. first frame
   capture frame ID, backend, quality, world and resource fingerprints

9. Pages smoke
   cold load deployed route, record console/network failures and first-frame receipt
```

## Deployment acceptance

```txt
module failures never strand the initial loader
partial startup leaves no owned resources alive
fallback is supported by capability proof
retry never reuses failed resources
loader completion follows first visible frame
public state exposes startup result without raw authority
```

## Validation status

Documentation only. No workflow, route, source, dependency or deployment configuration was changed, and no browser or Pages test was run.