# Architecture Audit: Browser Startup Failure Rollback DSK Map

Timestamp: `2026-07-11T19-20-22-04-00`

## Summary

The route has no composed domain above startup acquisition. `main()` is simultaneously the module adapter, dependency resolver, backend initializer, world bootstrapper, scene composer, callback installer, animation owner and public-host publisher. Failure is reduced to DOM text, not a typed transaction result.

## Existing ownership graph

```txt
main()
  -> validateKitCatalog
  -> WebGPURenderer constructor/init
  -> chooseRenderQuality
  -> createCozyIslandWorldRuntime
     -> legacy composition
     -> NexusEngine imports
     -> provider construction
     -> Core World registration
     -> materializer/query/bridge
  -> domains.prepare
  -> scene/camera/sky/lights
  -> world/ocean/foam renderers
  -> atmosphere volume textures
  -> cloud/fog renderers
  -> post pipeline
  -> performance budget
  -> listeners/timers/loop
  -> global host
```

No parent owns the acquisition sequence or the inverse retirement sequence.

## Required parent domain

```txt
cozy-island-browser-startup-authority-domain
```

## Required kits

```txt
startup-transaction-id-kit
startup-phase-kit
startup-config-admission-kit
pinned-import-admission-kit
backend-init-result-kit
startup-acquisition-ledger-kit
startup-capability-lease-kit
world-prepare-transaction-kit
startup-resource-descriptor-kit
startup-callback-lease-kit
first-frame-readiness-kit
startup-commit-result-kit
startup-failure-result-kit
startup-rollback-plan-kit
reverse-order-retirement-kit
retry-baseline-kit
startup-observation-kit
startup-journal-kit
startup-failure-injection-fixture-kit
browser-backend-startup-smoke-kit
```

## Domain responsibilities

### Admission

```txt
validate DOM surfaces
validate kit catalog
validate URL/query mode
validate pinned import capabilities
select backend and quality policy
create startupTransactionId
```

### Acquisition

```txt
acquire one capability at a time
assign stable resource identity
record owner, dependencies and disposal adapter
record acquisition order
record whether acquisition is reversible
```

### Commit

```txt
world prepared with non-null snapshot
render consumers constructed
callbacks installed under session generation
animation loop installed once
first frame renders successfully
clone-safe StartupCommitResult published
```

### Rollback

```txt
stop further acquisition
stop loop and callbacks when installed
retire capabilities in reverse dependency order
restore world prepare baseline
remove partial public surfaces
return rollback receipts and unresolved failures
```

## Required state model

```txt
StartupTransaction
  transactionId
  phase
  admittedConfig
  backend
  worldMode
  acquisitionSequence
  acquiredCapabilities
  rollbackSequence
  firstFrameId
  result
  failure
  retirementReceipts
  retryClass
```

## Phase model

```txt
CREATED
ADMITTING
INITIALIZING_BACKEND
CREATING_WORLD
PREPARING_WORLD
CREATING_SCENE
CREATING_VOLUMES
CREATING_RENDERERS
INSTALLING_CALLBACKS
AWAITING_FIRST_FRAME
COMMITTED
ROLLING_BACK
FAILED_RETRYABLE
FAILED_TERMINAL
```

## Critical prepare invariant

Current behavior sets `prepared = true` before initial focus commit. Required behavior:

```txt
prepare candidate
  -> execute initial focus/provider update
  -> validate non-null world snapshot
  -> commit prepared=true and snapshot together
  -> otherwise restore prepared=false and null baseline
```

## Dependency-aware reverse order

Illustrative rollback:

```txt
animation loop
listeners and timers
performance budget callbacks
post pipeline
cloud and fog renderers
volume textures
world/ocean/foam renderers
scene resources
Core World runtime/providers/materializer
renderer/backend
```

The exact graph must come from recorded capabilities rather than a hard-coded best-effort cleanup block.

## DSK boundary rules

1. Render factories remain render-specific kits and return typed capability descriptors.
2. Core World remains semantic authority and exposes atomic prepare/reset results.
3. Startup authority composes those results but does not absorb their internal behavior.
4. Runtime Session Lifecycle begins only after StartupCommitResult.
5. Failure rollback uses the same disposal adapters later consumed by runtime disposal.
6. Global readback publishes only committed startup observations, never partial raw ownership.

## Acceptance gate

```txt
every phase can fail under fixture control
every acquired capability appears in the ledger
every reversible capability produces one retirement receipt
rollback order respects dependencies
a failed prepare leaves prepared=false and permits a clean retry
no animation loop or browser callback survives failed startup
no global CozyIsland host appears before commit
running is reported only after first-frame acknowledgement
WebGPU and WebGL2 share the same result schema
```
