# Startup Authority Audit: Acquisition Ledger and Rollback Contract

Timestamp: `2026-07-11T19-20-22-04-00`

## Summary

Startup needs an explicit acquisition ledger because ownership is accumulated across semantic, browser and GPU systems before the route is ready. Rollback must be generated from the capabilities actually acquired, not inferred from how far `main()` appeared to run.

## Capability record

```txt
StartupCapability
  capabilityId
  transactionId
  phase
  kind
  owner
  dependencies
  acquiredAtSequence
  state
  retireAdapter
  retireAfter
  retirementResult
```

## Capability kinds

```txt
renderer-backend
core-world-runtime
provider-set
materializer
scene
camera
scene-resource
render-consumer
volume-texture
post-pipeline
performance-callback
browser-listener
timer
animation-loop
global-projection
```

## Ledger rules

1. Record a capability only after its constructor/acquisition succeeds.
2. Record dependency identities at acquisition time.
3. Do not publish raw ownership through the global host before commit.
4. Mark every capability as active, retiring, retired or failed-retirement.
5. Generate rollback order by reversing the dependency graph and acquisition sequence.
6. Retire shared resources exactly once.
7. Preserve failed-retirement evidence instead of claiming a clean baseline.
8. Permit retry only when mandatory capability leases are zero.

## Startup result

```txt
StartupCommitResult
  transactionId
  sessionId
  generation
  backend
  worldMode
  catalogFingerprint
  worldSnapshotRevision
  firstFrameId
  capabilityCounts
  committedAt
```

## Failure result

```txt
StartupFailureResult
  transactionId
  failedPhase
  errorClass
  retryable
  acquiredCapabilityCounts
  rollbackStarted
  rollbackCompleted
  retirementReceipts
  unresolvedCapabilities
  baselineFingerprint
```

## Rollback contract

```txt
freeze acquisition
  -> block input/gameplay/frame publication
  -> stop animation loop when present
  -> remove/cancel callback leases
  -> retire post and render consumers
  -> retire volume and scene resources
  -> reset materializer/providers/world runtime
  -> dispose renderer/backend
  -> clear partial DOM/global projections
  -> compare final baseline fingerprint
  -> publish failure result
```

## Atomic world-prepare adapter

The startup authority must not infer prepare success from promise fulfillment alone. It requires a typed result with:

```txt
prepareTransactionId
prepared
worldSnapshotRevision
activeCellCount
providerReadiness
materializationBaseline
failure
rollbackReceipts
```

`prepared=true` with a null snapshot is invalid and must be rejected.

## First-frame gate

Startup remains in `AWAITING_FIRST_FRAME` until:

```txt
post pipeline returns success
frame references active startup transaction/session/generation
world snapshot revision matches accepted prepare result
required render consumers acknowledge readiness
no rollback is pending
```

## Minimum proof

```txt
failure injection at every acquisition phase
ledger count parity with acquired test doubles
reverse dependency retirement order
exactly-once retirement under duplicate failure handling
no leaked listeners/timers/loops
no prepared=true/null-snapshot state
clean retry under a new transaction
first-frame commit parity
```
