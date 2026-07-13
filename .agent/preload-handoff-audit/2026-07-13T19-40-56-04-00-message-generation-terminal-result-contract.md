# Preload handoff audit: message generation and terminal result contract

**Timestamp:** `2026-07-13T19-40-56-04-00`

## Summary

The current shell uses one iframe and informal `postMessage` events, but the protocol does not identify which shell, iframe document, startup run or player-entry attempt produced a result. This contract adds generation fencing and explicit terminal outcomes without moving Core Startup or renderer mechanics into the bridge.

## Plan ledger

**Goal:** make hidden preload and entry safe across reload, timeout, duplicate input, page lifecycle and future shell reuse.

- [x] Preserve same-origin transport.
- [x] Define shell, frame, preload and entry identities.
- [x] Define monotonic sequence and deduplication requirements.
- [x] Define terminal preload and entry results.
- [x] Define cancellation and retirement.
- [ ] Implement MessageChannel or equivalent bounded transport.

## Required identities

```txt
ShellGeneration
FrameGeneration
PreloadAttemptId
StartupRevision
ReadyRevision
EntryAttemptId
MessageId
MessageSequence
ProtocolVersion
```

## Preload terminal result

```txt
PreloadProtocolResult {
  status: Ready | Failed | Cancelled | TimedOut | Stale | Retired,
  shellGeneration,
  frameGeneration,
  preloadAttemptId,
  startupRevision,
  continuation,
  finalSequence,
  failure,
  evidence
}
```

## Entry terminal result

```txt
EntrySettlementResult {
  status: Entered | Degraded | Failed | Cancelled | TimedOut | Stale | Retired,
  preloadAttemptId,
  entryAttemptId,
  readyRevision,
  playerRevision,
  renderSnapshotRevision,
  frameSubmissionId,
  visibleFrameAck,
  historyCommitted,
  focusCommitted,
  menuRetirementRequested,
  failure
}
```

## Lifecycle rules

```txt
iframe load or navigation
  -> allocate new FrameGeneration
  -> retire predecessor protocol

pagehide
  -> cancel active timers/polls
  -> retire ports and pending attempts

BFCache restore
  -> allocate or revalidate shell generation
  -> reject predecessor callbacks/messages

duplicate Play
  -> return Duplicate with current EntryAttemptId

entry timeout
  -> return TimedOut or Degraded by explicit policy
  -> never report Entered without matching frame acknowledgement
```

## Ownership

Core Startup supplies readiness facts. The bridge transports and correlates them. The game renderer supplies frame evidence. The shell commits visibility, history and focus only after consuming a valid entry result.