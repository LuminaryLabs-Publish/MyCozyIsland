# Architecture Audit: Browser Startup Admission DSK Map

Timestamp: `2026-07-11T14-41-28-04-00`

## Summary

The current startup host combines module loading, renderer selection, resource construction, loader projection, listener installation and loop publication in one imperative `main()` function. The reusable boundary is a browser-startup admission domain that produces one typed ready or failed result and owns rollback for every acquired resource.

## Plan ledger

**Goal:** define the DSK/domain split required to make startup deterministic, observable and retriable.

- [x] Separate source admission from runtime initialization.
- [x] Separate renderer candidate discovery from backend admission.
- [x] Separate stage execution from loader projection.
- [x] Assign resource ownership and reverse cleanup.
- [x] Define retry and first-frame proof.

## Proposed parent domain

```txt
cozy-island-browser-startup-admission-authority-domain
```

## Candidate kits and services

```txt
module-source-manifest-kit
  canonical source URLs, versions, integrity fields and manifest fingerprint

module-graph-admission-kit
  required exports, capabilities and typed fetch/parse/evaluation results

startup-command-kit
  start/retry intent with expected generation and policy

startup-transaction-id-kit
  unique boot-attempt identity

startup-generation-kit
  monotonic callback and result fence

startup-stage-plan-kit
  ordered stage declarations and dependencies

startup-stage-result-kit
  started/completed/failed stage receipts

renderer-backend-candidate-kit
  WebGPU/WebGL2 candidate descriptors and capability evidence

renderer-backend-admission-kit
  deterministic candidate selection and rejection reasons

startup-quality-admission-kit
  quality candidate derived from admitted backend and device policy

startup-resource-ledger-kit
  ownership rows for renderer, world, textures, scene resources, listeners, timers, loop and host

startup-cleanup-stack-kit
  reverse-order idempotent cleanup registration

startup-rollback-kit
  failure fencing, cleanup execution and rollback receipts

startup-failure-classification-kit
  module, renderer, world, resource, listener, frame and policy failure codes

loader-state-projection-kit
  read-only projection of authoritative stage state

startup-retry-kit
  new-generation retry admission and stale-generation rejection

first-frame-readiness-kit
  visible-frame receipt correlated with startup/backend/world fingerprints

startup-result-kit
  detached ready, failed, rolled-back or stopped result

startup-journal-kit
  bounded ordered transition log

startup-observation-kit
  clone-safe public state without raw renderer/world authority

module-fetch-failure-fixture-kit
renderer-backend-fallback-fixture-kit
partial-startup-rollback-fixture-kit
browser-startup-smoke-kit
```

## Required composition

```txt
browser route shell
  -> module-source-manifest-kit
  -> module-graph-admission-kit
  -> startup-command-kit
  -> startup transaction authority
       -> stage plan
       -> backend admission
       -> quality admission
       -> resource ledger
       -> cleanup stack
       -> rollback
  -> runtime session owner
  -> Core World runtime
  -> render consumer graph
  -> first-frame readiness
  -> loader/public observation projection
```

## Ownership boundaries

```txt
startup authority owns
  module/source admission
  startup identity and generation
  ordered stage execution
  backend/quality admission
  acquired-resource ledger
  startup rollback and retry
  ready/failed result

runtime session owns after commit
  animation loop
  listeners and timers
  live renderer/world resources
  global host lease
  stop/dispose/restart

Core World owns
  registered world definitions
  providers, focus and cell lifecycle

render adapters own
  Three.js objects and GPU resources
  render application and disposal receipts
```

## Anti-overlap rules

- Do not create a second Core World implementation.
- Do not put renderer objects inside reusable source/admission descriptors.
- Do not let loader DOM state become the startup source of truth.
- Do not allow retry to reuse the failed generation.
- Do not claim backend fallback from a string branch alone.
- Do not publish the global host before startup commit.

## Dependency order

```txt
module/source identity
  -> startup generation
  -> backend admission
  -> quality admission
  -> resource ownership
  -> world/render preparation
  -> first-frame receipt
  -> runtime-session authority transfer
```