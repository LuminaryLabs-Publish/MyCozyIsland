# Architecture Audit: Live Materialization Readiness Commit DSK Map

Timestamp: `2026-07-11T09-08-59-04-00`

## Summary

The live host now advances lazy provider work, but the architecture still jumps directly from a frame callback to mutable provider stores. A composed authority is required between frame admission, staged work, provider readiness, presentation refresh, renderer planning, and visible-frame acknowledgement.

## Current path

```txt
animation-loop-host
  -> world-runtime.processMaterializationFrame()
  -> lazy-cell-materializer
  -> terrain / biome / shoreline / presentation providers
  -> mutable runtime stores
  -> aggregate counters

separate path
  startup compatibility snapshot
  -> stylized whole-island renderer
  -> visible frame
```

The two paths do not meet after startup.

## Required parent domain

```txt
cozy-island-live-materialization-readiness-domain
```

## DSK breakdown

### Admission and identity

```txt
materialization-frame-command-kit
materialization-admission-kit
materialization-epoch-kit
cell-generation-kit
```

Services:

```txt
command validation
session/world/focus revision fencing
monotonic frame sequence
cell generation assignment
re-entry rejection
reset/dispose rejection
```

### Scheduling and budget

```txt
materialization-priority-kit
provider-stage-plan-kit
row-work-budget-kit
frame-time-budget-kit
```

Services:

```txt
stable LOD/distance/ID priority
provider stage ordering
candidate and row limits
elapsed-time stop condition
budget exhaustion result
```

### Provider execution and failure

```txt
provider-stage-result-kit
provider-failure-classification-kit
materialization-retry-kit
stale-cell-work-rejection-kit
```

Services:

```txt
typed stage success/failure
retriable versus terminal classification
bounded attempts and backoff
quarantine
released/reset generation rejection
```

### Readiness commit

```txt
provider-readiness-policy-kit
provider-readiness-set-kit
cell-readiness-revision-kit
presentation-readiness-commit-kit
```

Services:

```txt
required/optional/degraded provider policy
source descriptor version join
readiness fingerprint
monotonic cell readiness revision
presentation descriptor refresh tied to source versions
```

### Render transaction

```txt
renderer-cell-plan-kit
renderer-cell-commit-result-kit
renderer-cell-rollback-kit
visible-frame-acknowledgement-kit
```

Services:

```txt
detached resource preparation
prepare/update/release plan
atomic scene commit
rollback to prior or compatibility resources
resource retirement
first visible frame correlation
```

### Observation and proof

```txt
materialization-observation-kit
materialization-journal-kit
live-materialization-fixture-kit
browser-ready-cell-render-smoke-kit
```

Services:

```txt
clone-safe bounded readback
ordered command/result journal
deterministic headless fixtures
WebGPU/WebGL2 browser proof
```

## Engine/product boundary

Keep island-specific provider stages, presentation schema, and renderer resources in `MyCozyIsland`. Promote only reusable primitives into the existing NexusEngine Core World DSK:

```txt
deferred provider command/result
cell generation
provider readiness rows
readiness-set validation
stale completion rejection
world/focus revision admission
```

Do not introduce a second world registry, scheduler, or provider framework.

## Dependency order

```txt
runtime session authority
  -> focus transaction authority
  -> live materialization readiness authority
  -> renderer-cell commit authority
  -> compatibility retirement
```
