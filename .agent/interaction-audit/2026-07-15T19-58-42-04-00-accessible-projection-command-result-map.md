# Interaction audit: accessible projection command/result map

**Timestamp:** `2026-07-15T19-58-42-04-00`

## Summary

The missing contract is not another gameplay command. It is a projection command that consumes already accepted startup and gameplay state.

## Plan ledger

**Goal:** make every semantic DOM/focus effect traceable to accepted state.

- [x] Define command identity and source revisions.
- [x] Define rejection classes.
- [x] Define projection and acknowledgement results.
- [ ] Implement and execute fixtures.

## Command

```txt
AccessibleProjectionCommand
  projectionId
  documentId
  routeRevision
  startupRevision
  engineFrameRevision
  hudRevision
  interactionRevision
  focusRevision
  previousSemanticRevision
```

## Admission

```txt
reject if document is hidden, retired or superseded
reject if source frame is stale
reject duplicate semantic fingerprints
classify queryable-only changes
classify polite authored transitions
classify assertive failures
resolve focus target only after entry acceptance
```

## Result

```txt
AccessibleProjectionResult
  accepted
  semanticRevision
  changedFields
  progressValues
  selectedSeed
  resourceValues
  announcementReceipts
  focusAdmissionResult
  sourceFrameRevision
  reason
```

## Acknowledgements

```txt
FirstAccessibleMenuFrameAck
FirstAccessibleGameplayFrameAck
```
