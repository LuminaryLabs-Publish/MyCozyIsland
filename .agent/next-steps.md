# Next Steps: MyCozyIsland

Last updated: `2026-07-11T19-20-22-04-00`

## Summary

Browser Startup Admission and Failure Rollback Authority is the first implementation slice. It must produce the session, generation, world baseline, capability identities and first-frame evidence consumed by Runtime Session Lifecycle Authority and every downstream world/render authority.

## Plan ledger

**Goal:** replace procedural `main()` construction with a staged commit-or-rollback startup transaction without duplicating renderer, world, resource or frame identities.

- [ ] Introduce `startupTransactionId`, startup phase and command sequence.
- [ ] Validate catalog, DOM, query mode and pinned import capabilities before acquisition.
- [ ] Add a capability acquisition ledger with dependency and disposal metadata.
- [ ] Return typed renderer/backend initialization results.
- [ ] Make Core World prepare atomic: commit `prepared` only with a valid snapshot.
- [ ] Add provider/materializer rollback for prepare failures.
- [ ] Return typed capability descriptors from render factories.
- [ ] Register browser listeners, timers and loop as startup leases.
- [ ] Add a first-frame readiness and commit gate.
- [ ] Publish clone-safe startup observations only after commit.
- [ ] Generate reverse-order rollback from the acquisition ledger.
- [ ] Dispose partial scene, volume, post, renderer and backend resources.
- [ ] Restore a clean retry baseline and classify retryable versus terminal failures.
- [ ] Prevent duplicate Start/Retry attempts while ownership remains active.
- [ ] Add phase failure injection and clean-retry fixtures.
- [ ] Add WebGPU/WebGL2 browser startup parity smokes.

## Ordered implementation queue

```txt
1. Browser Startup Admission + Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. Core World Reset / Re-prepare Authority
4. Pinned Core World Focus Transaction Authority
5. Live Materialization Readiness Commit Authority
6. Core World Render Commit Authority
7. Camera Rail Baseline Authority
8. Dynamic Environment Frame Authority
9. Adaptive Quality Transaction Authority
```

## Candidate startup kits

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

## Required startup state

```txt
StartupTransaction
  transactionId
  phase
  admittedConfig
  catalogFingerprint
  backend
  worldMode
  acquisitionLedger
  callbackLeases
  rollbackPlan
  worldPrepareResult
  firstFrameId
  commitResult
  failureResult
  retryClass
```

## Required start transaction

```txt
StartCommand
  -> admit configuration and imports
  -> enter STARTING
  -> acquire renderer/backend
  -> acquire and atomically prepare Core World
  -> acquire scene and render capabilities
  -> install callback/timer/loop leases
  -> render first frame
  -> publish StartupCommitResult
  -> hand session ownership to Runtime Session Lifecycle
```

## Required rollback transaction

```txt
startup failure
  -> freeze acquisition
  -> stop loop and callbacks when present
  -> retire recorded capabilities in reverse dependency order
  -> reset world/provider/materializer candidate state
  -> remove partial public projection
  -> verify baseline fingerprint
  -> publish StartupFailureResult
  -> allow Retry only when rollback is complete
```

## Minimum fixture matrix

```txt
catalog failure
renderer constructor/init failure
pinned import/capability failure
provider registration failure
initial focus/update failure
materializer sync failure
world/ocean/foam failure
volume/cloud/fog/post failure
callback/timer/loop failure
first-frame failure
rollback order and exact retirement counts
duplicate Start and premature Retry rejection
prepare failure followed by successful retry
no global host before commit
WebGPU/WebGL2 parity
first-frame transaction parity
```

## Acceptance conditions

```txt
prepared=true always implies a valid committed world snapshot
every acquired capability has identity and retirement behavior
failed startup leaves zero mandatory callback/loop/resource leases
rollback reports unresolved capabilities instead of hiding them
retry begins from a verified baseline under a new transaction ID
only one startup transaction can acquire at a time
running is published only after first-frame acknowledgement
Runtime Session Lifecycle consumes the committed startup result
```

## Next safe ledge

```txt
MyCozyIsland Browser Startup Admission and Failure Rollback Authority
+ Phase Failure Injection / Reverse Retirement / Clean Retry / First-Frame Commit Fixture Gate
```
