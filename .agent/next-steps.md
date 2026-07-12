# Next Steps: MyCozyIsland

Last updated: `2026-07-11T20-51-14-04-00`

## Summary

World lifecycle parity is the next documentation-defined contract beneath startup and runtime-session ownership. The wrapper must stop treating `prepared` as lifecycle authority and must expose one typed phase/generation/result model across legacy and Core modes.

## Plan ledger

**Goal:** make prepare, reusable reset, terminal disposal and read-model validity explicit before restart, recovery, focus, materialization or render cutover depend on the wrapper.

- [ ] Add `WorldLifecycleState` with phase, mode, generation and revisions.
- [ ] Make `prepared` a derived compatibility field.
- [ ] Add command IDs, sequence and expected phase/generation.
- [ ] Normalize legacy/Core result schemas.
- [ ] Separate reusable reset from terminal disposal.
- [ ] Retain or re-register the Core World definition during reusable reset.
- [ ] Add provider/materializer retirement receipts.
- [ ] Make terminal disposal idempotent.
- [ ] Reject prepare, focus, materialization and query acquisition after disposal.
- [ ] Bind queries and diagnostics to generation leases.
- [ ] Reject stale generation callbacks and results.
- [ ] Correlate first READY frame after reset with the new generation.
- [ ] Revoke global world/query readback on terminal page lifecycle.
- [ ] Add legacy/Core parity, reset/reprepare and use-after-dispose fixtures.

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Core World Reset / Re-prepare Authority
5. Pinned Core World Focus Transaction Authority
6. Live Materialization Readiness Commit Authority
7. Core World Render Commit Authority
8. Camera Rail Baseline Authority
9. Dynamic Environment Frame Authority
10. Adaptive Quality Transaction Authority
```

## Candidate lifecycle kits

```txt
world-lifecycle-phase-kit
world-runtime-generation-kit
world-mode-contract-kit
world-lifecycle-command-kit
world-lifecycle-admission-kit
world-prepare-result-kit
world-reset-policy-kit
world-reset-result-kit
world-dispose-result-kit
world-definition-lease-kit
world-query-lease-kit
world-diagnostics-lease-kit
provider-materializer-retirement-kit
stale-world-generation-rejection-kit
terminal-use-after-dispose-rejection-kit
legacy-core-lifecycle-adapter-kit
world-lifecycle-observation-kit
world-lifecycle-journal-kit
world-mode-parity-fixture-kit
world-use-after-dispose-fixture-kit
browser-world-lifecycle-smoke-kit
```

## Required state

```txt
WorldLifecycleState {
  sessionId
  worldId
  mode
  phase
  generation
  definitionRevision
  snapshotRevision
  providerStateRevision
  materializerRevision
  activeCellCount
  queryLeaseCount
  lastResult
}
```

## Required transaction rules

```txt
Prepare
  NEW or RESET -> READY
  duplicate READY -> typed idempotent result

Reset
  READY or recoverable FAILED -> RESET
  retire current generation
  preserve/recreate reusable definition policy

Dispose
  any non-DISPOSED phase -> DISPOSED
  duplicate DISPOSED -> typed idempotent result

After DISPOSED
  reject all mutations and new read-model leases
```

## Minimum fixture matrix

```txt
legacy prepare/reset/prepare
core prepare/reset/re-register/prepare
duplicate prepare
duplicate dispose
prepare/update/materialize after dispose
stale query lease
provider/materializer exact retirement counts
first replacement frame generation parity
pagehide readback revocation
WebGPU/WebGL2 lifecycle-result parity
```

## Acceptance conditions

```txt
READY always has a valid committed snapshot
RESET is reusable in both modes
DISPOSED is terminal in both modes
legacy/Core methods return the same result classes
world generation advances on successful reprepare
stale generation work cannot commit
query/diagnostic leases are revoked on reset/dispose
first replacement frame identifies the committed generation
```

## Next safe ledge

```txt
MyCozyIsland World Lifecycle Contract and Legacy/Core Mode Parity Authority
+ Reset/Re-prepare / Terminal-Dispose / Query-Lease / First-Replacement-Frame Fixture Gate
```
