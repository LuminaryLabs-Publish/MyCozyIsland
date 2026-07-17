# Interaction audit — Save commit command/result map

**Timestamp:** `2026-07-17T03-06-12-04-00`

```txt
SaveEnvelopeCaptureCommand
  input: expected durable-domain revisions
  output: SaveEnvelopeCaptureResult
  effect: immutable envelope only

HostSaveCommitCommand
  input: save generation, digest, storage key, predecessor digest
  output: HostSaveCommitResult
  terminal states: persisted | failed | indeterminate

SaveDurabilitySettlementCommand
  input: matching host result
  output: SaveDurabilitySettlementResult
  effect: advance durable digest or retain failure

SaveStatusProjectionCommand
  input: matching settlement and frame revision
  output: SaveStatusProjectionResult
  acknowledgement: FirstDurableSaveStatusFrameAck

PageLifecycleSaveCommand
  input: lifecycle reason and latest admitted save demand
  output: PageLifecycleSaveResult
```

## Admission rules

- Reject host results for stale save generations.
- Retain duplicate results without reapplying state.
- Never advance the durable fingerprint from capture alone.
- Never clear a host persistence error until a later matching commit succeeds.
- Project `Saved` only from a persisted result and matching frame acknowledgement.
