# Preload handoff audit: generation, quiescence, and entry contract

**Timestamp:** `2026-07-13T12-38-45-04-00`

## Summary

The seamless shell needs one contract that separates readiness, simulation quiescence, presentation quiescence, player entry, visible completion, and retirement.

## Plan ledger

**Goal:** define the minimum command/result contract required before runtime implementation.

- [x] Define identities and generations.
- [x] Define quiescence leases.
- [x] Define preload and entry terminal results.
- [x] Define participant ordering and rollback.
- [x] Define observation and fixture requirements.
- [ ] Implement and test the contract.

## Identities

```txt
MenuShellId
MenuShellGeneration
MenuSchedulerId
PreloadSurfaceId
PreloadGeneration
CoreStartupLaunchId
SimulationGeneration
PresentationGeneration
PlayerEntryAttemptId
VisibleFrameId
```

## Preload command

```txt
MenuGamePreloadCommand {
  shellGeneration
  expectedMenuScheduler
  preloadPolicyRevision
  hiddenPresentationPolicy
  timeout
}
```

## Preload result

```txt
PreloadResult {
  status: Ready | Failed | Cancelled | Stale | Retired
  preloadGeneration
  startupLaunchId
  simulationQuiescenceReceipt
  presentationQuiescenceReceipt
  stateRevision
  presentationRevision
  boundedFailure
}
```

## Entry command

```txt
PlayerEntryCommand {
  entryAttemptId
  shellGeneration
  preloadGeneration
  startupLaunchId
  expectedStateRevision
  expectedPresentationRevision
}
```

## Entry result

```txt
PlayerEntryResult {
  status: Entered | Failed | Cancelled | Stale | Retired
  entryAttemptId
  stateRevision
  presentationFrameId
  rendererSubmissionReceipt
  visibleGameFrameAck
  historyTransitionReceipt
  focusTransferReceipt
  menuSchedulerRetirementReceipt
}
```

## Ordering

```txt
1. validate shell, preload and startup generations
2. reserve one entry attempt
3. prepare authored player-entry state
4. clear predecessor input generation
5. release simulation quiescence at one boundary
6. prepare and submit the successor game frame
7. acknowledge the matching visible iframe frame
8. commit history and focus transfer
9. retire the menu scheduler exactly once
10. publish Entered
```

Any failure before step 7 preserves the menu as the visible owner and returns a typed non-entered result. Stale or duplicate messages cause no state, history, focus, or visibility mutation.

## Observation

Expose detached read-only records for current generations, scheduler state, quiescence state, latest preload result, latest entry result, and first visible-frame acknowledgement. Do not expose raw mutable engine or renderer owners through this authority.

## Required fixtures

```txt
one menu RAF chain across repeated hide/show
hidden renderer Running/Throttled/Paused policy
zero simulation ticks while quiesced
ready message from predecessor iframe rejected
rapid double Play admits one entry
entry timeout preserves menu
post-resume render failure preserves menu
first visible frame completes entry
history and focus commit once
pagehide retires both schedulers
source/build/Pages parity
```