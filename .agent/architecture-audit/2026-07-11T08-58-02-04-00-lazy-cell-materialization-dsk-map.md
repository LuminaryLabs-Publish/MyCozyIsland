# Architecture Audit: Lazy Cell Materialization DSK Map

Timestamp: `2026-07-11T08-58-02-04-00`

## Summary

The existing scheduler should become a product-owned authority inside the current world wrapper and host. Reusable work-budget and readiness primitives can later be promoted into the existing NexusEngine Core World DSK.

## Current composition

```txt
Core World active descriptors
  -> lazy-cell-materializer
       -> island-terrain-provider
       -> biome-classification-provider
       -> shoreline-classification-provider
       -> cell-presentation-provider
  -> compatibility render bridge
  -> static whole-island renderer
```

## Current ownership defect

```txt
wrapper owns scheduler object
host owns animation loop
host never steps scheduler
Core World owns active descriptor lifecycle
providers own partial jobs
no authority joins those owners
```

## Required composed domain

```txt
cozy-island-lazy-materialization-authority-domain
  -> materialization-frame-command-kit
  -> materialization-admission-kit
  -> materialization-priority-kit
  -> provider-stage-plan-kit
  -> row-work-budget-kit
  -> frame-time-budget-kit
  -> materialization-epoch-kit
  -> stale-cell-work-rejection-kit
  -> provider-stage-result-kit
  -> materialization-failure-kit
  -> materialization-retry-kit
  -> cell-readiness-revision-kit
  -> provider-readiness-set-kit
  -> presentation-readiness-commit-kit
  -> compatibility-render-handoff-kit
  -> materialization-observation-kit
  -> materialization-journal-kit
  -> lazy-materialization-fixture-kit
  -> browser-first-frame-materialization-smoke-kit
```

## Service boundaries

```txt
command/admission:
  validate runtime state, first-frame state, session, epoch, world revision, budgets

priority/budget:
  stable cell ordering, row allowance, elapsed-time allowance, frame result

epoch/stale rejection:
  bind work to active cell generation and accepted focus/world revision

provider stages:
  plan and classify terrain, biome, shoreline, presentation work

failure/retry:
  typed errors, attempt limits, backoff, terminal quarantine

readiness:
  join required provider versions into one cell readiness revision

render handoff:
  expose only accepted readiness revisions to detached render planning

observation/proof:
  clone-safe state, bounded journal, deterministic and browser fixtures
```

## Existing DSKs to update first

```txt
product world wrapper
browser animation-loop host
Core World runtime adapter
terrain provider adapter
presentation provider
renderer cell controller
runtime diagnostics
```

## Do not create

- a second world registry
- a second active-cell selector
- a parallel renderer lifecycle
- a scheduler that bypasses session/focus revisions
- a global unbounded background queue
