# Known gaps: MyCozyIsland preload suspension lease and resumed-frame authority

**Timestamp:** `2026-07-14T15-01-54-04-00`  
**Publication status:** `preload-suspension-lease-resume-frame-authority-audited`

## Summary

The hidden game is source-backed and intentionally sleeps after Core Startup reaches playable, but suspension and restoration have no lease identity, participant receipts, rollback, or first resumed-frame proof. The parent can also reveal after a fixed delay without knowing whether restoration succeeded.

## Plan ledger

**Goal:** separate confirmed sleeping-preload implementation from unproved restoration and visible-entry guarantees.

- [ ] Suspension and entry identities.
- [ ] Exact engine, scheduler, renderer and callback participant manifests.
- [ ] Atomic suspension and restoration results.
- [ ] Stale, duplicate and superseded command rejection.
- [ ] Restoration rollback.
- [ ] First resumed tick and frame evidence.
- [ ] Classified timeout and recovery behavior.
- [ ] Origin, schema, sequence and revision message admission.
- [ ] Browser/build/Pages artifact parity.

## Suspension gaps

```txt
PreloadGeneration: absent
SuspensionAttemptId: absent
SuspensionLeaseId: absent
EngineRevision: absent
SchedulerRevision: absent
RendererRevision: absent
AnimationLoopRevision: absent
InputRevision: absent
PlayerRevision: absent
PreloadSuspensionPreparationResult: absent
PreloadSuspensionResult: absent
participant receipts: absent
```

The bridge directly replaces `engine.tick` and `engine.step` and directly clears the renderer animation loop. This is confirmed implementation, not proof that every engine or renderer participant has accepted the same suspension generation.

## Restoration gaps

```txt
EntryAttemptId: absent
expected SuspensionLeaseId: absent
stale participant rejection: absent
duplicate entry result: absent
superseded attempt rejection: absent
atomic restoration: absent
restore rollback: absent
engine replacement detection: absent
renderer replacement detection: absent
callback ownership validation: absent
GameEntryResult: absent
```

## Visible-frame gaps

```txt
resumed simulation-step receipt: absent
resumed render-submission receipt: absent
GameFrameId: absent
startup-to-frame revision correlation: absent
entry-to-frame revision correlation: absent
FirstResumedGameFrameAck: absent
iframe visibility receipt: absent
```

`cozy-game-entered` is posted synchronously after restoration calls. It is not evidence that the restored callback executed or that the iframe displayed a matching game frame.

## Timeout and fallback gaps

```txt
900 ms fallback classification: absent
transport-timeout result: absent
restore-timeout result: absent
render-timeout result: absent
retry-entry command: absent
reload-game command: absent
direct-route recovery result: absent
fallback-visible-frame acknowledgement: absent
```

Elapsed time alone can cause the parent to reveal the iframe even when no accepted child result exists.

## Protocol gaps

```txt
message schema version: absent
event.origin validation: absent
message sequence: absent
shell generation: absent
startup revision: absent
suspension lease: absent
entry revision: absent
replay or duplicate policy: absent
```

Both listeners check `event.source`, which is useful but incomplete for a revisioned command/result protocol.

## Validation gaps

```txt
real browser engine suspension fixture: absent
real browser renderer suspension fixture: absent
engine replacement fault: absent
renderer replacement fault: absent
restore exception fault: absent
message delay/reorder fixture: absent
wrong-origin fixture: absent
first resumed tick fixture: absent
first resumed frame fixture: absent
source/build/Pages parity: absent
```

The existing smoke checks source text only.

## Retained gaps

```txt
postcard atlas isolation and backend image parity
complete menu scene, texture, compute and listener retirement
independent game preload after menu failure
pagehide and BFCache policy
adaptive quality transitions
portable save durability
browser input authority
bounded public capabilities
```

## Dependency order

```txt
revisioned message envelope
  -> suspension participant manifest
  -> atomic suspension result
  -> correlated entry restoration
  -> rollback and timeout classification
  -> resumed tick and frame acknowledgement
  -> shell reveal
  -> source/build/Pages parity
```

## Do not claim

Do not claim suspension atomicity, exact restoration, timeout safety, visible entry, browser parity, or production readiness until the relevant fixtures pass on `main`.
