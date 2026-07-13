# Interaction audit: cross-window message admission map

**Timestamp:** `2026-07-13T19-40-56-04-00`

## Summary

Current handlers recognize messages by `event.data.type` after checking only the expected `WindowProxy`. The protocol has no explicit schema, version, message identity, attempt correlation or sequence policy.

## Plan ledger

**Goal:** classify every parent/child message as accepted, stale, duplicate, malformed, foreign, out-of-order, cancelled or retired.

- [x] Map message directions and current checks.
- [x] Record target-origin and source-window behavior.
- [x] Record missing origin, schema and generation checks.
- [x] Define typed admission outcomes.
- [ ] Implement and test admission.

## Current admission table

| Direction | Type | Current checks | Mutation |
|---|---|---|---|
| child to parent | `cozy-game-progress` | source only | update Play label/progress |
| child to parent | `cozy-game-ready` | source only | enable Play |
| child to parent | `cozy-game-entered` | source only | reveal iframe/history/focus path |
| child to parent | `cozy-game-failed` | source only | disable Play/show title |
| parent to child | `cozy-game-enter` | source only | resume simulation and prepare player |

Both producers use `location.origin` as `targetOrigin`. Neither receiver checks `event.origin` or validates payload shape beyond the type branch.

## Required admission result

```txt
ProtocolMessageAdmissionResult {
  status: Accepted | Malformed | ForeignOrigin | ForeignSource |
          Stale | Duplicate | OutOfOrder | Cancelled | Retired,
  protocolVersion,
  messageId,
  shellGeneration,
  frameGeneration,
  preloadAttemptId,
  entryAttemptId,
  sequence,
  payloadFingerprint,
  reason
}
```

## Ordering policy

```txt
HELLO
  -> zero or more monotonic PROGRESS
  -> exactly one READY or FAILED
  -> zero or one ENTRY_REQUEST after READY
  -> exactly one ENTRY_PREPARED or ENTRY_FAILED
  -> exactly one ENTRY_FRAME_ACK
  -> exactly one ENTRY_COMMITTED
  -> RETIRED
```

No message from a predecessor generation may mutate current shell, startup, player or presentation state.

## Diagnostics

Expose bounded counts for accepted, malformed, stale, duplicate, out-of-order and retired messages. Do not retain arbitrary unbounded payloads or user data.