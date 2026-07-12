# Deploy Audit: Adaptive Quality Fixture Gate

Timestamp: `2026-07-12T05-00-19-04-00`

## Goal

Prevent deployment from claiming adaptive-quality correctness until cadence, recovery, policy, resize, backend, diagnostics, and visible-frame behavior are executable and repeatable.

## Current gate

`npm test` runs static, domain, world, render-graph, camera, foam, cache, and disposal checks. It contains no adaptive-performance test and no browser fixture that drives level transitions.

## Required Node fixtures

```txt
performance-budget time-window fixture
  -> equivalent elapsed traces at 30/60/120 Hz

quality-policy fixture
  -> URL override modes and capability policy

transition-result fixture
  -> expected revision, accepted result and stale rejection

consumer-plan fixture
  -> complete mutable/immutable classification

recovery fixture
  -> level 2 -> 1 -> 0 exact state parity
```

## Required browser fixtures

```txt
WebGPU cadence and recovery smoke
WebGL2 cadence and recovery smoke
hidden-tab/resume sample rejection
resize and device-DPR transaction
partial consumer failure and rollback
base/active diagnostics parity
first visible quality-frame acknowledgement
```

## Required deployed Pages proof

```txt
route loads with default capability policy
forced quality modes follow documented semantics
synthetic sustained load degrades deterministically
synthetic sustained recovery restores exact base DPR
refresh rate does not change dwell policy
resize does not leave mixed quality state
debug/public readback cites one quality revision
captured frame cites the committed quality result
```

## Admission rule

```txt
no deployment-quality claim unless:
  Node policy and transition fixtures pass
  WebGPU and WebGL2 browser fixtures pass
  exact DPR recovery passes
  cadence parity passes
  Pages visible-frame proof passes
```

## Current validation

```txt
npm test run: no
adaptive-quality fixtures implemented: no
browser WebGPU smoke: no
browser WebGL2 smoke: no
Pages adaptive-quality smoke: no
runtime or deployment files changed: no
```