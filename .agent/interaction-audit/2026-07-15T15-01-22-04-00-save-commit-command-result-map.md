# Interaction audit: save-commit command/result map

**Timestamp:** `2026-07-15T15-01-22-04-00`

## Summary

Save persistence is currently an untyped host function. It needs command identity and conflict-aware results.

## Plan ledger

**Goal:** turn each durable write into one explicit admission decision.

- [x] Define required command fields.
- [x] Define accepted and rejected outcomes.
- [x] Bind lifecycle and preload policy.
- [ ] Implement the command/result API and fixtures.

## Command

```txt
SaveCommitCommand
  slotId
  documentId
  writerSessionId
  commitId
  leaseId
  baseRevision
  candidateChecksum
  candidateFingerprint
  reason: autosave | manual | pagehide
```

## Results

```txt
SaveCommitAccepted
  newRevision
  predecessorRevision
  checksum
  readbackVerified
  leaseExpiresAt

SaveCommitRejected
  stale-base | no-lease | preload-readonly | duplicate |
  expired | storage-unavailable | readback-mismatch | retired

SaveConflictResult
  currentRevision
  candidateBaseRevision
  currentChecksum
  resolutionRequired
```

No input handler, renderer or lifecycle callback may claim success before an accepted result.
